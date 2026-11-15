/**
 * RAG.JS - VÈ DỆT VÂN KHĂN
 * Bộ máy trích xuất thông tin liên quan (Retrieval Engine) siêu nhẹ cho Vercel Serverless.
 * Tìm kiếm và xếp hạng các đoạn văn bản (chunks) liên quan nhất với câu hỏi của khách hàng.
 */

import { KNOWLEDGE_BASE } from "./knowledge-base.js";

/**
 * Loại bỏ dấu tiếng Việt để tìm kiếm linh hoạt cả khi người dùng gõ không dấu
 */
function removeVietnameseTones(str) {
  if (!str) return "";
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase();
}

/**
 * Tính điểm mức độ phù hợp giữa câu hỏi và từng chunk tri thức
 */
function scoreDocument(doc, query) {
  const cleanQ = query.toLowerCase().trim();
  const noToneQ = removeVietnameseTones(query);
  const words = cleanQ.split(/\s+/).filter((w) => w.length > 1);
  const noToneWords = noToneQ.split(/\s+/).filter((w) => w.length > 1);

  let score = 0;

  const docTitle = doc.title.toLowerCase();
  const docTitleNoTone = removeVietnameseTones(doc.title);
  const docContent = doc.content.toLowerCase();
  const docContentNoTone = removeVietnameseTones(doc.content);

  // 1. Khớp từ khóa trong keywords (Trọng số rất cao: +15 điểm mỗi từ)
  if (doc.keywords && Array.isArray(doc.keywords)) {
    for (const kw of doc.keywords) {
      const kwLower = kw.toLowerCase();
      const kwNoTone = removeVietnameseTones(kw);
      if (cleanQ.includes(kwLower) || noToneQ.includes(kwNoTone)) {
        score += 15;
      }
    }
  }

  // 2. Khớp cụm từ trong tiêu đề (Trọng số cao: +12 điểm)
  if (docTitle.includes(cleanQ) || docTitleNoTone.includes(noToneQ)) {
    score += 25;
  }

  // 3. Khớp từng từ đơn
  for (let i = 0; i < words.length; i++) {
    const w = words[i];
    const nw = noToneWords[i] || "";

    if (docTitle.includes(w) || docTitleNoTone.includes(nw)) {
      score += 6;
    }
    if (docContent.includes(w) || docContentNoTone.includes(nw)) {
      score += 2;
    }
  }

  return score;
}

/**
 * Trích xuất Top K tài liệu liên quan nhất
 * @param {string} query - Câu hỏi người dùng
 * @param {number} topK - Số lượng chunk cần lấy (mặc định 3)
 */
export function retrieveRelevantKnowledge(query, topK = 3) {
  if (!query || typeof query !== "string") {
    return KNOWLEDGE_BASE.slice(0, topK);
  }

  const scoredDocs = KNOWLEDGE_BASE.map((doc) => ({
    doc,
    score: scoreDocument(doc, query),
  }));

  // Sắp xếp giảm dần theo điểm
  scoredDocs.sort((a, b) => b.score - a.score);

  // Lấy Top K tài liệu có điểm cao nhất
  const topDocs = scoredDocs.slice(0, topK).map((item) => item.doc);

  // Luôn bổ sung thông tin hotline & đặt hàng nếu câu hỏi liên quan đến mua sắm
  const qLower = query.toLowerCase();
  if (
    qLower.includes("mua") ||
    qLower.includes("giá") ||
    qLower.includes("đặt") ||
    qLower.includes("zalo") ||
    qLower.includes("liên hệ")
  ) {
    const contactDoc = KNOWLEDGE_BASE.find((d) => d.id === "ordering-and-contact");
    if (contactDoc && !topDocs.some((d) => d.id === "ordering-and-contact")) {
      topDocs[topDocs.length - 1] = contactDoc;
    }
  }

  return topDocs;
}

/**
 * Định dạng context tri thức để truyền vào Prompt của LLM
 */
export function buildPromptContext(retrievedDocs) {
  if (!retrievedDocs || retrievedDocs.length === 0) {
    return "Không có dữ liệu bổ sung.";
  }

  return retrievedDocs
    .map(
      (doc, idx) => `
[TÀI LIỆU ${idx + 1}: ${doc.title}]
${doc.content}
`
    )
    .join("\n----------------------------------------\n");
}
