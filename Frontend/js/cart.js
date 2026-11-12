/**
 * GIỎ HÀNG THỐNG NHẤT - VÈ DỆT VÂN KHĂN
 * Quản lý giỏ hàng qua localStorage và đồng bộ badge, mini-cart trên toàn bộ các trang.
 */

import { PRODUCTS, getProductById, formatCurrency } from "./products-data.js";

const CART_STORAGE_KEY = "vdvk_cart_items";

export function getCart() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("Lỗi đọc giỏ hàng:", e);
    return [];
  }
}

export function saveCart(cart) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    updateCartBadges();
    renderMiniCart();
    window.dispatchEvent(new CustomEvent("cart-updated", { detail: { cart } }));
  } catch (e) {
    console.error("Lỗi lưu giỏ hàng:", e);
  }
}

export function addToCart(productId, quantity = 1) {
  const product = getProductById(productId);
  if (!product) return false;

  const cart = getCart();
  const existingIndex = cart.findIndex((item) => item.id === product.id);

  if (existingIndex > -1) {
    cart[existingIndex].quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      dimensions: product.dimensions,
      category: product.category,
      quantity: quantity
    });
  }

  saveCart(cart);
  showCartToast(`Đã thêm <strong>${product.name}</strong> vào giỏ hàng!`);
  return true;
}

export function updateQuantity(productId, quantity) {
  let cart = getCart();
  const numericId = parseInt(productId, 10);
  const target = cart.find((item) => item.id === numericId);

  if (target) {
    if (quantity <= 0) {
      cart = cart.filter((item) => item.id !== numericId);
    } else {
      target.quantity = quantity;
    }
    saveCart(cart);
  }
}

export function removeFromCart(productId) {
  const numericId = parseInt(productId, 10);
  const cart = getCart().filter((item) => item.id !== numericId);
  saveCart(cart);
}

export function clearCart() {
  localStorage.removeItem(CART_STORAGE_KEY);
  updateCartBadges();
  renderMiniCart();
  window.dispatchEvent(new CustomEvent("cart-updated", { detail: { cart: [] } }));
}

export function getCartCount() {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.quantity, 0);
}

export function getCartTotal() {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

export function updateCartBadges() {
  const count = getCartCount();
  document.querySelectorAll(".cart-badge").forEach((el) => {
    el.textContent = count;
    el.style.display = count > 0 ? "inline-flex" : "none";
  });
}

/**
 * Hiển thị thông báo Toast đẹp mắt
 */
export function showCartToast(message) {
  let toastContainer = document.getElementById("vdvk-toast-container");
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.id = "vdvk-toast-container";
    toastContainer.className = "vdvk-toast-container";
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement("div");
  toast.className = "vdvk-toast";
  toast.innerHTML = `
    <div class="toast-icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </div>
    <div class="toast-content">${message}</div>
    <a href="order-form.html" class="toast-action">Xem giỏ</a>
  `;

  toastContainer.appendChild(toast);
  setTimeout(() => {
    toast.classList.add("show");
  }, 10);

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

/**
 * Tạo và render Mini Cart Drawer trượt từ bên phải
 */
export function initMiniCart() {
  if (document.getElementById("mini-cart-drawer")) return;

  const drawer = document.createElement("div");
  drawer.id = "mini-cart-drawer";
  drawer.className = "mini-cart-drawer";
  drawer.innerHTML = `
    <div class="mini-cart-backdrop" id="mini-cart-backdrop"></div>
    <div class="mini-cart-panel">
      <div class="mini-cart-header">
        <div class="mini-cart-title">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 01-8 0"></path>
          </svg>
          <h3>Giỏ hàng của bạn</h3>
        </div>
        <button type="button" class="mini-cart-close" id="mini-cart-close" aria-label="Đóng giỏ hàng">&times;</button>
      </div>
      <div class="mini-cart-body" id="mini-cart-items">
        <!-- Rendered via JS -->
      </div>
      <div class="mini-cart-footer" id="mini-cart-footer">
        <!-- Rendered via JS -->
      </div>
    </div>
  `;

  document.body.appendChild(drawer);

  const backdrop = drawer.querySelector("#mini-cart-backdrop");
  const closeBtn = drawer.querySelector("#mini-cart-close");

  const closeCart = () => drawer.classList.remove("open");
  backdrop.addEventListener("click", closeCart);
  closeBtn.addEventListener("click", closeCart);

  // Gán sự kiện cho tất cả nút giỏ hàng (.buy-button)
  document.querySelectorAll(".buy-button").forEach((btn) => {
    // Đảm bảo có badge
    if (!btn.querySelector(".cart-badge")) {
      const badge = document.createElement("span");
      badge.className = "cart-badge";
      btn.appendChild(badge);
    }

    btn.addEventListener("click", (e) => {
      e.preventDefault();
      renderMiniCart();
      drawer.classList.add("open");
    });
  });

  updateCartBadges();
  renderMiniCart();
}

export function renderMiniCart() {
  const container = document.getElementById("mini-cart-items");
  const footer = document.getElementById("mini-cart-footer");
  if (!container || !footer) return;

  const cart = getCart();

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="mini-cart-empty">
        <div class="empty-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#7b963d" stroke-width="1.5">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 01-8 0"></path>
          </svg>
        </div>
        <p>Giỏ hàng của bạn đang trống</p>
        <a href="products.html" class="btn-primary" style="margin-top: 14px;">Khám phá bộ sưu tập</a>
      </div>
    `;
    footer.innerHTML = "";
    return;
  }

  container.innerHTML = cart
    .map(
      (item) => `
    <div class="mini-cart-item" data-id="${item.id}">
      <img src="${item.image}" alt="${item.name}" class="mini-cart-img" />
      <div class="mini-cart-info">
        <a href="product-detail.html?id=${item.id}" class="mini-cart-name">${item.name}</a>
        <div class="mini-cart-meta">${item.dimensions}</div>
        <div class="mini-cart-price">${formatCurrency(item.price)}</div>
        <div class="mini-cart-actions">
          <div class="qty-control">
            <button type="button" class="btn-qty-minus" data-id="${item.id}">-</button>
            <span class="qty-num">${item.quantity}</span>
            <button type="button" class="btn-qty-plus" data-id="${item.id}">+</button>
          </div>
          <button type="button" class="btn-remove-item" data-id="${item.id}" aria-label="Xóa">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `
    )
    .join("");

  const total = getCartTotal();
  footer.innerHTML = `
    <div class="mini-cart-total-row">
      <span>Tạm tính:</span>
      <span class="total-amount">${formatCurrency(total)}</span>
    </div>
    <div class="mini-cart-btns">
      <a href="order-form.html" class="btn-primary" style="width: 100%;">Tiến hành đặt hàng</a>
      <a href="products.html" class="btn-continue-shopping">Tiếp tục chọn khăn</a>
    </div>
  `;

  // Gắn event click cho các nút cộng / trừ / xóa
  container.querySelectorAll(".btn-qty-minus").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.dataset.id, 10);
      const item = cart.find((i) => i.id === id);
      if (item) updateQuantity(id, item.quantity - 1);
    });
  });

  container.querySelectorAll(".btn-qty-plus").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.dataset.id, 10);
      const item = cart.find((i) => i.id === id);
      if (item) updateQuantity(id, item.quantity + 1);
    });
  });

  container.querySelectorAll(".btn-remove-item").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.dataset.id, 10);
      removeFromCart(id);
    });
  });
}
