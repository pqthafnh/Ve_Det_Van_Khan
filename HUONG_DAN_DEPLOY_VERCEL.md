# Hướng Dẫn Triển Khai (Deploy) Website & Chatbot RAG Lên Vercel

Dự án **Vè Dệt Vân Khăn** đã được thiết lập sẵn sàng 100% để triển khai lên [Vercel](https://vercel.com) hoàn toàn **Miễn Phí**.

---

## 1. Lấy Google Gemini API Key (Miễn phí)
1. Truy cập [Google AI Studio](https://aistudio.google.com/).
2. Đăng nhập tài khoản Google của bạn.
3. Nhấp vào nút **"Create API Key"** (hoặc "Get API key").
4. Sao chép chuỗi mã API Key (có dạng bắt đầu bằng `AIzaSy...`).

---

## 2. Thiết lập API Key trên Vercel
Khi dự án đã được deploy trên Vercel, bạn vào Vercel Dashboard của dự án:
1. Vào tab **Settings** -> mục **Environment Variables**.
2. Thêm biến môi trường:
   - **Key**: `GEMINI_API_KEY` (Hệ thống cũng tự động hỗ trợ các tên biến khác như `GOOGLE_API_KEY`, `API_KEY`).
   - **Value**: Dán mã API Key bạn đã lấy ở Bước 1.
   - **Environment**: Tích chọn cả 3 ô (**Production**, **Preview**, **Development**).
3. Nhấn **Save**.

> [!IMPORTANT]
> **LƯU Ý BẮT BUỘC TRÊN VERCEL:**
> Khi thêm hoặc chỉnh sửa biến môi trường (Environment Variable), **Vercel không tự động cập nhật ngay trên bản build cũ**.
> Bạn cần vào tab **Deployments** -> Bấm vào dấu `...` ở bản deploy mới nhất -> Chọn **Redeploy** (hoặc mỗi khi bạn push commit mới lên GitHub, Vercel sẽ tự động build lại với API Key mới).

---

## 3. Cách Kiểm Tra API Key & Chatbot Trực Tiếp

### Bước 1: Kiểm tra xem Vercel đã nhận diện API Key chưa
Truy cập trực tiếp đường link API trên trình duyệt của bạn:
👉 `https://<tên-miền-vercel-của-bạn>/api/chat`

- Nếu trả về:
  ```json
  {
    "status": "online",
    "hasApiKey": true,
    "detectedVariable": "GEMINI_API_KEY",
    "message": "API Key đã được Vercel nhận diện thành công!"
  }
  ```
  => Chúc mừng bạn, Vercel đã nạp API Key thành công 100%!
- Nếu trả về `"hasApiKey": false`:
  => Bạn chưa nhấn **Redeploy** sau khi thêm biến trong Settings, hoặc bạn chỉ tích ô Development thay vì Production. Hãy vào **Deployments > ... > Redeploy**.

### Bước 2: Trải nghiệm Chatbot trên giao diện website
- Mở trang web của bạn: `https://<tên-miền-vercel-của-bạn>/`
- Bấm vào nút **Chatbot ở góc dưới bên phải** và hỏi:
  - *"Khăn Hội An giá bao nhiêu và có ý nghĩa gì?"*
  - *"Tôi muốn mua quà tặng mẹ thì chọn mẫu nào?"*
  - *"Cách giặt khăn lụa tơ tằm như thế nào?"*
  - *"Cho tôi số điện thoại Zalo để đặt mua"*

---

## 4. Giải thích các cải tiến Routing Vercel vừa cập nhật
- **Khắc phục triệt để lỗi 404 NOT_FOUND trên các trang con**: Trước đây tính năng `cleanUrls: true` trong `vercel.json` tự động cắt đuôi `.html` và chuyển hướng 308 sai thư mục `Frontend/`. Hiện tại hệ thống định tuyến đã được cấu hình toàn diện để hỗ trợ cả 2 định dạng:
  - Có đuôi: `/pages/products.html`, `/pages/story.html`, `/pages/product-detail.html`, `/pages/payment.html`.
  - Không đuôi: `/pages/products`, `/pages/story`, `/pages/product-detail`, `/pages/payment`, `/products`, `/story`.
- **Độc lập hóa API Route**: Không để các rule rewrite tĩnh can thiệp vào `/api/chat`, giúp Serverless Function kết nối Gemini AI tức thì với độ trễ thấp nhất.
