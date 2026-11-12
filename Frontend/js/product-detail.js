/**
 * PRODUCT-DETAIL.JS - VÈ DỆT VÂN KHĂN
 * Xử lý tải dữ liệu sản phẩm chi tiết theo query param ID, gallery ảnh, chọn số lượng, thêm giỏ và tabs câu chuyện.
 */

import { PRODUCTS, getProductById, formatCurrency } from "./products-data.js";
import { addToCart } from "./cart.js";

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get("id"), 10) || 1;
  const product = getProductById(productId) || PRODUCTS[0];

  renderProductDetail(product);
  initGallery(product);
  initQuantityControls(product);
  initActionButtons(product);
  initDetailTabs();
  renderRelatedProducts(product);
});

function renderProductDetail(p) {
  // Breadcrumb
  const breadcrumbEl = document.getElementById("detail-breadcrumb-current");
  if (breadcrumbEl) breadcrumbEl.textContent = p.name;

  // Tiêu đề & Thông tin cơ bản
  document.title = `${p.name} | Vè Dệt Vân Khăn`;
  setText("detail-category", p.category);
  setText("detail-title", p.name);
  setText("detail-landmark-text", p.landmark);
  setText("detail-price-current", formatCurrency(p.price));
  setText("detail-price-original", formatCurrency(p.originalPrice));

  const discountPercent = Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100);
  setText("detail-discount-badge", `Tiết kiệm ${discountPercent}%`);

  // Câu vè
  setText("detail-verse-text", p.verse);
  setText("detail-verse-meaning", p.verseMeaning);

  // Thông số kỹ thuật
  setText("spec-dimensions", p.dimensions);
  setText("spec-material", p.material);
  setText("spec-color", p.color);
  setText("spec-landmark", p.landmark);

  // Nội dung chi tiết các Tabs
  const storyTabEl = document.getElementById("tab-story-content");
  if (storyTabEl) {
    storyTabEl.innerHTML = `
      <h3>${p.landmark}</h3>
      <p>${p.description}</p>
      <div class="detail-verse-box" style="margin-top: 20px;">
        <div class="verse-box-header">Câu vè dân gian đúc kết</div>
        <div class="verse-lines">${p.verse}</div>
        <p class="verse-meaning">${p.verseMeaning}</p>
      </div>
      <p style="margin-top: 16px;">
        Vè Dệt Vân Khăn tự hào đưa hình ảnh những mái ngói rêu phong, bờ cõi linh thiêng và nét đẹp lao động của con người xứ Quảng lên nền lụa tơ tằm mềm mại. Mỗi đường kim mũi chỉ là tấm lòng tri ân nguồn cội và khát khao lan tỏa văn hóa dân tộc.
      </p>
    `;
  }
}

function initGallery(p) {
  const mainImg = document.getElementById("gallery-main-img");
  const thumbsContainer = document.getElementById("gallery-thumbs");
  if (!mainImg || !thumbsContainer) return;

  mainImg.src = p.image;
  mainImg.alt = p.name;

  const images = p.gallery && p.gallery.length ? p.gallery : [p.image];
  thumbsContainer.innerHTML = images
    .map(
      (imgSrc, idx) => `
    <div class="thumb-item ${idx === 0 ? "active" : ""}" data-src="${imgSrc}">
      <img src="${imgSrc}" alt="${p.name} thumbnail ${idx + 1}" />
    </div>
  `
    )
    .join("");

  thumbsContainer.querySelectorAll(".thumb-item").forEach((thumb) => {
    thumb.addEventListener("click", () => {
      thumbsContainer.querySelectorAll(".thumb-item").forEach((t) => t.classList.remove("active"));
      thumb.classList.add("active");
      mainImg.src = thumb.dataset.src;
    });
  });
}

function initQuantityControls(p) {
  const minusBtn = document.getElementById("qty-minus");
  const plusBtn = document.getElementById("qty-plus");
  const input = document.getElementById("qty-input");
  if (!minusBtn || !plusBtn || !input) return;

  minusBtn.addEventListener("click", () => {
    let val = parseInt(input.value, 10) || 1;
    if (val > 1) {
      input.value = val - 1;
    }
  });

  plusBtn.addEventListener("click", () => {
    let val = parseInt(input.value, 10) || 1;
    if (val < (p.stock || 99)) {
      input.value = val + 1;
    }
  });

  input.addEventListener("change", () => {
    let val = parseInt(input.value, 10) || 1;
    if (val < 1) val = 1;
    if (val > (p.stock || 99)) val = p.stock || 99;
    input.value = val;
  });
}

function initActionButtons(p) {
  const addCartBtn = document.getElementById("btn-add-cart");
  const buyNowBtn = document.getElementById("btn-buy-now");
  const input = document.getElementById("qty-input");

  if (addCartBtn) {
    addCartBtn.addEventListener("click", () => {
      const qty = parseInt(input ? input.value : 1, 10) || 1;
      addToCart(p.id, qty);
    });
  }

  if (buyNowBtn) {
    buyNowBtn.addEventListener("click", () => {
      const qty = parseInt(input ? input.value : 1, 10) || 1;
      addToCart(p.id, qty);
      window.location.href = "order-form.html";
    });
  }
}

function initDetailTabs() {
  const navBtns = document.querySelectorAll(".tab-nav-btn");
  const panels = document.querySelectorAll(".tab-content-panel");

  navBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.dataset.target;

      navBtns.forEach((b) => b.classList.remove("active"));
      panels.forEach((p) => p.classList.remove("active"));

      btn.classList.add("active");
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) targetPanel.classList.add("active");
    });
  });
}

function renderRelatedProducts(currentProduct) {
  const container = document.getElementById("related-products-grid");
  if (!container) return;

  const related = PRODUCTS.filter((p) => p.id !== currentProduct.id).slice(0, 3);

  container.innerHTML = related
    .map(
      (p) => `
    <article class="product-card">
      <a href="product-detail.html?id=${p.id}" class="product-thumb-link">
        <img src="${p.image}" alt="${p.name}" class="product-image" loading="lazy" />
      </a>
      <div class="product-card-content">
        <div class="product-category">${p.category}</div>
        <h3 class="product-title">
          <a href="product-detail.html?id=${p.id}">${p.name}</a>
        </h3>
        <p class="product-verse-brief">"${p.verse.split("\n")[0]}..."</p>
        <div class="product-price">
          <span class="price-current">${formatCurrency(p.price)}</span>
          <span class="price-original">${formatCurrency(p.originalPrice)}</span>
        </div>
        <div style="display:flex; gap:8px;">
          <a href="product-detail.html?id=${p.id}" class="btn-secondary" style="flex:1; min-height:36px; padding:0 8px; font-size:12px;">Xem</a>
          <button type="button" class="btn-primary product-buy-button" data-id="${p.id}" style="flex:1.2;">
            Thêm giỏ
          </button>
        </div>
      </div>
    </article>
  `
    )
    .join("");

  container.querySelectorAll(".product-buy-button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.dataset.id, 10);
      addToCart(id, 1);
    });
  });
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}
