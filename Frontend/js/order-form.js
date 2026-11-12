/**
 * ORDER-FORM.JS - VÈ DỆT VÂN KHĂN
 * Xử lý render giỏ hàng trong biểu mẫu thanh toán, tính toán phí ship, voucher, và lưu đơn hàng chờ thanh toán.
 */

import { getCart, getCartTotal, updateQuantity, removeFromCart, formatCurrency } from "./cart.js";
import { getCurrentUser } from "./auth.js";

const PENDING_ORDER_KEY = "vdvk_pending_order";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("order-info-form");
  const itemsContainer = document.getElementById("checkout-items-container");
  const subtotalEl = document.getElementById("checkout-subtotal");
  const shippingFeeEl = document.getElementById("checkout-shipping-fee");
  const discountRow = document.getElementById("checkout-discount-row");
  const discountEl = document.getElementById("checkout-discount");
  const totalEl = document.getElementById("checkout-total");
  const couponInput = document.getElementById("coupon-code");
  const applyCouponBtn = document.getElementById("btn-apply-coupon");
  const couponFeedback = document.getElementById("coupon-feedback");
  const shippingOptions = document.querySelectorAll("input[name='shipping_method']");
  const giftBoxCheck = document.getElementById("gift-box-check");

  let shippingFee = 30000;
  let discountAmount = 0;
  let appliedCoupon = null;

  // Tự động điền thông tin nếu đã đăng nhập
  const currentUser = getCurrentUser();
  if (currentUser) {
    if (document.getElementById("cust-name")) document.getElementById("cust-name").value = currentUser.fullName || "";
    if (document.getElementById("cust-email")) document.getElementById("cust-email").value = currentUser.email || "";
    if (document.getElementById("cust-phone")) document.getElementById("cust-phone").value = currentUser.phone || "";
    if (document.getElementById("cust-address")) document.getElementById("cust-address").value = currentUser.address || "";
  }

  function renderOrderItems() {
    const cart = getCart();

    if (!itemsContainer) return;

    if (cart.length === 0) {
      itemsContainer.innerHTML = `
        <div style="text-align: center; padding: 30px 0;">
          <p style="color: var(--color-text-soft); font-size: 14px;">Chưa có sản phẩm nào trong giỏ hàng.</p>
          <a href="products.html" class="btn-primary" style="margin-top: 10px;">Chọn mua khăn lụa</a>
        </div>
      `;
      document.getElementById("btn-submit-order").disabled = true;
      return;
    }

    document.getElementById("btn-submit-order").disabled = false;

    itemsContainer.innerHTML = cart
      .map(
        (item) => `
      <div class="checkout-item" data-id="${item.id}">
        <img src="${item.image}" alt="${item.name}" class="checkout-item-img" />
        <div class="checkout-item-info">
          <div class="checkout-item-name">${item.name}</div>
          <div class="checkout-item-dimensions">${item.dimensions}</div>
          <div class="checkout-item-price-qty">
            <span style="color: var(--color-text-soft);">Số lượng: <strong>${item.quantity}</strong></span>
            <span class="checkout-item-price">${formatCurrency(item.price * item.quantity)}</span>
          </div>
        </div>
      </div>
    `
      )
      .join("");

    updateSummary();
  }

  function updateSummary() {
    const subtotal = getCartTotal();

    // Chính sách miễn phí ship nếu đơn từ 500.000 VNĐ cho giao hàng tiêu chuẩn
    const selectedShipping = document.querySelector("input[name='shipping_method']:checked");
    if (selectedShipping && selectedShipping.value === "standard") {
      shippingFee = subtotal >= 500000 ? 0 : 30000;
      document.getElementById("standard-shipping-price").textContent = shippingFee === 0 ? "Miễn phí" : "30.000 VNĐ";
    } else if (selectedShipping && selectedShipping.value === "express") {
      shippingFee = 45000;
    }

    // Phí hộp quà nếu được chọn
    const giftFee = giftBoxCheck && giftBoxCheck.checked ? 30000 : 0;

    const total = Math.max(0, subtotal + shippingFee + giftFee - discountAmount);

    if (subtotalEl) subtotalEl.textContent = formatCurrency(subtotal);
    if (shippingFeeEl) shippingFeeEl.textContent = shippingFee === 0 ? "Miễn phí" : formatCurrency(shippingFee);

    if (discountRow) {
      if (discountAmount > 0) {
        discountRow.style.display = "flex";
        discountEl.textContent = `-${formatCurrency(discountAmount)}`;
      } else {
        discountRow.style.display = "none";
      }
    }

    if (totalEl) totalEl.textContent = formatCurrency(total);
  }

  // Thay đổi phương thức vận chuyển
  shippingOptions.forEach((radio) => {
    radio.addEventListener("change", () => {
      document.querySelectorAll(".shipping-method-option").forEach((opt) => opt.classList.remove("selected"));
      radio.closest(".shipping-method-option").classList.add("selected");
      updateSummary();
    });
  });

  // Thay đổi tùy chọn hộp quà
  if (giftBoxCheck) {
    giftBoxCheck.addEventListener("change", () => {
      updateSummary();
    });
  }

  // Áp dụng Voucher
  if (applyCouponBtn && couponInput) {
    applyCouponBtn.addEventListener("click", () => {
      const code = couponInput.value.trim().toUpperCase();
      const subtotal = getCartTotal();

      if (!code) {
        showCouponMsg("Vui lòng nhập mã giảm giá!", "error");
        return;
      }

      if (code === "LUAMACHAU" || code === "MACHAU10") {
        discountAmount = Math.round(subtotal * 0.1);
        appliedCoupon = code;
        showCouponMsg("Áp dụng mã LUAMACHAU thành công! Giảm 10% tổng đơn hàng.", "success");
      } else if (code === "XUQUANG" || code === "VEDET50") {
        discountAmount = 50000;
        appliedCoupon = code;
        showCouponMsg("Áp dụng mã XUQUANG thành công! Giảm 50.000 VNĐ.", "success");
      } else {
        discountAmount = 0;
        appliedCoupon = null;
        showCouponMsg("Mã giảm giá không hợp lệ hoặc đã hết hạn!", "error");
      }

      updateSummary();
    });
  }

  function showCouponMsg(msg, type) {
    if (!couponFeedback) return;
    couponFeedback.textContent = msg;
    couponFeedback.className = `coupon-feedback ${type}`;
  }

  // Xử lý gửi biểu mẫu thông tin đơn hàng
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const cart = getCart();
      if (cart.length === 0) {
        alert("Giỏ hàng của bạn đang trống! Vui lòng chọn sản phẩm trước.");
        return;
      }

      const name = document.getElementById("cust-name").value.trim();
      const phone = document.getElementById("cust-phone").value.trim();
      const email = document.getElementById("cust-email").value.trim();
      const address = document.getElementById("cust-address").value.trim();
      const city = document.getElementById("cust-city").value;
      const note = document.getElementById("cust-note").value.trim();
      const selectedShipping = document.querySelector("input[name='shipping_method']:checked")?.value || "standard";
      const hasGiftBox = giftBoxCheck?.checked || false;

      if (!name || !phone || !email || !address || !city) {
        alert("Vui lòng điền đầy đủ các thông tin giao hàng bắt buộc!");
        return;
      }

      const subtotal = getCartTotal();
      const giftFee = hasGiftBox ? 30000 : 0;
      const finalTotal = Math.max(0, subtotal + shippingFee + giftFee - discountAmount);

      const pendingOrder = {
        orderId: "VDVK-" + Math.floor(100000 + Math.random() * 900000),
        createdAt: new Date().toLocaleString("vi-VN"),
        customer: {
          name,
          phone,
          email,
          address,
          city,
          note
        },
        shipping: {
          method: selectedShipping === "express" ? "Giao hàng hỏa tốc (1-2 ngày)" : "Giao hàng tiêu chuẩn (3-4 ngày)",
          fee: shippingFee,
          hasGiftBox
        },
        discount: {
          code: appliedCoupon,
          amount: discountAmount
        },
        items: cart,
        subtotal,
        total: finalTotal
      };

      // Lưu đơn hàng tạm thời vào localStorage
      localStorage.setItem(PENDING_ORDER_KEY, JSON.stringify(pendingOrder));

      // Chuyển hướng sang trang thanh toán payment.html
      window.location.href = "payment.html";
    });
  }

  // Render lần đầu
  renderOrderItems();
});
