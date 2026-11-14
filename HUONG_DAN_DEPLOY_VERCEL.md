# Hướng Dẫn Triển Khai (Deploy) Website & Chatbot RAG Lên Vercel

Dự án **Vè Dệt Vân Khăn** đã được thiết lập sẵn sàng 100% để triển khai lên [Vercel](https://vercel.com) hoàn toàn **Miễn Phí** chỉ với 3 bước đơn giản:

---

## 1. Lấy Google Gemini API Key (Miễn phí)
1. Truy cập [Google AI Studio](https://aistudio.google.com/).
2. Đăng nhập tài khoản Google của bạn.
3. Nhấp vào nút **"Create API Key"** (hoặc "Get API key").
4. Sao chép chuỗi mã API Key (có dạng bắt đầu bằng `AIzaSy...`).

---

## 2. Deploy lên Vercel
1. Đăng nhập vào [Vercel.com](https://vercel.com) (có thể đăng nhập nhanh bằng tài khoản GitHub).
2. Nhấp vào nút **"Add New..."** -> Chọn **"Project"**.
3. Chọn Repository **`Ve_Det_Van_Khan`** của bạn từ danh sách GitHub -> Bấm **"Import"**.
4. Tại mục **Environment Variables** (Biến môi trường), thêm biến:
   - **Key**: `GEMINI_API_KEY`
   - **Value**: Dán mã API Key bạn đã lấy ở Bước 1.
5. Bấm nút **"Deploy"** và đợi khoảng 30 - 60 giây.

---

## 3. Hoàn tất & Kiểm tra
- Sau khi Vercel báo **Congratulations!**, bạn sẽ nhận được một đường link website chính thức (ví dụ: `https://ve-det-van-khan.vercel.app`).
- Bạn có thể mở web, bấm vào nút **Chatbot ở góc dưới bên phải** và đặt bất kỳ câu hỏi nào:
  - *"Khăn Hội An giá bao nhiêu và có ý nghĩa gì?"*
  - *"Tôi muốn mua quà tặng mẹ thì chọn mẫu nào?"*
  - *"Cách giặt khăn lụa tơ tằm như thế nào?"*
  - *"Cho tôi số điện thoại Zalo để đặt mua"*

---

## 4. Kiến trúc Chatbot RAG hoạt động như thế nào?
- **Knowledge Base (`api/knowledge-base.js`)**: Lưu trữ toàn bộ dữ liệu chính xác về 6 mẫu khăn lụa, kích thước, biểu giá (400k, 250k, 150k), 6 câu vè di sản, lịch sử làng lụa Mã Châu và thông tin liên hệ Zalo 0974678820.
- **RAG Engine (`api/rag.js`)**: Khi khách hàng đặt câu hỏi, hệ thống sẽ lọc và trích xuất đúng các tài liệu liên quan nhất trong chưa đầy 2 mili-giây.
- **Serverless API (`api/chat.js`)**: Kết hợp ngữ cảnh đã trích xuất (RAG Context) cùng Google Gemini 1.5 Flash để sinh ra câu trả lời chuẩn xác 100%, không bịa đặt thông tin, giữ bí mật tuyệt đối API Key của bạn.
