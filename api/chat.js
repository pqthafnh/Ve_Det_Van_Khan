/**
 * CHAT.JS - VERCEL SERVERLESS FUNCTION
 * Endpoint: POST /api/chat
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
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Chỉ hỗ trợ phương thức POST" });
  }

  try {
    const { message, history } = req.body || {};

    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({ error: "Vui lòng nhập nội dung tin nhắn" });
    }

    const userQuery = message.trim();

    // 1. BƯỚC RAG: Trích xuất tri thức liên quan từ Knowledge Base
    const relevantDocs = retrieveRelevantKnowledge(userQuery, 3);
    const ragContext = buildPromptContext(relevantDocs);

    // 2. KIỂM TRA API KEY
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      // Fallback thông minh khi chưa gắn API Key trên Vercel:
      // Tổng hợp câu trả lời chuẩn xác ngay từ RAG context mà không làm sập web!
      const fallbackReply = generateOfflineRAGReply(userQuery, relevantDocs);
      return res.status(200).json({
        reply: fallbackReply,
        isDemo: true,
        sources: relevantDocs.map((d) => d.title),
      });
    }

    // 3. KHỞI TẠO GOOGLE GEMINI VỚI RAG CONTEXT
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: SYSTEM_INSTRUCTION,
      generationConfig: {
        temperature: 0.4, // Nhiệt độ thấp để bot bám sát dữ liệu thật, không sáng tạo lung tung
        maxOutputTokens: 600,
      },
    });

    // 4. GHÉP PROMPT: Câu hỏi của khách + Dữ liệu RAG tìm được
    const augmentedPrompt = `
DỮ LIỆU TỪ CƠ SỞ TRI THỨC VÈ DỆT VÂN KHĂN (RAG CONTEXT):
========================================
${ragContext}
========================================

CÂU HỎI CỦA KHÁCH HÀNG: "${userQuery}"

Hãy đóng vai Trợ lý Lụa Xứ Quảng, dựa vào DỮ LIỆU TRÊN để trả lời một cách tự nhiên, lịch thiệp và hữu ích nhất:
`;

    const result = await model.generateContent(augmentedPrompt);
    const response = await result.response;
    const botText = response.text();

    return res.status(200).json({
      reply: botText,
      sources: relevantDocs.map((d) => d.title),
    });
  } catch (error) {
    console.error("Lỗi xử lý Chatbot RAG:", error);
    return res.status(500).json({
      error: "Không thể kết nối trợ lý AI lúc này.",
      details: error.message,
      fallbackHelp: "Quý khách có thể liên hệ trực tiếp Hotline/Zalo: 0974678820 để được hỗ trợ ngay!",
    });
  }
}

/**
 * Phản hồi dự phòng tự động trích xuất từ RAG khi chưa thiết lập GEMINI_API_KEY
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
