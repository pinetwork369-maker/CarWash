import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { WebSocketServer, WebSocket } from "ws";
import http from "http";
import Stripe from "stripe";
import OpenAI from "openai";
import Anthropic from "@anthropic-ai/sdk";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;
  const server = http.createServer(app);
  const wss = new WebSocketServer({ server });

  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  // WebSocket broadcast function
  const broadcast = (data: any) => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));
      }
    });
  };

  // Email API
  app.post("/api/send-email", async (req, res) => {
    const { to, subject, text, html, isBooking } = req.body;

    // Broadcast booking notification if it's a booking
    if (isBooking) {
      broadcast({ type: "NEW_BOOKING", message: subject });
    }

    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const smtpPort = parseInt(process.env.SMTP_PORT || "587");
    const smtpSecure = process.env.SMTP_SECURE === "true";

    if (!smtpUser || !smtpPass) {
      console.warn("SMTP credentials missing. Email will not be sent.");
      // Still broadcast the notification even if email fails
      if (isBooking) {
        return res.json({ success: true, notificationSent: true, emailError: "SMTP credentials missing" });
      }
      return res.status(500).json({ 
        error: "Email service not configured. Please set SMTP_USER and SMTP_PASS in environment variables." 
      });
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    try {
      await transporter.sendMail({
        from: `"XE ĐẸP PRO" <${smtpUser}>`,
        to,
        subject,
        text,
        html,
      });
      res.json({ success: true });
    } catch (error: any) {
      console.error("Failed to send email:", error);
      res.status(500).json({ error: "Failed to send email", details: error.message });
    }
  });

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Stripe Payment API
  app.post("/api/create-checkout-session", async (req, res) => {
    const { serviceName, price, customerEmail, customerName } = req.body;
    
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeSecretKey) {
      return res.status(500).json({ error: "Stripe is not configured. STRIPE_SECRET_KEY is missing." });
    }

    const stripe = new Stripe(stripeSecretKey);

    // Convert price string like "5.500.000 VNĐ" to number in cents (or smallest unit)
    // For VND, the smallest unit is the currency itself (no cents), but Stripe expects it in the smallest unit.
    // Actually for VND, Stripe uses the amount directly if it's a zero-decimal currency.
    // Let's assume the price is passed as a number or we parse it.
    const numericPrice = typeof price === 'number' ? price : parseInt(price.replace(/[^0-9]/g, '')) || 0;

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "vnd",
              product_data: {
                name: serviceName,
                description: `Dịch vụ chăm sóc xe cho ${customerName}`,
              },
              unit_amount: numericPrice,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${process.env.APP_URL || req.headers.origin}/?payment=success`,
        cancel_url: `${process.env.APP_URL || req.headers.origin}/?payment=cancel`,
        customer_email: customerEmail,
      });

      res.json({ id: session.id, url: session.url });
    } catch (error: any) {
      console.error("Stripe error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // AI OpenAI API
  app.post("/api/ai/openai", async (req, res) => {
    const { prompt, systemInstruction } = req.body;
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: "OpenAI API key is missing." });
    }

    const openai = new OpenAI({ apiKey });

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: systemInstruction || "You are a helpful assistant." },
          { role: "user", content: prompt }
        ],
      });

      res.json({ text: response.choices[0].message.content });
    } catch (error: any) {
      console.error("OpenAI error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // AI Claude API
  app.post("/api/ai/claude", async (req, res) => {
    const { prompt, systemInstruction } = req.body;
    const apiKey = process.env.CLAUDE_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: "Claude API key is missing." });
    }

    const anthropic = new Anthropic({ apiKey });

    try {
      const response = await anthropic.messages.create({
        model: "claude-3-5-sonnet-20240620",
        max_tokens: 1024,
        system: systemInstruction || "You are a helpful assistant.",
        messages: [{ role: "user", content: prompt }],
      });

      // @ts-ignore
      res.json({ text: response.content[0].text });
    } catch (error: any) {
      console.error("Claude error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // --- Upload API Endpoint ---
  // Saves images to local public/uploads directory for persistence and auto-sync with GitHub
  app.post("/api/upload", async (req, res) => {
    try {
      const { filename, base64 } = req.body;
      if (!base64 || !filename) {
        return res.status(400).json({ error: "Missing filename or base64 data" });
      }

      // Ensure public/uploads directory exists
      const uploadsDir = path.join(process.cwd(), "public", "uploads");
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      // Strip data URL prefixes if present
      const match = base64.match(/^data:([^;]+);base64,(.*)$/);
      let data = base64;
      if (match) {
        data = match[2];
      }

      // Generate a clean safe unique filename using timestamp
      const ext = path.extname(filename) || ".jpg";
      const baseName = path.basename(filename, ext).replace(/[^a-zA-Z0-9_-]/g, "_");
      const uniqueFilename = `${baseName}_${Date.now()}${ext}`;
      const filePath = path.join(uploadsDir, uniqueFilename);

      // Write folder / file
      fs.writeFileSync(filePath, Buffer.from(data, "base64"));
      console.log(`Uploaded image successfully written locally to: ${filePath}`);

      // Also copy to dist/uploads if dist exists (so the file is immediately available in production static assets)
      const distUploadsDir = path.join(process.cwd(), "dist", "uploads");
      if (fs.existsSync(path.join(process.cwd(), "dist"))) {
        if (!fs.existsSync(distUploadsDir)) {
          fs.mkdirSync(distUploadsDir, { recursive: true });
        }
        fs.copyFileSync(filePath, path.join(distUploadsDir, uniqueFilename));
      }

      // Return server relative url path
      const fileUrl = `/uploads/${uniqueFilename}`;
      res.json({ success: true, url: fileUrl });
    } catch (error: any) {
      console.error("Upload API error:", error);
      res.status(500).json({ error: "Failed to upload file", details: error.message });
    }
  });

  // --- Helper to recursively extract base64 images and save them as local static files ---
  function extractAndSaveBase64Images(obj: any): any {
    if (typeof obj === "string") {
      if (obj.startsWith("data:image/")) {
        try {
          const match = obj.match(/^data:image\/([^;]+);base64,(.*)$/);
          if (match) {
            const rawExt = match[1]; // e.g. "jpeg", "png", "webp"
            let ext = `.${rawExt}`;
            if (rawExt === "jpeg") ext = ".jpg";
            
            const base64Data = match[2];
            const uploadsDir = path.join(process.cwd(), "public", "uploads");
            if (!fs.existsSync(uploadsDir)) {
              fs.mkdirSync(uploadsDir, { recursive: true });
            }
            
            const uniqueFilename = `sync_image_${Date.now()}_${Math.floor(Math.random() * 10000)}${ext}`;
            const filePath = path.join(uploadsDir, uniqueFilename);
            
            fs.writeFileSync(filePath, Buffer.from(base64Data, "base64"));
            console.log(`[Auto-Sync] Base64 image written to: ${filePath}`);
            
            // Copy to dist/uploads if dist folder exists
            const distUploadsDir = path.join(process.cwd(), "dist", "uploads");
            if (fs.existsSync(path.join(process.cwd(), "dist"))) {
              if (!fs.existsSync(distUploadsDir)) {
                fs.mkdirSync(distUploadsDir, { recursive: true });
              }
              fs.copyFileSync(filePath, path.join(distUploadsDir, uniqueFilename));
            }
            
            return `/uploads/${uniqueFilename}`;
          }
        } catch (err) {
          console.error("Failed to convert base64 image in sync:", err);
        }
      }
      return obj;
    }
    
    if (Array.isArray(obj)) {
      return obj.map(item => extractAndSaveBase64Images(item));
    }
    
    if (obj !== null && typeof obj === "object") {
      const newObj: any = {};
      for (const key of Object.keys(obj)) {
        newObj[key] = extractAndSaveBase64Images(obj[key]);
      }
      return newObj;
    }
    
    return obj;
  }

  // Sweep auto_synced_data.json on server startup to convert any existing base64 strings to clean static files
  try {
    const backupFilePath = path.join(process.cwd(), "auto_synced_data.json");
    if (fs.existsSync(backupFilePath)) {
      console.log("🔍 Checking auto_synced_data.json for legacy base64 images on startup...");
      const fileContent = fs.readFileSync(backupFilePath, "utf8");
      if (fileContent.includes("data:image/")) {
        console.log("⚡ Found base64 images in auto_synced_data.json! Converting to static files...");
        const data = JSON.parse(fileContent);
        const cleanedData = extractAndSaveBase64Images(data);
        fs.writeFileSync(backupFilePath, JSON.stringify(cleanedData, null, 2), "utf8");
        console.log("✅ Finished cleaning up auto_synced_data.json on startup!");
      } else {
        console.log("✅ auto_synced_data.json is already fully clean (no base64 images found).");
      }
    }
  } catch (err) {
    console.error("Failed to sweep auto_synced_data.json on startup:", err);
  }

  // --- Admin Data Sync Endpoint ---
  // Saves current admin configuration data directly to local src/auto_synced_data.json file for persistence and GitHub export
  app.post("/api/sync-admin-data", async (req, res) => {
    try {
      const data = req.body;
      if (!data) {
        return res.status(400).json({ error: "No data payload provided" });
      }

      // Automatically clean up and extract all base64 images from the incoming sync body before saving!
      console.log("⚡ Processing and extracting base64 images from synced data...");
      const cleanedData = extractAndSaveBase64Images(data);

      const backupFilePath = path.join(process.cwd(), "auto_synced_data.json");
      fs.writeFileSync(backupFilePath, JSON.stringify(cleanedData, null, 2), "utf8");
      console.log(`Successfully synced admin data to local file: ${backupFilePath}`);

      res.json({ 
        success: true, 
        message: "Admin data successfully synced to local codebase files!", 
        cleanedData 
      });
    } catch (error: any) {
      console.error("Admin Sync API error:", error);
      res.status(500).json({ error: "Failed to sync admin data", details: error.message });
    }
  });

  // Serve uploads folder statically in all environments
  app.use("/uploads", express.static(path.join(process.cwd(), "public", "uploads")));

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve the dist folder
    app.use(express.static(path.join(process.cwd(), "dist")));
    app.get("*all", (req, res) => {
      res.sendFile(path.join(process.cwd(), "dist", "index.html"));
    });
  }

  server.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
