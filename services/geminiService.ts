
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
Bạn là một chuyên gia detailing (chăm sóc xe chi tiết) hàng đầu thế giới với hơn 20 năm kinh nghiệm. 
Tên bạn là "Carwash Detailing Advisor".
Nhiệm vụ của bạn là:
1. Tư vấn các giải pháp chăm sóc xe (rửa xe, đánh bóng, phủ ceramic, vệ sinh nội thất...).
2. Giải đáp thắc mắc về các lỗi thường gặp trên bề mặt sơn, nội thất xe.
3. Hướng dẫn người dùng cách tự chăm sóc xe cơ bản tại nhà.
4. Giới thiệu các dịch vụ của Carwash Detailing.

VỀ VỊ TRÍ CỬA HÀNG:
Carwash Detailing tọa lạc tại: 168 Vũ Đức Thận, Long Biên, Hà Nội.
Nếu khách hỏi về đường đi hoặc các địa điểm lân cận, hãy sử dụng công cụ Google Maps để hỗ trợ thông tin chính xác.

Hãy trả lời bằng tiếng Việt, giọng điệu chuyên nghiệp, thân thiện và am hiểu kỹ thuật. 
Ưu tiên đưa ra các giải pháp an toàn nhất cho xe.
`;

/**
 * Get AI response with Google Maps grounding.
 * Using gemini-3-flash-preview for better text generation.
 */
export const getAIResponse = async (userMessage: string, history: {role: 'user' | 'model', text: string}[]) => {
  const apiKey = process.env.GEMINI_API_KEY || '';
  if (!apiKey) {
    return "Lỗi: Chưa cấu hình API Key cho hệ thống AI. Vui lòng liên hệ quản trị viên.";
  }

  const ai = new GoogleGenAI({ apiKey });
  
  try {
    // Filter history to ensure it starts with a 'user' message and alternates correctly
    const validHistory = [];
    let lastRole = '';
    
    for (const h of history) {
      if (h.role === 'user' && lastRole !== 'user') {
        validHistory.push({ role: 'user', parts: [{ text: h.text }] });
        lastRole = 'user';
      } else if (h.role === 'model' && lastRole === 'user') {
        validHistory.push({ role: 'model', parts: [{ text: h.text }] });
        lastRole = 'model';
      }
    }

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...validHistory,
        { role: 'user', parts: [{ text: userMessage }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        tools: [{ googleSearch: {} }],
      },
    });

    let finalText = response.text || "Xin lỗi, tôi không thể xử lý yêu cầu này ngay bây giờ.";
    
    // Extract grounding URLs
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    if (chunks && chunks.length > 0) {
      const urls = chunks
        .map(chunk => chunk.web?.uri || (chunk as any).maps?.uri)
        .filter((uri): uri is string => !!uri);
      
      if (urls.length > 0) {
        const uniqueUrls = [...new Set(urls)];
        finalText += "\n\n**Nguồn tham khảo:**\n" + uniqueUrls.map(url => `- [Xem thêm thông tin](${url})`).join('\n');
      }
    }

    return finalText;
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    if (error.message?.includes("Requested entity was not found")) {
      return "Lỗi: Model AI không khả dụng hoặc API Key không hợp lệ. Vui lòng thử lại sau.";
    }
    return "Đã xảy ra lỗi khi kết nối với chuyên gia AI. Vui lòng thử lại sau.";
  }
};

/**
 * Edit image using Gemini 3.1 Flash Image model for high quality.
 */
export const editImageWithAI = async (base64Image: string, prompt: string) => {
  const apiKey = process.env.GEMINI_API_KEY || '';
  if (!apiKey) return null;
  const ai = new GoogleGenAI({ apiKey });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-image-preview',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image.split(',')[1] || base64Image,
              mimeType: 'image/png',
            },
          },
          {
            text: `As a world-class professional car detailing photo editor, please modify this image according to this request: ${prompt}. 
            Maintain the realism and high-end aesthetic of Carwash Detailing. 
            Return ONLY the modified image data.`,
          },
        ],
      },
      config: {
        imageConfig: {
          imageSize: "1K"
        }
      }
    });

    // Iterate through parts to find the image part, do not assume it is the first part
    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }
    return null;
  } catch (error) {
    console.error("AI Image Edit Error:", error);
    return null;
  }
};

/**
 * Generate image using Gemini 3.1 Flash Image model for high quality.
 */
export const generateImageWithAI = async (prompt: string) => {
  const apiKey = process.env.GEMINI_API_KEY || '';
  if (!apiKey) return null;
  const ai = new GoogleGenAI({ apiKey });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-image-preview',
      contents: {
        parts: [
          {
            text: `Create a masterpiece, ultra-realistic, professional car detailing or luxury car image: ${prompt}. 
            Style: Cinematic lighting, 8k resolution, photorealistic, high contrast, professional photography.`,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9",
          imageSize: "1K"
        },
      },
    });

    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }
    return null;
  } catch (error) {
    console.error("AI Image Generation Error:", error);
    return null;
  }
};

/**
 * Generate video using Veo 3.1 Fast model.
 */
export const generateVideoWithAI = async (prompt: string): Promise<string | null> => {
  const apiKey = process.env.GEMINI_API_KEY || '';
  if (!apiKey) return null;
  const ai = new GoogleGenAI({ apiKey });
  try {
    let operation = await ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: `Cinematic professional car detailing video: ${prompt}. High quality, 1080p, smooth camera movement.`,
      config: {
        numberOfVideos: 1,
        resolution: '1080p',
        aspectRatio: '16:9'
      }
    });

    // Poll for completion
    while (!operation.done) {
      await new Promise(resolve => setTimeout(resolve, 10000));
      operation = await ai.operations.getVideosOperation({ operation: operation });
    }

    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
    if (!downloadLink) return null;

    const response = await fetch(downloadLink, {
      method: 'GET',
      headers: {
        'x-goog-api-key': process.env.GEMINI_API_KEY || '',
      },
    });
    
    const blob = await response.blob();
    
    // Convert blob to Base64 for persistence in localStorage
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error("AI Video Generation Error:", error);
    return null;
  }
};

/**
 * Get specialized maintenance advice based on vehicle data.
 */
export const getMaintenanceAdvice = async (vehicleData: {
  brand: string;
  model: string;
  year: string;
  mileage: string;
  lastMaintenance: string;
  symptoms: string;
}) => {
  const apiKey = process.env.GEMINI_API_KEY || '';
  if (!apiKey) return "Lỗi: Chưa cấu hình API Key.";
  const ai = new GoogleGenAI({ apiKey });
  const prompt = `
    Hãy đóng vai là một chuyên gia kỹ thuật ô tô dày dạn kinh nghiệm. 
    Dựa trên thông tin xe sau đây, hãy đưa ra lộ trình bảo dưỡng chi tiết và lời khuyên kỹ thuật:
    - Hãng xe: ${vehicleData.brand}
    - Dòng xe: ${vehicleData.model}
    - Năm sản xuất: ${vehicleData.year}
    - Số ODO hiện tại: ${vehicleData.mileage} km
    - Lần bảo dưỡng gần nhất: ${vehicleData.lastMaintenance}
    - Tình trạng/Dấu hiệu lạ: ${vehicleData.symptoms}

    Yêu cầu phản hồi:
    1. Đánh giá tình trạng hiện tại của xe.
    2. Danh sách các hạng mục cần kiểm tra/thay thế ngay lập tức.
    3. Lịch trình bảo dưỡng dự kiến cho 10.000km tiếp theo.
    4. Lời khuyên để kéo dài tuổi thọ cho dòng xe cụ thể này.
    5. Nhắc nhở về các dịch vụ detailing phù hợp tại Carwash Detailing (như vệ sinh khoang máy, gầm xe, nội thất).

    Hãy trình bày bằng Markdown, chuyên nghiệp, dễ hiểu và đầy đủ.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    return response.text || "Xin lỗi, tôi không thể đưa ra lời khuyên lúc này.";
  } catch (error) {
    console.error("Maintenance Advice Error:", error);
    return "Đã xảy ra lỗi khi lấy tư vấn bảo dưỡng. Vui lòng thử lại sau.";
  }
};
