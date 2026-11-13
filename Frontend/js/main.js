/**
 * MAIN.JS - VÈ DỆT VÂN KHĂN
 * Khởi tạo Header, Menu Mobile, Tìm kiếm, Giỏ hàng, Chatbot và Slider trên toàn hệ thống.
 */

import { PRODUCTS, formatCurrency, getPageUrl } from "./products-data.js";
import { initMiniCart } from "./cart.js";
import { initChatbot } from "./chatbot.js";

document.addEventListener("DOMContentLoaded", () => {
  // 1. Khởi tạo Menu Mobile (Hamburger toggle & click outside)
  initMobileMenu();

  // 2. Khởi tạo Mini-Cart & Huy hiệu số lượng
  initMiniCart();

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
 * Xử lý Menu điều hướng trên thiết bị di động
 */
function initMobileMenu() {
  const toggleBtn = document.getElementById("mobile-menu-toggle");
  const menu = document.getElementById("navbar-menu");
  if (!toggleBtn || !menu) return;

  toggleBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = menu.classList.toggle("open");
    toggleBtn.classList.toggle("active", isOpen);
    toggleBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  // Đóng menu khi nhấp vào bất kỳ mục liên kết nào
  menu.querySelectorAll(".navbar-item").forEach((item) => {
    item.addEventListener("click", () => {
      menu.classList.remove("open");
      toggleBtn.classList.remove("active");
      toggleBtn.setAttribute("aria-expanded", "false");
    });
  });

  // Đóng menu khi nhấp ra ngoài
  document.addEventListener("click", (e) => {
    if (!menu.contains(e.target) && !toggleBtn.contains(e.target)) {
      menu.classList.remove("open");
      toggleBtn.classList.remove("active");
      toggleBtn.setAttribute("aria-expanded", "false");
    }
  });
}

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
        <div class="product-category">${p.category} • ${p.dimensions}</div>
        <h3 class="product-title">
          <a href="${getPageUrl("product-detail.html")}?id=${p.id}">${p.name}</a>
        </h3>
        <p class="product-verse-brief">"${p.verse.split("\n")[0]}..."</p>
        <div class="product-price">
          <span class="price-current">${formatCurrency(p.price)}</span>
          <span class="price-original">${formatCurrency(p.originalPrice)}</span>
        </div>
        <div style="display:flex; gap:8px; margin-top:12px;">
          <a href="${getPageUrl("product-detail.html")}?id=${p.id}" class="btn-secondary" style="flex:1; min-height:38px; padding:0 8px; font-size:12.5px; text-align:center; justify-content:center;">
            Chi tiết
          </a>
          <a href="${getPageUrl("payment.html")}?id=${p.id}" class="btn-primary product-buy-button" style="flex:1.2; min-height:38px; padding:0 8px; font-size:12.5px; text-align:center; justify-content:center;">
            Liên hệ mua
          </a>
        </div>
      </div>
    </article>
  `
    )
    .join("");
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
