import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  MapPin, Phone, Clock, ShieldCheck, CheckCircle2, MessageSquare, Send, Calendar, 
  Car, Plus, X, Play, Home, ChevronRight, HelpCircle, Award, Sparkles, Shield, Loader2, Star
} from 'lucide-react';
import { SiteConfig, AppNotification, Appointment } from '../types';
import { toast } from 'react-hot-toast';
import SEO from './SEO';

interface LocalSeoLandingPageProps {
  serviceId: string;
  siteConfig: SiteConfig;
  setSiteConfig: React.Dispatch<React.SetStateAction<SiteConfig>>;
  services?: any;
  t: (key: string) => string;
  language: string;
  setLanguage: (lang: string) => void;
  theme: string;
  setTheme: (theme: string) => void;
  isEditMode: boolean;
  isDesignAuthenticated: boolean;
  isBookingModalOpen: boolean;
  setIsBookingModalOpen: (open: boolean) => void;
  onAddNotification?: (notification: Omit<AppNotification, 'id' | 'date' | 'isRead'>) => void;
  handlePayment: (serviceName: string, price: string, customerName: string, customerEmail?: string) => Promise<void>;
  scrollToSection: (id: string) => void;
}

interface SeoPageData {
  title: string;
  tagline: string;
  metaTitle: string;
  metaDesc: string;
  keywords: string;
  introText: string;
  importanceDetail: string;
  benefits: { name: string; detail: string; science: string }[];
  indicators: string[];
  steps: { name: string; detail: string; time: string }[];
  equipments: { name: string; brand: string; tech: string }[];
  chemicals: { name: string; brand: string; ph: string; purpose: string }[];
  timingAnalysis: string;
  pricing: { tier: string; cost: string; benefits: string[] }[];
  faq: { q: string; a: string }[];
}

