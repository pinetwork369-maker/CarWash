
import { GalleryImage, SiteConfig, Review, CustomerRecord, NewsArticle, InventoryItem, LoyaltyConfig, ECertificate, Expense, SubscriptionPackage, DecalColor, WrapProject } from './types';

export const SERVICES = [
  {
    id: 'wash',
    title: 'Rửa Xe Detailing 3 Bước',
    description: 'Quy trình "Deep Clean" tiêu chuẩn quốc tế. Sử dụng dung dịch pH trung tính, găng tay lông cừu và phương pháp 2 xô để loại bỏ bụi bẩn mà không gây trầy xước. Vệ sinh kỹ từng khe kẽ, mâm lốp và hút bụi nội thất cơ bản.',
    price: 'Liên hệ',
    category: 'exterior',
    icon: '🚿',
    image: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&q=80&w=800',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    subServices: [
      { title: 'Rửa xe nhanh', price: 'Liên hệ', note: 'Tiết kiệm thời gian' },
      { title: 'Rửa xe tiêu chuẩn', price: 'Liên hệ', note: 'Sạch sâu chi tiết' },
      { title: 'Rửa xe cao cấp', price: 'Liên hệ', note: 'Bảo vệ sơn tối ưu' }
    ],
    inventoryConsumptions: [
      { itemId: 'inv4', amount: 0.1 } // Dung dịch rửa xe
    ],
    seoKeywords: 'rửa xe detailing Hà Nội, rửa xe 3 bước, vệ sinh xe hơi chuyên sâu, rửa xe Long Biên, chăm sóc xe ô tô',
    seoDescription: 'Dịch vụ rửa xe Detailing 3 bước tiêu chuẩn quốc tế tại XE ĐẸP PRO. Làm sạch sâu, bảo vệ sơn xe, sử dụng dung dịch pH trung tính.'
  },
  {
    id: 'polish',
    title: 'Hiệu Chỉnh & Đánh Bóng Sơn',
    description: 'Quy trình hiệu chỉnh sơn chuyên sâu 3 giai đoạn sử dụng máy đánh bóng Dual Action (DA) và xi đánh bóng cao cấp. Loại bỏ hoàn toàn vết xước xoáy, vết quầng và phục hồi độ bóng gương tuyệt đối cho bề mặt sơn.',
    price: 'Liên hệ',
    category: 'exterior',
    icon: '✨',
    image: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&q=80&w=800',
    inventoryConsumptions: [
      { itemId: 'inv2', amount: 0.2 } // Xi đánh bóng
    ],
    seoKeywords: 'đánh bóng ô tô Hà Nội, hiệu chỉnh sơn xe, xóa xước xe hơi, phục hồi độ bóng sơn, đánh bóng xe hơi Long Biên',
    seoDescription: 'Hiệu chỉnh và đánh bóng sơn ô tô chuyên sâu tại XE ĐẸP PRO. Loại bỏ vết xước, quầng xoáy, phục hồi độ bóng gương tuyệt đối cho xế yêu.'
  },
  {
    id: 'ceramic',
    title: 'Phủ Ceramic 9H Diamond',
    description: 'Ứng dụng công nghệ Nano Ceramic 9H tạo lớp màng bảo vệ siêu cứng, tăng hiệu ứng lá sen, chống tia UV và các tác nhân ăn mòn hóa học. Giúp xe luôn bóng bẩy và cực kỳ dễ vệ sinh.',
    price: 'Liên hệ',
    category: 'protection',
    icon: '🛡️',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=800',
    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
    inventoryConsumptions: [
      { itemId: 'inv1', amount: 1 } // Dung dịch Ceramic
    ],
    seoKeywords: 'phủ ceramic ô tô Hà Nội, ceramic 9H, bảo vệ sơn xe ceramic, phủ bóng xe hơi, ceramic diamond 9H',
    seoDescription: 'Phủ Ceramic 9H Diamond cao cấp bảo vệ sơn xe toàn diện. Tăng độ bóng, chống tia UV, hiệu ứng lá sen vượt trội tại XE ĐẸP PRO.'
  },
  {
    id: 'ppf',
    title: 'Dán Phim Bảo Vệ Sơn PPF',
    description: 'Lớp "giáp tàng hình" bảo vệ sơn xe khỏi đá văng, trầy xước và tác động ngoại lực. Phim PPF cao cấp có khả năng tự phục hồi vết xước nhỏ khi gặp nhiệt độ cao.',
    price: 'Liên hệ báo giá',
    category: 'protection',
    icon: '💎',
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=800',
    subServices: [
      { title: 'Gói bảo vệ các chi tiết nội thất', price: 'Liên hệ', note: 'Chống xước nhựa bóng' },
      { title: 'Gói bảo vệ 4 hõm cửa & gương', price: 'Liên hệ', note: 'Vị trí dễ trầy xước' },
      { title: 'Gói bảo vệ Full xe (TPU 10 năm)', price: 'Liên hệ', note: 'Bảo vệ toàn diện' }
    ],
    seoKeywords: 'dán PPF ô tô Hà Nội, phim bảo vệ sơn PPF, dán PPF Long Biên, chống xước xe hơi PPF, PPF TPU cao cấp',
    seoDescription: 'Dán phim bảo vệ sơn PPF (Paint Protection Film) chính hãng. Chống trầy xước, đá văng, tự phục hồi vết xước nhỏ. Bảo hành lên đến 10 năm.'
  },
  {
    id: 'wrap',
    title: 'Wrap Đổi Màu Cao Cấp',
    description: 'Thay đổi diện mạo xế cưng với hàng trăm mã màu độc đáo: Matte, Satin, Glossy hay Chrome. Sử dụng decal chính hãng Teckwrap, Avery Dennison đảm bảo không để lại keo khi bóc.',
    price: 'Liên hệ',
    category: 'tuning',
    icon: '🎨',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=800',
    seoKeywords: 'wrap đổi màu ô tô, dán decal xe hơi Hà Nội, thay đổi màu xe ô tô, wrap xe Long Biên, decal Teckwrap',
    seoDescription: 'Dịch vụ Wrap đổi màu xe hơi cao cấp với hàng trăm màu sắc độc đáo. Sử dụng decal chính hãng, không để lại keo, thi công chuyên nghiệp.'
  },
  {
    id: 'window',
    title: 'Dán Phim Cách Nhiệt 3M',
    description: 'Dòng phim Crystalline và Ceramic cao cấp giúp cản nhiệt 99%, loại bỏ tia UV gây hại, bảo vệ sức khỏe gia đình và tăng sự riêng tư tuyệt đối cho không gian bên trong.',
    price: 'Liên hệ',
    category: 'protection',
    icon: '🕶️',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800',
    seoKeywords: 'dán phim cách nhiệt 3M, phim cách nhiệt ô tô Hà Nội, dán kính chống nóng xe hơi, 3M Crystalline, phim cách nhiệt Long Biên',
    seoDescription: 'Dán phim cách nhiệt 3M Crystalline chính hãng cản nhiệt 99%, chống tia UV, bảo vệ sức khỏe và nội thất xe. Lắp đặt chuyên nghiệp tại XE ĐẸP PRO.'
  },
  {
    id: 'interior-deep-cleaning',
    title: 'Dọn Nội Thất Chuyên Sâu',
    description: 'Tháo ghế (nếu cần), hút bụi, giặt trần, sàn, làm sạch sâu từng khe kẽ bằng hơi nước nóng và dung dịch chuyên dụng. Khử mùi Ozone và dưỡng da/nhựa cao cấp.',
    price: 'Liên hệ',
    category: 'interior',
    icon: '🛋️',
    image: 'https://images.unsplash.com/photo-1595850833461-22f3f98278ae?auto=format&fit=crop&q=80&w=800',
    seoKeywords: 'dọn nội thất ô tô Hà Nội, vệ sinh nội thất xe hơi, khử mùi ô tô, giặt ghế da xe hơi, dọn nội thất Long Biên',
    seoDescription: 'Vệ sinh nội thất ô tô chuyên sâu, khử mùi Ozone, dưỡng da nhựa cao cấp. Mang lại không gian sạch sẽ, thơm tho và an toàn cho sức khỏe.'
  },
  {
    id: 'engine',
    title: 'Vệ Sinh Khoang Máy Hơi Nước',
    description: 'Làm sạch bụi bẩn, dầu mỡ bám lâu ngày bằng công nghệ hơi nước khô (Dry Steam) an toàn tuyệt đối cho hệ thống điện. Dưỡng bảo vệ các chi tiết nhựa và cao su.',
    price: 'Liên hệ',
    category: 'interior',
    icon: '⚙️',
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=800',
    seoKeywords: 'vệ sinh khoang máy ô tô, rửa máy xe hơi hơi nước nóng, làm sạch động cơ ô tô, vệ sinh khoang máy Long Biên',
    seoDescription: 'Vệ sinh khoang máy bằng công nghệ hơi nước nóng an toàn cho hệ thống điện. Loại bỏ dầu mỡ, bụi bẩn, dưỡng bảo vệ chi tiết nhựa cao su.'
  },
  {
    id: 'tuning',
    title: 'Nâng Cấp Đèn & Âm Thanh',
    description: 'Độ đèn Bi-LED, Laser tăng sáng an toàn. Nâng cấp hệ thống âm thanh với loa cánh, loa sub và DSP giúp trải nghiệm giải trí trên xe trở nên sống động hơn.',
    price: 'Liên hệ tư vấn',
    category: 'tuning',
    icon: '🔊',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800',
    seoKeywords: 'độ đèn ô tô Hà Nội, nâng cấp âm thanh xe hơi, độ loa ô tô, bi-led laser ô tô, độ âm thanh Long Biên',
    seoDescription: 'Nâng cấp hệ thống chiếu sáng Bi-LED, Laser và âm thanh xe hơi chuyên nghiệp. Trải nghiệm lái xe an toàn và giải trí đỉnh cao.'
  },
  {
    id: 'underbody',
    title: 'Phủ Gầm & Cách Âm',
    description: 'Sơn phủ gầm chống rỉ sét, oxi hóa và hạn chế đá văng. Kết hợp dán vật liệu cách âm chống ồn từ lốp và mặt đường truyền vào khoang cabin.',
    price: 'Liên hệ',
    category: 'exterior',
    icon: '🚗',
    image: 'https://images.unsplash.com/photo-1507133311040-53c26a848916?auto=format&fit=crop&q=80&w=800',
    seoKeywords: 'phủ gầm ô tô Hà Nội, cách âm chống ồn xe hơi, chống rỉ sét gầm xe, dán cách âm Long Biên',
    seoDescription: 'Phủ gầm chống rỉ sét và dán vật liệu cách âm chống ồn cao cấp. Giảm thiểu tiếng ồn từ lốp và mặt đường, bảo vệ gầm xe bền bỉ.'
  }
];

