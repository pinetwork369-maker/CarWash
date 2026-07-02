
export interface SubService {
  title: string;
  price: string;
  note?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  icon: string;
  image: string;
  category?: string;
  videoUrl?: string;
  subServices?: SubService[];
  inventoryConsumptions?: InventoryConsumption[]; // Định mức vật tư
  seoKeywords?: string;
  seoDescription?: string;
}

export interface InventoryConsumption {
  itemId: string;
  amount: number;
}

export interface GalleryImage {
  id: string;
  url: string;
  category: string;
  title: string;
  type?: 'image' | 'video';
  tags?: string[];
}

export interface Review {
  id: string;
  author: string;
  text: string;
  rating: number;
  serviceId?: string; // Liên kết với Service.id
  customerImage?: string;
  carModel?: string;
}

export interface ServiceReview {
  serviceName: string;
  rating: number;
  comment?: string;
}

export interface BeforeAfterImage {
  id: string;
  before: string;
  after: string;
  label: string;
  date: string;
  serviceName?: string;
}

export interface CustomerRecord {
  id: string;
  customerName: string;
  phone: string;
  licensePlate: string;
  carModel: string;
  servicesDone: string[]; // Danh sách tên dịch vụ
  serviceReviews?: ServiceReview[]; // Đánh giá chi tiết từng dịch vụ
  date: string;
  totalPrice: string;
  discount?: number;
  paymentStatus?: 'paid' | 'pending' | 'partially_paid';
  notes?: string;
  rating?: number;
  loyaltyPoints?: number; // Điểm tích lũy
  tier?: LoyaltyTier;
  technicianId?: string; // ID kỹ thuật viên thực hiện chính
  inspectionId?: string; // ID bản kiểm tra xe
  beforeAfterImages?: BeforeAfterImage[];
}

export interface Staff {
  id: string;
  name: string;
  phone: string;
  email?: string;
  avatar?: string;
  role: 'technician' | 'manager' | 'receptionist' | 'admin';
  commissionRate: number; // Tỷ lệ hoa hồng (%)
  status: 'active' | 'inactive';
  joinedDate: string;
}

export interface InspectionPoint {
  id: string;
  x: number; // Tọa độ % trên sơ đồ
  y: number;
  view: 'front' | 'rear' | 'left' | 'right'; // Góc nhìn của điểm đánh dấu
  type: 'scratch' | 'dent' | 'crack' | 'other';
  note?: string;
  photo?: string; // Ảnh chụp cận cảnh vết thương
}

export interface CarInspection {
  id: string;
  customerId?: string;
  customerName: string;
  phone?: string; // Số điện thoại để tra cứu
  licensePlate: string;
  date: string;
  points: InspectionPoint[];
  checklist?: Record<string, 'ok' | 'warning' | 'error' | 'na'>;
  images?: {
    front?: string;
    rear?: string;
    left?: string;
    right?: string;
  };
  status?: 'pending' | 'completed' | 'draft';
  technicianId?: string;
  notes?: string;
}

export interface MaintenanceReminder {
  id: string;
  customerId: string;
  customerName: string;
  phone: string;
  licensePlate?: string;
  serviceName: string;
  lastServiceDate: string;
  nextServiceDate: string;
  status: 'pending' | 'sent' | 'completed' | 'overdue' | 'cancelled';
  note?: string;
}

export interface BankInfo {
  bankName: string;
  accountNumber: string;
  accountName: string;
  bin: string; // Mã BIN ngân hàng cho VietQR
}

export interface MomoInfo {
  phone: string;
  name: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  minThreshold: number; // Ngưỡng cảnh báo hết hàng
  lastRestocked: string;
  pricePerUnit?: number;
  barcode?: string; // Mã vạch/QR Code để quét
}

export interface ECertificate {
  id: string;
  customerName: string;
  phone?: string; // Số điện thoại để tra cứu
  licensePlate: string;
  carModel?: string;
  serviceType: string;
  serviceName?: string; // Tên dịch vụ cụ thể
  issueDate: string;
  expiryDate: string;
  technician?: string;
  qrCode: string;
  status: 'active' | 'expired';
}

export type LoyaltyTier = 'bronze' | 'silver' | 'gold' | 'diamond';