const SEO_PAGES_DATA: Record<string, SeoPageData> = {
  'phu-ceramic-ha-noi': {
    title: 'Phủ Ceramic Ô Tô Hà Nội Cao Cấp',
    tagline: 'Công nghệ bảo vệ sơn Nano Ceramic 9H Diamond bóng gương đỉnh cao',
    metaTitle: 'Phủ Ceramic Ô Tô Hà Nội Chuyên Nghiệp | Bảo Vệ Sơn 9H Cao Cấp',
    metaDesc: 'Dịch vụ phủ Ceramic ô tô Hà Nội chuyên sâu tại XE ĐẸP PRO. Sơn bóng gương, kháng nước lá sen, bảo vệ sơn nguyên bản 9H Diamond. Đặt lịch tư vấn ngay!',
    keywords: 'phủ ceramic ô tô Hà Nội, ceramic 9H, bóng gương sơn xe, bảo vệ sơn ô tô Hà Nội',
    introText: 'Lớp sơn nguyên bản của ô tô tại Hà Nội liên tục đối mặt với những tác nhân phá hủy nghiêm trọng từ môi trường đô thị đặc thù. Bụi mịn PM2.5, khí thải nồng độ axit cao từ các phương tiện giao thông liên tục bám kết, cùng cái nắng gay gắt mùa hè lên tới hơn 40 độ C gây ra phản ứng quang hóa làm bạc màu, nứt nẻ lớp sơn bóng bảo vệ (clear coat). Phủ Ceramic 9H Diamond tại XE ĐẸP PRO là giải pháp công nghệ hóa chất tiên tiến nhất hiện nay, tạo liên kết cộng hóa trị bền vững với lớp sơn zin để hình thành lớp màng tinh thể SiO2/TiO2 siêu cứng, bảo vệ xe toàn diện.',
    importanceDetail: 'Với đặc thù khí hậu nhiệt đới ẩm gió mùa tại miền Bắc Việt Nam, đặc biệt là hiện tượng nồm ẩm kéo dài kết hợp với mưa phùn axit tại Hà Nội, bề mặt sơn nếu không được bảo vệ sẽ nhanh chóng bị oxy hóa, ố canxi và xỉn màu. Lớp phủ Ceramic đóng vai trò như một màng chắn hy sinh vô hình có độ cứng vượt trội, cản phá các tia UV-A và UV-B có hại, ngăn chặn hóa chất ăn mòn xâm nhập trực tiếp vào lớp sơn gốc của xe.',
    benefits: [
      { name: 'Độ cứng Diamond 9H thực tế', detail: 'Hạn chế tối đa các vết xước dăm liti, xước xoáy mạng nhện khi rửa xe sai cách tại các tiệm cỏ hè phố Hà Nội.', science: 'Cấu trúc mạng tinh thể nano SiO2 liên kết siêu chặt chẽ tạo bề mặt cứng vững đạt chứng nhận kiểm định quốc tế.' },
      { name: 'Hiệu ứng kháng nước lá sen', detail: 'Nước mưa tự gom lại thành hạt tròn và trôi tuột nhanh chóng khỏi bề mặt nghiêng, giữ xe luôn sạch sẽ.', science: 'Góc tiếp xúc của giọt nước được tăng lên trên 110 độ, giảm thiểu diện tích tiếp xúc và triệt tiêu khả năng bám dính của cặn bẩn.' },
      { name: 'Chống oxy hóa và bạc màu sơn', detail: 'Giữ cho màu sơn nguyên bản luôn rực rỡ, ngăn chặn tuyệt đối hiện tượng ngả màu đối với xe màu trắng.', science: 'Các phân tử hấp thụ tia cực tím bền nhiệt giúp phân tán năng lượng bức xạ mặt trời trước khi nó chạm đến lớp sơn màu bên dưới.' },
      { name: 'Bóng gương sâu thẳm sang trọng', detail: 'Tạo hiệu ứng phản chiếu sắc nét như một tấm gương phẳng lỳ, gia tăng giá trị thẩm mỹ vượt trội cho xế cưng.', science: 'Lấp đầy các lỗ rỗng siêu vi trên bề mặt sơn bóng, làm phẳng mịn tuyệt đối đường đi của ánh sáng phản xạ.' }
    ],
    indicators: [
      'Xe mới xuất xưởng cần bảo vệ nước sơn zin nguyên bản ngay từ đầu.',
      'Sơn xe có hiện tượng xỉn màu, mờ đục do đỗ xe ngoài trời Hà Nội lâu ngày không che chắn.',
      'Bề mặt sơn xuất hiện các vết ố nước mưa, ố canxi cứng đầu khó tẩy sạch bằng nước rửa thông thường.',
      'Chủ xe bận rộn muốn tiết kiệm thời gian chăm dọn xe, mong muốn xe tự làm sạch tốt hơn.'
    ],
    steps: [
      { name: 'Rửa xe 3 bước và tẩy nhiễm bẩn ngoại thất', detail: 'Tẩy nhựa đường, mạt sắt mâm xe và rà đất sét đất sét (Clay bar) mịn bề mặt sơn xe.', time: '120 Phút' },
      { name: 'Đo độ dày sơn và băng keo bảo vệ', detail: 'Dùng thiết bị điện tử đo micromet kiểm soát độ dày sơn, che chắn cẩn thận các chi tiết nhựa nhám.', time: '45 Phút' },
      { name: 'Hiệu chỉnh sơn loại bỏ khuyết tật', detail: 'Đánh bóng xóa xước dăm, xước xoáy sâu và làm phẳng mịn bề mặt sơn bằng máy DA.', time: '360 Phút' },
      { name: 'Khử dầu IPA triệt để', detail: 'Sử dụng dung dịch Isopropyl Alcohol lau sạch hoàn toàn tinh dầu xi đánh bóng giúp lớp ceramic bám dính tối đa.', time: '60 Phút' },
      { name: 'Thi công phủ Ceramic từng vùng', detail: 'Thoa dung dịch Ceramic đều tay, lau mịn vệt sương mù và sấy nhiệt hồng ngoại cường độ cao.', time: '180 Phút' }
    ],
    equipments: [
      { name: 'Máy hiệu chỉnh sơn DA Mark III', brand: 'Rupes (Ý)', tech: 'Quỹ đạo chuyển động ngẫu nhiên kép hạn chế sinh nhiệt tối đa, an toàn sơn xe.' },
      { name: 'Đèn sấy hồng ngoại sóng ngắn', brand: 'Soll (Đức)', tech: 'Gia tốc quá trình liên kết cứng của dung dịch ceramic từ sâu bên trong màng sơn.' },
      { name: 'Thiết bị đo độ dày màng sơn', brand: 'Defelsko (Mỹ)', tech: 'Đo cảm ứng điện từ xác định chính xác độ dày clear coat đến từng micromet.' }
    ],
    chemicals: [
      { name: 'Dung dịch Ceramic Q2 Mohs EVO', brand: 'Gyeon (Hàn Quốc)', ph: 'Trung tính', purpose: 'Lớp phủ ceramic gốc Flo cải tiến tăng độ cứng và kháng nước siêu việt.' },
      { name: 'Xi hiệu chỉnh sơn cao cấp H9.02', brand: 'Koch Chemie (Đức)', ph: '7.5', purpose: 'Phá xước sâu không chứa silicon hay chất làm đầy ảo.' },
      { name: 'Dung dịch khử dầu Prep', brand: 'CarPro (Mỹ)', ph: '6.0', purpose: 'Khử sạch gốc dầu mỡ bám dính trên sơn sau đánh bóng.' }
    ],
    timingAnalysis: 'Quy trình phủ Ceramic chuyên nghiệp tại XE ĐẸP PRO kéo dài từ 24 đến 36 giờ làm việc liên tục. Chúng tôi tuyệt đối không làm vội, bởi lớp ceramic cần khoảng thời gian sấy nhiệt hồng ngoại tối thiểu và thời gian liên kết tĩnh khí hậu khô ráo trong phòng kín 12-24 tiếng để đạt liên kết bền chặt vững chắc nhất.',
    pricing: [
      { tier: 'Gói Ceramic Premium Standard (Xe 4-5 chỗ)', cost: '5.500.000 VNĐ', benefits: ['Phủ 1 lớp Gyeon 9H cao cấp', 'Bảo hành điện tử 2 năm', 'Miễn phí 2 lần bảo dưỡng sơn định kỳ', 'Tặng dọn nội thất cơ bản'] },
      { tier: 'Gói Ceramic Pro Double-Shield (Xe Sedan/SUV nhỏ)', cost: '7.500.000 VNĐ', benefits: ['Phủ 2 lớp Ceramic kép siêu cứng', 'Bảo hành điện tử 3 năm', 'Miễn phí 3 lần bảo dưỡng chuyên sâu', 'Tặng phủ chống bám nước kính lái'] },
      { tier: 'Gói Ceramic Master Diamond (Xe SUV lớn/Luxury)', cost: '9.500.000 VNĐ', benefits: ['Phủ 3 lớp Ceramic Diamond kết hợp sấy nhiệt chuyên sâu', 'Bảo hành điện tử 5 năm', 'Bảo dưỡng định kỳ 6 tháng/lần trọn đời gói', 'Tặng dọn nội thất tháo ghế và khử mùi Ozone'] }
    ],
    faq: [
      { q: 'Phủ Ceramic xong có cần rửa xe bằng nước lã không?', a: 'Không nên rửa xe bằng nước lã đơn thuần hay nước rửa chén vì chất kiềm mạnh làm tổn hại lớp phủ bóng. Nên sử dụng dung dịch rửa xe chuyên dụng có pH trung tính và bọt tuyết siêu mềm mịn.' },
      { q: 'Phủ Ceramic có chống được trầy xước quẹt xe nặng không?', a: 'Phủ ceramic chỉ giúp hạn chế trầy xước dăm nhẹ, xước quấn bụi bẩn và xước khi lau xe. Đối với các va quẹt vật lý mạnh, va chạm giao thông, dán PPF mới là giải pháp chống xước tuyệt đối.' }
    ]
  },
  'dan-ppf-ha-noi': {
    title: 'Dán PPF Ô Tô Hà Nội Cao Cấp',
    tagline: 'Phim bảo vệ sơn TPU tự phục hồi vết xước - Giáp tàng hình siêu đàn hồi',
    metaTitle: 'Dán PPF Ô Tô Hà Nội Chuyên Nghiệp | Bảo Vệ Sơn Chống Xước TPU',
    metaDesc: 'Dịch vụ dán phim bảo vệ sơn PPF ô tô Hà Nội tại XE ĐẸP PRO. Phim PPF TPU cao cấp tự phục hồi vết xước, chống đá văng va quẹt nhẹ. Bảo hành 10 năm!',
    keywords: 'dán PPF ô tô Hà Nội, phim bảo vệ sơn PPF, tự phục hồi xước ô tô, PPF TPU Hà Nội',
    introText: 'Trong điều kiện giao thông đông đúc, chật hẹp tại các phố cổ và ngõ ngách Hà Nội, việc va chạm nhẹ hay đá văng dập cản xe là điều không thể tránh khỏi. Dán PPF (Paint Protection Film) bằng chất liệu màng bọc thông minh Aliphatic TPU là giải pháp đỉnh cao nhất để bảo vệ lớp sơn gốc tuyệt đối khỏi mọi trầy xước vật lý trực tiếp, đá văng, nhựa cây và phân chim có tính axit phá hủy bề mặt xe.',
    importanceDetail: 'Khác với lớp phủ Ceramic có kết cấu tinh thể siêu mỏng, PPF là lớp màng bọc vật lý dẻo dai có độ dày lên tới 8-10 mils (khoảng 200 micromet). Lớp màng này hấp thụ hoàn toàn và phân tán lực tác động từ sỏi cát, mảnh vỡ trên đường, đồng thời ngăn ngừa hiện tượng ố vàng bong tróc do tia UV khắc nghiệt tại miền Bắc.',
    benefits: [
      { name: 'Khả năng tự phục hồi vết xước kinh ngạc', detail: 'Các vết xước dăm, xước xoáy trên màng PPF sẽ tự biến mất hoàn toàn khi tiếp xúc với ánh nắng mặt trời ấm áp hoặc dội nước nóng.', science: 'Lớp phủ polymer đàn hồi thông minh có tính nhớt-dẻo tự sắp xếp lại cấu trúc phân tử ban đầu khi gặp nhiệt lượng thích hợp.' },
      { name: 'Chống va quẹt và đá văng thực tế', detail: 'Hạn chế tối đa tổn hại móp sơn, xước sơn sâu khi quẹt nhẹ với xe máy hoặc đá bắn trên đường cao tốc Hà Nội - Hải Phòng.', science: 'Màng polyurethane dẻo dai phân tán lực cơ học cực tốt, hấp thụ xung động lực nén trực tiếp.' },
      { name: 'Chống ố vàng bong tróc tuyệt đối', detail: 'Màng phim trong suốt cao cấp không bị ngả vàng, ố màu dưới tác động oxy hóa hay tia cực tím.', science: 'Cấu tạo từ hạt nhựa Aliphatic TPU cao cấp kháng hóa chất, không chứa các liên kết gốc ete dễ bị phân hủy quang học.' },
      { name: 'Độ trong suốt sâu bóng như gương', detail: 'Tăng cường độ bóng của xe lên 30%, mang lại cảm giác sơn sâu mượt mà không tì vết.', science: 'Chỉ số khúc xạ ánh sáng tương đồng với lớp bóng clear coat nguyên bản của xe hơi.' }
    ],
    indicators: [
      'Siêu xe, xe sang có giá trị cao muốn giữ gìn nguyên vẹn giá trị xe nguyên bản.',
      'Xe thường xuyên di chuyển trên các tuyến quốc lộ, đường cao tốc có nhiều sỏi đá bắn cản.',
      'Bề mặt các chi tiết nội thất nhựa bóng piano đen rất dễ xước dăm khi chạm vào.'
    ],
    steps: [
      { name: 'Vệ sinh chuẩn phòng kính không bụi', detail: 'Rửa xe sâu, tẩy bụi sơn, đất sét bề mặt mượt mà tuyệt đối không còn cát dính.', time: '120 Phút' },
      { name: 'Thiết kế phom cắt CNC tự động', detail: 'Sử dụng phần mềm đo đạc kích thước chính xác và cắt bằng máy CNC chuyên dụng, không dùng dao cắt thủ công trên xe.', time: '60 Phút' },
      { name: 'Phun sương tạo phòng dán không khí sạch', detail: 'Hệ thống phun sương dập tắt mọi bụi mịn lơ lửng trong không khí phòng dán kín.', time: '30 Phút' },
      { name: 'Thi công dán màng phim PPF', detail: 'Sử dụng gạt nước chuyên dụng vuốt sạch bọt khí, kéo căng bo viền mép phim khít sát từng khe kẽ.', time: '480 Phút' },
      { name: 'Kiểm tra sấy cố định mép viền', detail: 'Sấy nhiệt hồng ngoại tất cả mép phim gấp bo góc kín sâu đảm bảo không bong tróc.', time: '120 Phút' }
    ],
    equipments: [
      { name: 'Máy cắt phim CNC chuyên dụng', brand: 'Graphtec FC9000 (Nhật)', tech: 'Cắt chính xác tuyệt đối theo dữ liệu thiết kế 3D của từng dòng xe hơi.' },
      { name: 'Hệ thống phun sương dập bụi mịn', brand: 'Hải Nam (VN)', tech: 'Tạo áp lực nước siêu nhỏ kết dính bụi lơ lửng rơi xuống đất bảo đảm phòng dán siêu sạch.' },
      { name: 'Gạt nước polyurethane chuyên sâu', brand: 'Fusion (Mỹ)', tech: 'Chất liệu mềm đàn hồi vuốt nước sạch hoàn toàn không trầy màng PPF.' }
    ],
    chemicals: [
      { name: 'Gel dán PPF chuyên nghiệp', brand: 'XPEL (Mỹ)', ph: '7.0', purpose: 'Định vị phim dễ dàng, bôi trơn bề mặt hoàn hảo.' },
      { name: 'Dung dịch làm sạch sâu Prep-clean', brand: 'TacSystem (Nhật)', ph: '6.5', purpose: 'Tẩy sạch hoàn toàn dư lượng sáp bóng mượt trước khi dán.' }
    ],
    timingAnalysis: 'Thời gian thi công dán full xe PPF kéo dài từ 2 đến 3 ngày làm việc. Quá trình vuốt nước, ép keo và kiểm tra bong bóng khí, đặc biệt là công đoạn sấy cố định nếp gấp mép góc viền cần thời gian tối thiểu để keo Acrylic đạt độ bám dính tự nhiên tối đa, tránh co rút màng phim về sau.',
    pricing: [
      { tier: 'Gói PPF Nội Thất Cao Cấp (Full cabin)', cost: '2.000.000 VNĐ', benefits: ['Dán full chi tiết nhựa bóng táp lô', 'Phim TPU tự phục hồi cao cấp', 'Bảo hành bong tróc 5 năm', 'Miễn phí dọn sạch bụi nội thất'] },
      { tier: 'Gói PPF Ngoại Thất Basic (Cản trước, đèn, gương, hõm cửa)', cost: '5.500.000 VNĐ', benefits: ['Bảo vệ các khu vực dễ va chạm nhất', 'Phim TPU dày 8.5 mil chống đá văng', 'Bảo hành bong tróc ố vàng 7 năm', 'Tặng phủ bóng ceramic phần còn lại'] },
      { tier: 'Gói PPF Toàn Bộ Thân Xe Master Guard', cost: '38.000.000 VNĐ', benefits: ['Bọc kín 100% phần sơn ngoại thất', 'Phim Premium Aliphatic TPU 10 mil siêu đàn hồi', 'Bảo hành bong tróc ố vàng 10 năm', 'Bảo dưỡng kiểm tra mép phim định kỳ miễn phí'] }
    ],
    faq: [
      { q: 'Phim PPF dán xong bóc ra có làm bong tróc sơn zin không?', a: 'Đối với nước sơn nguyên bản chất lượng tốt từ nhà máy, lớp keo Acrylic cao cấp của phim PPF chính hãng hoàn toàn không làm ảnh hưởng hay bong sơn khi bóc dỡ chuyên nghiệp bằng hơi nước nóng.' },
      { q: 'Phim PPF TPU giữ được bao nhiêu năm?', a: 'Tuổi thọ trung bình của dòng phim TPU từ 7 đến 10 năm tùy thuộc vào quá trình sử dụng và chăm sóc bảo dưỡng định kỳ.' }
    ]
  },
  'danh-bong-xe-ha-noi': {
    title: 'Đánh Bóng Xe Hơi Hà Nội Chuyên Sâu',
    tagline: 'Phục hồi độ sáng gương, xóa sạch khuyết tật xước dăm xước quầng sơn xe',
    metaTitle: 'Đánh Bóng Xe Hơi Hà Nội Chuyên Nghiệp | Hiệu Chỉnh Sơn Xe',
    metaDesc: 'Dịch vụ đánh bóng xe hơi Hà Nội uy tín tại XE ĐẸP PRO. Loại bỏ xước quầng xoáy móng tay, phục hồi độ phản chiếu bóng gương 100%. Giá tốt chất lượng!',
    keywords: 'đánh bóng xe hơi Hà Nội, hiệu chỉnh sơn ô tô, xóa xước xe hơi, bóng gương sơn xe',
    introText: 'Theo thời gian sử dụng tại Hà Nội, bề mặt sơn xe chịu nhiều tác động vật lý gây xước quầng mạng nhện mất thẩm mỹ. Đánh bóng xe hơi chuyên nghiệp tại XE ĐẸP PRO không chỉ đơn thuần là thoa sáp tạo độ bóng ảo tạm thời, mà là quá trình hiệu chỉnh bào mịn phẳng cấp độ micro bề mặt clear coat để loại bỏ hoàn toàn các lỗi khuyết tật sơn, trả lại khả năng khúc xạ ánh sáng phẳng sắc sảo tựa như gương soi.',
    importanceDetail: 'Các tiệm rửa xe lề đường thường dùng chung một chiếc giẻ cứng, dính đầy cát bụi để lau toàn bộ thân xe. Điều này tạo ra hàng triệu vết xước quầng liti xoáy tròn che mờ đi chiều sâu màu sơn gốc của bạn. Đánh bóng đúng kỹ thuật sử dụng hệ thống máy Dual Action tiên tiến kết hợp xi thô-mịn chuẩn quốc tế giúp hồi sinh màu sơn bóng nguyên bản rực rỡ.',
    benefits: [
      { name: 'Xóa mờ 95% khuyết tật sơn', detail: 'Loại bỏ hoàn toàn xước quầng xoáy mạng nhện, các vệt xước móng tay ở tay nắm cửa và vết ố canxi nhẹ.', science: 'Sử dụng hạt mài mòn thông minh phân rã nhỏ dần trong quá trình đánh bóng giúp cắt phẳng lỗi.' },
      { name: 'An toàn nước sơn nguyên bản', detail: 'Cam kết không bào mòn quá mức lớp clear coat mỏng manh nhờ máy đo điện tử chuyên nghiệp.', science: 'Máy đánh bóng DA chuyển động quỹ đạo kép phân tán đều lực ma sát, không tạo vệt cháy xém sơn.' },
      { name: 'Khôi phục độ sáng sâu bóng gương', detail: 'Khôi phục độ trong vắt lấp lánh của lớp sơn bóng bên ngoài xe hơi.', science: 'Làm mịn bề mặt giảm thiểu tối đa hiện tượng tán xạ ánh sáng, hướng ánh sáng phản chiếu song song hoàn hảo.' },
      { name: 'Chuẩn hóa nền sơn bảo vệ', detail: 'Tạo liên kết phẳng mượt lý tưởng giúp các lớp nano ceramic hay màng phim PPF bám dính chắc nhất.', science: 'Loại bỏ hoàn toàn bụi sơn liti và sáp bóng cũ tích tụ lâu ngày.' }
    ],
    indicators: [
      'Xe nhìn dưới ánh nắng mặt trời thấy rõ các quầng xoáy mờ xỉn loang lổ như mạng nhện.',
      'Bề mặt sơn xe cảm giác sờ ráp tay gồ ghề do bám dính bụi sơn, bụi sắt công nghiệp.',
      'Chuẩn bị làm mới xe trước khi bán lại hoặc bàn giao xe cho chủ nhân mới để nâng cao giá trị.'
    ],
    steps: [
      { name: 'Rửa xe sâu & Tẩy bụi nhựa đường mạt sắt', detail: 'Ủ bọt làm mềm bùn đất và xịt sạch, phun dung dịch chuyên dụng tẩy rỉ sét mâm phanh và nhựa đường bám cản trước.', time: '90 Phút' },
      { name: 'Rà đất sét mịn bề mặt sơn xe', detail: 'Sử dụng đất sét Clay bar bôi trơn loại bỏ hết mạt kim loại và bụi liti dính trên bề mặt.', time: '60 Phút' },
      { name: 'Đánh bóng phá xước thô (Bước 1)', detail: 'Dùng phớt len lông cừu cắt sâu loại bỏ khuyết tật sơn nặng bằng máy chuyên dụng.', time: '240 Phút' },
      { name: 'Đánh bóng tinh làm mịn sáng (Bước 2)', detail: 'Dùng phớt xốp mềm và xi đánh bóng tinh làm phẳng hoàn toàn các quầng xoáy mịn bước trước.', time: '180 Phút' },
      { name: 'Phủ dưỡng sáp Carnauba bảo vệ', detail: 'Thoa sáp bảo vệ giúp giữ màu sơn rực rỡ mượt mà chống nước bụi bẩn.', time: '45 Phút' }
    ],
    equipments: [
      { name: 'Máy đánh bóng DA BigFoot', brand: 'Rupes (Ý)', tech: 'Quỹ đạo lệch tâm mang lại kết quả hoàn thiện bóng mượt không để lại quầng hologram.' },
      { name: 'Đèn kiểm tra khuyết tật sơn chuyên dụng', brand: 'Scangrip (Đan Mạch)', tech: 'Ánh sáng đa sắc mô phỏng chân thực ánh nắng mặt trời giúp phát hiện từng sợi xước nhỏ nhất.' }
    ],
    chemicals: [
      { name: 'Xi đánh phá xước Heavy Cut H9.02', brand: 'Koch Chemie (Đức)', ph: '8.0', purpose: 'Phá xước nhanh bề mặt sơn cứng sấy nhiệt.' },
      { name: 'Xi làm bóng hoàn thiện Micro Cut M3.02', brand: 'Koch Chemie (Đức)', ph: '7.5', purpose: 'Xóa sạch các vệt quầng mờ hologram bóng gương sâu.' }
    ],
    timingAnalysis: 'Một quy trình hiệu chỉnh sơn phục hồi độ bóng xe hơi chuyên nghiệp mất từ 8 đến 12 giờ làm việc liên tục. Đội ngũ kỹ thuật viên của chúng tôi thực hiện tỉ mỉ từng hốc nhỏ tay nắm cửa, nẹp kính inox để bảo đảm sự đồng bộ sáng bóng đồng đều nhất.',
    pricing: [
      { tier: 'Đánh bóng sáng bóng cơ bản / Stage 1', cost: '1.200.000 VNĐ', benefits: ['Tẩy bụi sơn nhựa đường bám ngoại thất', 'Đánh bóng phục hồi độ sáng gương nhanh', 'Phủ dưỡng sáp bảo vệ mượt mà', 'Thích hợp xe sơn còn mới ít xước'] },
      { tier: 'Hiệu chỉnh phục hồi sơn chuyên sâu / Stage 2', cost: '1.800.000 VNĐ', benefits: ['Xóa sạch 85% xước xoáy mạng nhện', 'Hiệu chỉnh mài mịn bằng xi thô-mịn chuẩn Ý', 'Tẩy ố mốc kính lái sườn nhẹ', 'Tặng xông khử mùi Ozone diệt khuẩn'] },
      { tier: 'Đánh bóng hoàn mỹ Showcar Master', cost: '2.800.000 VNĐ', benefits: ['Xử lý 98%+ khuyết tật trầy xước sơn', 'Mài nhẵn da cam sơn phẳng lỳ như gương soi', 'Dưỡng chi tiết nhựa nhám cao su ngoại thất', 'Tặng rửa khoang động cơ xe hơi bằng hơi nước nóng'] }
    ],
    faq: [
      { q: 'Đánh bóng ô tô nhiều lần có làm bay mất sơn gốc không?', a: 'Với kỹ thuật mài mịn bằng máy DA hiện đại của XE ĐẸP PRO, mỗi lần đánh bóng chỉ lấy đi từ 1-2 micromet lớp bóng bảo vệ ngoài cùng nên rất an toàn, bạn hoàn toàn có thể yên tâm sử dụng dịch vụ định kỳ hàng năm.' },
      { q: 'Sau khi đánh bóng xong xe giữ được độ đẹp lâu không?', a: 'Độ bền bóng mượt tùy thuộc vào cách chăm sóc xe của bạn. Nếu rửa xe định kỳ bằng bọt tuyết chuẩn hóa chất tốt, độ bóng sâu lôi cuốn có thể duy trì bền vững trên 1 năm.' }
    ]
  },
  'rua-xe-detailing-ha-noi': {
    title: 'Rửa Xe Detailing Hà Nội 3 Bước Sạch Sâu',
    tagline: 'Quy trình vệ sinh không chạm kết hợp cọ rửa lông cừu ngăn ngừa xước xoáy 100%',
    metaTitle: 'Rửa Xe Detailing Hà Nội Tiêu Chuẩn Quốc Tế | XE ĐẸP PRO',
    metaDesc: 'Dịch vụ rửa xe Detailing Hà Nội sạch sâu 3 bước bằng găng tay lông cừu mềm mại, hóa chất pH trung tính nhập khẩu châu Âu. Giá tốt, phòng chờ mát lạnh!',
    keywords: 'rửa xe detailing Hà Nội, rửa xe 3 bước sạch sâu, cọ rửa mâm lốp chuyên nghiệp, rửa xe không xước',
    introText: 'Rửa xe không đơn thuần là phun nước xà phòng bọt tuyết rồi lau khô bằng giẻ lau bẩn. Tại XE ĐẸP PRO Hà Nội, rửa xe Detailing 3 bước là một quy trình kỹ thuật khoa học được thiết kế tỉ mỉ để loại bỏ tối đa bụi đất dính bám mà tuyệt đối không tạo ra các ma sát cơ học thô bạo làm xước mờ bề mặt sơn quý giá của bạn.',
    importanceDetail: 'Với bùn đất sét đỏ đặc thù của vùng đồng bằng Sông Hồng bám vào gầm bệ mâm xe sau mỗi trận mưa rào Hà Nội, nếu xịt rửa thiếu bài bản sẽ làm đọng cát cọ xát trực tiếp vào sơn gây trầy xước sâu loang lổ. Quy trình rửa 2 xô lọc cát chuyên sâu kết hợp hóa chất trung tính phân rã đất mềm dẻo giúp loại bỏ bụi bẩn một cách nhẹ nhàng nhất.',
    benefits: [
      { name: 'Ngăn ngừa xước xoáy hoàn toàn', detail: 'Sử dụng găng tay rửa xe lông cừu tơ tự nhiên siêu mềm mịn lướt nhẹ trên sơn phối hợp lưới lọc cát chuyên sâu.', science: 'Cơ chế 2 xô (Two-bucket system) với vỉ lọc cát đáy xô giữ toàn bộ cát bụi nặng lắng xuống dưới không dính lại vào găng cọ sơn.' },
      { name: 'Dung dịch rửa pH trung tính an toàn', detail: 'Bảo vệ nguyên vẹn các lớp ceramic dán phủ mượt mà, không làm ố bạc hay hoen gỉ kim loại, mạ chrome trang trí xe.', science: 'Hóa chất rửa hữu cơ pH = 7 lành tính không phá vỡ liên kết polymer bảo vệ nước sơn.' },
      { name: 'Sạch sâu hốc bánh và gầm bệ xe', detail: 'Làm sạch bùn đất cứng bám chặt hốc cua lốp, ngăn bẩn rỉ sét ăn mòn khung gầm sắt xi xe hơi.', science: 'Hóa chất tan dầu mỡ bôi trơn bám két kết hợp bàn chải chuyên dụng hốc mâm lốp.' },
      { name: 'Thổi khô khí nén & Lau khăn Microfiber xịn', detail: 'Tránh đọng nước khe kính kẽ cửa gây ố mốc sơn rỉ sét bản lề.', science: 'Sử dụng khăn dệt sợi microfiber lông dài cực thấm hút không xơ cứng ma sát sơn.' }
    ],
    indicators: [
      'Xe vừa đi mưa bụi ngập lụt tại các điểm nóng úng nước Hà Nội về.',
      'Xe bám dính nhiều dầu mỡ xích xe máy bám dính, mạt phanh đen mâm xe.',
      'Chủ xe thông thái mong muốn duy trì bề mặt sơn sáng bóng lâu bền, không muốn rửa xe dọn ẩu ngoài đường gây xước xát.'
    ],
    steps: [
      { name: 'Xả nước áp lực cao thô', detail: 'Xịt trôi bùn đất nặng dưới gầm mâm bệ xe.', time: '10 Phút' },
      { name: 'Phun bọt tuyết không chạm phân rã đất bám', detail: 'Ủ bọt tuyết làm bở mềm bùn bẩn li ti trôi tuột bớt ra ngoài mà chưa cần chạm tay.', time: '10 Phút' },
      { name: 'Cọ rửa 3 vùng chuyên sâu', detail: 'Sử dụng găng tay lông cừu rửa nửa thân trên, găng riêng rửa nửa thân dưới xe và cọ rửa hốc mâm lốp.', time: '20 Phút' },
      { name: 'Xịt xả sạch bọt và thổi khô hơi nén', detail: 'Xả sạch nước, dùng khí nén áp lực cao xịt sạch nước đọng khe bản lề cửa xe.', time: '15 Phút' },
      { name: 'Lau khô và dưỡng lốp đen mềm', detail: 'Lau khô bằng khăn Microfiber siêu êm dẻo và dưỡng bảo vệ cao su lốp xe.', time: '15 Phút' }
    ],
    equipments: [
      { name: 'Máy rửa xe áp lực cao nước lạnh', brand: 'Kranzle (Đức)', tech: 'Áp lực phun sương mạnh mẽ điều chỉnh linh hoạt không làm nứt nẻ sần sơn.' },
      { name: 'Máy thổi khí nóng khô thổi nước đọng', brand: 'Metrovac (Mỹ)', tech: 'Thổi luồng gió nóng mạnh đẩy hết nước ra ngoài kẽ khuất an toàn bản lề.' }
    ],
    chemicals: [
      { name: 'Bọt tuyết rửa xe Gentle Snow Foam', brand: 'Koch Chemie (Đức)', ph: '7.0', purpose: 'Tạo bọt dày dặc bôi trơn giảm ma sát rửa xe tối đa.' },
      { name: 'Dung dịch dưỡng đen bóng lốp', brand: 'Sonax (Đức)', ph: '7.2', purpose: 'Dưỡng ẩm cao su chống nứt rạn rỗ má lốp.' }
    ],
    timingAnalysis: 'Thời gian hoàn thiện rửa xe Detailing sạch sâu kéo dài từ 45 đến 75 phút. Mỗi dòng xe được chăm sóc theo nhóm kỹ thuật viên phối hợp chuyên sâu từng hốc cửa mang lại sự an tâm hài lòng tuyệt đối.',
    pricing: [
      { tier: 'Rửa xe nhanh Express Clean (Mọi loại xe)', cost: '150.000 VNĐ', benefits: ['Ủ bọt tuyết phân rã đất bám thô', 'Lau khô cơ bản bằng khăn microfiber', 'Hút bụi sàn thảm nhanh', 'Thổi gió khe kẽ bản lề cửa'] },
      { tier: 'Rửa xe Detailing 3 Bước Sạch Sâu Tiêu Chuẩn', cost: '250.000 VNĐ', benefits: ['Full quy trình rửa 2 xô lông cừu lọc cát', 'Dọn sạch bùn đất hốc cua lốp mâm xe', 'Hút bụi nội thất dọn sạch rác khe ghế', 'Dưỡng bóng cao su lốp chống nứt rạn'] },
      { tier: 'Combo Super Detailing Clean + Xông tinh dầu', cost: '450.000 VNĐ', benefits: ['Full gói rửa detailing 3 bước chuyên sâu', 'Tẩy mạt sắt rỉ sét mâm phanh và nhựa đường bám dính', 'Tẩy ố mốc ố kính lái sườn nhẹ', 'Xông hơi kháng khuẩn sả chanh khử sạch cabin'] }
    ],
    faq: [
      { q: 'Tại sao rửa xe detailing lại đắt hơn rửa xe thường vỉa hè?', a: 'Rửa xe thường lề đường dùng chung giẻ lau bẩn xơ cứng dính đất gây xước sơn trầm trọng và dùng xà phòng kiềm làm rạn nứt sơn. Rửa xe Detailing dùng găng lông cừu, 2 xô lọc cát, hóa chất nhập khẩu Đức pH=7 thân thiện sơn bảo vệ xe hoàn mỹ.' },
      { q: 'Nên đi rửa xe định kỳ bao lâu một lần?', a: 'Nên rửa xe định kỳ 1 tuần/lần hoặc ngay sau khi đi mưa bùn ngập lụt về để bùn đất muối bẩn không bám két làm rỉ bệ khung gầm.' }
    ]
  },
  'dan-phim-cach-nhiet-ha-noi': {
    title: 'Dán Phim Cách Nhiệt Ô Tô 3M Hà Nội',
    tagline: 'Màng phim quang học đa lớp 3M Crystalline cản tia hồng ngoại 99% mát dịu cabin',
    metaTitle: 'Dán Phim Cách Nhiệt Ô Tô Hà Nội | Phim 3M Crystalline',
    metaDesc: 'Dịch vụ dán phim cách nhiệt 3M Crystalline Hà Nội chính hãng tại XE ĐẸP PRO. Cản nhiệt 99%, chống tia UV cực tím bảo vệ mắt và da lái xe. Báo giá ưu đãi!',
    keywords: 'dán phim cách nhiệt ô tô Hà Nội, phim 3M Crystalline Hà Nội, phim cách nhiệt chống nóng, dán kính cách nhiệt ô tô',
    introText: 'Cái nắng mùa hè chói chang của Hà Nội biến khoang cabin xe hơi thành một chiếc lò nướng ngột ngạt khó chịu. Nhiệt lượng bức xạ hồng ngoại trực diện chiếu qua kính lái gây đau rát mắt lái xe, làm quá tải hệ thống điều hòa cơ học tiêu tốn xăng dầu và phá hủy nứt nẻ taplo táp li da đắt tiền. Dán phim cách nhiệt quang học 3M Crystalline tại XE ĐẸP PRO là giải pháp cản nhiệt đỉnh cao, trả lại không gian mát mẻ trong lành lý tưởng cho gia đình bạn.',
    importanceDetail: 'Các dòng phim rẻ tiền nhuộm màu trên thị trường chỉ tạo bóng tối giả tạo để bớt chói mà hoàn toàn không cản được tia hồng ngoại mang nhiệt lượng lớn. Phim quang học đa lớp cao cấp 3M Crystalline gồm 200 lớp siêu mỏng trong suốt loại bỏ 99% tia hồng ngoại và 99.9% tia UV cực tím bảo vệ làn da tuyệt đối khỏi sạm đen nám tàn nhang.',
    benefits: [
      { name: 'Cản nhiệt hồng ngoại vượt trội 99%', detail: 'Giảm từ 5 đến 12 độ C nhiệt độ cabin khi đỗ xe lâu ngày ngoài trời nắng nóng Hà Nội.', science: 'Công nghệ quang học đa lớp phi kim loại độc quyền phản xạ tán xạ bước sóng hồng ngoại cực tốt.' },
      { name: 'Loại bỏ tia cực tím UV cực hại 99.9%', detail: 'Bảo vệ làn da trẻ em nhạy cảm không bị bỏng rát rát và ngăn chặn bạc màu phồng rộp nội thất da táp lô.', science: 'Màng lọc phân tử hữu cơ đặc biệt cắt toàn bộ bước sóng cực tím dưới 400nm.' },
      { name: 'Chống chói mắt chói lóa thông minh', detail: 'Giảm chói lóa khi đi ngược nắng chiều gay gắt hoặc đèn pha led xe ngược chiều dọi thẳng mặt ban đêm.', science: 'Kiểm soát chọn lọc các bước sóng ánh sáng phân cực đi qua kính lái hài hòa tầm nhìn rõ nét.' },
      { name: 'Không cản sóng điện thoại VETC', detail: 'Chạy qua trạm thu phí tự động không lỗi sóng bắt thẻ nhạy bắt sóng GPS mượt mà.', science: 'Cấu tạo phi kim loại nano-ceramic 100% không chắn sóng sóng vô tuyến di động.' }
    ],
    indicators: [
      'Xe mới lăn bánh chưa dán phim cách nhiệt sờ kính nóng rát tay.',
      'Phim cũ dán lâu năm bị bong rộp nổi bọt khí tím tái mất thẩm mỹ gây lóa mắt.',
      'Cabin xe điều hòa bật hết cỡ vẫn cảm thấy oi bức rát cánh tay lái xe.'
    ],
    steps: [
      { name: 'Vệ sinh dọn sạch mặt kính trong ngoài', detail: 'Sử dụng lưỡi gạt cao su mềm dọn sạch hoàn toàn bụi màng keo dính bám.', time: '45 Phút' },
      { name: 'Cắt màng phim theo form kính dán', detail: 'Đo đạc cắt kích thước mép phim ôm khít sát viền đen mép kính sườn kính lái.', time: '30 Phút' },
      { name: 'Khò tạo phom cong của kính ôm khít', detail: 'Dùng máy khò nhiệt sấy nóng màng phim tự ôm gọn theo độ cong uốn lượn kính lái hông.', time: '60 Phút' },
      { name: 'Dán màng phim dính mặt trong kính', detail: 'Lột màng dính phun bôi trơn định hình chính xác phim khít vào mặt trong cabin xe.', time: '90 Phút' },
      { name: 'Gạt nước ép keo khô chặt cố định', detail: 'Dùng gạt cao su chuyên dụng ép sạch bọt nước bong bóng khí cố định vĩnh viễn.', time: '45 Phút' }
    ],
    equipments: [
      { name: 'Máy khò nhiệt độ số thông minh', brand: 'Steinel (Đức)', tech: 'Kiểm soát dải nhiệt độ chính xác từng độ C tránh làm rạn nứt kính nổ kính lái.' },
      { name: 'Gạt ép nước Blue Max chịu lực', brand: 'Triumph (Mỹ)', tech: 'Ép kiệt nước bám giữa kính và phim màng siêu nhanh không lo phồng rộp dộp màng.' }
    ],
    chemicals: [
      { name: 'Nước rửa dán phim chuyên dùng Film-on', brand: 'Madico (Mỹ)', ph: '7.0', purpose: 'Trơn mượt lướt định hình phim bong keo Acrylic bám chắc.' },
      { name: 'Dung dịch lau kính chuyên sâu Glass Cleaner', brand: 'Sonax (Đức)', ph: '6.8', purpose: 'Làm sạch hoàn hảo dầu kính cặn canxi mờ sương.' }
    ],
    timingAnalysis: 'Thời gian dán phim cách nhiệt trọn gói xe hơi kéo dài từ 2 đến 4 tiếng đồng hồ làm việc. Xe sau dán cần hạn chế hạ lên xuống kính sườn trong vòng 48 tiếng để lớp keo Acrylic bám chặt ráo hoàn toàn nước sương.',
    pricing: [
      { tier: 'Gói Phim Nano Ceramic Tiêu Chuẩn (Hatchback/Sedan)', cost: '4.500.000 VNĐ', benefits: ['Nano ceramic cản hồng ngoại 70%', 'Bảo hành bong tróc 5 năm', 'Độ xuyên sáng kính lái tốt rõ nét ban đêm', 'Sóng điện thoại GPS thông suốt cực nhạy'] },
      { tier: 'Gói Phim 3M Color Stable Cao Cấp (Mọi loại xe)', cost: '8.500.000 VNĐ', benefits: ['Công nghệ Nano-Carbon bền màu trọn đời xe', 'Cản nhiệt hồng ngoại 85% dịu mát sâu', 'Chống lóa đèn pha ngược chiều 60%', 'Bảo hành chính hãng 10 năm bong tróc'] },
      { tier: 'Gói Phim Quang Học Siêu Cấp 3M Crystalline', cost: '16.000.000 VNĐ', benefits: ['Màng phim quang học 200 lớp siêu cấp độc quyền', 'Cản tia hồng ngoại mang nhiệt vượt trội 99%', 'Ngăn tia cực tím UV tuyệt đối 99.9%', 'Đổi màu xanh lục bảo cá tính sang trọng khi trời mưa, bảo hành 10 năm'] }
    ],
    faq: [
      { q: 'Phim cách nhiệt dán xong có bị bóng nước mờ sương không?', a: 'Trong 3-7 ngày đầu tiên sau dán, mặt kính có thể bám vài vệt mờ sương nước liti bóng nhẹ do nước lắp đặt chưa bốc hơi hết. Hiện tượng này sẽ tự biến mất hoàn toàn khi keo tự khô căng mịn dưới nắng ấm.' },
      { q: 'Dán kính sườn trước tối quá có khó nhìn gương chiếu hậu ban đêm trời mưa?', a: 'Chuyên gia khuyên nên chọn dán kính sườn hông hàng ghế trước với mã phim xuyên sáng từ 35% trở lên để bảo đảm góc nhìn gương sườn mượt mà an toàn ban đêm.' }
    ]
  },
  've-sinh-noi-that-ha-noi': {
    title: 'Vệ Sinh Nội Thất Ô Tô Hà Nội Chuyên Sâu',
    tagline: 'Diệt sạch 99.9% nấm mốc ổ vi khuẩn tích tụ bằng công nghệ hơi nước nóng 140°C',
    metaTitle: 'Dọn Nội Thất Ô Tô Hà Nội Chuyên Sâu | Diệt Khuẩn Hơi Nước Nóng',
    metaDesc: 'Dịch vụ dọn vệ sinh nội thất ô tô Hà Nội chuyên nghiệp tháo ghế, giặt sàn nỉ giặt ghế da bằng hơi nước nóng khô 140 độ C khử mùi mốc triệt để tại XE ĐẸP PRO.',
    keywords: 'vệ sinh nội thất ô tô Hà Nội, dọn nội thất ô tô chuyên sâu, hơi nước nóng diệt khuẩn, giặt ghế da ô tô',
    introText: 'Không gian nội thất khép kín của xe hơi ví như ngôi nhà thứ hai của bạn. Tuy nhiên mùa nồm ẩm đặc trưng của Hà Nội cùng mồ hôi cơ thể, tàn thuốc lá, mẩu bánh mì rụng kẽ ghế da tạo điều kiện lý tưởng cho nấm mốc đen rêu và hàng triệu ổ vi trùng sinh sôi làm chua hôi cabin xe rây dị ứng hô hấp. Vệ sinh nội thất ô tô chuyên sâu tháo ghế bằng công nghệ hơi nước khô 140 độ C tại XE ĐẸP PRO trả lại không gian sạch sẽ thơm mát thơm tho tuyệt đối cho trẻ con gia đình bạn.',
    importanceDetail: 'Nhiều chủ xe đinh ninh chỉ hút bụi quét sàn cơ bản là đủ sạch, song thực tế bụi đất mạt da người bám chặt dưới gầm thảm nỉ, mút nệm ghế bị thấm hút chua mốc gây mùi rát họng khi bật điều hòa. Việc dọn dẹp tháo ghế giặt sàn giặt trần nỉ bằng vòi phun hơi nước áp lực nóng khô tiêu diệt mầm mống mốc triệt để.',
    benefits: [
      { name: 'Diệt nấm mốc vi trùng 99.9%', detail: 'Tiêu diệt hoàn toàn các bào tử nấm mốc ẩm ẩm ký sinh, ngăn bùng dịch cúm dị ứng đường thở.', science: 'Áp lực hơi nước sấy siêu nóng khô lên tới 140 độ C phá vỡ màng bảo vệ của vi khuẩn sinh vật đơn bào.' },
      { name: 'Dưỡng da mềm mại êm ái mát tay', detail: 'Ghế da ngồi lâu cứng đờ nhăn nhúm được phục hồi căng mịn mượt tay đàn hồi tự nhiên.', science: 'Bôi chất dưỡng mỡ da hữu cơ tự nhiên thấm hút lỗ chân lông da mềm mượt không rít dính nhờn bóng dầu mỡ.' },
      { name: 'Tẩy sạch vết bẩn ố màu cứng đầu', detail: 'Tẩy vết dầu sô cô la rớt, ố khói thuốc vàng bám trần nỉ sườn tapi cửa xe.', science: 'Hóa chất giặt tẩy hữu cơ Koch Chemie nhẹ sủi bọt đẩy bụi két lơ lửng sấy dọn khô.' },
      { name: 'Súc rửa hốc điều hòa thơm mát sâu', detail: 'Dọn dẹp hốc gió máy lạnh, khử sạch mùi chua rác bã côn trùng bám dính gây ho say xe.', science: 'Nội soi phun xịt hơi nước nóng sâu luồng điều hòa đẩy sạch mốc két màng lọc.' }
    ],
    indicators: [
      'Xe xuất hiện mùi hôi chua nồm ẩm mốc lờ lờ mỗi khi nổ máy bật điều hòa cabin.',
      'Bề mặt ghế da loang lổ vết ố bụi đen nỉ trần xe xù xù bám khói thuốc bồ hóng.',
      'Gia đình đón thành viên sơ sinh bé nhỏ cần thanh trùng không khí sạch tinh khiết nhất.'
    ],
    steps: [
      { name: 'Tháo toàn bộ ghế lót ra ngoài cabin', detail: 'Tháo dỡ ghế (nếu chủ xe duyệt) mở bung sàn nỉ thông thoáng dọn sạch kẽ khuất gầm rác két.', time: '90 Phút' },
      { name: 'Hút bụi khô sâu kẽ kẽ ngõ ngách', detail: 'Hút bụi sạch cốp hông sườn rãnh trượt ghế taplo kẽ hốc táp lô sâu.', time: '60 Phút' },
      { name: 'Giặt sấy phun hơi nước nóng khử trùng', detail: 'Xịt sấy hơi nước khô nhiệt độ cao 140 độ C trần sàn nệm da kẽ bản lề cửa xe.', time: '120 Phút' },
      { name: 'Tẩy mờ các vết bẩn ố bám cứng đầu', detail: 'Dùng bàn chải mềm lông ngựa cọ dọn da dọn nhựa tapi tapi nỉ chuyên sâu.', time: '90 Phút' },
      { name: 'Thoa sáp bảo dưỡng da phục hồi Ozone', detail: 'Bôi mỡ dưỡng mịn căng mượt và sấy sục máy tạo Ozone thanh lọc không khí cabin.', time: '60 Phút' }
    ],
    equipments: [
      { name: 'Máy phát hơi nước khô áp lực cao', brand: 'Optima Steamer (Hàn Quốc)', tech: 'Phun hơi nước khô áp suất lớn sấy diệt mầm mốc nhanh khô không sũng ướt sàn điện.' },
      { name: 'Bàn chải cọ da lông ngựa siêu êm', brand: 'Colourlock (Đức)', tech: 'Chất lông ngựa mềm mại dẻo dai làm sạch da mượt mà không làm sờn mòn rách xước da.' }
    ],
    chemicals: [
      { name: 'Dung dịch giặt tẩy hữu cơ Pol Star', brand: 'Koch Chemie (Đức)', ph: '8.5', purpose: 'Làm sạch nỉ da vải trần xe nhẹ sủi bọt bảo vệ cấu trúc dệt.' },
      { name: 'Sáp bảo dưỡng da cao cấp Leather Care', brand: 'Sonax (Đức)', ph: '7.0', purpose: 'Dưỡng da căng mọng đàn hồi thơm dịu mướt mềm.' }
    ],
    timingAnalysis: 'Thời gian dọn dẹp nội thất chuyên sâu tháo ghế mất từ 4 đến 6 tiếng đồng hồ làm việc. Chúng tôi lắp đặt cắm zắc cắm ghế điện bọc cảm ứng túi khí an toàn tỉ mỉ sấy khô cong sàn nỉ tránh ẩm mốc rít hôi.',
    pricing: [
      { tier: 'Vệ sinh dọn dẹp nội thất cơ bản Quick Interior', cost: '800.000 VNĐ', benefits: ['Hút bụi sạch thảm cốp khe cabin', 'Lau dọn taplo tapi bọc da dưỡng bóng cơ bản', 'Lau sạch bụi bẩn mặt kính sườn lái', 'Thời gian làm nhanh gọn 60 phút'] },
      { tier: 'Dọn nội thất chuyên sâu tháo ghế dọn sàn nỉ', cost: '1.500.000 VNĐ', benefits: ['Tháo dỡ ghế ngồi giặt sàn nỉ hơi nước nóng 140°C', 'Giặt bộ ghế da cọ sạch cặn ghét bóng mỡ dưỡng da mềm', 'Dọn trần nỉ phẳng mượt xóa vết ố vàng', 'Tặng sấy hơi khử trùng máy lạnh diệt bào tử'] },
      { tier: 'Combo dọn dẹp nội thất Premium + Diệt khuẩn Ozone', cost: '2.000.000 VNĐ', benefits: ['Full gói dọn nội thất tháo ghế sâu tinh tỉ mỉ', 'Vệ sinh nội soi dàn lạnh điều hòa không tháo taplo', 'Dưỡng sâu bọc da nhựa mềm mịn chống nứt rạn rỗ', 'Sục máy khí khí Ozone tuần hoàn diệt khuẩn mầm bệnh'] }
    ],
    faq: [
      { q: 'Phun hơi nước nóng có làm hỏng các zắc điện ghế chỉnh điện sấy ghế sưởi ghế?', a: 'XE ĐẸP PRO bọc che kín sườn zắc điện mỡ cách điện chuyên dụng cẩn thận. Hơi sấy khô áp suất Optima bốc hơi bay ngay lập tức khô cong không để lại nước đọng rỉ zắc bảo hiểm 100% mạch điện tử.' },
      { q: 'Có nên tháo ghế ra khi dọn nội thất xe hơi?', a: 'Rất khuyên nên tháo ghế vì gầm bệ ghế đọng rất nhiều đồng xu kẹo mút bã đồ ăn kiến gián trú ngụ, chỉ tháo ghế mới dọn tận gốc rác bẩn chua hôi.' }
    ]
  },
  'hieu-chinh-son-ha-noi': {
    title: 'Hiệu Chỉnh Sơn Xe Hơi Hà Nội Chuyên Sâu',
    tagline: 'Kỹ thuật mài cắt phẳng sần da cam, xóa sạch khuyết tật sơn lấp lánh phản gương',
    metaTitle: 'Hiệu Chỉnh Sơn Xe Hơi Hà Nội Chuyên Nghiệp | Phục Hồi Sơn',
    metaDesc: 'Hiệu chỉnh sơn xe hơi Hà Nội đẳng cấp tại XE ĐẸP PRO. Cắt xước quầng mạng nhện, làm phẳng da cam màng sơn bóng giúp sơn lấp lánh như siêu xe triển lãm.',
    keywords: 'hiệu chỉnh sơn xe hơi Hà Nội, phục hồi sơn xe ô tô, mài da cam sơn xe, đánh bóng xóa xước quầng',
    introText: 'Khác biệt hoàn toàn với đánh bóng phủ sáp thông thường vốn chỉ dùng sáp che lấp xước dối dăm một thời gian rồi lộ ra sau vài lần rửa xe. Kỹ thuật Hiệu Chỉnh Sơn (Paint Correction) tại XE ĐẸP PRO Hà Nội là đỉnh cao nghệ thuật detailing mài gọt làm phẳng hoàn hảo lớp bóng ngoài cùng (clear coat) của xe hơi. Chúng tôi sử dụng máy đo độ dày sơn kỹ thuật số và ánh sáng Scangrip đa sắc tái lập khuyết tật sơn xóa vĩnh viễn xước quầng xoáy mờ nến sơn màng xước quầng mạng nhện mờ sương mờ dăm.',
    importanceDetail: 'Mỗi một chiếc xe có độ dày màng sơn cực kỳ khác biệt, lớp clear coat bảo vệ xe chỉ mỏng khoảng 40-50 micron. Nếu lạm dụng máy Rotary thô bạo bào mòn sơn bừa bãi sẽ làm mỏng rách rách lộ lớp sơn lót màu bên dưới gây loang lổ loang lổ hư hỏng xe. Hiệu chỉnh sơn đòi hỏi kỹ thuật tay nghề đo đạc tính toán mài mỏng an toàn mượt mịn nhất bảo tồn sơn gốc của xe.',
    benefits: [
      { name: 'Xóa vĩnh viễn xước quầng lỗi sơn sâu', detail: 'Cam kết xóa triệt để lỗi mạng nhện xước xước quầng lông mèo mà không hề che đậy bằng sáp lấp đầy sáp béo.', science: 'Sử dụng phớt lông cừu cắt phẳng sâu sườn lỗi và đánh bóng tinh mịn xi phân rã nhỏ mượt láng.' },
      { name: 'Cân bằng mài phẳng da cam màng sơn gốc', detail: 'Nước sơn phản chiếu lại đồ vật xung quanh phẳng tắp mượt căng vuông vức không bị cong lượn vỡ nét sần da cam sần sùi.', science: 'Chà nhám ướt nhạt Trizact 3000 làm phẳng nhẹ lớp gợn sóng da cam từ nhà máy sơn đọng.' },
      { name: 'Tạo độ phản quang lấp lánh cực lôi cuốn', detail: 'Lấp lánh hạt nhũ màu sơn lóng lánh nổi rõ rệt ánh nhũ sắc rực rỡ sáng rực rỡ sâu thẳm sang trọng.', science: 'Bề mặt sơn cực mịn phản chiếu góc khúc xạ song song hoàn hảo 100% ánh sáng chiếu vào.' },
      { name: 'Mở đường liên kết Nano Ceramic PPF tốt nhất', detail: 'Gia tăng tuổi thọ lớp dán phủ sơn bám dính siêu bám chặt kéo dài bảo vệ xe.', science: 'Bề mặt sơn không còn màng dầu mỡ tạp chất liên kết hóa học bám ceramic vững chãi.' }
    ],
    indicators: [
      'Xe sang đời mới muốn làm mượt da cam phẳng lỳ đạt độ sâu bóng gương trưng bày showcar.',
      'Sơn xe bị trầy xước xước sâu quẹt cành cây xơ xát, mờ đục xỉn màu do chăm rửa ẩu bám bụi rác.',
      'Xe dính mưa axit bụi công nghiệp bám ố vàng ăn mòn khoét lõm sâu xuống bề mặt sơn bóng.'
    ],
    steps: [
      { name: 'Khảo sát độ dày sơn bằng máy sóng siêu âm', detail: 'Đo 20 điểm trên thân xe lập bản đồ độ dày sơn bóng kiểm soát rủi ro mài mòn.', time: '45 Phút' },
      { name: 'Chà nhám nước mài mượt xước sâu', detail: 'Dùng giấy nhám siêu mịn 3M Trizact mài nhẹ các vết xước quẹt dột gồ ghề.', time: '120 Phút' },
      { name: 'Cắt thô Stage-1 phá xước quầng', detail: 'Dùng phớt len thô cắt lỗi phẳng màng xước mạng nhện mạng nhện dính bám.', time: '300 Phút' },
      { name: 'Đánh bóng Stage-2 làm mịn mượt', detail: 'Phớt xốp trung xi dọn mờ vệt quầng thô của bước cắt trước dọn mượt phẳng lỳ.', time: '240 Phút' },
      { name: 'Refining bóng mịn gương sâu Stage-3', detail: 'Phớt xốp siêu mềm tinh đánh bóng láng bóng gương mịn trong vắt.', time: '180 Phút' }
    ],
    equipments: [
      { name: 'Thiết bị Scangrip Multimatch 8', brand: 'Scangrip (Đan Mạch)', tech: 'Ánh sáng màu sắc kiểm tra khuyết tật từ 2500K tới 6500K tìm lỗi quầng ẩn sâu.' },
      { name: 'Giấy nhám đĩa xốp Trizact 3000', brand: '3M (Mỹ)', tech: 'Cấu trúc mài mòn kim tự tháp láng mịn đều phẳng tuyệt vời không lo lõm sơn.' }
    ],
    chemicals: [
      { name: 'Xi cắt phá thô siêu mài CutMax', brand: 'Sonax (Đức)', ph: '7.8', purpose: 'Phá xước nhanh không tạo bụi bám dính màng sơn mịn.' },
      { name: 'Dung dịch dưỡng sáp láng sâu Perfect Finish', brand: 'Sonax (Đức)', ph: '7.5', purpose: 'Tạo chiều sâu bóng gương mịn sáng loáng rực rỡ màu sơn.' }
    ],
    timingAnalysis: 'Hiệu chỉnh sơn Showcar Master là dịch vụ đỉnh cao đòi hỏi từ 1.5 đến 2 ngày làm việc liên tục của kỹ thuật viên trưởng tại XE ĐẸP PRO Hà Nội để mài mượt tinh tế nhất từng góc rãnh sườn dập chìm của xe.',
    pricing: [
      { tier: 'Hiệu chỉnh sơn Stage 1 Basic (Loại bỏ 70% lỗi xước)', cost: '2.000.000 VNĐ', benefits: ['Xóa mờ xước quầng xoáy nhẹ lông mèo', 'Lau khử màng dầu mốc bám sương mờ sơn', 'Dưỡng bóng wax Carnauba bảo vệ sâu', 'Thích hợp xe sơn mỏng bảo vệ nhẹ'] },
      { tier: 'Hiệu chỉnh sơn Stage 2 Advanced (Loại bỏ 90% lỗi xước)', cost: '3.500.000 VNĐ', benefits: ['Xóa xước xoáy sâu mạng nhện móng tay xước dăm', 'Cân bằng mài phẳng nhẹ độ sần sùi màng sơn bóng', 'Tẩy sạch ố mốc canxi ăn mòn mưa axit kính hông sườn', 'Tặng phủ sealant giữ bóng sâu 6 tháng'] },
      { tier: 'Hiệu chỉnh sơn Showcar Master (Cắt phẳng da cam hoàn hảo)', cost: '5.500.000 VNĐ', benefits: ['Mài mịn nhẵn phẳng da cam màng sơn căng mượt phản chiếu thẳng', 'Xóa bỏ 98%+ khuyết tật trầy xước sứt liti sâu ngoại thất', 'Vệ sinh chi tiết sâu mạ inox ống xả hốc gió tản nhiệt', 'Tặng dọn nội thất hơi nước nóng diệt trùng diệt khuẩn'] }
    ],
    faq: [
      { q: 'Sơn dặm sơn lại có hiệu chỉnh dán dọn dẹp được không?', a: 'Sơn dặm lại có kết cấu clear coat mềm hơn sơn nguyên bản nhà máy. Chúng tôi điều chỉnh lực cắt phớt xốp xi mịn chuyên biệt an toàn phẳng mịn tương đồng sơn zin xe.' },
      { q: 'Tại sao hiệu chỉnh sơn đắt hơn đánh bóng nhanh lề đường?', a: 'Đánh bóng nhanh dùng xi béo lấp xước tạm bợ vài hôm rửa xe trôi đi xước cũ hiện ra. Hiệu chỉnh sơn mài mượt phẳng vật lý dứt điểm xóa xước vĩnh viễn đo đạc cẩn trọng.' }
    ]
  },
  'khu-mui-noi-that-ha-noi': {
    title: 'Khử Mùi Nội Thất Ô Tô Hà Nội Chuyên Sâu',
    tagline: 'Công nghệ phân rã phân tử hôi hữu cơ bằng máy Ozone sinh học và xông tinh dầu Nano sả chanh',
    metaTitle: 'Khử Mùi Nội Thất Ô Tô Hà Nội | Diệt Khuẩn Không Khí',
    metaDesc: 'Dịch vụ khử mùi nội thất ô tô Hà Nội triệt để tại XE ĐẸP PRO. Diệt nấm mốc máy lạnh, sấy xông nano bạc, sục Ozone phân hủy mùi hôi nôn trớ hải sản thơm tho sạch sẽ.',
    keywords: 'khử mùi nội thất ô tô Hà Nội, diệt khuẩn xe hơi, khử mùi máy lạnh ô tô, xông tinh dầu nano bạc',
    introText: 'Mùi hôi sặc sụa chua mốc từ điều hòa rỉ nước, khói thuốc lá lâu năm ám trần nỉ, hay sự cố tràn nước mắm hải sản, nôn trớ của trẻ nhỏ biến khoang cabin xe hơi chật hẹp thành nỗi ám ảnh say xe mệt mỏi cực độ cho mọi người ngồi trong. Các loại sáp thơm lề đường chỉ tạm át mùi bằng hương liệu hóa chất đậm đặc lờ lợ dễ đau đầu say xe dột hơn. Khử mùi nội thất ô tô chuyên sâu tại XE ĐẸP PRO ứng dụng sục khí Ozone diệt khuẩn không khí tuần hoàn kết hợp xông tinh dầu nano sinh học để phân hủy phân rã hoàn toàn tận gốc rễ nguồn mùi hôi chua.',
    importanceDetail: 'Ozone (O3) là chất oxy hóa mạnh mẽ tự nhiên tự tìm kiếm liên kết phân hủy các hợp chất hữu cơ bay lơ lửng bám két kẽ ghế nỉ sàn xe. Sau phản ứng phân rã mùi hôi vi khuẩn dứt điểm, Ozone nhanh chóng phân hủy tự biến đổi ngược lại thành khí Oxy sạch tinh khiết lành tính sảng khoái cực tốt sức khỏe đường hô hấp.',
    benefits: [
      { name: 'Xử lý triệt để tận gốc mùi hữu cơ chua hôi', detail: 'Bay sạch mùi hải sản dột rớt, mùi thuốc lá ám lâu năm, mùi nôn trớ ẩm chua mốc dứt điểm không quay lại.', science: 'Phân tử khí phá vỡ kết cấu hydrocacbon bay hơi hữu cơ bám dính ngóc ngách cabin.' },
      { name: 'Lọc sạch kháng nấm mốc dàn lạnh điều hòa', detail: 'Khử sạch vi khuẩn bám két kẽ dàn tản nhiệt gió máy lạnh, hít thở sảng khoái nhẹ dịu không ho rát họng.', science: 'Sương khói sấy nano bạc luồn lách sâu màng lọc bám kháng khuẩn bảo vệ dài lâu.' },
      { name: 'Giảm mỏi say xe nhức đầu rõ rệt', detail: 'Không khí trong cabin trong lành sạch tinh tươm thoáng mát sảng khoái giúp cả gia đình đi xa vui tươi thoải mái.', science: 'Bơm sạch bụi không khí sấy dọn dọn rác chua giữ sạch an toàn tuyệt đối đường thở.' },
      { name: 'Hóa chất Organic sả chanh thảo mộc an toàn', detail: 'Tỏa mùi sả chanh bưởi bạc hà hữu cơ tự nhiên nhẹ nhàng lãng đãng thư thái dễ chịu rạng rỡ.', science: 'Tinh dầu thiên nhiên chiết xuất chưng cất hơi nước lành tính lành mạnh sức khỏe trẻ em nhạy cảm.' }
    ],
    indicators: [
      'Xe bật máy lạnh phả ra luồng gió đầu tiên có mùi chua mốc, ngai ngái khó thở ẩm chua.',
      'Xe chở hải sản rỉ nước ra cốp sàn nỉ giặt giũ thông thường không đỡ tí mùi hôi hôi thối nào.',
      'Chủ xe hút thuốc trong cabin lâu ngày làm trần nỉ đổi màu vàng ám mùi thuốc khét lẹt ngốt ngạt.'
    ],
    steps: [
      { name: 'Truy tìm dọn nguồn bẩn gây mùi hôi', detail: 'Bới tìm các nguồn hữu cơ, bã kẹo đồ ăn thối mốc ẩm đọng kẽ rãnh ghế tháo rửa thảm lót sàn.', time: '30 Phút' },
      { name: 'Vệ sinh giặt giũ khô sàn da nỉ bị ướt rớt bẩn', detail: 'Tẩy sấy hơi nước nóng các vị trí bị dột tràn nước hôi nôn trớ giặt sạch ráo sâu.', time: '45 Phút' },
      { name: 'Sục máy sấy khí Ozone tuần hoàn kín cabin', detail: 'Chạy sục khí Ozone nồng độ cao kín cửa 20 phút oxy hóa diệt mầm mốc vi trùng lơ lửng sấy dọn rác mùi.', time: '30 Phút' },
      { name: 'Phun xông sương khói nano bạc kháng khuẩn', detail: 'Phát tán sương nano bạc len lỏi sâu hốc dàn lạnh quạt gió máy lạnh cản vi nấm mọc bám.', time: '20 Phút' },
      { name: 'Thông quạt gió thổi bung thoáng sạch sẽ', detail: 'Mở bung bung cửa quạt gió thổi bay khí dư thừa, tỏa hương sả chanh thảo mộc dịu mát mướt.', time: '15 Phút' }
    ],
    equipments: [
      { name: 'Máy sục khí khí Ozone Corona Discharge', brand: 'OzoneTech (Mỹ)', tech: 'Phóng điện hồ quang nồng độ cao tạo khí Ozone phân rã mùi nhanh chóng không tồn dư chất hại.' },
      { name: 'Máy xông khói hơi sương Nano diệt khuẩn', brand: 'UUL (Đức)', tech: 'Bốc hơi hạt sương liti dải micromet lơ lửng lâu dài chống nấm mốc bám két gió lạnh.' }
    ],
    chemicals: [
      { name: 'Tinh dầu hữu cơ Sả Chanh kháng nấm', brand: 'Laorganic (VN)', ph: '7.0', purpose: 'Chiết xuất Organic bám giữ hương thơm thảo mộc xua đuổi muỗi gián kiến hôi.' },
      { name: 'Dung dịch xịt nội soi dàn lạnh điều hòa Klima-Anlagen', brand: 'Liqui Moly (Đức)', ph: '6.5', purpose: 'Xịt sủi bọt rửa sạch két bụi canxi bẩn dàn lạnh ngóc ngách.' }
    ],
    timingAnalysis: 'Thời gian thi công khử mùi chuyên sâu dọn sạch từ 45 đến 90 phút tùy mức độ nặng nhẹ. Khuyên dùng kết hợp dọn nội thất hơi nước nóng tháo ghế dứt điểm hôi thối 100% bám dính dột bẩn mốc.',
    pricing: [
      { tier: 'Sục khí Ozone thanh lọc diệt khuẩn không khí cabin', cost: '300.000 VNĐ', benefits: ['Phân hủy gốc mùi hữu cơ bay lơ lửng', 'Diệt bào tử nấm mốc phòng kín 20 phút', 'An toàn đồ da taplo dệt nỉ cao su xe', 'Khí Ozone phân rã hoàn toàn ra Oxy sạch'] },
      { tier: 'Xông tinh dầu Nano Bạc kháng khuẩn màng lạnh', cost: '450.000 VNĐ', benefits: ['Xông hơi len lỏi sâu màng lọc máy lạnh ô tô', 'Diệt sạch 99% vi khuẩn hốc gió ngăn mốc mọc lại', 'Hương thơm sả chanh sảng khoái nhẹ nhõm dịu dàng', 'Thời gian hoàn thiện nhanh gọn lẹ 30 phút'] },
      { tier: 'Combo Khử Mùi Triệt Để dọn dọn dàn lạnh + Ozone chuyên sâu', cost: '900.000 VNĐ', benefits: ['Full gói sục Ozone diệt khuẩn phòng cabin kín', 'Xông hơi nano bạc bám giữ lọc lạnh lâu dài kháng khuẩn', 'Xịt nội soi vệ sinh dàn lạnh điều hòa sạch canxi bằng camera không tháo taplo táp lô dột', 'Tẩy mốc ẩm dột góc khuất cốp sau sàn nỉ'] }
    ],
    faq: [
      { q: 'Sục khí Ozone khử mùi hôi có độc hại mòn mòn da ghế taplo xe hơi không?', a: 'Khí Ozone nồng độ kiểm soát an toàn của XE ĐẸP PRO chỉ có tính oxy hóa tế bào đơn vi trùng nấm mốc bám dính hữu cơ bay hơi, sau 10 phút sục sẽ tự bẻ gãy liên kết phân rã về thành Oxy nguyên bản cực tốt trong lành nên tuyệt đối vô hại đồ da gỗ nỉ kim loại của xe.' },
      { q: 'Rửa vệ sinh ngoài sơn xong xe có bớt mùi hôi hôi trong xe không?', a: 'Không đỡ bớt do mầm mống mùi hôi bám dính sâu bên trong sàn nỉ thảm lót dột nấm mốc điều hòa tích tụ ẩm thấp, cần vệ sinh khử khuẩn chuyên sâu sục Ozone nội thất mới bớt bay sạch.' }
    ]
  }
};

