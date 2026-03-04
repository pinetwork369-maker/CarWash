
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
  videoUrl?: string;
  subServices?: SubService[];
}

export interface GalleryImage {
  id: string;
  url: string;
  category: string;
  title: string;
  type?: 'image' | 'video';
}

export interface Review {
  id: string;
  author: string;
  text: string;
  rating: number;
  serviceId?: string; // Liên kết với Service.id
}

export interface CustomerRecord {
  id: string;
  customerName: string;
  phone: string;
  licensePlate: string;
  carModel: string;
  servicesDone: string[]; // Danh sách tên dịch vụ
  date: string;
  totalPrice: string;
  notes?: string;
}

export interface PremiumSolution {
  id: string;
  title: string;
  description: string;
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

export interface SiteConfig {
  siteName: string;
  heroTitle: string;
  heroDescription: string;
  heroImage: string;
  heroVideoUrl?: string;
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
  reviewsTitle: string;
  reviewsSubtitle: string;
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
  adminPassword?: string; // Mật khẩu quản trị
  logoUrl?: string;
  facebookUrl?: string;
  youtubeUrl?: string;
  instagramUrl?: string;
  zaloNumber?: string;
  promotions?: Promotion[];
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface BookingData {
  name: string;
  phone: string;
  email?: string;
  carModel: string;
  serviceId: string;
  date: string;
  note: string;
}

export interface VehicleServiceHistory {
  id: string;
  date: string;
  serviceName: string;
  mileage?: number;
  cost: string;
  notes?: string;
}

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: string;
  licensePlate: string;
  color?: string;
  serviceHistory: VehicleServiceHistory[];
}
