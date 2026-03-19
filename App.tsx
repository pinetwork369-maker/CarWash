
import React, { useState, useRef, useEffect } from 'react';
import { 
  BarChart as ReBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart as RePieChart,
  Pie,
  Cell
} from 'recharts';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Phone, Clock, ExternalLink, Copy, ChevronRight, Star, Shield, Zap, Award, CheckCircle2, Info, MessageSquare, Send, User, Calendar, Car, Tag, Plus, Trash2, Edit2, Save, X, Settings, LogOut, Menu, Search, Filter, ArrowRight, ArrowLeft, ArrowUp, Play, Pause, Volume2, VolumeX, Maximize2, Minimize2, Download, Share2, Heart, Eye, Clock3, Check, AlertCircle, HelpCircle, MoreVertical, MoreHorizontal, Grid, List, Layout, Image as ImageIcon, Video as VideoIcon, FileText, Settings2, Bell, UserCircle, LogIn, UserPlus, Mail, Lock, Smartphone, Globe, Facebook, Youtube, Instagram, Twitter, Linkedin, Github, Chrome, Compass, Map, Navigation, Layers, MousePointer2, Hand, ZoomIn, ZoomOut, RotateCcw, RotateCw, Trash, RefreshCw, CheckCircle, XCircle, Minus, Move, Square, Circle, Triangle, Type, PenTool, Eraser, Palette, Scissors, Copy as CopyIcon, Clipboard, Share, Upload, Camera, Mic, Music, Headphones, Monitor, Laptop, Tablet, Watch, Battery, Wifi, Bluetooth, Cloud, Sun, Moon, CloudRain, CloudLightning, Wind, Snowflake, Thermometer, Droplets, Flame, Zap as ZapIcon, Activity, Heart as HeartIcon, Target, Flag, Trophy, Medal, Briefcase, ShoppingBag, ShoppingCart, CreditCard, Wallet, Banknote, Coins, PieChart, BarChart, LineChart, TrendingUp, TrendingDown, Presentation, Book, Bookmark, BookOpen, GraduationCap, School, Building, Home, Warehouse, Factory, Truck, Bike, Plane, Ship, Anchor, LifeBuoy, MapPin as MapPinIcon, Map as MapIcon, Navigation2, Compass as CompassIcon, Locate, LocateFixed, Pin, MapPinOff, Phone as PhoneIcon, PhoneCall, PhoneForwarded, PhoneIncoming, PhoneMissed, PhoneOff, PhoneOutgoing, Video, VideoOff, MicOff, Speaker, Volume, Volume1, Mail as MailIcon, Inbox, Archive, Send as SendIcon, Paperclip, Link as LinkIcon, Link2, ExternalLink as ExternalLinkIcon, Share2 as Share2Icon, MessageCircle, MessageSquare as MessageSquareIcon, Hash, AtSign, User as UserIcon, Users, UserPlus as UserPlusIcon, UserMinus, UserCheck, UserX, Fingerprint, Key, Shield as ShieldIcon, ShieldCheck, ShieldAlert, ShieldOff, Lock as LockIcon, Unlock, Eye as EyeIcon, EyeOff, Search as SearchIcon, ZoomIn as ZoomInIcon, ZoomOut as ZoomOutIcon, Settings as SettingsIcon, Sliders, Bell as BellIcon, BellOff, Calendar as CalendarIcon, Clock as ClockIcon, History, Timer, Hourglass, AlarmClock, Watch as WatchIcon, Sun as SunIcon, Moon as MoonIcon, Cloud as CloudIcon, CloudRain as CloudRainIcon, CloudLightning as CloudLightningIcon, Wind as WindIcon, Snowflake as SnowflakeIcon, Thermometer as ThermometerIcon, Droplets as DropletsIcon, Flame as FlameIcon, Zap as ZapIcon2, Activity as ActivityIcon, Heart as HeartIcon2, Target as TargetIcon, Flag as FlagIcon, Trophy as TrophyIcon, Medal as MedalIcon, Briefcase as BriefcaseIcon, ShoppingBag as ShoppingBagIcon, ShoppingCart as ShoppingCartIcon, CreditCard as CreditCardIcon, Wallet as WalletIcon, Banknote as BanknoteIcon, Coins as CoinsIcon, PieChart as PieChartIcon, BarChart as BarChartIcon, LineChart as LineChartIcon, TrendingUp as TrendingUpIcon, TrendingDown as TrendingDownIcon, Presentation as PresentationIcon, Book as BookIcon, Bookmark as BookmarkIcon, BookOpen as BookOpenIcon, GraduationCap as GraduationCapIcon, School as SchoolIcon, Building as BuildingIcon, Home as HomeIcon, Warehouse as WarehouseIcon, Factory as FactoryIcon, Truck as TruckIcon, Bike as BikeIcon, Plane as PlaneIcon, Ship as ShipIcon, Anchor as AnchorIcon, LifeBuoy as LifeBuoyIcon, Sparkles, Package, Cpu, Wrench, Receipt, Newspaper, Bot, Boxes, Gift, BarChart3, FileCheck, AlertTriangle } from 'lucide-react';
import { SERVICES as INITIAL_SERVICES, DEFAULT_GALLERY, DEFAULT_SITE_CONFIG, DEFAULT_CUSTOMER_RECORDS, DEFAULT_PREMIUM_SOLUTIONS, DEFAULT_NEWS, DEFAULT_INVENTORY, DEFAULT_E_CERTIFICATES } from './constants.tsx';
import { Service, Message, GalleryImage, SiteConfig, CustomerRecord, BookingData, PremiumSolution, Promotion, AiVideoRecord, Appointment, DetailingPackage, NewsArticle, AppNotification, InventoryItem, ECertificate, LoyaltyConfig } from './types.ts';
import { TrackingSection, TrackingManagement, VehicleTracking, DEFAULT_TRACKING } from './components/Tracking';
import { FeedbackSection, FeedbackManagement } from './components/Feedback';
import { Review } from './types.ts';
import { DEFAULT_REVIEWS } from './constants.tsx';
import { GalleryUploadManager } from './components/Gallery/GalleryUploadManager';
import { getAIResponse, editImageWithAI, generateImageWithAI, generateVideoWithAI, getMaintenanceAdvice, AIProvider } from './services/geminiService.ts';
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from 'react-markdown';
import { Toaster, toast } from 'react-hot-toast';

declare global {
  interface Window {
    aistudio: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }
}

// --- SEO Component ---

const SEO: React.FC<{
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  keywords?: string;
}> = ({ 
  title, 
  description, 
  canonical, 
  ogImage, 
  ogType = 'website',
  keywords 
}) => {
  const siteTitle = "XE ĐẸP AUTO - Detailing Chuyên Nghiệp Hà Nội | Phủ Ceramic, Dán PPF, Chăm Sóc Xe";
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const defaultDescription = "XE ĐẸP AUTO - Trung tâm Detailing & Chăm sóc xe hơi chuyên nghiệp tại 168 Vũ Đức Thận, Long Biên, Hà Nội. Chuyên Phủ Ceramic Diamond 9H, Dán PPF bảo vệ sơn, Wrap đổi màu, Vệ sinh nội thất & Khoang máy bằng hơi nước nóng. Cam kết chất lượng, sản phẩm chính hãng, kỹ thuật viên tay nghề cao.";
  const metaDescription = description || defaultDescription;
  const defaultKeywords = "xe đẹp auto, detailing hà nội, chăm sóc xe hơi long biên, phủ ceramic hà nội, dán ppf ô tô, wrap đổi màu xe, vệ sinh nội thất ô tô, vệ sinh khoang máy hơi nước, dán phim cách nhiệt 3m, đánh bóng xe hơi";
  const metaKeywords = keywords ? `${keywords}, ${defaultKeywords}` : defaultKeywords;
  const url = "https://ais-pre-fqxtftwv5qjyrg55tfcqwp-362195985531.asia-southeast1.run.app";
  const fullUrl = canonical ? `${url}${canonical}` : url;
  const defaultOgImage = "https://images.unsplash.com/photo-1603584173870-7f394833ec96?auto=format&fit=crop&q=80&w=2069";

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      <meta name="google-site-verification" content="qf8156WuX4TgFxq_CV1cG3fZsBMEilbxB9LEwe2_oC4" />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={ogImage || defaultOgImage} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="XE ĐẸP AUTO" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={ogImage || defaultOgImage} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "XE ĐẸP AUTO",
          "image": defaultOgImage,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "168 Vũ Đức Thận",
            "addressLocality": "Long Biên",
            "addressRegion": "Hà Nội",
            "postalCode": "100000",
            "addressCountry": "VN"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 21.0597,
            "longitude": 105.8906
          },
          "url": url,
          "telephone": "0588896699",
          "openingHoursSpecification": [
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday"
              ],
              "opens": "08:00",
              "closes": "18:00"
            }
          ]
        })}
      </script>
    </Helmet>
  );
};

// --- Utilities ---

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, callback: (base64: string) => void) => {
  const file = e.target.files?.[0];
  if (file) {
    // Check file size (limit to 4MB for localStorage stability)
    if (file.size > 4 * 1024 * 1024) {
      alert("⚠️ Tệp quá lớn (tối đa 4MB). Để đảm bảo trang web hoạt động ổn định và lưu trữ được lâu dài, vui lòng sử dụng video/ảnh có dung lượng nhỏ hơn hoặc sử dụng đường dẫn URL trực tiếp.");
      return;
    }
    const base64 = await fileToBase64(file);
    callback(base64);
  }
};

// --- Sub-components ---

const AiHelperButton: React.FC<{ 
  onClick: () => void; 
  isLoading: boolean;
  className?: string;
}> = ({ onClick, isLoading, className = "" }) => (
  <button 
    onClick={onClick}
    disabled={isLoading}
    className={`flex items-center gap-1.5 px-2 py-1 rounded-lg bg-blue-600/10 border border-blue-500/20 text-blue-500 hover:bg-blue-600 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    title="Sáng tạo bằng AI"
  >
    {isLoading ? (
      <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
    ) : (
      <Sparkles className="w-3 h-3" />
    )}
    <span className="text-[9px] font-black uppercase tracking-widest">AI Helper</span>
  </button>
);

const EditableText: React.FC<{ 
  text: string; 
  isEditMode: boolean; 
  isDesignAuthenticated?: boolean;
  onSave: (newVal: string) => void; 
  className?: string; 
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  multiline?: boolean;
}> = ({ text, isEditMode, isDesignAuthenticated = false, onSave, className, tag = 'p', multiline = false }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(text || '');
  const inputRef = useRef<HTMLTextAreaElement | HTMLInputElement>(null);

  useEffect(() => {
    setTempValue(text || '');
  }, [text]);

  useEffect(() => {
    if (isEditing) inputRef.current?.focus();
  }, [isEditing]);

  const handleBlur = () => {
    setIsEditing(false);
    if (tempValue !== (text || '')) onSave(tempValue);
  };

  const Tag = tag as any;
  const safeText = text || '';

  const canEdit = isEditMode && isDesignAuthenticated;

  if (canEdit && isEditing) {
    const commonClasses = `${className} bg-slate-800 text-white border-2 border-blue-500 rounded px-2 outline-none w-full shadow-[0_0_20px_rgba(59,130,246,0.4)] z-10`;
    return multiline ? (
      <textarea
        ref={inputRef as any}
        className={`${commonClasses} min-h-[100px] resize-y`}
        value={tempValue}
        onChange={(e) => setTempValue(e.target.value)}
        onBlur={handleBlur}
      />
    ) : (
      <input
        ref={inputRef as any}
        className={commonClasses}
        value={tempValue}
        onChange={(e) => setTempValue(e.target.value)}
        onBlur={handleBlur}
      />
    );
  }

  return (
    <div 
      className={`relative group/edit ${canEdit ? 'cursor-text hover:ring-2 hover:ring-blue-500/50 hover:bg-blue-500/5 p-1 rounded transition-all duration-300' : ''}`} 
      onClick={() => canEdit && setIsEditing(true)}
    >
      <Tag className={`${className} transition-colors duration-300`}>
        {safeText.split('\n').map((line, i) => <React.Fragment key={i}>{line}{i < safeText.split('\n').length - 1 && <br/>}</React.Fragment>)}
      </Tag>
      {canEdit && !isEditing && (
        <motion.span 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute -top-3 -right-2 bg-blue-600 text-[9px] px-2 py-0.5 rounded-full uppercase font-black z-20 shadow-lg pointer-events-none"
        >
          Sửa
        </motion.span>
      )}
    </div>
  );
};

const EditableImage: React.FC<{
  src: string;
  isEditMode: boolean;
  isDesignAuthenticated?: boolean;
  onUpload: (base64: string) => void;
  className: string;
  alt: string;
}> = ({ src, isEditMode, isDesignAuthenticated = false, onUpload, className, alt }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64 = await fileToBase64(file);
      onUpload(base64);
    }
  };

  const canEdit = isEditMode && isDesignAuthenticated;

  return (
    <div className={`relative group/img ${className}`}>
      <img src={src} alt={alt} className="w-full h-full object-cover" />
      {canEdit && (
        <div className="absolute inset-0 bg-blue-600/30 backdrop-blur-[2px] opacity-0 group-hover/img:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="bg-blue-600 text-white font-black text-[10px] uppercase px-4 py-2 rounded-xl shadow-xl hover:bg-blue-500 transition-all active:scale-95"
          >
            Thay Ảnh
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            className="hidden" 
          />
        </div>
      )}
    </div>
  );
};

const NotificationCenter: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  notifications: AppNotification[];
  onMarkAsRead: (id: string) => void;
  onClearAll: () => void;
}> = ({ isOpen, onClose, notifications, onMarkAsRead, onClearAll }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[300] flex items-start justify-end p-4 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          className="bg-slate-900 border border-white/10 w-full max-w-sm rounded-[32px] shadow-2xl overflow-hidden mt-20"
          onClick={e => e.stopPropagation()}
        >
          <div className="p-6 border-b border-white/5 flex items-center justify-between bg-slate-950/50">
            <div>
              <h3 className="text-lg font-black text-white uppercase tracking-tighter">Thông báo</h3>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                {notifications.filter(n => !n.isRead).length} thông báo mới
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={onClearAll}
                className="p-2 hover:bg-white/5 rounded-xl text-slate-500 hover:text-red-500 transition-all"
                title="Xóa tất cả"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white/5 rounded-xl text-slate-500 hover:text-white transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
            {notifications.length === 0 ? (
              <div className="p-12 text-center">
                <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-600">
                  <BellOff className="w-8 h-8" />
                </div>
                <p className="text-slate-500 text-sm font-medium">Không có thông báo nào</p>
              </div>
            ) : (
              <div className="divide-y divide-white/5">
                {notifications.map(notification => (
                  <div 
                    key={notification.id}
                    className={`p-5 hover:bg-white/5 transition-all cursor-pointer relative group ${!notification.isRead ? 'bg-blue-600/5' : ''}`}
                    onClick={() => onMarkAsRead(notification.id)}
                  >
                    {!notification.isRead && (
                      <div className="absolute left-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                    )}
                    <div className="flex gap-4">
                      <div className={`w-10 h-10 rounded-xl shrink-0 flex items-center justify-center ${
                        notification.type === 'success' ? 'bg-emerald-500/10 text-emerald-500' :
                        notification.type === 'warning' ? 'bg-amber-500/10 text-amber-500' :
                        notification.type === 'error' ? 'bg-red-500/10 text-red-500' :
                        'bg-blue-500/10 text-blue-500'
                      }`}>
                        {notification.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> :
                         notification.type === 'warning' ? <AlertCircle className="w-5 h-5" /> :
                         notification.type === 'error' ? <XCircle className="w-5 h-5" /> :
                         <Info className="w-5 h-5" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-sm font-bold text-white truncate pr-4">{notification.title}</h4>
                          <span className="text-[9px] text-slate-500 font-medium whitespace-nowrap">{notification.date}</span>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">{notification.message}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {notifications.length > 0 && (
            <div className="p-4 bg-slate-950/50 border-t border-white/5">
              <button 
                onClick={onClose}
                className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white text-[10px] font-black uppercase tracking-widest transition-all border border-white/10"
              >
                Đóng
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const BeforeAfterSlider: React.FC<{ before: string; after: string; title?: string }> = ({ before, after, title }) => {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const position = ((x - rect.left) / rect.width) * 100;
    setSliderPos(Math.min(Math.max(position, 0), 100));
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-video rounded-[32px] overflow-hidden cursor-col-resize select-none group"
      onMouseMove={handleMove}
      onTouchMove={handleMove}
    >
      <img src={after} alt="After" className="absolute inset-0 w-full h-full object-cover" />
      <div 
        className="absolute inset-0 w-full h-full overflow-hidden"
        style={{ width: `${sliderPos}%` }}
      >
        <img src={before} alt="Before" className="absolute inset-0 w-full h-full object-cover max-w-none" style={{ width: containerRef.current?.offsetWidth }} />
      </div>
      <div 
        className="absolute inset-y-0 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] z-10"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-xl flex items-center justify-center">
          <div className="flex gap-0.5">
            <div className="w-0.5 h-3 bg-slate-400 rounded-full" />
            <div className="w-0.5 h-3 bg-slate-400 rounded-full" />
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase text-white tracking-widest">Trước</div>
      <div className="absolute bottom-4 right-4 bg-blue-600/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase text-white tracking-widest">Sau</div>
      {title && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-white uppercase tracking-tighter">
          {title}
        </div>
      )}
    </div>
  );
};

const FloatingSocialButtons: React.FC<{ zaloNumber?: string; facebookUrl?: string }> = ({ zaloNumber, facebookUrl }) => {
  return (
    <div className="fixed bottom-6 right-6 z-[200] flex flex-col gap-3">
      {zaloNumber && (
        <motion.a
          href={`https://zalo.me/${zaloNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          className="w-14 h-14 bg-blue-500 rounded-full shadow-2xl flex items-center justify-center text-white overflow-hidden border-2 border-white/20"
        >
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Icon_of_Zalo.svg/1200px-Icon_of_Zalo.svg.png" alt="Zalo" className="w-full h-full object-cover" />
        </motion.a>
      )}
      {facebookUrl && (
        <motion.a
          href={facebookUrl}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          className="w-14 h-14 bg-[#1877F2] rounded-full shadow-2xl flex items-center justify-center text-white border-2 border-white/20"
        >
          <Facebook className="w-7 h-7" />
        </motion.a>
      )}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        className="w-14 h-14 bg-slate-900/80 backdrop-blur-md rounded-full shadow-2xl flex items-center justify-center text-white border-2 border-white/10"
      >
        <ArrowUp className="w-6 h-6" />
      </motion.button>
    </div>
  );
};

const BookingModal: React.FC<{ 
  isOpen: boolean; 
  onClose: () => void; 
  services: Service[];
  siteConfig: SiteConfig;
  setSiteConfig: React.Dispatch<React.SetStateAction<SiteConfig>>;
  handlePayment: (serviceName: string, price: string, customerName: string, customerEmail?: string) => Promise<void>;
  preSelectedSubService?: string;
  onAddNotification?: (notification: Omit<AppNotification, 'id' | 'date' | 'isRead'>) => void;
  scrollToSection: (id: string) => void;
}> = ({ isOpen, onClose, services, siteConfig, setSiteConfig, handlePayment, preSelectedSubService, onAddNotification, scrollToSection }) => {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [errors, setErrors] = useState<{ phone?: string; email?: string }>({});
  const [formData, setFormData] = useState<BookingData>({
    name: '', phone: '', email: '', carModel: '', serviceId: services[0]?.id || '', subServiceTitle: preSelectedSubService, date: '', time: '', note: ''
  });

  useEffect(() => {
    if (preSelectedSubService) {
      setFormData(prev => ({ ...prev, subServiceTitle: preSelectedSubService }));
    }
  }, [preSelectedSubService]);

  if (!isOpen) return null;

  const validateStep = (currentStep: number) => {
    const newErrors: { phone?: string; email?: string } = {};
    if (currentStep === 1) {
      const phoneRegex = /^(0[3|5|7|8|9])[0-9]{8}$/;
      if (!phoneRegex.test(formData.phone)) {
        newErrors.phone = 'SĐT không hợp lệ';
      }
      if (formData.email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
          newErrors.email = 'Email sai định dạng';
        }
      }
      if (!formData.name || !formData.carModel) return false;
    }
    if (currentStep === 2) {
      if (!formData.serviceId) return false;
    }
    if (currentStep === 3) {
      if (!formData.date || !formData.time) return false;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(prev => prev + 1);
    } else {
      toast.error('Vui lòng điền đầy đủ thông tin hợp lệ');
    }
  };

  const prevStep = () => setStep(prev => prev - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) return;
    setIsSending(true);
    const service = services.find(s => s.id === formData.serviceId);
    const serviceTitle = service?.title || 'Chưa chọn';
    const fullServiceTitle = formData.subServiceTitle ? `${serviceTitle} (${formData.subServiceTitle})` : serviceTitle;
    const subject = `[ĐẶT LỊCH ${siteConfig.siteName.toUpperCase()}] - ${formData.name}`;
    
    const adminHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">Yêu cầu đặt lịch mới</h2>
        <p><strong>Họ tên:</strong> ${formData.name}</p>
        <p><strong>SĐT:</strong> ${formData.phone}</p>
        <p><strong>Email:</strong> ${formData.email || 'Không cung cấp'}</p>
        <p><strong>Dòng xe:</strong> ${formData.carModel}</p>
        <p><strong>Dịch vụ:</strong> ${fullServiceTitle}</p>
        <p><strong>Ngày:</strong> ${formData.date}</p>
        <p><strong>Giờ:</strong> ${formData.time || 'Chưa chọn'}</p>
        <p><strong>Ghi chú:</strong> ${formData.note}</p>
        <div style="margin-top: 20px; font-size: 12px; color: #666;">
          Đây là email tự động từ hệ thống website ${siteConfig.siteName}.
        </div>
      </div>
    `;

    const customerHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">Xác nhận đặt lịch thành công</h2>
        <p>Chào <strong>${formData.name}</strong>,</p>
        <p>Cảm ơn bạn đã tin tưởng và đặt lịch tại <strong>${siteConfig.siteName}</strong>. Chúng tôi đã nhận được yêu cầu của bạn với thông tin sau:</p>
        <div style="background: #f9fafb; padding: 15px; border-radius: 8px; margin: 15px 0;">
          <p style="margin: 5px 0;"><strong>Dịch vụ:</strong> ${fullServiceTitle}</p>
          <p style="margin: 5px 0;"><strong>Ngày hẹn:</strong> ${formData.date}</p>
          <p style="margin: 5px 0;"><strong>Giờ hẹn:</strong> ${formData.time || 'Chưa chọn'}</p>
          <p style="margin: 5px 0;"><strong>Dòng xe:</strong> ${formData.carModel}</p>
        </div>
        <p>Nhân viên của chúng tôi sẽ liên hệ lại với bạn qua số điện thoại <strong>${formData.phone}</strong> để xác nhận lịch hẹn trong thời gian sớm nhất.</p>
        <p>Trân trọng,<br/>Đội ngũ ${siteConfig.siteName}</p>
      </div>
    `;
    
    try {
      // Gửi email cho Admin
      fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: siteConfig.contactEmail || 'carwash68.vn@gmail.com',
          subject: subject,
          html: adminHtml,
          isBooking: true
        })
      }).catch(err => console.error("Admin email failed", err));

      // Gửi email cho khách hàng nếu có
      if (formData.email) {
        fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: formData.email,
            subject: `[XÁC NHẬN] Đặt lịch thành công tại ${siteConfig.siteName}`,
            html: customerHtml
          })
        }).catch(err => console.error("Customer email failed", err));
      }
      
      // Sync with Admin Appointments
      const newAppointment: Appointment = {
        id: Date.now().toString(),
        customerName: formData.name,
        phone: formData.phone,
        email: formData.email,
        carModel: formData.carModel,
        serviceId: formData.serviceId,
        subServiceTitle: formData.subServiceTitle,
        date: formData.date,
        time: formData.time,
        status: 'pending',
        note: formData.note,
        createdAt: new Date().toISOString(),
        isRead: false
      };
      setSiteConfig(prev => ({
        ...prev,
        appointments: [newAppointment, ...(prev.appointments || [])]
      }));

      if (onAddNotification) {
        onAddNotification({
          title: 'Đặt lịch thành công',
          message: `Lịch hẹn dịch vụ ${fullServiceTitle} vào lúc ${formData.time} ngày ${formData.date} đã được gửi đi.`,
          type: 'success'
        });
      }

      toast.success('Đặt lịch thành công!');
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error in submission:", error);
      toast.error('Có lỗi xảy ra, vui lòng thử lại sau');
    } finally {
      setIsSending(false);
    }
  };

  const selectedService = services.find(s => s.id === formData.serviceId);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-slate-900 border border-white/10 p-0 rounded-[40px] shadow-2xl max-w-lg w-full relative overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="p-8 border-b border-white/5 bg-slate-950/50 flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Đặt Lịch Chăm Sóc</h3>
                <div className="flex gap-2 mt-2">
                  {[1, 2, 3, 4].map(i => (
                    <div 
                      key={i} 
                      className={`h-1 rounded-full transition-all duration-500 ${
                        i === step ? 'w-8 bg-blue-600' : 
                        i < step ? 'w-4 bg-emerald-500' : 'w-4 bg-slate-800'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-xl text-slate-500 hover:text-white transition-all">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-8 overflow-y-auto custom-scrollbar flex-1">
              {!isSubmitted ? (
                <div className="space-y-6">
                  {step === 1 && (
                    <motion.div 
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      className="space-y-4"
                    >
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-500">
                          <User className="w-5 h-5" />
                        </div>
                        <h4 className="text-lg font-bold text-white">Thông tin khách hàng</h4>
                      </div>
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">Họ và tên</label>
                          <input required type="text" placeholder="Nhập họ tên của bạn..." value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-2xl px-5 py-4 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">Số điện thoại</label>
                            <input 
                              required 
                              type="tel" 
                              placeholder="090..." 
                              value={formData.phone} 
                              onChange={e => {
                                setFormData({...formData, phone: e.target.value});
                                if (errors.phone) setErrors({...errors, phone: undefined});
                              }} 
                              className={`w-full bg-slate-950 border ${errors.phone ? 'border-red-500' : 'border-white/10'} rounded-2xl px-5 py-4 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all`} 
                            />
                            {errors.phone && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.phone}</p>}
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">Email (Tùy chọn)</label>
                            <input 
                              type="email" 
                              placeholder="example@gmail.com" 
                              value={formData.email} 
                              onChange={e => {
                                setFormData({...formData, email: e.target.value});
                                if (errors.email) setErrors({...errors, email: undefined});
                              }} 
                              className={`w-full bg-slate-950 border ${errors.email ? 'border-red-500' : 'border-white/10'} rounded-2xl px-5 py-4 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all`} 
                            />
                            {errors.email && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.email}</p>}
                          </div>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">Dòng xe</label>
                          <input required type="text" placeholder="VD: Mercedes S450, BMW X5..." value={formData.carModel} onChange={e => setFormData({...formData, carModel: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-2xl px-5 py-4 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div 
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      className="space-y-4"
                    >
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-emerald-600/20 flex items-center justify-center text-emerald-500">
                          <Zap className="w-5 h-5" />
                        </div>
                        <h4 className="text-lg font-bold text-white">Chọn dịch vụ</h4>
                      </div>
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">Dịch vụ chính</label>
                          <select value={formData.serviceId} onChange={e => setFormData({...formData, serviceId: e.target.value, subServiceTitle: undefined})} className="w-full bg-slate-950 border border-white/10 rounded-2xl px-5 py-4 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all appearance-none">
                            {services.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
                          </select>
                        </div>

                        {selectedService?.subServices && (
                          <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">Gói nâng cấp (Tùy chọn)</label>
                            <div className="grid grid-cols-1 gap-2">
                              {selectedService.subServices.map((sub, idx) => (
                                <button
                                  key={idx}
                                  type="button"
                                  onClick={() => setFormData({...formData, subServiceTitle: formData.subServiceTitle === sub.title ? undefined : sub.title})}
                                  className={`p-4 rounded-2xl border transition-all text-left flex items-center justify-between group ${
                                    formData.subServiceTitle === sub.title 
                                    ? 'bg-blue-600/10 border-blue-500 text-white' 
                                    : 'bg-slate-950 border-white/5 text-slate-400 hover:border-white/20'
                                  }`}
                                >
                                  <div>
                                    <p className="font-bold text-sm">{sub.title}</p>
                                    <p className="text-[10px] text-blue-500 font-black uppercase tracking-widest mt-1">{sub.price}</p>
                                  </div>
                                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                                    formData.subServiceTitle === sub.title ? 'bg-blue-500 border-blue-500' : 'border-white/10'
                                  }`}>
                                    {formData.subServiceTitle === sub.title && <Check className="w-3 h-3 text-white" />}
                                  </div>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div 
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      className="space-y-4"
                    >
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-amber-600/20 flex items-center justify-center text-amber-500">
                          <Clock className="w-5 h-5" />
                        </div>
                        <h4 className="text-lg font-bold text-white">Thời gian hẹn</h4>
                      </div>
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">Ngày hẹn</label>
                            <input required type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-2xl px-5 py-4 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">Giờ ưu tiên</label>
                            <input required type="time" value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-2xl px-5 py-4 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">Ghi chú thêm</label>
                          <textarea placeholder="Bạn có yêu cầu đặc biệt nào không?" value={formData.note} onChange={e => setFormData({...formData, note: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-2xl px-5 py-4 text-white h-32 resize-none focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {step === 4 && (
                    <motion.div 
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      className="space-y-6"
                    >
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-500">
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <h4 className="text-lg font-bold text-white">Xác nhận thông tin</h4>
                      </div>
                      <div className="bg-slate-950/50 border border-white/5 rounded-[32px] p-6 space-y-4">
                        <div className="flex justify-between items-start border-b border-white/5 pb-4">
                          <div>
                            <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-1">Khách hàng</p>
                            <p className="text-white font-bold">{formData.name}</p>
                            <p className="text-slate-400 text-xs">{formData.phone}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-1">Dòng xe</p>
                            <p className="text-white font-bold">{formData.carModel}</p>
                          </div>
                        </div>
                        <div className="flex justify-between items-start border-b border-white/5 pb-4">
                          <div>
                            <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-1">Dịch vụ</p>
                            <p className="text-white font-bold">{selectedService?.title}</p>
                            {formData.subServiceTitle && <p className="text-blue-500 text-xs font-bold">{formData.subServiceTitle}</p>}
                          </div>
                          <div className="text-right">
                            <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-1">Thời gian</p>
                            <p className="text-white font-bold">{formData.time}</p>
                            <p className="text-slate-400 text-xs">{formData.date}</p>
                          </div>
                        </div>
                        {formData.note && (
                          <div>
                            <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-1">Ghi chú</p>
                            <p className="text-slate-400 text-xs italic">"{formData.note}"</p>
                          </div>
                        )}
                      </div>
                      <div className="p-4 bg-blue-600/10 border border-blue-500/20 rounded-2xl flex gap-3">
                        <Info className="w-5 h-5 text-blue-500 shrink-0" />
                        <p className="text-[10px] text-blue-400 leading-relaxed font-medium">
                          Bằng cách nhấn "Xác nhận đặt lịch", bạn đồng ý với các điều khoản dịch vụ của chúng tôi. Chúng tôi sẽ liên hệ lại để xác nhận trong vòng 30 phút.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-emerald-600/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 text-5xl animate-bounce">✓</div>
                  <h3 className="text-3xl font-black text-white mb-4 uppercase tracking-tighter">Đặt lịch thành công!</h3>
                  <p className="text-slate-400 mb-10 text-lg">Yêu cầu của bạn đã được gửi tới hệ thống. Đội ngũ chuyên gia sẽ liên hệ lại với bạn trong thời gian sớm nhất qua số điện thoại <strong>{formData.phone}</strong>.</p>
                  
                  <div className="flex flex-col gap-4">
                    <button 
                      onClick={() => {
                        handlePayment(selectedService?.title || 'Dịch vụ Detailing', selectedService?.price || '0', formData.name, formData.email);
                      }}
                      className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-5 rounded-2xl uppercase tracking-widest transition-all shadow-2xl shadow-blue-900/40 active:scale-95 flex items-center justify-center gap-3 group"
                    >
                      <CreditCard className="w-6 h-6" /> Thanh Toán Online Ngay
                    </button>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <button 
                        onClick={() => {
                          onClose();
                          scrollToSection('tracking');
                        }}
                        className="py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white text-[10px] font-black uppercase tracking-widest transition-all border border-white/10 flex items-center justify-center gap-2"
                      >
                        <Timer className="w-4 h-4" /> Theo Dõi Xe
                      </button>
                      <button 
                        onClick={onClose}
                        className="py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white text-[10px] font-black uppercase tracking-widest transition-all border border-white/10"
                      >
                        Đóng
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Actions */}
            {!isSubmitted && (
              <div className="p-8 border-t border-white/5 bg-slate-950/50 flex gap-4">
                {step > 1 && (
                  <button 
                    onClick={prevStep}
                    className="flex-1 py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white text-[10px] font-black uppercase tracking-widest transition-all border border-white/10 flex items-center justify-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" /> Quay lại
                  </button>
                )}
                <button 
                  onClick={step === 4 ? handleSubmit : nextStep}
                  disabled={isSending}
                  className="flex-[2] bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-black py-4 rounded-2xl uppercase tracking-widest transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2 group"
                >
                  {isSending ? (
                    <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      {step === 4 ? 'Xác nhận đặt lịch' : 'Tiếp theo'}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ServiceDetailsModal: React.FC<{ 
  isOpen: boolean; 
  onClose: () => void; 
  service: Service | null; 
  onBooking: (serviceId: string, subServiceTitle?: string) => void;
  onAiChat: (service: Service) => void;
}> = ({ isOpen, onClose, service, onBooking, onAiChat }) => {
  if (!isOpen || !service) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[250] flex items-center justify-center p-0 sm:p-4 bg-slate-950/95 backdrop-blur-2xl"
      >
        <div className="absolute inset-0" onClick={onClose} />
        <motion.div 
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="bg-slate-900 border-t sm:border border-white/10 rounded-t-[40px] sm:rounded-[48px] shadow-[0_0_100px_rgba(0,0,0,0.5)] max-w-6xl w-full h-full sm:h-[90vh] overflow-hidden relative flex flex-col"
        >
          {/* Close Button */}
          <button 
            onClick={onClose} 
            className="absolute top-6 right-6 z-50 bg-black/50 hover:bg-red-600 backdrop-blur-xl p-3 rounded-2xl text-white transition-all shadow-2xl active:scale-90"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="flex flex-col lg:flex-row min-h-full">
              {/* Left Column: Content */}
              <div className="flex-1">
                {/* Hero Image */}
                <div className="w-full h-[300px] sm:h-[550px] relative">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
                  <div className="absolute bottom-12 left-8 sm:left-16 right-8 sm:right-16">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="flex items-center gap-4 mb-6">
                        <div className="bg-blue-600/20 backdrop-blur-2xl border border-blue-500/30 p-4 sm:p-5 rounded-2xl sm:rounded-[32px]">
                          <span className="text-4xl sm:text-6xl">{service.icon}</span>
                        </div>
                        <div>
                          <span className="text-blue-500 font-black uppercase tracking-[0.4em] text-[11px] mb-2 block">Premium Detailing</span>
                          <h3 className="text-3xl sm:text-8xl font-black text-white uppercase tracking-tighter leading-[0.85]">{service.title}</h3>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>

                <div className="p-6 sm:p-16 space-y-12 sm:space-y-16">
                  {/* Description Section */}
                  <section className="max-w-3xl">
                    <h4 className="text-[11px] font-black text-blue-500 uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
                      <div className="w-8 h-[1px] bg-blue-500/30"></div>
                      Giới thiệu dịch vụ
                    </h4>
                    <p className="text-slate-300 leading-relaxed text-lg sm:text-2xl font-medium italic serif">
                      "{service.description}"
                    </p>
                  </section>

                  {/* Upgrade Packages Section */}
                  {service.subServices && service.subServices.length > 0 && (
                    <section>
                      <h4 className="text-[11px] font-black text-blue-500 uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
                        <div className="w-8 h-[1px] bg-blue-500/30"></div>
                        Các gói nâng cấp & Báo giá
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {service.subServices.map((sub, idx) => (
                          <motion.div 
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="p-6 sm:p-8 rounded-[32px] sm:rounded-[40px] bg-white/5 border border-white/5 flex flex-col justify-between group hover:bg-blue-600/10 hover:border-blue-500/30 transition-all"
                          >
                            <div className="mb-8">
                              <div className="flex justify-between items-start mb-4">
                                <div className="w-14 h-14 rounded-2xl bg-slate-950 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                                  <Zap className="w-7 h-7" />
                                </div>
                                <div className="text-right">
                                  <p className="text-blue-500 font-black text-2xl tracking-tighter">{sub.price}</p>
                                  <p className="text-[9px] text-slate-600 uppercase font-black tracking-widest">Trọn gói</p>
                                </div>
                              </div>
                              <h5 className="text-white font-black text-xl mb-2 group-hover:text-blue-400 transition-colors uppercase tracking-tight">{sub.title}</h5>
                              {sub.note && <p className="text-sm text-slate-400 font-medium leading-relaxed">{sub.note}</p>}
                            </div>
                            <button 
                              onClick={() => { onBooking(service.id, sub.title); onClose(); }}
                              className="w-full py-4 bg-white/5 hover:bg-blue-600 text-white text-[11px] font-black uppercase tracking-widest rounded-2xl transition-all active:scale-95 border border-white/10 hover:border-transparent group-hover:shadow-xl group-hover:shadow-blue-600/20"
                            >
                              Chọn gói này
                            </button>
                          </motion.div>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Features / Benefits */}
                  <section className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="p-8 rounded-[40px] bg-slate-800/30 border border-white/5">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 flex items-center justify-center text-emerald-500 mb-6">
                        <ShieldCheck className="w-6 h-6" />
                      </div>
                      <h5 className="text-white font-black uppercase tracking-tight mb-2">Cam kết chất lượng</h5>
                      <p className="text-slate-400 text-sm leading-relaxed">Sử dụng 100% hóa chất nhập khẩu chính hãng, an toàn cho bề mặt xe và sức khỏe người dùng.</p>
                    </div>
                    <div className="p-8 rounded-[40px] bg-slate-800/30 border border-white/5">
                      <div className="w-12 h-12 rounded-2xl bg-amber-600/20 flex items-center justify-center text-amber-500 mb-6">
                        <Clock className="w-6 h-6" />
                      </div>
                      <h5 className="text-white font-black uppercase tracking-tight mb-2">Bảo hành dài hạn</h5>
                      <p className="text-slate-400 text-sm leading-relaxed">Chế độ bảo hành điện tử minh bạch, hỗ trợ bảo trì định kỳ miễn phí cho các gói cao cấp.</p>
                    </div>
                  </section>
                </div>
              </div>

              {/* Right Column: Sidebar */}
              <div className="w-full lg:w-[400px] border-t lg:border-t-0 lg:border-l border-white/5 bg-slate-900/50 backdrop-blur-3xl p-8 sm:p-12 lg:sticky lg:top-0 lg:h-screen flex flex-col justify-between">
                <div className="space-y-12">
                  <div className="text-center lg:text-left">
                    <span className="text-blue-500 font-black uppercase tracking-[0.2em] text-[10px] mb-4 block">Báo giá cơ bản</span>
                    <div className="flex items-baseline justify-center lg:justify-start gap-2">
                      <span className="text-5xl sm:text-6xl font-black text-white tracking-tighter">{service.price.split(' ')[0]}</span>
                      <span className="text-lg sm:text-xl font-black text-slate-500 uppercase">{service.price.split(' ')[1]}</span>
                    </div>
                    <p className="text-slate-500 text-[10px] sm:text-xs font-medium mt-4">Giá có thể thay đổi tùy theo kích thước và tình trạng thực tế của xe.</p>
                  </div>

                  <div className="space-y-6">
                    <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                      Quy trình thực hiện
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                      {['Kiểm tra tình trạng xe', 'Tư vấn giải pháp tối ưu', 'Vệ sinh chuyên sâu', 'Thi công kỹ thuật cao', 'Kiểm tra chất lượng (QC)'].map((step, i) => (
                        <div key={i} className="flex items-center gap-4 group">
                          <div className="w-8 h-8 rounded-lg bg-slate-800 border border-white/5 flex items-center justify-center text-[10px] font-black text-slate-500 group-hover:border-blue-500/50 group-hover:text-blue-500 transition-all shrink-0">
                            0{i + 1}
                          </div>
                          <span className="text-slate-300 text-sm font-bold group-hover:text-white transition-colors">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-12 space-y-4 sticky bottom-0 bg-slate-900/80 backdrop-blur-xl p-4 -mx-8 sm:-mx-12 lg:mx-0 lg:p-0 lg:bg-transparent lg:backdrop-blur-none lg:static">
                  <button 
                    onClick={() => { onBooking(service.id); onClose(); }}
                    className="w-full py-5 sm:py-6 bg-blue-600 hover:bg-blue-500 text-white text-xs font-black uppercase tracking-[0.2em] rounded-[20px] sm:rounded-[24px] transition-all active:scale-95 shadow-2xl shadow-blue-600/30 flex items-center justify-center gap-3"
                  >
                    <Calendar className="w-5 h-5" /> Đặt lịch ngay
                  </button>
                  <button 
                    onClick={() => { onAiChat(service); onClose(); }}
                    className="w-full py-5 sm:py-6 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black uppercase tracking-[0.2em] rounded-[20px] sm:rounded-[24px] transition-all active:scale-95 shadow-2xl shadow-emerald-600/30 flex items-center justify-center gap-3"
                  >
                    <Bot className="w-5 h-5" /> Tư vấn với AI
                  </button>
                  <button 
                    onClick={onClose}
                    className="w-full py-5 sm:py-6 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white text-xs font-black uppercase tracking-[0.2em] rounded-[20px] sm:rounded-[24px] transition-all"
                  >
                    Quay lại
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const AiServiceChatModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  service: Service | null;
  aiMessages: Message[];
  aiInput: string;
  setAiInput: (v: string) => void;
  handleAiChat: (customInput?: string) => void;
  isAiLoading: boolean;
  aiProvider: AIProvider;
  setAiProvider: (v: AIProvider) => void;
  clearChat: () => void;
  chatEndRef: React.RefObject<HTMLDivElement>;
}> = ({ 
  isOpen, onClose, service, aiMessages, aiInput, setAiInput, 
  handleAiChat, isAiLoading, aiProvider, setAiProvider, clearChat, chatEndRef 
}) => {
  if (!isOpen || !service) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[300] flex items-center justify-center p-0 sm:p-4 bg-slate-950/95 backdrop-blur-2xl"
      >
        <div className="absolute inset-0" onClick={onClose} />
        <motion.div 
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="bg-slate-900 border-t sm:border border-white/10 rounded-t-[40px] sm:rounded-[48px] shadow-[0_0_100px_rgba(0,0,0,0.5)] max-w-4xl w-full h-full sm:h-[85vh] overflow-hidden relative flex flex-col"
        >
          {/* Header */}
          <div className="p-6 sm:p-8 bg-white/5 border-b border-white/5 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center font-black text-xl overflow-hidden border border-white/10 shadow-lg">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-slate-900"></div>
              </div>
              <div>
                <div className="text-xs sm:text-sm font-black text-white uppercase tracking-widest">Tư vấn dịch vụ: {service.title}</div>
                <div className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">AI Advisor đang trực tuyến</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <select 
                value={aiProvider}
                onChange={(e) => setAiProvider(e.target.value as AIProvider)}
                className="hidden sm:block bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-[10px] font-black uppercase tracking-widest text-slate-400 outline-none focus:border-blue-500 transition-all cursor-pointer"
              >
                <option value="gemini" className="bg-slate-900">Gemini</option>
                <option value="openai" className="bg-slate-900">OpenAI</option>
                <option value="claude" className="bg-slate-900">Claude</option>
              </select>
              <button 
                onClick={onClose} 
                className="bg-white/5 hover:bg-red-600 p-3 rounded-2xl text-white transition-all active:scale-90"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Chat Body */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-6 sm:space-y-8 custom-scrollbar bg-slate-900/50">
            {aiMessages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-6 opacity-50">
                <div className="w-20 h-20 rounded-full bg-blue-600/10 flex items-center justify-center">
                  <MessageSquare className="w-10 h-10 text-blue-500" />
                </div>
                <div className="space-y-2">
                  <p className="text-white font-black uppercase tracking-widest text-sm">Bắt đầu cuộc trò chuyện</p>
                  <p className="text-slate-500 text-xs max-w-xs">Hỏi AI bất cứ điều gì về dịch vụ {service.title} để được tư vấn chi tiết.</p>
                </div>
              </div>
            )}
            {aiMessages.map((m, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={i} 
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[85%] sm:max-w-[75%] p-4 sm:p-6 rounded-[28px] text-sm sm:text-base leading-relaxed shadow-xl ${
                  m.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none' 
                    : 'bg-slate-800/50 border border-white/5 text-slate-200 rounded-tl-none'
                }`}>
                  <ReactMarkdown>{m.text}</ReactMarkdown>
                </div>
              </motion.div>
            ))}
            {isAiLoading && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-3 ml-2"
              >
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce delay-150"></div>
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce delay-300"></div>
                </div>
                <span className="text-slate-600 text-[10px] uppercase font-black tracking-widest italic">AI đang xử lý...</span>
              </motion.div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Chat Input */}
          <div className="p-6 sm:p-8 border-t border-white/5 bg-slate-950/50 shrink-0">
            <div className="relative flex items-center gap-4">
              <input 
                value={aiInput}
                onChange={e => setAiInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleAiChat()}
                disabled={isAiLoading}
                placeholder="Nhập câu hỏi của bạn..." 
                className="flex-1 bg-slate-800/50 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-white text-sm sm:text-base placeholder:text-slate-600 disabled:opacity-50"
              />
              <button 
                onClick={() => handleAiChat()} 
                disabled={isAiLoading || !aiInput.trim()}
                className="bg-blue-600 hover:bg-blue-500 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center transition-all shadow-2xl shadow-blue-900/40 active:scale-90 group disabled:opacity-50"
              >
                <Send className="w-5 h-5 text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <button 
                onClick={clearChat}
                className="text-[9px] font-black uppercase tracking-widest text-slate-500 hover:text-red-500 transition-all flex items-center gap-2"
              >
                <Trash2 className="w-3 h-3" /> Xóa lịch sử
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
const ShareModal: React.FC<{ isOpen: boolean; onClose: () => void; url: string; title: string }> = ({ isOpen, onClose, url, title }) => {
  if (!isOpen) return null;

  const shareLinks = [
    {
      name: 'Facebook',
      icon: <Facebook className="w-5 h-5" />,
      color: 'bg-[#1877F2]',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    },
    {
      name: 'Twitter',
      icon: <Twitter className="w-5 h-5" />,
      color: 'bg-[#1DA1F2]',
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
    },
    {
      name: 'WhatsApp',
      icon: <MessageCircle className="w-5 h-5" />,
      color: 'bg-[#25D366]',
      href: `https://api.whatsapp.com/send?text=${encodeURIComponent(title + ' ' + url)}`
    }
  ];

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
      >
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl max-w-sm w-full relative"
        >
          <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors">✕</button>
          <h3 className="text-xl font-black text-white text-center mb-6 uppercase">Chia Sẻ Trang Web</h3>
          
          <div className="grid grid-cols-3 gap-4 mb-8">
            {shareLinks.map(link => (
              <a 
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 group"
              >
                <div className={`${link.color} p-4 rounded-2xl text-white shadow-lg group-hover:scale-110 transition-transform`}>
                  {link.icon}
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{link.name}</span>
              </a>
            ))}
          </div>

          <div className="relative">
            <input 
              readOnly 
              value={url}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-400 outline-none pr-12"
            />
            <button 
              onClick={() => {
                navigator.clipboard.writeText(url);
                toast.success("Đã sao chép liên kết!");
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-blue-500 hover:text-blue-400 transition-colors"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const NewsArticleModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  article: NewsArticle | null;
}> = ({ isOpen, onClose, article }) => {
  if (!isOpen || !article) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl"
      >
        <div className="absolute inset-0" onClick={onClose} />
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="bg-slate-900 border border-white/10 p-0 rounded-[32px] shadow-2xl max-w-4xl w-full relative overflow-hidden flex flex-col max-h-[90vh]"
        >
          <button onClick={onClose} className="absolute top-6 right-6 z-50 bg-black/50 hover:bg-red-600 backdrop-blur-xl p-3 rounded-2xl text-white transition-all shadow-2xl active:scale-90">
            <X className="w-6 h-6" />
          </button>
          
          <div className="overflow-y-auto custom-scrollbar">
            <div className="h-[300px] sm:h-[450px] relative">
              <img src={article.image} alt={article.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                    article.category === 'promotion' ? 'bg-red-600 text-white' : 
                    article.category === 'tip' ? 'bg-blue-600 text-white' : 'bg-emerald-600 text-white'
                  }`}>
                    {article.category === 'promotion' ? 'Khuyến mãi' : article.category === 'tip' ? 'Mẹo vặt' : 'Tin tức'}
                  </span>
                  <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {article.date}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tighter leading-tight">{article.title}</h3>
              </div>
            </div>
            
            <div className="p-8 sm:p-12">
              <div className="prose prose-invert max-w-none">
                <p className="text-slate-300 text-lg leading-relaxed mb-8 font-medium italic border-l-4 border-blue-600 pl-6">
                  {article.excerpt}
                </p>
                <div className="text-slate-400 leading-relaxed space-y-4">
                  {article.content.split('\n').map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>
              
              <div className="mt-12 pt-8 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-500">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Tác giả</p>
                    <p className="text-white font-bold">{article.author}</p>
                  </div>
                </div>
                <button 
                  onClick={onClose}
                  className="bg-white/5 hover:bg-white/10 text-white px-8 py-3 rounded-xl font-bold transition-all border border-white/10"
                >
                  Đóng bài viết
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const NewsSection: React.FC<{ 
  siteConfig: SiteConfig; 
  isEditMode: boolean; 
  isDesignAuthenticated?: boolean;
  setSiteConfig: React.Dispatch<React.SetStateAction<SiteConfig>>;
  selectedArticle: NewsArticle | null;
  setSelectedArticle: (article: NewsArticle | null) => void;
}> = ({ siteConfig, isEditMode, isDesignAuthenticated, setSiteConfig, selectedArticle, setSelectedArticle }) => {
  return (
    <section id="news" className="py-24 relative overflow-hidden bg-slate-950">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-600/10 border border-blue-500/20 mb-6"
          >
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
            <EditableText 
              text={siteConfig.newsSubtitle || "Cập nhật những kiến thức bổ ích và chương trình mới nhất từ XE ĐẸP AUTO."} 
              isEditMode={isEditMode} 
              isDesignAuthenticated={isDesignAuthenticated}
              onSave={v => setSiteConfig({...siteConfig, newsSubtitle: v})}
              className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em]"
            />
          </motion.div>
          <EditableText 
            tag="h2" 
            text={siteConfig.newsTitle || "TIN TỨC & MẸO CHĂM SÓC XE"} 
            isEditMode={isEditMode} 
            isDesignAuthenticated={isDesignAuthenticated}
            onSave={v => setSiteConfig({...siteConfig, newsTitle: v})}
            className="text-4xl sm:text-7xl font-black text-white uppercase tracking-tighter leading-none mb-8"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(siteConfig.news || []).map((article, idx) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => setSelectedArticle(article)}
              className="group cursor-pointer"
            >
              <div className="relative h-[250px] rounded-[32px] overflow-hidden mb-6 border border-white/5">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${
                    article.category === 'promotion' ? 'bg-red-600 text-white' : 
                    article.category === 'tip' ? 'bg-blue-600 text-white' : 'bg-emerald-600 text-white'
                  }`}>
                    {article.category === 'promotion' ? 'Khuyến mãi' : article.category === 'tip' ? 'Mẹo vặt' : 'Tin tức'}
                  </span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                  <Calendar className="w-3 h-3" /> {article.date}
                </div>
                <h3 className="text-xl font-black text-white group-hover:text-blue-500 transition-colors line-clamp-2 uppercase tracking-tight leading-tight">
                  {article.title}
                </h3>
                <p className="text-slate-400 text-sm line-clamp-2 leading-relaxed">
                  {article.excerpt}
                </p>
                <div className="pt-4 flex items-center gap-2 text-blue-500 font-black text-[10px] uppercase tracking-widest group-hover:gap-4 transition-all">
                  Xem chi tiết <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <NewsArticleModal 
        isOpen={!!selectedArticle} 
        onClose={() => setSelectedArticle(null)} 
        article={selectedArticle} 
      />
    </section>
  );
};

const ContactSection: React.FC<{ siteConfig: SiteConfig }> = ({ siteConfig }) => {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });
  const [errors, setErrors] = useState<{ phone?: string; email?: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const validate = () => {
    const newErrors: { phone?: string; email?: string } = {};
    
    // Phone validation (Vietnamese format: 10 digits starting with 0)
    const phoneRegex = /^(0[3|5|7|8|9])[0-9]{8}$/;
    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Số điện thoại không hợp lệ (VD: 0912345678)';
    }

    // Email validation (optional but must be correct format if provided)
    if (formData.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Email không đúng định dạng';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setIsSending(true);
    
    const subject = `[YÊU CẦU TƯ VẤN] - ${formData.name}`;
    const html = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">Yêu cầu tư vấn mới</h2>
        <p><strong>Họ tên:</strong> ${formData.name}</p>
        <p><strong>SĐT:</strong> ${formData.phone}</p>
        <p><strong>Email:</strong> ${formData.email || 'Không cung cấp'}</p>
        <p><strong>Nội dung:</strong></p>
        <div style="background: #f9fafb; padding: 15px; border-radius: 8px; margin: 15px 0;">
          ${formData.message}
        </div>
        <div style="margin-top: 20px; font-size: 12px; color: #666;">
          Đây là email tự động từ hệ thống website ${siteConfig.siteName}.
        </div>
      </div>
    `;

    try {
      // Gửi email ngầm để lưu trữ thông tin
      fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: siteConfig.contactEmail || 'carwash68.vn@gmail.com',
          subject,
          html,
          isBooking: true
        })
      }).catch(err => console.error("Email send failed", err));

      // Chuyển hướng tới Zalo để tư vấn trực tiếp
      const zaloUrl = `https://zalo.me/${siteConfig.zaloNumber || '0588896699'}`;
      window.open(zaloUrl, '_blank');
      
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error in submission:", error);
      const zaloUrl = `https://zalo.me/${siteConfig.zaloNumber || '0588896699'}`;
      window.open(zaloUrl, '_blank');
      setIsSubmitted(true);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact-form" className="py-24 relative overflow-hidden bg-slate-950">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-6 leading-none">
                Bạn cần <span className="text-blue-500">tư vấn chuyên sâu?</span>
              </h2>
              <p className="text-slate-400 text-lg mb-10 max-w-md">
                Để lại thông tin, đội ngũ chuyên gia của chúng tôi sẽ liên hệ lại với bạn trong vòng 30 phút để giải đáp mọi thắc mắc về dịch vụ.
              </p>
              <div className="space-y-8 mb-10">
                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-1">Hotline hỗ trợ 24/7</p>
                    <p className="text-xl text-white font-black">{siteConfig.contactPhone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-600/10 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-1">Email liên hệ</p>
                    <p className="text-xl text-white font-black">{siteConfig.contactEmail}</p>
                  </div>
                </div>
              </div>

              {/* Embedded Map in Contact Section */}
              <div className="rounded-[32px] overflow-hidden border border-white/10 h-64 sm:h-80 shadow-2xl group/map relative mb-6 bg-slate-900">
                <iframe 
                  src={siteConfig.mapEmbedUrl} 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer"
                  title="Bản đồ vị trí"
                  className="transition-all duration-700"
                ></iframe>
                <div className="absolute inset-0 pointer-events-none border border-white/5 rounded-[32px]"></div>
              </div>

              <div className="flex flex-wrap gap-3">
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.contactAddress)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold uppercase text-[10px] tracking-widest transition-all flex items-center gap-2 shadow-lg shadow-blue-600/20"
                >
                  Chỉ đường <ExternalLink className="w-3 h-3" />
                </a>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(siteConfig.contactAddress);
                    alert('Đã sao chép địa chỉ!');
                  }}
                  className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold uppercase text-[10px] tracking-widest transition-all flex items-center gap-2"
                >
                  Sao chép địa chỉ <Copy className="w-3 h-3" />
                </button>
              </div>
            </div>
            <div className="bg-slate-900/50 border border-white/5 p-8 md:p-12 rounded-[40px] backdrop-blur-xl relative">
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-600/20 blur-3xl rounded-full"></div>
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">Họ và tên</label>
                    <input required type="text" placeholder="Nhập họ tên của bạn..." value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-2xl px-5 py-4 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">Số điện thoại</label>
                      <input 
                        required 
                        type="tel" 
                        placeholder="090..." 
                        value={formData.phone} 
                        onChange={e => {
                          setFormData({...formData, phone: e.target.value});
                          if (errors.phone) setErrors({...errors, phone: undefined});
                        }} 
                        className={`w-full bg-slate-950 border ${errors.phone ? 'border-red-500' : 'border-white/10'} rounded-2xl px-5 py-4 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all`} 
                      />
                      {errors.phone && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.phone}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">Email</label>
                      <input 
                        type="email" 
                        placeholder="example@gmail.com" 
                        value={formData.email} 
                        onChange={e => {
                          setFormData({...formData, email: e.target.value});
                          if (errors.email) setErrors({...errors, email: undefined});
                        }} 
                        className={`w-full bg-slate-950 border ${errors.email ? 'border-red-500' : 'border-white/10'} rounded-2xl px-5 py-4 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all`} 
                      />
                      {errors.email && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.email}</p>}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">Nội dung cần tư vấn</label>
                    <textarea required placeholder="Bạn đang quan tâm đến dịch vụ nào hoặc cần hỗ trợ gì?" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-2xl px-5 py-4 text-white h-32 resize-none focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                  </div>
                  <button 
                    type="submit" 
                    disabled={isSending}
                    className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 text-white font-black py-5 rounded-2xl uppercase tracking-widest transition-all shadow-2xl shadow-blue-900/40 active:scale-95 flex items-center justify-center gap-3 group"
                  >
                    {isSending ? (
                      <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <>
                        Gửi Yêu Cầu Ngay
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-blue-600/20 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-8 text-5xl animate-bounce">✓</div>
                  <h3 className="text-3xl font-black text-white mb-4 uppercase tracking-tighter">Gửi thành công!</h3>
                  <p className="text-slate-400 mb-10 text-lg">Yêu cầu của bạn đã được gửi tới hệ thống và Zalo của chúng tôi. Đội ngũ chuyên gia sẽ liên hệ lại với bạn trong thời gian sớm nhất.</p>
                  <button onClick={() => setIsSubmitted(false)} className="bg-white/5 hover:bg-white/10 text-white px-8 py-3 rounded-xl font-bold transition-all border border-white/10">Gửi yêu cầu khác</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FilterSortBar: React.FC<{ 
  onSearchChange: (val: string) => void; 
  onSortChange: (sort: { key: string, order: 'asc' | 'desc' }) => void; 
  onCategoryChange?: (val: string) => void; 
  categories?: { value: string, label: string }[]; 
  sortOptions: { key: string, order: 'asc' | 'desc', label: string }[];
  currentSort: { key: string, order: 'asc' | 'desc' };
  currentCategory?: string;
  currentSearch: string;
  onClear: () => void;
}> = ({ onSearchChange, onSortChange, onCategoryChange, categories, sortOptions, currentSort, currentCategory, currentSearch, onClear }) => {
  const isFiltered = currentSearch || (currentCategory && currentCategory !== 'all');

  return (
    <div className="flex flex-col lg:flex-row gap-4 mb-8 bg-slate-900/30 p-4 rounded-[24px] border border-white/5">
      <div className="flex-1 relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <input 
          value={currentSearch}
          onChange={e => onSearchChange(e.target.value)}
          placeholder="Tìm kiếm theo tên, mô tả..." 
          className="w-full bg-slate-950 border border-white/10 rounded-xl py-3 pl-12 pr-10 text-sm text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
        />
        {currentSearch && (
          <button onClick={() => onSearchChange('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {categories && onCategoryChange && (
          <select 
            value={currentCategory}
            onChange={e => onCategoryChange(e.target.value)}
            className="bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400 focus:ring-2 focus:ring-blue-500 outline-none min-w-[140px]"
          >
            <option value="all">Tất cả phân loại</option>
            {categories.map(cat => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
        )}
        <select 
          value={`${currentSort.key}-${currentSort.order}`}
          onChange={e => {
            const [key, order] = e.target.value.split('-');
            onSortChange({ key, order: order as 'asc' | 'desc' });
          }}
          className="bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400 focus:ring-2 focus:ring-blue-500 outline-none min-w-[160px]"
        >
          {sortOptions.map(opt => (
            <option key={`${opt.key}-${opt.order}`} value={`${opt.key}-${opt.order}`}>{opt.label}</option>
          ))}
        </select>
        {isFiltered && (
          <button 
            onClick={onClear}
            className="px-4 py-3 rounded-xl bg-red-500/10 text-red-500 text-[10px] font-black uppercase tracking-widest border border-red-500/20 hover:bg-red-500 hover:text-white transition-all"
          >
            Xóa Lọc
          </button>
        )}
      </div>
    </div>
  );
};

const AdminDashboardModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  siteConfig: SiteConfig;
  setSiteConfig: React.Dispatch<React.SetStateAction<SiteConfig>>;
  gallery: GalleryImage[];
  setGallery: React.Dispatch<React.SetStateAction<GalleryImage[]>>;
  services: Service[];
  setServices: React.Dispatch<React.SetStateAction<Service[]>>;
  premiumSolutions: PremiumSolution[];
  setPremiumSolutions: React.Dispatch<React.SetStateAction<PremiumSolution[]>>;
  customerRecords: CustomerRecord[];
  setCustomerRecords: React.Dispatch<React.SetStateAction<CustomerRecord[]>>;
  initialTab?: 'home' | 'services' | 'premium' | 'gallery' | 'customers' | 'promotions' | 'config' | 'ai-creative' | 'maintenance' | 'appointments' | 'packages' | 'news' | 'ui-design';
  maintenancePreFill?: {brand: string, model: string, year: string, mileage: string, lastMaintenance: string, symptoms: string} | null;
  isSelectingHeroVideo: boolean;
  setIsSelectingHeroVideo: React.Dispatch<React.SetStateAction<boolean>>;
  isSelectingAiVideo: boolean;
  setIsSelectingAiVideo: React.Dispatch<React.SetStateAction<boolean>>;
  aiVideoHistory: AiVideoRecord[];
  setAiVideoHistory: React.Dispatch<React.SetStateAction<AiVideoRecord[]>>;
  setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  isDesignAuthenticated: boolean;
  setIsDesignAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  designPasswordInput: string;
  setDesignPasswordInput: React.Dispatch<React.SetStateAction<string>>;
  showDesignLock: boolean;
  setShowDesignLock: React.Dispatch<React.SetStateAction<boolean>>;
  handleDesignLogin: () => void;
  trackingData: VehicleTracking[];
  setTrackingData: React.Dispatch<React.SetStateAction<VehicleTracking[]>>;
  reviews: Review[];
  setReviews: React.Dispatch<React.SetStateAction<Review[]>>;
  inventory: InventoryItem[];
  setInventory: React.Dispatch<React.SetStateAction<InventoryItem[]>>;
  eCertificates: ECertificate[];
  setECertificates: React.Dispatch<React.SetStateAction<ECertificate[]>>;
  expenses: Expense[];
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
  t: (key: string) => string;
}> = ({ isOpen, onClose, siteConfig, setSiteConfig, gallery, setGallery, services, setServices, premiumSolutions, setPremiumSolutions, customerRecords, setCustomerRecords, initialTab = 'home', maintenancePreFill, isSelectingHeroVideo, setIsSelectingHeroVideo, isSelectingAiVideo, setIsSelectingAiVideo, aiVideoHistory, setAiVideoHistory, setIsEditMode, isDesignAuthenticated, setIsDesignAuthenticated, designPasswordInput, setDesignPasswordInput, showDesignLock, setShowDesignLock, handleDesignLogin, trackingData, setTrackingData, reviews, setReviews, inventory, setInventory, eCertificates, setECertificates, expenses, setExpenses, t }) => {
  const [activeTab, setActiveTab] = useState<'home' | 'services' | 'premium' | 'gallery' | 'customers' | 'promotions' | 'config' | 'ai-creative' | 'maintenance' | 'appointments' | 'packages' | 'tracking' | 'feedback' | 'news' | 'ui-design' | 'inventory' | 'loyalty' | 'reports' | 'ecerts' | 'expenses'>(initialTab as any);
  
  // Sorting and Filtering States
  const [sortConfig, setSortConfig] = useState<{ key: string, order: 'asc' | 'desc' }>({ key: 'id', order: 'desc' });
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterText, setFilterText] = useState('');
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiResult, setAiResult] = useState<{ type: 'image' | 'video', url: string } | null>(null);
  const [isAiProcessing, setIsAiProcessing] = useState(false);
  const [maintenanceAdvice, setMaintenanceAdvice] = useState<string | null>(null);
  const [maintenanceForm, setMaintenanceForm] = useState({
    brand: '', model: '', year: '', mileage: '', lastMaintenance: '', symptoms: ''
  });
  const [carCondition, setCarCondition] = useState('');
  const [desiredOutcome, setDesiredOutcome] = useState('');
  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);
  const [isAiGeneratingText, setIsAiGeneratingText] = useState<string | null>(null);
  const [isGalleryUploadOpen, setIsGalleryUploadOpen] = useState(false);

  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
  const [generationStatus, setGenerationStatus] = useState('');

  const [isAddingCustomer, setIsAddingCustomer] = useState(false);
  const [editingCustomerId, setEditingCustomerId] = useState<string | null>(null);
  const [customerForm, setCustomerForm] = useState<Partial<CustomerRecord>>({
    customerName: '', phone: '', licensePlate: '', carModel: '', servicesDone: [], serviceReviews: [], totalPrice: '', notes: '', rating: 5, date: new Date().toISOString().split('T')[0], discount: 0, paymentStatus: 'paid'
  });

  const calculateTotal = (selectedServices: string[], currentDiscount: number) => {
    let total = 0;
    selectedServices.forEach(sName => {
      // Find in main services
      const service = services.find(s => s.title === sName);
      if (service) {
        total += parseInt(service.price.replace(/[^0-9]/g, '')) || 0;
      } else {
        // Check sub-services
        services.forEach(s => {
          const sub = s.subServices?.find(ss => ss.title === sName);
          if (sub) {
            total += parseInt(sub.price.replace(/[^0-9]/g, '')) || 0;
          }
        });
      }
    });
    return Math.max(0, total - currentDiscount);
  };

  useEffect(() => {
    if (isAddingCustomer && customerForm.servicesDone) {
      const total = calculateTotal(customerForm.servicesDone, customerForm.discount || 0);
      if (total > 0 || customerForm.servicesDone.length > 0) {
        setCustomerForm(prev => ({ ...prev, totalPrice: total.toLocaleString('vi-VN') + ' VNĐ' }));
      }
    }
  }, [customerForm.servicesDone, customerForm.discount, isAddingCustomer]);

  const [isAddingAppointment, setIsAddingAppointment] = useState(false);
  const [editingAppointmentId, setEditingAppointmentId] = useState<string | null>(null);
  const [appointmentForm, setAppointmentForm] = useState<Partial<Appointment>>({
    customerName: '', phone: '', carModel: '', serviceId: '', subServiceTitle: '', date: '', time: '', status: 'pending', note: ''
  });

  const [isAddingPackage, setIsAddingPackage] = useState(false);
  const [editingPackageId, setEditingPackageId] = useState<string | null>(null);
  const [packageForm, setPackageForm] = useState<Partial<DetailingPackage>>({
    title: '', description: '', price: '', duration: '', features: [], isPopular: false
  });

  // const [isAuthenticated, setIsAuthenticated] = useState(true); // Removed redundant login state
  // const [passwordInput, setPasswordInput] = useState(''); // Removed redundant login state

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
      if (maintenancePreFill) {
        setMaintenanceForm(maintenancePreFill);
        setMaintenanceAdvice(null);
      }
      // Reset filters when opening
      setFilterText('');
      setFilterCategory('all');
      setSortConfig({ key: 'id', order: 'desc' });
      // Reset authentication when opening if not already authenticated
      // setIsAuthenticated(false); // Optional: require login every time
    }
  }, [isOpen, initialTab, maintenancePreFill]);

  // Reset filters when tab changes
  useEffect(() => {
    setFilterText('');
    setFilterCategory('all');
    // Default sorts for different tabs
    if (activeTab === 'customers') setSortConfig({ key: 'date', order: 'desc' });
    else if (activeTab === 'gallery') setSortConfig({ key: 'id', order: 'desc' });
    else setSortConfig({ key: 'id', order: 'desc' });
  }, [activeTab]);

  // Removed redundant login logic
  
  useEffect(() => {
    if (isOpen && activeTab === 'appointments' && siteConfig.appointments?.some(a => a.isRead === false)) {
      setSiteConfig(prev => ({
        ...prev,
        appointments: (prev.appointments || []).map(a => ({ ...a, isRead: true }))
      }));
    }
  }, [isOpen, activeTab, siteConfig.appointments, setSiteConfig]);

  if (!isOpen) return null;

  const businessTabs = [
    { id: 'home', label: t('admin_tab_overview'), icon: <Home className="w-5 h-5" /> },
    { id: 'appointments', label: t('admin_tab_appointments'), icon: <Calendar className="w-5 h-5" /> },
    { id: 'customers', label: t('admin_tab_customers'), icon: <Users className="w-5 h-5" /> },
    { id: 'inventory', label: t('admin_tab_inventory'), icon: <Boxes className="w-5 h-5" /> },
    { id: 'loyalty', label: t('admin_tab_loyalty'), icon: <Gift className="w-5 h-5" /> },
    { id: 'reports', label: t('admin_tab_reports'), icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'expenses', label: t('admin_tab_expenses'), icon: <Receipt className="w-5 h-5" /> },
    { id: 'ecerts', label: t('admin_tab_ecerts'), icon: <FileCheck className="w-5 h-5" /> },
    { id: 'tracking', label: t('admin_tab_tracking'), icon: <Timer className="w-5 h-5" /> },
    { id: 'feedback', label: t('admin_tab_feedback'), icon: <MessageSquare className="w-5 h-5" /> },
    { id: 'maintenance', label: t('admin_tab_ai_advice'), icon: <Cpu className="w-5 h-5" /> },
  ];

  const designTabs = [
    { id: 'services', label: t('admin_tab_services'), icon: <Briefcase className="w-5 h-5" /> },
    { id: 'packages', label: t('admin_tab_packages'), icon: <Package className="w-5 h-5" /> },
    { id: 'premium', label: t('admin_tab_premium'), icon: <ShieldCheck className="w-5 h-5" /> },
    { id: 'promotions', label: t('admin_tab_promotions'), icon: <Tag className="w-5 h-5" /> },
    { id: 'news', label: t('admin_tab_news'), icon: <Newspaper className="w-5 h-5" /> },
    { id: 'gallery', label: t('admin_tab_gallery'), icon: <ImageIcon className="w-5 h-5" /> },
    { id: 'ui-design', label: t('admin_tab_ui_design'), icon: <Palette className="w-5 h-5" /> },
    { id: 'ai-creative', label: t('admin_tab_ai_creative'), icon: <Sparkles className="w-5 h-5" /> },
    { id: 'config', label: t('admin_tab_config'), icon: <Settings2 className="w-5 h-5" /> },
  ];

  const handleTabClick = (tabId: any) => {
    const isDesignTab = designTabs.some(t => t.id === tabId);
    // Allow 'config' tab for all admins without extra design lock
    if (isDesignTab && !isDesignAuthenticated && tabId !== 'config') {
      setShowDesignLock(true);
      return;
    }
    setActiveTab(tabId);
    setShowDesignLock(false);
  };

  const getFilteredAndSorted = <T extends any>(
    data: T[], 
    searchKeys: (keyof T)[], 
    categoryKey?: keyof T
  ) => {
    let result = [...data];

    // Filter by text
    if (filterText) {
      const lowerText = filterText.toLowerCase();
      result = result.filter(item => 
        searchKeys.some(key => String(item[key] || '').toLowerCase().includes(lowerText))
      );
    }

    // Filter by category
    if (categoryKey && filterCategory !== 'all') {
      result = result.filter(item => (item as any)[categoryKey] === filterCategory);
    }

    // Sort
    result.sort((a, b) => {
      let valA = (a as any)[sortConfig.key];
      let valB = (b as any)[sortConfig.key];
      
      if (valA === undefined || valB === undefined) return 0;

      // Handle numeric sorting for price strings
      if (sortConfig.key === 'totalPrice') {
        valA = parseInt(String(valA).replace(/[^0-9]/g, '')) || 0;
        valB = parseInt(String(valB).replace(/[^0-9]/g, '')) || 0;
      }
      
      if (valA < valB) return sortConfig.order === 'asc' ? -1 : 1;
      if (valA > valB) return sortConfig.order === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  };

  const handleGenerateAiVideo = async () => {
    try {
      const hasKey = await window.aistudio.hasSelectedApiKey();
      if (!hasKey) {
        await window.aistudio.openSelectKey();
        // After opening, we assume they might have selected it or will try again
        return;
      }

      setIsGeneratingVideo(true);
      setGenerationStatus('Đang khởi tạo AI...');

      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      
      setGenerationStatus('Đang tạo video detailing (có thể mất vài phút)...');
      
      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: 'Cinematic high-quality close-up of a professional car detailing process, luxury car being washed with thick white foam, water droplets reflecting light, slow motion, professional lighting, 4k resolution',
        config: {
          numberOfVideos: 1,
          resolution: '1080p',
          aspectRatio: '16:9'
        }
      });

      while (!operation.done) {
        setGenerationStatus('AI đang xử lý video... Vui lòng đợi...');
        await new Promise(resolve => setTimeout(resolve, 10000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (downloadLink) {
        updateConfig('heroVideoUrl', downloadLink);
        
        // Add to history
        const newRecord: AiVideoRecord = {
          id: Date.now().toString(),
          url: downloadLink,
          prompt: 'Cinematic high-quality close-up of a professional car detailing process...',
          date: new Date().toLocaleString('vi-VN'),
          type: 'video'
        };
        setAiVideoHistory(prev => [newRecord, ...prev]);

        alert("✅ Đã tạo video mới thành công!");
      } else {
        throw new Error("Không nhận được link video");
      }
    } catch (error: any) {
      console.error(error);
      if (error.message?.includes("Requested entity was not found")) {
        alert("Lỗi: Vui lòng chọn lại API Key (Project ID không hợp lệ)");
        await window.aistudio.openSelectKey();
      } else {
        alert("Lỗi khi tạo video: " + error.message);
      }
    } finally {
      setIsGeneratingVideo(false);
      setGenerationStatus('');
    }
  };

  const updateConfig = (key: keyof SiteConfig, value: string) => {
    setSiteConfig(prev => {
      const newConfig = { ...prev, [key]: value };
      if (key === 'contactAddress') {
        // Automatically sync Google Map position when address changes
        newConfig.mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(value)}&hl=vi&t=&z=15&ie=UTF8&iwloc=&output=embed`;
      }
      return newConfig;
    });
  };

  const handleAddService = () => {
    const title = prompt("Tên dịch vụ mới:");
    if (!title) return;
    const newService: Service = {
      id: Date.now().toString(),
      title,
      description: 'Mô tả dịch vụ mới...',
      price: 'Liên hệ',
      icon: '✨',
      image: 'https://images.unsplash.com/photo-1599256621730-535171e28e50?auto=format&fit=crop&q=80&w=800'
    };
    setServices(prev => [...prev, newService]);
  };

  const handleDeleteService = (id: string) => {
    if (confirm("Xóa hoàn toàn dịch vụ này?")) {
      setServices(prev => prev.filter(s => s.id !== id));
    }
  };

  const handleDeleteGallery = (id: string) => {
    if (confirm("Xóa ảnh này?")) {
      setGallery(prev => prev.filter(g => g.id !== id));
    }
  };

  const handleAddPremium = () => {
    const title = prompt("Tên giải pháp cao cấp mới:");
    if (!title) return;
    const newItem: PremiumSolution = {
      id: Date.now().toString(),
      title,
      description: 'Mô tả giải pháp mới...',
      beforeImage: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&q=80&w=800',
      afterImage: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=800',
      process: ['Bước 1...', 'Bước 2...'],
      benefits: ['Lợi ích 1...', 'Lợi ích 2...']
    };
    setPremiumSolutions(prev => [...prev, newItem]);
  };

  const handleDeletePremium = (id: string) => {
    if (confirm("Xóa giải pháp này?")) {
      setPremiumSolutions(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleAddPromotion = () => {
    const title = prompt("Tiêu đề khuyến mãi mới:");
    if (!title) return;
    const newPromo: Promotion = {
      id: Date.now().toString(),
      title,
      description: 'Mô tả chương trình khuyến mãi...',
      image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=800',
      expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    };
    setSiteConfig(prev => ({
      ...prev,
      promotions: [...(prev.promotions || []), newPromo]
    }));
  };

  const handleDeletePromotion = (id: string) => {
    if (confirm("Xóa chương trình khuyến mãi này?")) {
      setSiteConfig(prev => ({
        ...prev,
        promotions: (prev.promotions || []).filter(p => p.id !== id)
      }));
    }
  };

  const handleAiAutoCategorize = async () => {
    if (gallery.length === 0) return;
    
    setIsAiProcessing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      const prompt = `Analyze these image titles and categorize them into: ceramic, wash, interior, film, general. Return a JSON array of objects with {id, category}. 
      Images: ${gallery.map(img => `ID: ${img.id}, Title: ${img.title}`).join('; ')}`;
      
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: { responseMimeType: "application/json" }
      });
      
      const results = JSON.parse(response.text || "[]");
      if (Array.isArray(results)) {
        setGallery(prev => prev.map(img => {
          const res = results.find(r => r.id === img.id);
          return res ? { ...img, category: res.category } : img;
        }));
        alert("✅ Đã tự động phân loại thư viện!");
      }
    } catch (error) {
      console.error(error);
      alert("Lỗi AI phân loại");
    } finally {
      setIsAiProcessing(false);
    }
  };

  const handleAiEditImage = async (imgId: string) => {
    const img = gallery.find(g => g.id === imgId);
    if (!img) return;
    
    const prompt = window.prompt("Bạn muốn AI chỉnh sửa ảnh này như thế nào? (VD: Làm cho xe bóng hơn, thêm hiệu ứng ánh sáng...)");
    if (!prompt) return;

    setIsAiProcessing(true);
    try {
      const result = await editImageWithAI(img.url, prompt);
      if (result) {
        setGallery(prev => prev.map(g => g.id === imgId ? { ...g, url: result } : g));
        alert("✅ Đã chỉnh sửa ảnh bằng AI!");
      } else {
        alert("AI không thể chỉnh sửa ảnh này.");
      }
    } catch (error) {
      console.error(error);
      alert("Lỗi AI chỉnh sửa");
    } finally {
      setIsAiProcessing(false);
    }
  };

  const handleAiGenerateText = async (field: keyof SiteConfig, label: string) => {
    const hasKey = await window.aistudio.hasSelectedApiKey();
    if (!hasKey) {
      await window.aistudio.openSelectKey();
      return;
    }

    setIsAiGeneratingText(field);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      const prompt = `Bạn là một chuyên gia marketing cho trung tâm chăm sóc xe "XE ĐẸP AUTO". 
      Hãy tạo nội dung cho trường "${label}" của website. 
      Yêu cầu: Ngôn ngữ chuyên nghiệp, hấp dẫn, chuẩn SEO, phù hợp với phong cách sang trọng và công nghệ.
      QUAN TRỌNG: Chỉ trả về nội dung văn bản thuần túy, KHÔNG có dấu ngoặc kép ở đầu/cuối, KHÔNG có định dạng Markdown, KHÔNG có lời giải thích.`;
      
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt
      });
      
      const text = response.text?.trim() || "";
      if (text) {
        updateConfig(field, text);
      }
    } catch (error: any) {
      console.error(error);
      alert("Lỗi AI: " + error.message);
    } finally {
      setIsAiGeneratingText(null);
    }
  };

  const handleAiGenerateItemText = async (
    id: string, 
    type: 'service' | 'premium' | 'promotion', 
    field: 'title' | 'description',
    label: string
  ) => {
    const hasKey = await window.aistudio.hasSelectedApiKey();
    if (!hasKey) {
      await window.aistudio.openSelectKey();
      return;
    }

    setIsAiProcessing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      let itemTitle = '';
      if (type === 'service') itemTitle = services.find(s => s.id === id)?.title || '';
      else if (type === 'premium') itemTitle = premiumSolutions.find(p => p.id === id)?.title || '';
      else if (type === 'promotion') itemTitle = (siteConfig.promotions || []).find(p => p.id === id)?.title || '';

      const prompt = `Bạn là chuyên gia marketing cho "XE ĐẸP AUTO". 
      Hãy tạo ${label} cho ${type === 'promotion' ? 'chương trình khuyến mãi' : 'dịch vụ'} "${itemTitle || 'mới'}".
      Yêu cầu: Ngôn ngữ hấp dẫn, chuyên nghiệp. 
      QUAN TRỌNG: Chỉ trả về nội dung văn bản thuần túy, KHÔNG có dấu ngoặc kép ở đầu/cuối, KHÔNG có định dạng Markdown, KHÔNG có lời giải thích.`;
      
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt
      });
      
      const text = response.text?.trim() || "";
      if (text) {
        if (type === 'service') {
          setServices(prev => prev.map(s => s.id === id ? { ...s, [field]: text } : s));
        } else if (type === 'premium') {
          setPremiumSolutions(prev => prev.map(p => p.id === id ? { ...p, [field]: text } : p));
        } else if (type === 'promotion') {
          setSiteConfig(prev => ({
            ...prev,
            promotions: (prev.promotions || []).map(p => p.id === id ? { ...p, [field]: text } : p)
          }));
        }
      }
    } catch (error: any) {
      console.error(error);
      alert("Lỗi AI: " + error.message);
    } finally {
      setIsAiProcessing(false);
    }
  };

  const handleAiCreative = async (type: 'image' | 'video') => {
    if (!aiPrompt) {
      alert("Vui lòng nhập mô tả yêu cầu!");
      return;
    }

    try {
      const hasKey = await window.aistudio.hasSelectedApiKey();
      if (!hasKey) {
        await window.aistudio.openSelectKey();
        return;
      }

      setIsAiProcessing(true);
      setAiResult(null);

      if (type === 'image') {
        const url = await generateImageWithAI(aiPrompt);
        if (url) {
          setAiResult({ type: 'image', url });
          const newRecord: AiVideoRecord = {
            id: Date.now().toString(),
            url,
            prompt: aiPrompt,
            date: new Date().toLocaleString('vi-VN'),
            type: 'image'
          };
          setAiVideoHistory(prev => [newRecord, ...prev]);
        }
      } else {
        const url = await generateVideoWithAI(aiPrompt);
        if (url) {
          setAiResult({ type: 'video', url });
          const newRecord: AiVideoRecord = {
            id: Date.now().toString(),
            url,
            prompt: aiPrompt,
            date: new Date().toLocaleString('vi-VN'),
            type: 'video'
          };
          setAiVideoHistory(prev => [newRecord, ...prev]);
        }
      }
    } catch (error: any) {
      console.error(error);
      alert("Lỗi AI: " + error.message);
    } finally {
      setIsAiProcessing(false);
    }
  };

  const handleAiSuggestPackage = async () => {
    if (!carCondition || !desiredOutcome) {
      alert("Vui lòng nhập tình trạng xe và mong muốn!");
      return;
    }
    
    setIsAiProcessing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      const prompt = `Dựa trên tình trạng xe: "${carCondition}" và mong muốn của khách hàng: "${desiredOutcome}", hãy gợi ý các gói dịch vụ detailing phù hợp từ danh sách sau: ${services.map(s => s.title).join(', ')}. Giải thích lý do tại sao các gói này phù hợp. Trả về kết quả bằng tiếng Việt, định dạng Markdown chuyên nghiệp.`;
      
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt
      });
      
      setAiSuggestion(response.text || "Không có gợi ý nào.");
    } catch (error: any) {
      console.error(error);
      alert("Lỗi AI: " + error.message);
    } finally {
      setIsAiProcessing(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[300] flex items-center justify-center p-0 md:p-4 lg:p-8"
        >
          <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl" onClick={onClose} />
          
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative w-full h-full max-w-7xl bg-slate-950 border border-white/10 md:rounded-[40px] shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col md:flex-row"
          >
            {/* Sidebar (Desktop) / Top Nav (Mobile) */}
            <div className="w-full md:w-64 lg:w-72 bg-slate-900/50 border-b md:border-b-0 md:border-r border-white/5 flex flex-col shrink-0">
              <div className="p-6 md:p-8 border-b border-white/5 flex items-center justify-between md:block">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20">
                    <Settings2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-black text-white uppercase tracking-tighter leading-none">Admin</h2>
                    <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mt-1">Control Panel</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => { setIsEditMode(false); onClose(); }}
                    className="md:hidden w-10 h-10 rounded-xl bg-red-950/20 flex items-center justify-center text-red-500"
                    title="Thoát Quản Trị"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                  <button onClick={onClose} className="md:hidden w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-x-auto md:overflow-y-auto p-2 md:p-4 flex md:flex-col gap-1 md:space-y-1 custom-scrollbar scrollbar-hide bg-slate-950 md:bg-transparent border-b md:border-b-0 border-white/5">
                <div className="px-4 py-2 hidden md:block">
                  <p className="text-[9px] font-black text-slate-600 uppercase tracking-[0.2em]">Kế Toán & Vận Hành</p>
                </div>
                {businessTabs.map(tab => {
                  const unreadCount = tab.id === 'appointments' 
                    ? (siteConfig.appointments?.filter(a => a.isRead === false).length || 0)
                    : 0;
                  
                  return (
                    <button
                      key={tab.id}
                      onClick={() => handleTabClick(tab.id as any)}
                      className={`relative whitespace-nowrap flex flex-col md:flex-row items-center gap-1 md:gap-3 px-4 py-3 md:py-3.5 rounded-xl md:rounded-2xl text-[9px] md:text-xs font-black uppercase tracking-widest transition-all group shrink-0 ${
                        activeTab === tab.id 
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                          : 'text-slate-500 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <span className={`${activeTab === tab.id ? 'text-white' : 'text-slate-600 group-hover:text-blue-500'} transition-colors`}>
                        {tab.icon}
                      </span>
                      <span className="md:inline">{tab.label}</span>
                      {unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 md:top-2 md:right-2 w-5 h-5 bg-red-600 text-white text-[10px] flex items-center justify-center rounded-full border-2 border-slate-950 animate-pulse">
                          {unreadCount}
                        </span>
                      )}
                    </button>
                  );
                })}

                <div className="w-px h-8 bg-white/5 mx-2 md:w-full md:h-px md:my-4 shrink-0" />
                
                <div className="px-4 py-2 hidden md:block">
                  <p className="text-[9px] font-black text-amber-600/70 uppercase tracking-[0.2em] flex items-center gap-2">
                    <Shield className="w-3 h-3" /> Thiết Kế & Giao Diện
                  </p>
                </div>
                {designTabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => handleTabClick(tab.id as any)}
                    className={`relative whitespace-nowrap flex flex-col md:flex-row items-center gap-1 md:gap-3 px-4 py-3 md:py-3.5 rounded-xl md:rounded-2xl text-[9px] md:text-xs font-black uppercase tracking-widest transition-all group shrink-0 ${
                      activeTab === tab.id 
                        ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/20' 
                        : 'text-slate-500 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span className={`${activeTab === tab.id ? 'text-white' : 'text-slate-600 group-hover:text-amber-500'} transition-colors`}>
                      {tab.icon}
                    </span>
                    <span className="md:inline">{tab.label}</span>
                    {!isDesignAuthenticated && (
                      <Lock className="w-2.5 h-2.5 text-slate-700 absolute top-2 right-2 hidden md:block" />
                    )}
                  </button>
                ))}
              </div>

              <div className="hidden md:block p-6 border-t border-white/5">
                <button 
                  onClick={onClose}
                  className="w-full flex items-center justify-center gap-2 px-4 py-4 rounded-2xl bg-red-950/20 text-red-500 hover:bg-red-600 hover:text-white text-[10px] font-black uppercase tracking-widest transition-all"
                >
                  <LogOut className="w-4 h-4" /> Thoát Quản Trị
                </button>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-950/50">
              {/* Content Header */}
              <div className="px-8 py-6 border-b border-white/5 flex justify-between items-center bg-slate-900/20">
                <div>
                  <h3 className="text-xl font-black text-white uppercase tracking-tighter">
                    {[...businessTabs, ...designTabs].find(t => t.id === activeTab)?.label}
                  </h3>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">
                    Quản lý hệ thống / {[...businessTabs, ...designTabs].find(t => t.id === activeTab)?.label}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  {isDesignAuthenticated && (
                    <button 
                      onClick={() => {
                        setIsDesignAuthenticated(false);
                        const isDesignTab = designTabs.some(t => t.id === activeTab);
                        if (isDesignTab) setShowDesignLock(true);
                      }}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-600/10 text-red-500 hover:bg-red-600 hover:text-white text-[9px] font-black uppercase tracking-widest transition-all"
                    >
                      <Lock className="w-3 h-3" /> Khóa Giao Diện
                    </button>
                  )}
                  <div className="hidden lg:flex flex-col items-end">
                    <span className="text-[10px] font-black text-white uppercase tracking-widest">Administrator</span>
                    <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest">Online</span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center">
                    <User className="w-5 h-5 text-slate-400" />
                  </div>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-8 custom-scrollbar relative">
                <AnimatePresence>
                  {showDesignLock && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 z-50 flex items-center justify-center p-8 bg-slate-950/90 backdrop-blur-xl"
                    >
                      <div className="max-w-sm w-full text-center">
                        <div className="w-16 h-16 rounded-2xl bg-amber-600 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-amber-600/20">
                          <Shield className="w-8 h-8 text-white" />
                        </div>
                        <h4 className="text-xl font-black text-white uppercase tracking-tighter mb-2">Chế Độ Thiết Kế</h4>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-8">Khu vực này yêu cầu mật khẩu kỹ thuật để thay đổi giao diện</p>
                        
                        <input 
                          type="password" 
                          autoFocus 
                          placeholder="Mật khẩu thiết kế" 
                          className="w-full bg-slate-900 border border-white/10 rounded-2xl p-4 text-center tracking-[0.5em] text-white text-lg outline-none focus:border-amber-500 transition-all mb-4"
                          value={designPasswordInput}
                          onChange={e => setDesignPasswordInput(e.target.value)}
                          onKeyDown={e => e.key === 'Enter' && handleDesignLogin()}
                        />
                        
                        <div className="flex gap-3">
                          <button 
                            onClick={handleDesignLogin}
                            className="flex-1 bg-amber-600 hover:bg-amber-500 text-white py-4 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all"
                          >
                            Xác Nhận
                          </button>
                          <button 
                            onClick={() => setShowDesignLock(false)}
                            className="px-6 bg-slate-800 text-slate-400 rounded-xl font-black uppercase tracking-widest text-[10px] hover:text-white transition-all"
                          >
                            Hủy
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="h-full"
                  >
                    {activeTab === 'home' && (
                      <div className="space-y-8">
                        {/* Stats Grid */}
                        {(siteConfig.appointments?.filter(a => a.isRead === false).length || 0) > 0 && (
                          <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-red-600/10 border border-red-600/20 p-4 rounded-2xl flex items-center justify-between mb-6"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center animate-bounce">
                                <Bell className="w-4 h-4 text-white" />
                              </div>
                              <div>
                                <p className="text-xs font-black text-white uppercase tracking-widest">Thông báo mới</p>
                                <p className="text-[10px] font-bold text-red-400">Bạn có {(siteConfig.appointments?.filter(a => a.isRead === false).length || 0)} lịch hẹn mới chưa xem!</p>
                              </div>
                            </div>
                            <button 
                              onClick={() => setActiveTab('appointments')}
                              className="px-4 py-2 bg-red-600 text-white text-[9px] font-black uppercase rounded-xl hover:bg-red-500 transition-all"
                            >
                              Xem ngay
                            </button>
                          </motion.div>
                        )}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                          <div className="bg-slate-900/50 border border-white/5 p-6 rounded-[32px] hover:border-blue-500/30 transition-all">
                            <div className="w-12 h-12 rounded-2xl bg-blue-600/20 flex items-center justify-center mb-4">
                              <Users className="w-6 h-6 text-blue-500" />
                            </div>
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Khách Hàng</p>
                            <p className="text-3xl font-black text-white">{customerRecords.length}</p>
                          </div>
                          <div className="bg-slate-900/50 border border-white/5 p-6 rounded-[32px] hover:border-emerald-500/30 transition-all">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 flex items-center justify-center mb-4">
                              <Calendar className="w-6 h-6 text-emerald-500" />
                            </div>
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Lịch Hẹn</p>
                            <p className="text-3xl font-black text-white">{(siteConfig.appointments || []).length}</p>
                          </div>
                          <div className="bg-slate-900/50 border border-white/5 p-6 rounded-[32px] hover:border-amber-500/30 transition-all">
                            <div className="w-12 h-12 rounded-2xl bg-amber-600/20 flex items-center justify-center mb-4">
                              <Briefcase className="w-6 h-6 text-amber-500" />
                            </div>
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Dịch Vụ</p>
                            <p className="text-3xl font-black text-white">{services.length}</p>
                          </div>
                          <div className="bg-slate-900/50 border border-white/5 p-6 rounded-[32px] hover:border-purple-500/30 transition-all">
                            <div className="w-12 h-12 rounded-2xl bg-purple-600/20 flex items-center justify-center mb-4">
                              <ImageIcon className="w-6 h-6 text-purple-500" />
                            </div>
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Media</p>
                            <p className="text-3xl font-black text-white">{gallery.length}</p>
                          </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                          <div className="bg-slate-900/50 border border-white/5 p-8 rounded-[40px]">
                            <h4 className="text-sm font-black text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                              <Zap className="w-4 h-4 text-blue-500" /> Thao Tác Nhanh
                            </h4>
                            <div className="grid grid-cols-2 gap-4">
                              <button onClick={() => setActiveTab('appointments')} className="p-4 rounded-2xl bg-slate-950 border border-white/5 hover:border-blue-500/50 transition-all text-left">
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Check</p>
                                <p className="text-xs font-bold text-white">Lịch Hẹn Mới</p>
                              </button>
                              <button onClick={() => setActiveTab('customers')} className="p-4 rounded-2xl bg-slate-950 border border-white/5 hover:border-blue-500/50 transition-all text-left">
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Add</p>
                                <p className="text-xs font-bold text-white">Khách Hàng</p>
                              </button>
                              <button onClick={() => setActiveTab('ai-creative')} className="p-4 rounded-2xl bg-slate-950 border border-white/5 hover:border-blue-500/50 transition-all text-left">
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">AI</p>
                                <p className="text-xs font-bold text-white">Tạo Nội Dung</p>
                              </button>
                              <button onClick={() => setActiveTab('config')} className="p-4 rounded-2xl bg-slate-950 border border-white/5 hover:border-blue-500/50 transition-all text-left">
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Setup</p>
                                <p className="text-xs font-bold text-white">Cấu Hình Web</p>
                              </button>
                            </div>
                          </div>

                          <div className="bg-slate-900/50 border border-white/5 p-8 rounded-[40px]">
                            <h4 className="text-sm font-black text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                              <Clock className="w-4 h-4 text-emerald-500" /> Lịch Hẹn Gần Đây
                            </h4>
                            <div className="space-y-4">
                              {(siteConfig.appointments || []).slice(0, 3).map(app => (
                                <div key={app.id} className="flex items-center justify-between p-4 rounded-2xl bg-slate-950 border border-white/5">
                                  <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-500 font-black text-[10px]">
                                      {app.date.split('-')[2]}
                                    </div>
                                    <div>
                                      <p className="text-xs font-bold text-white">{app.customerName}</p>
                                      <p className="text-[10px] text-slate-500 uppercase font-black">{app.carModel}</p>
                                    </div>
                                  </div>
                                  <span className={`text-[8px] font-black uppercase px-2 py-1 rounded-full ${
                                    app.status === 'confirmed' ? 'bg-emerald-600/20 text-emerald-400' : 'bg-amber-600/20 text-amber-400'
                                  }`}>
                                    {app.status === 'pending' ? 'Chờ' : 'OK'}
                                  </span>
                                </div>
                              ))}
                              <button onClick={() => setActiveTab('appointments')} className="w-full py-3 text-[10px] font-black text-blue-500 uppercase tracking-widest hover:text-blue-400 transition-colors">
                                Xem tất cả lịch hẹn →
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {activeTab === 'ui-design' && (
                  <div className="space-y-8 max-w-5xl">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
                      <div>
                        <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter">Thiết Kế Giao Diện</h3>
                        <p className="text-slate-500 text-[10px] md:text-[11px] font-black uppercase tracking-widest mt-1">Tùy chỉnh nội dung hiển thị trên trang chủ</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Hero Section */}
                      <div className="bg-slate-900/50 p-8 rounded-[32px] border border-white/5 space-y-6">
                        <h4 className="text-[11px] font-black uppercase text-blue-500 tracking-widest flex items-center gap-3">
                          <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)]"></span> Phần Đầu Trang (Hero)
                        </h4>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <label className="text-[9px] text-slate-500 uppercase font-black tracking-widest">Tiêu đề chính</label>
                            <input 
                              value={siteConfig.heroTitle} 
                              onChange={e => updateConfig('heroTitle', e.target.value)} 
                              className="w-full bg-slate-950 border border-white/5 rounded-xl p-4 text-white text-sm focus:ring-1 focus:ring-blue-500 outline-none"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[9px] text-slate-500 uppercase font-black tracking-widest">Mô tả ngắn</label>
                            <textarea 
                              value={siteConfig.heroDescription} 
                              onChange={e => updateConfig('heroDescription', e.target.value)} 
                              className="w-full bg-slate-950 border border-white/5 rounded-xl p-4 text-white text-sm h-24 resize-none focus:ring-1 focus:ring-blue-500 outline-none"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[9px] text-slate-500 uppercase font-black tracking-widest">Ảnh Nền Hero (Fallback)</label>
                            <div className="flex gap-2">
                              <input 
                                value={siteConfig.heroImage || ''} 
                                onChange={e => updateConfig('heroImage', e.target.value)} 
                                placeholder="URL ảnh nền..."
                                className="flex-1 bg-slate-950 border border-white/5 rounded-xl p-4 text-white text-sm focus:ring-1 focus:ring-blue-500 outline-none"
                              />
                              <label className="w-12 h-12 bg-blue-600/20 border border-blue-500/30 rounded-xl flex items-center justify-center cursor-pointer hover:bg-blue-600/40 transition-all shrink-0">
                                <input 
                                  type="file" 
                                  onChange={e => handleImageUpload(e, (b) => updateConfig('heroImage', b))} 
                                  className="hidden" 
                                  accept="image/*" 
                                />
                                <Upload className="w-5 h-5 text-blue-500" />
                              </label>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="text-[9px] text-slate-500 uppercase font-black tracking-widest">URL Video Hero</label>
                            <input 
                              value={siteConfig.heroVideoUrl || ''} 
                              onChange={e => updateConfig('heroVideoUrl', e.target.value)} 
                              placeholder="Dán link video mp4..."
                              className="w-full bg-slate-950 border border-white/5 rounded-xl p-4 text-white text-sm focus:ring-1 focus:ring-blue-500 outline-none"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Section Titles */}
                      <div className="bg-slate-900/50 p-8 rounded-[32px] border border-white/5 space-y-6">
                        <h4 className="text-[11px] font-black uppercase text-blue-500 tracking-widest flex items-center gap-3">
                          <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)]"></span> Tiêu Đề Các Mục
                        </h4>
                        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                          {[
                            { label: 'Dịch vụ', key: 'servicesTitle', subKey: 'servicesSubtitle' },
                            { label: 'Cao cấp', key: 'premiumTitle', subKey: 'premiumSubtitle' },
                            { label: 'Thư viện', key: 'galleryTitle', subKey: 'gallerySubtitle' },
                            { label: 'Đánh giá', key: 'reviewsTitle', subKey: 'reviewsSubtitle' },
                            { label: 'Cố vấn AI', key: 'aiTitle', subKey: 'aiSubtitle' },
                            { label: 'Tin tức', key: 'newsTitle', subKey: 'newsSubtitle' },
                            { label: 'Bản đồ', key: 'mapTitle', subKey: 'mapSubtitle' },
                          ].map((item) => (
                            <div key={item.key} className="p-4 bg-slate-950/50 rounded-2xl border border-white/5 space-y-3">
                              <p className="text-[10px] font-black text-white uppercase">{item.label}</p>
                              <div className="space-y-2">
                                <input 
                                  value={(siteConfig as any)[item.key] || ''} 
                                  onChange={e => updateConfig(item.key as any, e.target.value)} 
                                  placeholder="Tiêu đề chính"
                                  className="w-full bg-slate-900 border border-white/5 rounded-lg p-3 text-white text-xs outline-none"
                                />
                                <input 
                                  value={(siteConfig as any)[item.subKey] || ''} 
                                  onChange={e => updateConfig(item.subKey as any, e.target.value)} 
                                  placeholder="Tiêu đề phụ"
                                  className="w-full bg-slate-900 border border-white/5 rounded-lg p-3 text-slate-400 text-[10px] outline-none"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Specialized Services */}
                      <div className="bg-slate-900/50 p-8 rounded-[32px] border border-white/5 space-y-6 md:col-span-2">
                        <h4 className="text-[11px] font-black uppercase text-blue-500 tracking-widest flex items-center gap-3">
                          <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)]"></span> Nội Dung Dịch Vụ Đặc Thù
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {[
                            { label: 'Dán Phim Cách Nhiệt', key: 'windowTintingTitle', descKey: 'windowTintingDescription' },
                            { label: 'Wrap & PPF', key: 'wrapPPFTitle', descKey: 'wrapPPFDescription' },
                            { label: 'Nâng Cấp & Độ Xe', key: 'tuningTitle', descKey: 'tuningDescription' },
                          ].map((item) => (
                            <div key={item.key} className="p-6 bg-slate-950/50 rounded-2xl border border-white/5 space-y-4">
                              <div className="space-y-2">
                                <label className="text-[9px] text-slate-500 uppercase font-black tracking-widest">{item.label}</label>
                                <input 
                                  value={(siteConfig as any)[item.key] || ''} 
                                  onChange={e => updateConfig(item.key as any, e.target.value)} 
                                  className="w-full bg-slate-900 border border-white/5 rounded-xl p-3 text-white text-xs outline-none"
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-[9px] text-slate-500 uppercase font-black tracking-widest">Mô tả chi tiết</label>
                                <textarea 
                                  value={(siteConfig as any)[item.descKey] || ''} 
                                  onChange={e => updateConfig(item.descKey as any, e.target.value)} 
                                  className="w-full bg-slate-900 border border-white/5 rounded-xl p-3 text-slate-300 text-[10px] h-32 resize-none outline-none"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'config' && (
                  <div className="space-y-8 max-w-5xl">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
                      <div>
                        <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter">Cấu Hình Hệ Thống</h3>
                        <p className="text-slate-500 text-[10px] md:text-[11px] font-black uppercase tracking-widest mt-1">Quản lý định danh, liên hệ và bảo mật</p>
                      </div>
                      <div className="flex gap-2 w-full sm:w-auto">
                        <button onClick={onClose} className="flex-1 sm:flex-none px-6 py-3 rounded-xl md:rounded-2xl bg-slate-800 text-slate-400 font-black uppercase text-[9px] md:text-[10px] hover:text-white transition-all">Đóng</button>
                        <button onClick={() => { alert("✅ Cấu hình đã được áp dụng!"); onClose(); }} className="flex-1 sm:flex-none px-6 py-3 rounded-xl md:rounded-2xl bg-blue-600 text-white font-black uppercase text-[9px] md:text-[10px] shadow-xl hover:bg-blue-500 transition-all active:scale-95">Lưu & Áp Dụng</button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                      {/* Identity & Security */}
                      <div className="bg-slate-900/50 p-6 md:p-10 rounded-[24px] md:rounded-[40px] border border-white/5 space-y-6 md:space-y-8 flex flex-col">
                        <h4 className="text-[10px] md:text-[11px] font-black uppercase text-blue-500 tracking-[0.2em] flex items-center gap-3">
                          <span className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)]"></span> Định Danh & Bảo Mật
                        </h4>
                        <div className="space-y-4 md:space-y-6 flex-1">
                          <div className="group space-y-2">
                            <label className="text-[8px] md:text-[9px] text-slate-500 uppercase font-black tracking-widest group-focus-within:text-blue-500 transition-colors">Tên Dự Án (Site Name)</label>
                            <input 
                              value={siteConfig.siteName} 
                              onChange={e => updateConfig('siteName', e.target.value)} 
                              className="w-full bg-slate-950 border border-white/5 rounded-xl md:rounded-2xl p-4 text-white text-sm focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                            />
                          </div>
                          <div className="group space-y-2">
                            <label className="text-[8px] md:text-[9px] text-slate-500 uppercase font-black tracking-widest group-focus-within:text-blue-500 transition-colors">Logo Thương Hiệu</label>
                            <div className="flex flex-col sm:flex-row gap-3">
                              <div className="flex-1 flex gap-2">
                                <input 
                                  value={siteConfig.logoUrl || ''} 
                                  onChange={e => updateConfig('logoUrl', e.target.value)} 
                                  placeholder="Nhập URL ảnh hoặc tải lên..."
                                  className="flex-1 bg-slate-950 border border-white/5 rounded-xl md:rounded-2xl p-4 text-white text-sm focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                                />
                                <label className="w-12 h-12 md:w-14 md:h-14 bg-blue-600/20 border border-blue-500/30 rounded-xl md:rounded-2xl flex items-center justify-center cursor-pointer hover:bg-blue-600/40 transition-all shrink-0 group/upload">
                                  <input 
                                    type="file" 
                                    onChange={e => handleImageUpload(e, (b) => updateConfig('logoUrl', b))} 
                                    className="hidden" 
                                    accept="image/*" 
                                  />
                                  <Upload className="w-5 h-5 text-blue-500 group-hover/upload:scale-110 transition-transform" />
                                </label>
                              </div>
                              <div className="w-12 h-12 md:w-14 md:h-14 bg-slate-950 border border-white/5 rounded-xl md:rounded-2xl flex items-center justify-center overflow-hidden shrink-0">
                                {siteConfig.logoUrl ? (
                                  <img src={siteConfig.logoUrl} alt="Logo Preview" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                                ) : (
                                  <div className="w-full h-full bg-gradient-to-br from-blue-600 to-emerald-600 flex items-center justify-center font-black text-white text-xs">
                                    {siteConfig.siteName.charAt(0)}
                                  </div>
                                )}
                              </div>
                            </div>
                            <p className="text-[8px] text-slate-600 italic">Để trống để dùng chữ cái đầu của tên thương hiệu.</p>
                          </div>
                          <div className="group space-y-2">
                            <label className="text-[8px] md:text-[9px] text-slate-500 uppercase font-black tracking-widest group-focus-within:text-blue-500 transition-colors">Tên Bản Quyền</label>
                            <input 
                              value={siteConfig.copyright} 
                              onChange={e => updateConfig('copyright', e.target.value)} 
                              className="w-full bg-slate-950 border border-white/5 rounded-xl md:rounded-2xl p-4 text-white text-sm focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                            />
                          </div>
                          <div className="group space-y-2">
                            <label className="text-[8px] md:text-[9px] text-slate-500 uppercase font-black tracking-widest group-focus-within:text-blue-500 transition-colors">Mật Khẩu Quản Trị (Kế Toán)</label>
                            <input 
                              type="password" 
                              value={siteConfig.adminPassword} 
                              onChange={e => updateConfig('adminPassword', e.target.value)} 
                              className="w-full bg-slate-950 border border-white/5 rounded-xl md:rounded-2xl p-4 text-white text-sm focus:ring-1 focus:ring-blue-500 outline-none transition-all tracking-[0.3em] md:tracking-[0.5em]"
                            />
                          </div>
                          <div className="group space-y-2">
                            <label className="text-[8px] md:text-[9px] text-slate-500 uppercase font-black tracking-widest group-focus-within:text-blue-500 transition-colors">Mật Khẩu Thiết Kế (Giao Diện)</label>
                            <input 
                              type="password" 
                              value={siteConfig.designPassword} 
                              onChange={e => updateConfig('designPassword', e.target.value)} 
                              className="w-full bg-slate-950 border border-white/5 rounded-xl md:rounded-2xl p-4 text-white text-sm focus:ring-1 focus:ring-blue-500 outline-none transition-all tracking-[0.3em] md:tracking-[0.5em]"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Contact Info */}
                      <div className="bg-slate-900/50 p-6 md:p-10 rounded-[24px] md:rounded-[40px] border border-white/5 space-y-6 md:space-y-8 flex flex-col">
                        <h4 className="text-[10px] md:text-[11px] font-black uppercase text-blue-500 tracking-[0.2em] flex items-center gap-3">
                          <span className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)]"></span> Liên Hệ
                        </h4>
                        <div className="space-y-4 md:space-y-6 flex-1">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="group space-y-2">
                              <label className="text-[8px] md:text-[9px] text-slate-500 uppercase font-black tracking-widest group-focus-within:text-blue-500 transition-colors">Hotline</label>
                              <input value={siteConfig.contactPhone} onChange={e => updateConfig('contactPhone', e.target.value)} className="w-full bg-slate-950 border border-white/5 rounded-xl md:rounded-2xl p-4 text-white text-sm" />
                            </div>
                            <div className="group space-y-2">
                              <div className="flex justify-between items-center">
                                <label className="text-[8px] md:text-[9px] text-slate-500 uppercase font-black tracking-widest group-focus-within:text-blue-500 transition-colors">Email</label>
                                <button 
                                  onClick={async () => {
                                    if (!siteConfig.contactEmail) return alert("Vui lòng nhập email trước!");
                                    try {
                                      const res = await fetch('/api/send-email', {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({
                                          to: siteConfig.contactEmail,
                                          subject: 'Test Email from XE ĐẸP AUTO',
                                          html: '<h1>Hệ thống gửi email hoạt động tốt!</h1><p>Đây là email kiểm tra từ website của bạn.</p>'
                                        })
                                      });
                                      if (res.ok) alert("Đã gửi email kiểm tra thành công!");
                                      else {
                                        const err = await res.json();
                                        alert("Lỗi: " + (err.error || "Không rõ nguyên nhân"));
                                      }
                                    } catch (e) {
                                      alert("Lỗi kết nối server!");
                                    }
                                  }}
                                  className="text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded bg-blue-600/10 text-blue-500 hover:bg-blue-600 hover:text-white transition-all"
                                >
                                  🚀 Test Email
                                </button>
                              </div>
                              <input value={siteConfig.contactEmail} onChange={e => updateConfig('contactEmail', e.target.value)} className="w-full bg-slate-950 border border-white/5 rounded-xl md:rounded-2xl p-4 text-white text-sm" />
                            </div>
                            <div className="group space-y-2">
                              <label className="text-[8px] md:text-[9px] text-slate-500 uppercase font-black tracking-widest group-focus-within:text-blue-500 transition-colors">Giờ Mở Cửa</label>
                              <input value={siteConfig.contactHours} onChange={e => updateConfig('contactHours', e.target.value)} className="w-full bg-slate-950 border border-white/5 rounded-xl md:rounded-2xl p-4 text-white text-sm" />
                            </div>
                          </div>
                          <div className="group space-y-2">
                            <label className="text-[8px] md:text-[9px] text-slate-500 uppercase font-black tracking-widest group-focus-within:text-blue-500 transition-colors">Địa Chỉ Văn Phòng</label>
                            <textarea value={siteConfig.contactAddress} onChange={e => updateConfig('contactAddress', e.target.value)} className="w-full bg-slate-950 border border-white/5 rounded-xl md:rounded-2xl p-4 text-white text-sm h-20 resize-none" />
                            <p className="text-[8px] text-slate-600 italic">* Bản đồ Google Maps sẽ tự động cập nhật theo địa chỉ này.</p>
                          </div>
                        </div>
                      </div>

                      {/* Social Media Links */}
                      <div className="bg-slate-900/50 p-6 md:p-10 rounded-[24px] md:rounded-[40px] border border-white/5 space-y-6 md:space-y-8 flex flex-col md:col-span-2">
                        <h4 className="text-[10px] md:text-[11px] font-black uppercase text-blue-500 tracking-[0.2em] flex items-center gap-3">
                          <span className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)]"></span> Mạng Xã Hội
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 flex-1">
                          <div className="group space-y-2">
                            <label className="text-[8px] md:text-[9px] text-slate-500 uppercase font-black tracking-widest group-focus-within:text-blue-500 transition-colors flex items-center gap-2">Facebook</label>
                            <input value={siteConfig.facebookUrl} onChange={e => updateConfig('facebookUrl', e.target.value)} className="w-full bg-slate-950 border border-white/5 rounded-xl md:rounded-2xl p-4 text-white text-xs" />
                          </div>
                          <div className="group space-y-2">
                            <label className="text-[8px] md:text-[9px] text-slate-500 uppercase font-black tracking-widest group-focus-within:text-red-500 transition-colors flex items-center gap-2">YouTube</label>
                            <input value={siteConfig.youtubeUrl} onChange={e => updateConfig('youtubeUrl', e.target.value)} className="w-full bg-slate-950 border border-white/5 rounded-xl md:rounded-2xl p-4 text-white text-xs" />
                          </div>
                          <div className="group space-y-2">
                            <label className="text-[8px] md:text-[9px] text-slate-500 uppercase font-black tracking-widest group-focus-within:text-pink-500 transition-colors flex items-center gap-2">Instagram</label>
                            <input value={siteConfig.instagramUrl} onChange={e => updateConfig('instagramUrl', e.target.value)} className="w-full bg-slate-950 border border-white/5 rounded-xl md:rounded-2xl p-4 text-white text-xs" />
                          </div>
                          <div className="group space-y-2">
                            <label className="text-[8px] md:text-[9px] text-slate-500 uppercase font-black tracking-widest group-focus-within:text-emerald-500 transition-colors flex items-center gap-2">Zalo</label>
                            <input value={siteConfig.zaloNumber} onChange={e => updateConfig('zaloNumber', e.target.value)} className="w-full bg-slate-950 border border-white/5 rounded-xl md:rounded-2xl p-4 text-white text-xs" />
                          </div>
                        </div>
                      </div>

                      {/* Danger Zone */}
                      <div className="bg-red-950/20 p-6 md:p-10 rounded-[24px] md:rounded-[40px] border border-red-500/20 space-y-6 md:space-y-8 flex flex-col md:col-span-2">
                        <h4 className="text-[10px] md:text-[11px] font-black uppercase text-red-500 tracking-[0.2em] flex items-center gap-3">Tác Vụ Nguy Hiểm</h4>
                        <div className="flex flex-col lg:flex-row items-center gap-4 md:gap-8">
                          <p className="flex-1 text-[10px] md:text-[11px] text-slate-400 font-medium leading-relaxed italic">
                            Lưu ý: Các hành động dưới đây không thể hoàn tác. Mọi dữ liệu sẽ bị xóa sạch và khôi phục về trạng thái gốc.
                          </p>
                          <button 
                            onClick={() => confirm("⚠️ RESET TOÀN BỘ HỆ THỐNG?") && (localStorage.clear(), window.location.reload())} 
                            className="w-full lg:w-auto bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white border border-red-500/30 px-6 md:px-10 py-4 md:py-5 rounded-xl md:rounded-2xl text-[9px] md:text-[10px] font-black uppercase transition-all shadow-xl active:scale-95"
                          >
                            Reset Hệ Thống
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'services' && (
                  <div className="space-y-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                  <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter">Quản Lý Gói Dịch Vụ</h3>
                  <button onClick={handleAddService} className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl transition-all">➕ Thêm Gói Mới</button>
                </div>

                <FilterSortBar 
                  currentSearch={filterText}
                  onSearchChange={setFilterText}
                  currentSort={sortConfig}
                  onSortChange={setSortConfig}
                  onClear={() => { setFilterText(''); setFilterCategory('all'); }}
                  sortOptions={[
                    { key: 'title', order: 'asc', label: 'Tên A-Z' },
                    { key: 'title', order: 'desc', label: 'Tên Z-A' },
                    { key: 'price', order: 'asc', label: 'Giá tăng dần' },
                    { key: 'price', order: 'desc', label: 'Giá giảm dần' },
                    { key: 'id', order: 'desc', label: 'Mới nhất' },
                  ]}
                />

                <div className="grid grid-cols-1 gap-4">
                  {getFilteredAndSorted(services, ['title', 'description']).map(s => (
                    <div key={s.id} className="bg-slate-900/50 border border-white/5 p-4 md:p-6 rounded-[24px] md:rounded-[32px] flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8 group hover:border-blue-500/30 transition-all">
                      <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden relative group/img shrink-0">
                        <img src={s.image} className="w-full h-full object-cover" />
                        <label className="absolute inset-0 bg-blue-600/60 opacity-0 group-hover/img:opacity-100 transition-all flex items-center justify-center cursor-pointer">
                          <span className="text-[8px] font-black">SỬA</span>
                          <input type="file" onChange={e => handleImageUpload(e, (b) => setServices(prev => prev.map(ser => ser.id === s.id ? {...ser, image: b} : ser)))} className="hidden" accept="image/*" />
                        </label>
                      </div>
                      <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="flex flex-col gap-1">
                          <div className="flex justify-between items-center">
                            <label className="text-[8px] font-black uppercase text-slate-600">Icon & Tiêu đề</label>
                            <AiHelperButton 
                              onClick={() => handleAiGenerateItemText(s.id, 'service', 'title', 'Tiêu đề dịch vụ')}
                              isLoading={isAiProcessing}
                            />
                          </div>
                          <div className="flex gap-2">
                            <input value={s.icon} onChange={e => setServices(prev => prev.map(ser => ser.id === s.id ? {...ser, icon: e.target.value} : ser))} className="w-12 bg-slate-950 border border-white/5 rounded-lg p-2 text-center" />
                            <input value={s.title} onChange={e => setServices(prev => prev.map(ser => ser.id === s.id ? {...ser, title: e.target.value} : ser))} className="flex-1 bg-slate-950 border border-white/5 rounded-lg p-2 text-white font-bold" />
                          </div>
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-[8px] font-black uppercase text-slate-600">Giá hiển thị</label>
                          <input value={s.price} onChange={e => setServices(prev => prev.map(ser => ser.id === s.id ? {...ser, price: e.target.value} : ser))} className="bg-slate-950 border border-white/5 rounded-lg p-2 text-blue-400 font-bold" />
                        </div>
                        <div className="flex flex-col gap-1 sm:col-span-2">
                          <div className="flex justify-between items-center">
                            <label className="text-[8px] font-black uppercase text-slate-600">Mô tả chi tiết</label>
                            <AiHelperButton 
                              onClick={() => handleAiGenerateItemText(s.id, 'service', 'description', 'Mô tả dịch vụ')}
                              isLoading={isAiProcessing}
                            />
                          </div>
                          <input value={s.description} onChange={e => setServices(prev => prev.map(ser => ser.id === s.id ? {...ser, description: e.target.value} : ser))} className="bg-slate-950 border border-white/5 rounded-lg p-2 text-slate-400 text-sm" />
                        </div>
                      </div>
                      <button onClick={() => handleDeleteService(s.id)} className="w-12 h-12 rounded-2xl bg-red-900/20 text-red-500 hover:bg-red-600 hover:text-white transition-all flex items-center justify-center self-end md:self-center">🗑️</button>
                    </div>
                  ))}
                </div>
              </div>
            )}

                {activeTab === 'premium' && (
                  <div className="space-y-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                  <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter">Giải Pháp Detailing Cao Cấp</h3>
                  <button onClick={handleAddPremium} className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl transition-all">➕ Thêm Giải Pháp</button>
                </div>

                <FilterSortBar 
                  currentSearch={filterText}
                  onSearchChange={setFilterText}
                  currentSort={sortConfig}
                  onSortChange={setSortConfig}
                  onClear={() => { setFilterText(''); setFilterCategory('all'); }}
                  sortOptions={[
                    { key: 'title', order: 'asc', label: 'Tên A-Z' },
                    { key: 'id', order: 'desc', label: 'Mới nhất' },
                  ]}
                />

                <div className="grid grid-cols-1 gap-6">
                  {getFilteredAndSorted(premiumSolutions, ['title', 'description']).map(sol => (
                    <div key={sol.id} className="bg-slate-900/50 border border-white/5 p-6 rounded-[32px] space-y-6 group hover:border-blue-500/30 transition-all">
                      <div className="flex flex-col lg:flex-row gap-6">
                        <div className="lg:w-1/3 space-y-4">
                          <div className="grid grid-cols-2 gap-2">
                            <div className="space-y-2">
                              <label className="text-[8px] font-black uppercase text-slate-600">Ảnh Trước</label>
                              <div className="aspect-video rounded-xl overflow-hidden relative group/img">
                                <img src={sol.beforeImage} className="w-full h-full object-cover" />
                                <label className="absolute inset-0 bg-blue-600/60 opacity-0 group-hover/img:opacity-100 transition-all flex items-center justify-center cursor-pointer">
                                  <span className="text-[8px] font-black">SỬA</span>
                                  <input type="file" onChange={e => handleImageUpload(e, (b) => setPremiumSolutions(prev => prev.map(p => p.id === sol.id ? {...p, beforeImage: b} : p)))} className="hidden" accept="image/*" />
                                </label>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <label className="text-[8px] font-black uppercase text-slate-600">Ảnh Sau</label>
                              <div className="aspect-video rounded-xl overflow-hidden relative group/img">
                                <img src={sol.afterImage} className="w-full h-full object-cover" />
                                <label className="absolute inset-0 bg-blue-600/60 opacity-0 group-hover/img:opacity-100 transition-all flex items-center justify-center cursor-pointer">
                                  <span className="text-[8px] font-black">SỬA</span>
                                  <input type="file" onChange={e => handleImageUpload(e, (b) => setPremiumSolutions(prev => prev.map(p => p.id === sol.id ? {...p, afterImage: b} : p)))} className="hidden" accept="image/*" />
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <label className="text-[8px] font-black uppercase text-slate-600">Tiêu đề giải pháp</label>
                              <AiHelperButton 
                                onClick={() => handleAiGenerateItemText(sol.id, 'premium', 'title', 'Tiêu đề giải pháp')}
                                isLoading={isAiProcessing}
                              />
                            </div>
                            <input value={sol.title} onChange={e => setPremiumSolutions(prev => prev.map(p => p.id === sol.id ? {...p, title: e.target.value} : p))} className="w-full bg-slate-950 border border-white/5 rounded-lg p-3 text-white font-bold" />
                          </div>
                        </div>
                        <div className="lg:w-2/3 space-y-4">
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <label className="text-[8px] font-black uppercase text-slate-600">Mô tả tổng quan</label>
                              <AiHelperButton 
                                onClick={() => handleAiGenerateItemText(sol.id, 'premium', 'description', 'Mô tả giải pháp')}
                                isLoading={isAiProcessing}
                              />
                            </div>
                            <textarea value={sol.description} onChange={e => setPremiumSolutions(prev => prev.map(p => p.id === sol.id ? {...p, description: e.target.value} : p))} className="w-full bg-slate-950 border border-white/5 rounded-lg p-3 text-slate-400 text-sm h-20" />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="text-[8px] font-black uppercase text-slate-600">Quy trình (Mỗi dòng 1 bước)</label>
                              <textarea 
                                value={sol.process.join('\n')} 
                                onChange={e => setPremiumSolutions(prev => prev.map(p => p.id === sol.id ? {...p, process: e.target.value.split('\n')} : p))} 
                                className="w-full bg-slate-950 border border-white/5 rounded-lg p-3 text-slate-400 text-xs h-32" 
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-[8px] font-black uppercase text-slate-600">Lợi ích (Mỗi dòng 1 lợi ích)</label>
                              <textarea 
                                value={sol.benefits.join('\n')} 
                                onChange={e => setPremiumSolutions(prev => prev.map(p => p.id === sol.id ? {...p, benefits: e.target.value.split('\n')} : p))} 
                                className="w-full bg-slate-950 border border-white/5 rounded-lg p-3 text-slate-400 text-xs h-32" 
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <button onClick={() => handleDeletePremium(sol.id)} className="bg-red-900/20 text-red-500 px-6 py-2 rounded-xl text-[10px] font-black uppercase hover:bg-red-600 hover:text-white transition-all">Xóa Giải Pháp</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

                {activeTab === 'promotions' && (
                  <div className="space-y-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                  <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter">Chương Trình Khuyến Mãi</h3>
                  <button onClick={handleAddPromotion} className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl transition-all">➕ Thêm Khuyến Mãi</button>
                </div>

                <FilterSortBar 
                  currentSearch={filterText}
                  onSearchChange={setFilterText}
                  currentSort={sortConfig}
                  onSortChange={setSortConfig}
                  onClear={() => { setFilterText(''); setFilterCategory('all'); }}
                  sortOptions={[
                    { key: 'title', order: 'asc', label: 'Tên A-Z' },
                    { key: 'expiryDate', order: 'asc', label: 'Sắp hết hạn' },
                    { key: 'id', order: 'desc', label: 'Mới nhất' },
                  ]}
                />

                <div className="grid grid-cols-1 gap-6">
                  {getFilteredAndSorted(siteConfig.promotions || [], ['title', 'description']).map(promo => (
                    <div key={promo.id} className="bg-slate-900/50 border border-white/5 p-6 rounded-[32px] flex flex-col md:flex-row gap-8 group hover:border-blue-500/30 transition-all">
                      <div className="w-full md:w-64 aspect-video md:aspect-square rounded-2xl overflow-hidden relative group/img shrink-0">
                        <img src={promo.image} className="w-full h-full object-cover" />
                        <label className="absolute inset-0 bg-blue-600/60 opacity-0 group-hover/img:opacity-100 transition-all flex items-center justify-center cursor-pointer">
                          <span className="text-[10px] font-black">THAY ẢNH</span>
                          <input type="file" onChange={e => handleImageUpload(e, (b) => setSiteConfig(prev => ({
                            ...prev,
                            promotions: (prev.promotions || []).map(p => p.id === promo.id ? {...p, image: b} : p)
                          })))} className="hidden" accept="image/*" />
                        </label>
                      </div>
                      <div className="flex-1 space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <div className="flex justify-between items-center">
                              <label className="text-[8px] font-black uppercase text-slate-600">Tiêu đề</label>
                              <AiHelperButton 
                                onClick={() => handleAiGenerateItemText(promo.id, 'promotion', 'title', 'Tiêu đề khuyến mãi')}
                                isLoading={isAiProcessing}
                              />
                            </div>
                            <input 
                              value={promo.title} 
                              onChange={e => setSiteConfig(prev => ({
                                ...prev,
                                promotions: (prev.promotions || []).map(p => p.id === promo.id ? {...p, title: e.target.value} : p)
                              }))} 
                              className="w-full bg-slate-950 border border-white/5 rounded-xl p-3 text-white font-bold" 
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[8px] font-black uppercase text-slate-600">Ngày hết hạn</label>
                            <input 
                              type="date"
                              value={promo.expiryDate} 
                              onChange={e => setSiteConfig(prev => ({
                                ...prev,
                                promotions: (prev.promotions || []).map(p => p.id === promo.id ? {...p, expiryDate: e.target.value} : p)
                              }))} 
                              className="w-full bg-slate-950 border border-white/5 rounded-xl p-3 text-blue-400 font-bold" 
                            />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between items-center">
                            <label className="text-[8px] font-black uppercase text-slate-600">Mô tả khuyến mãi</label>
                            <AiHelperButton 
                              onClick={() => handleAiGenerateItemText(promo.id, 'promotion', 'description', 'Mô tả khuyến mãi')}
                              isLoading={isAiProcessing}
                            />
                          </div>
                          <textarea 
                            value={promo.description} 
                            onChange={e => setSiteConfig(prev => ({
                              ...prev,
                              promotions: (prev.promotions || []).map(p => p.id === promo.id ? {...p, description: e.target.value} : p)
                            }))} 
                            className="w-full bg-slate-950 border border-white/5 rounded-xl p-3 text-slate-400 text-sm h-24" 
                          />
                        </div>
                        <div className="flex justify-end">
                          <button onClick={() => handleDeletePromotion(promo.id)} className="bg-red-900/20 text-red-500 px-6 py-2 rounded-xl text-[10px] font-black uppercase hover:bg-red-600 hover:text-white transition-all">Xóa Khuyến Mãi</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

                {activeTab === 'news' && (
                  <NewsManagement 
                    news={siteConfig.news || []} 
                    setNews={(newNews) => setSiteConfig({ ...siteConfig, news: newNews })} 
                  />
                )}

                {activeTab === 'tracking' && (
                  <TrackingManagement trackingData={trackingData} setTrackingData={setTrackingData} />
                )}

                {activeTab === 'feedback' && (
                  <FeedbackManagement reviews={reviews} setReviews={setReviews} services={services} />
                )}

            {activeTab === 'gallery' && (
                  <div className="space-y-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                  <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter">Thư Viện Ảnh Dự Án</h3>
                  <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                    <button 
                      onClick={handleAiAutoCategorize}
                      disabled={isAiProcessing}
                      className="flex-1 sm:flex-none bg-slate-800 hover:bg-slate-700 text-blue-400 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-blue-500/20 transition-all flex items-center justify-center gap-2"
                    >
                      {isAiProcessing ? '⏳' : '🪄 AI Phân Loại'}
                    </button>
                    <button 
                      onClick={() => setIsGalleryUploadOpen(true)}
                      className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-blue-900/20 transition-all cursor-pointer text-center flex items-center justify-center gap-2 group"
                    >
                      <span className="text-lg group-hover:scale-110 transition-transform">🖼️</span>
                      {t('gallery_upload_button')}
                    </button>

                    <AnimatePresence>
                      {isGalleryUploadOpen && (
                        <GalleryUploadManager 
                          t={t}
                          categories={[
                            { value: 'ceramic', label: t('service_ceramic') },
                            { value: 'wash', label: t('service_wash') },
                            { value: 'interior', label: t('service_interior') },
                            { value: 'film', label: t('service_ppf') },
                            { value: 'general', label: t('service_other') },
                          ]}
                          onClose={() => setIsGalleryUploadOpen(false)}
                          onUpload={(newImages) => {
                            setGallery(prev => [...newImages, ...prev]);
                            toast.success(t('gallery_upload_success').replace('{{count}}', newImages.length.toString()));
                          }}
                        />
                      )}
                    </AnimatePresence>
                </div>
              </div>

                <FilterSortBar 
                  currentSearch={filterText}
                  onSearchChange={setFilterText}
                  currentSort={sortConfig}
                  onSortChange={setSortConfig}
                  currentCategory={filterCategory}
                  onCategoryChange={setFilterCategory}
                  onClear={() => { setFilterText(''); setFilterCategory('all'); }}
                  categories={[
                    { value: 'ceramic', label: 'Ceramic' },
                    { value: 'wash', label: 'Rửa xe' },
                    { value: 'interior', label: 'Nội thất' },
                    { value: 'film', label: 'Dán phim' },
                    { value: 'general', label: 'Khác' },
                  ]}
                  sortOptions={[
                    { key: 'title', order: 'asc', label: 'Tên A-Z' },
                    { key: 'id', order: 'desc', label: 'Mới nhất' },
                  ]}
                />

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
                  {getFilteredAndSorted(gallery, ['title'], 'category').map(img => (
                    <div key={img.id} className="bg-slate-900/50 border border-white/5 rounded-[20px] md:rounded-[28px] overflow-hidden group hover:border-blue-500/50 transition-all p-2 md:p-3">
                      <div className="aspect-square rounded-xl md:rounded-2xl overflow-hidden relative mb-2 md:mb-4 group/img bg-black">
                        {img.type === 'video' ? (
                          <video src={img.url} className="w-full h-full object-cover" muted loop playsInline onMouseOver={e => e.currentTarget.play()} onMouseOut={e => e.currentTarget.pause()} />
                        ) : (
                          <img src={img.url} className="w-full h-full object-cover" />
                        )}
                        <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover/img:opacity-100 transition-all flex flex-col items-center justify-center gap-2">
                          <label className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-[8px] md:text-[9px] font-black uppercase cursor-pointer shadow-xl transition-all active:scale-95">
                            Thay {img.type === 'video' ? 'Video' : 'Ảnh'}
                            <input type="file" onChange={e => handleImageUpload(e, (b) => {
                              const isVideo = e.target.files?.[0]?.type.startsWith('video/');
                              setGallery(prev => prev.map(g => g.id === img.id ? {...g, url: b, type: isVideo ? 'video' : 'image'} : g))
                            })} className="hidden" accept="image/*,video/*" />
                          </label>
                          <button 
                            onClick={() => handleAiEditImage(img.id)}
                            className="bg-slate-800 hover:bg-slate-700 text-blue-400 px-4 py-2 rounded-xl text-[8px] md:text-[9px] font-black uppercase shadow-xl transition-all active:scale-95 border border-blue-500/20"
                          >
                            🪄 AI Edit
                          </button>
                        </div>
                        <button 
                          onClick={() => handleDeleteGallery(img.id)} 
                          className="absolute top-2 right-2 bg-red-600/80 hover:bg-red-600 text-white w-6 h-6 rounded-lg text-[10px] flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-all"
                        >
                          ✕
                        </button>
                      </div>
                      <div className="space-y-2 px-1">
                        <input 
                          value={img.title} 
                          onChange={e => setGallery(prev => prev.map(g => g.id === img.id ? {...g, title: e.target.value} : g))} 
                          placeholder="Tên ảnh..."
                          className="w-full bg-slate-950/50 border border-white/5 rounded-lg p-2 text-[8px] md:text-[10px] text-white font-black uppercase text-center focus:ring-1 focus:ring-blue-500 outline-none" 
                        />
                        <select 
                          value={img.category} 
                          onChange={e => setGallery(prev => prev.map(g => g.id === img.id ? {...g, category: e.target.value} : g))}
                          className="w-full bg-slate-950/50 border border-white/5 rounded-lg p-2 text-[7px] md:text-[9px] text-slate-500 font-bold uppercase text-center focus:ring-1 focus:ring-blue-500 outline-none appearance-none"
                        >
                          <option value="ceramic">Ceramic</option>
                          <option value="wash">Rửa xe</option>
                          <option value="interior">Nội thất</option>
                          <option value="film">Dán phim</option>
                          <option value="general">Khác</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

                {activeTab === 'packages' && (
                  <div className="space-y-8">
                    <div className="flex justify-between items-center mb-8">
                      <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter">Quản Lý Gói Chăm Sóc</h3>
                      <button 
                        onClick={() => {
                          setIsAddingPackage(true);
                          setEditingPackageId(null);
                          setPackageForm({ title: '', description: '', price: '', duration: '', features: [], isPopular: false });
                        }}
                        className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg transition-all active:scale-95"
                      >
                        ➕ Thêm Gói Mới
                      </button>
                    </div>

                    {isAddingPackage ? (
                      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-900/50 border border-blue-500/30 p-8 rounded-[32px] space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase">Tên Gói</label>
                            <input value={packageForm.title} onChange={e => setPackageForm({...packageForm, title: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase">Giá</label>
                            <input value={packageForm.price} onChange={e => setPackageForm({...packageForm, price: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase">Thời gian thực hiện</label>
                            <input value={packageForm.duration} onChange={e => setPackageForm({...packageForm, duration: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white" />
                          </div>
                          <div className="flex items-center gap-3 pt-6">
                            <input type="checkbox" checked={packageForm.isPopular} onChange={e => setPackageForm({...packageForm, isPopular: e.target.checked})} className="w-5 h-5 rounded bg-slate-950 border-white/10" />
                            <label className="text-[10px] font-black text-slate-500 uppercase">Gói Phổ Biến</label>
                          </div>
                          <div className="space-y-2 md:col-span-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase">Mô tả</label>
                            <textarea value={packageForm.description} onChange={e => setPackageForm({...packageForm, description: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white h-24" />
                          </div>
                          <div className="space-y-2 md:col-span-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase">Tính năng (Cách nhau dấu phẩy)</label>
                            <input value={packageForm.features?.join(', ')} onChange={e => setPackageForm({...packageForm, features: e.target.value.split(',').map(f => f.trim())})} className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white" />
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <button 
                            onClick={() => {
                              const newPackages = siteConfig.packages || [];
                              const updatedPackages = editingPackageId 
                                ? newPackages.map(p => p.id === editingPackageId ? { ...p, ...packageForm as DetailingPackage } : p)
                                : [{ ...packageForm as DetailingPackage, id: Date.now().toString() }, ...newPackages];
                              setSiteConfig(prev => ({ ...prev, packages: updatedPackages }));
                              setIsAddingPackage(false);
                            }}
                            className="flex-1 bg-blue-600 text-white p-4 rounded-2xl font-black uppercase"
                          >
                            Lưu Gói
                          </button>
                          <button onClick={() => setIsAddingPackage(false)} className="flex-1 bg-slate-800 text-slate-400 p-4 rounded-2xl font-black uppercase">Hủy</button>
                        </div>
                      </motion.div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {(siteConfig.packages || []).map(pkg => (
                          <div key={pkg.id} className="bg-slate-900/50 border border-white/5 p-6 rounded-[32px] relative group overflow-hidden flex flex-col">
                            {pkg.isPopular && <div className="absolute top-4 right-4 bg-blue-600 text-[8px] font-black uppercase px-2 py-1 rounded-full">Phổ biến</div>}
                            <h4 className="text-xl font-black text-white uppercase mb-2">{pkg.title}</h4>
                            <p className="text-blue-400 font-black text-lg mb-4">{pkg.price}</p>
                            <p className="text-slate-500 text-xs mb-6 line-clamp-2">{pkg.description}</p>
                            <div className="flex justify-end gap-2 mt-auto">
                              <button onClick={() => { setIsAddingPackage(true); setEditingPackageId(pkg.id); setPackageForm(pkg); }} className="p-2 hover:bg-blue-600/20 rounded-lg transition-all">✏️</button>
                              <button onClick={() => confirm("Xóa gói này?") && setSiteConfig(prev => ({ ...prev, packages: (prev.packages || []).filter(p => p.id !== pkg.id) }))} className="p-2 hover:bg-red-600/20 rounded-lg transition-all">🗑️</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'inventory' && (
                  <div className="space-y-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                      <div>
                        <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Quản Lý Kho Vật Tư</h3>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Theo dõi dung dịch, hóa chất và dụng cụ</p>
                      </div>
                      <button 
                        onClick={() => {
                          const name = prompt("Tên vật tư mới:");
                          if (!name) return;
                          const newItem: InventoryItem = {
                            id: Date.now().toString(),
                            name,
                            category: 'General',
                            quantity: 0,
                            unit: 'cái',
                            minThreshold: 5,
                            lastRestocked: new Date().toISOString().split('T')[0],
                            pricePerUnit: 0
                          };
                          setInventory(prev => [...prev, newItem]);
                        }}
                        className="w-full md:w-auto bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-blue-600/20 transition-all active:scale-95 flex items-center justify-center gap-2"
                      >
                        <Plus className="w-4 h-4" /> Thêm Vật Tư
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      <div className="bg-slate-900/50 border border-white/5 p-6 rounded-[32px]">
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Tổng mặt hàng</p>
                        <p className="text-3xl font-black text-white">{inventory.length}</p>
                      </div>
                      <div className="bg-slate-900/50 border border-red-500/20 p-6 rounded-[32px]">
                        <p className="text-[9px] font-black text-red-500 uppercase tracking-widest mb-1">Sắp hết kho</p>
                        <p className="text-3xl font-black text-red-500">{inventory.filter(item => item.quantity <= item.minThreshold).length}</p>
                      </div>
                      <div className="bg-slate-900/50 border border-emerald-500/20 p-6 rounded-[32px]">
                        <p className="text-[9px] font-black text-emerald-500 uppercase tracking-widest mb-1">Giá trị kho ước tính</p>
                        <p className="text-3xl font-black text-emerald-500">
                          {(inventory.reduce((acc, item) => acc + (item.quantity * (item.pricePerUnit || 0)), 0)).toLocaleString('vi-VN')} đ
                        </p>
                      </div>
                    </div>

                    <div className="bg-slate-900/50 border border-white/5 rounded-[40px] overflow-hidden">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-white/5 border-b border-white/5">
                            <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Tên Vật Tư</th>
                            <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Danh Mục</th>
                            <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Số Lượng</th>
                            <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Trạng Thái</th>
                            <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Thao Tác</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {inventory.map(item => (
                            <tr key={item.id} className="hover:bg-white/5 transition-colors group">
                              <td className="p-6">
                                <p className="text-sm font-bold text-white">{item.name}</p>
                                <p className="text-[10px] text-slate-500 mt-1">Cập nhật: {item.lastRestocked}</p>
                              </td>
                              <td className="p-6">
                                <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-400 text-[9px] font-black uppercase tracking-widest">
                                  {item.category}
                                </span>
                              </td>
                              <td className="p-6">
                                <div className="flex items-center gap-3">
                                  <button 
                                    onClick={() => {
                                      setInventory(prev => prev.map(i => i.id === item.id ? { ...i, quantity: Math.max(0, i.quantity - 1) } : i));
                                    }}
                                    className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-red-600 hover:text-white transition-all"
                                  >
                                    -
                                  </button>
                                  <span className="text-sm font-black text-white w-12 text-center">{item.quantity} {item.unit}</span>
                                  <button 
                                    onClick={() => {
                                      setInventory(prev => prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
                                    }}
                                    className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-emerald-600 hover:text-white transition-all"
                                  >
                                    +
                                  </button>
                                </div>
                              </td>
                              <td className="p-6">
                                {item.quantity <= item.minThreshold ? (
                                  <span className="flex items-center gap-2 text-red-500 text-[10px] font-black uppercase tracking-widest">
                                    <AlertTriangle className="w-3 h-3" /> Sắp hết
                                  </span>
                                ) : (
                                  <span className="flex items-center gap-2 text-emerald-500 text-[10px] font-black uppercase tracking-widest">
                                    <CheckCircle2 className="w-3 h-3" /> Bình thường
                                  </span>
                                )}
                              </td>
                              <td className="p-6 text-right">
                                <button 
                                  onClick={() => {
                                    if (confirm("Xóa vật tư này khỏi kho?")) {
                                      setInventory(prev => prev.filter(i => i.id !== item.id));
                                    }
                                  }}
                                  className="p-2 text-slate-500 hover:text-red-500 transition-colors"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {activeTab === 'loyalty' && (
                  <div className="space-y-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                      <div>
                        <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Hệ Thống Tích Điểm</h3>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Quản lý điểm thưởng và ưu đãi khách hàng</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      {/* Loyalty Config */}
                      <div className="lg:col-span-1 space-y-6">
                        <div className="bg-slate-900/50 border border-white/5 p-8 rounded-[40px]">
                          <h4 className="text-sm font-black text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                            <Settings2 className="w-4 h-4 text-blue-500" /> Cấu Hình Điểm
                          </h4>
                          <div className="space-y-4">
                            <div>
                              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block">Điểm trên mỗi 100.000đ</label>
                              <input 
                                type="number"
                                value={siteConfig.loyaltyConfig?.pointsPer100k || 10}
                                onChange={(e) => setSiteConfig(prev => ({
                                  ...prev,
                                  loyaltyConfig: { ...prev.loyaltyConfig!, pointsPer100k: parseInt(e.target.value) || 0 }
                                }))}
                                className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-blue-500 transition-all"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block">Giá trị 1 điểm (VNĐ)</label>
                              <input 
                                type="number"
                                value={siteConfig.loyaltyConfig?.pointValue || 1000}
                                onChange={(e) => setSiteConfig(prev => ({
                                  ...prev,
                                  loyaltyConfig: { ...prev.loyaltyConfig!, pointValue: parseInt(e.target.value) || 0 }
                                }))}
                                className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-blue-500 transition-all"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="bg-blue-600/10 border border-blue-600/20 p-6 rounded-[32px]">
                          <p className="text-[10px] font-bold text-blue-400 leading-relaxed">
                            💡 Mẹo: Thiết lập tỷ lệ điểm hấp dẫn để khuyến khích khách hàng quay lại sử dụng dịch vụ thường xuyên hơn.
                          </p>
                        </div>
                      </div>

                      {/* Customer Points List */}
                      <div className="lg:col-span-2">
                        <div className="bg-slate-900/50 border border-white/5 rounded-[40px] overflow-hidden">
                          <div className="p-6 border-b border-white/5 flex justify-between items-center">
                            <h4 className="text-sm font-black text-white uppercase tracking-widest">Bảng Điểm Khách Hàng</h4>
                            <div className="relative">
                              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                              <input 
                                type="text"
                                placeholder="Tìm khách hàng..."
                                value={filterText}
                                onChange={(e) => setFilterText(e.target.value)}
                                className="bg-slate-950 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-white focus:border-blue-500 transition-all w-48 sm:w-64"
                              />
                            </div>
                          </div>
                          <div className="max-h-[500px] overflow-y-auto custom-scrollbar">
                            <table className="w-full text-left border-collapse">
                              <thead>
                                <tr className="bg-white/5 border-b border-white/5">
                                  <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Khách Hàng</th>
                                  <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Biển Số</th>
                                  <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Điểm Tích Lũy</th>
                                  <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Giá Trị Quy Đổi</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-white/5">
                                {getFilteredAndSorted(customerRecords, ['customerName', 'phone', 'licensePlate']).map(customer => (
                                  <tr key={customer.id} className="hover:bg-white/5 transition-colors">
                                    <td className="p-6">
                                      <p className="text-sm font-bold text-white">{customer.customerName}</p>
                                      <p className="text-[10px] text-slate-500 mt-1">{customer.phone}</p>
                                    </td>
                                    <td className="p-6">
                                      <span className="px-3 py-1 rounded-lg bg-slate-800 text-white text-[10px] font-mono">
                                        {customer.licensePlate}
                                      </span>
                                    </td>
                                    <td className="p-6">
                                      <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-amber-600/20 flex items-center justify-center text-amber-500">
                                          <Star className="w-4 h-4" />
                                        </div>
                                        <span className="text-lg font-black text-white">{customer.loyaltyPoints || 0}</span>
                                      </div>
                                    </td>
                                    <td className="p-6">
                                      <p className="text-sm font-black text-emerald-500">
                                        {((customer.loyaltyPoints || 0) * (siteConfig.loyaltyConfig?.pointValue || 1000)).toLocaleString('vi-VN')} đ
                                      </p>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'reports' && (
                  <div className="space-y-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                      <div>
                        <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Báo Cáo Doanh Thu</h3>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Phân tích hiệu quả kinh doanh và dịch vụ</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div className="bg-slate-900/50 border border-white/5 p-6 rounded-[32px]">
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Doanh thu tháng này</p>
                        <p className="text-3xl font-black text-blue-500">
                          {customerRecords.filter(r => r.date.startsWith(new Date().toISOString().slice(0, 7))).reduce((acc, r) => acc + (parseInt(r.totalPrice?.replace(/[^0-9]/g, '') || '0')), 0).toLocaleString('vi-VN')} đ
                        </p>
                      </div>
                      <div className="bg-slate-900/50 border border-white/5 p-6 rounded-[32px]">
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Chi phí tháng này</p>
                        <p className="text-3xl font-black text-red-500">
                          {expenses.filter(e => e.date.startsWith(new Date().toISOString().slice(0, 7))).reduce((acc, e) => acc + e.amount, 0).toLocaleString('vi-VN')} đ
                        </p>
                      </div>
                      <div className="bg-slate-900/50 border border-white/5 p-6 rounded-[32px]">
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Lợi nhuận tháng này</p>
                        <p className="text-3xl font-black text-emerald-500">
                          {(customerRecords.filter(r => r.date.startsWith(new Date().toISOString().slice(0, 7))).reduce((acc, r) => acc + (parseInt(r.totalPrice?.replace(/[^0-9]/g, '') || '0')), 0) - 
                            expenses.filter(e => e.date.startsWith(new Date().toISOString().slice(0, 7))).reduce((acc, e) => acc + e.amount, 0)).toLocaleString('vi-VN')} đ
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Revenue Chart */}
                      <div className="bg-slate-900/50 border border-white/5 p-8 rounded-[40px]">
                        <h4 className="text-sm font-black text-white uppercase tracking-widest mb-8">Doanh Thu Theo Thời Gian</h4>
                        <div className="h-[300px] w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={
                              Array.from({ length: 7 }, (_, i) => {
                                const d = new Date();
                                d.setDate(d.getDate() - (6 - i));
                                const dateStr = d.toISOString().split('T')[0];
                                const dayTotal = customerRecords
                                  .filter(r => r.date === dateStr)
                                  .reduce((acc, r) => acc + (parseInt(r.totalPrice?.replace(/[^0-9]/g, '') || '0')), 0);
                                return { name: d.toLocaleDateString('vi-VN', { weekday: 'short' }), total: dayTotal };
                              })
                            }>
                              <defs>
                                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                </linearGradient>
                              </defs>
                              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                              <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                              <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(value) => `${value / 1000000}M`} />
                              <Tooltip 
                                contentStyle={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', fontSize: '10px' }}
                                itemStyle={{ color: '#3b82f6' }}
                              />
                              <Area type="monotone" dataKey="total" stroke="#3b82f6" fillOpacity={1} fill="url(#colorTotal)" strokeWidth={3} />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      {/* Service Popularity Chart */}
                      <div className="bg-slate-900/50 border border-white/5 p-8 rounded-[40px]">
                        <h4 className="text-sm font-black text-white uppercase tracking-widest mb-8">Dịch Vụ Phổ Biến</h4>
                        <div className="h-[300px] w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <RePieChart>
                              <Pie
                                data={
                                  (() => {
                                    const counts: Record<string, number> = {};
                                    customerRecords.forEach(r => {
                                      r.servicesDone?.forEach(s => {
                                        counts[s] = (counts[s] || 0) + 1;
                                      });
                                    });
                                    return Object.entries(counts)
                                      .map(([name, value]) => ({ name, value }))
                                      .sort((a, b) => b.value - a.value)
                                      .slice(0, 5);
                                  })()
                                }
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                              >
                                {['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444'].map((color, index) => (
                                  <Cell key={`cell-${index}`} fill={color} />
                                ))}
                              </Pie>
                              <Tooltip 
                                contentStyle={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', fontSize: '10px' }}
                              />
                            </RePieChart>
                          </ResponsiveContainer>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                          {(() => {
                            const counts: Record<string, number> = {};
                            customerRecords.forEach(r => {
                              r.servicesDone?.forEach(s => {
                                counts[s] = (counts[s] || 0) + 1;
                              });
                            });
                            return Object.entries(counts)
                              .map(([name, value]) => ({ name, value }))
                              .sort((a, b) => b.value - a.value)
                              .slice(0, 4);
                          })().map((item, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full" style={{ background: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'][i] }} />
                              <span className="text-[10px] font-bold text-slate-400 truncate">{item.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'expenses' && (
                  <div className="space-y-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                      <div>
                        <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Quản Lý Chi Phí</h3>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Theo dõi các khoản chi tiêu vận hành</p>
                      </div>
                      <button 
                        onClick={() => {
                          const title = prompt('Tên khoản chi:');
                          const amount = parseInt(prompt('Số tiền (VNĐ):') || '0');
                          const category = prompt('Danh mục (rent, salary, utility, inventory, marketing, other):') as any;
                          if (title && amount > 0) {
                            const newExpense: Expense = {
                              id: Date.now().toString(),
                              title,
                              amount,
                              category: category || 'other',
                              date: new Date().toISOString().split('T')[0]
                            };
                            setExpenses(prev => [newExpense, ...prev]);
                          }
                        }}
                        className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2"
                      >
                        <Plus className="w-4 h-4" /> Thêm Chi Phí
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      <div className="bg-slate-900/50 border border-white/5 p-6 rounded-[32px]">
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Tổng chi tháng này</p>
                        <p className="text-3xl font-black text-red-500">
                          {expenses.filter(e => e.date.startsWith(new Date().toISOString().slice(0, 7))).reduce((acc, e) => acc + e.amount, 0).toLocaleString('vi-VN')} đ
                        </p>
                      </div>
                      <div className="bg-slate-900/50 border border-white/5 p-6 rounded-[32px]">
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Tiền thuê & Lương</p>
                        <p className="text-3xl font-black text-amber-500">
                          {expenses.filter(e => (e.category === 'rent' || e.category === 'salary') && e.date.startsWith(new Date().toISOString().slice(0, 7))).reduce((acc, e) => acc + e.amount, 0).toLocaleString('vi-VN')} đ
                        </p>
                      </div>
                      <div className="bg-slate-900/50 border border-white/5 p-6 rounded-[32px]">
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Vật tư & Marketing</p>
                        <p className="text-3xl font-black text-blue-500">
                          {expenses.filter(e => (e.category === 'inventory' || e.category === 'marketing') && e.date.startsWith(new Date().toISOString().slice(0, 7))).reduce((acc, e) => acc + e.amount, 0).toLocaleString('vi-VN')} đ
                        </p>
                      </div>
                      <div className="bg-slate-900/50 border border-white/5 p-6 rounded-[32px]">
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Điện nước & Khác</p>
                        <p className="text-3xl font-black text-purple-500">
                          {expenses.filter(e => (e.category === 'utility' || e.category === 'other') && e.date.startsWith(new Date().toISOString().slice(0, 7))).reduce((acc, e) => acc + e.amount, 0).toLocaleString('vi-VN')} đ
                        </p>
                      </div>
                    </div>

                    <div className="bg-slate-900/50 border border-white/5 rounded-[40px] overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="border-b border-white/5">
                              <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Ngày</th>
                              <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Khoản chi</th>
                              <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Danh mục</th>
                              <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">Số tiền</th>
                              <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">Thao tác</th>
                            </tr>
                          </thead>
                          <tbody>
                            {expenses.sort((a, b) => b.date.localeCompare(a.date)).map(expense => (
                              <tr key={expense.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                                <td className="px-8 py-6">
                                  <p className="text-xs font-bold text-slate-400">{expense.date}</p>
                                </td>
                                <td className="px-8 py-6">
                                  <p className="text-sm font-black text-white uppercase tracking-tight">{expense.title}</p>
                                </td>
                                <td className="px-8 py-6">
                                  <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                                    expense.category === 'rent' ? 'bg-blue-500/10 text-blue-500' :
                                    expense.category === 'salary' ? 'bg-emerald-500/10 text-emerald-500' :
                                    expense.category === 'utility' ? 'bg-amber-500/10 text-amber-500' :
                                    expense.category === 'inventory' ? 'bg-purple-500/10 text-purple-500' :
                                    expense.category === 'marketing' ? 'bg-pink-500/10 text-pink-500' :
                                    'bg-slate-500/10 text-slate-500'
                                  }`}>
                                    {expense.category === 'rent' ? 'Mặt bằng' :
                                     expense.category === 'salary' ? 'Lương' :
                                     expense.category === 'utility' ? 'Điện nước' :
                                     expense.category === 'inventory' ? 'Vật tư' :
                                     expense.category === 'marketing' ? 'Marketing' : 'Khác'}
                                  </span>
                                </td>
                                <td className="px-8 py-6 text-right">
                                  <p className="text-sm font-black text-red-500">-{expense.amount.toLocaleString('vi-VN')} đ</p>
                                </td>
                                <td className="px-8 py-6 text-right">
                                  <button 
                                    onClick={() => {
                                      if (window.confirm('Xóa khoản chi này?')) {
                                        setExpenses(prev => prev.filter(e => e.id !== expense.id));
                                      }
                                    }}
                                    className="p-2 text-slate-600 hover:text-red-500 transition-colors"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === 'ecerts' && (
                  <div className="space-y-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                      <div>
                        <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Chứng Chỉ Điện Tử</h3>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Quản lý và cấp chứng chỉ bảo hành</p>
                      </div>
                      <button 
                        onClick={() => {
                          const id = `CERT-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
                          const newCert = {
                            id,
                            customerName: '',
                            licensePlate: '',
                            serviceType: 'Ceramic Coating',
                            issueDate: new Date().toISOString().split('T')[0],
                            expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 2)).toISOString().split('T')[0],
                            qrCode: `https://xedepauto.vn/verify/${id}`,
                            status: 'active' as const
                          };
                          setECertificates([newCert, ...eCertificates]);
                        }}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all active:scale-95"
                      >
                        <Plus size={14} />
                        Cấp Chứng Chỉ Mới
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {eCertificates.map((cert) => (
                        <div key={cert.id} className="bg-slate-900/50 border border-white/5 p-6 rounded-[32px] relative group overflow-hidden">
                          <div className="absolute top-0 right-0 p-4">
                            <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-full ${
                              cert.status === 'active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-slate-500/10 text-slate-500'
                            }`}>
                              {cert.status === 'active' ? 'Đang hiệu lực' : 'Hết hạn'}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                              <ShieldCheck size={24} />
                            </div>
                            <div>
                              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Mã chứng chỉ</p>
                              <p className="text-sm font-black text-white">{cert.id}</p>
                            </div>
                          </div>

                          <div className="space-y-4 mb-6">
                            <div>
                              <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Khách hàng</p>
                              <input 
                                type="text"
                                value={cert.customerName}
                                onChange={(e) => {
                                  const updated = eCertificates.map(c => c.id === cert.id ? { ...c, customerName: e.target.value } : c);
                                  setECertificates(updated);
                                }}
                                placeholder="Tên khách hàng..."
                                className="w-full bg-slate-800/50 border border-white/5 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-blue-500/50"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Biển số</p>
                                <input 
                                  type="text"
                                  value={cert.licensePlate}
                                  onChange={(e) => {
                                    const updated = eCertificates.map(c => c.id === cert.id ? { ...c, licensePlate: e.target.value } : c);
                                    setECertificates(updated);
                                  }}
                                  placeholder="29A-12345"
                                  className="w-full bg-slate-800/50 border border-white/5 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-blue-500/50"
                                />
                              </div>
                              <div>
                                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Dịch vụ</p>
                                <select 
                                  value={cert.serviceType}
                                  onChange={(e) => {
                                    const updated = eCertificates.map(c => c.id === cert.id ? { ...c, serviceType: e.target.value } : c);
                                    setECertificates(updated);
                                  }}
                                  className="w-full bg-slate-800/50 border border-white/5 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-blue-500/50"
                                >
                                  <option value="Ceramic Coating">Ceramic Coating</option>
                                  <option value="PPF Protection">PPF Protection</option>
                                  <option value="Window Tinting">Window Tinting</option>
                                </select>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-4 border-t border-white/5">
                            <div className="text-[9px] font-bold text-slate-500">
                              Hết hạn: {new Date(cert.expiryDate).toLocaleDateString('vi-VN')}
                            </div>
                            <div className="flex items-center gap-2">
                              <button 
                                onClick={() => {
                                  const updated = eCertificates.filter(c => c.id !== cert.id);
                                  setECertificates(updated);
                                }}
                                className="p-2 text-slate-500 hover:text-red-500 transition-colors"
                              >
                                <Trash2 size={14} />
                              </button>
                              <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-xl font-black text-[9px] uppercase tracking-widest transition-all">
                                <FileCheck size={12} />
                                Xem/In
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'appointments' && (
                  <div className="space-y-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                      <div>
                        <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Quản Lý Lịch Hẹn</h3>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Theo dõi và điều phối lịch chăm sóc xe</p>
                      </div>
                      <button 
                        onClick={() => {
                          setIsAddingAppointment(true);
                          setEditingAppointmentId(null);
                          setAppointmentForm({ customerName: '', phone: '', carModel: '', serviceId: '', date: new Date().toISOString().split('T')[0], time: '09:00', status: 'pending', note: '' });
                        }}
                        className="w-full md:w-auto bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-blue-600/20 transition-all active:scale-95 flex items-center justify-center gap-2"
                      >
                        <Plus className="w-4 h-4" /> Thêm Lịch Hẹn
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
                      <div className="bg-slate-900/50 border border-white/5 p-6 rounded-[32px] relative overflow-hidden group">
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Chờ xác nhận</p>
                        <p className="text-3xl font-black text-amber-500">{(siteConfig.appointments || []).filter(a => a.status === 'pending').length}</p>
                      </div>
                      <div className="bg-slate-900/50 border border-white/5 p-6 rounded-[32px] relative overflow-hidden group">
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Đã xác nhận</p>
                        <p className="text-3xl font-black text-emerald-500">{(siteConfig.appointments || []).filter(a => a.status === 'confirmed').length}</p>
                      </div>
                      <div className="bg-slate-900/50 border border-white/5 p-6 rounded-[32px] relative overflow-hidden group">
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Đã hoàn thành</p>
                        <p className="text-3xl font-black text-blue-500">{(siteConfig.appointments || []).filter(a => a.status === 'completed').length}</p>
                      </div>
                      <div className="bg-slate-900/50 border border-white/5 p-6 rounded-[32px] relative overflow-hidden group">
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Tổng lịch hẹn</p>
                        <p className="text-3xl font-black text-white">{(siteConfig.appointments || []).length}</p>
                      </div>
                    </div>

                    {isAddingAppointment ? (
                      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-900 border border-blue-500/30 p-10 rounded-[40px] shadow-2xl">
                        <div className="flex justify-between items-center mb-10">
                          <h4 className="text-2xl font-black text-white uppercase tracking-tighter">{editingAppointmentId ? 'Sửa Lịch Hẹn' : 'Tạo Lịch Hẹn Mới'}</h4>
                          <button onClick={() => setIsAddingAppointment(false)} className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-all">
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Tên Khách Hàng</label>
                            <input value={appointmentForm.customerName} onChange={e => setAppointmentForm({...appointmentForm, customerName: e.target.value})} placeholder="VD: Nguyễn Văn A" className="w-full bg-slate-950 border border-white/10 rounded-2xl p-4 text-white font-bold focus:border-blue-500 transition-all outline-none" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Số Điện Thoại</label>
                            <input value={appointmentForm.phone} onChange={e => setAppointmentForm({...appointmentForm, phone: e.target.value})} placeholder="VD: 0912345678" className="w-full bg-slate-950 border border-white/10 rounded-2xl p-4 text-white font-bold focus:border-blue-500 transition-all outline-none" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Dòng Xe</label>
                            <input value={appointmentForm.carModel} onChange={e => setAppointmentForm({...appointmentForm, carModel: e.target.value})} placeholder="VD: Toyota Camry" className="w-full bg-slate-950 border border-white/10 rounded-2xl p-4 text-white font-bold focus:border-blue-500 transition-all outline-none" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Ngày Hẹn</label>
                            <input type="date" value={appointmentForm.date} onChange={e => setAppointmentForm({...appointmentForm, date: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-2xl p-4 text-white font-bold focus:border-blue-500 transition-all outline-none" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Giờ Hẹn</label>
                            <input type="time" value={appointmentForm.time} onChange={e => setAppointmentForm({...appointmentForm, time: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-2xl p-4 text-white font-bold focus:border-blue-500 transition-all outline-none" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Dịch Vụ</label>
                            <select value={appointmentForm.serviceId} onChange={e => setAppointmentForm({...appointmentForm, serviceId: e.target.value, subServiceTitle: ''})} className="w-full bg-slate-950 border border-white/10 rounded-2xl p-4 text-white font-bold focus:border-blue-500 transition-all outline-none appearance-none">
                              <option value="">-- Chọn dịch vụ --</option>
                              {services.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
                            </select>
                          </div>
                          {services.find(s => s.id === appointmentForm.serviceId)?.subServices && (
                            <div className="space-y-2">
                              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Gói Nâng Cấp</label>
                              <select value={appointmentForm.subServiceTitle} onChange={e => setAppointmentForm({...appointmentForm, subServiceTitle: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-2xl p-4 text-white font-bold focus:border-blue-500 transition-all outline-none appearance-none">
                                <option value="">-- Chọn gói nâng cấp --</option>
                                {services.find(s => s.id === appointmentForm.serviceId)?.subServices?.map((sub, idx) => (
                                  <option key={idx} value={sub.title}>{sub.title}</option>
                                ))}
                              </select>
                            </div>
                          )}
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Trạng Thái</label>
                            <select value={appointmentForm.status} onChange={e => setAppointmentForm({...appointmentForm, status: e.target.value as any})} className="w-full bg-slate-950 border border-white/10 rounded-2xl p-4 text-white font-bold focus:border-blue-500 transition-all outline-none appearance-none">
                              <option value="pending">Chờ xác nhận</option>
                              <option value="confirmed">Đã xác nhận</option>
                              <option value="completed">Đã hoàn thành</option>
                              <option value="cancelled">Đã hủy</option>
                            </select>
                          </div>
                        </div>
                        <div className="flex gap-4 pt-10">
                          <button 
                            onClick={() => {
                              const newApps = siteConfig.appointments || [];
                              const updatedApps = editingAppointmentId 
                                ? newApps.map(a => a.id === editingAppointmentId ? { ...a, ...appointmentForm as Appointment } : a)
                                : [{ ...appointmentForm as Appointment, id: Date.now().toString(), createdAt: new Date().toISOString() }, ...newApps];
                              setSiteConfig(prev => ({ ...prev, appointments: updatedApps }));
                              setIsAddingAppointment(false);
                            }}
                            className="flex-1 bg-blue-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-blue-600/20 hover:bg-blue-500 transition-all active:scale-95"
                          >
                            Lưu Lịch Hẹn
                          </button>
                          <button onClick={() => setIsAddingAppointment(false)} className="px-10 bg-slate-800 text-slate-400 rounded-2xl font-black uppercase tracking-widest hover:text-white transition-all">Hủy</button>
                        </div>
                      </motion.div>
                    ) : (
                      <div className="overflow-x-auto rounded-[40px] border border-white/5 shadow-2xl overflow-hidden bg-slate-900/20">
                        <table className="w-full text-left min-w-[1000px]">
                          <thead>
                            <tr className="bg-slate-900/50 border-b border-white/5 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                              <th className="px-8 py-6">Thời gian hẹn</th>
                              <th className="px-8 py-6">Khách hàng</th>
                              <th className="px-8 py-6">Phương tiện</th>
                              <th className="px-8 py-6">Trạng thái</th>
                              <th className="px-8 py-6 text-center">Thao tác</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5">
                            {(siteConfig.appointments || []).map(app => (
                              <tr key={app.id} className="hover:bg-blue-600/5 transition-colors group">
                                <td className="px-8 py-6">
                                  <div className="font-black text-white text-sm">{app.date}</div>
                                  <div className="text-[10px] text-blue-500 font-bold tracking-widest mt-0.5">{app.time}</div>
                                </td>
                                <td className="px-8 py-6">
                                  <div className="flex items-center gap-2">
                                    <div className="font-black text-white text-sm">{app.customerName}</div>
                                    {app.isRead === false && (
                                      <span className="bg-red-600 text-white text-[8px] font-black px-1.5 py-0.5 rounded-md animate-pulse uppercase">Mới</span>
                                    )}
                                  </div>
                                  <div className="text-[10px] text-slate-500 font-bold tracking-widest mt-0.5">{app.phone}</div>
                                </td>
                                <td className="px-8 py-6">
                                  <div className="text-xs font-bold text-slate-300">{app.carModel}</div>
                                  {app.subServiceTitle && <div className="text-[10px] text-emerald-500 font-bold mt-1 uppercase tracking-widest">{app.subServiceTitle}</div>}
                                </td>
                                <td className="px-8 py-6">
                                  <span className={`text-[9px] font-black uppercase px-3 py-1.5 rounded-full border ${
                                    app.status === 'confirmed' ? 'bg-emerald-600/10 text-emerald-400 border-emerald-500/20' :
                                    app.status === 'completed' ? 'bg-blue-600/10 text-blue-400 border-blue-500/20' :
                                    app.status === 'cancelled' ? 'bg-red-600/10 text-red-400 border-red-500/20' :
                                    'bg-amber-600/10 text-amber-400 border-amber-500/20'
                                  }`}>
                                    {app.status === 'pending' ? 'Chờ xác nhận' :
                                     app.status === 'confirmed' ? 'Đã xác nhận' :
                                     app.status === 'completed' ? 'Đã hoàn thành' : 'Đã hủy'}
                                  </span>
                                </td>
                                <td className="px-8 py-6 text-center">
                                  <div className="flex justify-center gap-2">
                                    <button 
                                      onClick={() => { setIsAddingAppointment(true); setEditingAppointmentId(app.id); setAppointmentForm(app); }}
                                      className="w-10 h-10 rounded-xl bg-slate-800 text-slate-400 hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center shadow-lg"
                                    >
                                      <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button 
                                      onClick={() => confirm("Xóa lịch hẹn này?") && setSiteConfig(prev => ({ ...prev, appointments: (prev.appointments || []).filter(a => a.id !== app.id) }))}
                                      className="w-10 h-10 rounded-xl bg-slate-800 text-slate-400 hover:bg-red-600 hover:text-white transition-all flex items-center justify-center shadow-lg"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'customers' && (
                  <div className="space-y-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                      <div>
                        <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Nhật Ký Chăm Sóc</h3>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Quản lý hồ sơ khách hàng và doanh thu</p>
                      </div>
                      <button 
                        onClick={() => {
                          setIsAddingCustomer(true);
                          setEditingCustomerId(null);
                          setCustomerForm({ customerName: '', phone: '', licensePlate: '', carModel: '', servicesDone: [], totalPrice: '', notes: '', rating: 5, date: new Date().toISOString().split('T')[0], discount: 0, paymentStatus: 'paid' });
                        }}
                        className="w-full md:w-auto bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-blue-600/20 transition-all active:scale-95 flex items-center justify-center gap-2"
                      >
                        <Plus className="w-4 h-4" /> Thêm Khách Hàng
                      </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6">
                      <div className="bg-slate-900/50 border border-white/5 p-4 sm:p-8 rounded-[24px] sm:rounded-[40px] relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-2 sm:p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                          <Users className="w-8 h-8 sm:w-16 sm:h-16 text-blue-500" />
                        </div>
                        <p className="text-[8px] sm:text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 sm:mb-2">Tổng Khách</p>
                        <p className="text-xl sm:text-4xl font-black text-white">{customerRecords.length}</p>
                      </div>
                      <div className="bg-slate-900/50 border border-white/5 p-4 sm:p-8 rounded-[24px] sm:rounded-[40px] relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-2 sm:p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                          <Coins className="w-8 h-8 sm:w-16 sm:h-16 text-emerald-500" />
                        </div>
                        <p className="text-[8px] sm:text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 sm:mb-2">Doanh Thu</p>
                        <p className="text-xl sm:text-4xl font-black text-emerald-500">
                          {customerRecords.reduce((acc, r) => {
                            const price = parseInt(r.totalPrice.replace(/[^0-9]/g, '')) || 0;
                            return acc + price;
                          }, 0).toLocaleString('vi-VN')}
                        </p>
                      </div>
                      <div className="bg-slate-900/50 border border-white/5 p-4 sm:p-8 rounded-[24px] sm:rounded-[40px] relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-2 sm:p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                          <CreditCard className="w-8 h-8 sm:w-16 sm:h-16 text-red-500" />
                        </div>
                        <p className="text-[8px] sm:text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 sm:mb-2">Công Nợ</p>
                        <p className="text-xl sm:text-4xl font-black text-red-500">
                          {customerRecords.filter(r => r.paymentStatus === 'pending').reduce((acc, r) => {
                            const price = parseInt(r.totalPrice.replace(/[^0-9]/g, '')) || 0;
                            return acc + price;
                          }, 0).toLocaleString('vi-VN')}
                        </p>
                      </div>
                      <div className="bg-slate-900/50 border border-white/5 p-4 sm:p-8 rounded-[24px] sm:rounded-[40px] relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-2 sm:p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                          <Star className="w-8 h-8 sm:w-16 sm:h-16 text-amber-500" />
                        </div>
                        <p className="text-[8px] sm:text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 sm:mb-2">Đánh Giá</p>
                        <p className="text-xl sm:text-4xl font-black text-amber-500">
                          {(customerRecords.reduce((acc, r) => acc + (r.rating || 5), 0) / (customerRecords.length || 1)).toFixed(1)}
                        </p>
                      </div>
                    </div>

                    {/* Revenue Chart */}
                    <div className="bg-slate-900/50 border border-white/5 p-6 sm:p-10 rounded-[32px] sm:rounded-[48px]">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                        <div>
                          <h4 className="text-lg font-black text-white uppercase tracking-tighter">Biểu Đồ Doanh Thu</h4>
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Xu hướng doanh thu theo thời gian</p>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-slate-950 rounded-xl border border-white/5">
                          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Doanh thu (VNĐ)</span>
                        </div>
                      </div>
                      <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart
                            data={customerRecords.reduce((acc: any[], r) => {
                              const date = r.date;
                              const price = parseInt(r.totalPrice.replace(/[^0-9]/g, '')) || 0;
                              const existing = acc.find(item => item.date === date);
                              if (existing) {
                                existing.revenue += price;
                              } else {
                                acc.push({ date, revenue: price });
                              }
                              return acc;
                            }, []).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())}
                            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                          >
                            <defs>
                              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                            <XAxis 
                              dataKey="date" 
                              stroke="#64748b" 
                              fontSize={10} 
                              tickLine={false} 
                              axisLine={false}
                              tickFormatter={(str) => {
                                const d = new Date(str);
                                return `${d.getDate()}/${d.getMonth() + 1}`;
                              }}
                            />
                            <YAxis 
                              stroke="#64748b" 
                              fontSize={10} 
                              tickLine={false} 
                              axisLine={false}
                              tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
                            />
                            <Tooltip 
                              contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px' }}
                              itemStyle={{ color: '#3b82f6', fontWeight: 'bold', fontSize: '12px' }}
                              labelStyle={{ color: '#94a3b8', fontSize: '10px', marginBottom: '4px', fontWeight: 'bold' }}
                              formatter={(value: number) => [value.toLocaleString('vi-VN') + ' VNĐ', 'Doanh thu']}
                            />
                            <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <div className="bg-slate-900/30 border border-white/5 p-6 rounded-[32px]">
                      <FilterSortBar 
                        currentSearch={filterText}
                        onSearchChange={setFilterText}
                        currentSort={sortConfig}
                        onSortChange={setSortConfig}
                        onClear={() => { setFilterText(''); setFilterCategory('all'); }}
                        sortOptions={[
                          { key: 'date', order: 'desc', label: 'Ngày gần nhất' },
                          { key: 'date', order: 'asc', label: 'Ngày xa nhất' },
                          { key: 'customerName', order: 'asc', label: 'Tên A-Z' },
                          { key: 'totalPrice', order: 'desc', label: 'Giá trị cao nhất' },
                        ]}
                      />
                    </div>

                    {isAddingCustomer ? (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-slate-900 border border-blue-500/30 p-6 sm:p-10 rounded-[40px] shadow-2xl"
                      >
                        <div className="flex justify-between items-center mb-10">
                          <h4 className="text-2xl font-black text-white uppercase tracking-tighter">{editingCustomerId ? 'Sửa Thông Tin Khách' : 'Thêm Khách Hàng Mới'}</h4>
                          <button onClick={() => setIsAddingCustomer(false)} className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-all">
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Tên Khách Hàng</label>
                            <input value={customerForm.customerName} onChange={e => setCustomerForm({...customerForm, customerName: e.target.value})} placeholder="VD: Nguyễn Văn A" className="w-full bg-slate-950 border border-white/10 rounded-2xl p-4 text-white font-bold focus:border-blue-500 transition-all outline-none" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Số Điện Thoại</label>
                            <input value={customerForm.phone} onChange={e => setCustomerForm({...customerForm, phone: e.target.value})} placeholder="VD: 0912345678" className="w-full bg-slate-950 border border-white/10 rounded-2xl p-4 text-white font-bold focus:border-blue-500 transition-all outline-none" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Biển Số Xe</label>
                            <input value={customerForm.licensePlate} onChange={e => setCustomerForm({...customerForm, licensePlate: e.target.value.toUpperCase()})} placeholder="VD: 30A-123.45" className="w-full bg-slate-950 border border-white/10 rounded-2xl p-4 text-white font-bold focus:border-blue-500 transition-all outline-none" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Dòng Xe</label>
                            <input value={customerForm.carModel} onChange={e => setCustomerForm({...customerForm, carModel: e.target.value})} placeholder="VD: Toyota Camry" className="w-full bg-slate-950 border border-white/10 rounded-2xl p-4 text-white font-bold focus:border-blue-500 transition-all outline-none" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Ngày Thực Hiện</label>
                            <input type="date" value={customerForm.date} onChange={e => setCustomerForm({...customerForm, date: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-2xl p-4 text-white font-bold focus:border-blue-500 transition-all outline-none" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Tổng Tiền (Tự động tính)</label>
                            <div className="relative">
                              <input 
                                value={customerForm.totalPrice} 
                                onChange={e => setCustomerForm({...customerForm, totalPrice: e.target.value})} 
                                placeholder="VD: 5.000.000 VNĐ" 
                                className="w-full bg-slate-950 border border-white/10 rounded-2xl p-4 text-white font-bold focus:border-blue-500 transition-all outline-none pl-12" 
                              />
                              <Coins className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Giảm Giá (VNĐ)</label>
                            <input 
                              type="number"
                              value={customerForm.discount || 0} 
                              onChange={e => setCustomerForm({...customerForm, discount: parseInt(e.target.value) || 0})} 
                              placeholder="0" 
                              className="w-full bg-slate-950 border border-white/10 rounded-2xl p-4 text-white font-bold focus:border-blue-500 transition-all outline-none" 
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Trạng Thái Thanh Toán</label>
                            <div className="grid grid-cols-3 gap-2">
                              {[
                                { id: 'paid', label: 'Đã thanh toán', color: 'bg-emerald-500' },
                                { id: 'pending', label: 'Chưa thanh toán', color: 'bg-red-500' },
                                { id: 'partially_paid', label: 'Thanh toán một phần', color: 'bg-amber-500' }
                              ].map(status => (
                                <button
                                  key={status.id}
                                  onClick={() => setCustomerForm({...customerForm, paymentStatus: status.id as any})}
                                  className={`p-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border ${
                                    customerForm.paymentStatus === status.id 
                                      ? `${status.color} text-white border-transparent shadow-lg` 
                                      : 'bg-slate-950 text-slate-500 border-white/10 hover:border-white/20'
                                  }`}
                                >
                                  {status.label}
                                </button>
                              ))}
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Đánh Giá (1-5 Sao)</label>
                            <div className="flex gap-2 p-4 bg-slate-950 border border-white/10 rounded-2xl">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                  key={star}
                                  onClick={() => setCustomerForm({...customerForm, rating: star})}
                                  className={`transition-all ${customerForm.rating && customerForm.rating >= star ? 'text-yellow-500 scale-110' : 'text-slate-700 hover:text-slate-500'}`}
                                >
                                  <Star className={`w-6 h-6 ${customerForm.rating && customerForm.rating >= star ? 'fill-current' : ''}`} />
                                </button>
                              ))}
                            </div>
                          </div>
                          <div className="space-y-6 md:col-span-2 lg:col-span-3">
                            <div className="flex items-center justify-between">
                              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Chọn Dịch Vụ & Tính Tiền</label>
                              <span className="text-[10px] font-bold text-blue-500 bg-blue-500/10 px-3 py-1 rounded-full uppercase tracking-widest">
                                Đã chọn: {customerForm.servicesDone?.length || 0}
                              </span>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                              {services.map(service => (
                                <div key={service.id} className="space-y-3">
                                  <button
                                    onClick={() => {
                                      const isSelected = customerForm.servicesDone?.includes(service.title);
                                      let newServices = [...(customerForm.servicesDone || [])];
                                      if (isSelected) {
                                        newServices = newServices.filter(s => s !== service.title);
                                      } else {
                                        newServices.push(service.title);
                                      }
                                      setCustomerForm({
                                        ...customerForm,
                                        servicesDone: newServices,
                                        serviceReviews: newServices.map(s => {
                                          const existing = customerForm.serviceReviews?.find(r => r.serviceName === s);
                                          return existing || { serviceName: s, rating: 5, comment: '' };
                                        })
                                      });
                                    }}
                                    className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between group ${
                                      customerForm.servicesDone?.includes(service.title) 
                                        ? 'bg-blue-600/20 border-blue-500 shadow-lg shadow-blue-500/10' 
                                        : 'bg-slate-950 border-white/5 hover:border-white/20'
                                    }`}
                                  >
                                    <div className="flex items-center gap-3">
                                      <span className="text-xl">{service.icon}</span>
                                      <div>
                                        <div className="text-xs font-black text-white uppercase tracking-tighter">{service.title}</div>
                                        <div className="text-[9px] font-bold text-slate-500">{service.price}</div>
                                      </div>
                                    </div>
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                                      customerForm.servicesDone?.includes(service.title)
                                        ? 'bg-blue-500 border-blue-500'
                                        : 'border-white/10 group-hover:border-white/30'
                                    }`}>
                                      {customerForm.servicesDone?.includes(service.title) && <Check className="w-3 h-3 text-white" />}
                                    </div>
                                  </button>

                                  {/* Sub-services if any */}
                                  {service.subServices && service.subServices.length > 0 && (
                                    <div className="pl-6 space-y-2">
                                      {service.subServices.map((sub, sIdx) => (
                                        <button
                                          key={sIdx}
                                          onClick={() => {
                                            const isSelected = customerForm.servicesDone?.includes(sub.title);
                                            let newServices = [...(customerForm.servicesDone || [])];
                                            if (isSelected) {
                                              newServices = newServices.filter(s => s !== sub.title);
                                            } else {
                                              newServices.push(sub.title);
                                            }
                                            setCustomerForm({
                                              ...customerForm,
                                              servicesDone: newServices,
                                              serviceReviews: newServices.map(s => {
                                                const existing = customerForm.serviceReviews?.find(r => r.serviceName === s);
                                                return existing || { serviceName: s, rating: 5, comment: '' };
                                              })
                                            });
                                          }}
                                          className={`w-full text-left p-3 rounded-xl border text-[10px] transition-all flex items-center justify-between group ${
                                            customerForm.servicesDone?.includes(sub.title) 
                                              ? 'bg-emerald-600/20 border-emerald-500' 
                                              : 'bg-slate-950/50 border-white/5 hover:border-white/10'
                                          }`}
                                        >
                                          <div className="flex flex-col">
                                            <span className="font-bold text-slate-300">{sub.title}</span>
                                            <span className="text-[8px] text-slate-500">{sub.price}</span>
                                          </div>
                                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                                            customerForm.servicesDone?.includes(sub.title)
                                              ? 'bg-emerald-500 border-emerald-500'
                                              : 'border-white/10 group-hover:border-white/30'
                                          }`}>
                                            {customerForm.servicesDone?.includes(sub.title) && <Check className="w-2.5 h-2.5 text-white" />}
                                          </div>
                                        </button>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>

                            <div className="p-6 bg-blue-600/10 border border-blue-500/20 rounded-[32px] flex flex-col md:flex-row justify-between items-center gap-4">
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
                                  <Receipt className="w-6 h-6" />
                                </div>
                                <div>
                                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Tạm tính</p>
                                  <p className="text-xl font-black text-white">{customerForm.totalPrice || '0 VNĐ'}</p>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <button 
                                  onClick={() => setCustomerForm({...customerForm, servicesDone: [], totalPrice: '0 VNĐ'})}
                                  className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                                >
                                  Xóa tất cả
                                </button>
                              </div>
                            </div>
                          </div>

                          {customerForm.serviceReviews && customerForm.serviceReviews.length > 0 && (
                            <div className="md:col-span-2 lg:col-span-3 space-y-4">
                              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Đánh Giá Chi Tiết Từng Dịch Vụ</label>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {customerForm.serviceReviews.map((review, idx) => (
                                  <div key={idx} className="bg-slate-950/50 border border-white/5 p-6 rounded-3xl space-y-4">
                                    <div className="flex justify-between items-center">
                                      <span className="text-xs font-black text-blue-400 uppercase tracking-tighter">{review.serviceName}</span>
                                      <div className="flex gap-1">
                                        {[1, 2, 3, 4, 5].map(s => (
                                          <button 
                                            key={s} 
                                            onClick={() => {
                                              const newReviews = [...(customerForm.serviceReviews || [])];
                                              newReviews[idx] = { ...newReviews[idx], rating: s };
                                              setCustomerForm({ ...customerForm, serviceReviews: newReviews });
                                            }}
                                          >
                                            <Star className={`w-4 h-4 ${review.rating >= s ? 'text-yellow-500 fill-current' : 'text-slate-700'}`} />
                                          </button>
                                        ))}
                                      </div>
                                    </div>
                                    <textarea 
                                      value={review.comment}
                                      onChange={e => {
                                        const newReviews = [...(customerForm.serviceReviews || [])];
                                        newReviews[idx] = { ...newReviews[idx], comment: e.target.value };
                                        setCustomerForm({ ...customerForm, serviceReviews: newReviews });
                                      }}
                                      placeholder="Nhận xét về dịch vụ này..."
                                      className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-xs text-white outline-none focus:border-blue-500 transition-all resize-none h-20"
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 pt-10">
                          <button 
                            onClick={() => {
                              if (!customerForm.customerName || !customerForm.phone) {
                                alert("Vui lòng nhập tên và SĐT!");
                                return;
                              }
                              if (editingCustomerId) {
                                setCustomerRecords(customerRecords.map(r => r.id === editingCustomerId ? { ...r, ...customerForm as CustomerRecord } : r));
                              } else {
                                setCustomerRecords([{ ...customerForm as CustomerRecord, id: Date.now().toString() }, ...customerRecords]);
                              }
                              setIsAddingCustomer(false);
                            }}
                            className="flex-1 bg-blue-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-blue-600/20 hover:bg-blue-500 transition-all active:scale-95"
                          >
                            {editingCustomerId ? 'Cập Nhật Thông Tin' : 'Lưu Bản Ghi Mới'}
                          </button>
                          <button onClick={() => setIsAddingCustomer(false)} className="px-10 py-5 bg-slate-800 text-slate-400 rounded-2xl font-black uppercase tracking-widest hover:text-white transition-all">Hủy</button>
                        </div>
                      </motion.div>
                    ) : (
                      <>
                        {/* Mobile Card View */}
                        <div className="grid grid-cols-1 gap-4 md:hidden">
                          {getFilteredAndSorted(customerRecords, ['customerName', 'phone', 'licensePlate', 'carModel']).map(r => (
                            <div key={r.id} className="bg-slate-900/40 border border-white/5 p-6 rounded-[32px] space-y-4">
                              <div className="flex justify-between items-start">
                                <div>
                                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{r.date}</div>
                                  <div className="font-black text-white text-lg">{r.customerName}</div>
                                  <div className="text-xs text-blue-500 font-bold tracking-widest">{r.phone}</div>
                                </div>
                                <div className={`inline-flex items-center px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                                  r.paymentStatus === 'paid' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                                  r.paymentStatus === 'pending' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                                  'bg-amber-500/10 text-amber-500 border-amber-500/20'
                                }`}>
                                  {r.paymentStatus === 'paid' ? 'Đã thanh toán' :
                                   r.paymentStatus === 'pending' ? 'Chưa thanh toán' :
                                   'Thanh toán một phần'}
                                </div>
                              </div>

                              <div className="flex items-center justify-between py-4 border-y border-white/5">
                                <div>
                                  <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Phương tiện</div>
                                  <div className="text-sm font-bold text-slate-300">{r.carModel}</div>
                                  <div className="text-[10px] bg-slate-800 px-2 py-0.5 rounded-lg border border-white/5 inline-block font-black text-slate-400 mt-1 uppercase tracking-tighter">{r.licensePlate}</div>
                                </div>
                                <div className="text-right">
                                  <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Thành tiền</div>
                                  <div className="font-black text-white text-lg">{r.totalPrice}</div>
                                </div>
                              </div>

                              <div className="space-y-3">
                                <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Dịch vụ đã làm</div>
                                <div className="flex flex-wrap gap-2">
                                  {r.servicesDone.map((s, idx) => (
                                    <span key={idx} className="text-[9px] bg-blue-600/10 text-blue-400 border border-blue-500/10 px-3 py-1.5 rounded-full font-black uppercase tracking-tighter">
                                      {s}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              <div className="flex gap-3 pt-2">
                                <button 
                                  onClick={() => {
                                    setIsAddingCustomer(true);
                                    setEditingCustomerId(r.id);
                                    setCustomerForm(r);
                                  }}
                                  className="flex-1 py-4 rounded-2xl bg-slate-800 text-slate-400 hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest"
                                >
                                  <Edit2 className="w-4 h-4" /> Sửa
                                </button>
                                <button 
                                  onClick={() => confirm("Xóa bản ghi này?") && setCustomerRecords(prev => prev.filter(cr => cr.id !== r.id))}
                                  className="w-12 h-14 rounded-2xl bg-slate-800 text-slate-400 hover:bg-red-600 hover:text-white transition-all flex items-center justify-center"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Desktop Table View */}
                        <div className="hidden md:block overflow-x-auto rounded-[40px] border border-white/5 shadow-2xl overflow-hidden bg-slate-900/20">
                          <table className="w-full text-left min-w-[1000px]">
                          <thead>
                            <tr className="bg-slate-900/50 border-b border-white/5 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                              <th className="px-8 py-6">Thời gian</th>
                              <th className="px-8 py-6">Khách hàng</th>
                              <th className="px-8 py-6">Trạng thái</th>
                              <th className="px-8 py-6">Phương tiện</th>
                              <th className="px-8 py-6">Dịch vụ đã làm</th>
                              <th className="px-8 py-6 text-right">Thành tiền</th>
                              <th className="px-8 py-6 text-center">Thao tác</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5">
                            {getFilteredAndSorted(customerRecords, ['customerName', 'phone', 'licensePlate', 'carModel']).map(r => (
                              <tr key={r.id} className="hover:bg-blue-600/5 transition-colors group">
                                <td className="px-8 py-6">
                                  <div className="text-xs font-bold text-slate-400">{r.date}</div>
                                </td>
                                <td className="px-8 py-6">
                                  <div className="font-black text-white text-sm">{r.customerName}</div>
                                  <div className="text-[10px] text-blue-500 font-bold tracking-widest mt-0.5">{r.phone}</div>
                                </td>
                                <td className="px-8 py-6">
                                  <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border ${
                                    r.paymentStatus === 'paid' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                                    r.paymentStatus === 'pending' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                                    'bg-amber-500/10 text-amber-500 border-amber-500/20'
                                  }`}>
                                    {r.paymentStatus === 'paid' ? 'Đã thanh toán' :
                                     r.paymentStatus === 'pending' ? 'Chưa thanh toán' :
                                     'Thanh toán một phần'}
                                  </div>
                                  <div className="flex gap-0.5 mt-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                      <Star 
                                        key={star} 
                                        className={`w-2.5 h-2.5 ${r.rating && r.rating >= star ? 'text-yellow-500 fill-current' : 'text-slate-700'}`} 
                                      />
                                    ))}
                                  </div>
                                </td>
                                <td className="px-8 py-6">
                                  <div className="text-xs font-bold text-slate-300">{r.carModel}</div>
                                  <div className="text-[9px] bg-slate-800 px-2 py-0.5 rounded-lg border border-white/5 inline-block font-black text-slate-500 mt-1 uppercase tracking-tighter">{r.licensePlate}</div>
                                </td>
                                <td className="px-8 py-6">
                                  <div className="flex flex-wrap gap-1.5">
                                    {r.servicesDone.map((s, idx) => {
                                      const review = r.serviceReviews?.find(rev => rev.serviceName === s);
                                      return (
                                        <div key={idx} className="group/service relative">
                                          <span className="text-[8px] bg-blue-600/10 text-blue-400 border border-blue-500/10 px-2.5 py-1 rounded-full font-black uppercase tracking-tighter cursor-help">
                                            {s} {review && `(${review.rating}⭐)`}
                                          </span>
                                          {review?.comment && (
                                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-3 bg-slate-900 border border-white/10 rounded-xl text-[10px] text-slate-300 opacity-0 group-hover/service:opacity-100 transition-opacity pointer-events-none z-50 shadow-2xl">
                                              {review.comment}
                                            </div>
                                          )}
                                        </div>
                                      );
                                    })}
                                  </div>
                                </td>
                                <td className="px-8 py-6 text-right">
                                  <div className="font-black text-white text-sm">{r.totalPrice}</div>
                                </td>
                                <td className="px-8 py-6 text-center">
                                  <div className="flex justify-center gap-2">
                                    <button 
                                      onClick={() => {
                                        setIsAddingCustomer(true);
                                        setEditingCustomerId(r.id);
                                        setCustomerForm(r);
                                      }}
                                      className="w-10 h-10 rounded-xl bg-slate-800 text-slate-400 hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center shadow-lg"
                                    >
                                      <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button 
                                      onClick={() => confirm("Xóa bản ghi này?") && setCustomerRecords(prev => prev.filter(cr => cr.id !== r.id))}
                                      className="w-10 h-10 rounded-xl bg-slate-800 text-slate-400 hover:bg-red-600 hover:text-white transition-all flex items-center justify-center shadow-lg"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </>
                  )}
                </div>
              )}

                {activeTab === 'maintenance' && (
                  <div className="space-y-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                      <div>
                        <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter">Tư Vấn Bảo Dưỡng AI</h3>
                        <p className="text-slate-500 text-[10px] md:text-[11px] font-black uppercase tracking-widest mt-1">Nhận lộ trình bảo dưỡng chuyên nghiệp dựa trên tình trạng xe của bạn</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div className="bg-slate-900/50 border border-white/5 p-6 md:p-10 rounded-[32px] space-y-6 shadow-2xl">
                        <h4 className="text-xl font-black text-white uppercase tracking-tight flex items-center gap-3">
                          <span className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-500">📋</span>
                          Thông Tin Xe
                        </h4>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Hãng Xe</label>
                            <input 
                              value={maintenanceForm.brand} 
                              onChange={e => setMaintenanceForm({...maintenanceForm, brand: e.target.value})} 
                              placeholder="VD: Toyota, Mercedes..." 
                              className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Dòng Xe / Đời Xe</label>
                            <input 
                              value={maintenanceForm.model} 
                              onChange={e => setMaintenanceForm({...maintenanceForm, model: e.target.value})} 
                              placeholder="VD: Camry 2.5Q, C200..." 
                              className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Năm Sản Xuất</label>
                            <input 
                              value={maintenanceForm.year} 
                              onChange={e => setMaintenanceForm({...maintenanceForm, year: e.target.value})} 
                              placeholder="VD: 2020, 2022..." 
                              className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Số ODO (km)</label>
                            <input 
                              value={maintenanceForm.mileage} 
                              onChange={e => setMaintenanceForm({...maintenanceForm, mileage: e.target.value})} 
                              placeholder="VD: 50.000" 
                              className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Lần Bảo Dưỡng Gần Nhất</label>
                          <input 
                            value={maintenanceForm.lastMaintenance} 
                            onChange={e => setMaintenanceForm({...maintenanceForm, lastMaintenance: e.target.value})} 
                            placeholder="VD: 45.000km hoặc 6 tháng trước..." 
                            className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Tình Trạng / Dấu Hiệu Lạ</label>
                          <textarea 
                            value={maintenanceForm.symptoms} 
                            onChange={e => setMaintenanceForm({...maintenanceForm, symptoms: e.target.value})} 
                            placeholder="VD: Phanh kêu rít, điều hòa không mát, xe rung khi chạy nhanh..." 
                            className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white h-32 focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none" 
                          />
                        </div>

                        <button 
                          onClick={async () => {
                            if (!maintenanceForm.brand || !maintenanceForm.model) {
                              alert("Vui lòng nhập hãng xe và dòng xe!");
                              return;
                            }
                            setIsAiProcessing(true);
                            try {
                              const advice = await getMaintenanceAdvice(maintenanceForm);
                              setMaintenanceAdvice(advice);
                            } catch (error) {
                              console.error(error);
                              alert("Lỗi khi lấy tư vấn AI");
                            } finally {
                              setIsAiProcessing(false);
                            }
                          }}
                          disabled={isAiProcessing}
                          className="w-full bg-blue-600 hover:bg-blue-500 text-white p-5 rounded-2xl font-black uppercase tracking-widest shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50"
                        >
                          {isAiProcessing ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              Đang Phân Tích...
                            </>
                          ) : (
                            <>
                              <span>✨</span>
                              Nhận Tư Vấn Ngay
                            </>
                          )}
                        </button>
                      </div>

                      <div className="bg-slate-900/50 border border-white/5 p-6 md:p-10 rounded-[32px] shadow-2xl relative overflow-hidden min-h-[500px]">
                        <div className="absolute top-0 right-0 p-8 opacity-5">
                          <span className="text-9xl">🤖</span>
                        </div>
                        
                        <h4 className="text-xl font-black text-white uppercase tracking-tight mb-8 flex items-center gap-3">
                          <span className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-500">💡</span>
                          Lời Khuyên Từ Chuyên Gia
                        </h4>

                        {isAiProcessing ? (
                          <div className="h-full flex flex-col items-center justify-center space-y-6 py-20">
                            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                            <div className="text-center space-y-2">
                              <p className="text-white font-black uppercase text-sm tracking-widest animate-pulse">AI Đang Phân Tích Dữ Liệu Xe...</p>
                              <p className="text-slate-500 text-[10px] uppercase font-bold">Vui lòng đợi trong giây lát</p>
                            </div>
                          </div>
                        ) : maintenanceAdvice ? (
                          <div className="prose prose-invert max-w-none animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <div className="bg-slate-950/50 border border-white/5 rounded-2xl p-6 md:p-8 text-slate-300 text-sm leading-relaxed markdown-body">
                              <ReactMarkdown>{maintenanceAdvice}</ReactMarkdown>
                            </div>
                            <div className="mt-8 flex justify-center">
                              <button 
                                onClick={() => window.print()} 
                                className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2"
                              >
                                📥 Tải Báo Cáo (PDF)
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-20 opacity-40">
                            <div className="text-6xl">🚗</div>
                            <div className="space-y-2">
                              <p className="text-slate-400 font-black uppercase tracking-widest text-xs">Chưa có dữ liệu tư vấn</p>
                              <p className="text-slate-600 text-[10px] font-bold uppercase">Hãy nhập thông tin xe bên trái để bắt đầu</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'ai-creative' && (
                  <div className="space-y-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter">AI Creative Studio</h3>
                    <p className="text-slate-500 text-[10px] md:text-[11px] font-black uppercase tracking-widest mt-1">Tạo nội dung hình ảnh & video chuyên nghiệp bằng AI</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="bg-slate-900/50 p-8 rounded-[32px] border border-white/5 space-y-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Mô tả yêu cầu (Prompt)</label>
                        <textarea 
                          value={aiPrompt}
                          onChange={(e) => setAiPrompt(e.target.value)}
                          placeholder="Ví dụ: Một chiếc xe Porsche 911 màu xám xi măng đang được phủ ceramic trong phòng studio ánh sáng nghệ thuật..."
                          className="w-full bg-slate-950 border border-white/10 rounded-2xl p-4 text-white text-sm h-40 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <button 
                          onClick={() => handleAiCreative('image')}
                          disabled={isAiProcessing}
                          className="bg-slate-800 hover:bg-slate-700 text-white p-4 rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50"
                        >
                          {isAiProcessing ? '⏳ Đang xử lý...' : '🖼️ Tạo Ảnh'}
                        </button>
                        <button 
                          onClick={() => handleAiCreative('video')}
                          disabled={isAiProcessing}
                          className="bg-blue-600 hover:bg-blue-500 text-white p-4 rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-blue-900/20 transition-all active:scale-95 disabled:opacity-50"
                        >
                          {isAiProcessing ? '⏳ Đang xử lý...' : '🎥 Tạo Video'}
                        </button>
                      </div>

                      <div className="p-4 bg-blue-600/10 border border-blue-500/20 rounded-2xl">
                        <p className="text-[9px] text-blue-400 font-bold leading-relaxed">
                          💡 Mẹo: Mô tả càng chi tiết về ánh sáng, góc chụp và bối cảnh sẽ giúp AI tạo ra kết quả tốt hơn.
                        </p>
                      </div>
                    </div>

                    {/* AI History List */}
                    <div className="bg-slate-900/50 p-8 rounded-[32px] border border-white/5 space-y-6">
                      <div className="flex justify-between items-center">
                        <h4 className="text-sm font-black text-white uppercase tracking-widest">Lịch sử sáng tạo</h4>
                        <button 
                          onClick={() => confirm("Xóa toàn bộ lịch sử?") && setAiVideoHistory([])}
                          className="text-red-500 hover:text-red-400 text-[10px] font-black uppercase tracking-widest"
                        >
                          Xóa hết
                        </button>
                      </div>
                      
                      <div className="space-y-4 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
                        {aiVideoHistory.length > 0 ? aiVideoHistory.map(record => (
                          <div key={record.id} className="bg-slate-950/50 border border-white/5 p-4 rounded-2xl group hover:border-blue-500/30 transition-all">
                            <div className="flex gap-4">
                              <div className="w-24 h-24 rounded-xl overflow-hidden bg-black flex-shrink-0 border border-white/10">
                                {record.type === 'image' ? (
                                  <img src={record.url} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                                ) : (
                                  <video src={record.url} className="w-full h-full object-cover" muted playsInline />
                                )}
                              </div>
                              <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                                <div>
                                  <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">{record.date}</p>
                                  <p className="text-[11px] text-white font-medium line-clamp-2 italic">"{record.prompt}"</p>
                                </div>
                                <div className="flex gap-3 mt-2">
                                  <button 
                                    onClick={() => setAiResult({ type: record.type, url: record.url })}
                                    className="text-blue-500 hover:text-blue-400 text-[9px] font-black uppercase tracking-widest"
                                  >
                                    Xem lại
                                  </button>
                                  <button 
                                    onClick={() => {
                                      const newImg: GalleryImage = {
                                        id: Date.now().toString(),
                                        url: record.url,
                                        category: record.type === 'image' ? 'AI Image' : 'AI Video',
                                        title: record.prompt.substring(0, 30) + '...',
                                        type: record.type
                                      };
                                      setGallery(prev => [newImg, ...prev]);
                                      alert("Đã lưu vào thư viện!");
                                    }}
                                    className="text-emerald-500 hover:text-emerald-400 text-[9px] font-black uppercase tracking-widest"
                                  >
                                    Lưu thư viện
                                  </button>
                                  <button 
                                    onClick={() => setAiVideoHistory(prev => prev.filter(r => r.id !== record.id))}
                                    className="text-slate-600 hover:text-red-500 text-[9px] font-black uppercase tracking-widest ml-auto"
                                  >
                                    Xóa
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )) : (
                          <div className="py-10 text-center">
                            <p className="text-slate-600 text-[10px] font-bold uppercase">Chưa có lịch sử sáng tạo</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-slate-900/50 p-8 rounded-[32px] border border-white/5 min-h-[400px] flex flex-col items-center justify-center relative overflow-hidden">
                      {isAiProcessing ? (
                        <div className="text-center space-y-4">
                          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                          <p className="text-slate-500 font-black uppercase text-[10px] tracking-widest animate-pulse">AI đang sáng tạo nội dung...</p>
                        </div>
                      ) : aiResult ? (
                        <div className="w-full space-y-6 animate-in zoom-in-95 duration-500">
                          <div className="aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black flex items-center justify-center">
                            {aiResult.type === 'image' ? (
                              <img src={aiResult.url} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            ) : (
                              <video 
                                src={aiResult.url} 
                                controls 
                                autoPlay 
                                muted
                                loop 
                                playsInline
                                className="w-full h-full max-h-full" 
                              />
                            )}
                          </div>
                          <div className="flex flex-wrap gap-4">
                            {aiResult.type === 'video' && (
                              <a 
                                href={aiResult.url} 
                                download="dung-car-ai-video.mp4"
                                className="flex-1 bg-blue-600 hover:bg-blue-500 text-white p-4 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all active:scale-95 flex items-center justify-center gap-2"
                              >
                                📥 Tải Video
                              </a>
                            )}
                            <button 
                              onClick={() => {
                                const newImg: GalleryImage = {
                                  id: Date.now().toString(),
                                  url: aiResult.url,
                                  title: aiPrompt.substring(0, 20) + '...',
                                  category: 'general',
                                  type: aiResult.type as 'image' | 'video'
                                };
                                setGallery([newImg, ...gallery]);
                                alert("✅ Đã thêm vào thư viện!");
                              }}
                              className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white p-4 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all active:scale-95"
                            >
                              📥 Thêm vào Thư Viện
                            </button>
                            {aiResult.type === 'video' && (
                              <button 
                                onClick={() => {
                                  updateConfig('heroVideoUrl', aiResult.url);
                                  alert("✅ Đã áp dụng làm video Hero!");
                                }}
                                className="flex-1 bg-blue-600 hover:bg-blue-500 text-white p-4 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all active:scale-95"
                              >
                                ✨ Dùng làm Hero Video
                              </button>
                            )}
                            <button 
                              onClick={() => setAiResult(null)}
                              className="bg-slate-800 text-slate-400 p-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:text-white transition-all px-6"
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center space-y-4 opacity-30">
                          <div className="text-6xl">🪄</div>
                          <p className="text-slate-500 font-black uppercase text-[10px] tracking-widest">Kết quả AI sẽ hiển thị tại đây</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12 pt-12 border-t border-white/5">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter">AI Package Advisor</h3>
                      <p className="text-slate-500 text-[10px] md:text-[11px] font-black uppercase tracking-widest mt-1">Gợi ý gói dịch vụ tối ưu cho khách hàng</p>
                    </div>
                    <div className="bg-slate-900/50 p-8 rounded-[32px] border border-white/5 space-y-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Tình trạng xe hiện tại</label>
                        <textarea 
                          value={carCondition}
                          onChange={(e) => setCarCondition(e.target.value)}
                          placeholder="Ví dụ: Xe mới mua, sơn còn đẹp nhưng muốn bảo vệ lâu dài. Hoặc: Xe cũ 5 năm, sơn bị xước xoáy nhiều, nội thất bẩn..."
                          className="w-full bg-slate-950 border border-white/10 rounded-2xl p-4 text-white text-sm h-24 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Mong muốn của khách hàng</label>
                        <textarea 
                          value={desiredOutcome}
                          onChange={(e) => setDesiredOutcome(e.target.value)}
                          placeholder="Ví dụ: Muốn xe bóng loáng như mới, dễ vệ sinh, bảo hành dài hạn..."
                          className="w-full bg-slate-950 border border-white/10 rounded-2xl p-4 text-white text-sm h-24 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        />
                      </div>
                      <button 
                        onClick={handleAiSuggestPackage}
                        disabled={isAiProcessing}
                        className="w-full bg-blue-600 hover:bg-blue-500 text-white p-4 rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-blue-900/20 transition-all active:scale-95 disabled:opacity-50"
                      >
                        {isAiProcessing ? '⏳ Đang phân tích...' : '🪄 Phân Tích & Gợi Ý'}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-slate-900/50 p-8 rounded-[32px] border border-white/5 min-h-[400px] flex flex-col relative overflow-hidden">
                      {isAiProcessing ? (
                        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
                          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                          <p className="text-slate-500 font-black uppercase text-[10px] tracking-widest animate-pulse">AI đang phân tích dữ liệu...</p>
                        </div>
                      ) : aiSuggestion ? (
                        <div className="flex-1 space-y-6 animate-in fade-in duration-500">
                          <div className="prose prose-invert prose-sm max-w-none">
                            <div className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
                              {aiSuggestion}
                            </div>
                          </div>
                          <button 
                            onClick={() => setAiSuggestion(null)}
                            className="w-full bg-slate-800 text-slate-400 p-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:text-white transition-all"
                          >
                            Làm mới
                          </button>
                        </div>
                      ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 opacity-30">
                          <div className="text-6xl">📋</div>
                          <p className="text-slate-500 font-black uppercase text-[10px] tracking-widest">Gợi ý từ AI sẽ hiển thị tại đây</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
              {activeTab === 'config' && (
              <div className="space-y-8 max-w-5xl">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter">Cấu Hình Hệ Thống</h3>
                    <p className="text-slate-500 text-[10px] md:text-[11px] font-black uppercase tracking-widest mt-1">Quản lý định danh, liên hệ và bảo mật</p>
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <button onClick={onClose} className="flex-1 sm:flex-none px-6 py-3 rounded-xl md:rounded-2xl bg-slate-800 text-slate-400 font-black uppercase text-[9px] md:text-[10px] hover:text-white transition-all">Đóng</button>
                    <button onClick={() => { alert("✅ Cấu hình đã được áp dụng!"); onClose(); }} className="flex-1 sm:flex-none px-6 py-3 rounded-xl md:rounded-2xl bg-blue-600 text-white font-black uppercase text-[9px] md:text-[10px] shadow-xl hover:bg-blue-500 transition-all active:scale-95">Lưu & Áp Dụng</button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  {/* Identity & Security */}
                  <div className="bg-slate-900/50 p-6 md:p-10 rounded-[24px] md:rounded-[40px] border border-white/5 space-y-6 md:space-y-8 flex flex-col">
                    <h4 className="text-[10px] md:text-[11px] font-black uppercase text-blue-500 tracking-[0.2em] flex items-center gap-3">
                      <span className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)]"></span> Định Danh & Bảo Mật
                    </h4>
                    <div className="space-y-4 md:space-y-6 flex-1">
                      <div className="group space-y-2">
                        <label className="text-[8px] md:text-[9px] text-slate-500 uppercase font-black tracking-widest group-focus-within:text-blue-500 transition-colors">Tên Dự Án (Site Name)</label>
                        <input 
                          value={siteConfig.siteName} 
                          onChange={e => updateConfig('siteName', e.target.value)} 
                          className="w-full bg-slate-950 border border-white/5 rounded-xl md:rounded-2xl p-4 text-white text-sm focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                        />
                      </div>
                      <div className="group space-y-2">
                        <label className="text-[8px] md:text-[9px] text-slate-500 uppercase font-black tracking-widest group-focus-within:text-blue-500 transition-colors">Logo Thương Hiệu</label>
                        <div className="flex flex-col sm:flex-row gap-3">
                          <div className="flex-1 flex gap-2">
                            <input 
                              value={siteConfig.logoUrl || ''} 
                              onChange={e => updateConfig('logoUrl', e.target.value)} 
                              placeholder="Nhập URL ảnh hoặc tải lên..."
                              className="flex-1 bg-slate-950 border border-white/5 rounded-xl md:rounded-2xl p-4 text-white text-sm focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                            />
                            <label className="w-12 h-12 md:w-14 md:h-14 bg-blue-600/20 border border-blue-500/30 rounded-xl md:rounded-2xl flex items-center justify-center cursor-pointer hover:bg-blue-600/40 transition-all shrink-0 group/upload">
                              <input 
                                type="file" 
                                onChange={e => handleImageUpload(e, (b) => updateConfig('logoUrl', b))} 
                                className="hidden" 
                                accept="image/*" 
                              />
                              <Upload className="w-5 h-5 text-blue-500 group-hover/upload:scale-110 transition-transform" />
                            </label>
                          </div>
                          <div className="w-12 h-12 md:w-14 md:h-14 bg-slate-950 border border-white/5 rounded-xl md:rounded-2xl flex items-center justify-center overflow-hidden shrink-0">
                            {siteConfig.logoUrl ? (
                              <img src={siteConfig.logoUrl} alt="Logo Preview" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-blue-600 to-emerald-600 flex items-center justify-center font-black text-white text-xs">
                                {siteConfig.siteName.charAt(0)}
                              </div>
                            )}
                          </div>
                        </div>
                        <p className="text-[8px] text-slate-600 italic">Để trống để dùng chữ cái đầu của tên thương hiệu.</p>
                      </div>
                      <div className="group space-y-2">
                        <label className="text-[8px] md:text-[9px] text-slate-500 uppercase font-black tracking-widest group-focus-within:text-blue-500 transition-colors">Tên Bản Quyền</label>
                        <input 
                          value={siteConfig.copyright} 
                          onChange={e => updateConfig('copyright', e.target.value)} 
                          className="w-full bg-slate-950 border border-white/5 rounded-xl md:rounded-2xl p-4 text-white text-sm focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                        />
                      </div>
                      <div className="group space-y-2">
                        <label className="text-[8px] md:text-[9px] text-slate-500 uppercase font-black tracking-widest group-focus-within:text-blue-500 transition-colors">Mật Khẩu Quản Trị (Kế Toán)</label>
                        <input 
                          type="password" 
                          value={siteConfig.adminPassword} 
                          onChange={e => updateConfig('adminPassword', e.target.value)} 
                          className="w-full bg-slate-950 border border-white/5 rounded-xl md:rounded-2xl p-4 text-white text-sm focus:ring-1 focus:ring-blue-500 outline-none transition-all tracking-[0.3em] md:tracking-[0.5em]"
                        />
                      </div>
                      <div className="group space-y-2">
                        <label className="text-[8px] md:text-[9px] text-slate-500 uppercase font-black tracking-widest group-focus-within:text-blue-500 transition-colors">Mật Khẩu Thiết Kế (Giao Diện)</label>
                        <input 
                          type="password" 
                          value={siteConfig.designPassword} 
                          onChange={e => updateConfig('designPassword', e.target.value)} 
                          className="w-full bg-slate-950 border border-white/5 rounded-xl md:rounded-2xl p-4 text-white text-sm focus:ring-1 focus:ring-blue-500 outline-none transition-all tracking-[0.3em] md:tracking-[0.5em]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="bg-slate-900/50 p-6 md:p-10 rounded-[24px] md:rounded-[40px] border border-white/5 space-y-6 md:space-y-8 flex flex-col">
                    <h4 className="text-[10px] md:text-[11px] font-black uppercase text-blue-500 tracking-[0.2em] flex items-center gap-3">
                      <span className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)]"></span> Liên Hệ
                    </h4>
                    <div className="space-y-4 md:space-y-6 flex-1">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="group space-y-2">
                          <label className="text-[8px] md:text-[9px] text-slate-500 uppercase font-black tracking-widest group-focus-within:text-blue-500 transition-colors">Hotline</label>
                          <input value={siteConfig.contactPhone} onChange={e => updateConfig('contactPhone', e.target.value)} className="w-full bg-slate-950 border border-white/5 rounded-xl md:rounded-2xl p-4 text-white text-sm" />
                        </div>
                        <div className="group space-y-2">
                          <div className="flex justify-between items-center">
                            <label className="text-[8px] md:text-[9px] text-slate-500 uppercase font-black tracking-widest group-focus-within:text-blue-500 transition-colors">Email</label>
                            <button 
                              onClick={async () => {
                                if (!siteConfig.contactEmail) return alert("Vui lòng nhập email trước!");
                                try {
                                  const res = await fetch('/api/send-email', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({
                                      to: siteConfig.contactEmail,
                                      subject: 'Test Email from XE ĐẸP AUTO',
                                      html: '<h1>Hệ thống gửi email hoạt động tốt!</h1><p>Đây là email kiểm tra từ website của bạn.</p>'
                                    })
                                  });
                                  if (res.ok) alert("Đã gửi email kiểm tra thành công!");
                                  else {
                                    const err = await res.json();
                                    alert("Lỗi: " + (err.error || "Không rõ nguyên nhân"));
                                  }
                                } catch (e) {
                                  alert("Lỗi kết nối server!");
                                }
                              }}
                              className="text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded bg-blue-600/10 text-blue-500 hover:bg-blue-600 hover:text-white transition-all"
                            >
                              🚀 Test Email
                            </button>
                          </div>
                          <input value={siteConfig.contactEmail} onChange={e => updateConfig('contactEmail', e.target.value)} className="w-full bg-slate-950 border border-white/5 rounded-xl md:rounded-2xl p-4 text-white text-sm" />
                        </div>
                        <div className="group space-y-2">
                          <label className="text-[8px] md:text-[9px] text-slate-500 uppercase font-black tracking-widest group-focus-within:text-blue-500 transition-colors">Giờ Mở Cửa</label>
                          <input value={siteConfig.contactHours} onChange={e => updateConfig('contactHours', e.target.value)} className="w-full bg-slate-950 border border-white/5 rounded-xl md:rounded-2xl p-4 text-white text-sm" />
                        </div>
                      </div>
                      <div className="group space-y-2">
                        <label className="text-[8px] md:text-[9px] text-slate-500 uppercase font-black tracking-widest group-focus-within:text-blue-500 transition-colors">Địa Chỉ Văn Phòng</label>
                        <textarea value={siteConfig.contactAddress} onChange={e => updateConfig('contactAddress', e.target.value)} className="w-full bg-slate-950 border border-white/5 rounded-xl md:rounded-2xl p-4 text-white text-sm h-20 resize-none" />
                        <p className="text-[8px] text-slate-600 italic">* Bản đồ Google Maps sẽ tự động cập nhật theo địa chỉ này.</p>
                      </div>
                    </div>
                  </div>

                  {/* Social Media Links */}
                  <div className="bg-slate-900/50 p-6 md:p-10 rounded-[24px] md:rounded-[40px] border border-white/5 space-y-6 md:space-y-8 flex flex-col md:col-span-2">
                    <h4 className="text-[10px] md:text-[11px] font-black uppercase text-blue-500 tracking-[0.2em] flex items-center gap-3">
                      <span className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)]"></span> Mạng Xã Hội
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 flex-1">
                      <div className="group space-y-2">
                        <label className="text-[8px] md:text-[9px] text-slate-500 uppercase font-black tracking-widest group-focus-within:text-blue-500 transition-colors flex items-center gap-2">Facebook</label>
                        <input value={siteConfig.facebookUrl} onChange={e => updateConfig('facebookUrl', e.target.value)} className="w-full bg-slate-950 border border-white/5 rounded-xl md:rounded-2xl p-4 text-white text-xs" />
                      </div>
                      <div className="group space-y-2">
                        <label className="text-[8px] md:text-[9px] text-slate-500 uppercase font-black tracking-widest group-focus-within:text-red-500 transition-colors flex items-center gap-2">YouTube</label>
                        <input value={siteConfig.youtubeUrl} onChange={e => updateConfig('youtubeUrl', e.target.value)} className="w-full bg-slate-950 border border-white/5 rounded-xl md:rounded-2xl p-4 text-white text-xs" />
                      </div>
                      <div className="group space-y-2">
                        <label className="text-[8px] md:text-[9px] text-slate-500 uppercase font-black tracking-widest group-focus-within:text-pink-500 transition-colors flex items-center gap-2">Instagram</label>
                        <input value={siteConfig.instagramUrl} onChange={e => updateConfig('instagramUrl', e.target.value)} className="w-full bg-slate-950 border border-white/5 rounded-xl md:rounded-2xl p-4 text-white text-xs" />
                      </div>
                      <div className="group space-y-2">
                        <label className="text-[8px] md:text-[9px] text-slate-500 uppercase font-black tracking-widest group-focus-within:text-emerald-500 transition-colors flex items-center gap-2">Zalo</label>
                        <input value={siteConfig.zaloNumber} onChange={e => updateConfig('zaloNumber', e.target.value)} className="w-full bg-slate-950 border border-white/5 rounded-xl md:rounded-2xl p-4 text-white text-xs" />
                      </div>
                    </div>
                  </div>

                  {/* Section Titles Configuration */}
                  <div className="bg-slate-900/50 p-6 md:p-10 rounded-[24px] md:rounded-[40px] border border-white/5 space-y-6 md:space-y-8 flex flex-col md:col-span-2">
                    <h4 className="text-[10px] md:text-[11px] font-black uppercase text-blue-500 tracking-[0.2em] flex items-center gap-3">
                      <span className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)]"></span> Tiêu Đề Các Mục
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 flex-1">
                      <div className="group space-y-2">
                        <label className="text-[8px] md:text-[9px] text-slate-500 uppercase font-black tracking-widest group-focus-within:text-blue-500 transition-colors">Mục Dịch Vụ</label>
                        <input value={siteConfig.servicesTitle} onChange={e => updateConfig('servicesTitle', e.target.value)} className="w-full bg-slate-950 border border-white/5 rounded-xl md:rounded-2xl p-4 text-white text-xs" />
                      </div>
                      <div className="group space-y-2">
                        <label className="text-[8px] md:text-[9px] text-slate-500 uppercase font-black tracking-widest group-focus-within:text-blue-500 transition-colors">Mục Cao Cấp</label>
                        <input value={siteConfig.premiumTitle} onChange={e => updateConfig('premiumTitle', e.target.value)} className="w-full bg-slate-950 border border-white/5 rounded-xl md:rounded-2xl p-4 text-white text-xs" />
                      </div>
                      <div className="group space-y-2">
                        <label className="text-[8px] md:text-[9px] text-slate-500 uppercase font-black tracking-widest group-focus-within:text-blue-500 transition-colors">Mục Thư Viện</label>
                        <input value={siteConfig.galleryTitle} onChange={e => updateConfig('galleryTitle', e.target.value)} className="w-full bg-slate-950 border border-white/5 rounded-xl md:rounded-2xl p-4 text-white text-xs" />
                      </div>
                      <div className="group space-y-2">
                        <label className="text-[8px] md:text-[9px] text-slate-500 uppercase font-black tracking-widest group-focus-within:text-blue-500 transition-colors">Mục Đánh Giá</label>
                        <input value={siteConfig.reviewsTitle} onChange={e => updateConfig('reviewsTitle', e.target.value)} className="w-full bg-slate-950 border border-white/5 rounded-xl md:rounded-2xl p-4 text-white text-xs" />
                      </div>
                      <div className="group space-y-2">
                        <label className="text-[8px] md:text-[9px] text-slate-500 uppercase font-black tracking-widest group-focus-within:text-blue-500 transition-colors">Mục Cố Vấn AI</label>
                        <input value={siteConfig.aiTitle} onChange={e => updateConfig('aiTitle', e.target.value)} className="w-full bg-slate-950 border border-white/5 rounded-xl md:rounded-2xl p-4 text-white text-xs" />
                      </div>
                      <div className="group space-y-2">
                        <label className="text-[8px] md:text-[9px] text-slate-500 uppercase font-black tracking-widest group-focus-within:text-blue-500 transition-colors">Mục Tin Tức</label>
                        <input value={siteConfig.newsTitle} onChange={e => updateConfig('newsTitle', e.target.value)} className="w-full bg-slate-950 border border-white/5 rounded-xl md:rounded-2xl p-4 text-white text-xs" />
                      </div>
                    </div>
                  </div>

                  {/* Danger Zone */}
                  <div className="bg-red-950/20 p-6 md:p-10 rounded-[24px] md:rounded-[40px] border border-red-500/20 space-y-6 md:space-y-8 flex flex-col md:col-span-2">
                    <h4 className="text-[10px] md:text-[11px] font-black uppercase text-red-500 tracking-[0.2em] flex items-center gap-3">Tác Vụ Nguy Hiểm</h4>
                    <div className="flex flex-col lg:flex-row items-center gap-4 md:gap-8">
                      <p className="flex-1 text-[10px] md:text-[11px] text-slate-400 font-medium leading-relaxed italic">
                        Lưu ý: Các hành động dưới đây không thể hoàn tác. Mọi dữ liệu sẽ bị xóa sạch và khôi phục về trạng thái gốc.
                      </p>
                      <button 
                        onClick={() => confirm("⚠️ RESET TOÀN BỘ HỆ THỐNG?") && (localStorage.clear(), window.location.reload())} 
                        className="w-full lg:w-auto bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white border border-red-500/30 px-6 md:px-10 py-4 md:py-5 rounded-xl md:rounded-2xl text-[9px] md:text-[10px] font-black uppercase transition-all shadow-xl active:scale-95"
                      >
                        Reset Hệ Thống
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  </motion.div>
</motion.div>
)}
</AnimatePresence>
  );
};

const NewsManagement: React.FC<{
  news: NewsArticle[];
  setNews: (news: NewsArticle[]) => void;
}> = ({ news, setNews }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<NewsArticle>>({
    title: '', excerpt: '', content: '', image: '', category: 'tip', author: 'Admin', date: new Date().toISOString().split('T')[0]
  });

  const handleSave = () => {
    if (!form.title || !form.content) return alert("Vui lòng nhập tiêu đề và nội dung!");
    
    if (editingId) {
      setNews(news.map(n => n.id === editingId ? { ...n, ...form as NewsArticle } : n));
    } else {
      setNews([{ ...form as NewsArticle, id: Date.now().toString() }, ...news]);
    }
    setIsAdding(false);
    setEditingId(null);
    setForm({ title: '', excerpt: '', content: '', image: '', category: 'tip', author: 'Admin', date: new Date().toISOString().split('T')[0] });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Quản Lý Tin Tức & Mẹo</h3>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-1">Đăng tải bài viết, hướng dẫn và khuyến mãi</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest shadow-xl transition-all active:scale-95 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Thêm Bài Viết
        </button>
      </div>

      {isAdding ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900/50 border border-white/10 p-8 rounded-[32px] space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Tiêu đề bài viết</label>
              <input 
                value={form.title}
                onChange={e => setForm({...form, title: e.target.value})}
                className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Phân loại</label>
              <select 
                value={form.category}
                onChange={e => setForm({...form, category: e.target.value as any})}
                className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-blue-500"
              >
                <option value="tip">Mẹo chăm sóc xe</option>
                <option value="news">Tin tức dịch vụ</option>
                <option value="promotion">Khuyến mãi</option>
              </select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Mô tả ngắn (Excerpt)</label>
              <textarea 
                value={form.excerpt}
                onChange={e => setForm({...form, excerpt: e.target.value})}
                className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white h-20 outline-none focus:border-blue-500"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Nội dung chi tiết (Markdown)</label>
              <textarea 
                value={form.content}
                onChange={e => setForm({...form, content: e.target.value})}
                className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white h-60 outline-none focus:border-blue-500 font-mono text-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">URL Ảnh bìa</label>
              <input 
                value={form.image}
                onChange={e => setForm({...form, image: e.target.value})}
                className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Tác giả</label>
              <input 
                value={form.author}
                onChange={e => setForm({...form, author: e.target.value})}
                className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex gap-4 pt-4">
            <button onClick={handleSave} className="flex-1 bg-blue-600 text-white py-4 rounded-xl font-black uppercase tracking-widest hover:bg-blue-500 transition-all">Lưu Bài Viết</button>
            <button onClick={() => { setIsAdding(false); setEditingId(null); }} className="px-8 bg-slate-800 text-slate-400 rounded-xl font-black uppercase tracking-widest hover:text-white transition-all">Hủy</button>
          </div>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map(article => (
            <div key={article.id} className="bg-slate-900/40 border border-white/5 rounded-3xl overflow-hidden group hover:border-blue-500/30 transition-all">
              <div className="aspect-video relative overflow-hidden">
                <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                <div className="absolute top-4 left-4 px-3 py-1 bg-blue-600 text-white text-[8px] font-black uppercase tracking-widest rounded-full">
                  {article.category}
                </div>
              </div>
              <div className="p-6 space-y-4">
                <h4 className="text-white font-black text-lg line-clamp-2 uppercase tracking-tight">{article.title}</h4>
                <p className="text-slate-500 text-xs line-clamp-3">{article.excerpt}</p>
                <div className="flex justify-between items-center pt-4 border-t border-white/5">
                  <div className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">{article.date}</div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => {
                        setForm(article);
                        setEditingId(article.id);
                        setIsAdding(true);
                      }}
                      className="p-2 bg-slate-800 text-slate-400 hover:text-blue-500 rounded-lg transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => confirm("Xóa bài viết này?") && setNews(news.filter(n => n.id !== article.id))}
                      className="p-2 bg-slate-800 text-slate-400 hover:text-red-500 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const SidebarMenu: React.FC<{ 
  isOpen: boolean; 
  onClose: () => void; 
  isEditMode: boolean;
  siteConfig: SiteConfig;
  onAdminClick: () => void;
  onAddRecord: () => void;
  onOpenDashboard: () => void;
  onReset: () => void;
  scrollToSection: (id: string) => void;
}> = ({ isOpen, onClose, isEditMode, siteConfig, onAdminClick, onAddRecord, onOpenDashboard, onReset, scrollToSection }) => {
  const handleNav = (id: string) => {
    scrollToSection(id);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[150]" 
            onClick={onClose}
          />
          <motion.div 
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 h-full w-[280px] sm:w-[320px] bg-slate-950 border-r border-white/5 z-[160] shadow-2xl flex flex-col"
          >
            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-slate-900/50">
              <div className="flex items-center gap-3">
                {siteConfig.logoUrl ? (
                  <img 
                    src={siteConfig.logoUrl} 
                    alt="Logo" 
                    className="w-8 h-8 object-contain"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-emerald-600 rounded-lg flex items-center justify-center font-black text-white text-sm">
                    {siteConfig.siteName.charAt(0)}
                  </div>
                )}
                <div className="font-black text-2xl tracking-tighter text-white">
                  {siteConfig.siteName.split(' ')[0]} <span className="text-blue-500">{siteConfig.siteName.split(' ')[1] || ''}</span>
                </div>
              </div>
              <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">✕</button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
              <nav className="space-y-2">
                <button onClick={() => { window.scrollTo({top: 0, behavior: 'smooth'}); onClose(); }} className="w-full text-left p-4 rounded-2xl hover:bg-slate-900 transition-all font-bold text-slate-300 flex items-center gap-3">🏠 Trang Chủ</button>
                <button onClick={() => handleNav('tracking')} className="w-full text-left p-4 rounded-2xl bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/20 transition-all font-bold text-blue-400 flex items-center justify-between group">
                  <span className="flex items-center gap-3">⏱️ Theo Dõi Xe</span>
                  <span className="text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">Live</span>
                </button>
                <button onClick={() => handleNav('promotions')} className="w-full text-left p-4 rounded-2xl hover:bg-slate-900 transition-all font-bold text-slate-300 flex items-center gap-3">🎁 Khuyến Mãi</button>
                <button onClick={() => handleNav('services')} className="w-full text-left p-4 rounded-2xl hover:bg-slate-900 transition-all font-bold text-slate-300 flex items-center gap-3">🛠️ Dịch Vụ</button>
                <button onClick={() => handleNav('packages')} className="w-full text-left p-4 rounded-2xl hover:bg-slate-900 transition-all font-bold text-slate-300 flex items-center gap-3">📦 Bảng Giá Gói</button>
                <button onClick={() => handleNav('window-tinting')} className="w-full text-left p-4 rounded-2xl hover:bg-slate-900 transition-all font-bold text-slate-300 flex items-center gap-3">🕶️ Dán Phim</button>
                <button onClick={() => handleNav('wrap-ppf')} className="w-full text-left p-4 rounded-2xl hover:bg-slate-900 transition-all font-bold text-slate-300 flex items-center gap-3">🎨 Wrap & PPF</button>
                <button onClick={() => handleNav('tuning')} className="w-full text-left p-4 rounded-2xl hover:bg-slate-900 transition-all font-bold text-slate-300 flex items-center gap-3">🏎️ Độ Xe</button>
                <button onClick={() => handleNav('premium')} className="w-full text-left p-4 rounded-2xl hover:bg-slate-900 transition-all font-bold text-slate-300 flex items-center gap-3">💎 Giải Pháp Cao Cấp</button>
                <button onClick={() => handleNav('ai-advisor')} className="w-full text-left p-4 rounded-2xl hover:bg-slate-900 transition-all font-bold text-slate-300 flex items-center gap-3">🤖 Cố Vấn AI</button>
                <button onClick={() => handleNav('news')} className="w-full text-left p-4 rounded-2xl hover:bg-slate-900 transition-all font-bold text-slate-300 flex items-center gap-3">📰 Tin Tức</button>
                <button onClick={() => handleNav('gallery')} className="w-full text-left p-4 rounded-2xl hover:bg-slate-900 transition-all font-bold text-slate-300 flex items-center gap-3">🖼️ Thư Viện</button>
                <button onClick={() => handleNav('reviews')} className="w-full text-left p-4 rounded-2xl hover:bg-slate-900 transition-all font-bold text-slate-300 flex items-center gap-3">⭐ Đánh Giá</button>
              </nav>
              
              <div className="pt-10 border-t border-white/5 mt-6 space-y-4">
                <h4 className="text-[10px] font-black text-slate-600 uppercase tracking-widest px-4 mb-2">Hệ Thống Quản Trị</h4>
                {isEditMode ? (
                  <div className="space-y-3">
                    <div className="bg-blue-600/10 border border-blue-500/20 p-4 rounded-2xl">
                      <p className="text-[10px] text-blue-400 font-black uppercase mb-3">Chế độ quản trị viên</p>
                      <button onClick={onOpenDashboard} className="w-full text-left p-3 rounded-xl bg-blue-600 text-white font-bold flex items-center gap-3 text-xs mb-2 shadow-lg shadow-blue-900/20 active:scale-95 transition-all">⚙️ Dashboard Tổng</button>
                      <button onClick={onAddRecord} className="w-full text-left p-3 rounded-xl bg-slate-800 text-white border border-white/5 font-bold flex items-center gap-3 text-xs mb-2 active:scale-95 transition-all">👤 Quản Lý Khách Hàng</button>
                    </div>
                    <button onClick={() => { onAdminClick(); onClose(); }} className="w-full text-center p-4 rounded-2xl bg-slate-900 text-slate-500 font-black text-xs uppercase tracking-widest border border-white/10 hover:text-white transition-all">Đăng Xuất Admin</button>
                  </div>
                ) : (
                  <button onClick={() => { onAdminClick(); onClose(); }} className="w-full text-left p-4 rounded-2xl bg-slate-900/50 hover:bg-slate-900 border border-white/10 text-slate-300 font-bold flex items-center gap-3 transition-all active:scale-95">🔐 Đăng Nhập Admin</button>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const AdminLoginModal: React.FC<{ isOpen: boolean; onClose: () => void; onSuccess: () => void; pass?: string; siteName: string; t: (key: string) => string }> = ({ isOpen, onClose, onSuccess, pass, siteName, t }) => {
  const [input, setInput] = useState('');
  
  // Xóa trắng input khi modal đóng hoặc mở
  useEffect(() => {
    if (!isOpen) setInput('');
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLogin = () => {
    // Trim input để tránh lỗi do dấu cách thừa
    const normalizedInput = input.trim();
    // Ưu tiên sử dụng pass từ config, nếu không có thì dùng mật khẩu mặc định mới nhất
    const normalizedPass = (pass || DEFAULT_SITE_CONFIG.adminPassword || 'admin').trim();
    
    if (normalizedInput === normalizedPass) {
      onSuccess();
    } else {
      alert(t('admin_wrong_password'));
      setInput('');
    }
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl">
      <div className="bg-slate-900 border border-white/10 p-8 rounded-[40px] w-full max-w-sm shadow-3xl">
        <h3 className="text-xl font-black text-white text-center mb-6 uppercase tracking-widest">{siteName} ADMIN</h3>
        <input 
          type="password" 
          autoFocus 
          placeholder={t('admin_password_placeholder')} 
          className="w-full bg-slate-950 border border-white/5 rounded-2xl p-4 text-center tracking-[0.3em] md:tracking-[0.8em] mb-4 text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleLogin()}
        />
        <button 
          onClick={handleLogin} 
          className="w-full bg-blue-600 p-4 rounded-2xl font-black uppercase tracking-widest text-white shadow-xl shadow-blue-900/40 hover:bg-blue-500 transition-all active:scale-95"
        >{t('admin_login')}</button>
        <button onClick={onClose} className="w-full mt-4 text-slate-500 text-xs uppercase font-bold tracking-widest hover:text-white transition-colors">{t('admin_cancel')}</button>
      </div>
    </div>
  );
};

// --- HomePage ---

const translations = {
  vi: {
    hero_subtitle: "Nghệ Thuật Chăm Sóc Xe",
    hero_title: "XE ĐẸP AUTO",
    hero_description: "Trung tâm Detailing & Chăm sóc xe hơi chuyên nghiệp hàng đầu Hà Nội. Chúng tôi mang đến sự hoàn hảo cho xế yêu của bạn.",
    book_now: "Đặt Lịch Ngay",
    explore_services: "Khám Phá Dịch Vụ",
    share: "Chia Sẻ",
    track_car: "Theo Dõi Xe",
    ai_advisor: "Cố Vấn AI",
    promotions: "Khuyến Mãi",
    services: "Dịch Vụ",
    packages: "Bảng Giá",
    news: "Tin Tức",
    gallery: "Thư Viện",
    reviews: "Đánh Giá",
    hotline: "Hotline 24/7",
    address: "Địa Chỉ",
    hours: "Giờ Mở Cửa",
    satisfied_customers: "Khách Hàng Hài Lòng",
    years_experience: "Năm Kinh Nghiệm",
    google_reviews: "Đánh Giá Google",
    premium_services: "Dịch Vụ Cao Cấp",
    scroll: "Cuộn",
    all: "Tất Cả",
    cat_exterior: "Ngoại Thất",
    cat_interior: "Nội Thất",
    cat_protection: "Bảo Vệ",
    cat_tuning: "Nâng Cấp",
    search_placeholder: "Tìm kiếm dịch vụ...",
    view_details: "Xem Chi Tiết",
    chat_with_ai: "Chat với AI",
    new_service: "Dịch Vụ Mới",
    comprehensive_care_package: "Gói Chăm Sóc Toàn Diện",
    service_package_pricing: "Bảng Giá Gói Dịch Vụ",
    packages_description: "Tiết kiệm hơn với các gói chăm sóc xe chuyên sâu được thiết kế riêng cho từng nhu cầu.",
    most_popular: "Phổ Biến Nhất",
    execution_time: "Thời gian thực hiện",
    book_now_package: "Đặt Lịch Ngay",
    before: "Trước",
    after: "Sau",
    absolute_difference: "Sự Khác Biệt Tuyệt Đối",
    standard_process: "Quy Trình Chuẩn",
    superior_benefits: "Lợi ích vượt trội",
    get_quote: "Nhận báo giá chi tiết",
    ai_powered_assistant: "Trợ lý AI",
    ai_detailing_advice: "Tư vấn Detailing",
    ai_detailing_desc: "Hỏi về Ceramic, PPF, vệ sinh nội thất...",
    ai_maintenance: "Bảo dưỡng xe",
    ai_maintenance_desc: "Lịch trình bảo dưỡng, xử lý lỗi vặt...",
    customers_used: "Khách hàng đã sử dụng",
    ai_technical_expert: "Chuyên gia tư vấn kỹ thuật",
    clear_chat_history: "Xóa lịch sử trò chuyện",
    ai_processing: "AI đang xử lý...",
    ai_input_placeholder: "Nhập câu hỏi của bạn tại đây...",
    ai_answering: "AI đang trả lời...",
    tint_uv_protection: "Cản 99% Tia UV",
    tint_uv_desc: "Bảo vệ da và mắt khỏi tác hại của ánh nắng.",
    tint_heat_reduction: "Giảm Nhiệt 97%",
    tint_heat_desc: "Tiết kiệm nhiên liệu, làm mát nhanh chóng.",
    tint_privacy: "Riêng Tư Tuyệt Đối",
    tint_privacy_desc: "Người ngoài khó nhìn vào, bên trong nhìn rõ.",
    tint_warranty: "Bảo Hành Trọn Đời",
    tint_warranty_desc: "Cam kết chất lượng, không bong tróc, bay màu.",
    tint_consult: "Tư Vấn Dán Phim",
    tint_view_packages: "Xem Các Gói Phim",
    tint_3m_title: "Phim Cách Nhiệt 3M",
    tint_3m_desc: "Chính hãng Hoa Kỳ",
    tint_3m_quote: "\"Công nghệ phim quang học đa lớp độc quyền, mang lại hiệu suất cản nhiệt vượt trội mà vẫn giữ được độ trong suốt hoàn hảo.\"",
    ppf_self_healing: "PPF Tự Phục Hồi",
    ppf_self_healing_desc: "Vết xước dăm tự biến mất dưới tác động nhiệt.",
    wrap_color_change: "Wrap Đổi Màu",
    wrap_color_change_desc: "Hơn 500+ mã màu từ các thương hiệu hàng đầu.",
    ppf_protect_original: "Bảo Vệ Sơn Gốc",
    ppf_protect_original_desc: "Giữ lớp sơn nguyên bản luôn như mới sau nhiều năm.",
    wrap_durability: "Độ Bền 5-10 Năm",
    wrap_durability_desc: "Cam kết không bong tróc, không để lại keo.",
    ppf_consult: "Tư Vấn Wrap & PPF",
    ppf_view_colors: "Xem Bảng Màu",
    ppf_tpu_title: "Paint Protection Film",
    ppf_tpu_desc: "Công nghệ TPU cao cấp",
    ppf_tpu_quote: "\"Lớp giáp vô hình bảo vệ xế cưng khỏi đá văng, trầy xước và tác động của môi trường, đồng thời tăng độ bóng sâu cho sơn xe.\"",
    tuning_lighting: "Nâng Cấp Ánh Sáng",
    tuning_lighting_desc: "Độ đèn Bi-LED, Laser tăng sáng vượt trội và thẩm mỹ.",
    tuning_audio: "Âm Thanh Hi-End",
    tuning_audio_desc: "Hệ thống loa, sub, dsp từ các thương hiệu danh tiếng.",
    tuning_bodykit: "Bodykit & Mâm",
    tuning_bodykit_desc: "Cá nhân hóa ngoại thất, tạo điểm nhấn riêng biệt.",
    tuning_performance: "Performance",
    tuning_performance_desc: "Tối ưu hiệu năng vận hành, cảm giác lái phấn khích.",
    tuning_consult: "Tư Vấn Độ Xe",
    tuning_view_projects: "Xem Dự Án",
    tuning_pro_title: "Professional Tuning",
    tuning_pro_desc: "Kỹ thuật viên tay nghề cao",
    tuning_pro_quote: "\"Biến ý tưởng của bạn thành hiện thực với những giải pháp độ xe an toàn, thẩm mỹ và tuân thủ các tiêu chuẩn kỹ thuật khắt khe nhất.\"",
    visual_showcase: "Visual Showcase",
    ai_edit: "AI Edit",
    ai_edit_prompt: "AI Chỉnh sửa ảnh này (VD: Hiệu ứng bóng sơn):",
    privacy_policy: "Chính Sách Bảo Mật",
    terms_of_service: "Điều Khoản Dịch Vụ",
    zalo_consult: "Tư vấn Zalo",
    before_after: "Trước & Sau",
    tracking_title: "Theo Dõi Tiến Độ",
    tracking_description: "Nhập biển số xe để kiểm tra tình trạng chăm sóc xe của bạn.",
    plate_placeholder: "VD: 30A-12345",
    check_status: "Kiểm Tra Trạng Thái",
    tracking_system: "Hệ thống theo dõi trực tuyến",
    check_progress: "Kiểm Tra Tiến Độ",
    tracking_desc: "Minh bạch trong từng công đoạn. Nhập biển số xe của bạn để xem quy trình chăm sóc đang diễn ra như thế nào.",
    stat_working: "Đang xử lý",
    stat_ready: "Sẵn sàng bàn giao",
    stat_waiting: "Đang chờ",
    stat_total: "Tổng số xe",
    search_plate_placeholder: "Nhập biển số xe của bạn (VD: 30A-123.45)...",
    search_now: "Tìm kiếm ngay",
    no_vehicle_found: "Không tìm thấy xe",
    check_plate_again: "Vui lòng kiểm tra lại biển số xe bạn đã nhập.",
    enter_plate_to_track: "Nhập biển số để bắt đầu theo dõi",
    current_progress: "Tiến độ hiện tại",
    customer: "Khách hàng",
    technician_in_charge: "KTV Phụ trách",
    estimated_finish: "Dự kiến xong",
    total_cost: "Tổng chi phí",
    finish_at: "Hoàn thành lúc:",
    technician: "Kỹ thuật viên:",
    data_secured: "Dữ liệu được bảo mật & cập nhật liên tục",
    close: "Đóng",
    status_ready: "Sẵn sàng",
    status_working: "Đang xử lý",
    status_waiting: "Đang chờ",
    in_progress_badge: "Đang thực hiện",
    feedback_subtitle: "Khách Hàng Nói Gì",
    feedback_title: "Đánh Giá & Phản Hồi",
    send_your_feedback: "Gửi Đánh Giá Của Bạn",
    service_used: "Dịch vụ đã sử dụng",
    default_service: "Dịch vụ Detailing",
    thank_you: "Cảm Ơn Bạn!",
    feedback_success: "Đánh giá của bạn đã được gửi thành công và đang chờ duyệt.",
    submit_feedback: "Gửi Đánh Giá",
    your_name: "Họ Tên Của Bạn",
    name_placeholder: "VD: Nguyễn Văn A",
    select_service: "Chọn dịch vụ...",
    satisfaction_level: "Mức Độ Hài Lòng",
    your_comment: "Nhận Xét Của Bạn",
    comment_placeholder: "Chia sẻ trải nghiệm của bạn tại Dũng Car Detailing...",
    send_feedback_now: "Gửi Đánh Giá Ngay",
    news_subtitle: "Kiến Thức & Theo Dõi",
    news_title: "Tin Tức & Theo Dõi Xe",
    search_plate_to_track: "Nhập biển số xe để theo dõi...",
    featured_article: "Bài Viết Nổi Bật",
    read_time: "Phút Đọc",
    written_by: "Được viết bởi",
    detailing_expert: "Chuyên gia Detailing tại XE ĐẸP AUTO",
    share_article: "Chia sẻ",
    close_article: "Đóng Bài Viết",
    load_more_news: "Xem Thêm Bài Viết",
    last_update: "Cập nhật cuối",
    read_more: "Đọc Thêm",
    admin_wrong_password: "Sai mật khẩu! Vui lòng kiểm tra lại.",
    admin_password_placeholder: "Mật khẩu bảo mật...",
    warranty_lookup_title: "Tra Cứu Bảo Hành Điện Tử",
    warranty_lookup_desc: "Nhập biển số xe hoặc mã QR để kiểm tra thông tin bảo hành các dịch vụ Ceramic, PPF, Phim cách nhiệt.",
    warranty_plate_placeholder: "VD: 30A-123.45 hoặc mã QR",
    warranty_check_btn: "Tra cứu bảo hành",
    warranty_info_title: "Thông tin bảo hành",
    warranty_customer: "Khách hàng",
    warranty_plate: "Biển số",
    warranty_service: "Dịch vụ",
    warranty_issue_date: "Ngày cấp",
    warranty_expiry_date: "Ngày hết hạn",
    warranty_status: "Trạng thái",
    warranty_active: "Đang hiệu lực",
    warranty_expired: "Hết hạn",
    warranty_not_found: "Không tìm thấy thông tin bảo hành",
    warranty_close: "Đóng",
    admin_login: "Đăng Nhập",
    admin_cancel: "Huỷ bỏ",
    gallery_url_image: "Ảnh từ URL",
    gallery_add_title: "Thêm Ảnh Vào Thư Viện",
    gallery_add_desc: "Tải lên nhiều ảnh, chỉnh sửa thông tin trước khi lưu",
    gallery_drag_drop: "Kéo thả ảnh hoặc video vào đây",
    gallery_formats: "Hỗ trợ định dạng JPG, PNG, WEBP, MP4",
    gallery_select_computer: "Chọn Từ Máy Tính",
    gallery_add_url: "Thêm từ đường dẫn (URL)",
    gallery_url_placeholder: "Dán link ảnh hoặc video tại đây...",
    gallery_url_tip: "Mẹo: Bạn có thể dán link từ Google Drive, Dropbox hoặc các trang lưu trữ ảnh.",
    gallery_queue: "Danh sách chờ tải lên",
    gallery_delete_all: "Xóa tất cả",
    gallery_image_title_placeholder: "Tiêu đề ảnh...",
    gallery_no_images: "Chưa có ảnh nào được chọn",
    gallery_selected_files: "Đã chọn {{count}} tệp tin",
    gallery_please_select: "Vui lòng chọn tệp tin để tải lên",
    gallery_cancel: "Hủy Bỏ",
    gallery_confirm_upload: "Xác Nhận Tải Lên",
    admin_tab_overview: "Tổng quan",
    admin_tab_appointments: "Lịch hẹn",
    admin_tab_customers: "Khách hàng",
    admin_tab_inventory: "Kho vật tư",
    admin_tab_loyalty: "Tích điểm",
    admin_tab_reports: "Báo cáo",
    admin_tab_expenses: "Chi phí",
    admin_tab_ecerts: "Chứng chỉ",
    admin_tab_tracking: "Theo dõi xe",
    admin_tab_feedback: "Đánh giá",
    admin_tab_ai_advice: "Tư vấn AI",
    admin_tab_services: "Dịch vụ",
    admin_tab_packages: "Gói chăm sóc",
    admin_tab_premium: "Cao cấp",
    admin_tab_promotions: "Khuyến mãi",
    admin_tab_news: "Tin tức",
    admin_tab_gallery: "Thư viện",
    admin_tab_ui_design: "Giao diện",
    admin_tab_ai_creative: "AI Creative",
    admin_tab_config: "Cấu hình",
    working_hours: "Giờ làm việc",
    zalo_consultation: "Tư vấn Zalo",
    select_video_from_gallery: "Chọn Video Từ Thư Viện",
    no_videos_in_gallery: "Chưa có video nào trong thư viện.",
    please_upload_video_first: "Vui lòng tải video lên ở tab \"Thư Viện\" trước.",
    go_to_gallery: "Đến Thư Viện",
    select_video: "Chọn Video",
    footer_description: "XE ĐẸP AUTO - Nơi xế yêu của bạn được chăm sóc bởi những chuyên gia hàng đầu.",
    quick_links: "Liên Kết Nhanh",
    contact_info: "Thông Tin Liên Hệ",
    copyright: "© 2024 XE ĐẸP AUTO. Tất cả quyền được bảo lưu.",
    designed_by: "Thiết kế bởi AI Studio",
  },
  en: {
    hero_subtitle: "The Art of Car Detailing",
    hero_title: "XE DEP AUTO",
    hero_description: "Leading professional Detailing & Car Care center in Hanoi. We bring perfection to your beloved car.",
    book_now: "Book Now",
    explore_services: "Explore Services",
    share: "Share",
    track_car: "Track Your Car",
    ai_advisor: "AI Advisor",
    promotions: "Promotions",
    services: "Services",
    packages: "Price List",
    news: "News",
    gallery: "Gallery",
    reviews: "Reviews",
    hotline: "Hotline 24/7",
    address: "Address",
    hours: "Opening Hours",
    satisfied_customers: "Satisfied Customers",
    years_experience: "Years Experience",
    google_reviews: "Google Reviews",
    premium_services: "Premium Services",
    scroll: "Scroll",
    all: "All",
    cat_exterior: "Exterior",
    cat_interior: "Interior",
    cat_protection: "Protection",
    cat_tuning: "Tuning",
    search_placeholder: "Search services...",
    view_details: "View Details",
    chat_with_ai: "Chat with AI",
    new_service: "New Service",
    comprehensive_care_package: "Comprehensive Care Package",
    service_package_pricing: "Service Package Pricing",
    packages_description: "Save more with specialized car care packages designed for every need.",
    most_popular: "Most Popular",
    execution_time: "Execution time",
    book_now_package: "Book Now",
    before: "Before",
    after: "After",
    absolute_difference: "Absolute Difference",
    standard_process: "Standard Process",
    superior_benefits: "Superior Benefits",
    get_quote: "Get detailed quote",
    ai_powered_assistant: "AI Powered Assistant",
    ai_detailing_advice: "Detailing Advice",
    ai_detailing_desc: "Ask about Ceramic, PPF, interior cleaning...",
    ai_maintenance: "Car Maintenance",
    ai_maintenance_desc: "Maintenance schedule, minor troubleshooting...",
    customers_used: "Customers used",
    ai_technical_expert: "Technical Advisor",
    clear_chat_history: "Clear chat history",
    ai_processing: "AI is processing...",
    ai_input_placeholder: "Enter your question here...",
    ai_answering: "AI is answering...",
    tint_uv_protection: "99% UV Protection",
    tint_uv_desc: "Protects skin and eyes from sun damage.",
    tint_heat_reduction: "97% Heat Reduction",
    tint_heat_desc: "Saves fuel, cools down quickly.",
    tint_privacy: "Absolute Privacy",
    tint_privacy_desc: "Hard to see in, clear view from inside.",
    tint_warranty: "Lifetime Warranty",
    tint_warranty_desc: "Quality commitment, no peeling or fading.",
    tint_consult: "Tinting Consultation",
    tint_view_packages: "View Tint Packages",
    tint_3m_title: "3M Window Tint",
    tint_3m_desc: "Genuine USA",
    tint_3m_quote: "\"Exclusive multi-layer optical film technology, providing superior heat rejection while maintaining perfect transparency.\"",
    ppf_self_healing: "Self-Healing PPF",
    ppf_self_healing_desc: "Minor scratches disappear under heat.",
    wrap_color_change: "Color Change Wrap",
    wrap_color_change_desc: "Over 500+ colors from top brands.",
    ppf_protect_original: "Protect Original Paint",
    ppf_protect_original_desc: "Keep original paint like new for years.",
    wrap_durability: "5-10 Year Durability",
    wrap_durability_desc: "No peeling, no glue residue.",
    ppf_consult: "Wrap & PPF Consultation",
    ppf_view_colors: "View Color Chart",
    ppf_tpu_title: "Paint Protection Film",
    ppf_tpu_desc: "Premium TPU Technology",
    ppf_tpu_quote: "\"An invisible shield protecting your car from stone chips, scratches, and environmental impacts, while enhancing paint depth.\"",
    tuning_lighting: "Lighting Upgrade",
    tuning_lighting_desc: "Bi-LED, Laser retrofits for superior brightness and aesthetics.",
    tuning_audio: "Hi-End Audio",
    tuning_audio_desc: "Speaker systems, subs, DSP from famous brands.",
    tuning_bodykit: "Bodykit & Rims",
    tuning_bodykit_desc: "Personalize exterior, create unique highlights.",
    tuning_performance: "Performance",
    tuning_performance_desc: "Optimize performance, exciting driving feel.",
    tuning_consult: "Tuning Consultation",
    tuning_view_projects: "View Projects",
    tuning_pro_title: "Professional Tuning",
    tuning_pro_desc: "Highly skilled technicians",
    tuning_pro_quote: "\"Turn your ideas into reality with safe, aesthetic tuning solutions that meet the strictest technical standards.\"",
    visual_showcase: "Visual Showcase",
    ai_edit: "AI Edit",
    ai_edit_prompt: "AI Edit this photo (e.g., Paint gloss effect):",
    privacy_policy: "Privacy Policy",
    terms_of_service: "Terms of Service",
    zalo_consult: "Zalo Consultation",
    before_after: "Before & After",
    tracking_title: "Track Progress",
    tracking_description: "Enter your license plate to check your car's care status.",
    plate_placeholder: "Ex: 30A-12345",
    check_status: "Check Status",
    tracking_system: "Online Tracking System",
    check_progress: "Check Progress",
    tracking_desc: "Transparency in every stage. Enter your license plate to see how the care process is going.",
    stat_working: "Processing",
    stat_ready: "Ready for delivery",
    stat_waiting: "Waiting",
    stat_total: "Total vehicles",
    search_plate_placeholder: "Enter your license plate (e.g., 30A-123.45)...",
    search_now: "Search Now",
    no_vehicle_found: "No vehicle found",
    check_plate_again: "Please check the license plate you entered again.",
    enter_plate_to_track: "Enter license plate to start tracking",
    current_progress: "Current Progress",
    customer: "Customer",
    technician_in_charge: "Technician in Charge",
    estimated_finish: "Estimated Finish",
    total_cost: "Total Cost",
    finish_at: "Completed at:",
    technician: "Technician:",
    data_secured: "Data is secured & continuously updated",
    close: "Close",
    status_ready: "Ready",
    status_working: "Working",
    status_waiting: "Waiting",
    in_progress_badge: "In Progress",
    feedback_subtitle: "What Our Customers Say",
    feedback_title: "Reviews & Feedback",
    send_your_feedback: "Send Your Feedback",
    service_used: "Service used",
    default_service: "Detailing Service",
    thank_you: "Thank You!",
    feedback_success: "Your review has been submitted successfully and is pending approval.",
    submit_feedback: "Submit Review",
    your_name: "Your Name",
    name_placeholder: "e.g., John Doe",
    select_service: "Select service...",
    satisfaction_level: "Satisfaction Level",
    your_comment: "Your Comment",
    comment_placeholder: "Share your experience at Dung Car Detailing...",
    send_feedback_now: "Send Review Now",
    news_subtitle: "Knowledge & Tracking",
    news_title: "News & Car Tracking",
    search_plate_to_track: "Enter license plate to track...",
    featured_article: "Featured Article",
    read_time: "Min Read",
    written_by: "Written by",
    detailing_expert: "Detailing Expert at XE DEP AUTO",
    share_article: "Share",
    close_article: "Close Article",
    load_more_news: "Load More News",
    last_update: "Last update",
    read_more: "Read More",
    admin_wrong_password: "Wrong password! Please check again.",
    admin_password_placeholder: "Security password...",
    warranty_lookup_title: "E-Warranty Lookup",
    warranty_lookup_desc: "Enter license plate or QR code to check warranty information for Ceramic, PPF, and Tint services.",
    warranty_plate_placeholder: "Ex: 30A-123.45 or QR code",
    warranty_check_btn: "Check Warranty",
    warranty_info_title: "Warranty Information",
    warranty_customer: "Customer",
    warranty_plate: "License Plate",
    warranty_service: "Service",
    warranty_issue_date: "Issue Date",
    warranty_expiry_date: "Expiry Date",
    warranty_status: "Status",
    warranty_active: "Active",
    warranty_expired: "Expired",
    warranty_not_found: "Warranty information not found",
    warranty_close: "Close",
    admin_login: "Login",
    admin_cancel: "Cancel",
    gallery_url_image: "Image from URL",
    gallery_add_title: "Add Image to Gallery",
    gallery_add_desc: "Upload multiple images, edit info before saving",
    gallery_drag_drop: "Drag and drop images or videos here",
    gallery_formats: "Supports JPG, PNG, WEBP, MP4 formats",
    gallery_select_computer: "Select From Computer",
    gallery_add_url: "Add from URL",
    gallery_url_placeholder: "Paste image or video link here...",
    gallery_url_tip: "Tip: You can paste links from Google Drive, Dropbox, or image hosting sites.",
    gallery_queue: "Upload queue",
    gallery_delete_all: "Delete all",
    gallery_image_title_placeholder: "Image title...",
    gallery_no_images: "No images selected",
    gallery_selected_files: "Selected {{count}} files",
    gallery_please_select: "Please select files to upload",
    gallery_cancel: "Cancel",
    gallery_confirm_upload: "Confirm Upload",
    admin_tab_overview: "Overview",
    admin_tab_appointments: "Appointments",
    admin_tab_customers: "Customers",
    admin_tab_inventory: "Inventory",
    admin_tab_loyalty: "Loyalty",
    admin_tab_reports: "Reports",
    admin_tab_expenses: "Expenses",
    admin_tab_ecerts: "E-Certs",
    admin_tab_tracking: "Car Tracking",
    admin_tab_feedback: "Feedback",
    admin_tab_ai_advice: "AI Advice",
    admin_tab_services: "Services",
    admin_tab_packages: "Care Packages",
    admin_tab_premium: "Premium",
    admin_tab_promotions: "Promotions",
    admin_tab_news: "News",
    admin_tab_gallery: "Gallery",
    admin_tab_ui_design: "UI Design",
    admin_tab_ai_creative: "AI Creative",
    admin_tab_config: "Configuration",
    working_hours: "Working Hours",
    zalo_consultation: "Zalo Consultation",
    select_video_from_gallery: "Select Video From Gallery",
    no_videos_in_gallery: "No videos in gallery.",
    please_upload_video_first: "Please upload a video in the \"Gallery\" tab first.",
    go_to_gallery: "Go to Gallery",
    select_video: "Select Video",
    footer_description: "XE DEP AUTO - Where your beloved car is cared for by leading experts.",
    quick_links: "Quick Links",
    contact_info: "Contact Information",
    copyright: "© 2024 XE DEP AUTO. All rights reserved.",
    designed_by: "Designed by AI Studio",
  }
};

const HomePage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('dungcar_theme_v1');
    return (saved as 'light' | 'dark') || 'dark';
  });
  const [language, setLanguage] = useState<'vi' | 'en'>(() => {
    const saved = localStorage.getItem('dungcar_lang_v1');
    return (saved as 'vi' | 'en') || 'vi';
  });

  useEffect(() => {
    localStorage.setItem('dungcar_theme_v1', theme);
    if (theme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('dungcar_lang_v1', language);
  }, [language]);

  const t = (key: string) => {
    return (translations[language] as any)[key] || key;
  };

  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isDesignAuthenticated, setIsDesignAuthenticated] = useState(false);
  const [designPasswordInput, setDesignPasswordInput] = useState('');
  const [showDesignLock, setShowDesignLock] = useState(false);
  const [dashboardInitialTab, setDashboardInitialTab] = useState<'home' | 'services' | 'premium' | 'gallery' | 'customers' | 'promotions' | 'config' | 'ai-creative' | 'maintenance'>('home');
  const [dashboardMaintenancePreFill, setDashboardMaintenancePreFill] = useState<{brand: string, model: string, year: string, mileage: string, lastMaintenance: string, symptoms: string} | null>(null);
  const [dashboardTab, setDashboardTab] = useState<'home' | 'services' | 'premium' | 'gallery' | 'customers' | 'config'>('home');
  const [isSelectingHeroVideo, setIsSelectingHeroVideo] = useState(false);
  const [isSelectingAiVideo, setIsSelectingAiVideo] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [serviceCategory, setServiceCategory] = useState<string>('all');
  const [serviceSearch, setServiceSearch] = useState<string>('');
  const [selectedServiceForModal, setSelectedServiceForModal] = useState<Service | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [preSelectedSubService, setPreSelectedSubService] = useState<string | undefined>(undefined);
  
  const { id } = useParams();
  const location = useLocation();
  
  const handlePayment = async (serviceName: string, price: string, customerName: string, customerEmail?: string) => {
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          serviceName,
          price,
          customerName,
          customerEmail: customerEmail || '',
        }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Lỗi khi khởi tạo thanh toán: " + (data.error || "Không rõ nguyên nhân"));
      }
    } catch (error: any) {
      console.error("Payment error:", error);
      alert("Lỗi kết nối đến máy chủ thanh toán.");
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: siteConfig.heroTitle,
      text: siteConfig.heroDescription,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      setIsShareModalOpen(true);
    }
  };

  const handleDesignLogin = () => {
    const normalizedInput = designPasswordInput.trim();
    const normalizedPass = (siteConfig.designPassword || DEFAULT_SITE_CONFIG.designPassword || 'admin').trim();
    if (normalizedInput === normalizedPass) {
      setIsDesignAuthenticated(true);
      setDesignPasswordInput('');
      setShowDesignLock(false);
    } else {
      alert("Sai mật khẩu thiết kế!");
      setDesignPasswordInput('');
    }
  };
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    const saved = localStorage.getItem('dungcar_notifications_v1');
    return saved ? JSON.parse(saved) : [];
  });
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    localStorage.setItem('dungcar_notifications_v1', JSON.stringify(notifications));
  }, [notifications]);

  const addNotification = (notif: Omit<AppNotification, 'id' | 'date' | 'isRead'>) => {
    const newNotif: AppNotification = {
      ...notif,
      id: Date.now().toString(),
      date: new Date().toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit' }),
      isRead: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  // WebSocket for real-time notifications
  useEffect(() => {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}`;
    let socket: WebSocket | null = null;
    let reconnectTimeout: any = null;

    const connect = () => {
      socket = new WebSocket(wsUrl);

      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === 'NEW_BOOKING') {
            addNotification({
              title: 'Yêu cầu đặt lịch mới',
              message: data.message,
              type: 'info'
            });
            
            toast.success(data.message, {
              duration: 10000,
              position: 'top-right',
              icon: '🔔',
              style: {
                background: '#1e293b',
                color: '#fff',
                border: '1px solid #334155',
                borderRadius: '16px',
                padding: '16px',
                fontWeight: 'bold',
                fontSize: '14px'
              }
            });
            // Play a subtle sound if possible
            const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2358/2358-preview.mp3');
            audio.play().catch(() => {});
          }
        } catch (e) {
          console.error('WS Error:', e);
        }
      };

      socket.onclose = () => {
        reconnectTimeout = setTimeout(connect, 5000);
      };

      socket.onerror = (err) => {
        console.error('WS Connection Error:', err);
        socket?.close();
      };
    };

    connect();

    return () => {
      if (socket) socket.close();
      if (reconnectTimeout) clearTimeout(reconnectTimeout);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = isScrolled ? 80 : 120;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [siteConfig, setSiteConfig] = useState<SiteConfig>(() => {
    const saved = localStorage.getItem('dungcar_config_v12');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Force update password if it's the old one to ensure user can login
        if (parsed.adminPassword === "025099010538") {
          parsed.adminPassword = DEFAULT_SITE_CONFIG.adminPassword;
        }
        if (parsed.designPassword === "admin") {
          parsed.designPassword = DEFAULT_SITE_CONFIG.designPassword;
        }
        return { 
          ...DEFAULT_SITE_CONFIG, 
          ...parsed,
          news: parsed.news || DEFAULT_NEWS
        };
      } catch (e) {
        return { ...DEFAULT_SITE_CONFIG, news: DEFAULT_NEWS };
      }
    }
    return { ...DEFAULT_SITE_CONFIG, news: DEFAULT_NEWS };
  });
  const [customerRecords, setCustomerRecords] = useState<CustomerRecord[]>(() => {
    const saved = localStorage.getItem('dungcar_records_v12');
    return saved ? JSON.parse(saved) : DEFAULT_CUSTOMER_RECORDS;
  });
  const [gallery, setGallery] = useState<GalleryImage[]>(() => {
    const saved = localStorage.getItem('dungcar_gallery_v12');
    return saved ? JSON.parse(saved) : DEFAULT_GALLERY;
  });
  const [premiumSolutions, setPremiumSolutions] = useState<PremiumSolution[]>(() => {
    const saved = localStorage.getItem('dungcar_premium_v12');
    return saved ? JSON.parse(saved) : DEFAULT_PREMIUM_SOLUTIONS;
  });
  const [services, setServices] = useState<Service[]>(() => {
    const saved = localStorage.getItem('dungcar_services_v12');
    return saved ? JSON.parse(saved) : INITIAL_SERVICES;
  });
  const [aiVideoHistory, setAiVideoHistory] = useState<AiVideoRecord[]>(() => {
    const saved = localStorage.getItem('dungcar_ai_history_v12');
    return saved ? JSON.parse(saved) : [];
  });
  const [trackingData, setTrackingData] = useState<VehicleTracking[]>(() => {
    const saved = localStorage.getItem('dungcar_tracking_v12');
    return saved ? JSON.parse(saved) : DEFAULT_TRACKING;
  });
  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('dungcar_reviews_v12');
    return saved ? JSON.parse(saved) : DEFAULT_REVIEWS;
  });
  const [inventory, setInventory] = useState<InventoryItem[]>(() => {
    const saved = localStorage.getItem('dungcar_inventory_v12');
    return saved ? JSON.parse(saved) : DEFAULT_INVENTORY;
  });
  const [eCertificates, setECertificates] = useState<ECertificate[]>(() => {
    const saved = localStorage.getItem('dungcar_ecerts_v12');
    return saved ? JSON.parse(saved) : DEFAULT_E_CERTIFICATES;
  });
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const saved = localStorage.getItem('dungcar_expenses_v12');
    return saved ? JSON.parse(saved) : (siteConfig.expenses || []);
  });

  useEffect(() => {
    if (id) {
      if (location.pathname.startsWith('/services/')) {
        const service = services.find(s => s.id === id);
        if (service) setSelectedServiceForModal(service);
      } else if (location.pathname.startsWith('/news/')) {
        const article = (siteConfig.news || []).find(a => a.id === id);
        if (article) setSelectedArticle(article);
      }
    }
  }, [id, location.pathname, services, siteConfig.news]);

  const [aiMessages, setAiMessages] = useState<Message[]>([
    { role: 'model', text: 'Chào bạn! Tôi là **XE ĐẸP AUTO AI Advisor**. Rất vui được hỗ trợ bạn.\n\nTôi có thể giúp bạn:\n- Tư vấn các gói **Ceramic & PPF**.\n- Hướng dẫn chăm sóc xe tại nhà.\n- Giải đáp thắc mắc về kỹ thuật detailing.\n- Cung cấp thông tin về các dịch vụ tại cửa hàng.\n\nBạn đang quan tâm đến vấn đề gì cho xế yêu của mình?' }
  ]);

  const clearChat = () => {
    if (window.confirm('Bạn có muốn xóa toàn bộ lịch sử trò chuyện không?')) {
      setAiMessages([
        { role: 'model', text: 'Chào bạn! Tôi là **XE ĐẸP AUTO AI Advisor**. Rất vui được hỗ trợ bạn.\n\nTôi có thể giúp bạn:\n- Tư vấn các gói **Ceramic & PPF**.\n- Hướng dẫn chăm sóc xe tại nhà.\n- Giải đáp thắc mắc về kỹ thuật detailing.\n- Cung cấp thông tin về các dịch vụ tại cửa hàng.\n\nBạn đang quan tâm đến vấn đề gì cho xế yêu của mình?' }
      ]);
    }
  };
  const [aiInput, setAiInput] = useState('');
  const [aiProvider, setAiProvider] = useState<AIProvider>('gemini');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [aiMessages, isAiLoading]);

  useEffect(() => {
    localStorage.setItem('dungcar_config_v12', JSON.stringify(siteConfig));
    localStorage.setItem('dungcar_records_v12', JSON.stringify(customerRecords));
    localStorage.setItem('dungcar_gallery_v12', JSON.stringify(gallery));
    localStorage.setItem('dungcar_premium_v12', JSON.stringify(premiumSolutions));
    localStorage.setItem('dungcar_services_v12', JSON.stringify(services));
    localStorage.setItem('dungcar_ai_history_v12', JSON.stringify(aiVideoHistory));
    localStorage.setItem('dungcar_tracking_v12', JSON.stringify(trackingData));
    localStorage.setItem('dungcar_reviews_v12', JSON.stringify(reviews));
    localStorage.setItem('dungcar_inventory_v12', JSON.stringify(inventory));
    localStorage.setItem('dungcar_ecerts_v12', JSON.stringify(eCertificates));
    localStorage.setItem('dungcar_expenses_v12', JSON.stringify(expenses));
  }, [siteConfig, customerRecords, gallery, services, premiumSolutions, aiVideoHistory, trackingData, reviews, inventory, eCertificates, expenses]);

  const [isAiServiceModalOpen, setIsAiServiceModalOpen] = useState(false);
  const [selectedServiceForAi, setSelectedServiceForAi] = useState<Service | null>(null);

  const handleOpenAiServiceChat = (service: Service) => {
    setSelectedServiceForAi(service);
    setIsAiServiceModalOpen(true);
    const initialPrompt = `Tôi muốn tìm hiểu về dịch vụ "${service.title}". ${service.description}. Bạn có thể tư vấn thêm cho tôi không?`;
    setAiInput(initialPrompt);
  };

  const [foundCertificate, setFoundCertificate] = useState<ECertificate | null>(null);
  const [warrantySearch, setWarrantySearch] = useState('');

  const handleWarrantySearch = () => {
    const cert = eCertificates.find(c => 
      c.licensePlate.toLowerCase().includes(warrantySearch.toLowerCase()) || 
      c.qrCode.toLowerCase().includes(warrantySearch.toLowerCase())
    );
    if (cert) {
      setFoundCertificate(cert);
    } else {
      toast.error('Không tìm thấy thông tin bảo hành cho biển số/mã này');
      setFoundCertificate(null);
    }
  };

  const handleAiChat = async (customInput?: string) => {
    const textToChat = customInput || aiInput;
    if (!textToChat.trim()) return;
    
    const userText = textToChat;
    if (!customInput) setAiInput('');
    
    const newMsgs: Message[] = [...aiMessages, { role: 'user', text: userText }];
    setAiMessages(newMsgs);
    setIsAiLoading(true);
    try {
      const response = await getAIResponse(userText, aiMessages, aiProvider);
      setAiMessages(prev => [...prev, { role: 'model', text: response }]);
    } catch (error) {
      console.error("AI Chat Error:", error);
      toast.error("Có lỗi xảy ra khi kết nối với AI.");
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleAddCustomer = () => {
    setDashboardTab('customers');
    setIsDashboardOpen(true);
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen selection:bg-blue-600/30">
      <SEO 
        title={selectedArticle ? selectedArticle.title : selectedServiceForModal ? selectedServiceForModal.title : undefined}
        description={selectedArticle ? selectedArticle.excerpt : selectedServiceForModal ? selectedServiceForModal.description : undefined}
        canonical={location.pathname}
        ogImage={selectedArticle ? selectedArticle.image : selectedServiceForModal ? selectedServiceForModal.image : undefined}
        ogType={selectedArticle ? 'article' : 'website'}
        keywords={selectedArticle ? `${selectedArticle.category}, news, xe dep auto` : selectedServiceForModal ? `${selectedServiceForModal.category}, service, car care` : undefined}
      />
      <Toaster />
      {/* Top Bar */}
      <div className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 bg-slate-900/80 backdrop-blur-md border-b border-white/5 py-2 ${
        isScrolled ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'
      }`}>
        <div className="container mx-auto px-4 flex justify-between items-center text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
          <div className="flex items-center gap-6">
            <a 
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.contactAddress)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <MapPin className="w-3 h-3 text-blue-500" />
              <span>{siteConfig.contactAddress}</span>
            </a>
            <div className="hidden sm:flex items-center gap-2">
              <Clock className="w-3 h-3 text-blue-500" />
              <span>{siteConfig.contactHours}</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white/5 rounded-lg p-1">
              <button 
                onClick={() => setLanguage('vi')}
                className={`px-2 py-0.5 rounded text-[8px] font-black transition-all ${language === 'vi' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-slate-300'}`}
              >
                VI
              </button>
              <button 
                onClick={() => setLanguage('en')}
                className={`px-2 py-0.5 rounded text-[8px] font-black transition-all ${language === 'en' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-slate-300'}`}
              >
                EN
              </button>
            </div>
            <button 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-1.5 rounded-lg bg-white/5 text-slate-400 hover:text-white transition-all"
              title={theme === 'dark' ? 'Chuyển sang chế độ sáng' : 'Chuyển sang chế độ tối'}
            >
              {theme === 'dark' ? <Sun className="w-3 h-3" /> : <Moon className="w-3 h-3" />}
            </button>
            {siteConfig.facebookUrl && <a href={siteConfig.facebookUrl} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors"><Facebook className="w-3 h-3" /></a>}
            {siteConfig.instagramUrl && <a href={siteConfig.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors"><Instagram className="w-3 h-3" /></a>}
            {siteConfig.youtubeUrl && <a href={siteConfig.youtubeUrl} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors"><Youtube className="w-3 h-3" /></a>}
          </div>
        </div>
      </div>

      {/* Navbar */}
      <nav className={`fixed left-0 right-0 z-50 transition-all duration-700 ease-in-out ${
        isScrolled 
          ? 'top-0 py-2 bg-slate-950/95 backdrop-blur-2xl border-b border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)]' 
          : 'top-10 py-6 bg-transparent border-b border-transparent'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4 sm:gap-8">
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className={`p-2.5 rounded-2xl transition-all flex flex-col gap-1.5 active:scale-90 group ${
                  isScrolled ? 'bg-slate-800/50 hover:bg-slate-800' : 'bg-white/5 hover:bg-white/10'
                }`}
              >
                <div className="w-5 h-0.5 bg-blue-500 rounded-full group-hover:w-6 transition-all"></div>
                <div className="w-6 h-0.5 bg-blue-500 rounded-full"></div>
                <div className="w-4 h-0.5 bg-blue-500 rounded-full group-hover:w-6 transition-all"></div>
              </button>
              
              <Link to="/" className="group flex items-center gap-3 relative">
                {siteConfig.logoUrl ? (
                  <img 
                    src={siteConfig.logoUrl} 
                    alt="Logo" 
                    className={`object-contain group-hover:scale-110 transition-all duration-500 ${isScrolled ? 'w-8 h-8' : 'w-10 h-10'}`}
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className={`bg-gradient-to-br from-blue-600 to-emerald-600 rounded-xl flex items-center justify-center font-black text-white shadow-lg shadow-blue-900/20 group-hover:scale-110 transition-all duration-500 ${isScrolled ? 'w-8 h-8 text-lg' : 'w-10 h-10 text-xl'}`}>
                    {siteConfig.siteName.charAt(0)}
                  </div>
                )}
                
                {isEditMode && isDesignAuthenticated && (
                  <div className="absolute -top-2 -left-2 z-20 flex gap-1">
                    <label className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-xl cursor-pointer hover:bg-blue-500 transition-colors" title="Tải ảnh logo lên">
                      <input 
                        type="file" 
                        className="hidden" 
                        accept="image/*" 
                        onChange={(e) => handleImageUpload(e, (b) => setSiteConfig({...siteConfig, logoUrl: b}))}
                      />
                      <Upload className="w-3 h-3" />
                    </label>
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        const url = prompt("Nhập URL logo mới:", siteConfig.logoUrl);
                        if (url !== null) setSiteConfig({...siteConfig, logoUrl: url});
                      }}
                      className="w-6 h-6 bg-slate-800 text-white rounded-full flex items-center justify-center shadow-xl hover:bg-slate-700 transition-colors"
                      title="Nhập URL logo"
                    >
                      <LinkIcon className="w-3 h-3" />
                    </button>
                  </div>
                )}
                
                <div className={`flex flex-col transition-all duration-500 ${isScrolled ? 'scale-90 origin-left' : 'scale-100'}`}>
                  <EditableText 
                    text={siteConfig.siteName} 
                    isEditMode={isEditMode} 
                    isDesignAuthenticated={isDesignAuthenticated}
                    onSave={v => setSiteConfig({...siteConfig, siteName: v})}
                    className="text-lg sm:text-xl font-black text-white uppercase tracking-tighter leading-none"
                  />
                  <span className="text-[8px] font-bold text-blue-500 uppercase tracking-[0.3em] mt-1">Premium Detailing</span>
                </div>
              </Link>
            </div>

            <div className="hidden lg:flex items-center gap-10">
              <div className="flex gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                {[
                  { id: 'promotions', label: t('promotions') },
                  { id: 'services', label: t('services') },
                  { id: 'packages', label: t('packages') },
                  { id: 'window-tinting', label: 'Dán Phim' },
                  { id: 'wrap-ppf', label: 'Wrap & PPF' },
                  { id: 'tuning', label: 'Độ Xe' },
                  { id: 'ai-advisor', label: t('ai_advisor') },
                  { id: 'news', label: t('news') },
                  { id: 'gallery', label: t('gallery') },
                  { id: 'reviews', label: t('reviews') }
                ].map((item) => (
                  <button 
                    key={item.id}
                    onClick={() => scrollToSection(item.id)} 
                    className="hover:text-white transition-colors relative group"
                  >
                    {item.label}
                    <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Notification Button */}
              <button 
                onClick={() => setShowNotifications(true)}
                className={`relative p-2.5 rounded-xl transition-all ${
                  isScrolled ? 'bg-slate-800/50 hover:bg-slate-800 text-white' : 'bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white'
                }`}
                title="Thông báo"
              >
                <Bell className={`w-5 h-5 ${notifications.some(n => !n.isRead) ? 'animate-bounce text-blue-500' : ''}`} />
                {notifications.some(n => !n.isRead) && (
                  <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-slate-900 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></span>
                )}
              </button>

              {/* Tracking Button */}
              <button 
                onClick={() => scrollToSection('tracking')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all font-black uppercase text-[10px] tracking-widest ${
                  isScrolled ? 'bg-blue-600 text-white hover:bg-blue-500' : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
                }`}
              >
                <Timer className="w-4 h-4" />
                <span className="hidden sm:inline">{t('track_car')}</span>
              </button>

              {isEditMode && (
                <button 
                  onClick={() => setIsDashboardOpen(true)} 
                  className="bg-slate-800 hover:bg-slate-700 text-white p-2.5 rounded-xl shadow-lg border border-white/10 active:scale-95 transition-all" 
                  title="Bảng điều khiển CMS"
                >
                  <Settings className="w-4 h-4" />
                </button>
              )}
              
              <div className="hidden md:flex flex-col items-end mr-2">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{t('hotline')}</span>
                <a href={`tel:${siteConfig.contactPhone}`} className="text-sm font-black text-white hover:text-blue-500 transition-colors">
                  {siteConfig.contactPhone}
                </a>
              </div>

              <button 
                onClick={() => setIsBookingModalOpen(true)}
                className="relative group overflow-hidden bg-blue-600 text-white px-6 sm:px-8 py-2.5 sm:py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-blue-900/40 transition-all hover:scale-105 active:scale-95 active:shadow-inner"
              >
                <span className="relative z-10">{t('book_now')}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Back to Top */}
      <AnimatePresence>
        {isScrolled && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 left-6 sm:left-10 z-50 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-2xl shadow-blue-900/40 hover:bg-blue-500 transition-all active:scale-90"
          >
            <ArrowUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      <SidebarMenu 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        isEditMode={isEditMode}
        siteConfig={siteConfig}
        onAdminClick={() => isEditMode ? setIsEditMode(false) : setIsLoginModalOpen(true)}
        onAddRecord={handleAddCustomer}
        onOpenDashboard={() => { setDashboardInitialTab('home'); setIsDashboardOpen(true); setIsSidebarOpen(false); }}
        onReset={() => confirm("Reset trang web?") && (localStorage.clear(), window.location.reload())}
        scrollToSection={scrollToSection}
      />

      <main className="flex-grow pt-24 sm:pt-32">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 group/hero-section">
          {/* Background Elements */}
          <div className="absolute inset-0 z-0">
            {siteConfig.heroVideoUrl ? (
              <video 
                src={siteConfig.heroVideoUrl} 
                autoPlay 
                muted 
                loop 
                playsInline
                className="w-full h-full object-cover opacity-40 scale-105"
              />
            ) : (
              <img 
                src={siteConfig.heroImage} 
                alt="Hero Background"
                className="w-full h-full object-cover opacity-40 scale-105"
                referrerPolicy="no-referrer"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-transparent to-slate-950"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]"></div>
          </div>

          {/* Floating Accents */}
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>

          {isEditMode && isDesignAuthenticated && (
            <div className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-4 bg-blue-600/10 backdrop-blur-[2px] opacity-0 group-hover/hero-section:opacity-100 transition-opacity">
              <div className="flex gap-3">
                <button 
                  onClick={() => setIsSelectingHeroVideo(true)}
                  className="bg-blue-600 text-white font-black text-[10px] uppercase px-6 py-3 rounded-xl shadow-2xl hover:bg-blue-500 transition-all active:scale-95 flex items-center gap-2"
                >
                  🎬 {siteConfig.heroVideoUrl ? 'Thay Video' : 'Dùng Video'}
                </button>
                {!siteConfig.heroVideoUrl ? (
                  <button 
                    onClick={() => {
                      const url = prompt("Nhập URL ảnh nền:");
                      if (url) setSiteConfig({...siteConfig, heroImage: url});
                    }}
                    className="bg-slate-900 text-white font-black text-[10px] uppercase px-6 py-3 rounded-xl shadow-2xl hover:bg-slate-800 transition-all active:scale-95"
                  >
                    🖼️ Thay Ảnh
                  </button>
                ) : (
                  <button 
                    onClick={() => setSiteConfig({...siteConfig, heroVideoUrl: ''})}
                    className="bg-red-600 text-white font-black text-[10px] uppercase px-6 py-3 rounded-xl shadow-2xl hover:bg-red-500 transition-all active:scale-95"
                  >
                    🗑️ Xóa Video
                  </button>
                )}
              </div>
            </div>
          )}

          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col items-center text-center max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="mb-6"
              >
                <span className="text-blue-500 font-black uppercase tracking-[0.5em] text-[10px] sm:text-xs bg-blue-500/10 px-6 py-2 rounded-full border border-blue-500/20">
                  {t('hero_subtitle')}
                </span>
              </motion.div>

              <div className="relative mb-8 sm:mb-12">
                <EditableText 
                  tag="h1" 
                  text={siteConfig.heroTitle} 
                  isEditMode={isEditMode} 
                  isDesignAuthenticated={isDesignAuthenticated}
                  onSave={v => setSiteConfig({...siteConfig, heroTitle: v})}
                  multiline 
                  className="text-4xl sm:text-7xl md:text-[140px] font-black text-white leading-[0.85] tracking-[-0.04em] uppercase"
                />
                {/* Decorative text stroke for desktop */}
                <div className="hidden lg:block absolute -top-4 -left-4 -z-10 opacity-10 select-none">
                  <h1 className="text-[140px] font-black text-transparent border-text uppercase tracking-[-0.04em] leading-[0.85]" style={{ WebkitTextStroke: '1px white' }}>
                    {siteConfig.heroTitle}
                  </h1>
                </div>
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="max-w-3xl mx-auto mb-10 sm:mb-16"
              >
                <EditableText 
                  text={siteConfig.heroDescription} 
                  isEditMode={isEditMode} 
                  isDesignAuthenticated={isDesignAuthenticated}
                  onSave={v => setSiteConfig({...siteConfig, heroDescription: v})}
                  multiline 
                  className="text-base sm:text-xl md:text-2xl text-slate-400 font-medium leading-relaxed"
                />
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 sm:gap-6"
              >
                <button 
                  onClick={() => setIsBookingModalOpen(true)}
                  className="group relative bg-blue-600 text-white px-12 py-5 rounded-2xl text-sm font-black uppercase tracking-widest shadow-2xl shadow-blue-900/40 transition-all hover:scale-105 active:scale-95 active:shadow-inner overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    {t('book_now')} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </button>
                <button 
                  onClick={() => scrollToSection('services')}
                  className="bg-slate-900 hover:bg-slate-800 text-white border border-white/10 px-12 py-5 rounded-2xl text-sm font-black uppercase tracking-widest transition-all active:scale-95"
                >
                  {t('explore_services')}
                </button>
                <button 
                  onClick={handleShare}
                  className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-12 py-5 rounded-2xl text-sm font-black uppercase tracking-widest transition-all active:scale-95 flex items-center gap-3"
                >
                  <Share2 className="w-4 h-4" /> {t('share')}
                </button>
              </motion.div>

              {/* Trust Bar */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 1 }}
                className="mt-16 sm:mt-24 w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/5 pt-10"
              >
                {[
                  { label: t('satisfied_customers'), value: '5,000+', icon: <Users className="w-4 h-4 text-blue-500" /> },
                  { label: t('years_experience'), value: '10+', icon: <ShieldCheck className="w-4 h-4 text-emerald-500" /> },
                  { label: t('google_reviews'), value: '5.0 ⭐', icon: <Star className="w-4 h-4 text-yellow-500" /> },
                  { label: t('premium_services'), value: '20+', icon: <Zap className="w-4 h-4 text-purple-500" /> }
                ].map((stat, i) => (
                  <div key={i} className="flex flex-col items-center md:items-start text-center md:text-left">
                    <div className="flex items-center gap-3 mb-2">
                      {stat.icon}
                      <span className="text-xl sm:text-2xl font-black text-white tracking-tighter">{stat.value}</span>
                    </div>
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{stat.label}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          >
            <span className="text-[8px] font-black uppercase tracking-[0.3em] text-slate-500">{t('scroll')}</span>
            <div className="w-px h-12 bg-gradient-to-b from-blue-500 to-transparent"></div>
          </motion.div>
        </section>
         {/* Services Section */}
        <section id="services" className="py-24 sm:py-32 bg-slate-950 relative">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-600/10 border border-blue-500/20 mb-6"
              >
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                <EditableText 
                  text={siteConfig.servicesSubtitle} 
                  isEditMode={isEditMode} 
                  isDesignAuthenticated={isDesignAuthenticated}
                  onSave={v => setSiteConfig({...siteConfig, servicesSubtitle: v})}
                  className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em]"
                />
              </motion.div>
              <EditableText 
                tag="h2" 
                text={siteConfig.servicesTitle} 
                isEditMode={isEditMode} 
                isDesignAuthenticated={isDesignAuthenticated}
                onSave={v => setSiteConfig({...siteConfig, servicesTitle: v})}
                className="text-4xl sm:text-7xl font-black text-white uppercase tracking-tighter leading-none mb-8"
              />
              
              {/* Search & Filter */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl"
              >
                <div className="relative flex-1 group">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                  <input 
                    type="text" 
                    placeholder={t('search_placeholder')}
                    value={serviceSearch}
                    onChange={(e) => setServiceSearch(e.target.value)}
                    className="w-full bg-slate-900/50 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white text-sm focus:outline-none focus:border-blue-500 transition-all"
                  />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 custom-scrollbar">
                  {['all', 'exterior', 'interior', 'protection', 'tuning'].map(cat => (
                    <button
                      key={cat}
                      onClick={() => setServiceCategory(cat)}
                      className={`px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                        serviceCategory === cat 
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                        : 'bg-slate-900/50 text-slate-500 border border-white/5 hover:border-white/20'
                      }`}
                    >
                      {t(`cat_${cat}`)}
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 auto-rows-[300px] sm:auto-rows-[450px]">
              {services
                .filter(s => {
                  const matchesCategory = serviceCategory === 'all' || s.category === serviceCategory;
                  const matchesSearch = s.title.toLowerCase().includes(serviceSearch.toLowerCase()) || 
                                      s.description.toLowerCase().includes(serviceSearch.toLowerCase());
                  return matchesCategory && matchesSearch;
                })
                .map((s, idx) => {
                  // Bento Grid Logic: First item and every 5th item spans 2 columns on large screens
                  const isLarge = idx === 0 || idx === 4;
                  
                  return (
                    <motion.div 
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      key={s.id} 
                      className={`group relative bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[32px] sm:rounded-[60px] overflow-hidden hover:border-blue-500/50 hover:shadow-[0_0_40px_rgba(59,130,246,0.2)] transition-all duration-700 flex flex-col ${
                        isLarge ? 'lg:col-span-2' : 'lg:col-span-1'
                      }`}
                    >
                      <div className="relative h-full overflow-hidden">
                        <EditableImage 
                          src={s.image} 
                          isEditMode={isEditMode} 
                          isDesignAuthenticated={isDesignAuthenticated}
                          onUpload={base64 => setServices(services.map(ser => ser.id === s.id ? {...ser, image: base64} : ser))}
                          alt={s.title}
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                        
                        {/* Interactive Overlay (Before/After vibe) */}
                        <div className="absolute inset-0 bg-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-px h-full bg-white/30 relative">
                              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                                <Zap className="w-5 h-5 text-white animate-pulse" />
                              </div>
                            </div>
                          </div>
                        </div>

                        {['ppf', 'wrap', 'tuning', 'underbody'].includes(s.id) && (
                          <div className="absolute top-8 right-8 z-20">
                            <div className="bg-emerald-500 text-white text-[10px] font-black px-5 py-2 rounded-full uppercase tracking-widest shadow-xl animate-pulse">{t('new_service')}</div>
                          </div>
                        )}
                        
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                        
                        <div className="absolute inset-0 p-8 sm:p-12 flex flex-col justify-end">
                          <div className="flex justify-between items-end mb-6">
                            <div className="bg-slate-950/80 backdrop-blur-md p-4 sm:p-5 rounded-2xl sm:rounded-[32px] border border-white/10 shadow-2xl">
                              <EditableText 
                                text={s.icon} 
                                isEditMode={isEditMode} 
                                isDesignAuthenticated={isDesignAuthenticated}
                                onSave={v => setServices(services.map(ser => ser.id === s.id ? {...ser, icon: v} : ser))}
                                className="text-3xl sm:text-4xl"
                              />
                            </div>
                            <div className="bg-slate-950/80 backdrop-blur-md border border-white/10 text-white px-5 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl font-black text-xs sm:text-base shadow-2xl">
                              <EditableText 
                                text={s.price} 
                                isEditMode={isEditMode} 
                                isDesignAuthenticated={isDesignAuthenticated}
                                onSave={v => setServices(services.map(ser => ser.id === s.id ? {...ser, price: v} : ser))}
                              />
                            </div>
                          </div>

                          <div className="relative">
                            {/* Decorative Number */}
                            <div className="absolute -top-10 right-0 text-6xl sm:text-9xl font-black text-white/5 pointer-events-none select-none italic">
                              0{idx + 1}
                            </div>

                            <EditableText 
                              tag="h3" 
                              text={s.title} 
                              isEditMode={isEditMode} 
                              isDesignAuthenticated={isDesignAuthenticated}
                              onSave={v => setServices(services.map(ser => ser.id === s.id ? {...ser, title: v} : ser))}
                              className="text-xl sm:text-4xl font-black text-white mb-3 sm:mb-6 uppercase tracking-tighter leading-none group-hover:text-blue-500 transition-colors duration-500"
                            />
                            
                            <div className="max-h-0 group-hover:max-h-40 overflow-hidden transition-all duration-700 ease-in-out">
                              <EditableText 
                                text={s.description} 
                                isEditMode={isEditMode} 
                                isDesignAuthenticated={isDesignAuthenticated}
                                onSave={v => setServices(services.map(ser => ser.id === s.id ? {...ser, description: v} : ser))}
                                multiline
                                className="text-slate-400 text-xs sm:text-lg leading-relaxed mb-8 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                              />
                            </div>

                            <div className="flex items-center justify-between pt-6 sm:pt-8 border-t border-white/5">
                              <div className="flex items-center gap-4">
                                <button 
                                  onClick={() => setSelectedServiceForModal(s)}
                                  className="text-[9px] sm:text-xs font-black uppercase tracking-[0.2em] text-blue-500 hover:text-white transition-colors flex items-center gap-2 sm:gap-3 group/btn"
                                >
                                  {t('view_details')} 
                                  <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover/btn:translate-x-1 transition-transform" />
                                </button>
                                <button 
                                  onClick={() => handleOpenAiServiceChat(s)}
                                  className="text-[9px] sm:text-xs font-black uppercase tracking-[0.2em] text-emerald-500 hover:text-white transition-colors flex items-center gap-2 sm:gap-3 group/btn"
                                >
                                  {t('chat_with_ai')}
                                  <Bot className="w-3 h-3 sm:w-4 sm:h-4 group-hover/btn:scale-110 transition-transform" />
                                </button>
                              </div>
                              
                              <div className="hidden sm:flex -space-x-3">
                                {[1,2,3].map(i => (
                                  <div key={i} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-slate-900 bg-slate-800 overflow-hidden">
                                    <img src={`https://i.pravatar.cc/100?img=${i + idx}`} alt="User" className="w-full h-full object-cover opacity-60" />
                                  </div>
                                ))}
                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-slate-900 bg-blue-600 flex items-center justify-center text-[8px] sm:text-[10px] font-black text-white">
                                  +12
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
            </div>
          </div>
        </section>

        {/* Packages Section */}
        <section id="packages" className="py-24 sm:py-32 bg-slate-950 relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col items-center text-center mb-16 sm:mb-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-emerald-600/10 border border-emerald-500/20 mb-6"
              >
                <Package className="w-4 h-4 text-emerald-500" />
                <span className="text-emerald-500 font-black uppercase tracking-widest text-[10px]">{t('comprehensive_care_package')}</span>
              </motion.div>
              <h2 className="text-4xl sm:text-7xl font-black text-white uppercase mb-6 tracking-tighter leading-none">
                {t('service_package_pricing')}
              </h2>
              <p className="text-slate-500 max-w-2xl mx-auto text-sm sm:text-lg font-medium">
                {t('packages_description')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {(siteConfig.packages || []).map((pkg, idx) => (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className={`relative p-8 rounded-[40px] border transition-all duration-500 flex flex-col ${
                    pkg.isPopular 
                    ? 'bg-blue-600/10 border-blue-500/50 shadow-2xl shadow-blue-900/20 scale-105 z-10' 
                    : 'bg-slate-900/40 border-white/5 hover:border-white/20'
                  }`}
                >
                  {pkg.isPopular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-black px-6 py-2 rounded-full uppercase tracking-widest shadow-xl">
                      {t('most_popular')}
                    </div>
                  )}
                  
                  <div className="mb-8">
                    <h3 className="text-2xl font-black text-white uppercase mb-2 tracking-tight">{pkg.title}</h3>
                    <p className="text-slate-400 text-xs leading-relaxed h-12 overflow-hidden">{pkg.description}</p>
                  </div>

                  <div className="mb-8">
                    <div className="text-4xl font-black text-white mb-1">{pkg.price}</div>
                    <div className="text-slate-500 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                      <Clock className="w-3 h-3" />
                      {t('execution_time')}: {pkg.duration}
                    </div>
                  </div>

                  <div className="flex-1 space-y-4 mb-10">
                    {pkg.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-emerald-500" />
                        </div>
                        <span className="text-slate-300 text-sm font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button 
                    onClick={() => setIsBookingModalOpen(true)}
                    className={`w-full py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] transition-all active:scale-95 ${
                      pkg.isPopular
                      ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-900/40'
                      : 'bg-white text-slate-950 hover:bg-slate-200'
                    }`}
                  >
                    {t('book_now_package')}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Premium Solutions Section */}
        <section id="premium" className="py-24 sm:py-32 bg-slate-900/30 relative overflow-hidden">
          {/* Decorative background element */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none"></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col items-center text-center mb-20 sm:mb-32">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-emerald-600 flex items-center justify-center text-white text-2xl shadow-2xl mb-8"
              >
                💎
              </motion.div>
              <EditableText 
                tag="h2" 
                text={siteConfig.premiumTitle} 
                isEditMode={isEditMode} 
                isDesignAuthenticated={isDesignAuthenticated}
                onSave={v => setSiteConfig({...siteConfig, premiumTitle: v})}
                className="text-4xl sm:text-7xl font-black text-white uppercase mb-6 tracking-tighter leading-none"
              />
              <EditableText 
                text={siteConfig.premiumSubtitle} 
                isEditMode={isEditMode} 
                isDesignAuthenticated={isDesignAuthenticated}
                onSave={v => setSiteConfig({...siteConfig, premiumSubtitle: v})}
                className="text-slate-500 max-w-2xl mx-auto text-sm sm:text-lg font-medium"
              />
            </div>

            <div className="space-y-20 sm:space-y-48">
              {premiumSolutions.map((sol, idx) => (
                <motion.div 
                  key={sol.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 sm:gap-24 items-center`}
                >
                  <div className="w-full lg:w-1/2">
                    <div className="relative aspect-[4/3] rounded-[32px] sm:rounded-[64px] overflow-hidden shadow-[0_40px_80px_-15px_rgba(0,0,0,0.5)] border border-white/10 group">
                      <div className="absolute inset-0 flex">
                        <div className="w-1/2 h-full relative overflow-hidden">
                          <EditableImage 
                            src={sol.beforeImage} 
                            isEditMode={isEditMode} 
                            isDesignAuthenticated={isDesignAuthenticated}
                            onUpload={base64 => setPremiumSolutions(prev => prev.map(p => p.id === sol.id ? {...p, beforeImage: base64} : p))}
                            alt="Before"
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-black/20"></div>
                          <div className="absolute top-4 sm:top-8 left-4 sm:left-8 bg-slate-950/80 backdrop-blur-md text-white text-[8px] sm:text-[10px] font-black px-4 sm:px-6 py-1.5 sm:py-2 rounded-full uppercase tracking-widest border border-white/10">{t('before')}</div>
                        </div>
                        <div className="w-1/2 h-full relative overflow-hidden">
                          <EditableImage 
                            src={sol.afterImage} 
                            isEditMode={isEditMode} 
                            isDesignAuthenticated={isDesignAuthenticated}
                            onUpload={base64 => setPremiumSolutions(prev => prev.map(p => p.id === sol.id ? {...p, afterImage: base64} : p))}
                            alt="After"
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                          />
                          <div className="absolute top-4 sm:top-8 right-4 sm:right-8 bg-blue-600 text-white text-[8px] sm:text-[10px] font-black px-4 sm:px-6 py-1.5 sm:py-2 rounded-full uppercase tracking-widest shadow-xl">{t('after')}</div>
                        </div>
                      </div>
                      <div className="absolute inset-0 pointer-events-none border-x border-white/20 left-1/2 -translate-x-1/2 shadow-[0_0_40px_rgba(0,0,0,0.5)]"></div>
                      
                      {/* Label overlay */}
                      <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 bg-slate-950/80 backdrop-blur-md px-6 sm:px-8 py-2 sm:py-3 rounded-2xl border border-white/10 text-white font-black text-[8px] sm:text-[10px] uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        {t('absolute_difference')}
                      </div>
                    </div>
                  </div>

                  <div className="w-full lg:w-1/2 space-y-8 sm:space-y-12">
                    <div className="space-y-4 sm:space-y-6">
                      <div className="flex items-center gap-4">
                        <span className="text-blue-600 font-black text-3xl sm:text-5xl opacity-20">0{idx + 1}</span>
                        <div className="h-px flex-1 bg-gradient-to-r from-blue-600/50 to-transparent"></div>
                      </div>
                      <EditableText 
                        tag="h3" 
                        text={sol.title} 
                        isEditMode={isEditMode} 
                        isDesignAuthenticated={isDesignAuthenticated}
                        onSave={v => setPremiumSolutions(prev => prev.map(p => p.id === sol.id ? {...p, title: v} : p))}
                        className="text-2xl sm:text-5xl font-black uppercase text-white tracking-tighter leading-none"
                      />
                      <EditableText 
                        text={sol.description} 
                        isEditMode={isEditMode} 
                        isDesignAuthenticated={isDesignAuthenticated}
                        onSave={v => setPremiumSolutions(prev => prev.map(p => p.id === sol.id ? {...p, description: v} : p))}
                        className="text-slate-400 text-sm sm:text-xl leading-relaxed font-medium"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-16">
                      <div className="space-y-6">
                        <h4 className="text-blue-500 font-black text-[11px] uppercase tracking-[0.3em] flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                          {t('standard_process')}
                        </h4>
                        <ul className="space-y-4">
                          {sol.process.map((step, sIdx) => (
                            <li key={sIdx} className="flex gap-4 text-slate-300 text-sm sm:text-base group/item">
                              <span className="text-blue-600 font-black opacity-40 group-hover/item:opacity-100 transition-opacity">0{sIdx + 1}</span>
                              <EditableText 
                                text={step} 
                                isEditMode={isEditMode} 
                                isDesignAuthenticated={isDesignAuthenticated}
                                onSave={v => setPremiumSolutions(prev => prev.map(p => p.id === sol.id ? {...p, process: p.process.map((st, i) => i === sIdx ? v : st)} : p))}
                              />
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="space-y-6">
                        <h4 className="text-emerald-500 font-black text-[11px] uppercase tracking-[0.3em] flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                          Lợi ích vượt trội
                        </h4>
                        <ul className="space-y-4">
                          {sol.benefits.map((benefit, bIdx) => (
                            <li key={bIdx} className="flex gap-4 text-slate-300 text-sm sm:text-base group/item">
                              <div className="w-5 h-5 rounded-full bg-emerald-600/10 flex items-center justify-center flex-shrink-0 group-hover/item:bg-emerald-600/20 transition-colors">
                                <Check className="w-3 h-3 text-emerald-500" />
                              </div>
                              <EditableText 
                                text={benefit} 
                                isEditMode={isEditMode} 
                                isDesignAuthenticated={isDesignAuthenticated}
                                onSave={v => setPremiumSolutions(prev => prev.map(p => p.id === sol.id ? {...p, benefits: p.benefits.map((bt, i) => i === bIdx ? v : bt)} : p))}
                              />
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => setIsBookingModalOpen(true)}
                      className="inline-flex items-center gap-4 text-white font-black uppercase tracking-widest text-xs group/link"
                    >
                      <span className="border-b-2 border-blue-600 pb-1 group-hover:border-white transition-colors">Nhận báo giá chi tiết</span>
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-blue-600 transition-all">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* AI Advisor */}
        <section id="ai-advisor" className="py-24 sm:py-32 bg-slate-950 border-y border-white/5 relative overflow-hidden">
          {/* Background Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

          <div className="container mx-auto px-4 max-w-7xl relative z-10">
            <div className="flex flex-col lg:flex-row gap-16 sm:gap-24 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:w-5/12 w-full text-center lg:text-left"
              >
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-600/10 border border-blue-500/20 mb-8">
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                  <span className="text-blue-500 font-black uppercase tracking-widest text-[10px]">AI Powered Assistant</span>
                </div>
                <EditableText 
                  tag="h2" 
                  text={siteConfig.aiTitle} 
                  isEditMode={isEditMode} 
                  isDesignAuthenticated={isDesignAuthenticated}
                  onSave={v => setSiteConfig({...siteConfig, aiTitle: v})}
                  className="text-4xl sm:text-7xl font-black text-white uppercase mb-8 leading-[0.9] tracking-tighter"
                />
                <EditableText 
                  text={siteConfig.aiSubtitle} 
                  isEditMode={isEditMode} 
                  isDesignAuthenticated={isDesignAuthenticated}
                  onSave={v => setSiteConfig({...siteConfig, aiSubtitle: v})}
                  multiline
                  className="text-slate-400 text-base sm:text-xl mb-12 leading-relaxed font-medium"
                />
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                  <div className="bg-slate-900/50 p-8 rounded-[32px] border border-white/5 hover:border-blue-500/30 transition-all group">
                    <div className="w-12 h-12 rounded-2xl bg-blue-600/10 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">⚡</div>
                    <h4 className="text-white font-black uppercase tracking-widest text-xs mb-2">Tư vấn Detailing</h4>
                    <p className="text-slate-500 text-xs leading-relaxed">Hỏi về Ceramic, PPF, vệ sinh nội thất...</p>
                  </div>
                  <div className="bg-slate-900/50 p-8 rounded-[32px] border border-white/5 hover:border-blue-500/30 transition-all group">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-600/10 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">🛠️</div>
                    <h4 className="text-white font-black uppercase tracking-widest text-xs mb-2">Bảo dưỡng xe</h4>
                    <p className="text-slate-500 text-xs leading-relaxed">Lịch trình bảo dưỡng, xử lý lỗi vặt...</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 justify-center lg:justify-start">
                  <div className="flex -space-x-4">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-950 bg-slate-800 flex items-center justify-center overflow-hidden">
                        <img src={`https://picsum.photos/seed/user${i}/100/100`} alt="User" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                    ))}
                  </div>
                  <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">
                    <span className="text-white">500+</span> Khách hàng đã sử dụng
                  </p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:w-7/12 w-full"
              >
                <div className="bg-slate-900/80 border border-white/10 rounded-[48px] flex flex-col shadow-[0_40px_100px_-20px_rgba(0,0,0,0.7)] overflow-hidden relative backdrop-blur-xl h-[600px] sm:h-[750px]">
                  {/* Chat Header */}
                  <div className="p-6 sm:p-8 bg-white/5 border-b border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center font-black text-xl overflow-hidden border border-white/10 shadow-lg">
                          {siteConfig.aiVideoUrl ? (
                            <video src={siteConfig.aiVideoUrl} autoPlay muted loop playsInline className="w-full h-full object-cover" />
                          ) : (
                            "AI"
                          )}
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-slate-900"></div>
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-black text-white uppercase tracking-widest">XE ĐẸP AUTO AI Advisor</div>
                        <div className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">Chuyên gia tư vấn kỹ thuật</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <select 
                        value={aiProvider}
                        onChange={(e) => setAiProvider(e.target.value as AIProvider)}
                        className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-[10px] font-black uppercase tracking-widest text-slate-400 outline-none focus:border-blue-500 transition-all cursor-pointer"
                      >
                        <option value="gemini" className="bg-slate-900">Gemini (Free)</option>
                        <option value="openai" className="bg-slate-900">OpenAI (GPT-4o)</option>
                        <option value="claude" className="bg-slate-900">Claude (3.5 Sonnet)</option>
                      </select>
                      <button 
                        onClick={clearChat}
                        title="Xóa lịch sử trò chuyện"
                        className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:bg-red-500/20 hover:text-red-500 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:bg-white/10 transition-all"><Phone className="w-4 h-4" /></button>
                    </div>
                  </div>

                  {/* Chat Body */}
                  <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-6 sm:space-y-8 custom-scrollbar">
                    {aiMessages.map((m, i) => (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={i} 
                        className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[85%] sm:max-w-[75%] p-4 sm:p-6 rounded-[28px] text-sm sm:text-base leading-relaxed shadow-xl ${
                          m.role === 'user' 
                            ? 'bg-blue-600 text-white rounded-tr-none' 
                            : 'bg-slate-800/50 border border-white/5 text-slate-200 rounded-tl-none'
                        }`}>
                          <ReactMarkdown>{m.text}</ReactMarkdown>
                        </div>
                      </motion.div>
                    ))}
                    {isAiLoading && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-3 ml-2"
                      >
                        <div className="flex gap-1">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></div>
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce delay-150"></div>
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce delay-300"></div>
                        </div>
                        <span className="text-slate-600 text-[10px] uppercase font-black tracking-widest italic">AI đang xử lý...</span>
                      </motion.div>
                    )}
                    <div ref={chatEndRef} />
                  </div>

                  {/* Chat Input */}
                  <div className="p-6 sm:p-10 border-t border-white/5 bg-slate-950/50">
                    <div className="relative flex items-center gap-4">
                      <input 
                        value={aiInput}
                        onChange={e => setAiInput(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleAiChat()}
                        disabled={isAiLoading}
                        placeholder={isAiLoading ? "AI đang trả lời..." : "Nhập câu hỏi của bạn tại đây..."} 
                        className="flex-1 bg-slate-800/50 border border-white/10 rounded-2xl px-6 py-5 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-white text-sm sm:text-base placeholder:text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                      <button 
                        onClick={() => handleAiChat()} 
                        disabled={isAiLoading || !aiInput.trim()}
                        className="bg-blue-600 hover:bg-blue-500 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center transition-all shadow-2xl shadow-blue-900/40 active:scale-90 group disabled:opacity-50 disabled:grayscale"
                      >
                        <Send className="w-6 h-6 text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </button>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {[
                        'Giá phủ Ceramic?', 
                        'PPF là gì?', 
                        'Vệ sinh nội thất bao nhiêu?', 
                        'Địa chỉ ở đâu?',
                        'Mẹo rửa xe tại nhà'
                      ].map(text => (
                        <button 
                          key={text}
                          onClick={() => { setAiInput(text); }}
                          className="text-[9px] font-black uppercase tracking-widest text-slate-500 hover:text-blue-500 hover:bg-blue-500/10 transition-all bg-white/5 px-4 py-2 rounded-full border border-white/5"
                        >
                          {text}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Window Tinting Section */}
        <section id="window-tinting" className="py-24 sm:py-32 bg-slate-900 relative overflow-hidden">
          {/* Decorative background text */}
          <div className="absolute -right-20 top-1/2 -translate-y-1/2 text-[200px] font-black text-white/5 uppercase tracking-tighter select-none rotate-90 pointer-events-none">
            WINDOW TINTING
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 sm:gap-32 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-10"
              >
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-600/10 border border-blue-500/20">
                    <Shield className="w-4 h-4 text-blue-500" />
                    <EditableText 
                      tag="span" 
                      text={siteConfig.windowTintingSubtitle} 
                      isEditMode={isEditMode} 
                      onSave={(v) => setSiteConfig({...siteConfig, windowTintingSubtitle: v})}
                      className="text-blue-500 font-black uppercase tracking-[0.3em] text-[10px]"
                    />
                  </div>
                  <EditableText 
                    tag="h2" 
                    text={siteConfig.windowTintingTitle} 
                    isEditMode={isEditMode} 
                    onSave={(v) => setSiteConfig({...siteConfig, windowTintingTitle: v})}
                    className="text-5xl sm:text-8xl font-black text-white uppercase tracking-tighter leading-[0.85]"
                  />
                </div>
                
                <EditableText 
                  tag="p" 
                  text={siteConfig.windowTintingDescription} 
                  isEditMode={isEditMode} 
                  onSave={(v) => setSiteConfig({...siteConfig, windowTintingDescription: v})}
                  className="text-slate-400 text-base sm:text-xl max-w-xl leading-relaxed font-medium"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    { icon: <Shield className="w-6 h-6 text-blue-500" />, title: "Cản 99% Tia UV", desc: "Bảo vệ da và mắt khỏi tác hại của ánh nắng." },
                    { icon: <Zap className="w-6 h-6 text-emerald-500" />, title: "Giảm Nhiệt 97%", desc: "Tiết kiệm nhiên liệu, làm mát nhanh chóng." },
                    { icon: <EyeOff className="w-6 h-6 text-purple-500" />, title: "Riêng Tư Tuyệt Đối", desc: "Người ngoài khó nhìn vào, bên trong nhìn rõ." },
                    { icon: <Award className="w-6 h-6 text-amber-500" />, title: "Bảo Hành Trọn Đời", desc: "Cam kết chất lượng, không bong tróc, bay màu." }
                  ].map((item, idx) => (
                    <motion.div 
                      key={idx}
                      whileHover={{ y: -5 }}
                      className="flex flex-col gap-4 p-8 bg-slate-950/50 rounded-[32px] border border-white/5 hover:border-blue-500/30 transition-all group"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center border border-white/10 group-hover:bg-blue-600/10 transition-colors">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="text-white font-black uppercase tracking-widest text-xs mb-2">{item.title}</h4>
                        <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-6">
                  <button 
                    onClick={() => window.location.href = `tel:${siteConfig.contactPhone}`}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-12 py-5 rounded-2xl text-sm font-black uppercase tracking-widest shadow-2xl shadow-blue-900/40 transition-all active:scale-95"
                  >
                    Tư Vấn Dán Phim
                  </button>
                  <button 
                    onClick={() => scrollToSection('services')}
                    className="bg-slate-800 hover:bg-slate-700 text-white px-12 py-5 rounded-2xl text-sm font-black uppercase tracking-widest transition-all active:scale-95"
                  >
                    Xem Các Gói Phim
                  </button>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="relative aspect-[4/5] rounded-[64px] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] border border-white/10">
                  <img 
                    src="https://picsum.photos/seed/windowtint/800/1000" 
                    alt="Window Tinting" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                  
                  {/* Floating badge */}
                  <div className="absolute bottom-12 left-12 right-12 bg-white/5 backdrop-blur-xl p-8 rounded-[32px] border border-white/10">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-black">3M</div>
                      <div>
                        <div className="text-white font-black uppercase tracking-widest text-xs">Phim Cách Nhiệt 3M</div>
                        <div className="text-slate-400 text-[10px] uppercase tracking-widest">Chính hãng Hoa Kỳ</div>
                      </div>
                    </div>
                    <p className="text-slate-300 text-xs leading-relaxed italic">"Công nghệ phim quang học đa lớp độc quyền, mang lại hiệu suất cản nhiệt vượt trội mà vẫn giữ được độ trong suốt hoàn hảo."</p>
                  </div>
                </div>
                
                {/* Decorative circles */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-600/20 rounded-full blur-[60px] -z-10"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-600/20 rounded-full blur-[60px] -z-10"></div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Wrap & PPF Section */}
        <section id="wrap-ppf" className="py-24 sm:py-32 bg-slate-950 relative overflow-hidden">
          {/* Decorative background text */}
          <div className="absolute -left-20 top-1/2 -translate-y-1/2 text-[200px] font-black text-white/5 uppercase tracking-tighter select-none -rotate-90 pointer-events-none">
            WRAP & PPF
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 sm:gap-32 items-center">
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:order-2 space-y-10"
              >
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-emerald-600/10 border border-emerald-500/20">
                    <Palette className="w-4 h-4 text-emerald-500" />
                    <EditableText 
                      tag="span" 
                      text={siteConfig.wrapPPFSubtitle} 
                      isEditMode={isEditMode} 
                      onSave={(v) => setSiteConfig({...siteConfig, wrapPPFSubtitle: v})}
                      className="text-emerald-500 font-black uppercase tracking-[0.3em] text-[10px]"
                    />
                  </div>
                  <EditableText 
                    tag="h2" 
                    text={siteConfig.wrapPPFTitle} 
                    isEditMode={isEditMode} 
                    onSave={(v) => setSiteConfig({...siteConfig, wrapPPFTitle: v})}
                    className="text-5xl sm:text-8xl font-black text-white uppercase tracking-tighter leading-[0.85]"
                  />
                </div>
                
                <EditableText 
                  tag="p" 
                  text={siteConfig.wrapPPFDescription} 
                  isEditMode={isEditMode} 
                  onSave={(v) => setSiteConfig({...siteConfig, wrapPPFDescription: v})}
                  className="text-slate-400 text-base sm:text-xl max-w-xl leading-relaxed font-medium"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    { icon: <Shield className="w-6 h-6 text-emerald-500" />, title: "PPF Tự Phục Hồi", desc: "Vết xước dăm tự biến mất dưới tác động nhiệt." },
                    { icon: <Palette className="w-6 h-6 text-blue-500" />, title: "Wrap Đổi Màu", desc: "Hơn 500+ mã màu từ các thương hiệu hàng đầu." },
                    { icon: <Zap className="w-6 h-6 text-amber-500" />, title: "Bảo Vệ Sơn Gốc", desc: "Giữ lớp sơn nguyên bản luôn như mới sau nhiều năm." },
                    { icon: <Award className="w-6 h-6 text-purple-500" />, title: "Độ Bền 5-10 Năm", desc: "Cam kết không bong tróc, không để lại keo." }
                  ].map((item, idx) => (
                    <motion.div 
                      key={idx}
                      whileHover={{ y: -5 }}
                      className="flex flex-col gap-4 p-8 bg-slate-900/50 rounded-[32px] border border-white/5 hover:border-emerald-500/30 transition-all group"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-slate-950 flex items-center justify-center border border-white/10 group-hover:bg-emerald-600/10 transition-colors">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="text-white font-black uppercase tracking-widest text-xs mb-2">{item.title}</h4>
                        <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-6">
                  <button 
                    onClick={() => window.location.href = `tel:${siteConfig.contactPhone}`}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white px-12 py-5 rounded-2xl text-sm font-black uppercase tracking-widest shadow-2xl shadow-emerald-900/40 transition-all active:scale-95"
                  >
                    Tư Vấn Wrap & PPF
                  </button>
                  <button 
                    onClick={() => scrollToSection('services')}
                    className="bg-slate-800 hover:bg-slate-700 text-white px-12 py-5 rounded-2xl text-sm font-black uppercase tracking-widest transition-all active:scale-95"
                  >
                    Xem Bảng Màu
                  </button>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="lg:order-1 relative"
              >
                <div className="relative aspect-[4/5] rounded-[64px] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] border border-white/10">
                  <img 
                    src="https://picsum.photos/seed/carwrap/800/1000" 
                    alt="Wrap & PPF" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                  
                  {/* Floating badge */}
                  <div className="absolute bottom-12 left-12 right-12 bg-white/5 backdrop-blur-xl p-8 rounded-[32px] border border-white/10">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center text-white font-black">PPF</div>
                      <div>
                        <div className="text-white font-black uppercase tracking-widest text-xs">Paint Protection Film</div>
                        <div className="text-slate-400 text-[10px] uppercase tracking-widest">Công nghệ TPU cao cấp</div>
                      </div>
                    </div>
                    <p className="text-slate-300 text-xs leading-relaxed italic">"Lớp giáp vô hình bảo vệ xế cưng khỏi đá văng, trầy xước và tác động của môi trường, đồng thời tăng độ bóng sâu cho sơn xe."</p>
                  </div>
                </div>
                
                {/* Decorative circles */}
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-emerald-600/20 rounded-full blur-[60px] -z-10"></div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-600/20 rounded-full blur-[60px] -z-10"></div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Tuning Section */}
        <section id="tuning" className="py-24 sm:py-32 bg-slate-950 relative overflow-hidden">
          {/* Decorative background text */}
          <div className="absolute -right-20 top-1/2 -translate-y-1/2 text-[200px] font-black text-white/5 uppercase tracking-tighter select-none rotate-90 pointer-events-none">
            TUNING
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 sm:gap-32 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-10"
              >
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-600/10 border border-blue-500/20">
                    <Zap className="w-4 h-4 text-blue-500" />
                    <EditableText 
                      tag="span" 
                      text={siteConfig.tuningSubtitle} 
                      isEditMode={isEditMode} 
                      onSave={(v) => setSiteConfig({...siteConfig, tuningSubtitle: v})}
                      className="text-blue-500 font-black uppercase tracking-[0.3em] text-[10px]"
                    />
                  </div>
                  <EditableText 
                    tag="h2" 
                    text={siteConfig.tuningTitle} 
                    isEditMode={isEditMode} 
                    onSave={(v) => setSiteConfig({...siteConfig, tuningTitle: v})}
                    className="text-5xl sm:text-8xl font-black text-white uppercase tracking-tighter leading-[0.85]"
                  />
                </div>
                
                <EditableText 
                  tag="p" 
                  text={siteConfig.tuningDescription} 
                  isEditMode={isEditMode} 
                  onSave={(v) => setSiteConfig({...siteConfig, tuningDescription: v})}
                  className="text-slate-400 text-base sm:text-xl max-w-xl leading-relaxed font-medium"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    { icon: <Zap className="w-6 h-6 text-blue-500" />, title: "Nâng Cấp Ánh Sáng", desc: "Độ đèn Bi-LED, Laser tăng sáng vượt trội và thẩm mỹ." },
                    { icon: <Activity className="w-6 h-6 text-emerald-500" />, title: "Âm Thanh Hi-End", desc: "Hệ thống loa, sub, dsp từ các thương hiệu danh tiếng." },
                    { icon: <Target className="w-6 h-6 text-amber-500" />, title: "Bodykit & Mâm", desc: "Cá nhân hóa ngoại thất, tạo điểm nhấn riêng biệt." },
                    { icon: <Trophy className="w-6 h-6 text-purple-500" />, title: "Performance", desc: "Tối ưu hiệu năng vận hành, cảm giác lái phấn khích." }
                  ].map((item, idx) => (
                    <motion.div 
                      key={idx}
                      whileHover={{ y: -5 }}
                      className="flex flex-col gap-4 p-8 bg-slate-900/50 rounded-[32px] border border-white/5 hover:border-blue-500/30 transition-all group"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-slate-950 flex items-center justify-center border border-white/10 group-hover:bg-blue-600/10 transition-colors">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="text-white font-black uppercase tracking-widest text-xs mb-2">{item.title}</h4>
                        <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-6">
                  <button 
                    onClick={() => window.location.href = `tel:${siteConfig.contactPhone}`}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-12 py-5 rounded-2xl text-sm font-black uppercase tracking-widest shadow-2xl shadow-blue-900/40 transition-all active:scale-95"
                  >
                    Tư Vấn Độ Xe
                  </button>
                  <button 
                    onClick={() => scrollToSection('gallery')}
                    className="bg-slate-800 hover:bg-slate-700 text-white px-12 py-5 rounded-2xl text-sm font-black uppercase tracking-widest transition-all active:scale-95"
                  >
                    Xem Dự Án
                  </button>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="relative aspect-[4/5] rounded-[64px] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] border border-white/10">
                  <img 
                    src="https://picsum.photos/seed/cartuning/800/1000" 
                    alt="Car Tuning" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                  
                  {/* Floating badge */}
                  <div className="absolute bottom-12 left-12 right-12 bg-white/5 backdrop-blur-xl p-8 rounded-[32px] border border-white/10">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-black">PRO</div>
                      <div>
                        <div className="text-white font-black uppercase tracking-widest text-xs">Professional Tuning</div>
                        <div className="text-slate-400 text-[10px] uppercase tracking-widest">Kỹ thuật viên tay nghề cao</div>
                      </div>
                    </div>
                    <p className="text-slate-300 text-xs leading-relaxed italic">"Biến ý tưởng của bạn thành hiện thực với những giải pháp độ xe an toàn, thẩm mỹ và tuân thủ các tiêu chuẩn kỹ thuật khắt khe nhất."</p>
                  </div>
                </div>
                
                {/* Decorative circles */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-600/20 rounded-full blur-[60px] -z-10"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-600/20 rounded-full blur-[60px] -z-10"></div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Tracking Section */}
        <TrackingSection trackingData={trackingData} t={t} />

        {/* Feedback & Reviews Section */}
        <FeedbackSection 
          reviews={reviews} 
          services={services} 
          onAddReview={(newReview) => setReviews(prev => [{ ...newReview, id: Date.now().toString() } as Review, ...prev])} 
          t={t}
        />

        {/* Gallery Section */}
        <section id="gallery" className="py-24 sm:py-32 bg-slate-950 relative overflow-hidden">
          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto mb-16 sm:mb-24"
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-600/10 border border-blue-500/20 mb-6">
                <Camera className="w-4 h-4 text-blue-500" />
                <span className="text-blue-500 font-black uppercase tracking-[0.3em] text-[10px]">Visual Showcase</span>
              </div>
              <EditableText 
                tag="h2" 
                text={siteConfig.galleryTitle} 
                isEditMode={isEditMode} 
                isDesignAuthenticated={isDesignAuthenticated}
                onSave={v => setSiteConfig({...siteConfig, galleryTitle: v})}
                className="text-4xl sm:text-7xl font-black uppercase mb-6 tracking-tighter text-white"
              />
              <EditableText 
                text={siteConfig.gallerySubtitle} 
                isEditMode={isEditMode} 
                isDesignAuthenticated={isDesignAuthenticated}
                onSave={v => setSiteConfig({...siteConfig, gallerySubtitle: v})}
                className="text-slate-500 text-sm sm:text-xl font-medium leading-relaxed"
              />
            </motion.div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
              {gallery.map((img, idx) => (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05, duration: 0.5 }}
                  key={img.id} 
                  className="group relative aspect-square rounded-[32px] sm:rounded-[48px] overflow-hidden bg-slate-900 border border-white/5 shadow-2xl transition-all hover:border-blue-500/30"
                >
                  <EditableImage 
                    src={img.url} 
                    isEditMode={isEditMode} 
                    isDesignAuthenticated={isDesignAuthenticated}
                    onUpload={base64 => setGallery(gallery.map(g => g.id === img.id ? {...g, url: base64} : g))}
                    alt={img.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-slate-950/80 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center p-6 sm:p-10 backdrop-blur-md">
                    <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center mb-4 scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 delay-100">
                      <Maximize2 className="w-5 h-5 text-white" />
                    </div>
                    <EditableText 
                      text={img.title} 
                      isEditMode={isEditMode} 
                      isDesignAuthenticated={isDesignAuthenticated}
                      onSave={v => setGallery(gallery.map(g => g.id === img.id ? {...g, title: v} : g))}
                      className="text-white font-black uppercase tracking-widest text-[10px] sm:text-xs text-center translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-200"
                    />
                    {isDesignAuthenticated && (
                      <button 
                        onClick={async () => {
                          const prompt = window.prompt("AI Chỉnh sửa ảnh này (VD: Hiệu ứng bóng sơn):");
                          if (prompt) {
                            const result = await editImageWithAI(img.url, prompt);
                            if (result) setGallery(gallery.map(g => g.id === img.id ? {...g, url: result} : g));
                          }
                        }} 
                        className="mt-6 bg-blue-600 text-[8px] sm:text-[10px] font-black uppercase px-6 py-3 rounded-xl hover:bg-blue-500 transition-all shadow-xl active:scale-95 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 duration-500 delay-300"
                      >
                        🪄 AI Edit
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* News Section */}
        <NewsSection 
          siteConfig={siteConfig} 
          isEditMode={isEditMode} 
          isDesignAuthenticated={isDesignAuthenticated}
          setSiteConfig={setSiteConfig}
          selectedArticle={selectedArticle}
          setSelectedArticle={setSelectedArticle}
        />

        {/* Contact Form Section */}
        <ContactSection siteConfig={siteConfig} />
      </main>

      {/* Footer */}
       {/* Warranty Lookup Section */}
      <section id="warranty-lookup" className="py-24 bg-slate-900/30 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
                <ShieldCheck className="w-4 h-4 text-blue-500" />
                <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">{t('warranty_lookup_title')}</span>
              </div>
              <h2 className="text-5xl font-black text-white uppercase tracking-tighter mb-6 leading-none">
                {t('warranty_lookup_title')}
              </h2>
              <p className="text-slate-400 text-lg font-medium leading-relaxed mb-8 max-w-xl">
                {t('warranty_lookup_desc')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input 
                    type="text" 
                    placeholder={t('warranty_plate_placeholder')} 
                    className="w-full bg-slate-950 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white font-bold outline-none focus:border-blue-500 transition-all"
                    value={warrantySearch}
                    onChange={e => setWarrantySearch(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleWarrantySearch()}
                  />
                </div>
                <button 
                  onClick={handleWarrantySearch}
                  className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[11px] transition-all shadow-xl shadow-blue-600/20"
                >
                  {t('warranty_check_btn')}
                </button>
              </div>
            </div>

            <div className="relative">
              <AnimatePresence mode="wait">
                {foundCertificate ? (
                  <motion.div 
                    key="cert-found"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-slate-950 border border-blue-500/30 p-8 rounded-[40px] shadow-2xl relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 blur-3xl rounded-full -mr-16 -mt-16" />
                    
                    <div className="flex justify-between items-start mb-8">
                      <div>
                        <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-1">{t('warranty_info_title')}</p>
                        <h4 className="text-2xl font-black text-white uppercase tracking-tight">{foundCertificate.qrCode}</h4>
                      </div>
                      <div className="w-12 h-12 rounded-2xl bg-blue-600/10 flex items-center justify-center">
                        <ShieldCheck className="w-6 h-6 text-blue-500" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6 mb-8">
                      <div>
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">{t('warranty_customer')}</p>
                        <p className="text-sm font-bold text-white">{foundCertificate.customerName}</p>
                      </div>
                      <div>
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">{t('warranty_plate')}</p>
                        <p className="text-sm font-bold text-white">{foundCertificate.licensePlate}</p>
                      </div>
                      <div>
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">{t('warranty_service')}</p>
                        <p className="text-sm font-bold text-blue-500">{foundCertificate.serviceType}</p>
                      </div>
                      <div>
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">{t('warranty_status')}</p>
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                          foundCertificate.status === 'active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'
                        }`}>
                          {foundCertificate.status === 'active' ? t('warranty_active') : t('warranty_expired')}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-900 border border-white/5 flex items-center justify-between">
                      <div>
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">{t('warranty_expiry_date')}</p>
                        <p className="text-sm font-bold text-white">{foundCertificate.expiryDate}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">{t('technician')}</p>
                        <p className="text-sm font-bold text-white">{foundCertificate.technician}</p>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => setFoundCertificate(null)}
                      className="w-full mt-6 text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-white transition-colors"
                    >
                      {t('warranty_close')}
                    </button>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="cert-empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-slate-950/50 border border-dashed border-white/10 p-12 rounded-[40px] flex flex-col items-center justify-center text-center"
                  >
                    <div className="w-20 h-20 rounded-full bg-slate-900 flex items-center justify-center mb-6">
                      <Search className="w-8 h-8 text-slate-700" />
                    </div>
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Kết quả tra cứu sẽ hiển thị tại đây</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-slate-950 border-t border-white/5 pt-20 pb-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Brand Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                {siteConfig.logoUrl ? (
                  <img 
                    src={siteConfig.logoUrl} 
                    alt="Logo" 
                    className="w-12 h-12 object-contain"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-emerald-600 rounded-xl flex items-center justify-center font-black text-white text-2xl shadow-lg shadow-blue-900/20">
                    {siteConfig.siteName.charAt(0)}
                  </div>
                )}
                <h3 className="text-2xl font-black text-white uppercase tracking-tighter">
                  <EditableText 
                    text={siteConfig.siteName} 
                    isEditMode={isEditMode} 
                    isDesignAuthenticated={isDesignAuthenticated}
                    onSave={v => setSiteConfig({...siteConfig, siteName: v})}
                  />
                </h3>
              </div>
              <EditableText 
                text={siteConfig.heroDescription} 
                isEditMode={isEditMode} 
                isDesignAuthenticated={isDesignAuthenticated}
                onSave={v => setSiteConfig({...siteConfig, heroDescription: v})}
                multiline
                className="text-slate-500 text-sm leading-relaxed"
              />
              <div className="flex gap-4">
                {siteConfig.facebookUrl && (
                  <a href={siteConfig.facebookUrl} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all">
                    <span className="text-xs font-black">FB</span>
                  </a>
                )}
                {siteConfig.youtubeUrl && (
                  <a href={siteConfig.youtubeUrl} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-red-600 hover:text-white transition-all">
                    <span className="text-xs font-black">YT</span>
                  </a>
                )}
                <a href={`https://zalo.me/${siteConfig.zaloNumber}`} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-blue-500 hover:text-white transition-all">
                  <span className="text-xs font-black">ZL</span>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500">Liên Kết Nhanh</h4>
              <ul className="space-y-3">
                <li><button onClick={() => scrollToSection('promotions')} className="text-slate-400 hover:text-white text-sm transition-colors">Khuyến Mãi Hot</button></li>
                <li><button onClick={() => scrollToSection('services')} className="text-slate-400 hover:text-white text-sm transition-colors">Dịch Vụ Detailing</button></li>
                <li><button onClick={() => scrollToSection('packages')} className="text-slate-400 hover:text-white text-sm transition-colors">Bảng Giá Gói</button></li>
                <li><button onClick={() => scrollToSection('premium')} className="text-slate-400 hover:text-white text-sm transition-colors">Giải Pháp Cao Cấp</button></li>
                <li><button onClick={() => scrollToSection('gallery')} className="text-slate-400 hover:text-white text-sm transition-colors">Thư Viện Ảnh</button></li>
                <li><button onClick={() => scrollToSection('reviews')} className="text-slate-400 hover:text-white text-sm transition-colors">Đánh Giá Khách Hàng</button></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-6 lg:col-span-2">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500">Thông Tin Liên Hệ</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-500 shrink-0">📍</div>
                  <div className="flex-1">
                    <p className="text-[10px] font-black uppercase text-slate-500 mb-1">Địa chỉ</p>
                    <a 
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.contactAddress)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block hover:text-blue-500 transition-colors"
                    >
                      <EditableText 
                        text={siteConfig.contactAddress} 
                        isEditMode={isEditMode} 
                        isDesignAuthenticated={isDesignAuthenticated}
                        onSave={v => setSiteConfig(prev => ({
                          ...prev, 
                          contactAddress: v,
                          mapEmbedUrl: `https://www.google.com/maps?q=${encodeURIComponent(v)}&hl=vi&t=&z=15&ie=UTF8&iwloc=&output=embed`
                        }))}
                        className="text-slate-300 text-sm font-medium"
                      />
                    </a>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-500 shrink-0">📞</div>
                  <div className="flex-1">
                    <p className="text-[10px] font-black uppercase text-slate-500 mb-1">Hotline</p>
                    <a 
                      href={`tel:${siteConfig.contactPhone}`}
                      className="block hover:text-blue-500 transition-colors"
                    >
                      <EditableText 
                        text={siteConfig.contactPhone} 
                        isEditMode={isEditMode} 
                        isDesignAuthenticated={isDesignAuthenticated}
                        onSave={v => setSiteConfig({...siteConfig, contactPhone: v})}
                        className="text-slate-300 text-sm font-bold"
                      />
                    </a>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-500 shrink-0">✉️</div>
                  <div className="flex-1">
                    <p className="text-[10px] font-black uppercase text-slate-500 mb-1">Email</p>
                    <a 
                      href={`mailto:${siteConfig.contactEmail}`}
                      className="block hover:text-blue-500 transition-colors"
                    >
                      <EditableText 
                        text={siteConfig.contactEmail || ''} 
                        isEditMode={isEditMode} 
                        isDesignAuthenticated={isDesignAuthenticated}
                        onSave={v => setSiteConfig({...siteConfig, contactEmail: v})}
                        className="text-slate-300 text-sm font-medium"
                      />
                    </a>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-500 shrink-0">⏰</div>
                  <div className="flex-1">
                    <p className="text-[10px] font-black uppercase text-slate-500 mb-1">{t('working_hours')}</p>
                    <EditableText 
                      text={siteConfig.contactHours} 
                      isEditMode={isEditMode} 
                      isDesignAuthenticated={isDesignAuthenticated}
                      onSave={v => setSiteConfig({...siteConfig, contactHours: v})}
                      className="text-slate-300 text-sm font-medium"
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-500 shrink-0">💬</div>
                  <div className="flex-1">
                    <p className="text-[10px] font-black uppercase text-slate-500 mb-1">{t('zalo_consultation')}</p>
                    <a 
                      href={`https://zalo.me/${siteConfig.zaloNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block hover:text-blue-500 transition-colors"
                    >
                      <p className="text-slate-300 text-sm font-medium">{siteConfig.zaloNumber}</p>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-10 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6">
            <EditableText 
              text={siteConfig.copyright} 
              isEditMode={isEditMode} 
              isDesignAuthenticated={isDesignAuthenticated}
              onSave={v => setSiteConfig({...siteConfig, copyright: v})}
              className="text-slate-600 text-[10px] uppercase tracking-[0.2em] font-medium"
            />
            <div className="flex gap-8">
              <span className="text-slate-700 text-[10px] uppercase font-black tracking-widest">Privacy Policy</span>
              <span className="text-slate-700 text-[10px] uppercase font-black tracking-widest">Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 sm:bottom-10 right-6 sm:right-10 flex flex-col gap-4 sm:gap-6 z-40">
        <a href={`tel:${siteConfig.contactPhone}`} className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-600 rounded-2xl sm:rounded-[24px] flex items-center justify-center shadow-3xl hover:scale-110 transition-all hover:bg-blue-500 group active:scale-95">
          <span className="text-xl sm:text-2xl group-hover:animate-bounce">📞</span>
        </a>
        <a href={`mailto:${siteConfig.contactEmail}`} className="w-12 h-12 sm:w-16 sm:h-16 bg-emerald-600 rounded-2xl sm:rounded-[24px] flex items-center justify-center shadow-3xl hover:scale-110 transition-all hover:bg-emerald-500 group active:scale-95">
          <span className="text-xl sm:text-2xl group-hover:animate-bounce">✉️</span>
        </a>
        <a href={`https://zalo.me/${siteConfig.zaloNumber || '0588896699'}`} target="_blank" rel="noreferrer" className="w-12 h-12 sm:w-16 sm:h-16 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-[24px] flex items-center justify-center shadow-2xl hover:scale-110 transition-all hover:bg-white/10 group overflow-hidden active:scale-95">
          <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg" className="w-7 h-7 sm:w-9 sm:h-9 opacity-80 group-hover:opacity-100 transition-all" alt="Zalo" />
        </a>
      </div>

      <AdminLoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
        onSuccess={() => {setIsEditMode(true); setIsLoginModalOpen(false);}} 
        pass={siteConfig.adminPassword} 
        siteName={siteConfig.siteName}
        t={t}
      />
      <NotificationCenter 
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
        notifications={notifications}
        onMarkAsRead={markNotificationAsRead}
        onClearAll={clearNotifications}
      />
      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => { setIsBookingModalOpen(false); setPreSelectedSubService(undefined); }} 
        services={services}
        siteConfig={siteConfig}
        setSiteConfig={setSiteConfig}
        handlePayment={handlePayment}
        preSelectedSubService={preSelectedSubService}
        onAddNotification={addNotification}
        scrollToSection={scrollToSection}
      />
      <ShareModal 
        isOpen={isShareModalOpen} 
        onClose={() => setIsShareModalOpen(false)} 
        url={window.location.href}
        title={siteConfig.heroTitle}
      />
      <ServiceDetailsModal
        isOpen={!!selectedServiceForModal}
        onClose={() => setSelectedServiceForModal(null)}
        service={selectedServiceForModal}
        onBooking={(serviceId, subServiceTitle) => {
          setPreSelectedSubService(subServiceTitle);
          setIsBookingModalOpen(true);
        }}
        onAiChat={handleOpenAiServiceChat}
      />
      <AiServiceChatModal
        isOpen={isAiServiceModalOpen}
        onClose={() => setIsAiServiceModalOpen(false)}
        service={selectedServiceForAi}
        aiMessages={aiMessages}
        aiInput={aiInput}
        setAiInput={setAiInput}
        handleAiChat={handleAiChat}
        isAiLoading={isAiLoading}
        aiProvider={aiProvider}
        setAiProvider={setAiProvider}
        clearChat={clearChat}
        chatEndRef={chatEndRef}
      />
      <AdminDashboardModal 
        isOpen={isDashboardOpen} 
        onClose={() => { setIsDashboardOpen(false); setDashboardMaintenancePreFill(null); }} 
        siteConfig={siteConfig}
        setSiteConfig={setSiteConfig}
        gallery={gallery}
        setGallery={setGallery}
        services={services}
        setServices={setServices}
        premiumSolutions={premiumSolutions}
        setPremiumSolutions={setPremiumSolutions}
        customerRecords={customerRecords}
        setCustomerRecords={setCustomerRecords}
        initialTab={dashboardInitialTab}
        maintenancePreFill={dashboardMaintenancePreFill}
        isSelectingHeroVideo={isSelectingHeroVideo}
        setIsSelectingHeroVideo={setIsSelectingHeroVideo}
        isSelectingAiVideo={isSelectingAiVideo}
        setIsSelectingAiVideo={setIsSelectingAiVideo}
        aiVideoHistory={aiVideoHistory}
        setAiVideoHistory={setAiVideoHistory}
        setIsEditMode={setIsEditMode}
        isDesignAuthenticated={isDesignAuthenticated}
        setIsDesignAuthenticated={setIsDesignAuthenticated}
        designPasswordInput={designPasswordInput}
        setDesignPasswordInput={setDesignPasswordInput}
        showDesignLock={showDesignLock}
        setShowDesignLock={setShowDesignLock}
        handleDesignLogin={handleDesignLogin}
        trackingData={trackingData}
        setTrackingData={setTrackingData}
        reviews={reviews}
        setReviews={setReviews}
        inventory={inventory}
        setInventory={setInventory}
        eCertificates={eCertificates}
        setECertificates={setECertificates}
        expenses={expenses}
        setExpenses={setExpenses}
        t={t}
      />

      {/* Video Picker Modal */}
      <AnimatePresence>
        {(isSelectingHeroVideo || isSelectingAiVideo) && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[300] flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-900 border border-white/10 rounded-[32px] w-full max-w-4xl max-h-[80vh] overflow-hidden flex flex-col shadow-2xl"
            >
              <div className="p-6 border-b border-white/5 flex justify-between items-center">
                <h3 className="text-xl font-black text-white uppercase tracking-tighter">{t('select_video_from_gallery')}</h3>
                <button onClick={() => { setIsSelectingHeroVideo(false); setIsSelectingAiVideo(false); }} className="text-slate-500 hover:text-white transition-colors">✕</button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                {gallery.filter(img => img.type === 'video').length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {gallery.filter(img => img.type === 'video').map(video => (
                      <div 
                        key={video.id} 
                        onClick={() => {
                          if (isSelectingHeroVideo) setSiteConfig(prev => ({ ...prev, heroVideoUrl: video.url }));
                          if (isSelectingAiVideo) setSiteConfig(prev => ({ ...prev, aiVideoUrl: video.url }));
                          setIsSelectingHeroVideo(false);
                          setIsSelectingAiVideo(false);
                        }}
                        className="group cursor-pointer bg-slate-950 rounded-2xl overflow-hidden border border-white/5 hover:border-blue-500 transition-all relative aspect-video"
                      >
                        <video src={video.url} className="w-full h-full object-cover" muted playsInline />
                        <div className="absolute inset-0 bg-blue-600/20 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                          <span className="bg-blue-600 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase shadow-xl">{t('select_video')}</span>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                          <p className="text-[10px] text-white font-bold truncate">{video.title}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <span className="text-4xl mb-4">🎬</span>
                    <p className="text-slate-400 font-bold">{t('no_videos_in_gallery')}</p>
                    <p className="text-slate-600 text-xs mt-2">{t('please_upload_video_first')}</p>
                    <button 
                      onClick={() => {
                        setDashboardInitialTab('gallery');
                        setIsDashboardOpen(true);
                        setIsSelectingHeroVideo(false);
                        setIsSelectingAiVideo(false);
                      }}
                      className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-xl text-[10px] font-black uppercase hover:bg-blue-500 transition-all"
                    >
                      {t('go_to_gallery')}
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/services/:id" element={<HomePage />} />
      <Route path="/news/:id" element={<HomePage />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
  </Router>
);

export default App;
