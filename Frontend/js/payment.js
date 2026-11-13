/**
 * PAYMENT.JS - VÈ DỆT VÂN KHĂN
 * Xử lý thông báo tạm thời chưa mở bán & hiển thị thông tin sản phẩm cần tư vấn qua Zalo.
 */

import { getProductById, formatCurrency } from "./products-data.js";
import { getCart } from "./cart.js";

document.addEventListener("DOMContentLoaded", () => {
  renderInterestedProduct();
});

function renderInterestedProduct() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  const productBox = document.getElementById("interested-product-card");
  const imgEl = document.getElementById("interested-img");
  const titleEl = document.getElementById("interested-title");
  const metaEl = document.getElementById("interested-meta");
  const priceEl = document.getElementById("interested-price");
  const verseEl = document.getElementById("interested-verse");

  if (!productBox) return;

  let targetProduct = null;

  if (productId) {
    targetProduct = getProductById(productId);
  } else {
    // Nếu không có param ?id=, kiểm tra sản phẩm đầu tiên trong giỏ hàng
    const cart = getCart();
    if (cart.length > 0) {
      targetProduct = getProductById(cart[0].id);
    }
  }

  if (targetProduct) {
    productBox.style.display = "block";
    if (imgEl) {
      imgEl.src = targetProduct.image;
      imgEl.alt = targetProduct.name;
    }
    if (titleEl) titleEl.textContent = targetProduct.name;
    if (metaEl) {
      metaEl.textContent = `${targetProduct.category} • ${targetProduct.dimensions} • ${targetProduct.material}`;
    }
    if (priceEl) priceEl.textContent = formatCurrency(targetProduct.price);
    if (verseEl) {
      const firstLine = targetProduct.verse.split("\n")[0];
      verseEl.textContent = `"${firstLine}..."`;
    }
  } else {
    productBox.style.display = "none";
  }
}
