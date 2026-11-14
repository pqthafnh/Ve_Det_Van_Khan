/**
 * CHATBOT TRỢ LÝ LỤA XỨ QUẢNG - VÈ DỆT VÂN KHĂN
 * Hoạt động thống nhất trên tất cả các trang qua root container #chatbot-root
 */

import { PRODUCTS, formatCurrency, getPageUrl } from "./products-data.js";
import { addToCart } from "./cart.js";

export function initChatbot() {
  const root = document.getElementById("chatbot-root");
  if (!root) return;

  root.innerHTML = `
    <!-- Nút mở Chatbot -->
    <button type="button" class="chatbot-toggle" id="chatbot-toggle" aria-label="Mở trợ lý tư vấn lụa xứ Quảng">
      <div class="chatbot-toggle-pulse"></div>
      <div class="chatbot-icon">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
        </svg>
      </div>
      <span class="chatbot-badge-text">Tư vấn lụa</span>
    </button>

    <!-- Hộp thoại Chatbot -->
    <div class="chatbot-window" id="chatbot-window">
      <!-- Chatbot Header -->
      <div class="chatbot-header">
        <div class="chatbot-header-info">
          <div class="chatbot-avatar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
              <path d="M2 17l10 5 10-5"></path>
              <path d="M2 12l10 5 10-5"></path>
            </svg>
          </div>
          <div>
            <h4 class="chatbot-title">Trợ lý Lụa Xứ Quảng</h4>
            <span class="chatbot-status">
              <span class="status-dot"></span> Trực tuyến • Vè Dệt Vân Khăn
            </span>
          </div>
        </div>
        <button type="button" class="chatbot-close" id="chatbot-close" aria-label="Đóng trợ lý">&times;</button>
      </div>

      <!-- Chatbot Messages -->
      <div class="chatbot-messages" id="chatbot-messages">
        <!-- Rendered via JS -->
      </div>

      <!-- Quick Chips -->
      <div class="chatbot-quick-chips" id="chatbot-chips">
        <button type="button" class="chip-btn" data-query="tư vấn quà tặng">Khăn tặng mẹ / đối tác</button>
        <button type="button" class="chip-btn" data-query="ý nghĩa khăn hội an">Ý nghĩa khăn Hội An</button>
        <button type="button" class="chip-btn" data-query="lụa mã châu">Đặc sắc lụa Mã Châu</button>
        <button type="button" class="chip-btn" data-query="cách giặt khăn lụa">Bảo quản & giặt lụa</button>
        <button type="button" class="chip-btn" data-query="giá sản phẩm">Bảng giá 6 mẫu khăn</button>
      </div>

      <!-- Chatbot Input -->
      <form class="chatbot-input-bar" id="chatbot-form">
        <input
          type="text"
          id="chatbot-input"
          placeholder="Hỏi về khăn, câu vè xứ Quảng..."
          autocomplete="off"
          aria-label="Nhập câu hỏi"
        />
        <button type="submit" class="chatbot-send-btn" aria-label="Gửi tin nhắn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </form>
    </div>
  `;

  const toggleBtn = root.querySelector("#chatbot-toggle");
  const windowEl = root.querySelector("#chatbot-window");
  const closeBtn = root.querySelector("#chatbot-close");
  const form = root.querySelector("#chatbot-form");
  const input = root.querySelector("#chatbot-input");
  const messagesEl = root.querySelector("#chatbot-messages");
  const chipsEl = root.querySelector("#chatbot-chips");

  // Toggle Chatbot
  toggleBtn.addEventListener("click", () => {
    windowEl.classList.toggle("open");
    if (windowEl.classList.contains("open")) {
      input.focus();
      if (messagesEl.children.length === 0) {
        sendBotGreeting();
      }
    }
  });

  closeBtn.addEventListener("click", () => {
    windowEl.classList.remove("open");
  });

  // Gửi tin nhắn từ input
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;

    addUserMessage(text);
    input.value = "";
    handleUserQuery(text);
  });

  // Bấm vào gợi ý Quick Chips
  chipsEl.querySelectorAll(".chip-btn").forEach((chip) => {
    chip.addEventListener("click", () => {
      const query = chip.dataset.query;
      addUserMessage(chip.textContent);
      handleUserQuery(query);
    });
  });

  function addUserMessage(text) {
    const msg = document.createElement("div");
    msg.className = "chat-msg user-msg";
    msg.innerHTML = `
      <div class="msg-bubble">${escapeHtml(text)}</div>
    `;
    messagesEl.appendChild(msg);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function addBotMessage(htmlContent) {
    const msg = document.createElement("div");
    msg.className = "chat-msg bot-msg";
    msg.innerHTML = `
      <div class="bot-msg-avatar">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
          <path d="M2 17l10 5 10-5"></path>
          <path d="M2 12l10 5 10-5"></path>
        </svg>
      </div>
      <div class="msg-bubble">${htmlContent}</div>
    `;
    messagesEl.appendChild(msg);
    messagesEl.scrollTop = messagesEl.scrollHeight;

    // Gắn event cho các nút mua ngay hoặc xem chi tiết bên trong bot message
    msg.querySelectorAll(".bot-action-add-cart").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = parseInt(btn.dataset.id, 10);
        addToCart(id, 1);
      });
    });
  }

  function sendBotGreeting() {
    addBotMessage(`
      <p>Chào bạn! Mình là <strong>Trợ lý Lụa Xứ Quảng</strong> của <em>Vè Dệt Vân Khăn</em> 🌿</p>
      <p>Mình có thể giúp bạn tìm hiểu về <strong>chất liệu lụa Mã Châu 100% tự nhiên</strong>, ý nghĩa <strong>6 câu vè & 6 danh lam xứ Quảng</strong>, hoặc gợi ý mẫu khăn phù hợp làm quà tặng. Bạn cần mình tư vấn điều gì?</p>
    `);
  }

  async function handleUserQuery(rawText) {
    // 1. Hiển thị chỉ báo typing
    const typing = document.createElement("div");
    typing.className = "chat-msg bot-msg typing-indicator";
    typing.innerHTML = `
      <div class="bot-msg-avatar">🌿</div>
      <div class="msg-bubble"><span></span><span></span><span></span></div>
    `;
    messagesEl.appendChild(typing);
    messagesEl.scrollTop = messagesEl.scrollHeight;

    try {
      // 2. Gửi request đến Vercel Serverless Function /api/chat (RAG + Gemini AI)
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: rawText }),
      });

      if (res.ok) {
        const data = await res.json();
        typing.remove();
        if (data && data.reply) {
          const formattedReply = formatMarkdownToHtml(data.reply);
          addBotMessage(formattedReply);
          return;
        }
      }
      throw new Error("Không nhận được phản hồi hợp lệ từ API");
    } catch (err) {
      // Fallback: nếu đang chạy tĩnh offline / chưa deploy Vercel, dùng bộ máy tri thức cục bộ
      typing.remove();
      const localReply = generateBotResponse(rawText.toLowerCase());
      addBotMessage(localReply);
    }
  }

  function formatMarkdownToHtml(md) {
    if (!md) return "";
    let html = escapeHtml(md);
    // In đậm **text**
    html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    // In nghiêng *text*
    html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");
    // Danh sách gạch đầu dòng
    html = html.replace(/^[•\-\*]\s+(.*)$/gm, "<li>$1</li>");
    html = html.replace(/(<li>.*<\/li>)/s, "<ul style='padding-left:18px; margin:6px 0;'>$1</ul>");
    // Xuống dòng đoạn văn
    html = html.replace(/\n\n/g, "</p><p>");
    html = html.replace(/\n/g, "<br/>");
    return `<p>${html}</p>`;
  }

  function generateBotResponse(q) {
    // 1. Quà tặng / Tư vấn lựa chọn
    if (q.includes("quà") || q.includes("tặng") || q.includes("tư vấn")) {
      const p1 = PRODUCTS[2] || PRODUCTS[0];
      const p2 = PRODUCTS[1];
      return `
        <p>Để làm quà tặng ý nghĩa, <strong>Vè Dệt Vân Khăn</strong> xin gợi ý cho bạn 2 mẫu được yêu chuộng nhất:</p>
        <div class="bot-product-card">
          <strong>1. ${p1.name} (${p1.dimensions})</strong>
          <p>Giá: ${formatCurrency(p1.price)} • Mang câu vè hiếu đạo <em>"Ngó lên Hòn Kẽm Đá Dừng..."</em> - Rất trang trọng để biếu cha mẹ, thầy cô, đối tác.</p>
          <a href="${getPageUrl("product-detail.html")}?id=${p1.id}" class="bot-link">Xem chi tiết</a>
        </div>
        <div class="bot-product-card">
          <strong>2. ${p2.name} (${p2.dimensions})</strong>
          <p>Giá: ${formatCurrency(p2.price)} • Sắc vàng hoài niệm, phối áo dài hoặc dạo phố cực thanh lịch.</p>
          <a href="${getPageUrl("product-detail.html")}?id=${p2.id}" class="bot-link">Xem chi tiết</a>
        </div>
      `;
    }

    // 2. Hội An
    if (q.includes("hội an") || q.includes("sông hoài") || q.includes("hoa giấy")) {
      const p = PRODUCTS[1];
      return `
        <p><strong>${p.name}</strong> (${formatCurrency(p.price)}):</p>
        <blockquote class="bot-quote">
          "Mảnh đất quê ta<br/>
          Quảng Nam, Đà Nẵng<br/>
          Hết ngày cay đắng<br/>
          Nay đã nở hoa"
        </blockquote>
        <p>${p.verseMeaning}</p>
        <div class="bot-actions">
          <a href="${getPageUrl("product-detail.html")}?id=${p.id}" class="btn-primary" style="font-size:12px; padding:6px 14px;">Xem khăn Hội An</a>
          <button type="button" class="btn-primary bot-action-add-cart" data-id="${p.id}" style="font-size:12px; padding:6px 14px; background:var(--gradient-pink);">Thêm vào giỏ</button>
        </div>
      `;
    }

    // 3. Lụa Mã Châu / Hồn tơ xứ Quảng / Hòn Kẽm
    if (q.includes("mã châu") || q.includes("hòn kẽm") || q.includes("hồn tơ") || q.includes("làng nghề")) {
      const p = PRODUCTS[2];
      return `
        <p><strong>Lụa Mã Châu (Duy Xuyên, Quảng Nam)</strong> có bề dày truyền thống hơn 400 năm bên dòng sông Thu Bồn:</p>
        <ul>
          <li>100% sợi tơ tằm nguyên bản, mềm mát, óng ả tự nhiên.</li>
          <li>Nhuộm màu thảo mộc an toàn, phân hủy sinh học, bảo vệ môi trường.</li>
          <li>Khăn mang câu vè hiếu đạo: <em>"Ngó lên Hòn Kẽm Đá Dừng / Thương cha nhớ mẹ quá chừng bạn ơi..."</em></li>
        </ul>
        <div class="bot-actions">
          <a href="${getPageUrl("product-detail.html")}?id=${p.id}" class="btn-primary" style="font-size:12px; padding:6px 14px;">Xem khăn Mã Châu</a>
          <a href="${getPageUrl("story.html")}" class="btn-link" style="font-size:12px;">Đọc câu chuyện làng nghề &rarr;</a>
        </div>
      `;
    }

    // 4. Mỹ Sơn
    if (q.includes("mỹ sơn") || q.includes("chăm") || q.includes("đền tháp")) {
      const p = PRODUCTS[0];
      return `
        <p><strong>${p.name}</strong> (${formatCurrency(p.price)}):</p>
        <p>Khắc họa quần thể di sản thế giới Chăm Pa giữa thung lũng Duy Xuyên. Câu vè tinh thần đấu tranh:</p>
        <blockquote class="bot-quote">
          "Căm thù ấy càng thêm nung nấu<br/>
          Vác xác con lên thấu tỉnh đường<br/>
          Súng nào ngăn nổi tình thương<br/>
          Gươm nào gom nổi con đường đấu tranh"
        </blockquote>
        <p><a href="${getPageUrl("product-detail.html")}?id=${p.id}" class="bot-link">Xem chi tiết sản phẩm này &rarr;</a></p>
      `;
    }

    // 5. Cầu Rồng / Đà Nẵng
    if (q.includes("cầu rồng") || q.includes("đà nẵng") || q.includes("sông hàn")) {
      const p = PRODUCTS[3];
      return `
        <p><strong>${p.name}</strong> (${formatCurrency(p.price)}):</p>
        <p>Biểu tượng cho sức trẻ, niềm tự hào và khát vọng vươn mình của miền Trung hôm nay:</p>
        <blockquote class="bot-quote">
          "Ngày xưa măng lụi, tre tàn<br/>
          Ngày nay nô nức, xóm làng vui ca..."
        </blockquote>
        <p><a href="${getPageUrl("product-detail.html")}?id=${p.id}" class="bot-link">Khám phá khăn Cầu Rồng &rarr;</a></p>
      `;
    }

    // 6. Ngũ Hành Sơn
    if (q.includes("ngũ hành sơn") || q.includes("non nước")) {
      const p = PRODUCTS[5];
      return `
        <p><strong>${p.name}</strong> (${formatCurrency(p.price)}):</p>
        <p>Tôn vinh vẻ đẹp non nước mây trời và ý chí kiên định, son sắt của người miền Trung.</p>
        <p><a href="${getPageUrl("product-detail.html")}?id=${p.id}" class="bot-link">Xem chi tiết khăn Ngũ Hành Sơn &rarr;</a></p>
      `;
    }

    // 7. Cù Lao Chàm / Du lịch xanh
    if (q.includes("cù lao chàm") || q.includes("biển") || q.includes("xanh") || q.includes("môi trường")) {
      const p = PRODUCTS[4];
      return `
        <p><strong>${p.name}</strong> (${formatCurrency(p.price)}):</p>
        <p>Sản phẩm đại diện cho thông điệp <em>Du Lịch Xanh & Bảo Tồn Biển Đảo</em>, làm từ tơ tằm nguyên bản thân thiện với thiên nhiên.</p>
        <p><a href="${getPageUrl("product-detail.html")}?id=${p.id}" class="bot-link">Xem chi tiết khăn Cù Lao Chàm &rarr;</a></p>
      `;
    }

    // 8. Cách giặt & bảo quản lụa
    if (q.includes("giặt") || q.includes("bảo quản") || q.includes("ủi") || q.includes("là")) {
      return `
        <p><strong>Hướng dẫn chăm sóc lụa Mã Châu chuẩn nghệ nhân:</strong></p>
        <ol style="padding-left: 18px; margin: 8px 0; font-size: 13px;">
          <li>Giặt tay nhẹ nhàng với nước mát dưới 30°C và dầu gội hoặc sữa tắm dịu nhẹ.</li>
          <li>Không vắt xoắn mạnh; dùng khăn bông thấm bớt nước thừa.</li>
          <li>Phơi nơi râm mát, thoáng gió, tránh ánh nắng mặt trời trực tiếp.</li>
          <li>Là (ủi) ở nhiệt độ thấp khi khăn còn hơi ẩm, hoặc dùng bàn ủi hơi nước.</li>
        </ol>
      `;
    }

    // 9. Bảng giá & Mua hàng
    if (q.includes("giá") || q.includes("bảng giá") || q.includes("bao nhiêu") || q.includes("mua") || q.includes("đặt")) {
      return `
        <p><strong>Bảng giá niêm yết 6 mẫu khăn lụa Mã Châu chính hãng:</strong></p>
        <ul style="padding-left: 16px; margin: 6px 0; font-size: 13px;">
          ${PRODUCTS.map((p) => `<li><strong>${p.name}:</strong> ${formatCurrency(p.price)} (${p.dimensions})</li>`).join("")}
        </ul>
        <p style="margin-top:8px;">🌿 Quý khách có thể kết nối trực tiếp **Hotline / Zalo: 0974 678 820** để được tư vấn chọn mẫu và đặt mua thủ công nhanh nhất ạ!</p>
        <p><a href="${getPageUrl("payment.html")}" class="bot-link">Xem hướng dẫn kết nối Zalo &rarr;</a></p>
      `;
    }

    // Mặc định
    return `
      <p>Cảm ơn bạn đã quan tâm đến <strong>Vè Dệt Vân Khăn</strong>!</p>
      <p>Bạn có thể hỏi mình về <em>giá khăn</em>, <em>câu chuyện lụa Mã Châu</em>, <em>ý nghĩa 6 câu vè</em>, hoặc kết nối Hotline/Zalo <strong>0974 678 820</strong> để nhóm tư vấn ngay nhé.</p>
    `;
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
}
