/**
 * PRODUCTS.JS - VÈ DỆT VÂN KHĂN
 * Hiển thị danh sách sản phẩm, lọc danh mục, tìm kiếm và sắp xếp giá.
 */

import { PRODUCTS, formatCurrency } from "./products-data.js";
import { addToCart } from "./cart.js";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("products-grid");
  const countEl = document.getElementById("results-count");
  const filterTabs = document.querySelectorAll(".filter-tab");
  const searchInput = document.getElementById("catalog-search-input");
  const sortSelect = document.getElementById("sort-select");

  if (!container) return;

  // Lấy query param từ URL (ví dụ: ?q=hội an hoặc ?category=...)
  const urlParams = new URLSearchParams(window.location.search);
  let currentCategory = urlParams.get("category") || "all";
  let currentKeyword = urlParams.get("q") || "";
  let currentSort = "default";

  if (currentKeyword && searchInput) {
    searchInput.value = currentKeyword;
  }

  // Kích hoạt tab nếu có category trong URL
  filterTabs.forEach((tab) => {
    if (tab.dataset.category === currentCategory) {
      filterTabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
    }
  });

  function render() {
    let filtered = [...PRODUCTS];

    // Lọc theo danh mục
    if (currentCategory !== "all") {
      filtered = filtered.filter((p) => p.category.toLowerCase().includes(currentCategory.toLowerCase()));
    }

    // Lọc theo từ khóa tìm kiếm
    if (currentKeyword.trim()) {
      const kw = currentKeyword.toLowerCase().trim();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(kw) ||
          p.landmark.toLowerCase().includes(kw) ||
          p.verse.toLowerCase().includes(kw) ||
          p.description.toLowerCase().includes(kw)
      );
    }

    // Sắp xếp
    if (currentSort === "price-asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (currentSort === "price-desc") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (currentSort === "popular") {
      filtered.sort((a, b) => b.reviewsCount - a.reviewsCount);
    }

    // Cập nhật số lượng kết quả
    if (countEl) {
      countEl.innerHTML = `Hiển thị <strong>${filtered.length}</strong> sản phẩm lụa Mã Châu`;
    }

    // Hiển thị rỗng nếu không tìm thấy
    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <h3>Không tìm thấy sản phẩm phù hợp</h3>
          <p>Rất tiếc, không có mẫu khăn nào phù hợp với từ khóa "${escapeHtml(currentKeyword)}".</p>
          <button type="button" class="btn-primary" id="btn-reset-filters">Xem tất cả sản phẩm</button>
        </div>
      `;

      const resetBtn = container.querySelector("#btn-reset-filters");
      if (resetBtn) {
        resetBtn.addEventListener("click", () => {
          currentCategory = "all";
          currentKeyword = "";
          if (searchInput) searchInput.value = "";
          filterTabs.forEach((t) => t.classList.toggle("active", t.dataset.category === "all"));
          render();
        });
      }
      return;
    }

    // Render danh sách sản phẩm
    container.innerHTML = filtered
      .map(
        (p) => `
      <article class="product-card">
        ${p.tag ? `<span class="product-tag-badge">${p.tag}</span>` : ""}
        <a href="product-detail.html?id=${p.id}" class="product-thumb-link">
          <img src="${p.image}" alt="${p.name}" class="product-image" loading="lazy" />
        </a>
        <div class="product-card-content">
          <div class="product-category">${p.category} • ${p.dimensions}</div>
          <h3 class="product-title">
            <a href="product-detail.html?id=${p.id}">${p.name}</a>
          </h3>
          <p class="product-verse-brief">"${p.verse.split("\n")[0]}..."</p>
          <div class="product-price">
            <span class="price-current">${formatCurrency(p.price)}</span>
            <span class="price-original">${formatCurrency(p.originalPrice)}</span>
          </div>
          <div style="display:flex; gap:8px;">
            <a href="product-detail.html?id=${p.id}" class="btn-secondary" style="flex:1; min-height:38px; padding:0 10px; font-size:12px;">Chi tiết</a>
            <button type="button" class="btn-primary product-buy-button" data-id="${p.id}" style="flex:1.2;">
              Thêm giỏ
            </button>
          </div>
        </div>
      </article>
    `
      )
      .join("");

    // Gắn sự kiện Thêm vào giỏ
    container.querySelectorAll(".product-buy-button").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = parseInt(btn.dataset.id, 10);
        addToCart(id, 1);
      });
    });
  }

  // Sự kiện chọn tab danh mục
  filterTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      filterTabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      currentCategory = tab.dataset.category;
      render();
    });
  });

  // Sự kiện tìm kiếm ô search
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      currentKeyword = e.target.value;
      render();
    });
  }

  // Sự kiện sắp xếp
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      currentSort = e.target.value;
      render();
    });
  }

  // Chạy lần đầu
  render();
});

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
