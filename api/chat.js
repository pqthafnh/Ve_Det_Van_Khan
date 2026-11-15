/**
 * CHAT.JS - VERCEL SERVERLESS FUNCTION
 * Endpoint: POST /api/chat | GET /api/chat
 * Tích hợp kiến trúc RAG (Retrieval-Augmented Generation) cùng Google Gemini API
 */

import { GoogleGenerativeAI } from "@google/generative-ai";
import { retrieveRelevantKnowledge, buildPromptContext } from "./rag.js";

// Hướng dẫn hệ thống (System Prompt) huấn luyện tính cách Trợ lý
const SYSTEM_INSTRUCTION = `
Bạn là "Trợ lý Lụa Xứ Quảng" - Đại sứ AI chính thức của thương hiệu Vè Dệt Vân Khăn.
Phong cách giao tiếp:
- Thân thiện, lễ phép, mộc mạc, tôn vinh nét đẹp văn hóa xứ Quảng và làng nghề lụa Mã Châu.
- Gọi người dùng là "bạn" hoặc "quý khách", xưng là "mình" hoặc "Vè Dệt Vân Khăn".

QUY TẮC CỐT LÕI (GROUNDING RULES):
1. Bạn ĐƯỢC CUNG CẤP CƠ SỞ TRI THỨC (RAG CONTEXT) bên dưới. Bắt buộc phải ưu tiên sử dụng thông tin trong context này để trả lời.
2. TUYỆT ĐỐI KHÔNG tự bịa đặt giá cả, kích thước hoặc danh lam thắng cảnh ngoài 6 mẫu khăn của thương hiệu.
3. Thông tin cốt lõi:
   - Bảng giá: 2 Khăn dài (Mỹ Sơn, Hồn Tơ): 400.000 VNĐ. 2 Khăn vuông (Hội An, Cầu Rồng): 250.000 VNĐ. 2 Khăn Twilly (Cù Lao Chàm, Ngũ Hành Sơn): 150.000 VNĐ.
   - Hotline & Zalo tư vấn/đặt hàng: 0974678820 (hoặc 0974 678 820).
   - Khu vực hoạt động: Hà Nội & Quảng Nam - Đà Nẵng.
   - Chất liệu: 100% Lụa tơ tằm Mã Châu dệt thủ công, tự nhiên, nhuộm thảo mộc.
4. Khi khách hỏi mua hàng hoặc hỏi cách thanh toán:
   - Hướng dẫn khách kết nối Zalo 0974678820 (hoặc nhấn nút "Mua ngay" trên web) để được tư vấn chọn mẫu, quét mã QR thanh toán và đóng gói quà trang trọng.
5. Câu trả lời cần súc tích, trình bày đẹp mắt với các gạch đầu dòng và icon nhẹ nhàng (🌿, ✨, 🌸).
`;

