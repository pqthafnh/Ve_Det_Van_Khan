/**
 * STORY.JS - VÈ DỆT VÂN KHĂN
 * Xử lý hiển thị động 6 câu chuyện văn hóa & 6 câu vè từ nguồn dữ liệu chính thức PRODUCTS.
 */

import { PRODUCTS } from "./products-data.js";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("verses-showcase-grid");
  if (!container) return;

  container.innerHTML = PRODUCTS.map(
    (p) => `
    <article class="verse-story-card">
      <div class="verse-card-media">
        <img src="${p.image}" alt="${p.name}" loading="lazy" />
        <span class="verse-card-landmark-tag">${p.landmark.split("–")[0].trim()}</span>
      </div>
      <div class="verse-card-body">
        <div class="verse-card-poem">${p.verse}</div>
        <h3 class="verse-card-title">${p.name}</h3>
        <p class="verse-card-desc">${p.verseMeaning}</p>
        <div class="verse-card-action">
          <a href="product-detail.html?id=${p.id}" class="btn-link">
            Khám phá chiếc khăn này &rarr;
          </a>
        </div>
      </div>
    </article>
  `
  ).join("");
});