export const DEFAULT_SUBSCRIPTIONS: SubscriptionPackage[] = [
  {
    id: 'sub1',
    title: 'Sạch Bóng Quanh Năm (Basic)',
    description: 'Dành cho khách hàng bận rộn, đảm bảo xe luôn sạch sẽ mỗi tuần.',
    price: '1.200.000 VNĐ',
    durationMonths: 12,
    servicesPerMonth: [{ serviceId: 'wash', count: 4 }],
    perks: ['Ưu tiên đặt lịch', 'Tặng 1 lần vệ sinh khoang máy/năm'],
    color: '#3b82f6',
    icon: 'zap',
    interval: 'Tháng',
    features: ['4 lần rửa xe/tháng', 'Ưu tiên đặt lịch', 'Tặng 1 lần vệ sinh khoang máy/năm']
  },
  {
    id: 'sub2',
    title: 'Chăm Sóc Toàn Diện (Premium)',
    description: 'Gói chăm sóc cao cấp bao gồm cả bảo dưỡng Ceramic định kỳ.',
    price: '3.500.000 VNĐ',
    durationMonths: 12,
    servicesPerMonth: [
      { serviceId: 'wash', count: 4 },
      { serviceId: 'ceramic', count: 0.2 } // 2 lần/năm
    ],
    perks: ['Giảm 15% tất cả dịch vụ phát sinh', 'Cố vấn kỹ thuật riêng', 'Tặng 2 lần vệ sinh nội thất/năm'],
    color: '#8b5cf6',
    icon: 'crown',
    interval: 'Tháng',
    features: ['4 lần rửa xe/tháng', 'Bảo dưỡng Ceramic định kỳ', 'Giảm 15% tất cả dịch vụ phát sinh', 'Cố vấn kỹ thuật riêng']
  }
];