const LocalSeoLandingPage: React.FC<LocalSeoLandingPageProps> = ({
  serviceId,
  siteConfig,
  setSiteConfig,
  t,
  isEditMode,
  isBookingModalOpen,
  setIsBookingModalOpen,
  onAddNotification
}) => {
  const location = useLocation();
  const pathKey = location.pathname.replace('/', '');
  
  // Resolve correct data config
  const config = SEO_PAGES_DATA[pathKey] || SEO_PAGES_DATA['phu-ceramic-ha-noi'];

  // Form State for Booking
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerCar, setCustomerCar] = useState('');
  const [customerNote, setCustomerNote] = useState('');
  const [vehicleType, setVehicleType] = useState('sedan');
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handleQuickSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) {
      toast.error('Vui lòng điền Họ tên và Số điện thoại!');
      return;
    }

    const phoneRegex = /^(0[3|5|7|8|9])[0-9]{8}$/;
    if (!phoneRegex.test(customerPhone.trim())) {
      toast.error('Số điện thoại không hợp lệ, vui lòng nhập SĐT Việt Nam!');
      return;
    }

    setIsSending(true);
    const appointmentId = Date.now().toString();
    const todayStr = new Date().toISOString().split('T')[0];

    const adminHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 12px; background: #0f172a; color: #fff;">
        <h2 style="color: #3b82f6; border-bottom: 2px solid #3b82f6; padding-bottom: 8px;">ĐĂNG KÝ TƯ VẤN SEO LOCAL HÀ NỘI</h2>
        <p><strong>Dịch vụ yêu cầu:</strong> ${config.title}</p>
        <p><strong>Họ tên khách hàng:</strong> ${customerName}</p>
        <p><strong>Số điện thoại:</strong> ${customerPhone}</p>
        <p><strong>Dòng xe:</strong> ${customerCar || 'Không cung cấp'} (Phân khúc: ${vehicleType.toUpperCase()})</p>
        <p><strong>Yêu cầu / Ghi chú:</strong> ${customerNote || 'Không có'}</p>
        <p style="font-size: 11px; color: #94a3b8; margin-top: 20px;">Đường dẫn nguồn: ${location.pathname}</p>
      </div>
    `;

    try {
      await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: siteConfig.contactEmail || 'carwash68.vn@gmail.com',
          subject: `[Local SEO Hà Nội] Đăng ký đặt lịch: ${customerName}`,
          html: adminHtml,
          isBooking: true
        })
      });

      const newAppointment: Appointment = {
        id: appointmentId,
        customerName,
        phone: customerPhone,
        email: '',
        carModel: customerCar,
        serviceId: serviceId,
        subServiceTitle: `${config.title} - Tư Vấn Trực Tiếp`,
        date: todayStr,
        time: 'Liên hệ lại ngay',
        status: 'pending',
        note: customerNote || `Yêu cầu gọi lại tư vấn từ Local SEO Landing Page Hà Nội: ${config.title}`,
        createdAt: new Date().toISOString(),
        isRead: false
      };

      setSiteConfig(prev => ({
        ...prev,
        appointments: [newAppointment, ...(prev.appointments || [])]
      }));

      if (onAddNotification) {
        onAddNotification({
          title: `Đăng ký dịch vụ: ${config.title}`,
          message: `Khách hàng ${customerName} (${customerPhone}) yêu cầu gọi lại tư vấn dịch vụ ${config.title} tại Hà Nội.`,
          type: 'success'
        });
      }

      toast.success('Gửi yêu cầu thành công! Chúng tôi sẽ gọi lại bạn ngay dưới 15 phút.');
      setIsSuccess(true);
      setCustomerName('');
      setCustomerPhone('');
      setCustomerCar('');
      setCustomerNote('');
    } catch (err) {
      console.error(err);
      toast.error('Gửi yêu cầu thất bại. Quý khách vui lòng bấm nút gọi hotline!');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      <SEO 
        title={config.metaTitle}
        description={config.metaDesc}
        keywords={config.keywords}
        canonical={location.pathname}
        siteConfig={siteConfig}
      />

      {/* Structured Schema Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": config.faq.map(f => ({
            "@type": "Question",
            "name": f.q,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": f.a
            }
          }))
        })}
      </script>

      {/* Header Banner Section */}
      <header className="relative py-24 sm:py-36 flex items-center justify-center overflow-hidden border-b border-white/5 bg-slate-900/40">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-950/70 to-slate-950 z-10"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#020617_1px,transparent_1px),linear-gradient(to_bottom,#020617_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-25 z-0"></div>
        </div>

        <div className="container mx-auto px-4 relative z-20 text-center max-w-4xl space-y-8">
          {/* Breadcrumbs */}
          <nav className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-black uppercase tracking-wider text-slate-400">
            <Link to="/" className="hover:text-blue-500 transition-colors flex items-center gap-1">
              <Home className="w-3.5 h-3.5" />
              <span>Trang chủ</span>
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-600" />
            <span className="text-blue-500 font-extrabold">{config.title} Hà Nội</span>
          </nav>

          <h1 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight leading-none">
            {config.title} Hà Nội
          </h1>

          <p className="text-blue-400 text-lg sm:text-2xl font-black uppercase tracking-wide">
            ⭐ {config.tagline}
          </p>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto font-medium">
            {config.introText}
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <a 
              href={`tel:${siteConfig.contactPhone || '0588896699'}`} 
              className="flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black uppercase text-xs tracking-widest transition-all shadow-xl hover:scale-105"
            >
              <Phone className="w-4 h-4 animate-pulse" />
              <span>Hotline: {siteConfig.contactPhone || '0588896699'}</span>
            </a>
            <a 
              href={`https://zalo.me/${siteConfig.zaloNumber || '0588896699'}`} 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center gap-3 px-8 py-4 bg-slate-900 border border-white/10 hover:bg-slate-800 text-white rounded-2xl font-black uppercase text-xs tracking-widest transition-all shadow-xl hover:scale-105"
            >
              <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg" className="w-5 h-5" alt="Zalo" />
              <span>Tư Vấn Zalo Miễn Phí</span>
            </a>
            <button 
              onClick={() => setIsBookingModalOpen(true)}
              className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white rounded-2xl font-black uppercase text-xs tracking-widest transition-all shadow-xl hover:scale-105"
            >
              <Calendar className="w-4 h-4" />
              <span>Đặt Lịch Ngay</span>
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16 max-w-5xl space-y-24">
        {/* Section 1: Giới thiệu Chuyên Sâu & EEAT */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="px-3 py-1 bg-blue-600/10 border border-blue-500/20 text-blue-400 rounded-full text-xs font-black uppercase tracking-widest">
              Góc Nhìn Chuyên Gia
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase text-white tracking-tight leading-tight">
              Tại sao bạn cần {config.title} tại Hà Nội?
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed font-medium">
              {config.importanceDetail}
            </p>
            <div className="p-6 bg-slate-900/50 border border-white/5 rounded-3xl space-y-4">
              <h4 className="text-white font-extrabold text-base flex items-center gap-2">
                <Shield className="w-5 h-5 text-emerald-500" />
                <span>Cam kết Độc Quyền tại XE ĐẸP PRO:</span>
              </h4>
              <ul className="text-slate-400 text-xs leading-relaxed space-y-2.5 font-medium">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500">✓</span>
                  <span>100% dung dịch, hóa chất chính hãng nhập khẩu nguyên chai đạt chuẩn an toàn SGS châu Âu.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500">✓</span>
                  <span>Phòng thi công chuyên biệt khép kín dập bụi mịn, điều hòa kiểm soát nhiệt độ nồm ẩm.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500">✓</span>
                  <span>Đội ngũ kỹ thuật viên có chứng chỉ Detailing chuyên nghiệp, thực hiện trên 2.000+ dòng xe hơi.</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="bg-slate-900 border border-white/5 rounded-[40px] p-8 shadow-2xl relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/10 rounded-bl-[80px] z-0"></div>
            <div className="space-y-6 relative z-10">
              <h3 className="text-white font-black text-xl uppercase tracking-tight">Nhận diện khuyết tật xe hơi</h3>
              <p className="text-slate-400 text-xs leading-relaxed font-medium">
                Nếu xe hơi của bạn xuất hiện các dấu hiệu dưới đây, hãy đưa xe ngay tới cơ sở của XE ĐẸP PRO tại Hà Nội để được chẩn đoán khôi phục kịp thời trước khi lớp sơn/nội thất bị hỏng hóc vĩnh viễn:
              </p>
              <div className="space-y-3 pt-2">
                {config.indicators.map((ind, idx) => (
                  <div key={idx} className="flex gap-3 items-start text-xs text-slate-300 font-semibold">
                    <span className="w-5 h-5 rounded-full bg-red-600/20 text-red-500 flex items-center justify-center font-black shrink-0">!</span>
                    <span>{ind}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Lợi ích Vượt Trội */}
        <section className="space-y-12">
          <div className="text-center space-y-4">
            <span className="px-3 py-1 bg-emerald-600/10 border border-emerald-500/20 text-emerald-400 rounded-full text-xs font-black uppercase tracking-widest">
              Lợi Ích Vượt Trội
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase text-white tracking-tight text-center">
              Giá Trị Thực Tế Mang Lại Cho Xế Yêu
            </h2>
            <p className="text-slate-400 text-sm max-w-2xl mx-auto font-medium">
              Không chỉ cải thiện thẩm mỹ sáng loáng tức thời, dịch vụ của chúng tôi mang lại những giá trị khoa học lâu dài bảo vệ an toàn tối đa tài sản của bạn.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {config.benefits.map((b, idx) => (
              <div key={idx} className="p-8 bg-slate-900/30 border border-white/5 rounded-[36px] hover:border-blue-500/30 transition-all group duration-300">
                <div className="flex gap-6 items-start">
                  <div className="w-14 h-14 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center font-black text-blue-500 text-xl shrink-0">
                    0{idx + 1}
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-white font-black text-lg uppercase tracking-tight group-hover:text-blue-400 transition-colors">
                      {b.name}
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed font-medium">
                      {b.detail}
                    </p>
                    <p className="text-slate-500 text-xs italic leading-relaxed font-medium border-t border-white/5 pt-2">
                      🔬 <strong>Cơ sở khoa học:</strong> {b.science}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Quy Trình Thi Công Khép Kín */}
        <section className="space-y-12">
          <div className="text-center space-y-4">
            <span className="px-3 py-1 bg-blue-600/10 border border-blue-500/20 text-blue-400 rounded-full text-xs font-black uppercase tracking-widest">
              Đẳng Cấp Detailing
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase text-white tracking-tight">
              Quy Trình Thi Công Chuyên Nghiệp
            </h2>
            <p className="text-slate-400 text-sm max-w-2xl mx-auto font-medium">
              Từng bước thao tác được kiểm soát cực kỳ nghiêm ngặt bởi trưởng bộ phận kỹ thuật XE ĐẸP PRO, tuân thủ tiêu chuẩn chăm sóc xe quốc tế.
            </p>
          </div>

          <div className="space-y-4 max-w-4xl mx-auto">
            {config.steps.map((st, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row gap-6 p-8 bg-slate-900/40 border border-white/5 rounded-3xl items-center justify-between">
                <div className="flex gap-4 items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-600/10 text-blue-500 flex items-center justify-center font-black text-sm shrink-0">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="text-white font-extrabold text-base uppercase tracking-tight">{st.name}</h4>
                    <p className="text-slate-400 text-xs leading-relaxed font-medium">{st.detail}</p>
                  </div>
                </div>
                <div className="px-4 py-2 bg-blue-600/10 border border-blue-500/20 rounded-full text-blue-400 text-[10px] font-black uppercase tracking-widest shrink-0">
                  ⏱️ {st.time}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Thiết Bị & Hóa Chất Chuyên Dụng */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h3 className="text-2xl font-black uppercase text-white tracking-tight flex items-center gap-2">
              <Award className="w-6 h-6 text-blue-500" />
              <span>Thiết Bị Công Nghệ Cao</span>
            </h3>
            <p className="text-slate-400 text-xs leading-relaxed font-medium">
              Chúng tôi cam kết sử dụng hệ thống máy móc, thiết bị hiện đại bậc nhất châu Âu và Nhật Bản, mang lại độ chính xác hoàn hảo, kiểm soát rủi ro ở mức bằng không:
            </p>
            <div className="space-y-4">
              {config.equipments.map((eq, idx) => (
                <div key={idx} className="p-5 bg-slate-900/30 border border-white/5 rounded-2xl space-y-1">
                  <div className="flex justify-between items-center">
                    <h5 className="text-white font-extrabold text-sm">{eq.name}</h5>
                    <span className="text-blue-500 text-[10px] font-black uppercase bg-blue-500/10 px-2 py-0.5 rounded-full">{eq.brand}</span>
                  </div>
                  <p className="text-slate-400 text-xs font-medium leading-relaxed">{eq.tech}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-black uppercase text-white tracking-tight flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-emerald-500" />
              <span>Hóa Chất An Toàn Tuyệt Đối</span>
            </h3>
            <p className="text-slate-400 text-xs leading-relaxed font-medium">
              Hóa chất sử dụng tại XE ĐẸP PRO được tuyển chọn khắt khe từ các thương hiệu hóa chất chăm sóc xe nổi tiếng nhất thế giới với chỉ số pH an toàn tuyệt đối cho da ghế và sơn xe:
            </p>
            <div className="space-y-4">
              {config.chemicals.map((ch, idx) => (
                <div key={idx} className="p-5 bg-slate-900/30 border border-white/5 rounded-2xl space-y-1">
                  <div className="flex justify-between items-center">
                    <h5 className="text-white font-extrabold text-sm">{ch.name}</h5>
                    <span className="text-emerald-500 text-[10px] font-black uppercase bg-emerald-500/10 px-2 py-0.5 rounded-full">{ch.brand}</span>
                  </div>
                  <p className="text-slate-400 text-xs font-medium leading-relaxed">
                    🧪 <strong>pH:</strong> {ch.ph} | <strong>Công dụng:</strong> {ch.purpose}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 5: Bảng Giá Trọn Gói Công Khai */}
        <section className="space-y-12">
          <div className="text-center space-y-4">
            <span className="px-3 py-1 bg-blue-600/10 border border-blue-500/20 text-blue-400 rounded-full text-xs font-black uppercase tracking-widest">
              Báo Giá Minh Bạch
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase text-white tracking-tight text-center">
              Bảng Giá Dịch Vụ Trọn Gói Hà Nội
            </h2>
            <p className="text-slate-400 text-sm max-w-2xl mx-auto font-medium">
              Không vẽ thêm bệnh, không phát sinh chi phí phụ, bảo hành điện tử chính hãng minh bạch 100%.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {config.pricing.map((p, idx) => (
              <div key={idx} className="p-8 bg-slate-900/40 border border-white/5 rounded-[40px] flex flex-col justify-between hover:border-blue-500/30 transition-all duration-300 relative overflow-hidden">
                <div className="space-y-6">
                  <h4 className="text-white font-black text-lg uppercase tracking-tight leading-tight">{p.tier}</h4>
                  <div className="text-blue-500 font-black text-2xl sm:text-3xl tracking-tight border-b border-white/5 pb-4">
                    {p.cost}
                  </div>
                  <ul className="space-y-3 text-xs text-slate-400 leading-relaxed font-semibold">
                    {p.benefits.map((bf, bIdx) => (
                      <li key={bIdx} className="flex gap-2 items-start">
                        <span className="text-emerald-500 shrink-0">✓</span>
                        <span>{bf}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <button 
                  onClick={() => setIsBookingModalOpen(true)}
                  className="w-full mt-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase text-xs tracking-widest rounded-2xl transition-all shadow-md"
                >
                  Đặt Gói Này
                </button>
              </div>
            ))}
          </div>

          <div className="p-6 bg-slate-900/20 border border-white/5 rounded-3xl text-center max-w-3xl mx-auto">
            <p className="text-slate-400 text-xs leading-relaxed font-semibold">
              ⚠️ <strong>Phân tích thời gian thi công thực tế:</strong> {config.timingAnalysis}
            </p>
          </div>
        </section>

        {/* Section 6: Video Quy Trình Trực Quan */}
        <section className="space-y-8 max-w-4xl mx-auto text-center">
          <div className="space-y-4">
            <span className="px-3 py-1 bg-blue-600/10 border border-blue-500/20 text-blue-400 rounded-full text-xs font-black uppercase tracking-widest">
              Trực Quan Thực Tế
            </span>
            <h2 className="text-3xl font-black uppercase text-white tracking-tight">Trải Nghiệm Video Quy Trình Chăm Sóc Xe</h2>
          </div>
          <div className="relative aspect-video rounded-[36px] overflow-hidden border border-white/5 shadow-2xl group">
            <iframe 
              src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
              title="Quy trình Detailing"
              className="w-full h-full object-cover"
              allowFullScreen
            ></iframe>
          </div>
          <p className="text-slate-500 text-xs italic font-medium">
            * Video ghi hình chân thực các công đoạn vệ sinh, hiệu chỉnh sơn và sấy nhiệt hồng ngoại khép kín tại xưởng XE ĐẸP PRO Hà Nội.
          </p>
        </section>

        {/* Section 7: Giải Đáp Thắc Mắc FAQ */}
        <section className="space-y-12">
          <div className="text-center space-y-4">
            <span className="px-3 py-1 bg-blue-600/10 border border-blue-500/20 text-blue-400 rounded-full text-xs font-black uppercase tracking-widest">
              Góc Hỏi Đáp
            </span>
            <h2 className="text-3xl font-black uppercase text-white tracking-tight">Câu Hỏi Thường Gặp</h2>
            <p className="text-slate-400 text-sm max-w-2xl mx-auto font-medium">
              Chuyên gia của XE ĐẸP PRO giải đáp cặn kẽ những lo lắng thắc mắc phổ biến nhất của các chủ xe ô tô tại Hà Nội.
            </p>
          </div>

          <div className="space-y-4 max-w-3xl mx-auto">
            {config.faq.map((f, idx) => (
              <div key={idx} className="border border-white/5 rounded-2xl bg-slate-900/30 overflow-hidden">
                <button 
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full px-6 py-5 text-left flex justify-between items-center text-white font-extrabold text-sm sm:text-base hover:bg-white/2"
                >
                  <span>{f.q}</span>
                  <span className="text-blue-500 font-bold">{activeFaq === idx ? '−' : '+'}</span>
                </button>
                {activeFaq === idx && (
                  <div className="px-6 py-5 bg-slate-950/40 border-t border-white/5 text-slate-400 text-xs sm:text-sm leading-relaxed font-semibold">
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Section 8: Form Đăng Ký Tư Vấn & CTA */}
        <section className="py-16 bg-gradient-to-b from-slate-900 to-slate-950 border border-white/5 rounded-[48px] relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(37,99,235,0.1),transparent_50%)] z-0"></div>
          <div className="container mx-auto px-6 sm:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
              <span className="px-3 py-1 bg-blue-600/10 border border-blue-500/20 text-blue-400 rounded-full text-xs font-black uppercase tracking-widest">
                Đăng Ký Tư Vấn Miễn Phí
              </span>
              <h2 className="text-3xl sm:text-4xl font-black uppercase text-white tracking-tight leading-tight">
                Đặt Lịch Chăm Sóc Xe Ngay
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed font-medium">
                Hãy để các chuyên viên kỹ thuật tay nghề cao của XE ĐẸP PRO liên hệ hỗ trợ đưa ra giải pháp chăm sóc xế yêu của bạn một cách tối ưu và kinh tế nhất.
              </p>
              
              <div className="space-y-4 text-left">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">✓</div>
                  <p className="text-slate-400 text-xs font-semibold">Tư vấn miễn phí không mua không sao</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">✓</div>
                  <p className="text-slate-400 text-xs font-semibold">Gọi lại tư vấn cực nhanh dưới 15 phút làm việc</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="bg-slate-950/60 backdrop-blur-xl border border-white/5 rounded-3xl p-6 sm:p-8 shadow-xl">
                {isSuccess ? (
                  <div className="text-center space-y-4 py-8">
                    <div className="w-16 h-16 rounded-full bg-emerald-600/20 text-emerald-500 border border-emerald-500/30 flex items-center justify-center mx-auto text-3xl">🎉</div>
                    <h4 className="text-white font-black text-xl uppercase">Gửi yêu cầu thành công!</h4>
                    <p className="text-slate-400 text-xs sm:text-sm font-medium">Cám ơn quý khách đã tin dùng dịch vụ. Chuyên viên của XE ĐẸP PRO Hà Nội sẽ gọi lại liên hệ ngay lập tức.</p>
                    <button onClick={() => setIsSuccess(false)} className="px-5 py-2.5 bg-white/5 text-slate-300 text-xs uppercase font-black tracking-wider rounded-xl hover:text-white">Đặt xe khác</button>
                  </div>
                ) : (
                  <form onSubmit={handleQuickSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-black text-slate-500 tracking-wider">Họ tên khách hàng *</label>
                        <input 
                          type="text" 
                          required 
                          value={customerName} 
                          onChange={e => setCustomerName(e.target.value)}
                          placeholder="Ví dụ: Anh Hoàng"
                          className="w-full bg-slate-950 border border-white/5 rounded-xl p-3 text-white text-xs outline-none focus:border-blue-500/50"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-black text-slate-500 tracking-wider">Số điện thoại liên hệ *</label>
                        <input 
                          type="tel" 
                          required 
                          value={customerPhone} 
                          onChange={e => setCustomerPhone(e.target.value)}
                          placeholder="Ví dụ: 0912345678"
                          className="w-full bg-slate-950 border border-white/5 rounded-xl p-3 text-white text-xs outline-none focus:border-blue-500/50"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-black text-slate-500 tracking-wider">Tên xe / Hãng xe</label>
                        <input 
                          type="text" 
                          value={customerCar} 
                          onChange={e => setCustomerCar(e.target.value)}
                          placeholder="Ví dụ: Ford Everest"
                          className="w-full bg-slate-950 border border-white/5 rounded-xl p-3 text-white text-xs outline-none focus:border-blue-500/50"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-black text-slate-500 tracking-wider">Phân khúc xe</label>
                        <div className="grid grid-cols-3 gap-1">
                          {['mini', 'sedan', 'suv'].map(t => (
                            <button
                              key={t}
                              type="button"
                              onClick={() => setVehicleType(t)}
                              className={`py-2 text-[10px] uppercase font-black tracking-widest border rounded-xl transition-all ${
                                vehicleType === t ? 'bg-blue-600 border-transparent text-white' : 'bg-slate-950 border-white/5 text-slate-400'
                              }`}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-black text-slate-500 tracking-wider">Lời nhắn / Yêu cầu cụ thể</label>
                      <textarea 
                        value={customerNote} 
                        onChange={e => setCustomerNote(e.target.value)}
                        placeholder="Quý khách muốn đặt lịch ngày nào hoặc cần tư vấn gói sản phẩm nào..."
                        rows={2}
                        className="w-full bg-slate-950 border border-white/5 rounded-xl p-3 text-white text-xs outline-none focus:border-blue-500/50 resize-none"
                      />
                    </div>

                    <button 
                      type="submit" 
                      disabled={isSending}
                      className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-black uppercase text-xs tracking-widest transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isSending ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Đang gửi thông tin...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Gửi yêu cầu gọi lại tư vấn</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </section>
      </main>
    </div>
  );
};

export default LocalSeoLandingPage;
