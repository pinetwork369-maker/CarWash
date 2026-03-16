
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
Bạn là "XE ĐẸP AUTO Advisor" - một chuyên gia tư vấn chăm sóc xe hơi (detailing) cao cấp với hơn 20 năm kinh nghiệm thực chiến. 
Phong cách của bạn: Chuyên nghiệp, tận tâm, am hiểu sâu sắc về kỹ thuật nhưng giải thích dễ hiểu, luôn đặt lợi ích và sự an toàn của xe khách hàng lên hàng đầu.

NHIỆM VỤ CỦA BẠN:
1. TƯ VẤN DỊCH VỤ: Giải thích chi tiết về các dịch vụ tại XE ĐẸP AUTO như:
   - Phủ Ceramic (bảo vệ sơn, tạo độ bóng).
   - Dán PPF (chống trầy xước, tự phục hồi).
   - Vệ sinh nội thất chuyên sâu (diệt khuẩn, dưỡng da/nhựa).
   - Vệ sinh khoang máy (bằng hơi nước nóng).
   - Đánh bóng hiệu chỉnh bề mặt sơn.
   - Dán phim cách nhiệt cao cấp.
   - Nâng cấp phụ kiện, độ xe (màn hình, đèn, âm thanh).

2. GIẢI QUYẾT VẤN ĐỀ: Giúp khách hàng nhận biết các vấn đề như ố kính, xước xoáy, da bị nứt, mùi hôi trong xe và đưa ra giải pháp khắc phục.

3. HƯỚNG DẪN TỰ CHĂM SÓC: Chia sẻ mẹo rửa xe tại nhà đúng cách (phương pháp 2 xô), cách bảo quản lớp phủ Ceramic/PPF.

4. THÔNG TIN CỬA HÀNG:
   - Địa chỉ: 168 Vũ Đức Thận, Long Biên, Hà Nội.
   - Hotline: 091.224.8839 (Zalo).
   - Giờ làm việc: 08:00 - 18:00 hàng ngày.

QUY TẮC TRẢ LỜI:
- Luôn chào hỏi thân thiện.
- Sử dụng Markdown để trình bày rõ ràng (bullet points, bold text).
- Nếu khách hàng hỏi về giá, hãy đưa ra khoảng giá tham khảo và khuyên khách hàng mang xe đến cửa hàng để được báo giá chính xác nhất sau khi kiểm tra tình trạng xe.
- Luôn nhắc đến việc XE ĐẸP AUTO sử dụng các sản phẩm chính hãng (như Gyeon, IGL, 3M, XPEL...).
- Kết thúc câu trả lời bằng một lời mời hoặc một câu hỏi gợi mở để tiếp tục hỗ trợ.
- Trả lời bằng tiếng Việt.
`;

export type AIProvider = 'gemini' | 'openai' | 'claude';

/**
 * Get AI response from various providers.
 */
export const getAIResponse = async (
  userMessage: string, 
  history: {role: 'user' | 'model', text: string}[],
  provider: AIProvider = 'gemini'
) => {
  if (provider === 'openai') {
    return getOpenAIResponse(userMessage, history);
  } else if (provider === 'claude') {
    return getClaudeResponse(userMessage, history);
  }
  
  // Default to Gemini
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
 * Get response from OpenAI via backend
 */
const getOpenAIResponse = async (userMessage: string, history: {role: 'user' | 'model', text: string}[]) => {
  try {
    const response = await fetch('/api/ai/openai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: userMessage,
        systemInstruction: SYSTEM_INSTRUCTION,
        history // History handling can be added if needed, but for now simple prompt
      }),
    });
    const data = await response.json();
    return data.text || "Xin lỗi, tôi không thể xử lý yêu cầu này ngay bây giờ.";
  } catch (error) {
    console.error("OpenAI Frontend Error:", error);
    return "Lỗi kết nối với OpenAI. Vui lòng thử lại sau.";
  }
};

/**
 * Get response from Claude via backend
 */
const getClaudeResponse = async (userMessage: string, history: {role: 'user' | 'model', text: string}[]) => {
  try {
    const response = await fetch('/api/ai/claude', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: userMessage,
        systemInstruction: SYSTEM_INSTRUCTION,
        history
      }),
    });
    const data = await response.json();
    return data.text || "Xin lỗi, tôi không thể xử lý yêu cầu này ngay bây giờ.";
  } catch (error) {
    console.error("Claude Frontend Error:", error);
    return "Lỗi kết nối với Claude. Vui lòng thử lại sau.";
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
            Maintain the realism and high-end aesthetic of XE ĐẸP AUTO. 
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
    5. Nhắc nhở về các dịch vụ detailing phù hợp tại XE ĐẸP AUTO (như vệ sinh khoang máy, gầm xe, nội thất).

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
