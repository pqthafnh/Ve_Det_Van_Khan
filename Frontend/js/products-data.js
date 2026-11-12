/**
 * DỮ LIỆU SẢN PHẨM CHÍNH THỨC - VÈ DỆT VÂN KHĂN
 * Nguồn: Tài liệu dự án "Nội dung Web dlx.docx"
 * 6 chiếc khăn lụa Mã Châu tương ứng 6 câu chuyện văn hóa, 6 câu vè và 6 danh thắng xứ Quảng.
 */

export const PRODUCTS = [
  {
    id: 1,
    name: "Khăn Lụa Mã Châu - Phố Cổ Hội An",
    slug: "khan-lua-ma-chau-pho-co-hoi-an",
    category: "Khăn vuông di sản",
    price: 450000,
    originalPrice: 520000,
    dimensions: "70cm x 70cm",
    material: "100% Lụa tơ tằm Mã Châu dệt thủ công tự nhiên",
    color: "Vàng hoa giấy & Hồng san hô phố cổ",
    landmark: "Hội An – Câu chuyện phố cổ bên dòng Hoài",
    verse: `Mảnh đất quê ta
Quảng Nam, Đà Nẵng
Hết ngày cay đắng
Nay đã nở hoa`,
    verseMeaning: "Bằng lời vè giản dị mà giàu cảm xúc, câu vè khắc họa hành trình đổi thay của quê hương Quảng Nam – Đà Nẵng, từ những tháng ngày gian khó đến diện mạo tươi đẹp hôm nay. Qua đó, câu vè tôn vinh sức sống bền bỉ của con người xứ Quảng và tình yêu dành cho mảnh đất quê hương.",
    description: "Bên dòng sông Hoài thơ mộng, Hội An lưu giữ vẻ đẹp của những mái ngói rêu phong, những bức tường vàng và con phố nhỏ nhuốm màu thời gian. Từng là thương cảng sầm uất, Hội An mang trong mình câu chuyện giao thoa văn hóa và nhịp sống bình dị qua bao thế hệ. Trên từng thớ lụa, hình ảnh Hội An được tái hiện như một lời kể về miền di sản, nơi vẻ đẹp kiến trúc hòa quyện cùng ký ức và bản sắc quê hương.",
    image: "../assets/images/product-1.jpg",
    gallery: [
      "../assets/images/product-1.jpg",
      "../assets/images/banner1.jpg",
      "../assets/images/banner3.jpg"
    ],
    isFeatured: true,
    rating: 5,
    reviewsCount: 28,
    stock: 25,
    tag: "Bán chạy nhất"
  },
  {
    id: 2,
    name: "Khăn Lụa Mã Châu - Hồn Tơ Xứ Quảng",
    slug: "khan-lua-ma-chau-hon-to-xu-quang",
    category: "Khăn choàng dài cao cấp",
    price: 580000,
    originalPrice: 650000,
    dimensions: "180cm x 50cm",
    material: "100% Lụa tơ tằm Mã Châu nguyên bản, dệt thoi truyền thống",
    color: "Xanh lá ô-liu & Trắng kem tơ tằm",
    landmark: "Làng lụa Mã Châu & Hòn Kẽm Đá Dừng",
    verse: `Ngó lên Hòn Kẽm Đá Dừng
Thương cha nhớ mẹ quá chừng bạn ơi.
Thương cha nhớ mẹ ngậm ngùi
Mồng mồng một lá biết nuôi răng chừ`,
    verseMeaning: "Ẩn sau lời vè mộc mạc là nỗi nhớ thương cha mẹ da diết và tình yêu sâu nặng dành cho quê hương, nguồn cội. Hình ảnh Hòn Kẽm Đá Dừng không chỉ gợi nhắc cảnh sắc xứ Quảng mà còn khơi dậy những cảm xúc thân thương về gia đình. Câu vè như lời nhắn gửi rằng tình thân và cội nguồn vẫn luôn là miền ký ức thiêng liêng.",
    description: "Làng lụa Mã Châu lưu giữ nghề trồng dâu, nuôi tằm, ươm tơ, dệt lụa qua nhiều thế hệ bên dòng Thu Bồn phù sa. Hình ảnh làng nghề trên khăn lụa không chỉ tôn vinh vẻ đẹp mềm mại của từng thớ tơ mà còn kể câu chuyện về bàn tay khéo léo, sự cần mẫn và nét đẹp nghề truyền thống xứ Quảng.",
    image: "../assets/images/product-2.jpg",
    gallery: [
      "../assets/images/product-2.jpg",
      "../assets/images/banner2.jpg",
      "../assets/images/banner1.jpg"
    ],
    isFeatured: true,
    rating: 5,
    reviewsCount: 42,
    stock: 18,
    tag: "Di sản trăm năm"
  },
  {
    id: 3,
    name: "Khăn Lụa Mã Châu - Thánh Địa Mỹ Sơn",
    slug: "khan-lua-ma-chau-thanh-dia-my-son",
    category: "Khăn vuông di sản",
    price: 480000,
    originalPrice: 550000,
    dimensions: "70cm x 70cm",
    material: "100% Lụa Mã Châu tự nhiên, nhuộm thảo mộc thân thiện môi trường",
    color: "Đỏ gạch Chăm & Nâu đồng cổ điển",
    landmark: "Thánh địa Mỹ Sơn – Dấu ấn văn hóa Chăm Pa",
    verse: `Ngồi buồn trách phận giận mình
Số chi ta sớm thành đôi bạn, số chi mình lửng lơ...`,
    verseMeaning: "Vè cũng là nơi truyền tải những cảm xúc trong tình yêu: Câu vè thể hiện những day dứt, tiếc nuối trong tình yêu khi duyên phận không trọn vẹn. Qua lời kể chân thành, mộc mạc, câu vè gợi lên những cung bậc cảm xúc sâu lắng, phản ánh nét chân thật trong đời sống tâm hồn người dân xứ Quảng.",
    description: "Giữa thung lũng xanh huyền bí của Quảng Nam, Thánh địa Mỹ Sơn lưu giữ những đền tháp cổ kính, minh chứng cho một nền văn minh Chăm Pa rực rỡ. Qua hình ảnh trên khăn lụa, những đường nét kiến trúc tháp cổ không chỉ tái hiện vẻ đẹp di sản mà còn kể câu chuyện về lịch sử, tín ngưỡng và nghệ thuật ngàn năm.",
    image: "../assets/images/product-3.jpg",
    gallery: [
      "../assets/images/product-3.jpg",
      "../assets/images/banner3.jpg",
      "../assets/images/banner2.jpg"
    ],
    isFeatured: true,
    rating: 4.9,
    reviewsCount: 19,
    stock: 15,
    tag: "Kiệt tác văn hóa"
  },
  {
    id: 4,
    name: "Khăn Lụa Mã Châu - Cầu Rồng Sức Sống",
    slug: "khan-lua-ma-chau-cau-rong-suc-song",
    category: "Khăn choàng dài cao cấp",
    price: 550000,
    originalPrice: 620000,
    dimensions: "180cm x 50cm",
    material: "100% Lụa tơ tằm dệt cao cấp, mềm rũ tự nhiên thoáng mát",
    color: "Vàng kim & Hồng san hô hiện đại",
    landmark: "Cầu Rồng – Biểu tượng sức sống Đà Nẵng",
    verse: `Ngày xưa măng lụi, tre tàn
Ngày nay nô nức, xóm làng vui ca
Hôm nay xán lạn sơn hà
Hoan hô nước VNDCCH muôn năm.`,
    verseMeaning: "Câu vè tái hiện sự chuyển mình của quê hương từ những năm tháng khó khăn đến cuộc sống mới tràn đầy niềm vui và hy vọng. Hình ảnh “xóm làng vui ca” gợi lên không khí hân hoan, phấn khởi trước sự đổi thay của đất nước và niềm tin vào tương lai thịnh vượng.",
    description: "Cầu Rồng nổi bật với kiến trúc hình rồng vươn mình qua sông Hàn, biểu tượng cho sự năng động và khát vọng vươn lên của thành phố biển Đà Nẵng. Hình ảnh trên khăn lụa không chỉ tái hiện nét đẹp hiện đại của thành phố mà còn gửi gắm niềm tự hào về một xứ sở trẻ trung, tràn trề sinh lực.",
    image: "../assets/images/product-4.jpg",
    gallery: [
      "../assets/images/product-4.jpg",
      "../assets/images/banner3.jpg",
      "../assets/images/banner1.jpg"
    ],
    isFeatured: true,
    rating: 4.8,
    reviewsCount: 31,
    stock: 20,
    tag: "Khát vọng hiện đại"
  },
  {
    id: 5,
    name: "Khăn Lụa Mã Châu - Ngũ Hành Sơn Non Nước",
    slug: "khan-lua-ma-chau-ngu-hanh-son-non-nuoc",
    category: "Khăn vuông di sản",
    price: 460000,
    originalPrice: 530000,
    dimensions: "70cm x 70cm",
    material: "100% Lụa Mã Châu tơ tằm mềm mượt, óng ánh tự nhiên",
    color: "Xanh ngọc bích non nước & Xám tro trầm mặc",
    landmark: "Ngũ Hành Sơn – Vẻ đẹp non nước và tâm linh",
    verse: `Căm thù ấy càng thêm nung nấu
Vác xác con lên thấu tỉnh đường
Súng nào ngăn nổi tình thương
Gươm nào gom nổi con đường đấu tranh`,
    verseMeaning: "Câu vè thể hiện nỗi đau, lòng căm phẫn trước bất công và tinh thần đấu tranh kiên cường của người dân xứ Quảng. Qua những lời lẽ giàu cảm xúc, câu vè khắc họa sức mạnh của tình thương, lòng yêu nước và ý chí đoàn kết không gì khuất phục được.",
    description: "Ngũ Hành Sơn nổi bật với năm ngọn núi đá vôi hùng vĩ, những hang động kỳ bí và mái chùa cổ ẩn mình giữa đại ngàn thiên nhiên. Hình ảnh trên khăn lụa tái hiện vẻ đẹp hài hòa giữa non nước, kiến trúc và tâm linh, kể câu chuyện về vùng đất giàu bản sắc văn hóa của Đà Nẵng.",
    image: "../assets/images/product-5.jpg",
    gallery: [
      "../assets/images/product-5.jpg",
      "../assets/images/banner1.jpg",
      "../assets/images/banner2.jpg"
    ],
    isFeatured: false,
    rating: 4.9,
    reviewsCount: 16,
    stock: 12,
    tag: "Non nước hữu tình"
  },
  {
    id: 6,
    name: "Khăn Lụa Mã Châu - Cù Lao Chàm Sắc Xanh",
    slug: "khan-lua-ma-chau-cu-lao-cham-sac-xanh",
    category: "Khăn choàng dài cao cấp",
    price: 520000,
    originalPrice: 590000,
    dimensions: "180cm x 50cm",
    material: "100% Tơ tằm hữu cơ, dệt thủ công Mã Châu, sinh thái bền vững",
    color: "Xanh biển đảo & Trắng bãi cát ngọc",
    landmark: "Cù Lao Chàm – Sắc xanh biển đảo & Du lịch xanh",
    verse: `Được gần Bác những chiều hôm,
Được dâng lên Bác chén cơm gạo mùa...`,
    verseMeaning: "Câu vè gửi gắm lòng kính yêu và biết ơn sâu sắc đối với Bác Hồ. Hình ảnh chén cơm gạo mùa bình dị thể hiện tấm lòng chân thành, mộc mạc của người dân, đồng thời gợi lên tình cảm thiêng liêng giữa vị cha già dân tộc và đồng bào miền Trung.",
    description: "Cù Lao Chàm nổi bật với biển xanh ngọc, rạn san hô hoang sơ và hệ sinh thái trù phú, được UNESCO công nhận là Khu dự trữ sinh quyển thế giới. Hình ảnh trên khăn lụa không chỉ tôn vinh vẻ đẹp thiên nhiên mà còn lan tỏa thông điệp bảo vệ biển đảo, tiêu dùng xanh và phát triển bền vững.",
    image: "../assets/images/product-6.jpg",
    gallery: [
      "../assets/images/product-6.jpg",
      "../assets/images/banner2.jpg",
      "../assets/images/banner3.jpg"
    ],
    isFeatured: false,
    rating: 5,
    reviewsCount: 23,
    stock: 14,
    tag: "Du lịch xanh"
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