export default async function handler(req, res) {
  // Thiết lập CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // 1. ENDPOINT GET: KIỂM TRA TRẠNG THÁI & CHẨN ĐOÁN API KEY TRỰC TIẾP TRÊN TRÌNH DUYỆT
  if (req.method === "GET") {
    const rawKey =
      process.env.GEMINI_API_KEY ||
      process.env.GOOGLE_API_KEY ||
      process.env.GEMINI_KEY ||
      process.env.API_KEY ||
      "";
    const apiKey = rawKey.trim();

    const activeVarName = process.env.GEMINI_API_KEY
      ? "GEMINI_API_KEY"
      : process.env.GOOGLE_API_KEY
      ? "GOOGLE_API_KEY"
      : process.env.GEMINI_KEY
      ? "GEMINI_KEY"
      : process.env.API_KEY
      ? "API_KEY"
      : "CHƯA_THIẾT_LẬP";

    return res.status(200).json({
      status: "online",
      service: "Trợ lý Lụa Xứ Quảng - Vè Dệt Vân Khăn",
      hasApiKey: !!apiKey,
      detectedVariable: activeVarName,
      keyMasked: apiKey
        ? `${apiKey.substring(0, 4)}...${apiKey.substring(apiKey.length - 4)}`
        : null,
      message: apiKey
        ? "API Key đã được Vercel nhận diện thành công! Hệ thống sẵn sàng phục vụ."
        : "Chưa nhận diện được API Key trên Vercel. Bạn hãy vào Vercel Dashboard > Settings > Environment Variables, thêm biến GEMINI_API_KEY rồi nhấn Redeploy.",
    });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Chỉ hỗ trợ phương thức POST" });
  }

  try {
    // 2. PARSE BODY LINH HOẠT
    let body = req.body;
    if (typeof body === "string") {
      try {
        body = JSON.parse(body);
      } catch (e) {
        body = {};
      }
    }

    const message = body?.message;
    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({ error: "Vui lòng nhập nội dung tin nhắn" });
    }

    const userQuery = message.trim();

    // 3. BƯỚC RAG: Trích xuất tri thức liên quan từ Knowledge Base
    const relevantDocs = retrieveRelevantKnowledge(userQuery, 3);
    const ragContext = buildPromptContext(relevantDocs);

    // 4. KIỂM TRA API KEY (HỖ TRỢ ĐA DẠNG TÊN BIẾN MÔI TRƯỜNG)
    const rawKey =
      process.env.GEMINI_API_KEY ||
      process.env.GOOGLE_API_KEY ||
      process.env.GEMINI_KEY ||
      process.env.API_KEY ||
      "";
    const apiKey = rawKey.trim();

    if (!apiKey) {
      // Fallback thông minh khi chưa gắn API Key trên Vercel:
      const fallbackReply = generateOfflineRAGReply(userQuery, relevantDocs);
      return res.status(200).json({
        reply: fallbackReply,
        isDemo: true,
        sources: relevantDocs.map((d) => d.title),
        note: "Đang trả lời bằng cơ chế RAG Offline (Chưa cấu hình GEMINI_API_KEY trên Vercel)",
      });
    }

    // 5. GỌI GOOGLE GEMINI VỚI CƠ CHẾ DỰ PHÒNG MODEL (FALLBACK MODELS)
    const genAI = new GoogleGenerativeAI(apiKey);
    const candidateModels = [
      "gemini-1.5-flash",
      "gemini-2.0-flash",
      "gemini-1.5-pro",
    ];

    const augmentedPrompt = `
DỮ LIỆU TỪ CƠ SỞ TRI THỨC VÈ DỆT VÂN KHĂN (RAG CONTEXT):
========================================
${ragContext}
========================================

CÂU HỎI CỦA KHÁCH HÀNG: "${userQuery}"

Hãy đóng vai Trợ lý Lụa Xứ Quảng, dựa vào DỮ LIỆU TRÊN để trả lời một cách tự nhiên, lịch thiệp và hữu ích nhất:
`;

    let botText = "";
    let lastError = null;

    for (const modelName of candidateModels) {
      try {
        const model = genAI.getGenerativeModel({
          model: modelName,
          systemInstruction: SYSTEM_INSTRUCTION,
          generationConfig: {
            temperature: 0.4,
            maxOutputTokens: 600,
          },
        });

        const result = await model.generateContent(augmentedPrompt);
        const response = await result.response;
        botText = response.text();
        if (botText) break; // Thành công
      } catch (err) {
        lastError = err;
        console.warn(`Model ${modelName} thất bại, thử model tiếp theo... Lỗi:`, err.message);
      }
    }

    if (botText) {
      return res.status(200).json({
        reply: botText,
        sources: relevantDocs.map((d) => d.title),
      });
    }

    // Nếu tất cả các model đều gặp lỗi (ví dụ API Key sai, hết quota, hoặc chặn vùng):
    // Thay vì trả về 500 làm sập giao diện, phản hồi bằng tri thức RAG chính xác và đính kèm cảnh báo!
    console.error("Tất cả model Gemini đều thất bại:", lastError);
    const fallbackReply = generateOfflineRAGReply(userQuery, relevantDocs);

    return res.status(200).json({
      reply: fallbackReply,
      isDemo: true,
      sources: relevantDocs.map((d) => d.title),
      warning: lastError ? lastError.message : "Không thể kết nối Gemini API lúc này",
    });
  } catch (error) {
    console.error("Lỗi tổng quát Chatbot RAG:", error);
    const relevantDocs = retrieveRelevantKnowledge(req.body?.message || "", 2);
    const fallbackReply = generateOfflineRAGReply(req.body?.message || "", relevantDocs);

    return res.status(200).json({
      reply: fallbackReply,
      isDemo: true,
      error: error.message,
      fallbackHelp: "Quý khách có thể liên hệ trực tiếp Hotline/Zalo: 0974678820 để được hỗ trợ ngay!",
    });
  }
}

/**
 * Phản hồi dự phòng tự động trích xuất từ RAG khi chưa có API Key hoặc Gemini bận
 */
function generateOfflineRAGReply(query, docs) {
  if (!docs || docs.length === 0) {
    return "Dạ, Vè Dệt Vân Khăn xin chào bạn! Bạn cần tư vấn về 6 mẫu khăn lụa Mã Châu, câu vè di sản hay cách đặt mua qua Zalo 0974678820 ạ?";
  }

  const primaryDoc = docs[0];
  return `Dạ chào bạn! Dưới đây là thông tin về **${primaryDoc.title}**:

${primaryDoc.content}

🌿 Nếu bạn muốn xem ảnh thực tế hoặc tư vấn chi tiết hơn, hãy nhắn tin trực tiếp qua **Hotline / Zalo: 0974 678 820** nhé!`;
}
