/**
 * QUẢN LÝ ĐĂNG NHẬP / ĐĂNG KÝ - VÈ DỆT VÂN KHĂN
 * Lưu trữ trạng thái tài khoản người dùng qua localStorage và đồng bộ header.
 */

import { getPageUrl } from "./products-data.js";

const USER_STORAGE_KEY = "vdvk_current_user";
const USERS_LIST_KEY = "vdvk_registered_users";

export function getCurrentUser() {
  try {
    const raw = localStorage.getItem(USER_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

export function setCurrentUser(user) {
  if (user) {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(USER_STORAGE_KEY);
  }
  updateHeaderAuth();
  window.dispatchEvent(new CustomEvent("auth-changed", { detail: { user } }));
}

export function getRegisteredUsers() {
  try {
    const raw = localStorage.getItem(USERS_LIST_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function registerUser(userData) {
  const users = getRegisteredUsers();
  const existing = users.find((u) => u.email.toLowerCase() === userData.email.toLowerCase());
  if (existing) {
    return { success: false, message: "Email này đã được đăng ký tài khoản!" };
  }

  const newUser = {
    id: Date.now(),
    fullName: userData.fullName,
    email: userData.email,
    phone: userData.phone || "",
    password: userData.password,
    address: userData.address || "",
    joinedAt: new Date().toLocaleDateString("vi-VN")
  };

  users.push(newUser);
  localStorage.setItem(USERS_LIST_KEY, JSON.stringify(users));

  // Tự động đăng nhập sau khi đăng ký
  const safeUser = { ...newUser };
  delete safeUser.password;
  setCurrentUser(safeUser);

  return { success: true, user: safeUser };
}

export function loginUser(email, password) {
  const users = getRegisteredUsers();
  const user = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );

  if (user) {
    const safeUser = { ...user };
    delete safeUser.password;
    setCurrentUser(safeUser);
    return { success: true, user: safeUser };
  }

  // Cho phép đăng nhập tài khoản demo mặc định nếu chưa tạo
  if (email === "demo@gmail.com" && password === "123456") {
    const demoUser = {
      id: 999,
      fullName: "Khách Quý Xứ Quảng",
      email: "demo@gmail.com",
      phone: "0974678820",
      joinedAt: "01/01/2026"
    };
    setCurrentUser(demoUser);
    return { success: true, user: demoUser };
  }

  return { success: false, message: "Email hoặc mật khẩu không chính xác!" };
}

export function logoutUser() {
  setCurrentUser(null);
  window.location.reload();
}

/**
 * Cập nhật giao diện nút Đăng nhập trên Header
 */
export function updateHeaderAuth() {
  const loginContainers = document.querySelectorAll(".login");
  const currentUser = getCurrentUser();

  loginContainers.forEach((container) => {
    if (currentUser) {
      const shortName = currentUser.fullName.split(" ").pop() || "Bạn";
      container.innerHTML = `
        <div class="user-menu-wrapper">
          <button type="button" class="user-avatar-btn" id="user-menu-btn" aria-label="Tài khoản">
            <span class="user-avatar-initial">${shortName.charAt(0).toUpperCase()}</span>
            <span class="user-avatar-name">${shortName}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
          <div class="user-dropdown-menu" id="user-dropdown">
            <div class="user-dropdown-header">
              <strong>${currentUser.fullName}</strong>
              <small>${currentUser.email}</small>
            </div>
            <a href="${getPageUrl("order-form.html")}" class="user-dropdown-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              Giỏ hàng & Đơn hàng
            </a>
            <button type="button" class="user-dropdown-item logout-btn" id="header-logout-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
              Đăng xuất
            </button>
          </div>
        </div>
      `;

      const menuBtn = container.querySelector("#user-menu-btn");
      const dropdown = container.querySelector("#user-dropdown");
      const logoutBtn = container.querySelector("#header-logout-btn");

      if (menuBtn && dropdown) {
        menuBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          dropdown.classList.toggle("show");
        });

        document.addEventListener("click", () => {
          dropdown.classList.remove("show");
        });
      }

      if (logoutBtn) {
        logoutBtn.addEventListener("click", (e) => {
          e.preventDefault();
          logoutUser();
        });
      }
    } else {
      container.innerHTML = `
        <a href="${getPageUrl("login.html")}" class="login-button">Đăng nhập</a>
      `;
    }
  });
}
