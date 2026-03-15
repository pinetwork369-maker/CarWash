import express from "express";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";
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

  app.use(express.json());

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
        from: `"XE ĐẸP AUTO" <${smtpUser}>`,
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

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve the dist folder
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  server.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
