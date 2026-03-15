
import { GalleryImage, SiteConfig, Review, CustomerRecord, NewsArticle } from './types';

export const DEFAULT_SITE_CONFIG: SiteConfig = {
  siteName: "XE ĐẸP AUTO",
  heroTitle: "XE ĐẸP AUTO - Đẳng Cấp Detailing Chuyên Nghiệp",
  heroDescription: "Chăm sóc xế cưng bằng công nghệ tiên tiến nhất và sự tận tâm từ những chuyên gia hàng đầu tại XE ĐẸP AUTO.",
  heroImage: "https://images.unsplash.com/photo-1603584173870-7f394833ec96?auto=format&fit=crop&q=80&w=2069",
  heroVideoUrl: "https://assets.mixkit.co/videos/preview/mixkit-man-washing-a-car-with-a-sponge-1587-large.mp4",
  servicesTitle: "DỊCH VỤ XE ĐẸP AUTO",
  servicesSubtitle: "Chọn dịch vụ và liên hệ trực tiếp với chuyên gia XE ĐẸP AUTO để nhận báo giá tốt nhất.",
  premiumTitle: "GIẢI PHÁP DETAILING CAO CẤP",
  premiumSubtitle: "Những giải pháp chăm sóc xe chuyên sâu, mang lại sự hoàn mỹ tuyệt đối cho xế cưng của bạn.",
  aiTitle: "CỐ VẤN XE ĐẸP AUTO AI",
  aiSubtitle: "Tư vấn kỹ thuật 24/7. Hỏi bất cứ điều gì về bảo dưỡng xe, AI của XE ĐẸP AUTO sẽ trả lời ngay lập tức.",
  aiVideoUrl: "https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-human-head-with-glowing-circuits-42610-large.mp4",
  windowTintingTitle: "DÁN PHIM CÁCH NHIỆT",
  windowTintingSubtitle: "Chuyên Gia Cách Nhiệt",
  windowTintingDescription: "Bảo vệ sức khỏe gia đình và nội thất xế cưng với công nghệ phim Ceramic & Nano-Carbon cao cấp. Cản 99% tia UV, giảm nhiệt tức thì và tăng sự riêng tư tuyệt đối.",
  galleryTitle: "THƯ VIỆN HÌNH ÁNH",
  gallerySubtitle: "Kết quả thực tế từ XE ĐẸP AUTO",
  reviewsTitle: "ĐÁNH GIÁ TỪ KHÁCH HÀNG",
  reviewsSubtitle: "Sự hài lòng của khách hàng là ưu tiên hàng đầu tại XE ĐẸP AUTO.",
  newsTitle: "TIN TỨC & MẸO CHĂM SÓC XE",
  newsSubtitle: "Cập nhật những kiến thức bổ ích và chương trình mới nhất từ XE ĐẸP AUTO.",
  contactAddress: "168 Vũ Đức Thận, Long Biên, Hà Nội",
  contactPhone: "0588896699",
  contactEmail: "carwash68.vn@gmail.com",
  contactHours: "08:00 - 18:00 (T2-CN)",
  mapTitle: "VỊ TRÍ CỬA HÀNG",
  mapSubtitle: "Ghé thăm XE ĐẸP AUTO để trải nghiệm dịch vụ chăm sóc xe đẳng cấp nhất.",
  mapEmbedUrl: "https://www.google.com/maps?q=168%20V%C5%A9%20%C4%90%E1%BB%A9c%20Th%E1%BA%ADn%2C%20Long%20Bi%C3%AAn%2C%20H%C3%A0%20N%E1%BB%99i&hl=vi&t=&z=15&ie=UTF8&iwloc=&output=embed",
  wrapPPFTitle: "WRAP ĐỔI MÀU & DÁN PPF",
  wrapPPFSubtitle: "Bảo Vệ & Nâng Tầm Đẳng Cấp",
  wrapPPFDescription: "Thay đổi diện mạo xế cưng với hàng trăm màu sắc Wrap độc đáo hoặc bảo vệ lớp sơn nguyên bản tuyệt đối bằng phim PPF (Paint Protection Film) tự phục hồi vết xước. Giải pháp tối ưu để giữ gìn giá trị và vẻ đẹp bền vững.",
  tuningTitle: "ĐỘ XE CHUYÊN NGHIỆP",
  tuningSubtitle: "Nâng Tầm Hiệu Năng & Thẩm Mỹ",
  tuningDescription: "Từ nâng cấp ánh sáng, âm thanh đến độ bodykit và mâm lốp. XE ĐẸP AUTO mang đến những giải pháp độ xe cá nhân hóa, giúp xế cưng của bạn trở nên khác biệt và mạnh mẽ hơn bao giờ hết.",
  copyright: "XE ĐẸP AUTO © 2024",
  adminPassword: "025099010538",
  logoUrl: "",
  facebookUrl: "https://facebook.com",
  youtubeUrl: "https://youtube.com",
  instagramUrl: "https://instagram.com",
  zaloNumber: "0588896699",
  promotions: [
    {
      id: 'promo1',
      title: 'Giảm 20% Phủ Ceramic',
      description: 'Chào hè rực rỡ, XE ĐẸP AUTO giảm ngay 20% cho tất cả các gói phủ Ceramic 9H cao cấp.',
      image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=800',
      expiryDate: '2024-06-30'
    },
    {
      id: 'promo2',
      title: 'Tặng Vệ Sinh Khoang Máy',
      description: 'Khi sử dụng dịch vụ Detailing nội thất, quý khách sẽ được tặng kèm gói vệ sinh khoang máy bằng hơi nước nóng.',
      image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=800',
      expiryDate: '2024-05-15'
    },
    {
      id: 'promo3',
      title: 'Combo Tiết Kiệm 500K',
      description: 'Khi đặt lịch Gói Đánh Bóng sơn + Vệ sinh nội thất chuyên sâu, bạn sẽ nhận ngay ưu đãi giảm 500.000 VNĐ.',
      image: 'https://images.unsplash.com/photo-1516579225093-128c0257a48a?auto=format&fit=crop&q=80&w=800',
      expiryDate: '2026-03-31'
    }
  ],
  appointments: [
    {
      id: 'app1',
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
      id: 'app2',
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
      id: 'pkg1',
      title: 'Gói Chăm Sóc Toàn Diện (Luxury)',
      description: 'Gói dịch vụ cao cấp nhất bao gồm hiệu chỉnh sơn, phủ ceramic 9H, vệ sinh nội thất chuyên sâu và khoang máy.',
      price: '15.000.000 VNĐ',
      duration: '2 ngày',
      features: ['Hiệu chỉnh sơn 3 bước', 'Phủ Ceramic 9H (2 lớp)', 'Vệ sinh nội thất hơi nước nóng', 'Vệ sinh khoang máy Dry Steam'],
      isPopular: true
    },
    {
      id: 'pkg2',
      title: 'Gói Bảo Vệ Cơ Bản (Standard)',
      description: 'Gói bảo vệ sơn và làm sạch nội thất cơ bản cho xe mới.',
      price: '5.000.000 VNĐ',
      duration: '1 ngày',
      features: ['Đánh bóng tăng bóng', 'Phủ Ceramic Lite (1 lớp)', 'Vệ sinh nội thất cơ bản'],
      isPopular: false
    },
    {
      id: 'pkg3',
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
  ]
};

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
  }
];