export interface TierBenefit {
  id: string;
  name: string;
  tier: LoyaltyTier;
  minPoints: number;
  multiplier: number; // Hệ số tích điểm (ví dụ: 1.0, 1.2, 1.5, 2.0)
  perks: string[];
  color: string;
}

export interface LoyaltyConfig {
  pointsPer100k: number; // Số điểm nhận được mỗi 100k chi tiêu
  pointValue: number; // Giá trị quy đổi của 1 điểm (VNĐ)
  tiers: TierBenefit[];
}

export interface PremiumSolution {
  id: string;
  title: string;
  description: string;
  price?: string; // Giá dịch vụ cao cấp
  beforeImage: string;
  afterImage: string;
  process: string[]; // Các bước thực hiện
  benefits: string[]; // Lợi ích mang lại
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  image: string;
  expiryDate: string;
}

export interface AiVideoRecord {
  id: string;
  url: string;
  prompt: string;
  date: string;
  type: 'image' | 'video';
}

export interface Appointment {
  id: string;
  customerName: string;
  phone: string;
  email?: string;
  carModel: string;
  serviceId: string;
  subServiceTitle?: string;
  date: string;
  time?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  note?: string;
  createdAt: string;
  isRead?: boolean;
  paymentStatus?: 'unpaid' | 'deposit_paid' | 'fully_paid';
  depositAmount?: number;
}

export interface DetailingPackage {
  id: string;
  title: string;
  description: string;
  price: string;
  duration: string;
  features: string[];
  isPopular?: boolean;
  category?: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  imageAlt?: string;
  date: string;
  category: 'tip' | 'news' | 'promotion';
  author: string;
  metaKeywords?: string[] | string;
  metaDescription?: string;
  metaTitle?: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  date: string;
  isRead: boolean;
  link?: string;
}

export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: 'rent' | 'salary' | 'utility' | 'inventory' | 'marketing' | 'other';
  date: string;
  note?: string;
}

export type UserRole = 'admin' | 'staff' | 'manager';

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  details: string;
  timestamp: string;
  ip?: string;
}

export interface AutomationSettings {
  enableMaintenanceReminder: boolean;
  enableBirthdayGreeting: boolean;
  enableServiceCompletion: boolean;
  maintenanceReminderDays: number;
  birthdayDiscount: number;
  notifyServiceDone?: boolean;
  notifyMaintenanceReminder?: boolean;
  notifyBirthday?: boolean;
  notifyPromotion?: boolean;
  notifyThanks24h?: boolean;
  autoGoldVoucher?: boolean;
  channel: 'zalo' | 'sms' | 'both';
}

export interface SubscriptionPackage {
  id: string;
  title: string;
  description: string;
  price: string;
  durationMonths: number;
  servicesPerMonth: { serviceId: string, count: number }[];
  perks: string[];
  color: string;
  isPopular?: boolean;
  icon: string;
  interval: string;
  features: string[];
}

export interface UserSubscription {
  id: string;
  customerId: string;
  packageId: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'expired' | 'cancelled';
  remainingUses: { serviceId: string, count: number }[];
}

export interface Expert {
  id: string;
  name: string;
  role: string;
  exp: string;
  cert: string;
  img: string;
}

export interface DecalColor {
  id: string;
  name: string;
  hex: string;
  category: 'Gloss' | 'Matte' | 'Satin' | 'Chrome' | 'Carbon' | 'ColorShift';
  finish: string;
  code: string;
}

export interface WrapProject {
  id: string;
  title: string;
  img: string;
  color: string;
  date?: string;
  objectPosition?: string;
}

export interface ServiceProposal {
  id: string;
  customerId?: string;
  customerName: string;
  phone: string;
  licensePlate: string;
  carModel: string;
  date: string;
  expiryDate: string;
  services: { serviceId: string, price: string, note?: string }[];
  expertNote: string; // Lời tư vấn từ chuyên gia (có thể dùng AI gen)
  status: 'draft' | 'sent' | 'accepted' | 'rejected';
  totalPrice: number;
}

export interface VIPProgram {
  id: string;
  name: string;
  description: string;
  minUsage: number;
  discountRate: number;
  status: 'active' | 'inactive';
}

