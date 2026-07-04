export interface DistrictInfo {
  id: string;
  name: string;
  slug: string;
  landmark: string;
  streets: string[];
  intro: string;
  parkingCondition: string;
  recommendation: string;
  metaTitle: string;
  metaDesc: string;
  keywords: string;
}

export const DISTRICTS_DATA: Record<string, DistrictInfo> = {
  'ba-dinh': {
    id: 'ba-dinh',
    name: 'Ba Đình',
    slug: 'cham-soc-xe-ba-dinh',
    landmark: 'Lăng Bác, Hồ Trúc Bạch, Lotte Liễu Giai',
    streets: ['Kim Mã', 'Liễu Giai', 'Đội Cấn', 'Giảng Võ', 'Trần Phú', 'Nguyễn Chí Thanh'],
    intro: 'Quận Ba Đình là trung tâm hành chính - chính trị của cả nước, nơi tập trung nhiều cơ quan ngoại giao và khu biệt thự cổ. Với lưu lượng giao thông đông đúc trên các tuyến đường huyết mạch như Kim Mã, Liễu Giai, xe cộ tại Ba Đình thường xuyên phải đối mặt với bụi mịn đô thị siêu nhỏ và nhựa cây từ những hàng cổ thụ rợp bóng mát. Việc đỗ xe dưới bóng râm các cây cổ thụ lâu năm tuy mát mẻ nhưng lại tiềm ẩn rủi ro lớn từ phân chim và nhựa cây chứa axit ăn mòn cực mạnh, nhanh chóng phá hủy lớp sơn bóng ngoài cùng của xe hơi.',
    parkingCondition: 'Nhiều ngõ nhỏ hẹp tại Ba Đình khiến xe dễ bị trầy xước quẹt sườn từ xe máy đi sát. Đồng thời, do thiếu hầm đỗ xe rộng rãi, nhiều chủ xe phải đỗ ngoài trời chịu nắng mưa trực tiếp.',
    recommendation: 'Dịch vụ dán phim bảo vệ sơn PPF TPU cao cấp và phủ Ceramic Diamond 9H là giải pháp tối ưu nhất giúp chống lại trầy xước cơ học và tác nhân ăn mòn hóa học từ nhựa cây cổ thụ tại quận Ba Đình.',
    metaTitle: 'Chăm Sóc Xe Hơi Detailing Quận Ba Đình Uy Tín | XE ĐẸP PRO',
    metaDesc: 'Trung tâm chăm sóc xe hơi chuyên nghiệp quận Ba Đình. Chuyên phủ Ceramic 9H, dán PPF TPU, hiệu chỉnh sơn, rửa xe detailing 3 bước. Giao nhận xe tận nhà miễn phí!',
    keywords: 'chăm sóc xe ba đình, detailing ô tô ba đình, phủ ceramic ba đình, dán ppf ba đình, rửa xe cao cấp ba đình'
  },
  'dong-da': {
    id: 'dong-da',
    name: 'Đống Đa',
    slug: 'cham-soc-xe-dong-da',
    landmark: 'Văn Miếu Quốc Tử Giám, Gò Đống Đa, Vincom Nguyễn Chí Thanh',
    streets: ['Nguyễn Lương Bằng', 'Tây Sơn', 'Xã Đàn', 'Chùa Bộc', 'Láng', 'Thái Hà'],
    intro: 'Quận Đống Đa nổi tiếng với mật độ dân cư và giao thông cao bậc nhất Hà Nội. Các nút giao trọng điểm như ngã tư Sở, trục đường Xã Đàn - Ô Chợ Dừa luôn trong trạng thái ùn tắc, khiến xe ô tô phải di chuyển liên tục ở tốc độ thấp trong môi trường nồng độ khí thải cực cao. Lượng nhiệt lượng khổng lồ tỏa ra từ mặt đường nhựa kết hợp với khí thải carbon bám chặt vào bề mặt ngoại thất tạo nên những mảng bám két cứng dầu mỡ vô cùng khó chịu, khiến nước sơn nhanh chóng bị ố mờ và mất đi độ trong suốt ban đầu.',
    parkingCondition: 'Diện tích đất chật hẹp, các bãi đỗ xe tại Đống Đa thường quá tải, khoảng cách giữa các xe đỗ rất sát nhau dẫn đến nguy cơ cao bị va quẹt cửa từ xe bên cạnh khi đóng mở.',
    recommendation: 'Hiệu chỉnh sơn phục hồi độ bóng sâu gương kết hợp dán PPF chống xước viền cửa, hõm cửa là bộ đôi giải pháp được lựa chọn nhiều nhất bởi các chủ xe thông thái tại quận Đống Đa.',
    metaTitle: 'Trung Tâm Detailing Chăm Sóc Xe Ô Tô Đống Đa | XE ĐẸP PRO',
    metaDesc: 'Dịch vụ chăm sóc xe hơi chuyên sâu quận Đống Đa. Vệ sinh nội thất hơi nước nóng, dán phim cách nhiệt 3M Crystalline chính hãng, đánh bóng sơn chuyên nghiệp.',
    keywords: 'chăm sóc xe đống đa, dọn nội thất ô tô đống đa, đánh bóng xe hơi đống đa, dán phim cách nhiệt đống đa'
  },
  'cau-giay': {
    id: 'cau-giay',
    name: 'Cầu Giấy',
    slug: 'cham-soc-xe-cau-giay',
    landmark: 'Công viên Cầu Giấy, Keangnam Landmark 72, Đại học Quốc gia',
    streets: ['Cầu Giấy', 'Xuân Thủy', 'Trần Duy Hưng', 'Trung Kính', 'Duy Tân', 'Tôn Thất Thuyết'],
    intro: 'Cầu Giấy là trung tâm công nghệ và văn phòng hiện đại với hàng loạt tòa nhà cao tầng, thu hút lượng lớn giới tri thức và doanh nhân trẻ sở hữu các dòng xe sang đẳng cấp. Tuy nhiên, các tuyến phố tại Cầu Giấy như Duy Tân, Trung Kính thường xuyên có các công trình xây dựng cải tạo hạ tầng, làm phát sinh lượng bụi xi măng và mạt sắt công nghiệp cực lớn lơ lửng trong không khí. Khi gặp nước mưa hay độ ẩm cao, bụi xi măng sẽ phản ứng hóa học bám chặt vào sơn xe tạo thành những nốt ố sần sùi không thể rửa trôi bằng xà phòng thông thường.',
    parkingCondition: 'Đỗ xe dưới hầm các tòa chung cư, văn phòng hiện đại tuy tránh được nắng nhưng lại dễ bị rò rỉ nước chứa canxi, kiềm mạnh từ trần hầm bê tông nhỏ xuống gây ố mốc ăn mòn sơn kính lái nghiêm trọng.',
    recommendation: 'Chủ xe tại Cầu Giấy nên dán phim cách nhiệt quang học 3M Crystalline chống nóng vượt trội cho kính lái và thực hiện tẩy ố kính, phủ Ceramic định kỳ để bảo vệ xe khỏi nước trần hầm chung cư.',
    metaTitle: 'Dịch Vụ Detailing Chăm Sóc Xe Sang Cầu Giấy | XE ĐẸP PRO',
    metaDesc: 'Trung tâm Detailing đẳng cấp quận Cầu Giấy. Chuyên dán PPF bảo vệ sơn ô tô, dán phim cách nhiệt 3M chính hãng, phủ Ceramic 9H Diamond. Cam kết chất lượng vượt trội.',
    keywords: 'chăm sóc xe cầu giấy, rửa xe detailing cầu giấy, phủ ceramic cầu giấy, dán ppf ô tô cầu giấy'
  },
  'thanh-xuan': {
    id: 'thanh-xuan',
    name: 'Thanh Xuân',
    slug: 'cham-soc-xe-thanh-xuan',
    landmark: 'Ngã tư Khuất Duy Tiến, Royal City Nguyễn Trãi',
    streets: ['Nguyễn Trãi', 'Lê Văn Lương', 'Khuất Duy Tiến', 'Trường Chinh', 'Vũ Tông Phan', 'Nguyễn Tuân'],
    intro: 'Quận Thanh Xuân là cửa ngõ phía Tây Nam thủ đô, nơi có trục đường Nguyễn Trãi và đường vành đai 3 trên cao với mật độ xe tải, xe khách siêu nặng di chuyển liên tục ngày đêm. Bụi bẩn bám dính, mạt phanh kim loại màu đen tỏa ra từ xe tải nặng kết hợp cát đá văng từ công trình đường sắt đô thị tạo ra môi trường vô cùng khắc nghiệt cho xe ô tô cá nhân. Sơn xe tại Thanh Xuân rất nhanh bị sần ráp tay, bám bụi sắt công nghiệp và xuất hiện vô số vết xước dăm li ti do chà xát rửa xe không đúng kỹ thuật.',
    parkingCondition: 'Nhiều dự án chung cư cao cấp tập trung tại Nguyễn Tuân, Lê Văn Lương có mật độ đỗ hầm cực cao, xe dễ bị va quẹt cọ xát góc cản trước cản sau trong quá trình lùi chuồng chật hẹp.',
    recommendation: 'Sử dụng dịch vụ Rửa xe Detailing 3 bước sạch sâu bằng găng lông cừu định kỳ để loại bỏ an toàn bụi sắt công nghiệp kết hợp dán PPF các góc cản trước sau chống xước va quẹt cực tốt.',
    metaTitle: 'Chăm Sóc Xe Ô Tô Detailing Quận Thanh Xuân | XE ĐẸP PRO',
    metaDesc: 'Hệ thống chăm sóc xe hơi chuyên sâu quận Thanh Xuân. Rửa xe 3 bước lọc cát, hiệu chỉnh sơn loại bỏ xước xoáy hoàn toàn, vệ sinh nội thất hơi nước nóng khử trùng 140°C.',
    keywords: 'chăm sóc xe thanh xuân, dọn nội thất ô tô thanh xuân, phủ ceramic thanh xuân, rửa xe detailing thanh xuân'
  },
  'hoang-mai': {
    id: 'hoang-mai',
    name: 'Hoàng Mai',
    slug: 'cham-soc-xe-hoang-mai',
    landmark: 'Công viên Yên Sở, Hồ Linh Đàm, Bến xe Giáp Bát',
    streets: ['Giải Phóng', 'Tam Trinh', 'Lĩnh Nam', 'Nguyễn Hữu Thọ', 'Kim Đồng', 'Vành Đai 3'],
    intro: 'Quận Hoàng Mai có địa hình thấp trũng với hệ thống hồ điều hòa lớn, đồng thời là khu vực có lưu lượng xe container tải trọng lớn ra vào các bến xe, kho bãi liên tục. Trục đường Tam Trinh, Lĩnh Nam thường xuyên rơi vào tình trạng lầy lội khi mưa hoặc bụi bẩn mù mịt khi nắng. Bùn đất phù sa giàu tính axit tại Hoàng Mai bám chặt vào hốc bánh xe, khung gầm và hệ thống mâm lốp, lâu ngày nếu không được vệ sinh đúng cách sẽ thúc đẩy quá trình oxi hóa rỉ sét ăn mòn kim loại cực kỳ nhanh chóng.',
    parkingCondition: 'Bán đảo Linh Đàm mật độ dân số siêu cao dẫn đến việc đỗ xe ngoài trời dọc các vỉa hè, lòng đường diễn ra phổ biến. Xe phải hứng chịu trực tiếp tia UV cực tím mùa hè và mưa axit gây ố mốc bạc màu sơn sần nhựa nhám.',
    recommendation: 'XE ĐẸP PRO đặc biệt khuyên các chủ xe quận Hoàng Mai thực hiện Phủ gầm chống rỉ sét cách âm và phủ Ceramic bảo vệ bề mặt sơn chống chịu axit và tia cực tím UV hiệu quả vượt trội.',
    metaTitle: 'Chăm Sóc Xe Hơi & Phủ Gầm Cách Âm Hoàng Mai | XE ĐẸP PRO',
    metaDesc: 'Trung tâm chăm sóc xe ô tô quận Hoàng Mai chuyên nghiệp. Phủ gầm chống gỉ sét, cách âm chống ồn, rửa xe sạch sâu, hiệu chỉnh sơn bóng gương. Đặt lịch ngay!',
    keywords: 'chăm sóc xe hoàng mai, phủ gầm ô tô hoàng mai, dọn nội thất xe hơi hoàng mai, rửa xe detailing hoàng mai'
  },
  'long-bien': {
    id: 'long-bien',
    name: 'Long Biên',
    slug: 'cham-soc-xe-long-bien',
    landmark: 'Cầu Long Biên, Vinhomes Riverside, Aeon Mall Long Biên',
    streets: ['Nguyễn Văn Cừ', 'Ngô Gia Tự', 'Cổ Linh', 'Chu Huy Mẫn', 'Đoàn Khuê', 'Phúc Lợi'],
    intro: 'Long Biên là quận có diện tích rộng lớn với quy hoạch đô thị kiểu mẫu đồng bộ, nổi bật là khu biệt thự Vinhomes Riverside sang trọng nơi tập trung hàng loạt siêu xe Bentley, Rolls-Royce, Porsche đẳng cấp nhất Hà Nội. Với không gian thoáng đãng, tốc độ di chuyển trên các đại lộ như Cổ Linh, Chu Huy Mẫn khá cao. Tuy nhiên, tốc độ cao lại khiến xe ô tô dễ gặp phải tình trạng đá văng bắn trực diện từ lốp xe đi trước đập vào nắp capo, cản trước gây trầy xước sứt sâu, vỡ nước sơn bóng mượt của xe.',
    parkingCondition: 'Chủ xe sở hữu nhà phố, biệt thự rộng rãi có sân vườn đỗ xe riêng tư tại Long Biên thường đỗ xe trong nhà hoặc sân vườn có mái che nhẹ, nhưng vẫn bám dính bụi sương cát sông Hồng lơ lửng.',
    recommendation: 'Dán PPF Full ngoại thất chất liệu TPU cao cấp chống đá văng tuyệt đối và phục hồi vết xước tự động bằng nhiệt độ là lựa chọn số 1 của các chủ nhân xe sang tại Vinhomes Long Biên.',
    metaTitle: 'Trung Tâm Chăm Sóc Xe Hơi Vinhomes Long Biên | XE ĐẸP PRO',
    metaDesc: 'Dịch vụ Detailing chăm sóc xe sang quận Long Biên. Chuyên dán PPF TPU cao cấp chống đá văng, phủ Ceramic Diamond 9H, dán phim cách nhiệt 3M Crystalline. Đẳng cấp Master.',
    keywords: 'chăm sóc xe long biên, dán ppf ô tô long biên, phủ ceramic long biên, rửa xe detailing long biên'
  },
  'ha-dong': {
    id: 'ha-dong',
    name: 'Hà Đông',
    slug: 'cham-soc-xe-ha-dong',
    landmark: 'Hồ Văn Quán, AEON Mall Hà Đông, KĐT Ciputra Thanh Hà',
    streets: ['Quang Trung', 'Trần Phú', 'Tố Hữu', 'Phùng Hưng', 'Nguyễn Văn Lộc', 'Lê Trọng Tấn'],
    intro: 'Quận Hà Đông là khu vực phát triển năng động phía Tây Nam thủ đô, nơi có trục đường Tố Hữu - Lê Văn Lương kéo dài tập trung mật độ chung cư dày đặc bậc nhất Hà Nội. Nguồn nước tại Hà Đông đôi khi có hàm lượng canxi cứng cao hơn bình thường (nước cứng). Khi chủ xe tự rửa xe tại nhà hoặc rửa tại các cửa hàng cỏ sử dụng nước giếng khoan chưa lọc kỹ, các khoáng chất canxi magie sẽ đọng lại trên bề mặt khi nước bay hơi, kết tinh thành các vết ố canxi hình tròn đục màu bám cực kỳ chắc vào kính sườn và sơn xe.',
    parkingCondition: 'Việc đỗ xe ngoài trời nắng gắt ở các khu đô thị lớn như Văn Quán, Dương Nội làm tăng tốc độ phản ứng ăn mòn hóa học của nước cứng lên bề mặt, khiến kính lái bị loang lổ ố mốc khó nhìn ban đêm.',
    recommendation: 'Sử dụng dịch vụ tẩy ố kính chuyên sâu, đánh bóng sơn hiệu chỉnh màng sơn và dán phim cách nhiệt 3M Crystalline bảo vệ nhiệt lượng cabin toàn diện tại cơ sở XE ĐẸP PRO quận Hà Đông.',
    metaTitle: 'Chăm Sóc Xe Ô Tô Detailing Hà Đông Chuyên Nghiệp | XE ĐẸP PRO',
    metaDesc: 'Trung tâm chăm sóc xe hơi chuyên sâu quận Hà Đông. Chuyên dọn nội thất hơi nước nóng, phủ Ceramic 9H, dán phim cách nhiệt, bảo hành điện tử chính hãng uy tín.',
    keywords: 'chăm sóc xe hà đông, dọn nội thất ô tô hà đông, dán phim cách nhiệt hà đông, phủ ceramic hà đông'
  },
  'nam-tu-liem': {
    id: 'nam-tu-liem',
    name: 'Nam Từ Liêm',
    slug: 'cham-soc-xe-nam-tu-liem',
    landmark: 'Sân vận động Mỹ Đình, Trung tâm Hội nghị Quốc gia, Keangnam',
    streets: ['Phạm Hùng', 'Mễ Trì', 'Lê Đức Thọ', 'Đại Lộ Thăng Long', 'Hàm Nghi', 'Nguyễn Cơ Thạch'],
    intro: 'Quận Nam Từ Liêm nổi bật với các khu đô thị kiểu mới hiện đại như Mỹ Đình, Vinhomes Smart City, trung tâm thể thao quốc gia Mỹ Đình và Đại lộ Thăng Long siêu rộng. Đây là khu vực đón gió Tây Bắc mang theo lượng bụi mịn khô hanh cực kỳ lớn thổi trực tiếp vào nội thành vào mùa đông. Các xe di chuyển tốc độ cao trên Đại lộ Thăng Long chịu ma sát không khí rất lớn với cát bụi li ti sấy sần bề mặt, làm sơn xe nhanh chóng bị xước dăm mịn bám bụi sương mờ đục xỉn màu mất đi độ trong vắt lôi cuốn vốn có.',
    parkingCondition: 'Đỗ xe tại các bãi ngoài trời xung quanh khu vực Mỹ Đình dưới nắng nóng gay gắt khiến màng keo dán cũ của kính lái bị biến tính phân hủy dộp bọt khí lóa mắt ban đêm.',
    recommendation: 'Phủ Ceramic Diamond nhiều lớp gia tăng độ cứng vật lý nước sơn kháng ma sát bụi cát đô thị và dán phim cách nhiệt 3M Crystalline cao cấp là bộ đôi lá chắn hoàn hảo cho xe tại Nam Từ Liêm.',
    metaTitle: 'Detailing Chăm Sóc Xe Hơi Mỹ Đình Nam Từ Liêm | XE ĐẸP PRO',
    metaDesc: 'Dịch vụ chăm sóc xe hơi cao cấp quận Nam Từ Liêm. Đánh bóng phục hồi sơn xe, dán PPF chống đá văng Đại lộ Thăng Long, vệ sinh nội thất hơi nước nóng khử trùng cabin.',
    keywords: 'chăm sóc xe nam từ liêm, detailing ô tô mỹ đình, phủ ceramic nam từ liêm, dán phim cách nhiệt mễ trì'
  },
  'bac-tu-liem': {
    id: 'bac-tu-liem',
    name: 'Bắc Từ Liêm',
    slug: 'cham-soc-xe-bac-tu-liem',
    landmark: 'Công viên Hòa Bình, Khu đô thị Ngoại Giao Đoàn, Ciputra',
    streets: ['Phạm Văn Đồng', 'Hoàng Quốc Việt', 'Xuân Đỉnh', 'Cổ Nhuế', 'Tây Tựu', 'Đức Thắng'],
    intro: 'Quận Bắc Từ Liêm sở hữu các đại lộ rộng lớn nối liền các tỉnh phía Bắc như Phạm Văn Đồng kết hợp với các khu đô thị sinh thái xanh mát đẳng cấp như Ngoại Giao Đoàn, Ciputra Tây Hồ Tây. Đây là khu vực chịu ảnh hưởng trực tiếp của gió sông Hồng mát mẻ ẩm ẩm ẩm ướt mang theo bụi cát phù sa sương muối mịn bám dính màng kính xe sườn. Bên cạnh đó, bụi đất từ các xe tải chở vật liệu xây dựng chạy dọc tuyến Phạm Văn Đồng thường xuyên văng vãi sỏi đá dăm liti va đập liên hồi vào phần đầu xe ô tô con.',
    parkingCondition: 'Khu vực Ngoại Giao Đoàn, Ciputra có nhiều khoảng sân đỗ biệt thự rộng mở đón sương ẩm ban đêm bám dày mặt kính ngoài cùng bụi phù sa mịn két lơ lửng.',
    recommendation: 'Dán phim bảo vệ sơn PPF TPU cản phá đá văng xước góc xước và hiệu chỉnh sơn phủ Ceramic chống bám nước hiệu ứng lá sen siêu đỉnh là giải pháp thiết yếu hàng đầu tại Bắc Từ Liêm.',
    metaTitle: 'Chăm Sóc Xe Hơi Ciputra Ngoại Giao Đoàn Bắc Từ Liêm | XE ĐẸP PRO',
    metaDesc: 'Trung tâm Detailing chăm sóc xe ô tô uy tín quận Bắc Từ Liêm. Chuyên phủ bóng Ceramic, dán PPF tự phục hồi xước, vệ sinh khoang máy hơi nước nóng an toàn mạch điện.',
    keywords: 'chăm sóc xe bắc từ liêm, dọn nội thất ô tô ngoại giao đoàn, phủ ceramic ciputra, rửa xe detailing phạm văn đồng'
  },
  'hoan-kiem': {
    id: 'hoan-kiem',
    name: 'Hoàn Kiếm',
    slug: 'cham-soc-xe-hoan-kiem',
    landmark: 'Hồ Hoàn Kiếm, Nhà hát Lớn, Phố Cổ Hà Nội',
    streets: ['Tràng Tiền', 'Lý Thường Kiệt', 'Hai Bà Trưng', 'Hàng Ngang', 'Hàng Đào', 'Trần Hưng Đạo'],
    intro: 'Quận Hoàn Kiếm là trái tim văn hóa, lịch sử và du lịch của Hà Nội với cấu trúc khu phố cổ chật hẹp đan xen các tuyến phố bàn cờ từ thời Pháp thuộc. Các con đường tại phố cổ Hoàn Kiếm cực kỳ chật hẹp, vỉa hè hầu như không có chỗ đỗ xe, lượng phương tiện xe máy đan xen dầy đặc chen chúc di chuyển sát sạt bên sườn xe ô tô. Xe ô tô di chuyển tại Hoàn Kiếm có tỷ lệ xước sườn xe do va quẹt từ tay lái xe máy và chân chống gác chân xe máy cao nhất toàn thành phố.',
    parkingCondition: 'Tìm chỗ đỗ xe tại Hoàn Kiếm là thách thức cực lớn, xe thường đỗ sát vỉa hè rủi ro quẹt nứt mâm lốp vào vỉa hè đá sắc nhọn góc phố rách má lốp xịt hơi sườn.',
    recommendation: 'Chủ xe Hoàn Kiếm cần trang bị ngay lớp áo dán PPF TPU dày dặn bảo vệ hông sườn xe, mâm xe chống xước tuyệt hảo trước các va chạm xe máy chật hẹp phố cổ.',
    metaTitle: 'Trung Tâm Chăm Sóc Xe Hơi Phố Cổ Hoàn Kiếm | XE ĐẸP PRO',
    metaDesc: 'Dịch vụ Detailing chăm sóc xe sang quận Hoàn Kiếm. Giao nhận xe tận nhà chuyên nghiệp bằng xe cứu hộ chuyên dụng. Phủ Ceramic 9H, dán PPF TPU cao cấp sườn xe.',
    keywords: 'chăm sóc xe hoàn kiếm, detailing phố cổ hoàn kiếm, phủ ceramic hoàn kiếm, dán ppf xe sang hoàn kiếm'
  },
  'hai-ba-trung': {
    id: 'hai-ba-trung',
    name: 'Hai Bà Trưng',
    slug: 'cham-soc-xe-hai-ba-trung',
    landmark: 'Công viên Thống Nhất, Times City Minh Khai, Chợ Giời',
    streets: ['Phố Huế', 'Bà Triệu', 'Minh Khai', 'Đại Cồ Việt', 'Trần Khát Chân', 'Bạch Mai'],
    intro: 'Quận Hai Bà Trưng có lịch sử phát triển lâu đời với các tuyến phố sầm uất đan xen các khu đô thị hiện đại quy mô lớn như Times City Minh Khai. Môi trường không khí tại Hai Bà Trưng chịu ảnh hưởng khói bụi đô thị đậm đặc từ trục đường Minh Khai - Đại Cồ Việt - cầu Vĩnh Tuy, nơi có mật độ bụi sương carbon cực cao bám két tạo ra mảng bám xám xỉn bết dính bề mặt sơn bóng xe. Nước sơn xe nhanh chóng bị bạc màu rạn nứt lão hóa sần sùi nếu không có lớp màng Ceramic ngăn cách bảo vệ.',
    parkingCondition: 'Đỗ xe hầm chung cư Times City mát mẻ nhưng dễ bám dính mạt canxi dột trần và bụi bẩn mịn kẽ kẽ cửa bám két khó dọn dẹp vệ sinh nội thất hút bụi.',
    recommendation: 'Giặt sấy nội thất diệt khuẩn hơi nước nóng 140°C khử sạch mùi hôi điều hòa và phủ Ceramic Diamond bảo vệ nước sơn bóng bẩy trường tồn trước khói bụi ô nhiễm quận Hai Bà Trưng.',
    metaTitle: 'Chăm Sóc Xe Ô Tô Times City Hai Bà Trưng | XE ĐẸP PRO',
    metaDesc: 'Hệ thống chăm sóc xe hơi chuyên nghiệp quận Hai Bà Trưng. Chuyên dọn nội thất Times City, dán phim cách nhiệt 3M Crystalline, dán PPF chống xước xoáy mờ sơn dăm.',
    keywords: 'chăm sóc xe hai bà trưng, dọn nội thất ô tô times city, dán ppf hai bà trưng, phủ ceramic hai bà trưng'
  },
  'tay-ho': {
    id: 'tay-ho',
    name: 'Tây Hồ',
    slug: 'cham-soc-xe-tay-ho',
    landmark: 'Hồ Tây, Phủ Tây Hồ, Thung lũng hoa Hồ Tây',
    streets: ['Thụy Khuê', 'Hoàng Hoa Thám', 'Yên Phụ', 'Âu Cơ', 'Lạc Long Quân', 'Xuân Diệu'],
    intro: 'Quận Tây Hồ nổi tiếng với mặt nước Hồ Tây rộng lớn mênh mông, mang lại cảnh sắc lãng mạn thanh bình nhưng cũng kéo theo một hiện tượng thời tiết vô cùng đặc thù: Độ ẩm không khí quanh năm cực cao kết hợp nồm ẩm sương muối bốc hơi từ lòng hồ. Độ ẩm siêu cao bám sương ẩm liên tục lên các bề mặt bọc da cao cấp trong khoang cabin xe hơi đắt tiền đỗ ven hồ, rất nhanh chóng kích hoạt bào tử nấm mốc đen rêu mọc bám dày đặc mốc trắng da nứt da sần nỉ, tỏa ra mùi chua mốc nồng nặc gây ho say xe cực kỳ nguy hại cho sức khỏe hệ hô hấp.',
    parkingCondition: 'Xe đỗ ven hồ chịu trực tiếp hơi nước mang nồng độ muối canxi bốc hơi bám két loang lổ ố kính lái sườn nến sơn mờ đục nước sơn rỉ bản lề cửa xe sườn sườn.',
    recommendation: 'Dịch vụ dọn nội thất tháo ghế hơi nước nóng diệt trùng 140°C kết hợp sục máy phát khí Ozone phân rã mùi hôi ẩm nồm ẩm Tây Hồ là gói giải pháp số 1 không thể bỏ qua tại Tây Hồ.',
    metaTitle: 'Vệ Sinh Nội Thất & Chăm Sóc Xe Detailing Tây Hồ | XE ĐẸP PRO',
    metaDesc: 'Trung tâm chăm sóc xe ô tô quận Tây Hồ chuyên nghiệp. Diệt nấm mốc hơi nước nóng 140 độ C, tẩy ố mốc kính lái hồ tây, phủ Ceramic Diamond tăng bóng kháng ẩm nước.',
    keywords: 'chăm sóc xe tây hồ, dọn nội thất ô tô tây hồ, tẩy ố kính ô tô tây hồ, phủ ceramic quận tây hồ'
  }
};