export const DEFAULT_SITE_CONFIG: SiteConfig = {
  siteName: "XE ĐẸP PRO",
  heroTitle: "XE ĐẸP PRO",
  heroSubtitle: "Trung Tâm Chăm Sóc Xe Chuyên Nghiệp",
  heroDescription: "Khám phá đỉnh cao nghệ thuật chăm sóc xe với công nghệ Detailing chuẩn quốc tế. Chuyên sâu Phủ Ceramic Diamond 9H, Dán PPF tự phục hồi và các giải pháp bảo vệ toàn diện, mang lại vẻ đẹp vĩnh cửu cho xế yêu của bạn.",
  heroImage: "https://images.unsplash.com/photo-1603584173870-7f394833ec96?auto=format&fit=crop&q=80&w=2069",
  heroVideoUrl: "https://assets.mixkit.co/videos/preview/mixkit-man-washing-a-car-with-a-sponge-1587-large.mp4",
  featureBefore: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&q=80&w=1200",
  featureAfter: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=1200",
  servicesTitle: "DỊCH VỤ DETAILING CHUYÊN NGHIỆP",
  servicesSubtitle: "Lựa chọn giải pháp chăm sóc xe tối ưu và nhận tư vấn trực tiếp từ chuyên gia XE ĐẸP PRO.",
  premiumTitle: "GIẢI PHÁP DETAILING CAO CẤP",
  premiumSubtitle: "Những giải pháp chăm sóc xe chuyên sâu, mang lại sự hoàn mỹ tuyệt đối cho xế cưng của bạn.",
  aiTitle: "CỐ VẤN XE ĐẸP PRO AI",
  aiSubtitle: "Tư vấn kỹ thuật 24/7. Hỏi bất cứ điều gì về bảo dưỡng xe, AI của XE ĐẸP PRO sẽ trả lời ngay lập tức.",
  aiVideoUrl: "https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-human-head-with-glowing-circuits-42610-large.mp4",
  windowTintingTitle: "DÁN PHIM CÁCH NHIỆT 3M",
  windowTintingSubtitle: "Chuyên Gia Cách Nhiệt",
  windowTintingDescription: "Bảo vệ sức khỏe gia đình và nội thất xế cưng với công nghệ phim Ceramic & Nano-Carbon cao cấp. Cản 99% tia UV, giảm nhiệt tức thì và tăng sự riêng tư tuyệt đối.",
  galleryTitle: "THƯ VIỆN HÌNH ÁNH",
  gallerySubtitle: "Kết quả thực tế từ XE ĐẸP PRO",
  aiAssessmentTitle: "GIÁM ĐỊNH XE AI",
  aiAssessmentSubtitle: "Công nghệ phân tích bề mặt hiện đại",
  aiAssessmentDescription: "Chụp ảnh bề mặt sơn xe để AI của XE ĐẸP PRO tự động phân tích tình trạng và đề xuất gói dịch vụ chăm sóc tối ưu nhất cho bạn.",
  reviewsTitle: "ĐÁNH GIÁ TỪ KHÁCH HÀNG",
  reviewsSubtitle: "Sự hài lòng của khách hàng là ưu tiên hàng đầu tại XE ĐẸP PRO.",
  newsTitle: "TIN TỨC & MẸO CHĂM SÓC XE",
  newsSubtitle: "Cập nhật những kiến thức bổ ích và chương trình mới nhất từ XE ĐẸP PRO.",
  promotionsTitle: "CHƯƠNG TRÌNH ƯU ĐÃI",
  promotionsSubtitle: "Khám phá các gói khuyến mãi hấp dẫn nhất trong tháng này.",
  contactTitle: "BẠN CẦN TƯ VẤN CHUYÊN SÂU?",
  contactSubtitle: "Để lại thông tin, đội ngũ chuyên gia của chúng tôi sẽ liên hệ lại với bạn trong vòng 30 phút để giải đáp mọi thắc mắc về dịch vụ.",
  contactAddress: "E28 Khu Đồng Dưa, Hà Cầu, Hà Đông, Hà Nội",
  contactPhone: "0588896699",
  contactEmail: "carwash68.vn@gmail.com",
  contactHours: "08:00 - 18:00 (T2-CN)",
  mapTitle: "VỊ TRÍ CỬA HÀNG",
  mapSubtitle: "Ghé thăm XE ĐẸP PRO để trải nghiệm dịch vụ chăm sóc xe đẳng cấp nhất.",
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.684177264858!2d105.7794351!3d20.9652234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313453244731367b%3A0x2711d6c0db0f385d!2zWEUgxJDhuqBQIFBSTywgS2h1IMSQ4buTbmcgRMawYS9FMjggUC4gSMOgIEPhuqd1LCBQaMaw4budbmcsIEjDoCDEkMO0bmcsIEjDoCBO4buZaSwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1710587654321!5m2!1svi!2s",
  themeColor: "#3b82f6",
  secondaryColor: "#10b981",
  wrapPPFTitle: "WRAP ĐỔI MÀU & DÁN PPF",
  wrapPPFSubtitle: "Bảo Vệ & Nâng Tầm Đẳng Cấp",
  wrapPPFDescription: "Thay đổi diện mạo xế cưng với hàng trăm màu sắc Wrap độc đáo hoặc bảo vệ lớp sơn nguyên bản tuyệt đối bằng phim PPF (Paint Protection Film) tự phục hồi vết xước. Giải pháp tối ưu để giữ gìn giá trị và vẻ đẹp bền vững.",
  tuningTitle: "ĐỘ XE CHUYÊN NGHIỆP",
  tuningSubtitle: "Nâng Tầm Hiệu Năng & Thẩm Mỹ",
  tuningDescription: "Từ nâng cấp ánh sáng, âm thanh đến độ bodykit và mâm lốp. XE ĐẸP PRO mang đến những giải pháp độ xe cá nhân hóa, giúp xế cưng của bạn trở nên khác biệt và mạnh mẽ hơn bao giờ hết.",
  copyright: "XE ĐẸP PRO © 2024",
  processTitle: "QUY TRÌNH CHĂM SÓC XE",
  processSubtitle: "Tiêu chuẩn chuyên nghiệp",
  transformations: [
    { 
      id: 't-1', 
      before: "https://images.unsplash.com/photo-1507136566006-bbc5058132c8?q=80&w=1000&auto=format&fit=crop", 
      after: "https://images.unsplash.com/photo-1603584173870-7f3ca99a4741?q=80&w=1000&auto=format&fit=crop",
      label: "Hiệu ứng Ceramic Pro",
      date: '2024-06-15'
    },
    { 
      id: 't-2', 
      before: "https://images.unsplash.com/photo-1599256621730-535171e28e50?q=80&w=1000&auto=format&fit=crop", 
      after: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?q=80&w=1000&auto=format&fit=crop",
      label: "Vệ sinh khoang máy chuyên sâu",
      date: '2024-06-15'
    }
  ],
  expertsTitle: "ĐỘI NGŨ CHUYÊN GIA",
  expertsSubtitle: "Những bậc thầy Detailing",
  whyChooseUsTitle: "SỰ KHÁC BIỆT TẠI XE ĐẸP PRO",
  whyChooseUsSubtitle: "Tại sao chọn chúng tôi?",
  faqTitle: "CÂU HỎI THƯỜNG GẶP",
  faqSubtitle: "Giải đáp thắc mắc",
  aiAdvisorTitle: "CỐ VẤN XE ĐẸP PRO AI",
  aiAdvisorSubtitle: "Tư vấn kỹ thuật 24/7",
  aiAdvisorWelcome: "Chào bạn! Tôi là **XE ĐẸP PRO AI Advisor**. Rất vui được hỗ trợ bạn.\n\nTôi có thể giúp bạn:\n- Tư vấn các gói **Ceramic & PPF**.\n- Hướng dẫn chăm sóc xe tại nhà.\n- Giải đáp thắc mắc về kỹ thuật detailing.\n- Cung cấp thông tin về các dịch vụ tại cửa hàng.\n\nBạn đang quan tâm đến vấn đề gì cho xế yêu của mình?",
  aiSystemPrompt: "Bạn là chuyên gia cố vấn dịch vụ tại XE ĐẸP PRO - trung tâm chăm sóc xe Detailing hàng đầu. Hãy trả lời thân thiện, chuyên nghiệp. Tập trung vào việc tư vấn các dịch vụ như Ceramic, PPF, dán phim cách nhiệt 3M, và vệ sinh xe cao cấp. Nếu khách hỏi về giá, hãy đề cập rằng giá có thể thay đổi tùy dòng xe và đề xuất khách đặt lịch để được kỹ thuật viên kiểm tra trực tiếp.",
  accountingLockPassword: import.meta.env.VITE_ACCOUNTING_LOCK_PASSWORD || "132416118",
  designPassword: import.meta.env.VITE_DESIGN_PASSWORD || "025099010538",
  inspectionPassword: "789",
  enableAccountingLock: true,
  enableDesignLock: true,
  enableInspectionLock: true,
  accountingLockSettings: {
    home: false,
    appointments: false,
    customers: false,
    inventory: false,
    loyalty: false,
    staff: true,
    reminders: false,
    inspections: false,
    automation: false,
    ecerts: false,
    tracking: false,
    feedback: false,
    maintenance: false,
    reports: true,
    expenses: true,
    security: true,
    accounting: true,
  },
  designLockSettings: {
    services: false,
    packages: false,
    premium: false,
    promotions: false,
    news: false,
    gallery: false,
    'ui-design': true,
    'ai-creative': true,
    config: true,
  },
  logoUrl: "",
  aboutImage: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&q=80&w=1200",
  weatherCareImage: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=1200",
  faqImage: "https://images.unsplash.com/photo-1601362840469-51e4d8d59085?auto=format&fit=crop&q=80&w=1200",
  ppfImage: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&q=80&w=1200",
  facebookUrl: "https://facebook.com",
  youtubeUrl: "https://youtube.com",
  instagramUrl: "https://instagram.com",
  zaloNumber: "0588896699",
  momoInfo: {
    phone: "0588896699",
    name: "Đỗ Xuân Thắng"
  },
  staff: [
    { id: 'staff-1', name: 'Trần Văn Kỹ', phone: '0911222333', role: 'technician', commissionRate: 10, status: 'active', joinedDate: '2023-01-15' },
    { id: 'staff-2', name: 'Lê Văn Thuật', phone: '0944555666', role: 'technician', commissionRate: 10, status: 'active', joinedDate: '2023-03-20' },
  ],
  inspections: [],
  reminders: [
    { id: 'rem-1', customerId: 'rec-1', customerName: 'Nguyễn Văn Anh', phone: '0912345678', serviceName: 'Phủ Ceramic', lastServiceDate: '2023-09-15', nextServiceDate: '2024-03-15', status: 'pending' }
  ],
  promotions: [
    {
      id: 'promo-1',
      title: 'Giảm 20% Phủ Ceramic',
      description: 'Chào hè rực rỡ, XE ĐẸP PRO giảm ngay 20% cho tất cả các gói phủ Ceramic 9H cao cấp.',
      image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=800',
      expiryDate: '2024-06-30'
    },
    {
      id: 'promo-2',
      title: 'Tặng Vệ Sinh Khoang Máy',
      description: 'Khi sử dụng dịch vụ Detailing nội thất, quý khách sẽ được tặng kèm gói vệ sinh khoang máy bằng hơi nước nóng.',
      image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=800',
      expiryDate: '2024-05-15'
    },
    {
      id: 'promo-3',
      title: 'Combo Tiết Kiệm 500K',
      description: 'Khi đặt lịch Gói Đánh Bóng sơn + Vệ sinh nội thất chuyên sâu, bạn sẽ nhận ngay ưu đãi giảm 500.000 VNĐ.',
      image: 'https://images.unsplash.com/photo-1516579225093-128c0257a48a?auto=format&fit=crop&q=80&w=800',
      expiryDate: '2026-03-31'
    },
    {
      id: 'promo-4',
      title: 'Combo Mưa Rơi - Xe Sáng Ngời',
      description: 'Giảm ngay 30% cho dịch vụ Tẩy Ố Kính & Phủ Nano Kính khi sử dụng dịch vụ Rửa Xe Detailing. Đảm bảo tầm nhìn an toàn tuyệt đối.',
      image: 'https://images.unsplash.com/photo-1556740734-7f9a2b7a0f42?auto=format&fit=crop&q=80&w=800',
      expiryDate: '2026-05-31'
    }
  ],
  appointments: [
    {
      id: 'app-1',
      customerName: 'Nguyễn Văn Anh',
      phone: '0912345678',
      carModel: 'Toyota Camry 2023',
      serviceId: 'ceramic',
      date: '2024-06-15',
      time: '09:00',
      status: 'pending',
      createdAt: '2024-06-10'
    },
    {
      id: 'app-2',
      customerName: 'Trần Thị Bình',
      phone: '0988888888',
      carModel: 'Mercedes E300',
      serviceId: 'wash',
      date: '2024-06-16',
      time: '14:30',
      status: 'confirmed',
      createdAt: '2024-06-11'
    }
  ],
  packages: [
    {
      id: 'pkg-1',
      title: 'Gói Chăm Sóc Toàn Diện (Luxury)',
      description: 'Gói dịch vụ cao cấp nhất bao gồm hiệu chỉnh sơn, phủ ceramic 9H, vệ sinh nội thất chuyên sâu và khoang máy.',
      price: '15.000.000 VNĐ',
      duration: '2 ngày',
      features: ['Hiệu chỉnh sơn 3 bước', 'Phủ Ceramic 9H (2 lớp)', 'Vệ sinh nội thất hơi nước nóng', 'Vệ sinh khoang máy Dry Steam'],
      isPopular: true
    },
    {
      id: 'pkg-2',
      title: 'Gói Bảo Vệ Cơ Bản (Standard)',
      description: 'Gói bảo vệ sơn và làm sạch nội thất cơ bản cho xe mới.',
      price: '5.000.000 VNĐ',
      duration: '1 ngày',
      features: ['Đánh bóng tăng bóng', 'Phủ Ceramic Lite (1 lớp)', 'Vệ sinh nội thất cơ bản'],
      isPopular: false
    },
    {
      id: 'pkg-3',
      title: 'Gói Premium Detailing',
      description: 'Trọn gói chăm sóc xe cao cấp nhất, bao gồm hiệu chỉnh sơn, phủ ceramic, vệ sinh nội thất và xử lý da bằng công nghệ nano.',
      price: '25.000.000 VNĐ',
      duration: '3 ngày',
      features: [
        'Xử lý sơn 5 bước',
        'Phủ Ceramic Graphene',
        'Vệ sinh nội thất chi tiết bằng hơi nước',
        'Khử mùi và diệt khuẩn Nano Bạc',
        'Kiểm tra động cơ miễn phí'
      ],
      isPopular: true,
      category: 'core_feature'
    }
  ],
  loyaltyConfig: {
    pointsPer100k: 10,
    pointValue: 1000,
    tiers: [
      { id: 'bronze', name: 'Bronze', tier: 'bronze', minPoints: 0, multiplier: 1.0, color: '#CD7F32', perks: ['Tích điểm cơ bản', 'Thông báo bảo dưỡng'] },
      { id: 'silver', name: 'Silver', tier: 'silver', minPoints: 500, multiplier: 1.1, color: '#C0C0C0', perks: ['Tích điểm x1.1', 'Ưu tiên đặt lịch', 'Giảm 5% dịch vụ rửa xe'] },
      { id: 'gold', name: 'Gold', tier: 'gold', minPoints: 2000, multiplier: 1.3, color: '#FFD700', perks: ['Tích điểm x1.3', 'Phòng chờ VIP', 'Giảm 10% tất cả dịch vụ', 'Quà tặng sinh nhật'] },
      { id: 'diamond', name: 'Diamond', tier: 'diamond', minPoints: 5000, multiplier: 1.5, color: '#B9F2FF', perks: ['Tích điểm x1.5', 'Xe thay thế khi bảo dưỡng lâu', 'Giảm 20% tất cả dịch vụ', 'Miễn phí rửa xe định kỳ'] },
    ]
  },
  expenses: [],
  services: SERVICES,
  automation: {
    enableMaintenanceReminder: true,
    enableBirthdayGreeting: true,
    enableServiceCompletion: true,
    maintenanceReminderDays: 7,
    birthdayDiscount: 15,
    channel: 'zalo'
  },
  subscriptions: DEFAULT_SUBSCRIPTIONS,
  experts: [
    { id: 'exp-1', name: 'Nguyễn Tuấn Anh', role: 'Master Detailer', exp: '10+ Năm', cert: 'IDA Certified', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800' },
    { id: 'exp-2', name: 'Trần Minh Đức', role: 'Ceramic Specialist', exp: '7 Năm', cert: 'Gtechniq Accredited', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800' },
    { id: 'exp-3', name: 'Lê Quốc Huy', role: 'Interior Expert', exp: '5 Năm', cert: 'Leather Repair Pro', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800' },
  ],
  vipPrograms: [],
  seoKeywords: 'detailing chuyên nghiệp, phủ ceramic diamond 9H, dán PPF Hà Nội, AI Detailing Advisor, tư vấn chăm sóc xe AI, bảo vệ xe theo thời tiết, xe đẹp pro, chăm sóc xe hơi cao cấp Long Biên, đánh bóng ô tô Hà Nội, vệ sinh nội thất ô tô, dán phim cách nhiệt 3M, bảo vệ sơn xe, detailing uy tín hà nội, xe dep pro long bien, chăm sóc xe hơi hà nội, phủ ceramic ô tô, dán ppf ô tô hà nội, wrap đổi màu xe hơi, vệ sinh khoang máy ô tô, đánh bóng kính ô tô, cách âm chống ồn ô tô, phục hồi mâm xe AI',
  seoDescription: 'XE ĐẸP PRO - Hệ thống Detailing 4.0 hàng đầu Hà Nội. Tích hợp công nghệ AI cố vấn dịch vụ, WeatherGuard Advisor bảo vệ xe theo mùa. Chuyên sâu Phủ Ceramic, Dán PPF, Wrap đổi màu. Kỹ thuật viên Master Detailer, trang thiết bị hiện đại tại Long Biên. Nâng tầm đẳng cấp xế yêu của bạn.',
  googleVerificationCode: 'qf8156WuX4TgFxq_CV1cG3fZsBMEilbxB9LEwe2_oC4',
  proposals: [],
  wrapProjects: [
    { id: 'wp-1', title: 'Porsche 911 - Satin Dark Basalt', img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800', color: 'Satin Dark Basalt' },
    { id: 'wp-2', title: 'BMW M4 - Gloss Nardo Gray', img: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=800', color: 'Gloss Nardo Gray' },
    { id: 'wp-3', title: 'Mercedes AMG - Matte Deep Black', img: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=800', color: 'Matte Deep Black' },
    { id: 'wp-4', title: 'Audi RS6 - Gloss Miami Blue', img: 'https://images.unsplash.com/photo-1603584173870-7f3ca99a4741?auto=format&fit=crop&q=80&w=800', color: 'Gloss Miami Blue' },
  ],
  tintProjects: [],
  tuningProjects: [],
};

export const DECAL_COLORS: DecalColor[] = [
  // Gloss
  { id: 'g1', name: 'Gloss Carmine Red', hex: '#b20000', category: 'Gloss', finish: 'Bóng', code: 'G01' },
  { id: 'g2', name: 'Gloss Nardo Gray', hex: '#8a8d8f', category: 'Gloss', finish: 'Bóng', code: 'G02' },
  { id: 'g3', name: 'Gloss Miami Blue', hex: '#00a8cc', category: 'Gloss', finish: 'Bóng', code: 'G03' },
  { id: 'g4', name: 'Gloss Black Metallic', hex: '#1a1a1a', category: 'Gloss', finish: 'Bóng Kim Loại', code: 'G04' },
  { id: 'g5', name: 'Gloss Sunflower Yellow', hex: '#ffc107', category: 'Gloss', finish: 'Bóng', code: 'G05' },
  
  // Matte
  { id: 'm1', name: 'Matte Military Green', hex: '#4b5320', category: 'Matte', finish: 'Nhám', code: 'M01' },
  { id: 'm2', name: 'Matte Deep Black', hex: '#0a0a0a', category: 'Matte', finish: 'Nhám', code: 'M02' },
  { id: 'm3', name: 'Matte Charcoal Gray', hex: '#333333', category: 'Matte', finish: 'Nhám', code: 'M03' },
  { id: 'm4', name: 'Matte Frozen Blue', hex: '#2b4f6e', category: 'Matte', finish: 'Nhám', code: 'M04' },
  
  // Satin
  { id: 's1', name: 'Satin Dark Basalt', hex: '#2c3e50', category: 'Satin', finish: 'Mờ (Satin)', code: 'S01' },
  { id: 's2', name: 'Satin Rose Gold', hex: '#b76e79', category: 'Satin', finish: 'Mờ (Satin)', code: 'S02' },
  { id: 's3', name: 'Satin Pearl White', hex: '#f0f0f0', category: 'Satin', finish: 'Mờ Ngọc Trai', code: 'S03' },
  { id: 's4', name: 'Satin Electric Blue', hex: '#1e90ff', category: 'Satin', finish: 'Mờ (Satin)', code: 'S04' },
  
  // Color Shift
  { id: 'cs1', name: 'Purple Blue Shift', hex: 'linear-gradient(45deg, #4b0082, #0000ff)', category: 'ColorShift', finish: 'Đổi màu', code: 'CS01' },
  { id: 'cs2', name: 'Gold Silver Shift', hex: 'linear-gradient(45deg, #ffd700, #c0c0c0)', category: 'ColorShift', finish: 'Đổi màu', code: 'CS02' },
  { id: 'cs3', name: 'Emerald Blue Shift', hex: 'linear-gradient(45deg, #50c878, #4169e1)', category: 'ColorShift', finish: 'Đổi màu', code: 'CS03' },

  // Chrome
  { id: 'ch1', name: 'Mirror Chrome Silver', hex: '#e0e0e0', category: 'Chrome', finish: 'Tráng gương', code: 'CH01' },
  { id: 'ch2', name: 'Chrome Rose Gold', hex: '#e8a0a8', category: 'Chrome', finish: 'Tráng gương', code: 'CH02' },
];

export const DEFAULT_INVENTORY: InventoryItem[] = [
  { id: 'inv-1', name: 'Dung dịch Ceramic 9H', category: 'Chemicals', quantity: 15, unit: 'chai', minThreshold: 5, lastRestocked: '2024-03-01', pricePerUnit: 500000 },
  { id: 'inv-2', name: 'Xi đánh bóng bước 1', category: 'Chemicals', quantity: 8, unit: 'lít', minThreshold: 3, lastRestocked: '2024-03-05', pricePerUnit: 1200000 },
  { id: 'inv-3', name: 'Khăn Microfiber', category: 'Tools', quantity: 100, unit: 'cái', minThreshold: 20, lastRestocked: '2024-03-10', pricePerUnit: 25000 },
  { id: 'inv-4', name: 'Dung dịch rửa xe chuyên dụng', category: 'Chemicals', quantity: 20, unit: 'can 5L', minThreshold: 5, lastRestocked: '2024-03-12', pricePerUnit: 850000 },
];

export const DEFAULT_E_CERTIFICATES: ECertificate[] = [
  {
    id: 'cert-1',
    customerName: 'Nguyễn Văn Anh',
    licensePlate: '30A-123.45',
    carModel: 'Toyota Camry 2023',
    serviceType: 'Phủ Ceramic Diamond 9H',
    issueDate: '2024-03-15',
    expiryDate: '2026-03-15',
    technician: 'Trần Văn Kỹ',
    qrCode: 'https://xedepauto.vn/verify/CERT-2024-001',
    status: 'active'
  }
];

export const DEFAULT_PREMIUM_SOLUTIONS = [
  {
    id: 'premium1',
    title: 'Phục Hồi Độ Bóng Showroom',
    description: 'Giải pháp toàn diện để loại bỏ các khuyết tật sơn và phục hồi độ bóng sâu như xe vừa xuất xưởng.',
    beforeImage: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&q=80&w=800',
    afterImage: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=800',
    process: [
      'Rửa xe chi tiết và tẩy bụi sắt, nhựa đường.',
      'Hiệu chỉnh sơn 3 giai đoạn để loại bỏ vết xước xoáy.',
      'Đánh bóng hoàn thiện tăng độ sâu màu sơn.',
      'Phủ lớp bảo vệ Nano Ceramic 9H.'
    ],
    benefits: [
      'Loại bỏ 95% khuyết tật bề mặt sơn.',
      'Tăng độ bóng và độ phản chiếu của xe.',
      'Bảo vệ sơn khỏi tác động của môi trường.',
      'Dễ dàng vệ sinh và bảo dưỡng sau này.'
    ]
  },
  {
    id: 'premium2',
    title: 'Tái Tạo Không Gian Nội Thất Luxury',
    description: 'Quy trình làm sạch và dưỡng sâu từng chi tiết nhỏ nhất trong khoang cabin, mang lại cảm giác sang trọng và sạch sẽ tuyệt đối.',
    beforeImage: 'https://images.unsplash.com/photo-1605515298946-d062f2e9da53?auto=format&fit=crop&q=80&w=800',
    afterImage: 'https://images.unsplash.com/photo-1562619371-b67725b6fde2?auto=format&fit=crop&q=80&w=800',
    process: [
      'Hút bụi và làm sạch sâu bằng hơi nước nóng.',
      'Giặt ghế da/nỉ bằng dung dịch chuyên dụng pH trung tính.',
      'Vệ sinh trần xe, sàn xe và các khe kẽ nhỏ.',
      'Dưỡng nhựa, da bằng tinh chất phục hồi cao cấp.',
      'Khử trùng Ozone và diệt khuẩn toàn diện.'
    ],
    benefits: [
      'Loại bỏ hoàn toàn mùi hôi và vi khuẩn.',
      'Phục hồi độ mềm mại và màu sắc của da.',
      'Bảo vệ các chi tiết nhựa khỏi bị giòn gãy.',
      'Mang lại không gian trong lành, an toàn cho sức khỏe.'
    ]
  },
  {
    id: 'premium4',
    title: 'Giải Pháp Cách Nhiệt Toàn Diện 3M/Ceramic',
    description: 'Bảo vệ sức khỏe và nội thất xe với công nghệ phim cách nhiệt tiên tiến nhất, cản 99% tia UV và 97% tia hồng ngoại.',
    beforeImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800',
    afterImage: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=800',
    process: [
      'Vệ sinh kính chuyên sâu bằng dung dịch chuyên dụng.',
      'Cắt phim chính xác theo kích thước kính từng dòng xe.',
      'Thi công dán phim trong phòng kín không bụi.',
      'Kiểm tra độ truyền sáng và khả năng cách nhiệt sau khi dán.'
    ],
    benefits: [
      'Cản 99% tia cực tím (UV) gây hại da.',
      'Giảm nhiệt độ trong xe lên đến 10-15 độ C.',
      'Bảo vệ nội thất khỏi bị bạc màu, bong tróc.',
      'Tăng sự riêng tư và an toàn khi kính vỡ.'
    ]
  },
  {
    id: 'premium3',
    title: 'Bảo Vệ Sơn Toàn Diện Với PPF',
    description: 'Giải pháp bảo vệ sơn xe tối ưu nhất hiện nay với lớp phim PPF (Paint Protection Film) tự phục hồi vết xước và chống đá văng.',
    beforeImage: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=800',
    afterImage: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=800',
    process: [
      'Vệ sinh bề mặt sơn và tẩy sạch các tạp chất.',
      'Cắt phim PPF bằng máy CNC theo form xe chính xác.',
      'Thi công dán phim bằng kỹ thuật dán ướt chuyên nghiệp.',
      'Kiểm tra và sấy hoàn thiện các mép phim.'
    ],
    benefits: [
      'Chống trầy xước và đá văng tuyệt đối.',
      'Phim có khả năng tự phục hồi các vết xước nhỏ.',
      'Giữ màu sơn nguyên bản luôn như mới.',
      'Tăng độ bóng và giá trị bán lại của xe.'
    ]
  },
  {
    id: 'premium5',
    title: 'Phục Hồi & Bảo Vệ Đèn Pha Nano',
    description: 'Giải pháp phục hồi độ trong suốt cho đèn pha bị mờ đục, ố vàng và phủ lớp bảo vệ Nano chuyên dụng chống tia UV.',
    beforeImage: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=800',
    afterImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800',
    process: [
      'Vệ sinh bề mặt đèn và che chắn các chi tiết xung quanh.',
      'Xử lý mờ đục bằng nhám nước chuyên dụng từ thô đến mịn.',
      'Đánh bóng phục hồi độ trong suốt bằng xi chuyên dụng.',
      'Phủ lớp Nano bảo vệ chống tia UV và ố vàng trở lại.'
    ],
    benefits: [
      'Tăng cường khả năng chiếu sáng an toàn khi đi đêm.',
      'Khôi phục vẻ đẹp thẩm mỹ như mới cho đầu xe.',
      'Bảo vệ bề mặt nhựa đèn khỏi tác động của môi trường.',
      'Tiết kiệm chi phí so với việc thay cụm đèn mới.'
    ]
  },
  {
    id: 'premium6',
    title: 'Vệ Sinh Khoang Máy & Phủ Dưỡng Premium',
    description: 'Dịch vụ làm sạch sâu các vết bẩn, dầu mỡ bám lâu ngày trong khoang động cơ bằng công nghệ hơi nước nóng và hóa chất chuyên dụng.',
    beforeImage: 'https://images.unsplash.com/photo-1486006920555-c77dcf18193c?auto=format&fit=crop&q=80&w=800',
    afterImage: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=800',
    process: [
      'Lắp đặt các thiết bị che chắn hệ thống điện và họng hút gió.',
      'Làm sạch khoang máy bằng dung dịch Degreaser và hơi nước nóng.',
      'Xử lý chi tiết các góc khuất bằng cọ chuyên dụng.',
      'Sấy khô và phủ lớp dưỡng bảo vệ bề mặt nhựa, cao su.'
    ],
    benefits: [
      'Cải thiện hiệu suất tản nhiệt của động cơ.',
      'Hạn chế tình trạng chuột bọ xâm nhập cắn phá dây điện.',
      'Giúp dễ dàng phát hiện các lỗi rò rỉ dung dịch.',
      'Duy trì độ mới và giá trị của xe theo thời gian.'
    ]
  }
];

export const DEFAULT_CUSTOMER_RECORDS: CustomerRecord[] = [
  {
    id: 'rec-1',
    customerName: 'Nguyễn Văn Anh',
    phone: '0912345678',
    licensePlate: '30A-123.45',
    carModel: 'Toyota Camry 2023',
    servicesDone: ['Rửa xe chi tiết', 'Dán phim cách nhiệt'],
    serviceReviews: [
      { serviceName: 'Rửa xe chi tiết', rating: 5, comment: 'Sạch sẽ từng kẽ nhỏ.' },
      { serviceName: 'Dán phim cách nhiệt', rating: 5, comment: 'Phim dán rất đẹp, không bọt khí.' }
    ],
    date: '2024-03-15',
    totalPrice: '5.500.000 VNĐ',
    paymentStatus: 'paid',
    notes: 'Dịch vụ rất tốt, nhân viên nhiệt tình. Phim cách nhiệt dán rất đẹp và mát.',
    rating: 5,
    beforeAfterImages: [
      {
        id: 'ba-1',
        serviceName: 'Phủ Ceramic Diamond 9H',
        label: 'Phủ Ceramic Diamond 9H',
        date: '2024-03-15',
        before: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&q=80&w=800',
        after: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=800'
      }
    ]
  },
  {
    id: 'rec-2',
    customerName: 'Trần Thị Bình',
    phone: '0988888888',
    licensePlate: '29H-999.99',
    carModel: 'Mercedes E300',
    servicesDone: ['Phủ Ceramic Cao Cấp', 'Vệ sinh nội thất'],
    date: '2024-04-10',
    totalPrice: '12.000.000 VNĐ',
    paymentStatus: 'paid',
    notes: 'Xe sau khi phủ Ceramic bóng loáng, nội thất sạch sẽ thơm tho. Rất hài lòng!',
    rating: 5
  },
  {
    id: 'rec-3',
    customerName: 'Lê Hoàng Minh',
    phone: '0901234567',
    licensePlate: '51G-888.88',
    carModel: 'Porsche Panamera',
    servicesDone: ['Dán PPF Full Xe', 'Phủ Ceramic Nội Thất'],
    date: '2024-05-20',
    totalPrice: '85.000.000 VNĐ',
    paymentStatus: 'pending',
    notes: 'Dịch vụ cực kỳ chuyên nghiệp, xe bóng loáng như mới. Đội ngũ kỹ thuật tay nghề cao.',
    rating: 5
  }
];

export const DEFAULT_EXPENSES: Expense[] = [
  { id: 'exp-1', title: 'Tiền thuê mặt bằng tháng 3', amount: 25000000, category: 'rent', date: '2024-03-01' },
  { id: 'exp-2', title: 'Lương nhân viên tháng 3', amount: 45000000, category: 'salary', date: '2024-03-05' },
  { id: 'exp-3', title: 'Tiền điện nước tháng 3', amount: 3500000, category: 'utility', date: '2024-03-10' },
];


export const DEFAULT_GALLERY: GalleryImage[] = [
  { id: 'gal-1', url: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=800', category: 'Luxury', title: 'Phủ Ceramic Porsche' },
  { id: 'gal-2', url: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&q=80&w=800', category: 'Sedan', title: 'Rửa xe chi tiết BMW' },
  { id: 'gal-3', url: 'https://images.unsplash.com/photo-1599256621730-535171e28e50?auto=format&fit=crop&q=80&w=800', category: 'SUV', title: 'Vệ sinh nội thất Mercedes' },
  { id: 'gal-4', url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800', category: 'Sport', title: 'Dán phim cách nhiệt 3M' },
  { id: 'gal-5', url: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&q=80&w=800', category: 'Sedan', title: 'Hiệu chỉnh sơn Audi' },
  { id: 'gal-6', url: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=800', category: 'SUV', title: 'Vệ sinh khoang máy' },
  { id: 'gal-7', url: 'https://images.unsplash.com/photo-1507133311040-53c26a848916?auto=format&fit=crop&q=80&w=800', category: 'Luxury', title: 'Ceramic 9H Luxury' },
  { id: 'gal-8', url: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=800', category: 'Sport', title: 'Dán phim Nano Ceramic' },
];

export const DEFAULT_REVIEWS: Review[] = [
  { 
    id: 'rev-1', 
    author: 'Anh Hoàng', 
    text: 'Dịch vụ rất chuyên nghiệp. Xe của mình sau khi phủ Ceramic trông như mới mua từ hãng về. Cảm ơn đội ngũ XE ĐẸP PRO.', 
    rating: 5, 
    serviceId: 'ceramic',
    customerImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    carModel: 'Mercedes-Benz S450'
  },
  { 
    id: 'rev-2', 
    author: 'Chị Lan', 
    text: 'Nhân viên nhiệt tình, tư vấn kỹ lưỡng. Vệ sinh nội thất rất sạch, mùi thơm dễ chịu và không còn bụi bẩn trong kẽ ghế.', 
    rating: 5, 
    serviceId: 'interior-detailing',
    customerImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    carModel: 'BMW X5'
  },
  { 
    id: 'rev-3', 
    author: 'Anh Tuấn', 
    text: 'Giá cả hợp lý so với chất lượng nhận được. Đánh bóng sơn làm xe bóng loáng vượt mong đợi.', 
    rating: 4, 
    serviceId: 'polish',
    customerImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    carModel: 'Toyota Camry'
  },
  { 
    id: 'rev-4', 
    author: 'Anh Minh', 
    text: 'Rửa xe rất kỹ, các kẽ nhỏ đều sạch bong.', 
    rating: 5, 
    serviceId: 'wash',
    customerImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
    carModel: 'Mazda CX-5'
  },
];

export const DEFAULT_NEWS: NewsArticle[] = [
  {
    id: 'news1',
    title: '5 Mẹo Giữ Lớp Sơn Xe Luôn Bóng Như Mới',
    slug: '5-meo-giu-lop-son-xe-luon-bong-nhu-moi',
    excerpt: 'Lớp sơn xe là bộ phận dễ bị tổn thương nhất bởi các tác động từ môi trường. Hãy cùng XE ĐẸP PRO tìm hiểu cách bảo vệ nó.',
    content: 'Nội dung chi tiết về các mẹo chăm sóc sơn xe...',
    image: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&q=80&w=800',
    date: '2024-03-10',
    category: 'tip',
    author: 'Admin',
    metaKeywords: 'chăm sóc sơn xe, giữ bóng sơn xe, mẹo bảo vệ xe, XE ĐẸP PRO, detailing xe hơi',
    metaDescription: 'Khám phá 5 bí quyết từ chuyên gia XE ĐẸP PRO giúp lớp sơn xe của bạn luôn bền màu, bóng loáng và chống lại các tác nhân gây hại từ môi trường.'
  },
  {
    id: 'news2',
    title: 'Khai Trương Cơ Sở Mới Tại Long Biên',
    slug: 'khai-truong-co-so-moi-tai-long-bien',
    excerpt: 'XE ĐẸP PRO chính thức khai trương cơ sở mới với quy mô hiện đại hơn, phục vụ quý khách hàng tốt hơn.',
    content: 'Nội dung chi tiết về sự kiện khai trương...',
    image: 'https://images.unsplash.com/photo-1562141961-b5d185666062?auto=format&fit=crop&q=80&w=800',
    date: '2024-03-05',
    category: 'news',
    author: 'Admin',
    metaKeywords: 'khai trương XE ĐẸP PRO, trung tâm chăm sóc xe Long Biên, detailing Long Biên, rửa xe cao cấp Long Biên',
    metaDescription: 'XE ĐẸP PRO tưng bừng khai trương cơ sở mới tại Long Biên với trang thiết bị hiện đại và nhiều ưu đãi hấp dẫn cho khách hàng trong tuần lễ khai trương.'
  },
  {
    id: 'news3',
    title: 'Ưu Đãi Đặc Biệt: Phủ Ceramic Tặng Vệ Sinh Nội Thất',
    slug: 'uu-dai-dac-biet-phu-ceramic-tang-ve-sinh-noi-that',
    excerpt: 'Chương trình khuyến mãi lớn nhất trong tháng dành cho khách hàng sử dụng dịch vụ phủ Ceramic Diamond.',
    content: 'Nội dung chi tiết về chương trình khuyến mãi...',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=800',
    date: '2024-03-01',
    category: 'promotion',
    author: 'Admin',
    metaKeywords: 'khuyến mãi phủ ceramic, ưu đãi detailing, vệ sinh nội thất xe hơi, XE ĐẸP PRO promotion, phủ ceramic diamond',
    metaDescription: 'Nhận ngay gói vệ sinh nội thất chuyên sâu hoàn toàn miễn phí khi sử dụng dịch vụ phủ Ceramic Diamond tại XE ĐẸP PRO. Chương trình có hạn, đăng ký ngay!'
  },
  {
    id: 'news4',
    title: 'Bảo Vệ Sơn Xe Dưới Nắng Gắt Mùa Hè',
    slug: 'bao-ve-son-xe-duoi-nang-gat-mua-he',
    excerpt: 'Nắng gắt và tia UV là kẻ thù số 1 của lớp sơn xe. Hãy cùng tìm hiểu các giải pháp bảo vệ tối ưu nhất.',
    content: 'Tia UV không chỉ làm xỉn màu sơn mà còn khiến các chi tiết nhựa nhanh bị giòn gãy. Phủ Ceramic hoặc dán PPF là những lựa chọn hàng đầu để bảo vệ xế yêu...',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800',
    date: '2026-03-31',
    category: 'tip',
    author: 'Chuyên gia Detailing',
    metaKeywords: 'bảo vệ sơn xe mùa hè, chống tia UV ô tô, phủ ceramic chống nắng, dán PPF bảo vệ sơn, XE ĐẸP PRO tips',
    metaDescription: 'Hướng dẫn chi tiết cách bảo vệ lớp sơn xe hơi khỏi tác động tiêu cực của ánh nắng mặt trời và tia UV trong mùa hè nắng gắt.'
  }
];

