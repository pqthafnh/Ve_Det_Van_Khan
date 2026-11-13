/**
 * MAIN.JS - VÈ DỆT VÂN KHĂN
 * Khởi tạo Header, Menu, Tìm kiếm, Giỏ hàng, Đăng nhập, Chatbot và Slider trên toàn hệ thống.
 */

import { PRODUCTS, formatCurrency, getPageUrl } from "./products-data.js";
import { initMiniCart, addToCart } from "./cart.js";
import { updateHeaderAuth } from "./auth.js";
import { initChatbot } from "./chatbot.js";

document.addEventListener("DOMContentLoaded", () => {
  // 1. Khởi tạo Mini-Cart & Huy hiệu số lượng
  initMiniCart();

  // 2. Khởi tạo trạng thái Đăng nhập / Người dùng
  updateHeaderAuth();

  // 3. Khởi tạo Chatbot AI "Trợ lý Lụa Xứ Quảng"
  initChatbot();

  // 4. Đồng bộ trạng thái Active trên Navbar
  syncActiveNavbar();

  // 5. Khởi tạo xử lý tìm kiếm trên Header
  initHeaderSearch();

  // 6. Xử lý hiển thị sản phẩm nổi bật (nếu có container trên index.html)
  initFeaturedProducts();

  // 7. Xử lý Slider trên trang chủ (nếu có trên index.html)
  initHomeSlider();
});

/**
 * Đánh dấu mục active trên navbar dựa vào URL hiện tại
 */
function syncActiveNavbar() {
  const currentPath = window.location.pathname.toLowerCase();
  const navItems = document.querySelectorAll(".navbar-menu .navbar-item");

  navItems.forEach((item) => {
    item.classList.remove("active");
    const href = item.getAttribute("href")?.toLowerCase() || "";

    if (
      (currentPath.endsWith("index.html") || currentPath.endsWith("/") || currentPath === "") &&
      href.includes("index.html")
    ) {
      item.classList.add("active");
    } else if (
      (currentPath.includes("product") || currentPath.includes("san-pham")) &&
      href.includes("products.html")
    ) {
      item.classList.add("active");
    } else if (
      (currentPath.includes("story") || currentPath.includes("cau-chuyen")) &&
      href.includes("story.html")
    ) {
      item.classList.add("active");
    }
  });
}

/**
 * Xử lý tìm kiếm từ Header
 */
function initHeaderSearch() {
  const searchForms = document.querySelectorAll(".search");
  searchForms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      const input = form.querySelector("input[name='q']");
      if (input && input.value.trim()) {
        // Cho phép form tự submit đến products.html?q=...
        form.setAttribute("action", getPageUrl("products.html"));
      }
    });
  });
}

/**
 * Render sản phẩm nổi bật vào #featured-products-container (trang index.html)
 */
function initFeaturedProducts() {
  const container = document.getElementById("featured-products-container");
  if (!container) return;

  const featured = PRODUCTS.slice(0, 3); // Lấy 3 sản phẩm tiêu biểu

  container.innerHTML = featured
    .map(
      (p) => `
    <article class="product-card">
      <a href="${getPageUrl("product-detail.html")}?id=${p.id}" class="product-thumb-link">
        <img src="${p.image}" alt="${p.name}" class="product-image" loading="lazy" />
      </a>
      <div class="product-card-content">
        <div class="product-category">${p.category}</div>
        <h3 class="product-title">
          <a href="${getPageUrl("product-detail.html")}?id=${p.id}">${p.name}</a>
        </h3>
        <p class="product-verse-brief">"${p.verse.split("\n")[0]}..."</p>
        <div class="product-price">
          <span class="price-current">${formatCurrency(p.price)}</span>
          <span class="price-original">${formatCurrency(p.originalPrice)}</span>
        </div>
        <button type="button" class="btn-primary product-buy-button" data-id="${p.id}">
          Thêm vào giỏ
        </button>
      </div>
    </article>
  `
    )
    .join("");

  // Gắn event Thêm vào giỏ
  container.querySelectorAll(".product-buy-button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.dataset.id, 10);
      addToCart(id, 1);
    });
  });
}

/**
 * Xử lý Slider cho trang chủ index.html
 */
function initHomeSlider() {
  const slides = document.querySelectorAll(".slider-container .slide");
  const dots = document.querySelectorAll(".slider-dots .dot");
  const prevBtn = document.querySelector(".slider-arrow.prev");
  const nextBtn = document.querySelector(".slider-arrow.next");

  if (!slides || slides.length === 0) return;

  let currentIndex = 0;
  let timer = null;

  function goToSlide(index) {
    slides.forEach((s) => s.classList.remove("active"));
    dots.forEach((d) => d.classList.remove("active"));

    currentIndex = (index + slides.length) % slides.length;
    slides[currentIndex].classList.add("active");
    if (dots[currentIndex]) {
      dots[currentIndex].classList.add("active");
    }
  }

  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  function startAutoSlide() {
    stopAutoSlide();
    timer = setInterval(nextSlide, 5000);
  }

  function stopAutoSlide() {
    if (timer) clearInterval(timer);
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      nextSlide();
      startAutoSlide();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      prevSlide();
      startAutoSlide();
    });
  }

  dots.forEach((dot, idx) => {
    dot.addEventListener("click", () => {
      goToSlide(idx);
      startAutoSlide();
    });
  });

  startAutoSlide();
}