export const DEFAULT_CUSTOMER_RECORDS: CustomerRecord[] = [
  {
    id: 'rec1',
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
    rating: 5
  },
  {
    id: 'rec2',
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
    id: 'rec3',
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

export const SERVICES = [
  {
    id: 'wash',
    title: 'Rửa Xe Detailing 3 Bước',
    description: 'Quy trình "Deep Clean" tiêu chuẩn quốc tế. Sử dụng dung dịch pH trung tính, găng tay lông cừu và phương pháp 2 xô để loại bỏ bụi bẩn mà không gây trầy xước. Vệ sinh kỹ từng khe kẽ, mâm lốp và hút bụi nội thất cơ bản.',
    price: 'Từ 250.000 VNĐ',
    category: 'exterior',
    icon: '🚿',
    image: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&q=80&w=800',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    subServices: [
      { title: 'Rửa xe nhanh', price: '250.000 VNĐ', note: 'Tiết kiệm thời gian' },
      { title: 'Rửa xe tiêu chuẩn', price: '350.000 VNĐ', note: 'Sạch sâu chi tiết' },
      { title: 'Rửa xe cao cấp', price: '450.000 VNĐ', note: 'Bảo vệ sơn tối ưu' }
    ]
  },
  {
    id: 'polish',
    title: 'Hiệu Chỉnh & Đánh Bóng Sơn',
    description: 'Quy trình hiệu chỉnh sơn chuyên sâu 3 giai đoạn sử dụng máy đánh bóng Dual Action (DA) và xi đánh bóng cao cấp. Loại bỏ hoàn toàn vết xước xoáy, vết quầng và phục hồi độ bóng gương tuyệt đối cho bề mặt sơn.',
    price: 'Từ 2.500.000 VNĐ',
    category: 'exterior',
    icon: '✨',
    image: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'ceramic',
    title: 'Phủ Ceramic 9H Diamond',
    description: 'Ứng dụng công nghệ Nano Ceramic 9H tạo lớp màng bảo vệ siêu cứng, tăng hiệu ứng lá sen, chống tia UV và các tác nhân ăn mòn hóa học. Giúp xe luôn bóng bẩy và cực kỳ dễ vệ sinh.',
    price: 'Từ 6.000.000 VNĐ',
    category: 'protection',
    icon: '🛡️',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=800',
    videoUrl: 'https://www.w3schools.com/html/movie.mp4'
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
      { title: 'Gói bảo vệ các chi tiết nội thất', price: 'Từ 1.500.000 VNĐ', note: 'Chống xước nhựa bóng' },
      { title: 'Gói bảo vệ 4 hõm cửa & gương', price: '800.000 VNĐ', note: 'Vị trí dễ trầy xước' },
      { title: 'Gói bảo vệ Full xe (TPU 10 năm)', price: 'Từ 45.000.000 VNĐ', note: 'Bảo vệ toàn diện' }
    ]
  },
  {
    id: 'wrap',
    title: 'Wrap Đổi Màu Cao Cấp',
    description: 'Thay đổi diện mạo xế cưng với hàng trăm mã màu độc đáo: Matte, Satin, Glossy hay Chrome. Sử dụng decal chính hãng Teckwrap, Avery Dennison đảm bảo không để lại keo khi bóc.',
    price: 'Từ 12.000.000 VNĐ',
    category: 'tuning',
    icon: '🎨',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'window',
    title: 'Dán Phim Cách Nhiệt 3M',
    description: 'Dòng phim Crystalline và Ceramic cao cấp giúp cản nhiệt 99%, loại bỏ tia UV gây hại, bảo vệ sức khỏe gia đình và tăng sự riêng tư tuyệt đối cho không gian bên trong.',
    price: 'Từ 4.500.000 VNĐ',
    category: 'protection',
    icon: '🕶️',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'interior-deep-cleaning',
    title: 'Dọn Nội Thất Chuyên Sâu',
    description: 'Tháo ghế (nếu cần), hút bụi, giặt trần, sàn, làm sạch sâu từng khe kẽ bằng hơi nước nóng và dung dịch chuyên dụng. Khử mùi Ozone và dưỡng da/nhựa cao cấp.',
    price: 'Từ 1.800.000 VNĐ',
    category: 'interior',
    icon: '🛋️',
    image: 'https://images.unsplash.com/photo-1595850833461-22f3f98278ae?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'engine',
    title: 'Vệ Sinh Khoang Máy Hơi Nước',
    description: 'Làm sạch bụi bẩn, dầu mỡ bám lâu ngày bằng công nghệ hơi nước khô (Dry Steam) an toàn tuyệt đối cho hệ thống điện. Dưỡng bảo vệ các chi tiết nhựa và cao su.',
    price: 'Từ 1.000.000 VNĐ',
    category: 'interior',
    icon: '⚙️',
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'tuning',
    title: 'Nâng Cấp Đèn & Âm Thanh',
    description: 'Độ đèn Bi-LED, Laser tăng sáng an toàn. Nâng cấp hệ thống âm thanh với loa cánh, loa sub và DSP giúp trải nghiệm giải trí trên xe trở nên sống động hơn.',
    price: 'Liên hệ tư vấn',
    category: 'tuning',
    icon: '🔊',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'underbody',
    title: 'Phủ Gầm & Cách Âm',
    description: 'Sơn phủ gầm chống rỉ sét, oxi hóa và hạn chế đá văng. Kết hợp dán vật liệu cách âm chống ồn từ lốp và mặt đường truyền vào khoang cabin.',
    price: 'Từ 3.500.000 VNĐ',
    category: 'exterior',
    icon: '🚗',
    image: 'https://images.unsplash.com/photo-1507133311040-53c26a848916?auto=format&fit=crop&q=80&w=800'
  }
];

