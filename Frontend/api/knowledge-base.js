/**
 * KNOWLEDGE-BASE.JS - VÈ DỆT VÂN KHĂN
 * Cơ sở tri thức chuẩn (Ground Truth Knowledge Base) cho hệ thống RAG.
 * Mọi câu trả lời của AI đều được đối chiếu và sinh từ các chunk tri thức này.
 */

export const KNOWLEDGE_BASE = [
  {
    id: "brand-overview",
    title: "Giới thiệu thương hiệu Vè Dệt Vân Khăn & Sứ mệnh du lịch xanh",
    category: "brand",
    keywords: [
      "vè dệt vân khăn", "thương hiệu", "sứ mệnh", "giới thiệu", "du lịch xanh",
      "ý nghĩa", "slogan", "bảo tồn văn hóa", "lụa mã châu", "xứ quảng"
    ],
    content: `Vè Dệt Vân Khăn là dự án văn hóa sáng tạo, kết hợp giữa chất liệu lụa Mã Châu truyền thống (Duy Xuyên, Quảng Nam), câu vè dân gian xứ Quảng mộc mạc và hình ảnh các danh lam thắng cảnh tiêu biểu của vùng đất Đà Nẵng – Quảng Nam.
Slogan chính thức: "Dệt tơ thành lụa, dệt vè thành duyên".
Sứ mệnh: Gìn giữ và lan tỏa di sản văn hóa phi vật thể xứ Quảng đến với đời sống hiện đại và du khách, đồng thời tôn vinh lối sống bền vững, tinh thần "du lịch xanh" thông qua việc sử dụng lụa 100% tự nhiên, nhuộm thảo mộc, không vi nhựa và có khả năng phân hủy sinh học.`
  },
  {
    id: "brand-naming",
    title: "Ý nghĩa tên gọi: Vè - Dệt - Vân Khăn",
    category: "brand",
    keywords: [
      "ý nghĩa tên gọi", "vè", "dệt", "vân khăn", "tại sao tên là", "nguồn gốc tên"
    ],
    content: `Tên gọi "Vè Dệt Vân Khăn" là sự đúc kết từ 3 tầng giá trị văn hóa:
1. "Vè" (Hồn vè xứ Quảng): Nét kể chuyện mộc mạc, bình dị, giàu nhạc điệu của văn hóa dân gian xứ Quảng, lưu giữ tình cảm cội nguồn, tình yêu đôi lứa và tinh thần kiên cường.
2. "Dệt" (Dệt lụa trăm năm): Tinh hoa lao động thủ công của nghệ nhân làng lụa Mã Châu hơn 400 năm bên dòng Thu Bồn.
3. "Vân Khăn" (Nét đẹp di sản & mây trời): "Vân" nghĩa là mây trời, gấm vóc, là những đường vân tơ óng ả mềm mại. "Khăn" là vật phẩm truyền thống gắn liền với đời sống người Việt. Vân Khăn biểu trưng cho sự thanh nhã, duyên dáng và chiều sâu tâm hồn người phụ nữ Việt Nam.`
  },
  {
    id: "product-1-my-son",
    title: "Khăn Lụa Mã Châu - Thánh Địa Mỹ Sơn (Khăn dài 65x145cm)",
    category: "product",
    keywords: [
      "thánh địa mỹ sơn", "mỹ sơn", "khăn dài", "chăm pa", "đỏ gạch", "cam son",
      "tinh thần đấu tranh", "tình thương", "400000", "400.000", "khăn số 1"
    ],
    content: `Sản phẩm 1: Khăn Lụa Mã Châu - Thánh Địa Mỹ Sơn.
- Kiểu dáng: Khăn dài (dài quàng cổ, khoác vai, phối áo dài hoặc váy dự tiệc).
- Kích thước: 65cm x 145cm.
- Chất liệu: 100% Lụa Mã Châu tơ tằm tự nhiên cao cấp, dệt thoi thủ công truyền thống.
- Màu sắc: Tông màu đỏ gạch nung và cam son chủ đạo, gợi nhắc sắc tháp cổ ngàn năm.
- Di sản đại diện: Quần thể đền tháp Thánh địa Mỹ Sơn (Di sản văn hóa thế giới UNESCO, Duy Xuyên, Quảng Nam) – dấu ấn rực rỡ của văn minh Chăm Pa.
- Giá bán ưu đãi: 400.000 VNĐ (giá gốc: 480.000 VNĐ).
- Câu vè đúc kết:
  "Căm thù ấy càng thêm nung nấu
  Vác xác con lên thấu tỉnh đường
  Súng nào ngăn nổi tình thương
  Gươm nào gom nổi con đường đấu tranh"
- Ý nghĩa: Khắc họa tinh thần kiên cường, bất khuất của con người xứ Quảng và sức mạnh tình thương vượt lên mọi thử thách gian lao.`
  },
  {
    id: "product-2-hoi-an",
    title: "Khăn Lụa Mã Châu - Phố Cổ Hội An (Khăn vuông 68x68cm)",
    category: "product",
    keywords: [
      "phố cổ hội an", "hội an", "khăn vuông", "vàng mù tạt", "sông hoài", "hoa giấy",
      "niềm tự hào", "nở hoa", "250000", "250.000", "khăn số 2"
    ],
    content: `Sản phẩm 2: Khăn Lụa Mã Châu - Phố Cổ Hội An.
- Kiểu dáng: Khăn vuông (thắt nơ cổ áo sơ mi, trùm tóc dạo phố, làm phụ kiện túi xách).
- Kích thước: 68cm x 68cm.
- Chất liệu: 100% Lụa Mã Châu tự nhiên, mềm mại, thoáng mát bốn mùa.
- Màu sắc: Nền viền vàng mù tạt đặc trưng của những bức tường cổ rêu phong Hội An bên dòng sông Hoài thơ mộng.
- Di sản đại diện: Đô thị cổ Hội An (Di sản văn hóa thế giới UNESCO).
- Giá bán ưu đãi: 250.000 VNĐ (giá gốc: 300.000 VNĐ).
- Câu vè đúc kết:
  "Mảnh đất quê ta
  Quảng Nam, Đà Nẵng
  Hết ngày cay đắng
  Nay đã nở hoa"
- Ý nghĩa: Khắc họa hành trình đổi thay kỳ diệu của quê hương từ những tháng ngày gian khó đến diện mạo phồn vinh hôm nay, tôn vinh sức sống bền bỉ và tình yêu mảnh đất xứ Quảng.`
  },
  {
    id: "product-3-hon-to",
    title: "Khăn Lụa Mã Châu - Hồn Tơ Xứ Quảng (Khăn dài 65x145cm)",
    category: "product",
    keywords: [
      "hồn tơ xứ quảng", "hòn kẽm đá dừng", "làng lụa mã châu", "khăn dài",
      "xanh thiên thanh", "trắng kem", "tình cảm gia đình", "hiếu thảo", "400000", "400.000", "khăn số 3"
    ],
    content: `Sản phẩm 3: Khăn Lụa Mã Châu - Hồn Tơ Xứ Quảng & Hòn Kẽm Đá Dừng.
- Kiểu dáng: Khăn dài truyền thống sang trọng (rất phù hợp làm quà biếu cha mẹ, thầy cô, đối tác ngoại giao).
- Kích thước: 65cm x 145cm.
- Chất liệu: 100% Lụa tơ tằm Mã Châu dệt thủ công.
- Màu sắc: Nền trắng kem trang nhã kết hợp khung viền và họa tiết xanh thiên thanh thanh lịch.
- Danh thắng đại diện: Làng lụa Mã Châu & thắng cảnh Hòn Kẽm Đá Dừng bên thượng nguồn Thu Bồn.
- Giá bán ưu đãi: 400.000 VNĐ (giá gốc: 480.000 VNĐ).
- Câu vè đúc kết:
  "Ngó lên Hòn Kẽm Đá Dừng
  Thương cha nhớ mẹ quá chừng bạn ơi
  Thương cha nhớ mẹ ngậm ngùi
  Mỏng mỏng một lá buổi mai rừng chít"
- Ý nghĩa: Tôn vinh đạo hiếu, tình cảm gia đình sâu nặng và nỗi nhớ thương cội nguồn da diết của người con xứ Quảng đi xa.`
  },
  {
    id: "product-4-cau-rong",
    title: "Khăn Lụa Mã Châu - Cầu Rồng Sức Sống (Khăn vuông 68x68cm)",
    category: "product",
    keywords: [
      "cầu rồng", "đà nẵng", "sông hàn", "khăn vuông", "vàng tươi", "xanh dương",
      "sức sống", "đổi mới", "250000", "250.000", "khăn số 4"
    ],
    content: `Sản phẩm 4: Khăn Lụa Mã Châu - Cầu Rồng Sức Sống.
- Kiểu dáng: Khăn vuông trẻ trung, năng động.
- Kích thước: 68cm x 68cm.
- Chất liệu: 100% Lụa Mã Châu tự nhiên bóng mịn.
- Màu sắc: Nền trắng viền vàng tươi sáng, hòa cùng mảng màu xanh dương biểu trưng cho sông Hàn và bầu trời thành phố biển Đà Nẵng.
- Biểu tượng đại diện: Cầu Rồng – Biểu tượng cho khát vọng vươn mình, sức trẻ và sự phát triển thịnh vượng của Đà Nẵng.
- Giá bán ưu đãi: 250.000 VNĐ (giá gốc: 300.000 VNĐ).
- Câu vè đúc kết:
  "Ngày xưa măng lụi, tre tàn
  Ngày nay nô nức, xóm làng vui ca
  Hôm nay xán lạn sơn hà
  Hoan hô nước Việt Nam Dân Chủ Cộng Hòa muôn năm"
- Ý nghĩa: Khúc ca về niềm vui đổi mới, lòng tự hào về quê hương đất nước ngày càng tươi đẹp, tràn trề sinh khí.`
  },
  {
    id: "product-5-cu-lao-cham",
    title: "Khăn Twilly Lụa - Cù Lao Chàm Sắc Xanh (Twilly 6x75cm)",
    category: "product",
    keywords: [
      "cù lao chàm", "twilly", "khăn quàng cổ", "xanh biển", "tình yêu",
      "du lịch xanh", "san hô", "150000", "150.000", "khăn số 5"
    ],
    content: `Sản phẩm 5: Khăn Twilly Lụa - Cù Lao Chàm Sắc Xanh.
- Kiểu dáng: Khăn dáng dài thanh mảnh (Twilly) tiện dụng: thắt cổ áo sơ mi, quấn quai túi xách, buộc tóc hoặc đeo cổ tay thời trang.
- Kích thước: 6cm x 75cm.
- Chất liệu: 100% Lụa tơ tằm Mã Châu tự nhiên.
- Màu sắc: Phủ trọn sắc xanh biển sâu, xanh lam và màu của sóng nước rạn san hô hoang sơ.
- Danh thắng đại diện: Cù Lao Chàm – Khu dự trữ sinh quyển thế giới với biển xanh ngọc bích và tinh thần nói không với túi nilon, bảo vệ đại dương.
- Giá bán ưu đãi: 150.000 VNĐ (giá gốc: 200.000 VNĐ).
- Câu vè đúc kết:
  "Ngồi buồn trách phận giận mình
  Số chi ta sớm thành đôi bạn, số chi mình lửng lơ..."
- Ý nghĩa: Nét tâm sự tình yêu đôi lứa mộc mạc, chân chất và duyên ngầm của cư dân miền biển đảo.`
  },
  {
    id: "product-6-ngu-hanh-son",
    title: "Khăn Twilly Lụa - Ngũ Hành Sơn Non Nước (Twilly 6x75cm)",
    category: "product",
    keywords: [
      "ngũ hành sơn", "non nước", "twilly", "khăn quàng cổ", "xanh ngọc bích",
      "bác hồ", "tâm linh", "150000", "150.000", "khăn số 6"
    ],
    content: `Sản phẩm 6: Khăn Twilly Lụa - Ngũ Hành Sơn Non Nước.
- Kiểu dáng: Khăn Twilly thanh thoát, trang nhã.
- Kích thước: 6cm x 75cm.
- Chất liệu: 100% Lụa Mã Châu cao cấp.
- Màu sắc: Tông xanh ngọc bích và xanh lục nhạt hòa cùng cỏ cây non nước kỳ vĩ.
- Danh thắng đại diện: Quần thể Ngũ Hành Sơn (Kim, Mộc, Thủy, Hỏa, Thổ) – Di tích quốc gia đặc biệt với vẻ đẹp tâm linh, làng nghề đá Non Nước danh tiếng.
- Giá bán ưu đãi: 150.000 VNĐ (giá gốc: 200.000 VNĐ).
- Câu vè đúc kết:
  "Được gần Bác những chiều hôm
  Được dâng lên Bác chén cơm gạo mùa"
- Ý nghĩa: Bày tỏ lòng biết ơn vô hạn và tình cảm kính yêu Bác Hồ thiêng liêng, mộc mạc qua hình ảnh chén cơm gạo mùa nghĩa tình của đồng bào miền Trung.`
  },
  {
    id: "craft-village-history",
    title: "Làng lụa Mã Châu hơn 400 năm truyền thống & Quy trình sản xuất",
    category: "heritage",
    keywords: [
      "làng nghề", "mã châu", "duy xuyên", "thu bồn", "400 năm", "lịch sử",
      "chúa nguyễn", "tiến vua", "quy trình dệt", "ươm tơ", "nuôi tằm", "dệt thoi"
    ],
    content: `Lịch sử và nét độc đáo của Làng Lụa Mã Châu:
- Vị trí: Thị trấn Nam Phước, huyện Duy Xuyên, tỉnh Quảng Nam (nằm hiền hòa bên dòng sông Thu Bồn).
- Bề dày lịch sử: Hình thành từ thế kỷ XV - XVI dưới thời các chúa Nguyễn, hơn 400 năm gìn giữ nghề trồng dâu, nuôi tằm, ươm tơ, dệt lụa.
- Danh tiếng: Từng là nơi dệt nên những thước lụa hảo hạng tiến vua và xuất khẩu qua thương cảng quốc tế Faifo (Hội An) trên con đường tơ lụa trên biển.
- Quy trình chế tác:
  1. Trồng dâu nuôi tằm: Nuôi tằm ăn lá dâu tươi vùng bãi bồi sông Thu Bồn.
  2. Ươm tơ kéo sợi: Tuyển chọn sợi tơ óng ả, độ dai tự nhiên.
  3. Dệt thoi truyền thống: Dệt thủ công trên khung cửi cổ truyền.
  4. Nhuộm thảo mộc: Sử dụng nguyên liệu tự nhiên bản địa (vỏ cây, lá chàm, củ nâu...), an toàn tuyệt đối cho làn da người sử dụng và thân thiện với môi trường.`
  },
  {
    id: "care-instructions",
    title: "Hướng dẫn bảo quản & giặt khăn lụa tơ tằm bền đẹp",
    category: "guide",
    keywords: [
      "giặt lụa", "bảo quản", "chăm sóc lụa", "giặt khăn", "ủi lụa", "dầu gội",
      "nước mát", "phơi bóng râm", "bền đẹp"
    ],
    content: `Cách giặt và giữ gìn khăn lụa tơ tằm Mã Châu luôn óng ả:
1. Giặt tay nhẹ nhàng: Sử dụng nước mát dưới 30°C với dầu gội đầu dịu nhẹ hoặc sữa tắm. Tuyệt đối không dùng bột giặt có chất tẩy mạnh hoặc thuốc tẩy clo.
2. Không vắt xoắn: Vắt xoắn sẽ làm gãy nếp sợi tơ tự nhiên. Hãy đặt khăn lên một chiếc khăn bông sạch rồi cuộn lại ấn nhẹ để thấm ráo nước.
3. Phơi nơi râm mát: Phơi ở nơi thoáng gió, tránh phơi trực tiếp dưới ánh nắng mặt trời gay gắt để tránh phai màu sợi lụa.
4. Ủi ấm (là hơi): Ủi ở nhiệt độ thấp (chế độ Silk) khi khăn còn hơi ẩm, hoặc ủi qua một lớp vải mỏng để bảo vệ độ bóng tự nhiên.`
  },
  {
    id: "ordering-and-contact",
    title: "Chính sách đặt mua, tư vấn qua Zalo & Thông tin liên hệ",
    category: "contact",
    keywords: [
      "đặt mua", "mua hàng", "liên hệ", "zalo", "hotline", "thanh toán", "hà nội",
      "0974678820", "tư vấn", "chuyển khoản", "quét qr"
    ],
    content: `Thông tin đặt mua & liên hệ chính thức của Vè Dệt Vân Khăn:
- Quy trình mua hàng hiện tại: Do sản phẩm được làm từ lụa thủ công giới hạn theo từng đợt dệt, quý khách bấm nút "Mua ngay" hoặc quét mã QR Zalo để nhắn tin trực tiếp với cửa hàng.
- Hotline / Zalo: 0974 678 820 (Link: https://zalo.me/0974678820).
- Khu vực hoạt động chính: Hà Nội (Văn phòng đại diện & giao dịch) & Quảng Nam - Đà Nẵng (Xưởng làng nghề).
- Email: vedetvankhan@gmail.com
- Fanpage: Vè Dệt Vân Khăn
- Instagram: @vedetvankhan
- TikTok: Vè Dệt Vân Khăn
- Thanh toán: Hỗ trợ chuyển khoản ngân hàng qua mã QR tiện lợi, sau đó gửi xác nhận qua Zalo để nhân viên kiểm tra và đóng gói quà trang trọng gửi đến quý khách.`
  },
  {
    id: "pricing-comparison",
    title: "Bảng tổng hợp giá cả 6 mẫu khăn lụa",
    category: "pricing",
    keywords: [
      "bảng giá", "giá bao nhiêu", "bao nhiêu tiền", "giá cả", "so sánh giá", "khăn nào rẻ nhất"
    ],
    content: `Bảng giá niêm yết ưu đãi của 6 mẫu khăn Vè Dệt Vân Khăn:
1. Nhóm Khăn Dài (65x145cm) - Giá 400.000 VNĐ/chiếc (giá gốc: 480.000 VNĐ):
   - Khăn Thánh Địa Mỹ Sơn
   - Khăn Hồn Tơ Xứ Quảng (Hòn Kẽm Đá Dừng)
2. Nhóm Khăn Vuông (68x68cm) - Giá 250.000 VNĐ/chiếc (giá gốc: 300.000 VNĐ):
   - Khăn Phố Cổ Hội An
   - Khăn Cầu Rồng Sức Sống
3. Nhóm Khăn Quàng Cổ Twilly (6x75cm) - Giá 150.000 VNĐ/chiếc (giá gốc: 200.000 VNĐ):
   - Khăn Twilly Cù Lao Chàm Sắc Xanh
   - Khăn Twilly Ngũ Hành Sơn Non Nước`
  }
];