export interface SiteConfig {
  siteName: string;
  heroTitle: string;
  heroSubtitle?: string;
  heroDescription: string;
  heroImage: string;
  heroVideoUrl?: string;
  featureBefore?: string;
  featureAfter?: string;
  servicesTitle: string;
  servicesSubtitle: string;
  premiumTitle: string;
  premiumSubtitle: string;
  aiTitle: string;
  aiSubtitle: string;
  aiVideoUrl?: string;
  windowTintingTitle: string;
  windowTintingSubtitle: string;
  windowTintingDescription: string;
  galleryTitle: string;
  gallerySubtitle: string;
  aiAssessmentTitle?: string;
  aiAssessmentSubtitle?: string;
  aiAssessmentDescription?: string;
  reviewsTitle: string;
  reviewsSubtitle: string;
  newsTitle?: string;
  newsSubtitle?: string;
  promotionsTitle?: string;
  promotionsSubtitle?: string;
  contactTitle?: string;
  contactSubtitle?: string;
  contactAddress: string;
  contactPhone: string;
  contactHours: string;
  contactEmail?: string;
  mapTitle?: string;
  mapSubtitle?: string;
  mapEmbedUrl?: string;
  wrapPPFTitle: string;
  wrapPPFSubtitle: string;
  wrapPPFDescription: string;
  tuningTitle: string;
  tuningSubtitle: string;
  tuningDescription: string;
  copyright: string;
  whyChooseUsTitle?: string;
  whyChooseUsSubtitle?: string;
  faqTitle?: string;
  faqSubtitle?: string;
  processTitle?: string;
  processSubtitle?: string;
  expertsTitle?: string;
  expertsSubtitle?: string;
  transformations?: BeforeAfterImage[];
  aiAdvisorTitle?: string;
  aiAdvisorSubtitle?: string;
  aiAdvisorWelcome?: string;
  aiSystemPrompt?: string;
  accountingLockPassword?: string; // Mật khẩu kế toán vận hành
  designPassword?: string; // Mật khẩu thiết kế và giao diện
  inspectionPassword?: string; // Mật khẩu phiếu kiểm tra xe
  enableAccountingLock?: boolean; // Bật/tắt khóa kế toán (Global)
  enableDesignLock?: boolean; // Bật/tắt khóa thiết kế (Global)
  enableInspectionLock?: boolean; // Bật/tắt khóa phiếu kiểm tra xe
  accountingLockSettings?: Record<string, boolean>; // Bật/tắt khóa cho từng mục
  designLockSettings?: Record<string, boolean>; // Bật/tắt khóa cho từng mục thiết kế
  wrapProjects?: WrapProject[];
  tintProjects?: WrapProject[];
  tuningProjects?: WrapProject[];
  logoUrl?: string;
  aboutImage?: string;
  weatherCareImage?: string;
  faqImage?: string;
  ppfImage?: string;
  facebookUrl?: string;
  youtubeUrl?: string;
  instagramUrl?: string;
  zaloNumber?: string;
  loyaltyConfig?: LoyaltyConfig;
  bankInfo?: BankInfo;
  momoInfo?: MomoInfo;
  staff?: Staff[];
  inspections?: CarInspection[];
  reminders?: MaintenanceReminder[];
  promotions?: Promotion[];
  appointments?: Appointment[];
  packages?: DetailingPackage[];
  news?: NewsArticle[];
  expenses?: Expense[];
  services?: Service[];
  automation?: AutomationSettings;
  subscriptions?: SubscriptionPackage[];
  experts?: Expert[];
  proposals?: ServiceProposal[];
  vipPrograms?: VIPProgram[];
  seoKeywords?: string;
  seoDescription?: string;
  googleVerificationCode?: string;
  themeColor?: string; // Màu chủ đạo (Accent Color)
  secondaryColor?: string; // Màu phụ
  updatedAt?: number;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface BookingData {
  name: string;
  phone: string;
  email?: string;
  vehicleType?: 'mini' | 'sedan' | 'suv' | 'supercar';
  carModel: string;
  serviceId: string;
  subServiceTitle?: string;
  date: string;
  time?: string;
  note: string;
}


