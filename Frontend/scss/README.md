# HỆ THỐNG KIẾN TRÚC SCSS (SASS 7-1 MODULAR ARCHITECTURE)
## Dự án: Website Thương Mại Điện Tử "Vè Dệt Vân Khăn"

---

### 1. Tổng quan kiến trúc SCSS

Dự án áp dụng mô hình phân tách thư mục theo chuẩn **7-1 Pattern / Modular Sass** hiện đại, tách biệt hoàn toàn giữa cấu hình biến token (variables), mixins tái sử dụng, định dạng cơ sở (base), bố cục (layout), các component độc lập và giao diện theo từng trang (pages).

```text
Frontend/scss/
├── abstracts/               # Các file không sinh mã CSS trực tiếp
│   ├── _variables.scss      # Biến Sass màu sắc, dải màu gradient, đổ bóng, font, breakpoint
│   ├── _mixins.scss         # Mixin media query responsive, flexbox, glassmorphism, truncate, button
│   ├── _functions.scss      # Hàm tiện ích tính toán đơn vị (rem, em)
│   └── _index.scss          # Tập hợp chuyển tiếp (@forward) toàn bộ abstracts
├── base/                    # Chuẩn hóa CSS nền tảng
│   ├── _reset.scss          # Reset box-sizing, margin, padding, typography mặc định
│   └── _typography.scss     # Font chữ Inter, Playfair Display, Cormorant Garamond
├── layout/                  # Hệ thống lưới và căn chỉnh
│   ├── _container.scss      # .container giới hạn chiều rộng và gutter responsive
│   └── _grid.scss           # Hệ thống lưới sản phẩm .product-grid và tiêu đề .section-header
├── components/              # Các thành phần giao diện độc lập
│   ├── buttons.scss         # Nút bấm chính, phụ, coral, nút kích thước lớn/nhỏ
│   ├── chatbot.scss         # Cửa sổ trợ lý AI, nút FAB nổi, bong bóng tin nhắn, typing effect
│   ├── footer.scss          # Chân trang thương hiệu, liên kết, bản quyền, thông tin liên hệ Hà Nội
│   ├── form.scss            # Biểu mẫu tương tác, toast notification, ngăn kéo giỏ hàng mini-cart
│   ├── header.scss          # Thanh điều hướng nổi Glassmorphism, menu hamburger & dropdown mobile
│   └── product-card.scss    # Thẻ sản phẩm khăn lụa, ảnh tỉ lệ vuông 1:1, badge, câu vè, hiệu ứng hover
├── pages/                   # Style đặc thù cho từng trang
│   ├── home.scss            # Trang chủ: Hero slider, đường sóng wave, intro, ý nghĩa thương hiệu, giá trị cốt lõi
│   ├── products.scss        # Trang danh mục: Toolbar lọc, tab danh mục 2x2 grid mobile, tìm kiếm, sắp xếp
│   ├── product-detail.scss  # Trang chi tiết: Gallery 1:1, ảnh thumbnails, câu vè trích dẫn, bảng thông số, tab HDSD
│   ├── story.scss           # Trang câu chuyện: 3 ký tự Vè-Dệt-Vân Khăn, diễn tiến lịch sử, 6 câu vè di sản
│   └── payment.scss         # Trang đặt mua & liên hệ: Khung thông báo, mã QR Zalo, nút gọi trực tiếp Hotline
├── global.scss              # Style toàn cục (body, font, smooth scroll)
├── layout.scss              # Layout entry point
├── reset.scss               # Reset entry point
├── variables.scss           # CSS Custom Properties (:root) ánh xạ từ Sass variables
└── style.scss               # Master Bundle: Tổng hợp toàn bộ hệ thống stylesheet
```

---

### 2. Các tính năng SCSS tiêu biểu đã triển khai

#### 2.1. Quản lý Biến (Variables)
- **Màu thương hiệu**: `$color-primary` (`#df5b64`), `$color-secondary` (`#7b963d`), `$color-green-deep` (`#355b35`), `$color-background` (`#fffdfb`).
- **Gradients**: `$gradient-brand`, `$gradient-green`, `$gradient-pink`, `$gradient-footer`.
- **Breakpoints**: `$bp-mobile` (600px), `$bp-tablet` (850px), `$bp-lg` (1024px), `$bp-desktop` (1180px).

#### 2.2. Hàm và Mixin (Mixins & Functions)
- **Responsive Mixin**: `@include respond-to('mobile')`, `@include respond-to('tablet')`, `@include respond-to('lg')` giúp viết media query trực quan ngay bên trong selector tương ứng.
- **Flexbox Helpers**: `@include flex-center()`, `@include flex-between()`, `@include flex-column()`.
- **Hiệu ứng Kính Mờ (Glassmorphism)**: `@include glassmorphism()` với `backdrop-filter: blur(16px)` và viền xanh bán trong suốt.
- **Rút gọn văn bản**: `@include text-truncate($lines)` tạo dấu chấm lửng đa dòng mượt mà.
- **Card Hover Elevation**: `@include card-hover()` nâng thẻ sản phẩm khi di chuột.

#### 2.3. Lồng cấu trúc (Nesting) & Toán tử Parent (`&`)
- Toàn bộ component (`.navbar`, `.product-card`, `.chatbot-window`, `.mini-cart-drawer`, `.slider-dots`) được lồng logic rõ ràng, dùng `&.active`, `&:hover`, `&::before`, `&::after` đúng chuẩn BEM và Sass.

---

### 3. Hướng dẫn Biên dịch SCSS sang CSS

Dự án đã tích hợp công cụ biên dịch chính thức `sass` (Dart Sass) trong `package.json`.

#### Biên dịch một lần:
```bash
npm run build:sass
```

#### Biên dịch tự động khi sửa file (Watch Mode):
```bash
npm run watch:sass
```

Lệnh trên sẽ quét toàn bộ thư mục `Frontend/scss` và xuất ra các file CSS tương ứng trong `Frontend/css/` hoàn toàn tự động, tương thích 100% với các thẻ `<link rel="stylesheet">` hiện tại của website.