export const DEFAULT_GALLERY: GalleryImage[] = [
  { id: '1', url: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=800', category: 'ceramic', title: 'Phủ Ceramic Porsche' },
  { id: '2', url: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&q=80&w=800', category: 'wash', title: 'Rửa xe chi tiết BMW' },
  { id: '3', url: 'https://images.unsplash.com/photo-1599256621730-535171e28e50?auto=format&fit=crop&q=80&w=800', category: 'interior', title: 'Vệ sinh nội thất Mercedes' },
  { id: '4', url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800', category: 'film', title: 'Dán phim cách nhiệt 3M' },
  { id: '5', url: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&q=80&w=800', category: 'ceramic', title: 'Hiệu chỉnh sơn Audi' },
  { id: '6', url: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=800', category: 'wash', title: 'Vệ sinh khoang máy' },
  { id: '7', url: 'https://images.unsplash.com/photo-1507133311040-53c26a848916?auto=format&fit=crop&q=80&w=800', category: 'ceramic', title: 'Ceramic 9H Luxury' },
  { id: '8', url: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=800', category: 'film', title: 'Dán phim Nano Ceramic' },
];

export const DEFAULT_REVIEWS: Review[] = [
  { id: '1', author: 'Anh Hoàng', text: 'Dịch vụ rất chuyên nghiệp. Xe của mình sau khi phủ Ceramic trông như mới mua từ hãng về. Cảm ơn đội ngũ XE ĐẸP AUTO.', rating: 5, serviceId: 'ceramic' },
  { id: '2', author: 'Chị Lan', text: 'Nhân viên nhiệt tình, tư vấn kỹ lưỡng. Vệ sinh nội thất rất sạch, mùi thơm dễ chịu và không còn bụi bẩn trong kẽ ghế.', rating: 5, serviceId: 'interior-detailing' },
  { id: '3', author: 'Anh Tuấn', text: 'Giá cả hợp lý so với chất lượng nhận được. Đánh bóng sơn làm xe bóng loáng vượt mong đợi.', rating: 4, serviceId: 'polish' },
  { id: '4', author: 'Anh Minh', text: 'Rửa xe rất kỹ, các kẽ nhỏ đều sạch bong.', rating: 5, serviceId: 'wash' },
];

export const DEFAULT_NEWS: NewsArticle[] = [
  {
    id: 'news1',
    title: '5 Mẹo Giữ Lớp Sơn Xe Luôn Bóng Như Mới',
    excerpt: 'Lớp sơn xe là bộ phận dễ bị tổn thương nhất bởi các tác động từ môi trường. Hãy cùng XE ĐẸP AUTO tìm hiểu cách bảo vệ nó.',
    content: 'Nội dung chi tiết về các mẹo chăm sóc sơn xe...',
    image: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&q=80&w=800',
    date: '2024-03-10',
    category: 'tip',
    author: 'Admin'
  },
  {
    id: 'news2',
    title: 'Khai Trương Cơ Sở Mới Tại Long Biên',
    excerpt: 'XE ĐẸP AUTO chính thức khai trương cơ sở mới với quy mô hiện đại hơn, phục vụ quý khách hàng tốt hơn.',
    content: 'Nội dung chi tiết về sự kiện khai trương...',
    image: 'https://images.unsplash.com/photo-1562141961-b5d185666062?auto=format&fit=crop&q=80&w=800',
    date: '2024-03-05',
    category: 'news',
    author: 'Admin'
  },
  {
    id: 'news3',
    title: 'Ưu Đãi Đặc Biệt: Phủ Ceramic Tặng Vệ Sinh Nội Thất',
    excerpt: 'Chương trình khuyến mãi lớn nhất trong tháng dành cho khách hàng sử dụng dịch vụ phủ Ceramic Diamond.',
    content: 'Nội dung chi tiết về chương trình khuyến mãi...',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=800',
    date: '2024-03-01',
    category: 'promotion',
    author: 'Admin'
  }
];

