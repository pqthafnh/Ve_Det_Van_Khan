/**
 * PAYMENT.JS - VÈ DỆT VÂN KHĂN
 * Xử lý phương thức thanh toán, tạo mã VietQR động, và hoàn tất đơn hàng với modal chúc mừng.
 */

import { clearCart, formatCurrency } from "./cart.js";

const PENDING_ORDER_KEY = "vdvk_pending_order";

document.addEventListener("DOMContentLoaded", () => {
  const rawOrder = localStorage.getItem(PENDING_ORDER_KEY);

  if (!rawOrder) {
    document.getElementById("payment-main-content").innerHTML = `
      <div style="text-align: center; padding: 60px 20px; background: #fff; border-radius: 20px; border: 1px dashed var(--color-border-green);">
        <h2 style="color: var(--color-green-deep); margin-bottom: 12px;">Chưa tìm thấy đơn hàng cần thanh toán</h2>
        <p style="color: var(--color-text-soft); margin-bottom: 24px;">Bạn có thể bắt đầu lựa chọn những chiếc khăn lụa Mã Châu ưng ý tại cửa hàng của chúng mình.</p>
        <a href="products.html" class="btn-primary">Khám phá sản phẩm ngay</a>
      </div>
    `;
    return;
  }

  const order = JSON.parse(rawOrder);
  renderOrderReview(order);
  initPaymentMethods(order);
  initConfirmOrder(order);
});

function renderOrderReview(order) {
  // Mã đơn & Tổng tiền
  setText("review-order-id", order.orderId);
  setText("review-total-price", formatCurrency(order.total));
  setText("review-subtotal", formatCurrency(order.subtotal));
  setText("review-shipping-fee", order.shipping.fee === 0 ? "Miễn phí" : formatCurrency(order.shipping.fee));

  if (order.discount && order.discount.amount > 0) {
    const discountRow = document.getElementById("review-discount-row");
    if (discountRow) {
      discountRow.style.display = "flex";
      setText("review-discount", `-${formatCurrency(order.discount.amount)}`);
    }
  }

  // Thông tin khách hàng xem trước
  const cust = order.customer;
  const custPreviewEl = document.getElementById("review-customer-info");
  if (custPreviewEl) {
    custPreviewEl.innerHTML = `
      <div><strong>Người nhận:</strong> ${cust.name} (${cust.phone})</div>
      <div><strong>Địa chỉ:</strong> ${cust.address}, ${cust.city}</div>
      <div><strong>Hình thức vận chuyển:</strong> ${order.shipping.method}</div>
      ${order.shipping.hasGiftBox ? `<div style="color: var(--color-primary); font-weight: 600;">🌿 Có kèm Hộp Quà Di Sản & Thiệp Viết Tay</div>` : ""}
    `;
  }

  // Danh sách sản phẩm xem trước
  const itemsContainer = document.getElementById("review-items-list");
  if (itemsContainer && order.items) {
    itemsContainer.innerHTML = order.items
      .map(
        (item) => `
      <div class="item-preview-row">
        <span class="item-preview-name">${item.name} × ${item.quantity}</span>
        <span class="item-preview-price">${formatCurrency(item.price * item.quantity)}</span>
      </div>
    `
      )
      .join("");
  }
}

function initPaymentMethods(order) {
  const options = document.querySelectorAll(".payment-option-item");

  // Cập nhật thông tin VietQR động
  const qrImg = document.getElementById("vietqr-image");
  const qrTransferContent = document.getElementById("qr-content-text");
  const qrAmountText = document.getElementById("qr-amount-text");

  const transferCode = `VDVK ${order.orderId}`;
  if (qrTransferContent) qrTransferContent.textContent = transferCode;
  if (qrAmountText) qrAmountText.textContent = formatCurrency(order.total);

  if (qrImg) {
    // API tạo mã VietQR tiêu chuẩn
    const qrUrl = `https://img.vietqr.io/image/MB-0905123456-compact2.png?amount=${order.total}&addInfo=${encodeURIComponent(transferCode)}&accountName=VE%20DET%20VAN%20KHAN`;
    qrImg.src = qrUrl;
    qrImg.alt = `Mã VietQR thanh toán đơn hàng ${order.orderId}`;
  }

  // Chuyển đổi giữa các phương thức thanh toán
  options.forEach((opt) => {
    const header = opt.querySelector(".payment-option-header");
    const radio = opt.querySelector("input[name='payment_method']");

    header.addEventListener("click", () => {
      options.forEach((o) => o.classList.remove("selected"));
      opt.classList.add("selected");
      if (radio) radio.checked = true;
    });
  });

  // Nút sao chép nội dung & STK
  const copyBtns = document.querySelectorAll(".btn-copy-code");
  copyBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const textToCopy = btn.dataset.copy;
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          const original = btn.textContent;
          btn.textContent = "Đã sao chép!";
          setTimeout(() => {
            btn.textContent = original;
          }, 2000);
        });
      }
    });
  });
}

function initConfirmOrder(order) {
  const finishBtn = document.getElementById("btn-finish-payment");
  const modal = document.getElementById("success-modal");
  const continueBtn = document.getElementById("btn-modal-continue");

  if (!finishBtn || !modal) return;

  finishBtn.addEventListener("click", () => {
    finishBtn.disabled = true;
    finishBtn.textContent = "Đang xử lý hoàn tất đơn...";

    setTimeout(() => {
      // 1. Xóa giỏ hàng
      clearCart();

      // 2. Xóa pending order khỏi localStorage
      localStorage.removeItem(PENDING_ORDER_KEY);

      // 3. Hiển thị modal chúc mừng
      setText("modal-order-code", `Mã đơn hàng: ${order.orderId}`);
      modal.classList.add("show");
    }, 800);
  });

  if (continueBtn) {
    continueBtn.addEventListener("click", () => {
      window.location.href = "products.html";
    });
  }
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}
