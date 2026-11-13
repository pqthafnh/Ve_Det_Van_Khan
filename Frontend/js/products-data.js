/**
 * DỮ LIỆU SẢN PHẨM CHÍNH THỨC - VÈ DỆT VÂN KHĂN
 * Nguồn: mapping.md & Tài liệu dự án "Nội dung Web dlx.docx"
 * 6 chiếc khăn lụa Mã Châu tương ứng 6 câu chuyện văn hóa, 6 câu vè và 6 danh thắng xứ Quảng.
 */

const isInPages = typeof window !== "undefined" && window.location.pathname.toLowerCase().includes("/pages/");
const baseImgPath = isInPages ? "../assets/images/" : "assets/images/";
const baseBannerPath = isInPages ? "../assets/images/banner/" : "assets/images/banner/";

/**
 * Trả về URL hợp lệ của trang tùy theo trang hiện tại đang ở root (Frontend/index.html) hay trong thư mục pages/
 */
export function getPageUrl(pageName) {
  const inPages = typeof window !== "undefined" && window.location.pathname.toLowerCase().includes("/pages/");
  if (pageName === "index.html") {
    return inPages ? "../index.html" : "index.html";
  }
  return inPages ? pageName : `pages/${pageName}`;
}

export const PRODUCTS = [
  {
    id: 1,
    name: "Khăn Lụa Mã Châu - Thánh Địa Mỹ Sơn",
    slug: "khan-lua-ma-chau-thanh-dia-my-son",
    category: "Khăn dài",
    price: 400000,
    originalPrice: 480000,
    dimensions: "65cm x 145cm",
    material: "100% Lụa Mã Châu tự nhiên, dệt thoi truyền thống",
    color: "Tông màu đỏ gạch nung và cam son chủ đạo",
    landmark: "Thánh địa Mỹ Sơn – Dấu ấn văn hóa Chăm Pa",
    verse: `Căm thù ấy càng thêm nung nấu
Vác xác con lên thấu tỉnh đường
Súng nào ngăn nổi tình thương
Gươm nào gom nổi con đường đấu tranh`,
    verseMeaning: "Câu vè về tinh thần đấu tranh và sức mạnh tình thương: khắc họa tinh thần kiên cường, bất khuất của con người xứ Quảng và niềm tin son sắt vào chính nghĩa.",
    description: "Giữa thung lũng xanh huyền bí của Quảng Nam, Thánh địa Mỹ Sơn lưu giữ những đền tháp cổ kính, minh chứng cho một nền văn minh Chăm Pa rực rỡ. Qua hình ảnh trên khăn lụa, những đường nét kiến trúc tháp cổ được tái hiện với sắc đỏ gạch nung và cam son ấm áp, kể câu chuyện về lịch sử, tín ngưỡng và nghệ thuật ngàn năm.",
    image: `${baseImgPath}product-1.jpg`,
    gallery: [
      `${baseImgPath}product-1.jpg`,
      `${baseImgPath}product-1-pattern.jpg`,
      `${baseImgPath}product-1-detail.jpg`
    ],
    isFeatured: true,
    rating: 5,
    reviewsCount: 32,
    stock: 25,
    tag: "Di sản Chăm Pa"
  },
  {
    id: 2,
    name: "Khăn Lụa Mã Châu - Phố Cổ Hội An",
    slug: "khan-lua-ma-chau-pho-co-hoi-an",
    category: "Khăn vuông",
    price: 250000,
    originalPrice: 300000,
    dimensions: "68cm x 68cm",
    material: "100% Lụa Mã Châu (tơ tằm 100% tự nhiên)",
    color: "Nền viền vàng mù tạt đặc trưng của những bức tường cổ Hội An",
    landmark: "Hội An – Câu chuyện phố cổ bên dòng Hoài",
    verse: `Mảnh đất quê ta
Quảng Nam, Đà Nẵng
Hết ngày cay đắng
Nay đã nở hoa`,
    verseMeaning: "Bằng lời vè giản dị mà giàu cảm xúc, câu vè khắc họa hành trình đổi thay của quê hương Quảng Nam – Đà Nẵng, từ những tháng ngày gian khó đến diện mạo tươi đẹp hôm nay. Qua đó, câu vè tôn vinh sức sống bền bỉ của con người xứ Quảng và tình yêu dành cho mảnh đất quê hương.",
    description: "Bên dòng sông Hoài thơ mộng, Hội An lưu giữ vẻ đẹp của những mái ngói rêu phong, những bức tường vàng mù tạt và con phố nhỏ nhuốm màu thời gian. Từng là thương cảng sầm uất, Hội An mang trong mình câu chuyện giao thoa văn hóa và nhịp sống bình dị qua bao thế hệ. Trên từng thớ lụa, hình ảnh Hội An được tái hiện như một lời kể về miền di sản.",
    image: `${baseImgPath}product-2.jpg`,
    gallery: [
      `${baseImgPath}product-2.jpg`,
      `${baseImgPath}product-2-pattern.jpg`,
      `${baseImgPath}product-2-detail.jpg`
    ],
    isFeatured: true,
    rating: 5,
    reviewsCount: 42,
    stock: 28,
    tag: "Bán chạy nhất"
  },
  {
    id: 3,
    name: "Khăn Lụa Mã Châu - Hồn Tơ Xứ Quảng",
    slug: "khan-lua-ma-chau-hon-to-xu-quang",
    category: "Khăn dài",
    price: 400000,
    originalPrice: 480000,
    dimensions: "65cm x 145cm",
    material: "100% Lụa Mã Châu (tơ tằm 100% tự nhiên dệt thoi thủ công)",
    color: "Nền trắng kem kết hợp khung viền và họa tiết góc màu xanh thiên thanh",
    landmark: "Làng lụa Mã Châu – Hồn tơ xứ Quảng & Hòn Kẽm Đá Dừng",
    verse: `Ngó lên Hòn Kẽm Đá Dừng
Thương cha nhớ mẹ quá chừng bạn ơi
Thương cha nhớ mẹ ngậm ngùi
Mỏng mỏng một lá buổi mai rừng chít`,
    verseMeaning: "Vè về tình cảm gia đình: Ẩn sau lời vè mộc mạc là nỗi nhớ thương cha mẹ da diết và tình yêu sâu nặng dành cho quê hương, nguồn cội. Hình ảnh Hòn Kẽm Đá Dừng không chỉ gợi nhắc cảnh sắc xứ Quảng mà còn khơi dậy những cảm xúc thân thương về gia đình.",
    description: "Làng lụa Mã Châu hơn 400 năm lưu giữ nghề trồng dâu, nuôi tằm, ươm tơ, dệt lụa bên dòng Thu Bồn phù sa. Hình ảnh làng nghề trên nền lụa trắng kem viền xanh thiên thanh tôn vinh đôi bàn tay khéo léo, nét đẹp cần mẫn và tình yêu nghề truyền thống xứ Quảng.",
    image: `${baseImgPath}product-3.jpg`,
    gallery: [
      `${baseImgPath}product-3.jpg`,
      `${baseImgPath}product-3-pattern.jpg`,
      `${baseImgPath}product-3-detail.jpg`
    ],
    isFeatured: true,
    rating: 4.9,
    reviewsCount: 29,
    stock: 18,
    tag: "Di sản trăm năm"
  },
  {
    id: 4,
    name: "Khăn Lụa Mã Châu - Cầu Rồng Sức Sống",
    slug: "khan-lua-ma-chau-cau-rong-suc-song",
    category: "Khăn vuông",
    price: 250000,
    originalPrice: 300000,
    dimensions: "68cm x 68cm",
    material: "100% Lụa Mã Châu (tơ tằm 100% tự nhiên cao cấp)",
    color: "Nền trắng với khung viền vàng tươi, mảng màu xanh dương của bầu trời và mặt nước",
    landmark: "Cầu Rồng – Biểu tượng sức sống Đà Nẵng",
    verse: `Ngày xưa măng lụi, tre tàn
Ngày nay nô nức, xóm làng vui ca
Hôm nay xán lạn sơn hà
Hoan hô nước Việt Nam Dân Chủ Cộng Hòa muôn năm`,
    verseMeaning: "Vè về niềm vui đổi mới: Tái hiện sự chuyển mình của quê hương từ những năm tháng gian khó đến cuộc sống mới rực rỡ, hân hoan trước tương lai thịnh vượng.",
    description: "Cầu Rồng vươn mình qua dòng sông Hàn thơ mộng, là biểu tượng cho sức trẻ, sự năng động và khát vọng vươn tầm của Đà Nẵng. Trên nền lụa vuông 68x68cm, hình tượng Cầu Rồng kết hợp viền vàng và sắc xanh non nước mang lại nguồn năng lượng may mắn, tươi mới.",
    image: `${baseImgPath}product-4.jpg`,
    gallery: [
      `${baseImgPath}product-4.jpg`,
      `${baseImgPath}product-4-pattern.jpg`,
      `${baseImgPath}product-4-detail.jpg`
    ],
    isFeatured: true,
    rating: 4.8,
    reviewsCount: 24,
    stock: 20,
    tag: "Khát vọng vươn mình"
  },
  {
    id: 5,
    name: "Khăn Twilly Lụa - Cù Lao Chàm Sắc Xanh",
    slug: "khan-twilly-cu-lao-cham-sac-xanh",
    category: "Khăn quàng cổ Twilly",
    price: 150000,
    originalPrice: 200000,
    dimensions: "6cm x 75cm (dáng khăn twilly dài)",
    material: "100% Lụa Mã Châu (tơ tằm 100% tự nhiên)",
    color: "Phủ kín sắc xanh biển sâu, xanh dương và màu của sóng nước mây trời",
    landmark: "Cù Lao Chàm – Sắc xanh biển đảo & Khu dự trữ sinh quyển thế giới",
    verse: `Ngồi buồn trách phận giận mình
Số chi ta sớm thành đôi bạn, số chi mình lửng lơ...`,
    verseMeaning: "Vè về tình yêu đôi lứa: Truyền tải những cảm xúc trong tình yêu, những day dứt, nhớ thương mộc mạc và chân thành của người dân xứ biển đảo.",
    description: "Cù Lao Chàm nổi bật với biển xanh ngọc bích, rạn san hô nguyên sơ và hệ sinh thái trù phú. Thiết kế twilly thanh mảnh 6x75cm dễ dàng quàng cổ áo sơ mi, thắt quai túi xách hoặc làm băng đô, gửi gắm thông điệp bảo vệ thiên nhiên và lối sống xanh.",
    image: `${baseImgPath}product-5.jpg`,
    gallery: [
      `${baseImgPath}product-5.jpg`,
      `${baseImgPath}product-5-pattern.jpg`,
      `${baseImgPath}product-5-detail.jpg`
    ],
    isFeatured: false,
    rating: 4.9,
    reviewsCount: 19,
    stock: 30,
    tag: "Thời trang xanh"
  },
  {
    id: 6,
    name: "Khăn Twilly Lụa - Ngũ Hành Sơn Non Nước",
    slug: "khan-twilly-ngu-hanh-son-non-nuoc",
    category: "Khăn quàng cổ Twilly",
    price: 150000,
    originalPrice: 200000,
    dimensions: "6cm x 75cm (dáng khăn twilly dài)",
    material: "100% Lụa Mã Châu (tơ tằm 100% tự nhiên)",
    color: "Tông màu xanh ngọc bích, xanh lục nhạt hòa quyện cùng thiên nhiên non nước",
    landmark: "Ngũ Hành Sơn – Vẻ đẹp non nước và tâm linh",
    verse: `Được gần Bác những chiều hôm
Được dâng lên Bác chén cơm gạo mùa`,
    verseMeaning: "Vè về lòng kính yêu Bác Hồ: Gửi gắm tình cảm thiêng liêng, lòng biết ơn sâu sắc qua hình ảnh chén cơm gạo mùa chân chất của đồng bào xứ Quảng.",
    description: "Ngũ Hành Sơn – kiệt tác non bộ giữa lòng thành phố biển với năm ngọn núi Kim, Mộc, Thủy, Hỏa, Thổ. Thiết kế twilly xanh ngọc bích trang nhã mang lại sự bình an, thanh thoát cho người đeo trong mọi dịp xuất hiện.",
    image: `${baseImgPath}product-6.jpg`,
    gallery: [
      `${baseImgPath}product-6.jpg`,
      `${baseImgPath}product-6-pattern.jpg`,
      `${baseImgPath}product-6-detail.jpg`
    ],
    isFeatured: false,
    rating: 5,
    reviewsCount: 22,
    stock: 25,
    tag: "Non nước tâm linh"
  }
];

export function getProductById(id) {
  const numericId = parseInt(id, 10);
  return PRODUCTS.find((p) => p.id === numericId) || null;
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND"
  }).format(amount).replace("₫", "VNĐ");
}
