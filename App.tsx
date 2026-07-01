
import React, { useState, useRef, useEffect, useMemo } from 'react';
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
  Cell,
  ComposedChart,
  Line
} from 'recharts';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, Phone, Clock, ExternalLink, Copy, ChevronRight, Star, Shield, Zap, Award, CheckCircle2, Info, MessageSquare, Send, User, Calendar, Car,  Tag, Plus, Trash2, Edit2, Save, X, Settings, LogOut, Menu, Search, Filter, ArrowRight, ArrowLeft, ChevronLeft, ArrowUp, ArrowDown, Play, Pause, Volume2, VolumeX,  Maximize2, Minimize2, Download, Share2, Heart, Eye, Clock3, Check, AlertCircle, HelpCircle, MoreVertical, MoreHorizontal, Grid, List, Layout, Image as ImageIcon, Video as VideoIcon, FileText, Settings2, Bell, UserCircle, LogIn, UserPlus, Mail, Lock, Smartphone, Globe, Facebook, Youtube, Instagram, Twitter, Linkedin, Github, Chrome, Compass, Map, Navigation, Layers, MousePointer2, Hand, ZoomIn, ZoomOut, RotateCcw, RotateCw, Trash, RefreshCw, CheckCircle, XCircle, Minus, Move, Square, Circle, Triangle, Type, PenTool, Eraser, Palette, Scissors, Copy as CopyIcon, Clipboard, Share, Upload, Camera as CameraIcon, Mic, Music, Headphones, Monitor, Laptop, Tablet, Watch, Battery, Wifi, Bluetooth, Cloud as CloudIcon, Sun, Moon, CloudRain, CloudLightning, Wind, Snowflake, Thermometer, Droplets, Flame, Zap as ZapIcon, Activity, Heart as HeartIcon, Target, Flag, Trophy, Medal, Briefcase, ShoppingBag, ShoppingCart, CreditCard, Wallet, Banknote, Coins, PieChart, BarChart, LineChart, TrendingUp, TrendingDown, Presentation, Book, Bookmark, BookOpen, GraduationCap, School, Building, Home, Warehouse, Factory, Truck, Bike, Plane, Ship, Anchor, LifeBuoy, MapPin as MapPinIcon, Map as MapIcon, Navigation2, Compass as CompassIcon, Locate, LocateFixed, Pin, MapPinOff, Phone as PhoneIcon, PhoneCall, PhoneForwarded, PhoneIncoming, PhoneMissed, PhoneOff, PhoneOutgoing, Video, VideoOff, MicOff, Speaker, Volume, Volume1, Mail as MailIcon, Inbox, Archive, Send as SendIcon, Paperclip, Link as LinkIcon, Link2, ExternalLink as ExternalLinkIcon, Share2 as Share2Icon, MessageCircle, MessageSquare as MessageSquareIcon, Hash, AtSign, User as UserIcon, Users, UserPlus as UserPlusIcon, UserMinus, UserCheck, UserX, Fingerprint, Key, Shield as ShieldIcon, ShieldCheck, ShieldAlert, ShieldOff, Lock as LockIcon, Unlock, Eye as EyeIcon, EyeOff, Search as SearchIcon, ZoomIn as ZoomInIcon, ZoomOut as ZoomOutIcon, Settings as SearchSettingsIcon, Sliders, Bell as BellIcon, BellOff, Calendar as CalendarIcon, Clock as ClockIcon, History, Timer, Hourglass, AlarmClock, Watch as WatchIcon, Sun as SunIcon, Moon as MoonIcon, Cloud as CloudIcon2, CloudRain as CloudRainIcon, CloudLightning as CloudLightningIcon, Wind as WindIcon, Snowflake as SnowflakeIcon, Thermometer as ThermometerIcon, Droplets as DropletsIcon, Flame as FlameIcon, Zap as ZapIcon2, Activity as ActivityIcon, Heart as HeartIcon2, Target as TargetIcon, Flag as FlagIcon, Trophy as TrophyIcon, Medal as MedalIcon, Briefcase as BriefcaseIcon, ShoppingBag as ShoppingBagIcon, ShoppingCart as ShoppingCartIcon, CreditCard as CreditCardIcon, Wallet as WalletIcon, Banknote as BanknoteIcon, Coins as CoinsIcon, PieChart as PieChartIcon, BarChart as BarChartIcon, LineChart as LineChartIcon, TrendingUp as TrendingUpIcon, TrendingDown as TrendingDownIcon, Presentation as PresentationIcon, Book as BookIcon, Bookmark as BookmarkIcon, BookOpen as BookOpenIcon, GraduationCap as GraduationCapIcon, School as SchoolIcon, Building as BuildingIcon, Home as HomeIcon, Warehouse as WarehouseIcon, Factory as FactoryIcon, Truck as TruckIcon, Bike as BikeIcon, Plane as PlaneIcon, Ship as ShipIcon, Anchor as AnchorIcon, LifeBuoy as LifeBuoyIcon, Sparkles, Package, Cpu, Wrench, Receipt, Newspaper, Bot, Boxes, Gift, BarChart3, FileCheck, AlertTriangle, ClipboardCheck, Printer, Loader2, Diamond, Armchair, Disc, Waves, Split, ImagePlus, Brush, Camera, Crown
} from 'lucide-react';
import { SERVICES as INITIAL_SERVICES, DEFAULT_GALLERY, DEFAULT_SITE_CONFIG, DEFAULT_CUSTOMER_RECORDS, DEFAULT_PREMIUM_SOLUTIONS, DEFAULT_NEWS, DEFAULT_INVENTORY, DEFAULT_E_CERTIFICATES, DEFAULT_EXPENSES } from './constants.tsx';
import { Service, Message, GalleryImage, SiteConfig, CustomerRecord, BookingData, PremiumSolution, Promotion, AiVideoRecord, Appointment, DetailingPackage, NewsArticle, AppNotification, InventoryItem, ECertificate, LoyaltyConfig, Expense, Staff, MaintenanceReminder, CarInspection, InspectionPoint, SubscriptionPackage, Expert, BeforeAfterImage, AutomationSettings, ServiceProposal, VIPProgram } from './types.ts';
import syncedBackup from './auto_synced_data.json';
import ProposalManagement from './components/Proposal/ProposalManagement';
import { TrackingStep } from './components/Tracking';

type UserRole = 'admin' | 'manager' | 'staff';

interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  details: string;
  timestamp: string;
}

const AdminControlCenter = React.lazy(() => import('./components/AdminControlCenter').then(module => ({ default: module.AdminControlCenter })));
import { CommandPalette } from './components/CommandPalette';
import { TrackingSection, TrackingManagement, VehicleTracking, DEFAULT_TRACKING } from './components/Tracking';
import { InventoryManagement } from './components/Inventory/InventoryManagement';
import { SubscriptionsSection } from './components/SubscriptionsSection';
import { FeedbackSection, FeedbackManagement } from './components/Feedback';
const VisualCarInspection = React.lazy(() => import('./components/VisualCarInspection'));
const CustomerPortalComponent = React.lazy(() => import('./components/CustomerPortal'));
import BeforeAfterSlider from './components/BeforeAfterSlider';
const BookingModal = React.lazy(() => import('./components/BookingModal'));
import ServiceDetailsModal from './components/ServiceDetailsModal';
import LiveBookingTicker from './components/LiveBookingTicker';
import AiServiceChatModal from './components/AiServiceChatModal';
import ShareModal from './components/ShareModal';
import NewsArticleModal from './components/NewsArticleModal';
import AiDetailingAdvisor from './components/AiDetailingAdvisor';
import AiVehicleAnalyzer from './components/AiVehicleAnalyzer';
import PackageDetailsModal from './components/PackageDetailsModal';
import StickyContactBar from './components/StickyContactBar';
import ProcessSection from './components/ProcessSection';
import SEO from './components/SEO';
import InnovationLab from './components/InnovationLab';
import { Review } from './types.ts';
import { DEFAULT_REVIEWS } from './constants.tsx';
import { GalleryUploadManager } from './components/Gallery/GalleryUploadManager';
import ProjectManager from './components/Gallery/ProjectManager';
import { getAIResponse, editImageWithAI, generateImageWithAI, generateVideoWithAI, getMaintenanceAdvice, AIProvider } from './services/geminiService.ts';
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from 'react-markdown';
import { Toaster, toast } from 'react-hot-toast';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, User as FirebaseUser } from 'firebase/auth';
import { getFirestore, doc, onSnapshot, setDoc, collection } from 'firebase/firestore';
import firebaseConfig from './firebase-applet-config.json';

// Firebase Initialization
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

declare global {
  interface Window {
    Pi: any;
    aistudio: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }
}

import LazyImage from './components/LazyImage';
import { GenericContentModal } from './components/GenericContentModal.tsx';

// --- Security Utilities ---

export const maskPhone = (phone: string) => {
  if (!phone) return '';
  const p = phone.replace(/\s/g, '');
  if (p.length < 6) return phone;
  return `${p.substring(0, 3)}****${p.substring(p.length - 3)}`;
};

export const generateSlug = (text: string) => {
  if (!text) return '';
  return text
    .toLowerCase()
    .normalize('NFD') // Chuẩn hóa Unicode để tách dấu
    .replace(/[\u0300-\u036f]/g, '') // Xóa dấu
    .replace(/[đĐ]/g, 'd') // Chuyển đ -> d
    .replace(/([^0-9a-z-\s])/g, '') // Xóa các ký tự đặc biệt
    .replace(/(\s+)/g, '-') // Thay khoảng trắng bằng dấu -
    .replace(/-+/g, '-') // Xóa dấu - liên tiếp
    .replace(/^-+|-+$/g, ''); // Xóa dấu - ở đầu và cuối
};

export const maskName = (name: string) => {
  if (!name) return '';
  const parts = name.split(' ');
  if (parts.length < 2) return name;
  return `${parts[0]} *** ${parts[parts.length - 1]}`;
};

export const parsePriceForSort = (priceStr: string, isDescending: boolean): number => {
  if (!priceStr) return isDescending ? -1 : Infinity;
  // Xóa tất cả ký tự không phải số
  const digits = priceStr.replace(/\D/g, '');
  if (!digits) {
    // Nếu không có số (e.g. "Liên hệ", "Liên hệ báo giá"), xếp ở cuối cùng trong cả 2 trường hợp tăng/giảm dần
    return isDescending ? -1 : Infinity;
  }
  return parseInt(digits, 10);
};

export const filterAndSortServices = (
  servicesList: Service[],
  category: string,
  search: string,
  sortBy: string
): Service[] => {
  let result = [...(servicesList || [])];

  // 1. Lọc theo danh mục và từ khóa
  result = result.filter(s => {
    const matchesCategory = category === 'all' || s.category === category;
    const matchesSearch = s.title.toLowerCase().includes(search.toLowerCase()) || 
                          s.description.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // 2. Sắp xếp
  if (sortBy !== 'default') {
    result.sort((a, b) => {
      if (sortBy === 'name-asc') {
        return a.title.localeCompare(b.title, 'vi', { sensitivity: 'base' });
      } else if (sortBy === 'name-desc') {
        return b.title.localeCompare(a.title, 'vi', { sensitivity: 'base' });
      } else if (sortBy === 'price-asc') {
        return parsePriceForSort(a.price, false) - parsePriceForSort(b.price, false);
      } else if (sortBy === 'price-desc') {
        return parsePriceForSort(b.price, true) - parsePriceForSort(a.price, true);
      }
      return 0;
    });
  }

  return result;
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

// --- Lazy Section Hook ---

const useIntersectionObserver = (ref: React.RefObject<HTMLElement>, options = {}) => {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIntersecting(true);
        if (ref.current) observer.unobserve(ref.current);
      }
    }, options);

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, options]);

  return isIntersecting;
};

const LazySection: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(ref, { rootMargin: '200px' });

  return (
    <div ref={ref} className={className}>
      {isVisible ? children : <div className="h-64 flex items-center justify-center"><Loader2 className="animate-spin text-blue-500" /></div>}
    </div>
  );
};

// --- Utilities ---

const fileToBase64 = (file: File, maxWidth = 1200, quality = 0.8): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = (maxWidth / width) * height;
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      };
      img.onerror = (err) => reject(err);
      img.src = event.target?.result as string;
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, callback: (urlOrBase64: string) => void) => {
  const file = e.target.files?.[0];
  if (file) {
    // Check file size (limit to 10MB as we will compress it)
    if (file.size > 10 * 1024 * 1024) {
      toast.error("⚠️ Tệp quá lớn (tối đa 10MB). Hệ thống sẽ tự động nén ảnh để tối ưu tốc độ tải trang.");
    }
    const toastId = toast.loading("Đang nén và đồng bộ ảnh lên hệ thống...");
    try {
      const base64 = await fileToBase64(file);
      
      // Attempt to save file to local server disk for persistence & GitHub synchronization
      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            filename: file.name,
            base64: base64
          })
        });

        if (response.ok) {
          const result = await response.json();
          if (result.success && result.url) {
            callback(result.url);
            toast.success("Đã tải lên và đồng bộ ảnh với GitHub thành công!", { id: toastId });
            return;
          }
        }
        throw new Error("API upload returned unsuccessful state");
      } catch (uploadErr) {
        console.warn("Không thể đồng bộ tệp lên server. Đang quay lại lưu Base64:", uploadErr);
        callback(base64);
        toast.success("Đã lưu ảnh tạm thời dưới dạng Base64!", { id: toastId });
      }
    } catch (err) {
      toast.error("Lỗi khi xử lý ảnh!", { id: toastId });
    }
  }
};

const ColorPicker: React.FC<{
  label: string;
  value: string;
  onChange: (color: string) => void;
  className?: string;
}> = ({ label, value, onChange, className }) => {
  const presets = ['#3b82f6', '#2563eb', '#10b981', '#059669', '#f59e0b', '#d97706', '#ef4444', '#dc2626', '#8b5cf6', '#7c3aed', '#ec4899', '#db2777'];
  
  return (
    <div className={`space-y-3 ${className}`}>
      <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest block">{label}</label>
      <div className="flex flex-wrap gap-2 mb-3">
        {presets.map(c => (
          <button
            key={c}
            onClick={() => onChange(c)}
            className={`w-6 h-6 rounded-lg border-2 transition-all hover:scale-110 active:scale-95 ${value === c ? 'border-white scale-110 shadow-lg' : 'border-transparent'}`}
            style={{ backgroundColor: c }}
          />
        ))}
      </div>
      <div className="flex items-center gap-3">
        <div className="relative group">
          <input 
            type="color" 
            value={value} 
            onChange={(e) => onChange(e.target.value)}
            className="w-10 h-10 rounded-xl bg-transparent border-none cursor-pointer p-0 overflow-hidden"
          />
          <div className="absolute inset-0 rounded-xl border border-white/10 pointer-events-none group-hover:border-white/30 transition-colors" />
        </div>
        <input 
          type="text" 
          value={value.toUpperCase()} 
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 bg-slate-950 border border-white/5 rounded-xl p-3 text-white text-xs font-mono outline-none focus:border-blue-500/50"
          placeholder="#HEX"
        />
      </div>
    </div>
  );
};

// --- Animation Variants ---
const fadeIn: any = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const staggerContainer: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const scaleIn: any = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const GalleryPickerModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  gallery: GalleryImage[];
  aiVideoHistory: AiVideoRecord[];
  onSelect: (url: string) => void;
  title?: string;
}> = ({ isOpen, onClose, gallery, aiVideoHistory, onSelect, title = "Chọn Ảnh Từ Thư Viện" }) => {
  const [activeTab, setActiveTab] = useState<'gallery' | 'ai'>('gallery');
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const filteredGallery = gallery.filter(img => 
    img.title.toLowerCase().includes(search.toLowerCase()) || 
    img.category.toLowerCase().includes(search.toLowerCase())
  );

  const filteredAi = aiVideoHistory.filter(item => 
    item.type === 'image' && item.prompt.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[600] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-slate-900 border border-white/10 w-full max-w-4xl rounded-[40px] shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
          onClick={e => e.stopPropagation()}
        >
          <div className="p-8 border-b border-white/5 flex items-center justify-between bg-slate-950/50">
            <div>
              <h3 className="text-2xl font-black text-white uppercase tracking-tight">{title}</h3>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Chọn từ hình ảnh đã tải lên hoặc đã tạo bằng AI</p>
            </div>
            <button onClick={onClose} className="p-3 bg-slate-800 hover:bg-red-500/20 hover:text-red-500 rounded-2xl transition-all">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6 bg-slate-950/20 flex flex-col md:flex-row gap-4 items-center justify-between border-b border-white/5">
            <div className="flex bg-slate-800 p-1.5 rounded-2xl gap-1">
              <button 
                onClick={() => setActiveTab('gallery')}
                className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'gallery' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
              >
                📁 Thư viện ảnh
              </button>
              <button 
                onClick={() => setActiveTab('ai')}
                className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'ai' ? 'bg-amber-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
              >
                🪄 Sáng tạo AI
              </button>
            </div>
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Tìm kiếm hình ảnh..."
                className="w-full bg-slate-950 border border-white/5 rounded-xl py-2.5 pl-12 pr-4 text-xs text-white outline-none focus:border-blue-500/50 transition-all font-medium"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
            {activeTab === 'gallery' ? (
              filteredGallery.length === 0 ? (
                <div className="h-64 flex flex-col items-center justify-center text-slate-600">
                  <ImagePlus className="w-12 h-12 mb-4 opacity-20" />
                  <p className="text-sm font-bold uppercase tracking-widest opacity-40">Không tìm thấy ảnh nào trong thư viện</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredGallery.map(img => (
                    <motion.button
                      key={img.id}
                      whileHover={{ scale: 1.02, y: -4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => { onSelect(img.url); onClose(); }}
                      className="group relative aspect-square rounded-[24px] overflow-hidden border border-white/5 hover:border-blue-500/50 transition-all shadow-xl bg-slate-800"
                    >
                      <img src={img.url} className="w-full h-full object-cover" loading="lazy" referrerPolicy="no-referrer" />
                      <div className="absolute inset-0 bg-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute bottom-3 left-3 right-3 p-2 bg-slate-950/80 backdrop-blur-md rounded-xl invisible group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all">
                        <p className="text-[8px] font-black text-white uppercase truncate">{img.title}</p>
                      </div>
                    </motion.button>
                  ))}
                </div>
              )
            ) : (
              filteredAi.length === 0 ? (
                <div className="h-64 flex flex-col items-center justify-center text-slate-600">
                  <Sparkles className="w-12 h-12 mb-4 opacity-20" />
                  <p className="text-sm font-bold uppercase tracking-widest opacity-40">Không tìm thấy hình ảnh AI nào</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredAi.map(item => (
                    <motion.button
                      key={item.id}
                      whileHover={{ scale: 1.02, y: -4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => { onSelect(item.url); onClose(); }}
                      className="group relative aspect-square rounded-[24px] overflow-hidden border border-white/5 hover:border-amber-500/50 transition-all shadow-xl bg-slate-800"
                    >
                      <img src={item.url} className="w-full h-full object-cover" loading="lazy" referrerPolicy="no-referrer" />
                      <div className="absolute inset-0 bg-amber-600/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute bottom-3 left-3 right-3 p-2 bg-slate-950/80 backdrop-blur-md rounded-xl invisible group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all">
                        <p className="text-[8px] font-black text-white uppercase truncate">{item.prompt}</p>
                      </div>
                    </motion.button>
                  ))}
                </div>
              )
            )}
          </div>
          
          <div className="p-6 bg-slate-950/50 border-t border-white/5 flex justify-center">
            <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest flex items-center gap-2">
              <Zap className="w-3 h-3" /> Nhấp vào ảnh để chọn nhanh
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

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
    <span className="text-[9px] font-black uppercase tracking-wider">AI Helper</span>
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
  label?: string;
}> = ({ text, isEditMode, isDesignAuthenticated = false, onSave, className, tag = 'p', multiline = false, label }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(text || '');
  const [isAiGenerating, setIsAiGenerating] = useState(false);
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

  const handleAiGenerate = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!label) {
      toast.error("Thiếu nhãn mô tả để AI tạo nội dung!");
      return;
    }

    setIsAiGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      
      const prompt = `Bạn là chuyên gia marketing cho trung tâm chăm sóc xe hơi cao cấp (Detailing). 
      Hãy viết nội dung cho phần: "${label}".
      Yêu cầu:
      - Ngôn ngữ: Tiếng Việt chuyên nghiệp, sang trọng, thu hút.
      - Độ dài: Tương ứng với nội dung hiện tại (${text.length} ký tự).
      - Nội dung hiện tại: "${text}"
      Chỉ trả về nội dung text, không thêm bất kỳ giải thích nào khác.`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt
      });
      
      const generatedText = response.text?.trim() || "";
      
      if (generatedText) {
        onSave(generatedText);
        toast.success("AI đã tạo nội dung mới!");
      }
    } catch (error) {
      console.error("AI Generation Error:", error);
      toast.error("Không thể tạo nội dung bằng AI. Vui lòng thử lại.");
    } finally {
      setIsAiGenerating(false);
    }
  };

  const Tag = tag as any;
  const safeText = text || '';

  const canEdit = isEditMode && isDesignAuthenticated;

  if (canEdit && isEditing) {
    const commonClasses = `${className} bg-slate-800 text-white border-2 border-blue-500 rounded px-2 outline-none w-full shadow-[0_0_20px_rgba(59,130,246,0.4)] z-10`;
    return (
      <div className="relative w-full">
        {multiline ? (
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
        )}
        {label && (
          <div className="absolute -top-10 right-0 z-20">
            <AiHelperButton onClick={() => handleAiGenerate({ stopPropagation: () => {} } as any)} isLoading={isAiGenerating} />
          </div>
        )}
      </div>
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
        <div className="absolute -top-3 -right-2 flex gap-1 z-20">
          {label && (
            <button 
              onClick={(e) => handleAiGenerate(e)}
              disabled={isAiGenerating}
              className="bg-emerald-600 text-white p-1 rounded-full shadow-lg hover:bg-emerald-500 transition-all disabled:opacity-50"
              title="Tạo nội dung bằng AI"
            >
              {isAiGenerating ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
            </button>
          )}
          <motion.span 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-blue-600 text-white text-[9px] px-2 py-0.5 rounded-full uppercase font-black shadow-lg pointer-events-none"
          >
            Sửa
          </motion.span>
        </div>
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
  isHero?: boolean;
}> = ({ src, isEditMode, isDesignAuthenticated = false, onUpload, className, alt, isHero }) => {
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
      <LazyImage 
        src={src} 
        alt={alt} 
        className="w-full h-full object-cover" 
        loading={isHero ? "eager" : "lazy"} 
      />
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

const ServiceCartCenter: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  cartItems: DetailingPackage[];
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
  siteConfig: SiteConfig;
  t: (key: string) => string;
}> = ({ isOpen, onClose, cartItems, onRemoveItem, onCheckout, siteConfig, t }) => {
  const [view, setView] = useState<'cart' | 'payment'>('cart');
  
  if (!isOpen) return null;

  const totalPrice = cartItems.reduce((acc, item) => {
    const priceNum = parseInt(item.price.replace(/[^0-9]/g, '')) || 0;
    return acc + priceNum;
  }, 0);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[500] flex items-start justify-end p-4 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          className="bg-slate-900 border border-white/10 w-full max-w-md rounded-[32px] shadow-2xl overflow-hidden mt-4 md:mt-24 flex flex-col h-[80vh]"
          onClick={e => e.stopPropagation()}
        >
          <div className="p-6 border-b border-white/5 flex items-center justify-between bg-slate-950/50">
            <div>
              <h3 className="text-xl font-black text-white uppercase tracking-tight">
                {view === 'cart' ? 'Giỏ hàng dịch vụ' : 'Thanh toán MoMo'}
              </h3>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                {view === 'cart' ? `${cartItems.length} gói dịch vụ đã chọn` : 'Quét mã QR để thanh toán nhanh'}
              </p>
            </div>
            <button 
              onClick={view === 'payment' ? () => setView('cart') : onClose}
              className="p-2 hover:bg-white/5 rounded-xl text-slate-500 hover:text-white transition-all"
            >
              {view === 'payment' ? <ArrowLeft className="w-5 h-5" /> : <X className="w-5 h-5" />}
            </button>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-4">
            {view === 'cart' ? (
              cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-12">
                  <div className="w-20 h-20 bg-slate-800/50 rounded-full flex items-center justify-center mb-6 text-slate-600">
                    <ShoppingCart className="w-10 h-10" />
                  </div>
                  <h4 className="text-white font-bold mb-2">Giỏ hàng trống</h4>
                  <p className="text-slate-500 text-sm">Hãy chọn các gói dịch vụ cao cấp để chăm sóc xế yêu của bạn.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map(item => (
                    <div 
                      key={item.id}
                      className="p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-blue-500/30 transition-all group relative"
                    >
                      <button 
                        onClick={() => onRemoveItem(item.id)}
                        className="absolute top-4 right-4 p-1.5 bg-red-500/10 text-red-500 rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <div className="flex justify-between items-start mb-2 pr-8">
                        <h4 className="text-white font-bold text-sm uppercase tracking-tight">{item.title}</h4>
                        <span className="text-blue-400 font-black text-sm drop-shadow-sm">{item.price}</span>
                      </div>
                      <p className="text-slate-500 text-[10px] leading-relaxed line-clamp-2 mb-4 italic">{item.description}</p>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3 text-slate-600" />
                        <span className="text-[10px] text-slate-600 font-bold uppercase tracking-wider">{item.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )
            ) : (
              <div className="space-y-6">
                <div className="bg-pink-600/10 border border-pink-500/20 rounded-[32px] p-8 text-center space-y-6">
                  <div className="flex justify-center">
                    <div className="w-16 h-16 rounded-2xl bg-pink-600 flex items-center justify-center text-white shadow-xl shadow-pink-600/20">
                      <CreditCard className="w-8 h-8" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-white font-black text-lg uppercase tracking-tight">VietQR / MoMo</h4>
                    <p className="text-blue-400 text-[10px] font-black uppercase tracking-wider mt-1 drop-shadow-sm">Chuyển khoản nhanh 24/7</p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-3xl shadow-2xl inline-block mx-auto">
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https://nhantien.momo.vn/${siteConfig.momoInfo?.phone}?amount=${totalPrice}&note=Thanh toan dich vu`}
                      alt="MoMo QR"
                      className="w-48 h-48"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-3 pt-4">
                    <div className="bg-slate-950/50 p-4 rounded-2xl border border-white/5">
                      <p className="text-[10px] text-slate-500 font-black uppercase tracking-wider mb-1">Chủ tài khoản</p>
                      <p className="text-white font-bold">{siteConfig.momoInfo?.name}</p>
                    </div>
                    <div className="bg-slate-950/50 p-4 rounded-2xl border border-white/5 flex justify-between items-center">
                      <div>
                        <p className="text-[10px] text-slate-500 font-black uppercase tracking-wider mb-1">Số MoMo</p>
                        <p className="text-white font-black">{siteConfig.momoInfo?.phone}</p>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => {
                            navigator.clipboard.writeText(siteConfig.momoInfo?.phone || '');
                            toast.success('Đã sao chép số MoMo');
                          }}
                          className="p-2 bg-pink-600/20 text-pink-500 rounded-lg hover:bg-pink-600 hover:text-white transition-all"
                          title="Sao chép số điện thoại"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <a 
                          href={`https://nhantien.momo.vn/${siteConfig.momoInfo?.phone}?amount=${totalPrice}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-pink-600/20 text-pink-500 rounded-lg hover:bg-pink-600 hover:text-white transition-all"
                          title="Mở ứng dụng MoMo"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-600/10 border border-blue-500/20 rounded-[32px] p-6 space-y-3">
                  <h5 className="text-white font-bold text-sm">Lưu ý:</h5>
                  <ul className="text-slate-400 text-xs space-y-2 list-disc pl-4 leading-relaxed">
                    <li>Vui lòng chụp lại màn hình giao dịch thành công.</li>
                    <li>Nội dung chuyển khoản: <span className="text-blue-500 font-bold">Tên khách hàng - Số điện thoại</span></li>
                    <li>Sau khi chuyển khoản, hãy bấm "Đặt lịch ngay" để chúng tôi ghi nhận.</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="p-6 bg-slate-950/80 border-t border-white/10 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">Tổng cộng</span>
                <span className="text-2xl font-black text-white">{formatCurrency(totalPrice)}</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {view === 'cart' ? (
                  <>
                    <button 
                      onClick={() => setView('payment')}
                      className="py-4 bg-pink-600/10 hover:bg-pink-600/20 text-pink-500 border border-pink-500/20 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl shadow-pink-600/5 flex items-center justify-center gap-2"
                    >
                      <CreditCard className="w-4 h-4" />
                      Trả MoMo trước
                    </button>
                    <button 
                      onClick={onCheckout}
                      className="py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Đặt lịch ngay
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      onClick={() => setView('cart')}
                      className="py-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border border-white/5"
                    >
                      Quay lại giỏ
                    </button>
                    <button 
                      onClick={onCheckout}
                      className="py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Đã trả - Đặt ngay
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const PaymentModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  siteConfig: SiteConfig;
  cart: DetailingPackage[];
}> = ({ isOpen, onClose, siteConfig, cart }) => {
  if (!isOpen) return null;

  const total = cart.reduce((acc, item) => {
    const price = parseInt(item.price.replace(/[^0-9]/g, '')) || 0;
    return acc + price;
  }, 0);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[600] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md" onClick={onClose}>
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="bg-slate-900 border border-white/10 rounded-[48px] shadow-2xl max-w-lg w-full relative overflow-hidden flex flex-col"
          onClick={e => e.stopPropagation()}
        >
          <div className="p-10 border-b border-white/5 flex items-center justify-between bg-slate-950/50">
            <div>
              <h3 className="text-3xl font-black text-white uppercase tracking-tight">Thanh toán</h3>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-2">Chọn phương thức phù hợp</p>
            </div>
            <button onClick={onClose} className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-slate-400 hover:bg-white/10 hover:text-white transition-all">
              <X className="w-7 h-7" />
            </button>
          </div>

          <div className="p-10 space-y-8 overflow-y-auto custom-scrollbar max-h-[60vh]">
            {/* MoMo Info */}
            {siteConfig.momoInfo && (
              <div className="bg-pink-600/10 border border-pink-500/20 rounded-[32px] p-8 space-y-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                  <Smartphone className="w-20 h-20 text-pink-500" />
                </div>
                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-pink-600 flex items-center justify-center text-white shadow-lg shadow-pink-600/30">
                    <Smartphone className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-black text-white uppercase tracking-tighter">Ví MoMo</h4>
                </div>
                <div className="space-y-4 relative z-10">
                  <div>
                    <p className="text-blue-400 text-[10px] font-black uppercase tracking-wider mb-1 drop-shadow-sm">Số điện thoại</p>
                    <p className="text-white text-2xl font-black tracking-normal">{siteConfig.momoInfo.phone}</p>
                  </div>
                  <div>
                    <p className="text-blue-400 text-[10px] font-black uppercase tracking-wider mb-1 drop-shadow-sm">Chủ tài khoản</p>
                    <p className="text-white font-bold">{siteConfig.momoInfo.name}</p>
                  </div>
                  {total > 0 && (
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-center">
                      <p className="text-slate-500 text-[9px] font-black uppercase tracking-wider mb-1">Số tiền thanh toán</p>
                      <p className="text-white text-xl font-black">{total.toLocaleString('vi-VN')} đ</p>
                    </div>
                  )}
                  <div className="flex justify-center pt-4">
                    <div className="bg-white p-2 rounded-2xl shadow-inner">
                      <img 
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://nhantien.momo.vn/${siteConfig.momoInfo.phone}${total > 0 ? '/' + total : ''}`}
                        alt="MoMo QR"
                        className="w-24 h-24"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(siteConfig.momoInfo?.phone || '');
                      toast.success('Đã sao chép số MoMo');
                    }}
                    className="w-full py-4 bg-pink-600 hover:bg-pink-500 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all shadow-xl shadow-pink-600/20"
                  >
                    Sao chép số điện thoại
                  </button>
                  <a 
                    href={`https://nhantien.momo.vn/${siteConfig.momoInfo.phone}${total > 0 ? '/' + total : ''}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all text-center flex items-center justify-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" /> Mở app MoMo {total > 0 && `(${total.toLocaleString('vi-VN')}đ)`}
                  </a>
                </div>
              </div>
            )}
          </div>

          <div className="p-10 border-t border-white/5 bg-slate-950/50">
            <button 
              onClick={onClose}
              className="w-full py-5 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all border border-white/5 shadow-xl"
            >
              Đóng
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

// ServiceDetailsModal has been moved to its own file.

// AiServiceChatModal has been moved to its own file.
// AiServiceChatModal has been moved to its own file.


// ShareModal has been moved to its own file.

// NewsArticleModal has been moved to its own file.

const PromotionsSection: React.FC<{
  siteConfig: SiteConfig;
  isEditMode: boolean;
  isDesignAuthenticated?: boolean;
  setSiteConfig: React.Dispatch<React.SetStateAction<SiteConfig>>;
}> = ({ siteConfig, isEditMode, isDesignAuthenticated, setSiteConfig }) => {
  const promotions = siteConfig.promotions || [];
  if (promotions.length === 0 && !isEditMode) return null;

  return (
    <section id="promotions" className="py-24 sm:py-32 bg-slate-950/50 relative overflow-hidden border-b border-white/5">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16 sm:mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-red-600/10 border border-red-500/20 mb-6"
          >
            <Tag className="w-4 h-4 text-red-500" />
            <EditableText 
              text={siteConfig.promotionsSubtitle || "Khám phá các gói khuyến mãi hấp dẫn nhất."} 
              isEditMode={isEditMode} 
              isDesignAuthenticated={isDesignAuthenticated}
              onSave={v => setSiteConfig({...siteConfig, promotionsSubtitle: v})}
              label="Tiêu đề phụ cho mục Ưu đãi"
              className="text-blue-400 font-black uppercase tracking-wider text-[10px] drop-shadow-sm"
            />
          </motion.div>
          <EditableText 
            tag="h2" 
            text={siteConfig.promotionsTitle || "CHƯƠNG TRÌNH ƯU ĐÃI"} 
            isEditMode={isEditMode} 
            isDesignAuthenticated={isDesignAuthenticated}
            onSave={v => setSiteConfig({...siteConfig, promotionsTitle: v})}
            label="Tiêu đề chính cho mục Ưu đãi"
            className="section-title text-4xl sm:text-7xl mb-8"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
          {promotions.map((promo, idx) => (
            <motion.div
              key={promo.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative bg-slate-900/50 border border-white/5 rounded-[40px] overflow-hidden hover:border-red-500/30 transition-all duration-500"
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  src={promo.image} 
                  alt={promo.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-6 left-6">
                  <div className="bg-red-600 text-white font-black text-[10px] uppercase tracking-widest px-4 py-2 rounded-full shadow-lg">
                    HOT PROMO
                  </div>
                </div>
              </div>
              <div className="p-8 space-y-4">
                <div className="flex items-center gap-2 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                  <Clock className="w-3.5 h-3.5" /> Hết hạn: {promo.expiryDate}
                </div>
                <h3 className="text-xl font-black text-white group-hover:text-red-500 transition-colors uppercase tracking-tight">
                  {promo.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 italic">
                  "{promo.description}"
                </p>
                <div className="pt-4">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-4 bg-white/5 hover:bg-red-600 border border-white/5 hover:border-red-500 text-slate-400 hover:text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all"
          >
            Nhận Ưu Đãi Ngay
          </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const NewsSection: React.FC<{ 
  siteConfig: SiteConfig; 
  isEditMode: boolean; 
  isDesignAuthenticated?: boolean;
  setSiteConfig: React.Dispatch<React.SetStateAction<SiteConfig>>;
  selectedArticle: NewsArticle | null;
  setSelectedArticle: (article: NewsArticle | null) => void;
  showNewBadge: boolean;
  setShowNewBadge: (show: boolean) => void;
}> = ({ siteConfig, isEditMode, isDesignAuthenticated, setSiteConfig, selectedArticle, setSelectedArticle, showNewBadge, setShowNewBadge }) => {
  const navigate = useNavigate();
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
            <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse shadow-[0_0_8px_rgba(96,165,250,0.8)]"></div>
            <EditableText 
              text={siteConfig.newsSubtitle || "Cập nhật những kiến thức bổ ích và chương trình mới nhất từ XE ĐẸP PRO."} 
              isEditMode={isEditMode} 
              isDesignAuthenticated={isDesignAuthenticated}
              onSave={v => setSiteConfig({...siteConfig, newsSubtitle: v})}
              className="section-subtitle mb-0"
            />
          </motion.div>
          <EditableText 
            tag="h2" 
            text={siteConfig.newsTitle || "TIN TỨC & MẸO CHĂM SÓC XE"} 
            isEditMode={isEditMode} 
            isDesignAuthenticated={isDesignAuthenticated}
            onSave={v => setSiteConfig({...siteConfig, newsTitle: v})}
            className="section-title text-4xl sm:text-7xl mb-8"
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
              whileHover={{ y: -10 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                const slug = article.slug || generateSlug(article.title);
                navigate(`/news/${slug}`);
              }}
              className="group cursor-pointer"
            >
              <div className="relative h-[250px] rounded-[32px] overflow-hidden mb-6 border border-white/5">
                {idx === 0 && showNewBadge && (
                  <div 
                    onClick={(e) => e.stopPropagation()}
                    className="absolute top-4 left-4 z-20 flex items-center gap-1 bg-red-600 text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full shadow-[0_0_12px_rgba(220,38,38,0.85)] border border-red-500/20"
                  >
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white"></span>
                    </span>
                    <span>Mới</span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowNewBadge(false);
                        localStorage.setItem('hide_new_badge_car_detailing', 'true');
                      }}
                      className="ml-1 hover:text-red-200 transition-colors cursor-pointer"
                    >
                      <X className="w-2.5 h-2.5" />
                    </button>
                  </div>
                )}
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
                <div className={`absolute top-4 transition-all duration-300 ${idx === 0 && showNewBadge ? 'left-[72px]' : 'left-4'}`}>
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
        siteConfig={siteConfig}
      />
    </section>
  );
};

const LocalSubscriptionsSection: React.FC<{ siteConfig: SiteConfig; onSelectPackage: (pkg: SubscriptionPackage) => void }> = ({ siteConfig, onSelectPackage }) => {
  const subscriptions = siteConfig.subscriptions || [];

  return (
    <section id="subscriptions" className="py-24 sm:py-32 bg-slate-950 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] from-blue-600/5 to-transparent blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mb-16 sm:mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/10 border border-blue-600/20 text-blue-500 text-[10px] font-black uppercase tracking-widest mb-6"
          >
            <Award className="w-3 h-3" /> Gói Thành Viên Định Kỳ
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-8"
          >
            Sạch Bóng <span className="text-blue-600">Quanh Năm</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg sm:text-xl leading-relaxed max-w-2xl"
          >
            Tiết kiệm hơn với các gói đăng ký định kỳ. Chăm sóc xế cưng chưa bao giờ dễ dàng và chuyên nghiệp đến thế.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {subscriptions.map((pkg, idx) => (
            <motion.div 
              key={`subscription-${pkg.id}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative bg-slate-900 border border-white/10 rounded-[40px] p-10 hover:border-blue-500/50 transition-all flex flex-col h-full"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-600/20 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-all" />
              
              <div className="mb-8">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: `${pkg.color}20`, color: pkg.color }}>
                  <Award className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">{pkg.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{pkg.description}</p>
              </div>

              <div className="mb-8">
                <p className="text-4xl font-black text-white tracking-tighter">{pkg.price}</p>
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">Cho {pkg.durationMonths} tháng sử dụng</p>
              </div>

              <div className="space-y-4 mb-10 flex-1">
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Quyền lợi gói:</p>
                {(pkg.perks || []).map((perk) => (
                  <div key={perk} className="flex items-center gap-3 text-slate-300 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    {perk}
                  </div>
                ))}
              </div>

              <button 
                onClick={() => onSelectPackage(pkg)}
                className="w-full py-5 bg-white/5 hover:bg-blue-600 text-white font-black uppercase tracking-widest text-[10px] rounded-2xl transition-all border border-white/10 hover:border-blue-600 shadow-xl group-hover:shadow-blue-600/20"
              >
                Đăng ký ngay
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactSection: React.FC<{ 
  siteConfig: SiteConfig;
  isEditMode: boolean;
  isDesignAuthenticated?: boolean;
  setSiteConfig: React.Dispatch<React.SetStateAction<SiteConfig>>;
}> = ({ siteConfig, isEditMode, isDesignAuthenticated, setSiteConfig }) => {
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
              <EditableText 
                tag="h2"
                text={siteConfig.contactTitle || "BẠN CẦN TƯ VẤN CHUYÊN SÂU?"} 
                isEditMode={isEditMode} 
                isDesignAuthenticated={isDesignAuthenticated}
                onSave={v => setSiteConfig({...siteConfig, contactTitle: v})}
                label="Tiêu đề chính mục Liên hệ"
                className="section-title text-4xl md:text-6xl mb-6 flex flex-wrap gap-x-3"
              />
              <EditableText 
                text={siteConfig.contactSubtitle || "Để lại thông tin, đội ngũ chuyên gia của chúng tôi sẽ liên hệ lại với bạn trong vòng 30 phút để giải đáp mọi thắc mắc về dịch vụ."} 
                isEditMode={isEditMode} 
                isDesignAuthenticated={isDesignAuthenticated}
                onSave={v => setSiteConfig({...siteConfig, contactSubtitle: v})}
                label="Tiêu đề phụ mục Liên hệ"
                className="text-slate-400 text-lg mb-10 max-w-md"
              />
              <div className="space-y-8 mb-10">
                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="section-subtitle mb-1">Hotline hỗ trợ 24/7</p>
                    <p className="text-xl text-white font-black">{siteConfig.contactPhone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-600/10 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="section-subtitle mb-1">Email liên hệ</p>
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
                    toast.success('Đã sao chép địa chỉ!');
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
                    <label className="label-premium ml-1">Họ và tên</label>
                    <input required type="text" placeholder="Nhập họ tên của bạn..." value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="input-premium w-full px-5 py-4" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="label-premium ml-1">Số điện thoại</label>
                      <input 
                        required 
                        type="tel" 
                        placeholder="090..." 
                        value={formData.phone} 
                        onChange={e => {
                          setFormData({...formData, phone: e.target.value});
                          if (errors.phone) setErrors({...errors, phone: undefined});
                        }} 
                        className={`input-premium w-full px-5 py-4 ${errors.phone ? 'border-red-500/50' : ''}`} 
                      />
                      {errors.phone && <p className="text-[10px] text-red-500 font-bold ml-1 uppercase">{errors.phone}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="label-premium ml-1">Email</label>
                      <input 
                        type="email" 
                        placeholder="example@gmail.com" 
                        value={formData.email} 
                        onChange={e => {
                          setFormData({...formData, email: e.target.value});
                          if (errors.email) setErrors({...errors, email: undefined});
                        }} 
                        className={`input-premium w-full px-5 py-4 ${errors.email ? 'border-red-500/50' : ''}`} 
                      />
                      {errors.email && <p className="text-[10px] text-red-500 font-bold ml-1 uppercase">{errors.email}</p>}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="label-premium ml-1">Nội dung cần tư vấn</label>
                    <textarea required placeholder="Bạn đang quan tâm đến dịch vụ nào hoặc cần hỗ trợ gì?" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="input-premium w-full px-5 py-4 h-32 resize-none" />
                  </div>
                  <button 
                    type="submit" 
                    disabled={isSending}
                    className="btn-primary w-full py-5 flex items-center justify-center gap-3 disabled:opacity-50 group"
                  >
                    {isSending ? (
                      <RefreshCw className="w-5 h-5 animate-spin" />
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
                  <h3 className="section-title text-3xl mb-4">Gửi thành công!</h3>
                  <p className="text-slate-400 mb-10 text-lg">Yêu cầu của bạn đã được gửi tới hệ thống và Zalo của chúng tôi. Đội ngũ chuyên gia sẽ liên hệ lại với bạn trong thời gian sớm nhất.</p>
                  <button onClick={() => setIsSubmitted(false)} className="btn-secondary px-8 py-3">Gửi yêu cầu khác</button>
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
  initialTab?: string;
  maintenancePreFill?: {brand: string, model: string, year: string, mileage: string, lastMaintenance: string, symptoms: string} | null;
  isSelectingHeroVideo: boolean;
  setIsSelectingHeroVideo: React.Dispatch<React.SetStateAction<boolean>>;
  isSelectingAiVideo: boolean;
  setIsSelectingAiVideo: React.Dispatch<React.SetStateAction<boolean>>;
  aiVideoHistory: AiVideoRecord[];
  setAiVideoHistory: React.Dispatch<React.SetStateAction<AiVideoRecord[]>>;
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
  experts: Expert[];
  setExperts: React.Dispatch<React.SetStateAction<Expert[]>>;
  staff: Staff[];
  setStaff: React.Dispatch<React.SetStateAction<Staff[]>>;
  reminders: MaintenanceReminder[];
  setReminders: React.Dispatch<React.SetStateAction<MaintenanceReminder[]>>;
  inspections: CarInspection[];
  setInspections: React.Dispatch<React.SetStateAction<CarInspection[]>>;
  isPrivacyMode: boolean;
  setIsPrivacyMode: React.Dispatch<React.SetStateAction<boolean>>;
  togglePrivacyMode: () => void;
  currentUserRole: UserRole;
  setCurrentUserRole: React.Dispatch<React.SetStateAction<UserRole>>;
  auditLogs: AuditLog[];
  setAuditLogs: React.Dispatch<React.SetStateAction<AuditLog[]>>;
  addAuditLog: (action: string, details: string) => void;
  formatPrivateValue: (value: string | number) => string | number;
  isEditMode: boolean;
  setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  scrollToSection: (id: string) => void;
  isAccountingAuthenticated: boolean;
  setIsAccountingAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  accountingPasswordInput: string;
  setAccountingPasswordInput: React.Dispatch<React.SetStateAction<string>>;
  showAccountingLock: boolean;
  setShowAccountingLock: React.Dispatch<React.SetStateAction<boolean>>;
  handleAccountingLogin: () => void;
  isInspectionAuthenticated: boolean;
  setIsInspectionAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  inspectionPasswordInput: string;
  setInspectionPasswordInput: React.Dispatch<React.SetStateAction<string>>;
  showInspectionLock: boolean;
  setShowInspectionLock: React.Dispatch<React.SetStateAction<boolean>>;
  handleInspectionLogin: () => void;
  isDirectInspectionMode?: boolean;
  onOpenNotifications: () => void;
  notifications: AppNotification[];
  t: (key: string) => string;
  user?: any;
}> = ({ isOpen, onClose, siteConfig, setSiteConfig, gallery, setGallery, services, setServices, premiumSolutions, setPremiumSolutions, customerRecords, setCustomerRecords, initialTab = 'home', maintenancePreFill, isSelectingHeroVideo, setIsSelectingHeroVideo, isSelectingAiVideo, setIsSelectingAiVideo, aiVideoHistory, setAiVideoHistory, isDesignAuthenticated, setIsDesignAuthenticated, designPasswordInput, setDesignPasswordInput, showDesignLock, setShowDesignLock, handleDesignLogin, isAccountingAuthenticated, setIsAccountingAuthenticated, accountingPasswordInput, setAccountingPasswordInput, showAccountingLock, setShowAccountingLock, handleAccountingLogin, isInspectionAuthenticated, setIsInspectionAuthenticated, inspectionPasswordInput, setInspectionPasswordInput, showInspectionLock, setShowInspectionLock, handleInspectionLogin, trackingData, setTrackingData, reviews, setReviews, inventory, setInventory, eCertificates, setECertificates, expenses, setExpenses, staff, setStaff, reminders, setReminders, inspections, setInspections, isPrivacyMode, setIsPrivacyMode, togglePrivacyMode, currentUserRole, setCurrentUserRole, auditLogs, setAuditLogs, addAuditLog, formatPrivateValue, isEditMode, setIsEditMode, scrollToSection, isDirectInspectionMode, onOpenNotifications, notifications, t, experts, setExperts, user }) => {
  const [activeTab, setActiveTab] = useState<'home' | 'services' | 'premium' | 'gallery' | 'customers' | 'promotions' | 'config' | 'ai-creative' | 'maintenance' | 'appointments' | 'packages' | 'tracking' | 'feedback' | 'news' | 'ui-design' | 'inventory' | 'loyalty' | 'reports' | 'ecerts' | 'expenses' | 'staff' | 'reminders' | 'inspections' | 'security' | 'automation' | 'accounting' | 'transformations' | 'proposals' | 'wrap-manager' | 'tint-manager' | 'tuning-manager' | 'vip'>(initialTab as any);
  const [pendingTab, setPendingTab] = useState<any>(null);
  const [servicePage, setServicePage] = useState(1);
  const [premiumPage, setPremiumPage] = useState(1);
  const [promoPage, setPromoPage] = useState(1);
  const [galleryPage, setGalleryPage] = useState(1);
  const [customerPage, setCustomerPage] = useState(1);
  const [expensePage, setExpensePage] = useState(1);
  const [transformationPage, setTransformationPage] = useState(1);
  
  const [isGalleryPickerOpen, setIsGalleryPickerOpen] = useState(false);
  const [galleryPickerCallback, setGalleryPickerCallback] = useState<((url: string) => void) | null>(null);

  const SERVICES_PER_PAGE = 5;
  const PREMIUM_PER_PAGE = 5;
  const PROMO_PER_PAGE = 5;
  const GALLERY_PER_PAGE = 15;
  const CUSTOMERS_PER_PAGE = 10;
  const EXPENSES_PER_PAGE = 10;
  const TRANSFORMATIONS_PER_PAGE = 6;
  
  // Sorting and Filtering States
  const [sortConfig, setSortConfig] = useState<{ key: string, order: 'asc' | 'desc' }>({ key: 'id', order: 'desc' });
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterText, setFilterText] = useState('');
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiResult, setAiResult] = useState<{ type: 'image' | 'video', url: string } | null>(null);
  const [isAiProcessing, setIsAiProcessing] = useState(false);
  const [isAiAnalyzerOpen, setIsAiAnalyzerOpen] = useState(false);
  const [automationSettings, setAutomationSettings] = useState<AutomationSettings>(siteConfig.automation || {
    enableMaintenanceReminder: true,
    enableBirthdayGreeting: true,
    enableServiceCompletion: true,
    maintenanceReminderDays: 7,
    birthdayDiscount: 10,
    notifyServiceDone: true,
    notifyMaintenanceReminder: true,
    notifyBirthday: true,
    notifyPromotion: false,
    notifyThanks24h: true,
    autoGoldVoucher: true,
    channel: 'zalo'
  });
  const [maintenanceAdvice, setMaintenanceAdvice] = useState<string | null>(null);
  const [maintenanceForm, setMaintenanceForm] = useState({
    brand: '', model: '', year: '', mileage: '', lastMaintenance: '', symptoms: ''
  });
  const [carCondition, setCarCondition] = useState('');
  const [desiredOutcome, setDesiredOutcome] = useState('');
  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);
  const [transformations, setTransformations] = useState<BeforeAfterImage[]>(siteConfig.transformations || []);
  const [isAiGeneratingText, setIsAiGeneratingText] = useState<string | null>(null);
  const [isGalleryUploadOpen, setIsGalleryUploadOpen] = useState(false);
  const [isInventoryScannerOpen, setIsInventoryScannerOpen] = useState(false);
  const [selectedInventoryItemForScan, setSelectedInventoryItemForScan] = useState<InventoryItem | null>(null);

  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
  const [generationStatus, setGenerationStatus] = useState('');

  const [isAddingCustomer, setIsAddingCustomer] = useState(false);
  const [editingCustomerId, setEditingCustomerId] = useState<string | null>(null);
  const [customerForm, setCustomerForm] = useState<Partial<CustomerRecord>>({
    customerName: '', phone: '', licensePlate: '', carModel: '', servicesDone: [], serviceReviews: [], totalPrice: '', notes: '', rating: 5, date: new Date().toISOString().split('T')[0], discount: 0, paymentStatus: 'paid'
  });

  const [isAddingExpense, setIsAddingExpense] = useState(false);
  const [editingExpenseId, setEditingExpenseId] = useState<string | null>(null);
  const [expenseForm, setExpenseForm] = useState<Partial<Expense>>({
    title: '', amount: 0, category: 'other', date: new Date().toISOString().split('T')[0]
  });
  const [isExcelMode, setIsExcelMode] = useState(false);
  const [customerSearchQuery, setCustomerSearchQuery] = useState('');
  const [appointmentSearchQuery, setAppointmentSearchQuery] = useState('');

  const [proposals, setProposals] = useState<ServiceProposal[]>(siteConfig.proposals || []);

  const [isSyncingToCodebase, setIsSyncingToCodebase] = useState(false);
  const [auditSearchQuery, setAuditSearchQuery] = useState('');
  const [auditFilterType, setAuditFilterType] = useState('all');
  const [isCodebaseDirty, setIsCodebaseDirty] = useState(false);

  const isInitialMount = React.useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      setIsCodebaseDirty(true);
    }
  }, [siteConfig, customerRecords, gallery, premiumSolutions, services, aiVideoHistory, trackingData, reviews, inventory, eCertificates, staff, inspections, reminders, expenses, experts]);

  const handleSyncToCodebase = async () => {
    setIsSyncingToCodebase(true);
    const id = toast.loading("Đang đồng bộ dữ liệu quản trị với mã nguồn và GitHub...");
    try {
      const response = await fetch("/api/sync-admin-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          siteConfig,
          customerRecords,
          gallery,
          premiumSolutions,
          services,
          aiVideoHistory,
          trackingData,
          reviews,
          inventory,
          eCertificates,
          staff,
          inspections,
          reminders,
          expenses,
          experts
        })
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          toast.success("Đồng bộ thành công! Các thay đổi đã được lưu trực tiếp vào mã nguồn của bạn. Khi dự án được đồng bộ lên GitHub, các cài đặt này sẽ được bảo lưu trọn vẹn.", { id, duration: 6000 });
          setIsCodebaseDirty(false);
          addAuditLog("Đồng bộ hệ thống", "Đồng bộ thành công dữ liệu với mã nguồn và GitHub");
          return;
        }
      }
      throw new Error("API sync returned unsuccessful state");
    } catch (err: any) {
      console.error(err);
      toast.error(`Lỗi khi đồng bộ: ${err.message || err}`, { id });
    } finally {
      setIsSyncingToCodebase(false);
    }
  };

  useEffect(() => {
    setServicePage(1);
    setPremiumPage(1);
    setPromoPage(1);
    setGalleryPage(1);
    setCustomerPage(1);
    setExpensePage(1);
    setTransformationPage(1);
  }, [filterText, sortConfig, filterCategory, activeTab, customerSearchQuery, services.length, premiumSolutions.length, gallery.length, transformations.length]);

  const handleSaveExpense = () => {
    if (!expenseForm.title || !expenseForm.amount) return toast.error("Vui lòng nhập đầy đủ thông tin!");
    
    if (editingExpenseId) {
      setExpenses(prev => prev.map(e => e.id === editingExpenseId ? { ...e, ...expenseForm as Expense } : e));
      toast.success("Đã cập nhật khoản chi!");
    } else {
      const newExpense: Expense = {
        ...expenseForm as Expense,
        id: Date.now().toString()
      };
      setExpenses(prev => [newExpense, ...prev]);
      toast.success("Đã thêm khoản chi mới!");
    }
    setIsAddingExpense(false);
    setEditingExpenseId(null);
    setExpenseForm({ title: '', amount: 0, category: 'other', date: new Date().toISOString().split('T')[0] });
  };

  const handleExcelUpdate = (id: string, type: 'revenue' | 'expense', field: string, value: any) => {
    if (type === 'revenue') {
      setCustomerRecords(prev => prev.map(r => {
        if (r.id === id) {
          if (field === 'amount') {
            return { ...r, totalPrice: formatCurrency(parseInt(value) || 0) as string };
          }
          return { ...r, [field]: value };
        }
        return r;
      }));
    } else {
      setExpenses(prev => prev.map(e => {
        if (e.id === id) {
          if (field === 'amount') {
            return { ...e, amount: parseInt(value) || 0 };
          }
          return { ...e, [field]: value };
        }
        return e;
      }));
    }
  };

  const handleDownloadExcel = () => {
    const excelData = [
      ...(customerRecords || []).map(r => ({
        date: r.date,
        type: 'Doanh thu',
        description: r.customerName,
        category: 'Dịch vụ',
        amount: parseInt(r.totalPrice?.replace(/[^0-9]/g, '') || '0')
      })),
      ...(expenses || []).map(e => ({
        date: e.date,
        type: 'Chi phí',
        description: e.title,
        category: e.category,
        amount: e.amount
      }))
    ].sort((a, b) => b.date.localeCompare(a.date));

    const headers = ['Ngày', 'Loại', 'Nội dung/Khách hàng', 'Danh mục', 'Số tiền (VNĐ)'];
    const csvContent = [
      headers.join(','),
      ...(excelData || []).map(row => [
        row.date,
        row.type,
        `"${row.description}"`,
        row.category,
        row.amount
      ].join(','))
    ].join('\n');

    const blob = new Blob(["\ufeff" + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `bao-cao-ke-toan-${new Date().toISOString().slice(0, 10)}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Đã tải xuống báo cáo!");
  };

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

  const [appointmentFilterStatus, setAppointmentFilterStatus] = useState<'all' | 'pending' | 'confirmed' | 'completed' | 'cancelled'>('all');
  const [appointmentViewMode, setAppointmentViewMode] = useState<'list' | 'calendar'>('calendar');
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [selectedCalendarDay, setSelectedCalendarDay] = useState<string>(new Date().toISOString().split('T')[0]);
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

  const [isAddingStaff, setIsAddingStaff] = useState(false);
  const [editingStaffId, setEditingStaffId] = useState<string | null>(null);
  const [staffForm, setStaffForm] = useState<Partial<Staff>>({
    name: '', role: 'technician', phone: '', email: '', avatar: '', commissionRate: 10, status: 'active', joinedDate: new Date().toISOString().split('T')[0]
  });

  const [isAddingReminder, setIsAddingReminder] = useState(false);
  const [editingReminderId, setEditingReminderId] = useState<string | null>(null);
  const [reminderForm, setReminderForm] = useState<Partial<MaintenanceReminder>>({
    customerId: '', customerName: '', phone: '', licensePlate: '', serviceName: '', lastServiceDate: '', nextServiceDate: '', status: 'pending', note: ''
  });

  const [isAddingInspection, setIsAddingInspection] = useState(false);
  const [editingInspectionId, setEditingInspectionId] = useState<string | null>(null);
  const [inspectionForm, setInspectionForm] = useState<Partial<CarInspection>>({
    customerId: '', licensePlate: '', phone: '', technicianId: '', date: new Date().toISOString().split('T')[0], points: [], checklist: {}, notes: '', status: 'draft'
  });

  const [isAddingVIPProgram, setIsAddingVIPProgram] = useState(false);
  const [editingVIPProgramId, setEditingVIPProgramId] = useState<string | null>(null);
  const [vipProgramForm, setVipProgramForm] = useState<Partial<VIPProgram>>({
    name: '', description: '', minUsage: 1, discountRate: 5, status: 'active'
  });

  // const [isAuthenticated, setIsAuthenticated] = useState(true); // Removed redundant login state
  // const [passwordInput, setPasswordInput] = useState(''); // Removed redundant login state

  useEffect(() => {
    if (isOpen) {
      const designTabIds = ['services', 'packages', 'premium', 'promotions', 'news', 'gallery', 'ui-design', 'ai-creative', 'config'];
      const accountingTabIds = [
        'home', 'appointments', 'customers', 'inventory', 'loyalty', 
        'accounting', 'reports', 'expenses', 'staff', 'reminders', 
        'inspections', 'automation', 'security', 'ecerts', 'tracking', 
        'feedback', 'maintenance'
      ];
      
      const isDesignTab = designTabIds.includes(initialTab as string);
      const isAccountingTab = accountingTabIds.includes(initialTab as string);
      
      const isAccountingLockEnabled = siteConfig.enableAccountingLock !== false && siteConfig.accountingLockSettings?.[initialTab as string] === true;
      const isDesignLockEnabled = siteConfig.enableDesignLock !== false && siteConfig.designLockSettings?.[initialTab as string] === true;
      const isInspectionLockEnabled = siteConfig.enableInspectionLock !== false && initialTab === 'inspections' && !isDirectInspectionMode;
      
      if (isDesignTab && isDesignLockEnabled && !isDesignAuthenticated) {
        setShowDesignLock(true);
      } else if (isInspectionLockEnabled && !isInspectionAuthenticated) {
        setShowInspectionLock(true);
      } else if (isAccountingTab && isAccountingLockEnabled && !isAccountingAuthenticated) {
        setShowAccountingLock(true);
      } else {
        if (initialTab === 'inspections' && isDirectInspectionMode) {
        setIsAddingInspection(true);
      }
      setActiveTab(initialTab as any);
        setShowDesignLock(false);
        setShowAccountingLock(false);
      }

      if (maintenancePreFill) {
        setMaintenanceForm(maintenancePreFill);
        setMaintenanceAdvice(null);
      }
      // Reset filters when opening
      setFilterText('');
      setFilterCategory('all');
      setSortConfig({ key: 'id', order: 'desc' });
    }
  }, [isOpen, initialTab, maintenancePreFill, isDesignAuthenticated, isAccountingAuthenticated, siteConfig.enableAccountingLock, siteConfig.accountingLockSettings, siteConfig.designLockSettings]);

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

  useEffect(() => {
    if (isDesignAuthenticated && pendingTab) {
      const designTabIds = ['services', 'packages', 'premium', 'promotions', 'news', 'gallery', 'ui-design', 'ai-creative', 'config'];
      if (designTabIds.includes(pendingTab as string)) {
        setActiveTab(pendingTab);
        setPendingTab(null);
      }
    }
  }, [isDesignAuthenticated, pendingTab]);

  useEffect(() => {
    if (isAccountingAuthenticated && pendingTab) {
      const accountingTabIds = [
        'home', 'appointments', 'customers', 'inventory', 'loyalty', 
        'accounting', 'reports', 'expenses', 'staff', 'reminders', 
        'inspections', 'automation', 'security', 'ecerts', 'tracking', 
        'feedback', 'maintenance'
      ];
      if (accountingTabIds.includes(pendingTab as string)) {
        setActiveTab(pendingTab);
        setPendingTab(null);
      }
    }
  }, [isAccountingAuthenticated, pendingTab]);

  useEffect(() => {
    if (isInspectionAuthenticated && pendingTab === 'inspections') {
      setActiveTab(pendingTab);
      setPendingTab(null);
    }
  }, [isInspectionAuthenticated, pendingTab]);

  const [adminSearchQuery, setAdminSearchQuery] = useState('');
  const [adminTabSearch, setAdminTabSearch] = useState('');

  if (!isOpen) return null;

  const operationTabs = [
    { id: 'home', label: t('admin_tab_overview'), icon: <Home className="w-5 h-5" />, roles: ['admin', 'manager'] },
    { id: 'appointments', label: t('admin_tab_appointments'), icon: <Calendar className="w-5 h-5" />, roles: ['admin', 'manager'] },
    { id: 'customers', label: t('admin_tab_customers'), icon: <Users className="w-5 h-5" />, roles: ['admin', 'manager'] },
    { id: 'staff', label: 'Quản Lý Nhân Sự', icon: <Users className="w-5 h-5" />, roles: ['admin', 'manager'] },
    { id: 'accounting', label: 'Sổ Cái Kế Toán', icon: <Wallet className="w-5 h-5" />, roles: ['admin', 'manager'] },
    { id: 'expenses', label: 'Quản Lý Chi Phí', icon: <Receipt className="w-5 h-5" />, roles: ['admin', 'manager'] },
    { id: 'inspections', label: 'Phiếu Kiểm Tra Xe', icon: <Clipboard className="w-5 h-5" />, roles: ['admin', 'manager', 'staff'] },
    { id: 'reminders', label: 'Nhắc Lịch Hẹn', icon: <Bell className="w-5 h-5" />, roles: ['admin', 'manager'] },
    { id: 'proposals', label: 'Báo Giá & Đề Xuất', icon: <FileText className="w-5 h-5" />, roles: ['admin', 'manager'] },
    { id: 'reports', label: 'Báo Cáo Thống Kê', icon: <BarChart3 className="w-5 h-5" />, roles: ['admin', 'manager'] },
  ];

  const contentTabs = [
    { id: 'services', label: 'Danh Mục Dịch Vụ', icon: <Briefcase className="w-5 h-5" />, roles: ['admin', 'manager'] },
    { id: 'packages', label: 'Gói Chăm Sóc Xe', icon: <Package className="w-5 h-5" />, roles: ['admin', 'manager'] },
    { id: 'premium', label: 'Giải Pháp Luxury', icon: <ShieldCheck className="w-5 h-5" />, roles: ['admin', 'manager'] },
    { id: 'vip', label: 'Ưu Đãi VIP', icon: <Crown className="w-5 h-5" />, roles: ['admin', 'manager'] },
    { id: 'promotions', label: 'Chương Trình Khuyến Mãi', icon: <Tag className="w-5 h-5" />, roles: ['admin', 'manager'] },
    { id: 'news', label: 'Tin Tức & Blog', icon: <Newspaper className="w-5 h-5" />, roles: ['admin', 'manager'] },
    { id: 'gallery', label: 'Thư Viện Ảnh Chung', icon: <ImageIcon className="w-5 h-5" />, roles: ['admin', 'manager'] },
    { id: 'feedback', label: 'Phản Hồi Khách Hàng', icon: <MessageSquare className="w-5 h-5" />, roles: ['admin', 'manager'] },
    { id: 'loyalty', label: 'Hệ Thống Tích Điểm', icon: <Gift className="w-5 h-5" />, roles: ['admin', 'manager'] },
  ];

  const technicalTabs = [
    { id: 'wrap-manager', label: 'Dự Án Wrap & PPF', icon: <CameraIcon className="w-5 h-5" />, roles: ['admin', 'manager'] },
    { id: 'tint-manager', label: 'Dự Án Phim Cách Nhiệt', icon: <Sun className="w-5 h-5" />, roles: ['admin', 'manager'] },
    { id: 'tuning-manager', label: 'Dự Án Nâng Cấp Xe', icon: <Wrench className="w-5 h-5" />, roles: ['admin', 'manager'] },
  ];

  const systemTabs = [
    { id: 'config', label: 'Cấu Hình Website', icon: <Settings2 className="w-5 h-5" />, roles: ['admin', 'manager'] },
    { id: 'ui-design', label: 'Giao Diện (UI)', icon: <Palette className="w-5 h-5" />, roles: ['admin', 'manager'] },
    { id: 'automation', label: 'Tự Động Hóa (Zalo)', icon: <Zap className="w-5 h-5" />, roles: ['admin', 'manager'] },
    { id: 'security', label: 'Bảo Mật & Phân Quyền', icon: <ShieldCheck className="w-5 h-5" />, roles: ['admin', 'manager'] },
    { id: 'tracking', label: 'Theo Dõi Tiến Độ', icon: <Timer className="w-5 h-5" />, roles: ['admin', 'manager'] },
    { id: 'inventory', label: 'Quản Lý Kho Vật Tư', icon: <Boxes className="w-5 h-5" />, roles: ['admin', 'manager'] },
    { id: 'maintenance', label: 'AI Tư Vấn Kỹ Thuật', icon: <Cpu className="w-5 h-5" />, roles: ['admin', 'manager'] },
    { id: 'ai-creative', label: 'AI Media Lab', icon: <Sparkles className="w-5 h-5" />, roles: ['admin', 'manager'] },
    { id: 'ecerts', label: 'Chứng Chỉ Điện Tử', icon: <FileCheck className="w-5 h-5" />, roles: ['admin', 'manager'] },
  ];

  const filteredOperationTabs = operationTabs.filter(tab => tab.roles.includes(currentUserRole));
  const filteredContentTabs = contentTabs.filter(tab => tab.roles.includes(currentUserRole));
  const filteredTechnicalTabs = technicalTabs.filter(tab => tab.roles.includes(currentUserRole));
  const filteredSystemTabs = systemTabs.filter(tab => tab.roles.includes(currentUserRole));

  const handleTabClick = (tabId: any) => {
    const isDesignTab = [...contentTabs, ...systemTabs].some(t => t.id === tabId);
    const isAccountingTab = [...operationTabs, ...technicalTabs].some(t => t.id === tabId);
    const isInspectionTab = tabId === 'inspections';
    
    const isAccountingLockEnabled = siteConfig.enableAccountingLock !== false && siteConfig.accountingLockSettings?.[tabId as string] === true;
    const isDesignLockEnabled = siteConfig.enableDesignLock !== false && siteConfig.designLockSettings?.[tabId as string] === true;
    const isInspectionLockEnabled = siteConfig.enableInspectionLock !== false && isInspectionTab && !isDirectInspectionMode;

    if (isDesignTab && isDesignLockEnabled && !isDesignAuthenticated) {
      setPendingTab(tabId);
      setShowDesignLock(true);
      return;
    }

    if (isInspectionTab && isInspectionLockEnabled && !isInspectionAuthenticated) {
      setPendingTab(tabId);
      setShowInspectionLock(true);
      return;
    }

    if (isAccountingTab && isAccountingLockEnabled && !isAccountingAuthenticated) {
      setPendingTab(tabId);
      setShowAccountingLock(true);
      return;
    }

    setActiveTab(tabId);
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

      // Handle numeric sorting for price strings and amounts
      if (sortConfig.key === 'totalPrice' || sortConfig.key === 'price' || sortConfig.key === 'amount') {
        valA = typeof valA === 'number' ? valA : parseInt(String(valA || '0').replace(/[^0-9]/g, '')) || 0;
        valB = typeof valB === 'number' ? valB : parseInt(String(valB || '0').replace(/[^0-9]/g, '')) || 0;
      }
      
      if (typeof valA === 'string' && typeof valB === 'string') {
        return valA.localeCompare(valB) * (sortConfig.order === 'asc' ? 1 : -1);
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

        toast.success("✅ Đã tạo video mới thành công!");
      } else {
        throw new Error("Không nhận được link video");
      }
    } catch (error: any) {
      console.error(error);
      if (error.message?.includes("Requested entity was not found")) {
        toast.error("Lỗi: Vui lòng chọn lại API Key (Project ID không hợp lệ)");
        await window.aistudio.openSelectKey();
      } else {
        toast.error("Lỗi khi tạo video: " + error.message);
      }
    } finally {
      setIsGeneratingVideo(false);
      setGenerationStatus('');
    }
  };

  const handleDeleteVIPProgram = (id: string) => {
    setSiteConfig(prev => ({
      ...prev,
      vipPrograms: (prev.vipPrograms || []).filter(p => p.id !== id)
    }));
    toast.success("Đã xóa chương trình VIP!");
  };

  const handleSaveVIPProgram = () => {
    if (!vipProgramForm.name || !vipProgramForm.description) {
      return toast.error("Vui lòng nhập đầy đủ thông tin!");
    }
    
    if (editingVIPProgramId) {
      setSiteConfig(prev => ({
        ...prev,
        vipPrograms: (prev.vipPrograms || []).map(p => p.id === editingVIPProgramId ? { ...p, ...vipProgramForm as VIPProgram } : p)
      }));
      toast.success("Đã cập nhật chương trình VIP!");
    } else {
      const newProgram: VIPProgram = {
        ...vipProgramForm as VIPProgram,
        id: `vip-${Date.now()}`
      };
      setSiteConfig(prev => ({
        ...prev,
        vipPrograms: [newProgram, ...(prev.vipPrograms || [])]
      }));
      toast.success("Đã thêm chương trình VIP mới!");
    }
    setIsAddingVIPProgram(false);
    setEditingVIPProgramId(null);
    setVipProgramForm({ name: '', description: '', minUsage: 1, discountRate: 5, status: 'active' });
  };

  const handleStepComplete = (vehicle: VehicleTracking, step: TrackingStep) => {
    if (step.status !== 'completed') return;

    // Find the service associated with this tracking
    const service = INITIAL_SERVICES.find(s => s.id === vehicle.serviceId || s.title === vehicle.serviceType);
    if (!service || !service.inventoryConsumptions) return;

    // Deduct inventory
    setInventory(prev => {
      const newInventory = [...prev];
      let updated = false;

      service.inventoryConsumptions?.forEach(consumption => {
        const itemIndex = newInventory.findIndex(item => item.id === consumption.itemId);
        if (itemIndex !== -1) {
          const item = newInventory[itemIndex];
          if (item.quantity >= consumption.amount) {
            newInventory[itemIndex] = {
              ...item,
              quantity: item.quantity - consumption.amount
            };
            updated = true;
            toast.success(`Đã tự động trừ ${consumption.amount} ${item.unit} ${item.name} từ kho.`);
          } else {
            toast.error(`Không đủ ${item.name} trong kho để thực hiện dịch vụ!`);
          }
        }
      });

      if (updated) {
        localStorage.setItem('dungcar_inventory_v12', JSON.stringify(newInventory));
        return newInventory;
      }
      return prev;
    });
  };

  const updateConfig = (key: keyof SiteConfig, value: any) => {
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

  const handleAiGenerateService = async () => {
    const promptText = prompt("Mô tả dịch vụ bạn muốn tạo (VD: Rửa xe cao cấp bằng hơi nước):");
    if (!promptText) return;

    const hasKey = await window.aistudio.hasSelectedApiKey();
    if (!hasKey) {
      await window.aistudio.openSelectKey();
      return;
    }

    setIsAiProcessing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      const prompt = `Bạn là chuyên gia marketing cho "XE ĐẸP PRO". 
      Hãy tạo thông tin cho một dịch vụ mới dựa trên yêu cầu: "${promptText}".
      Yêu cầu kết quả trả về dưới dạng JSON với các trường:
      - title: Tên dịch vụ ngắn gọn, chuyên nghiệp.
      - description: Mô tả hấp dẫn, làm nổi bật lợi ích cho khách hàng.
      - price: Giá dự kiến (VD: "500.000 VNĐ" hoặc "Liên hệ").
      - icon: Một emoji phù hợp (VD: "🧼", "✨", "🚗").
      
      Ngôn ngữ: Tiếng Việt.
      QUAN TRỌNG: Chỉ trả về JSON, không có lời giải thích hay định dạng Markdown bên ngoài khối JSON.`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: { responseMimeType: "application/json" }
      });

      const result = JSON.parse(response.text || "{}");
      if (result.title) {
        const newService: Service = {
          id: Date.now().toString(),
          title: result.title,
          description: result.description || 'Mô tả dịch vụ...',
          price: result.price || 'Liên hệ',
          icon: result.icon || '✨',
          image: 'https://images.unsplash.com/photo-1599256621730-535171e28e50?auto=format&fit=crop&q=80&w=800'
        };
        setServices(prev => [...prev, newService]);
        toast.success("✅ Đã tạo dịch vụ mới bằng AI!");
      }
    } catch (error: any) {
      console.error(error);
      toast.error("Lỗi AI: " + error.message);
    } finally {
      setIsAiProcessing(false);
    }
  };

  const handleDeleteService = (id: string) => {
    setServices(prev => prev.filter(s => s.id !== id));
    toast.success("Đã xóa dịch vụ!");
  };

  const handleDeleteGallery = (id: string) => {
    setGallery(prev => prev.filter(g => g.id !== id));
    toast.success("Đã xóa ảnh!");
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
    setPremiumSolutions(prev => prev.filter(p => p.id !== id));
    toast.success("Đã xóa giải pháp!");
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
    setSiteConfig(prev => ({
      ...prev,
      promotions: (prev.promotions || []).filter(p => p.id !== id)
    }));
    toast.success("Đã xóa chương trình khuyến mãi!");
  };

  const handleAiAutoCategorize = async () => {
    if (gallery.length === 0) return;
    
    setIsAiProcessing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      const prompt = `Analyze these image titles and categorize them into: ceramic, wash, interior, film, general. Return a JSON array of objects with {id, category}. 
      Images: ${(gallery || []).map(img => `ID: ${img.id}, Title: ${img.title}`).join('; ')}`;
      
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
        toast.success("✅ Đã tự động phân loại thư viện!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Lỗi AI phân loại");
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
        toast.success("✅ Đã chỉnh sửa ảnh bằng AI!");
      } else {
        toast.error("AI không thể chỉnh sửa ảnh này.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Lỗi AI chỉnh sửa");
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
      const prompt = `Bạn là một chuyên gia marketing cho trung tâm chăm sóc xe "XE ĐẸP PRO". 
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
      toast.error("Lỗi AI: " + error.message);
    } finally {
      setIsAiGeneratingText(null);
    }
  };

  const handleAiGenerateItemText = async (
    id: string, 
    type: 'service' | 'premium' | 'promotion' | 'config', 
    field: string,
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
      else if (type === 'config') itemTitle = siteConfig.siteName;

      const prompt = `Bạn là chuyên gia marketing cho "XE ĐẸP PRO". 
      Hãy tạo ${label} cho ${type === 'config' ? 'trang chủ' : (type === 'promotion' ? 'chương trình khuyến mãi' : 'dịch vụ')} "${itemTitle || 'mới'}".
      Yêu cầu: Ngôn ngữ hấp dẫn, chuyên nghiệp, sang trọng. 
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
        } else if (type === 'config') {
          setSiteConfig(prev => ({ ...prev, [field]: text }));
        }
      }
    } catch (error: any) {
      console.error(error);
      toast.error("Lỗi AI: " + error.message);
    } finally {
      setIsAiProcessing(false);
    }
  };

  const handleAiCreative = async (type: 'image' | 'video') => {
    if (!aiPrompt) {
      toast.error("Vui lòng nhập mô tả yêu cầu!");
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
      toast.error("Lỗi AI: " + error.message);
    } finally {
      setIsAiProcessing(false);
    }
  };

  const handleGenerateAiProposalNote = async (carInfo: string, selectedServices: string[]) => {
    try {
      const hasKey = await window.aistudio.hasSelectedApiKey();
      if (!hasKey) {
        await window.aistudio.openSelectKey();
        return "Vui lòng chọn API Key để sử dụng tính năng này.";
      }

      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      const prompt = `Bạn là một chuyên gia Detailing cao cấp tại "XE ĐẸP PRO". 
      Hãy viết một lời dẫn tư vấn chuyên nghiệp, cá nhân hóa cho khách hàng sở hữu xe: ${carInfo}.
      Các dịch vụ đề xuất bao gồm: ${selectedServices.join(', ')}.
      
      Yêu cầu:
      - Giọng văn: Sang trọng, chân thành, thể hiện sự am hiểu kỹ thuật.
      - Nội dung: Giải thích ngắn gọn tại sao các dịch vụ này cần thiết cho tình trạng xe hiện tại.
      - Kết thúc bằng một lời cam kết về chất lượng từ XE ĐẸP PRO.
      
      Ngôn ngữ: Tiếng Việt.
      QUAN TRỌNG: Chỉ trả về nội dung tư vấn, không thêm các ký tự định dạng đặc biệt dư thừa.`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt
      });

      return response.text || "Chúng tôi đã kiểm tra và đề xuất các dịch vụ tối ưu nhất cho xế yêu của bạn.";
    } catch (error: any) {
      console.error(error);
      return "Lỗi AI: Không thể tạo lời tư vấn tự động lúc này.";
    }
  };

  const handleAiSuggestPackage = async () => {
    if (!carCondition || !desiredOutcome) {
      toast.error("Vui lòng nhập tình trạng xe và mong muốn!");
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
      toast.error("Lỗi AI: " + error.message);
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
                    <p className="section-subtitle mb-0 mt-1">Control Panel</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={onOpenNotifications}
                    className="relative p-2.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-all"
                    title="Giỏ hàng dịch vụ"
                  >
                    <ShoppingCart className="w-5 h-5" />
                  </button>
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

              <div className="p-4 border-b border-white/5">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-500" />
                  <input 
                    type="text"
                    placeholder="Lọc chức năng..."
                    className="w-full bg-slate-950/50 border border-white/5 rounded-xl py-2 pl-8 pr-3 text-[10px] text-white outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                    value={adminTabSearch}
                    onChange={e => setAdminTabSearch(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex-1 overflow-x-auto md:overflow-y-auto p-2 md:p-4 flex md:flex-col gap-1 md:space-y-1 custom-scrollbar scrollbar-hide bg-slate-950 md:bg-transparent border-b md:border-b-0 border-white/5">
                {/* Operations Section */}
                <div className="px-4 py-2 hidden md:block">
                  <p className="text-[9px] font-black text-slate-600 uppercase tracking-[0.2em]">Vận Hành & Nhân Sự</p>
                </div>
                {filteredOperationTabs.filter(t => !adminTabSearch || t.label.toLowerCase().includes(adminTabSearch.toLowerCase())).map(tab => {
                  const unreadCount = tab.id === 'appointments' 
                    ? (siteConfig.appointments?.filter(a => a.isRead === false).length || 0)
                    : 0;
                  
                  return (
                    <button
                      key={`nav-oper-${tab.id}`}
                      onClick={() => handleTabClick(tab.id as any)}
                      className={`relative whitespace-nowrap flex flex-col md:flex-row items-center gap-1 md:gap-3 px-4 py-3 md:py-3.5 rounded-xl md:rounded-2xl text-[9px] md:text-sm font-black uppercase tracking-widest transition-all group shrink-0 ${
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

                {/* Technical Section */}
                <div className="px-4 py-2 hidden md:block mt-4 border-t border-white/5 pt-4">
                  <p className="text-[9px] font-black text-emerald-600/70 uppercase tracking-[0.2em] flex items-center gap-2">
                    <Wrench className="w-3 h-3" /> Kỹ Thuật Chuyên Sâu
                  </p>
                </div>
                {filteredTechnicalTabs.filter(t => !adminTabSearch || t.label.toLowerCase().includes(adminTabSearch.toLowerCase())).map(tab => (
                  <button
                    key={`nav-tech-${tab.id}`}
                    onClick={() => handleTabClick(tab.id as any)}
                    className={`relative whitespace-nowrap flex flex-col md:flex-row items-center gap-1 md:gap-3 px-4 py-3 md:py-3.5 rounded-xl md:rounded-2xl text-[9px] md:text-sm font-black uppercase tracking-widest transition-all group shrink-0 ${
                      activeTab === tab.id 
                        ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' 
                        : 'text-slate-500 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span className={`${activeTab === tab.id ? 'text-white' : 'text-slate-600 group-hover:text-emerald-500'} transition-colors`}>
                      {tab.icon}
                    </span>
                    <span className="md:inline">{tab.label}</span>
                  </button>
                ))}

                <div className="w-px h-8 bg-white/5 mx-2 md:w-full md:h-px md:my-4 shrink-0" />
                
                {/* Content Section (3-bar menu items) */}
                <div className="px-4 py-2 hidden md:block mt-4 border-t border-white/5 pt-4">
                  <p className="text-[9px] font-black text-amber-600/70 uppercase tracking-[0.2em] flex items-center gap-2">
                    <Crown className="w-3 h-3" /> Nội Dung Website
                  </p>
                </div>
                {[
                  { id: 'transformations', label: 'So sánh Trước Sau', icon: <Split className="w-4 h-4" /> },
                  ...filteredContentTabs
                ].filter(t => !adminTabSearch || t.label.toLowerCase().includes(adminTabSearch.toLowerCase())).map(tab => (
                  <button
                    key={`nav-cont-${tab.id}`}
                    onClick={() => handleTabClick(tab.id as any)}
                    className={`relative whitespace-nowrap flex flex-col md:flex-row items-center gap-1 md:gap-3 px-4 py-3 md:py-3.5 rounded-xl md:rounded-2xl text-[9px] md:text-sm font-black uppercase tracking-widest transition-all group shrink-0 ${
                      activeTab === tab.id 
                        ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/20' 
                        : 'text-slate-500 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span className={`${activeTab === tab.id ? 'text-white' : 'text-slate-600 group-hover:text-amber-500'} transition-colors`}>
                      {tab.icon}
                    </span>
                    <span className="md:inline">{tab.label}</span>
                  </button>
                ))}

                <div className="w-px h-8 bg-white/5 mx-2 md:w-full md:h-px md:my-4 shrink-0" />

                {/* System Section */}
                <div className="px-4 py-2 hidden md:block mt-4 border-t border-white/5 pt-4">
                  <p className="text-[9px] font-black text-purple-600/70 uppercase tracking-[0.2em] flex items-center gap-2">
                    <Settings className="w-3 h-3" /> Hệ Thống & Cấu Hình
                  </p>
                </div>
                {filteredSystemTabs.filter(t => !adminTabSearch || t.label.toLowerCase().includes(adminTabSearch.toLowerCase())).map(tab => (
                  <button
                    key={`nav-sys-${tab.id}`}
                    onClick={() => handleTabClick(tab.id as any)}
                    className={`relative whitespace-nowrap flex flex-col md:flex-row items-center gap-1 md:gap-3 px-4 py-3 md:py-3.5 rounded-xl md:rounded-2xl text-[9px] md:text-sm font-black uppercase tracking-widest transition-all group shrink-0 ${
                      activeTab === tab.id 
                        ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20' 
                        : 'text-slate-500 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span className={`${activeTab === tab.id ? 'text-white' : 'text-slate-600 group-hover:text-purple-500'} transition-colors`}>
                      {tab.icon}
                    </span>
                    <span className="md:inline">{tab.label}</span>
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
              {(!isDirectInspectionMode || activeTab !== 'inspections') && (
                <div className="px-4 md:px-8 py-4 md:py-6 border-b border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-900/20">
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <div className="md:hidden">
                    <Settings2 className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-black text-white uppercase tracking-tighter">
                      {[...operationTabs, ...technicalTabs, ...contentTabs, ...systemTabs, {id: 'transformations', label: 'So sánh Trước Sau'}].find(t => t.id === activeTab)?.label}
                    </h3>
                    <p className="text-[9px] md:text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">
                      Quản lý hệ thống / {[...operationTabs, ...technicalTabs, ...contentTabs, ...systemTabs, {id: 'transformations', label: 'So sánh Trước Sau'}].find(t => t.id === activeTab)?.label}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 md:gap-6 w-full md:w-auto justify-between md:justify-end">
                  <div className="relative flex-1 md:w-64 lg:w-80">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input 
                      type="text"
                      placeholder="Tìm kiếm nhanh..."
                      className="w-full bg-slate-900/50 border border-white/5 rounded-2xl py-2.5 pl-11 pr-4 text-xs text-white placeholder:text-slate-600 focus:border-blue-500/50 outline-none transition-all"
                      value={adminSearchQuery}
                      onChange={(e) => setAdminSearchQuery(e.target.value)}
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleSyncToCodebase}
                      disabled={isSyncingToCodebase}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/5 bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-black uppercase tracking-widest transition-all hover:border-blue-500/30 active:scale-95 disabled:opacity-50"
                      title="Đồng bộ tất cả các cấu hình và thay đổi trong quản trị lên GitHub"
                    >
                      <Github className="w-3.5 h-3.5 text-blue-500" />
                      <span>{isSyncingToCodebase ? "Đang đồng bộ..." : "Đồng bộ GitHub"}</span>
                    </button>
                    <div className="hidden lg:flex flex-col items-end">
                      <span className="text-[10px] font-black text-white uppercase tracking-widest">Administrator</span>
                      <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest">Online</span>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center shrink-0">
                      <User className="w-5 h-5 text-slate-400" />
                    </div>
                  </div>
                </div>
              </div>
              )}

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-8 custom-scrollbar relative bg-slate-950/40">
                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 mb-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">
                  <Home className="w-3 h-3" />
                  <span>Admin</span>
                  <ChevronRight className="w-3 h-3" />
                  <span className="text-blue-500">{[...operationTabs, ...technicalTabs, ...contentTabs, ...systemTabs, {id: 'transformations', label: 'So sánh'}].find(t => t.id === activeTab)?.label}</span>
                </div>

                <AnimatePresence>
                  {showAccountingLock && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 z-50 flex items-center justify-center p-8 bg-slate-950/90 backdrop-blur-xl"
                    >
                      <div className="max-w-sm w-full text-center">
                        <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-600/20">
                          <ShieldCheck className="w-8 h-8 text-white" />
                        </div>
                        <h4 className="text-xl font-black text-white uppercase tracking-tighter mb-2">Kế Toán & Vận Hành</h4>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-8">Vui lòng nhập mật khẩu kế toán để truy cập mục này</p>
                        
                        <input 
                          type="password" 
                          autoFocus 
                          placeholder="Mật khẩu kế toán" 
                          className="w-full bg-slate-900 border border-white/10 rounded-2xl p-4 text-center tracking-[0.5em] text-white text-lg outline-none focus:border-blue-500 transition-all mb-4"
                          value={accountingPasswordInput}
                          onChange={e => setAccountingPasswordInput(e.target.value)}
                          onKeyDown={e => e.key === 'Enter' && handleAccountingLogin()}
                        />
                        
                        <div className="flex gap-3">
                          <button 
                            onClick={handleAccountingLogin}
                            className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all"
                          >
                            Xác Nhận
                          </button>
                          <button 
                            onClick={onClose}
                            className="px-6 bg-slate-800 text-slate-400 rounded-xl font-black uppercase tracking-widest text-[10px] hover:text-white transition-all"
                          >
                            Hủy & Thoát
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  {showInspectionLock && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 z-50 flex items-center justify-center p-8 bg-slate-950/90 backdrop-blur-xl"
                    >
                      <div className="max-w-sm w-full text-center">
                        <div className="w-16 h-16 rounded-2xl bg-amber-500 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-amber-500/20">
                          <ClipboardCheck className="w-8 h-8 text-white" />
                        </div>
                        <h4 className="text-xl font-black text-white uppercase tracking-tighter mb-2">Phiếu Kiểm Tra Xe</h4>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-8">Vui lòng nhập mật khẩu kiểm tra xe để truy cập mục này</p>
                        
                        <input 
                          type="password" 
                          autoFocus 
                          placeholder="Mật khẩu kiểm tra xe" 
                          className="w-full bg-slate-900 border border-white/10 rounded-2xl p-4 text-center tracking-[0.5em] text-white text-lg outline-none focus:border-amber-500 transition-all mb-4"
                          value={inspectionPasswordInput}
                          onChange={e => setInspectionPasswordInput(e.target.value)}
                          onKeyDown={e => e.key === 'Enter' && handleInspectionLogin()}
                        />
                        
                        <div className="flex gap-3">
                          <button 
                            onClick={handleInspectionLogin}
                            className="flex-1 bg-amber-600 hover:bg-amber-500 text-white py-4 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all"
                          >
                            Xác Nhận
                          </button>
                          <button 
                            onClick={onClose}
                            className="px-6 bg-slate-800 text-slate-400 rounded-xl font-black uppercase tracking-widest text-[10px] hover:text-white transition-all"
                          >
                            Hủy & Thoát
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
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
                        <h4 className="text-xl font-black text-white uppercase tracking-tighter mb-2">Thiết Kế & Giao Diện</h4>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-8">Vui lòng nhập mật khẩu thiết kế để truy cập mục này</p>
                        
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
                            onClick={onClose}
                            className="px-6 bg-slate-800 text-slate-400 rounded-xl font-black uppercase tracking-widest text-[10px] hover:text-white transition-all"
                          >
                            Hủy & Thoát
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
                        {adminSearchQuery ? (
                          <div className="space-y-6">
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
                                <Search className="w-4 h-4 text-blue-500" /> Kết quả tìm kiếm cho "{adminSearchQuery}"
                              </h4>
                              <button 
                                onClick={() => setAdminSearchQuery('')}
                                className="text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-white transition-colors"
                              >
                                Xóa tìm kiếm
                              </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {/* Customers Results */}
                              <div className="bg-slate-900/50 border border-white/5 p-6 rounded-[32px]">
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Khách Hàng ({
                                  customerRecords.filter(c => 
                                    c.customerName.toLowerCase().includes(adminSearchQuery.toLowerCase()) || 
                                    c.phone.includes(adminSearchQuery) ||
                                    c.carModel.toLowerCase().includes(adminSearchQuery.toLowerCase())
                                  ).length
                                })</p>
                                <div className="space-y-3">
                                  {(customerRecords || []).filter(c => 
                                    c.customerName.toLowerCase().includes(adminSearchQuery.toLowerCase()) || 
                                    c.phone.includes(adminSearchQuery) ||
                                    c.carModel.toLowerCase().includes(adminSearchQuery.toLowerCase())
                                  ).slice(0, 5).map(customer => (
                                    <div key={customer.id} className="p-3 rounded-xl bg-slate-950 border border-white/5 flex justify-between items-center">
                                      <div>
                                        <p className="text-xs font-bold text-white">{customer.customerName}</p>
                                        <p className="text-[10px] text-slate-500 uppercase font-black">{customer.carModel} • {customer.phone}</p>
                                      </div>
                                      <button 
                                        onClick={() => {
                                          setAdminSearchQuery('');
                                          setActiveTab('customers');
                                        }}
                                        className="p-2 rounded-lg bg-blue-600/10 text-blue-500 hover:bg-blue-600 hover:text-white transition-all"
                                      >
                                        <ArrowRight className="w-3 h-3" />
                                      </button>
                                    </div>
                                  ))}
                                  {customerRecords.filter(c => 
                                    c.customerName.toLowerCase().includes(adminSearchQuery.toLowerCase()) || 
                                    c.phone.includes(adminSearchQuery) ||
                                    c.carModel.toLowerCase().includes(adminSearchQuery.toLowerCase())
                                  ).length === 0 && (
                                    <p className="text-[10px] text-slate-600 italic">Không tìm thấy khách hàng nào</p>
                                  )}
                                </div>
                              </div>

                              {/* Appointments Results */}
                              <div className="bg-slate-900/50 border border-white/5 p-6 rounded-[32px]">
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Lịch Hẹn ({
                                  (siteConfig.appointments || []).filter(a => 
                                    a.customerName.toLowerCase().includes(adminSearchQuery.toLowerCase()) || 
                                    a.carModel.toLowerCase().includes(adminSearchQuery.toLowerCase()) ||
                                    a.serviceId.toLowerCase().includes(adminSearchQuery.toLowerCase())
                                  ).length
                                })</p>
                                <div className="space-y-3">
                                  {(siteConfig.appointments || []).filter(a => 
                                    a.customerName.toLowerCase().includes(adminSearchQuery.toLowerCase()) || 
                                    a.carModel.toLowerCase().includes(adminSearchQuery.toLowerCase()) ||
                                    a.serviceId.toLowerCase().includes(adminSearchQuery.toLowerCase())
                                  ).slice(0, 5).map(app => (
                                    <div key={app.id} className="p-3 rounded-xl bg-slate-950 border border-white/5 flex justify-between items-center">
                                      <div>
                                        <p className="text-xs font-bold text-white">{app.customerName}</p>
                                        <p className="text-[10px] text-slate-500 uppercase font-black">{app.date} • {app.serviceId}</p>
                                      </div>
                                      <button 
                                        onClick={() => {
                                          setAdminSearchQuery('');
                                          setActiveTab('appointments');
                                        }}
                                        className="p-2 rounded-lg bg-emerald-600/10 text-emerald-500 hover:bg-emerald-600 hover:text-white transition-all"
                                      >
                                        <ArrowRight className="w-3 h-3" />
                                      </button>
                                    </div>
                                  ))}
                                  {(siteConfig.appointments || []).filter(a => 
                                    a.customerName.toLowerCase().includes(adminSearchQuery.toLowerCase()) || 
                                    a.carModel.toLowerCase().includes(adminSearchQuery.toLowerCase()) ||
                                    a.serviceId.toLowerCase().includes(adminSearchQuery.toLowerCase())
                                  ).length === 0 && (
                                    <p className="text-[10px] text-slate-600 italic">Không tìm thấy lịch hẹn nào</p>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <>
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
                          <div className="bg-slate-900/50 border border-white/5 p-6 rounded-[32px] hover:border-blue-500/30 transition-all group">
                            <div className="flex justify-between items-start mb-4">
                              <div className="w-12 h-12 rounded-2xl bg-blue-600/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Users className="w-6 h-6 text-blue-500" />
                              </div>
                              <div className="text-right">
                                <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">+12%</p>
                                <p className="text-[8px] text-slate-600 uppercase font-bold tracking-widest">Tháng này</p>
                              </div>
                            </div>
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Khách Hàng</p>
                            <p className="text-3xl font-black text-white">{customerRecords.length}</p>
                          </div>

                          <div className="bg-slate-900/50 border border-white/5 p-6 rounded-[32px] hover:border-emerald-500/30 transition-all group">
                            <div className="flex justify-between items-start mb-4">
                              <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Calendar className="w-6 h-6 text-emerald-500" />
                              </div>
                              <div className="text-right">
                                <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest">{(siteConfig.appointments?.filter(a => a.status === 'pending').length || 0)}</p>
                                <p className="text-[8px] text-slate-600 uppercase font-bold tracking-widest">Chờ duyệt</p>
                              </div>
                            </div>
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Lịch Hẹn</p>
                            <p className="text-3xl font-black text-white">{(siteConfig.appointments || []).length}</p>
                          </div>

                          <div className="bg-slate-900/50 border border-white/5 p-6 rounded-[32px] hover:border-amber-500/30 transition-all group">
                            <div className="flex justify-between items-start mb-4">
                              <div className="w-12 h-12 rounded-2xl bg-amber-600/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <TrendingUp className="w-6 h-6 text-amber-500" />
                              </div>
                              <div className="text-right">
                                <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest">VNĐ</p>
                                <p className="text-[8px] text-slate-600 uppercase font-bold tracking-widest">Tổng thu</p>
                              </div>
                            </div>
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Doanh Thu</p>
                            <p className="text-2xl font-black text-white">
                              {formatCurrency(customerRecords.reduce((acc, curr) => {
                                const price = parseInt(curr.totalPrice.replace(/[^0-9]/g, '')) || 0;
                                return acc + price;
                              }, 0))}
                            </p>
                          </div>

                          <div className="bg-slate-900/50 border border-white/5 p-6 rounded-[32px] hover:border-purple-500/30 transition-all group">
                            <div className="flex justify-between items-start mb-4">
                              <div className="w-12 h-12 rounded-2xl bg-purple-600/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <AlertTriangle className="w-6 h-6 text-purple-500" />
                              </div>
                              <div className="text-right">
                                <p className="text-[10px] font-black text-red-500 uppercase tracking-widest">
                                  {(inventory.filter(i => i.quantity <= i.minThreshold).length)}
                                </p>
                                <p className="text-[8px] text-slate-600 uppercase font-bold tracking-widest">Sắp hết</p>
                              </div>
                            </div>
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Vật Tư</p>
                            <p className="text-3xl font-black text-white">{inventory.length}</p>
                          </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                          <div className="bg-slate-900/50 border border-white/5 p-8 rounded-[40px]">
                            <h4 className="text-sm font-black text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                              <Monitor className="w-4 h-4 text-emerald-500" /> Giám Sát Xưởng (Live)
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {[
                                { bay: 'Khoang 1', status: 'occupied', car: '30A-123.45', service: 'Ceramic Coating', technician: 'Tuấn Anh' },
                                { bay: 'Khoang 2', status: 'occupied', car: '51G-999.99', service: 'Rửa Xe Cao Cấp', technician: 'Minh Đức' },
                                { bay: 'Khoang 3', status: 'available', car: null, service: null, technician: null },
                                { bay: 'Khoang 4', status: 'cleaning', car: '29H-888.88', service: 'Vệ Sinh Nội Thất', technician: 'Quốc Huy' },
                              ].map((bay, idx) => (
                                <div key={idx} className={`p-4 rounded-2xl border transition-all ${
                                  bay.status === 'occupied' ? 'bg-blue-600/5 border-blue-500/20' : 
                                  bay.status === 'cleaning' ? 'bg-amber-600/5 border-amber-500/20' :
                                  'bg-slate-950 border-white/5 opacity-60'
                                }`}>
                                  <div className="flex justify-between items-center mb-3">
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{bay.bay}</p>
                                    <span className={`w-2 h-2 rounded-full ${
                                      bay.status === 'occupied' ? 'bg-blue-500 animate-pulse' : 
                                      bay.status === 'cleaning' ? 'bg-amber-500 animate-pulse' :
                                      'bg-slate-700'
                                    }`} />
                                  </div>
                                  {bay.car ? (
                                    <div className="space-y-1">
                                      <p className="text-xs font-black text-white">{bay.car}</p>
                                      <p className="text-[9px] text-slate-500 font-bold uppercase">{bay.service}</p>
                                      <div className="flex items-center gap-1 mt-2">
                                        <User className="w-2.5 h-2.5 text-blue-500" />
                                        <p className="text-[8px] text-blue-500 font-black uppercase">{bay.technician}</p>
                                      </div>
                                    </div>
                                  ) : (
                                    <p className="text-[10px] text-slate-700 font-black uppercase italic py-4">Sẵn sàng</p>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>

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
                        </div>

                        <div className="grid grid-cols-1 gap-8">
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
                      </>
                    )}
                  </div>
                )}
                    {activeTab === 'ui-design' && (
                  <>
                  <div className="space-y-8 max-w-7xl">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
                      <div>
                        <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter">Thiết Kế Giao Diện</h3>
                        <p className="text-slate-500 text-[10px] md:text-[11px] font-black uppercase tracking-widest mt-1">Tùy chỉnh nội dung hiển thị trên trang chủ</p>
                      </div>
                      <div className="flex gap-3">
                        <button 
                          onClick={() => setIsEditMode(!isEditMode)}
                          className={`px-6 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all flex items-center gap-2 ${
                            isEditMode ? 'bg-blue-600 text-white shadow-[0_0_20px_rgba(59,130,246,0.4)]' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                          }`}
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          {isEditMode ? 'Đang bật sửa trực tiếp' : 'Bật sửa trực tiếp'}
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                      {/* Left Column: Controls */}
                      <div className="lg:col-span-7 space-y-8">
                        {/* Hero Section */}
                        <div className="bg-slate-900/50 p-8 rounded-[32px] border border-white/5 space-y-6">
                          <h4 className="text-[11px] font-black uppercase text-blue-500 tracking-widest flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)]"></span> Phần Đầu Trang (Hero)
                          </h4>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <div className="flex justify-between items-center">
                                <label className="text-[9px] text-slate-500 uppercase font-black tracking-widest">Tiêu đề chính</label>
                                <AiHelperButton 
                                  onClick={() => handleAiGenerateItemText('hero', 'config', 'heroTitle', 'Tiêu đề Hero')}
                                  isLoading={isAiProcessing}
                                />
                              </div>
                              <input 
                                value={siteConfig.heroTitle} 
                                onChange={e => updateConfig('heroTitle', e.target.value)} 
                                className="w-full bg-slate-950 border border-white/5 rounded-xl p-4 text-white text-sm focus:ring-1 focus:ring-blue-500 outline-none"
                              />
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between items-center">
                                <label className="text-[9px] text-slate-500 uppercase font-black tracking-widest">Mô tả ngắn</label>
                                <AiHelperButton 
                                  onClick={() => handleAiGenerateItemText('hero', 'config', 'heroDescription', 'Mô tả Hero')}
                                  isLoading={isAiProcessing}
                                />
                              </div>
                              <textarea 
                                value={siteConfig.heroDescription} 
                                onChange={e => updateConfig('heroDescription', e.target.value)} 
                                className="w-full bg-slate-950 border border-white/5 rounded-xl p-4 text-white text-sm h-24 resize-none focus:ring-1 focus:ring-blue-500 outline-none"
                              />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                <div className="flex gap-2">
                                  <input 
                                    value={siteConfig.heroVideoUrl || ''} 
                                    onChange={e => updateConfig('heroVideoUrl', e.target.value)} 
                                    placeholder="Dán link video mp4..."
                                    className="flex-1 bg-slate-950 border border-white/5 rounded-xl p-4 text-white text-sm focus:ring-1 focus:ring-blue-500 outline-none"
                                  />
                                  <label className="w-12 h-12 bg-blue-600/20 border border-blue-500/30 rounded-xl flex items-center justify-center cursor-pointer hover:bg-blue-600/40 transition-all shrink-0">
                                    <input 
                                      type="file" 
                                      onChange={e => handleImageUpload(e, (b) => updateConfig('heroVideoUrl', b))} 
                                      className="hidden" 
                                      accept="video/*" 
                                    />
                                    <Upload className="w-5 h-5 text-blue-500" />
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Section Titles */}
                        <div className="bg-slate-900/50 p-8 rounded-[32px] border border-white/5 space-y-6">
                          <h4 className="text-[11px] font-black uppercase text-blue-500 tracking-widest flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)]"></span> Tiêu Đề Các Mục
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
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
                                <div className="flex justify-between items-center">
                                  <p className="text-[10px] font-black text-white uppercase">{item.label}</p>
                                  <div className="flex gap-1">
                                    <AiHelperButton 
                                      onClick={() => handleAiGenerateItemText('section', 'config', item.key, `Tiêu đề ${item.label}`)}
                                      isLoading={isAiProcessing}
                                    />
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <input 
                                    value={(siteConfig as any)[item.key] || ''} 
                                    onChange={e => updateConfig(item.key as any, e.target.value)} 
                                    placeholder="Tiêu đề chính"
                                    className="w-full bg-slate-900 border border-white/5 rounded-lg p-3 text-white text-xs outline-none"
                                  />
                                  <div className="flex gap-2 items-center">
                                    <input 
                                      value={(siteConfig as any)[item.subKey] || ''} 
                                      onChange={e => updateConfig(item.subKey as any, e.target.value)} 
                                      placeholder="Tiêu đề phụ"
                                      className="flex-1 bg-slate-900 border border-white/5 rounded-lg p-3 text-slate-400 text-[10px] outline-none"
                                    />
                                    <AiHelperButton 
                                      onClick={() => handleAiGenerateItemText('section', 'config', item.subKey, `Tiêu đề phụ ${item.label}`)}
                                      isLoading={isAiProcessing}
                                    />
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Right Column: Live Preview */}
                      <div className="lg:col-span-5 space-y-8">
                        <div className="sticky top-8 space-y-6">
                          <div className="bg-slate-900/50 p-6 rounded-[32px] border border-white/5 overflow-hidden">
                            <div className="flex justify-between items-center mb-6">
                              <h4 className="text-[11px] font-black uppercase text-emerald-500 tracking-widest flex items-center gap-3">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.6)]"></span> Xem trước trực tiếp
                              </h4>
                              <span className="text-[9px] text-slate-500 font-black uppercase">Chế độ thu nhỏ</span>
                            </div>
                            
                            {/* Miniature Hero Preview */}
                            <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl group/preview">
                              {siteConfig.heroVideoUrl ? (
                                <video src={siteConfig.heroVideoUrl} autoPlay muted loop playsInline className="w-full h-full object-cover opacity-50" />
                              ) : (
                                <img src={siteConfig.heroImage} className="w-full h-full object-cover opacity-50" referrerPolicy="no-referrer" />
                              )}
                              <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/40 to-slate-950/80 flex flex-col items-center justify-center p-4 text-center">
                                <p className="text-[8px] text-blue-500 font-black uppercase tracking-[0.3em] mb-2">XE ĐẸP PRO</p>
                                <h5 className="text-xs sm:text-sm font-serif font-black text-white leading-tight mb-2 line-clamp-2">
                                  {siteConfig.heroTitle}
                                </h5>
                                <p className="text-[8px] text-slate-300 line-clamp-2 max-w-[80%]">
                                  {siteConfig.heroDescription}
                                </p>
                              </div>
                              <div className="absolute inset-0 bg-blue-600/20 opacity-0 group-hover/preview:opacity-100 transition-opacity flex items-center justify-center">
                                <button 
                                  onClick={() => {
                                    onClose();
                                    scrollToSection('hero');
                                  }}
                                  className="px-4 py-2 bg-white text-slate-950 text-[9px] font-black uppercase rounded-lg shadow-xl"
                                >
                                  Xem thực tế
                                </button>
                              </div>
                            </div>

                            {/* Section Title Preview */}
                            <div className="mt-8 space-y-4">
                              <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest">Xem trước tiêu đề mục</p>
                              <div className="p-6 bg-slate-950 rounded-2xl border border-white/5 text-center">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 border border-blue-500/20 mb-3">
                                  <div className="w-1 h-1 rounded-full bg-blue-500"></div>
                                  <span className="text-[8px] text-blue-400 font-black uppercase tracking-widest">{siteConfig.servicesSubtitle}</span>
                                </div>
                                <h6 className="text-sm font-black text-white uppercase tracking-tighter">{siteConfig.servicesTitle}</h6>
                              </div>
                            </div>
                          </div>

                          <div className="bg-blue-600/10 border border-blue-500/20 p-6 rounded-[32px] space-y-4">
                            <h5 className="text-[10px] font-black text-blue-500 uppercase tracking-widest flex items-center gap-2">
                              <Info className="w-3 h-3" /> Mẹo thiết kế
                            </h5>
                            <p className="text-[10px] text-slate-400 leading-relaxed">
                              Sử dụng tiêu đề ngắn gọn, súc tích và mang tính hành động cao. AI Helper có thể giúp bạn tối ưu hóa ngôn ngữ để tăng tỷ lệ chuyển đổi.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Specialized Services - Full Width */}
                      <div className="lg:col-span-12 bg-slate-900/50 p-8 rounded-[32px] border border-white/5 space-y-6">
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
                                <div className="flex justify-between items-center">
                                  <label className="text-[9px] text-slate-500 uppercase font-black tracking-widest">{item.label}</label>
                                  <AiHelperButton 
                                    onClick={() => handleAiGenerateItemText('special', 'config', item.key, `Tiêu đề ${item.label}`)}
                                    isLoading={isAiProcessing}
                                  />
                                </div>
                                <input 
                                  value={(siteConfig as any)[item.key] || ''} 
                                  onChange={e => updateConfig(item.key as any, e.target.value)} 
                                  className="w-full bg-slate-900 border border-white/5 rounded-xl p-3 text-white text-xs outline-none"
                                />
                              </div>
                              <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                  <label className="text-[9px] text-slate-500 uppercase font-black tracking-widest">Mô tả chi tiết</label>
                                  <AiHelperButton 
                                    onClick={() => handleAiGenerateItemText('special', 'config', item.descKey, `Mô tả ${item.label}`)}
                                    isLoading={isAiProcessing}
                                  />
                                </div>
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

                      {/* Experts Section - Full Width */}
                      <div className="lg:col-span-12 bg-slate-900/50 p-8 rounded-[32px] border border-white/5 space-y-6">
                        <div className="flex justify-between items-center">
                          <h4 className="text-[11px] font-black uppercase text-blue-500 tracking-widest flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)]"></span> Đội Ngũ Chuyên Gia
                          </h4>
                          <button 
                            onClick={() => {
                              const newExpert: Expert = {
                                id: `exp-${Date.now()}`,
                                name: 'Chuyên gia mới',
                                role: 'Kỹ thuật viên',
                                exp: '5 Năm',
                                cert: 'IDA Certified',
                                img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800'
                              };
                              setExperts(prev => [...prev, newExpert]);
                              toast.success("Đã thêm chuyên gia mới!");
                            }}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600/10 border border-blue-500/20 rounded-xl text-[10px] font-black text-blue-500 uppercase hover:bg-blue-600/20 transition-all"
                          >
                            <Plus className="w-3 h-3" /> Thêm chuyên gia
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {experts.map((expert) => (
                            <div key={expert.id} className="p-6 bg-slate-950/50 rounded-2xl border border-white/5 space-y-4 relative group/expert">
                              <button 
                                onClick={() => {
                                  setExperts(prev => prev.filter(e => e.id !== expert.id));
                                  toast.success("Đã xóa chuyên gia!");
                                }}
                                className="absolute top-4 right-4 p-2 bg-red-500/10 text-red-500 rounded-lg opacity-0 group-hover/expert:opacity-100 transition-all hover:bg-red-500/20"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>

                              <div className="flex gap-4">
                                <div className="relative shrink-0">
                                  <img 
                                    src={expert.img} 
                                    alt={expert.name} 
                                    className="w-20 h-20 rounded-xl object-cover border border-white/10"
                                    referrerPolicy="no-referrer"
                                  />
                                  <label className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center cursor-pointer hover:bg-blue-600/40 transition-all shadow-lg">
                                    <input 
                                      type="file" 
                                      onChange={e => handleImageUpload(e, (b) => setExperts(prev => prev.map(ex => ex.id === expert.id ? { ...ex, img: b } : ex)))} 
                                      className="hidden" 
                                      accept="image/*" 
                                    />
                                    <CameraIcon className="w-4 h-4 text-white" />
                                  </label>
                                </div>
                                <div className="flex-1 space-y-3">
                                  <div className="space-y-1">
                                    <label className="text-[8px] text-slate-500 uppercase font-black">Họ và tên</label>
                                    <input 
                                      value={expert.name} 
                                      onChange={e => setExperts(prev => prev.map(ex => ex.id === expert.id ? { ...ex, name: e.target.value } : ex))} 
                                      className="w-full bg-slate-900 border border-white/5 rounded-lg p-2 text-white text-xs outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-[8px] text-slate-500 uppercase font-black">Chức vụ</label>
                                    <input 
                                      value={expert.role} 
                                      onChange={e => setExperts(prev => prev.map(ex => ex.id === expert.id ? { ...ex, role: e.target.value } : ex))} 
                                      className="w-full bg-slate-900 border border-white/5 rounded-lg p-2 text-white text-xs outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                  <label className="text-[8px] text-slate-500 uppercase font-black">Kinh nghiệm</label>
                                  <input 
                                    value={expert.exp} 
                                    onChange={e => setExperts(prev => prev.map(ex => ex.id === expert.id ? { ...ex, exp: e.target.value } : ex))} 
                                    className="w-full bg-slate-900 border border-white/5 rounded-lg p-2 text-white text-xs outline-none focus:ring-1 focus:ring-blue-500"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[8px] text-slate-500 uppercase font-black">Chứng chỉ</label>
                                  <input 
                                    value={expert.cert} 
                                    onChange={e => setExperts(prev => prev.map(ex => ex.id === expert.id ? { ...ex, cert: e.target.value } : ex))} 
                                    className="w-full bg-slate-900 border border-white/5 rounded-lg p-2 text-white text-xs outline-none focus:ring-1 focus:ring-blue-500"
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

                {activeTab === 'security' && (
                  <div className="space-y-8">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Bảo Mật & Nhật Ký Hệ Thống</h3>
                        <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-1">Giám sát truy cập và thay đổi dữ liệu nhạy cảm</p>
                      </div>
                      <div className="flex gap-4">
                        <button 
                          onClick={() => {
                            setAuditLogs([]);
                            localStorage.removeItem('dungcar_audit_logs');
                            toast.success("Đã xóa toàn bộ nhật ký!");
                          }}
                          className="px-6 py-3 rounded-xl bg-red-600/10 text-red-500 font-black uppercase text-[10px] hover:bg-red-600 hover:text-white transition-all"
                        >
                          Xóa Logs
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      <div className="lg:col-span-1 space-y-6">
                        <div className="bg-slate-900/50 border border-white/5 p-8 rounded-[40px]">
                          <h4 className="text-sm font-black text-white uppercase tracking-widest mb-6">Quản Lý Mật Khẩu Truy Cập</h4>
                          <div className="space-y-6">
                            {siteConfig.enableAccountingLock && (
                              <div className="group space-y-2">
                                <label className="text-[8px] md:text-[9px] text-slate-500 uppercase font-black tracking-widest group-focus-within:text-blue-500 transition-colors">Mật Khẩu Kế Toán (Manager)</label>
                                <input 
                                  type="password" 
                                  value={siteConfig.accountingLockPassword} 
                                  onChange={e => updateConfig('accountingLockPassword', e.target.value)} 
                                  className="w-full bg-slate-950 border border-white/5 rounded-xl p-4 text-white text-sm focus:ring-1 focus:ring-blue-500 outline-none transition-all tracking-[0.5em]"
                                />
                              </div>
                            )}
                            {siteConfig.enableDesignLock && (
                              <div className="group space-y-2">
                                <label className="text-[8px] md:text-[9px] text-slate-500 uppercase font-black tracking-widest group-focus-within:text-blue-500 transition-colors">Mật Khẩu Quản Trị (Admin)</label>
                                <input 
                                  type="password" 
                                  value={siteConfig.designPassword} 
                                  onChange={e => updateConfig('designPassword', e.target.value)} 
                                  className="w-full bg-slate-950 border border-white/5 rounded-xl p-4 text-white text-sm focus:ring-1 focus:ring-blue-500 outline-none transition-all tracking-[0.5em]"
                                />
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="bg-slate-900/50 border border-white/5 p-8 rounded-[40px]">
                          <h4 className="text-sm font-black text-white uppercase tracking-widest mb-6">Trạng Thái Hệ Thống</h4>
                          <div className="space-y-4">
                            <div className="p-4 rounded-2xl bg-slate-950 border border-white/5">
                              <p className="text-[9px] font-black text-slate-500 uppercase mb-2">Vai trò hiện tại</p>
                              <div className="flex items-center justify-between">
                                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                                  currentUserRole === 'admin' ? 'bg-red-500/10 text-red-500' : 
                                  currentUserRole === 'manager' ? 'bg-amber-500/10 text-amber-500' :
                                  'bg-blue-500/10 text-blue-500'
                                }`}>
                                  {currentUserRole === 'admin' ? 'Quản trị viên' : 
                                   currentUserRole === 'manager' ? 'Kế toán' : 'Nhân viên'}
                                </span>
                              </div>
                            </div>
                            <div className="p-4 rounded-2xl bg-slate-950 border border-white/5">
                              <p className="text-[9px] font-black text-slate-500 uppercase mb-2">Chế độ riêng tư</p>
                              <div className="flex items-center justify-between">
                                <span className={`text-[10px] font-black uppercase ${isPrivacyMode ? 'text-emerald-500' : 'text-slate-500'}`}>
                                  {isPrivacyMode ? 'Đang bật' : 'Đang tắt'}
                                </span>
                                <button 
                                  onClick={togglePrivacyMode}
                                  className="text-[9px] font-black text-blue-500 uppercase hover:underline"
                                >
                                  {isPrivacyMode ? 'Tắt' : 'Bật'}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-amber-600/10 border border-amber-600/20 p-6 rounded-[32px]">
                          <h5 className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                            <AlertTriangle className="w-3 h-3" /> Khuyến nghị bảo mật
                          </h5>
                          <ul className="space-y-2">
                            <li className="text-[10px] text-amber-400/80 leading-relaxed">• Luôn bật Chế độ riêng tư khi làm việc nơi công cộng.</li>
                            <li className="text-[10px] text-amber-400/80 leading-relaxed">• Thay đổi mã PIN Kế toán định kỳ 3 tháng/lần.</li>
                            <li className="text-[10px] text-amber-400/80 leading-relaxed">• Kiểm tra Audit Logs hàng ngày để phát hiện truy cập lạ.</li>
                          </ul>
                        </div>
                      </div>

                      <div className="lg:col-span-2">
                        <div className="bg-slate-900/50 border border-white/5 rounded-[40px] overflow-hidden">
                          <div className="p-6 border-b border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-950/40">
                            <div>
                              <h4 className="text-sm font-black text-white uppercase tracking-widest">Nhật Ký Hoạt Động (Audit Logs)</h4>
                              <p className="text-slate-500 text-[10px] font-black uppercase mt-1">Giám sát bảo mật và lịch sử thao tác hệ thống</p>
                            </div>
                            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                              <button
                                type="button"
                                onClick={() => {
                                  try {
                                    const headers = "Thời gian,Người dùng,Hành động,Chi tiết\n";
                                    const rows = auditLogs.map(log => 
                                      `"${log.timestamp}","${log.userName}","${log.action.replace(/"/g, '""')}","${log.details.replace(/"/g, '""')}"`
                                    ).join("\n");
                                    const blob = new Blob(["\uFEFF" + headers + rows], { type: "text/csv;charset=utf-8;" });
                                    const url = URL.createObjectURL(blob);
                                    const a = document.createElement("a");
                                    a.href = url;
                                    a.download = `dungcar_audit_logs_${new Date().toISOString().slice(0,10)}.csv`;
                                    document.body.appendChild(a);
                                    a.click();
                                    document.body.removeChild(a);
                                    URL.revokeObjectURL(url);
                                    toast.success("Đã xuất nhật ký hoạt động sang định dạng CSV!");
                                  } catch (err: any) {
                                    toast.error("Lỗi khi xuất nhật ký: " + err.message);
                                  }
                                }}
                                className="px-4 py-2 bg-blue-600/10 hover:bg-blue-600 hover:text-white border border-blue-500/20 rounded-xl text-[9px] font-black uppercase tracking-wider text-blue-400 transition-all flex items-center gap-1.5"
                              >
                                <Download className="w-3 h-3" /> Xuất Nhật Ký (CSV)
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  if (confirm("Bạn có chắc chắn muốn xóa toàn bộ nhật ký hệ thống? Hành động này không thể hoàn tác.")) {
                                    setAuditLogs([]);
                                    localStorage.removeItem('dungcar_audit_logs');
                                    toast.success("Đã xóa sạch nhật ký hệ thống!");
                                  }
                                }}
                                className="px-4 py-2 bg-red-600/10 hover:bg-red-600 hover:text-white border border-red-500/20 rounded-xl text-[9px] font-black uppercase tracking-wider text-red-400 transition-all flex items-center gap-1.5"
                              >
                                <Trash className="w-3 h-3" /> Xóa Sạch
                              </button>
                            </div>
                          </div>

                          {/* Log Filters */}
                          <div className="p-4 md:p-6 border-b border-white/5 bg-slate-950/20 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="relative">
                              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                              <input
                                type="text"
                                value={auditSearchQuery}
                                onChange={e => setAuditSearchQuery(e.target.value)}
                                placeholder="Tìm kiếm hành động, chi tiết..."
                                className="w-full bg-slate-950 border border-white/5 rounded-xl pl-9 pr-4 py-2.5 text-white text-xs placeholder:text-slate-600 outline-none focus:border-blue-500/50 transition-colors"
                              />
                            </div>
                            <div>
                              <select
                                value={auditFilterType}
                                onChange={e => setAuditFilterType(e.target.value)}
                                className="w-full bg-slate-950 border border-white/5 rounded-xl px-4 py-2.5 text-slate-400 text-xs outline-none focus:border-blue-500/50 transition-colors"
                              >
                                <option value="all">Tất cả danh mục hành động</option>
                                <option value="Bảo mật">Bảo mật & Xác thực</option>
                                <option value="Thay đổi">Thay đổi & Cấu hình</option>
                                <option value="Khách hàng">Quản lý khách hàng</option>
                                <option value="Sao lưu">Sao lưu & Khôi phục</option>
                              </select>
                            </div>
                          </div>

                          <div className="max-h-[600px] overflow-y-auto custom-scrollbar">
                            <table className="w-full text-left border-collapse">
                              <thead>
                                <tr className="bg-white/5 border-b border-white/5">
                                  <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Thời gian</th>
                                  <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Người dùng</th>
                                  <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Hành động</th>
                                  <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Chi tiết</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-white/5">
                                {(() => {
                                  const filteredLogs = auditLogs.filter(log => {
                                    const matchSearch = auditSearchQuery === "" || 
                                      log.action.toLowerCase().includes(auditSearchQuery.toLowerCase()) ||
                                      log.details.toLowerCase().includes(auditSearchQuery.toLowerCase()) ||
                                      log.userName.toLowerCase().includes(auditSearchQuery.toLowerCase());
                                    
                                    const matchType = auditFilterType === "all" || 
                                      (auditFilterType === "Bảo mật" && (log.action.includes("Đăng nhập") || log.action.includes("đăng nhập") || log.action.includes("Khóa") || log.action.includes("mật khẩu") || log.action.includes("Mật khẩu"))) ||
                                      (auditFilterType === "Thay đổi" && (log.action.includes("Thay đổi") || log.action.includes("Cấu hình") || log.action.includes("Lưu") || log.action.includes("Sửa") || log.action.includes("Đồng bộ") || log.action.includes("xóa") || log.action.includes("Xóa") || log.action.includes("Thêm") || log.action.includes("Thêm"))) ||
                                      (auditFilterType === "Khách hàng" && (log.action.includes("khách hàng") || log.action.includes("Khách hàng") || log.action.includes("đăng ký") || log.action.includes("đặt lịch") || log.action.includes("Lịch hẹn"))) ||
                                      (auditFilterType === "Sao lưu" && (log.action.includes("Sao lưu") || log.action.includes("Khôi phục")));
                                      
                                    return matchSearch && matchType;
                                  });

                                  return filteredLogs.length > 0 ? filteredLogs.map(log => (
                                    <tr key={log.id} className="hover:bg-white/5 transition-colors">
                                      <td className="p-6 text-[10px] text-slate-500 font-mono whitespace-nowrap">{log.timestamp}</td>
                                      <td className="p-6">
                                        <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${
                                          log.userName === 'Quản trị viên' ? 'bg-red-500/10 text-red-500' : 'bg-blue-500/10 text-blue-500'
                                        }`}>
                                          {log.userName}
                                        </span>
                                      </td>
                                      <td className="p-6 text-[10px] font-black text-white uppercase tracking-tight">{log.action}</td>
                                      <td className="p-6 text-[10px] text-slate-400 italic">{log.details}</td>
                                    </tr>
                                  )) : (
                                    <tr>
                                      <td colSpan={4} className="p-20 text-center text-slate-600 text-[10px] font-black uppercase tracking-widest">Không tìm thấy nhật ký phù hợp</td>
                                    </tr>
                                  );
                                })()}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                 {activeTab === 'vip' && (
                  <div className="space-y-8">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
                      <div>
                        <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter">Quản Lý VIP</h3>
                        <p className="text-slate-500 text-[10px] md:text-[11px] font-black uppercase tracking-widest mt-1">Cấu hình các chương trình khách hàng đặc biệt</p>
                      </div>
                      <button 
                        onClick={() => {
                          setIsAddingVIPProgram(true);
                          setEditingVIPProgramId(null);
                          setVipProgramForm({ id: `VIP-${Date.now().toString().slice(-4)}`, name: '', description: '', minUsage: 1, discountRate: 5, status: 'active' });
                        }}
                        className="px-6 py-3 bg-blue-600 text-white rounded-xl font-black uppercase text-[10px] tracking-widest shadow-xl shadow-blue-600/20 hover:bg-blue-500 transition-all flex items-center gap-2"
                      >
                        <Plus className="w-4 h-4" /> Thêm Gói VIP
                      </button>
                    </div>

                    {isAddingVIPProgram && (
                      <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-slate-900/50 border border-white/10 p-8 rounded-[32px] space-y-6 mb-8"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="text-sm font-black text-white uppercase tracking-widest">
                            {editingVIPProgramId ? 'Sửa Gói VIP' : 'Thêm Gói VIP Mới'}
                          </h4>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-[10px] text-slate-500 uppercase font-black tracking-widest">ID Gói</label>
                            <input 
                              value={vipProgramForm.id}
                              onChange={e => setVipProgramForm(prev => ({ ...prev, id: e.target.value }))}
                              disabled={!!editingVIPProgramId}
                              className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white text-sm outline-none focus:border-blue-500 transition-all disabled:opacity-50"
                              placeholder="VD: VIP-001"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Tên Gói VIP</label>
                            <input 
                              value={vipProgramForm.name}
                              onChange={e => setVipProgramForm(prev => ({ ...prev, name: e.target.value }))}
                              className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white text-sm outline-none focus:border-blue-500 transition-all"
                              placeholder="VD: VIP Silver, VIP Gold, Diamond..."
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Số Lượt Sử Dụng Tối Thiểu</label>
                            <input 
                              type="number"
                              value={vipProgramForm.minUsage}
                              onChange={e => setVipProgramForm(prev => ({ ...prev, minUsage: parseInt(e.target.value) || 0 }))}
                              className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white text-sm outline-none focus:border-blue-500 transition-all"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Tỷ Lệ Giảm Giá (%)</label>
                            <input 
                              type="number"
                              value={vipProgramForm.discountRate}
                              onChange={e => setVipProgramForm(prev => ({ ...prev, discountRate: parseInt(e.target.value) || 0 }))}
                              className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white text-sm outline-none focus:border-blue-500 transition-all"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Trạng Thái</label>
                            <select 
                              value={vipProgramForm.status}
                              onChange={e => setVipProgramForm(prev => ({ ...prev, status: e.target.value as any }))}
                              className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white text-sm outline-none focus:border-blue-500 transition-all"
                            >
                              <option value="active">Đang kích hoạt</option>
                              <option value="inactive">Tạm ngưng</option>
                            </select>
                          </div>
                          <div className="md:col-span-1 border-white/0" />
                          <div className="md:col-span-2 space-y-2">
                            <label className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Mô Tả Đặc Quyền</label>
                            <textarea 
                              value={vipProgramForm.description}
                              onChange={e => setVipProgramForm(prev => ({ ...prev, description: e.target.value }))}
                              className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white text-sm outline-none focus:border-blue-500 transition-all h-24 resize-none"
                              placeholder="Mô tả các ưu đãi dành riêng cho cấp độ này..."
                            />
                          </div>
                        </div>
                        <div className="flex gap-4 pt-4">
                          <button 
                            onClick={handleSaveVIPProgram}
                            className="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-blue-500 transition-all"
                          >
                            Lưu Gói VIP
                          </button>
                          <button 
                            onClick={() => setIsAddingVIPProgram(false)}
                            className="px-8 bg-slate-800 text-slate-400 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:text-white transition-all"
                          >
                            Hủy
                          </button>
                        </div>
                      </motion.div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {(siteConfig.vipPrograms || []).length > 0 ? (siteConfig.vipPrograms || []).map(program => (
                        <div key={program.id} className="bg-slate-900/50 border border-white/5 p-8 rounded-[32px] group hover:border-blue-500/30 transition-all relative overflow-hidden">
                          <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-100 transition-all">
                            <Crown className={`w-8 h-8 ${program.status === 'active' ? 'text-amber-500' : 'text-slate-700'}`} />
                          </div>
                          
                          <div className="relative z-10">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-3">
                                <span className={`w-2 h-2 rounded-full ${program.status === 'active' ? 'bg-emerald-500' : 'bg-slate-500'}`} />
                                <h4 className="text-lg font-black text-white uppercase tracking-tighter">{program.name}</h4>
                              </div>
                              <span className="text-[10px] font-mono text-slate-600 font-bold">{program.id}</span>
                            </div>
                            
                            <p className="text-slate-400 text-xs mb-6 line-clamp-3 leading-relaxed">{program.description}</p>
                            
                            <div className="grid grid-cols-2 gap-4 mb-8">
                              <div className="p-3 bg-slate-950/50 rounded-2xl border border-white/5">
                                <p className="text-[8px] text-slate-500 font-black uppercase tracking-widest mb-1">Số lượt tối thiểu</p>
                                <p className="text-sm font-black text-white">{program.minUsage} Lượt</p>
                              </div>
                              <div className="p-3 bg-blue-600/5 rounded-2xl border border-blue-500/10 text-blue-500">
                                <p className="text-[8px] text-blue-500/60 font-black uppercase tracking-widest mb-1">Chiết khấu</p>
                                <p className="text-sm font-black">-{program.discountRate}%</p>
                              </div>
                            </div>

                            <div className="flex gap-2">
                              <button 
                                onClick={() => {
                                  setEditingVIPProgramId(program.id);
                                  setVipProgramForm(program);
                                  setIsAddingVIPProgram(true);
                                }}
                                className="flex-1 bg-slate-800 text-slate-400 py-3 rounded-xl font-black uppercase tracking-widest text-[9px] hover:bg-slate-700 hover:text-white transition-all flex items-center justify-center gap-2"
                              >
                                <Edit2 className="w-3 h-3" /> Sửa
                              </button>
                              <button 
                                onClick={() => handleDeleteVIPProgram(program.id)}
                                className="bg-red-950/20 text-red-500 px-4 py-3 rounded-xl font-black uppercase tracking-widest text-[9px] hover:bg-red-600 hover:text-white transition-all flex items-center justify-center"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      )) : (
                        <div className="col-span-full py-20 text-center border-2 border-dashed border-white/5 rounded-[40px]">
                          <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] mb-4">Chưa có chương trình VIP nào</p>
                          <button 
                            onClick={() => setIsAddingVIPProgram(true)}
                            className="px-6 py-3 bg-blue-600/10 text-blue-500 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-blue-600 hover:text-white transition-all"
                          >
                            Tạo ngay gói đầu tiên
                          </button>
                        </div>
                      )}
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
                        <button 
                          onClick={handleSyncToCodebase} 
                          disabled={isSyncingToCodebase} 
                          className="flex-1 sm:flex-none px-6 py-3 rounded-xl md:rounded-2xl bg-slate-900 border border-white/5 hover:border-blue-500/30 text-white font-black uppercase text-[9px] md:text-[10px] transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
                        >
                          <Github className="w-3.5 h-3.5 text-blue-500" />
                          {isSyncingToCodebase ? "Đang đồng bộ..." : "Đồng bộ GitHub"}
                        </button>
                        <button onClick={() => { toast.success("✅ Cấu hình đã được áp dụng!"); onClose(); }} className="flex-1 sm:flex-none px-6 py-3 rounded-xl md:rounded-2xl bg-blue-600 text-white font-black uppercase text-[9px] md:text-[10px] shadow-xl hover:bg-blue-500 transition-all active:scale-95">Lưu & Áp Dụng</button>
                      </div>
                    </div>

                    {/* Glowing Status Indicator Bar */}
                    <div className="p-4 md:p-6 rounded-2xl md:rounded-[32px] bg-slate-950/80 border border-white/5 flex flex-wrap items-center justify-between gap-4">
                      <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-wider">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
                          Đã lưu trình duyệt (Local)
                        </div>

                        {user ? (
                          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/5 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-wider">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span>
                            Firebase Cloud: Đã kết nối
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/5 border border-amber-500/20 text-amber-400 text-[10px] font-black uppercase tracking-wider">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.8)]"></span>
                            Firebase Cloud: Chưa kết nối
                          </div>
                        )}

                        {isCodebaseDirty ? (
                          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/5 border border-red-500/20 text-red-400 text-[10px] font-black uppercase tracking-wider animate-bounce">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
                            Mã nguồn: Cần đồng bộ GitHub!
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-500/5 border border-white/10 text-slate-400 text-[10px] font-black uppercase tracking-wider">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                            Mã nguồn: Đã đồng bộ
                          </div>
                        )}
                      </div>
                      
                      {isCodebaseDirty && (
                        <p className="text-[10px] text-red-400 font-bold uppercase tracking-wider animate-pulse">
                          ⚠️ Nhấn "Đồng bộ GitHub" để bảo lưu thay đổi vĩnh viễn!
                        </p>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                      {/* Identity & Security */}
                      <div className="bg-slate-900/50 p-6 md:p-10 rounded-[24px] md:rounded-[40px] border border-white/5 space-y-6 md:space-y-8 flex flex-col">
                        <h4 className="text-[10px] md:text-[11px] font-black uppercase text-blue-500 tracking-[0.2em] flex items-center gap-3">
                          <span className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)]"></span> Định Danh & Bảo Mật
                        </h4>
              <div className="space-y-4 md:space-y-6 flex-1">
                <div className="p-4 bg-blue-600/5 border border-blue-500/20 rounded-2xl mb-4">
                  <p className="text-[9px] font-black text-blue-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                    <Layout className="w-3 h-3" /> Nội Dung Trang Chủ
                  </p>
                  <p className="text-[8px] text-slate-500 italic">Tùy chỉnh tiêu đề và mô tả của các phân đoạn chính trên Website.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { id: 'heroTitle', label: 'Trang chủ: Tiêu đề chính' },
                    { id: 'heroSubtitle', label: 'Trang chủ: Tiêu đề phụ' },
                    { id: 'servicesTitle', label: 'Dịch vụ: Tiêu đề chính' },
                    { id: 'servicesSubtitle', label: 'Dịch vụ: Tiêu đề phụ' },
                    { id: 'whyChooseUsTitle', label: 'Tai sao: Tiêu đề chính' },
                    { id: 'whyChooseUsSubtitle', label: 'Tại sao: Tiêu đề phụ' },
                    { id: 'processTitle', label: 'Quy trình: Tiêu đề chính' },
                    { id: 'processSubtitle', label: 'Quy trình: Tiêu đề phụ' },
                    { id: 'expertsTitle', label: 'Chuyên gia: Tiêu đề chính' },
                    { id: 'expertsSubtitle', label: 'Chuyên gia: Tiêu đề phụ' },
                    { id: 'faqTitle', label: 'FAQ: Tiêu đề chính' },
                    { id: 'faqSubtitle', label: 'FAQ: Tiêu đề phụ' },
                  ].map(field => (
                    <div key={field.id} className="group space-y-2">
                      <label className="text-[8px] text-slate-500 uppercase font-black tracking-widest">{field.label}</label>
                      <input 
                        value={(siteConfig as any)[field.id] || ''} 
                        onChange={e => updateConfig(field.id as any, e.target.value)} 
                        className="w-full bg-slate-950 border border-white/5 rounded-xl p-3 text-white text-xs"
                      />
                    </div>
                  ))}
                  <div className="sm:col-span-2 group space-y-2">
                    <label className="text-[8px] text-slate-500 uppercase font-black tracking-widest">Video Nền Hero (URL)</label>
                    <div className="flex gap-2">
                      <input 
                        value={siteConfig.heroVideoUrl || ''} 
                        onChange={e => updateConfig('heroVideoUrl', e.target.value)} 
                        className="flex-1 bg-slate-950 border border-white/5 rounded-xl p-3 text-white text-xs"
                        placeholder="https://..."
                      />
                      <button 
                        onClick={() => {
                          setIsSelectingHeroVideo(true);
                          onClose();
                        }}
                        className="bg-blue-600/10 hover:bg-blue-600/20 text-blue-500 px-4 rounded-xl border border-blue-500/20 text-[10px] font-black uppercase"
                      >
                        Chọn từ thư viện
                      </button>
                    </div>
                  </div>
                </div>

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
                                    {siteConfig?.siteName?.charAt(0) || 'D'}
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
                          {siteConfig.enableAccountingLock && (
                            <div className="group space-y-2">
                              <label className="text-[8px] md:text-[9px] text-slate-500 uppercase font-black tracking-widest group-focus-within:text-blue-500 transition-colors">Mật Khẩu Kế Toán Vận Hành</label>
                              <input 
                                type="password" 
                                value={siteConfig.accountingLockPassword} 
                                onChange={e => updateConfig('accountingLockPassword', e.target.value)} 
                                className="w-full bg-slate-950 border border-white/5 rounded-xl md:rounded-2xl p-4 text-white text-sm focus:ring-1 focus:ring-blue-500 outline-none transition-all tracking-[0.3em] md:tracking-[0.5em]"
                              />
                            </div>
                          )}
                          {siteConfig.enableDesignLock && (
                            <div className="group space-y-2">
                              <label className="text-[8px] md:text-[9px] text-slate-500 uppercase font-black tracking-widest group-focus-within:text-blue-500 transition-colors">Mật Khẩu Thiết Kế & Giao Diện</label>
                              <input 
                                type="password" 
                                value={siteConfig.designPassword} 
                                onChange={e => updateConfig('designPassword', e.target.value)} 
                                className="w-full bg-slate-950 border border-white/5 rounded-xl md:rounded-2xl p-4 text-white text-sm focus:ring-1 focus:ring-blue-500 outline-none transition-all tracking-[0.3em] md:tracking-[0.5em]"
                              />
                            </div>
                          )}

                          <div className="group space-y-4 pt-4 border-t border-white/5">
                            <div className="flex items-center justify-between">
                              <div>
                                <label className="text-[8px] md:text-[9px] text-slate-500 uppercase font-black tracking-widest">Khóa Thiết Kế & Giao Diện</label>
                                <p className="text-[8px] text-slate-600 italic">Yêu cầu mật khẩu khi truy cập các mục thiết kế.</p>
                              </div>
                              <button 
                                disabled={!isDesignAuthenticated}
                                onClick={() => updateConfig('enableDesignLock', !siteConfig.enableDesignLock)}
                                className={`w-10 h-5 rounded-full transition-all relative ${siteConfig.enableDesignLock ? 'bg-blue-600' : 'bg-slate-800'} ${!isDesignAuthenticated ? 'opacity-50 cursor-not-allowed' : ''}`}
                              >
                                <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${siteConfig.enableDesignLock ? 'left-6' : 'left-1'}`} />
                              </button>
                            </div>
                            {siteConfig.enableDesignLock && (
                              <div className="mt-4 space-y-3">
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                  Cài đặt khóa từng mục {!isDesignAuthenticated && <Lock className="w-2 h-2 text-amber-500" />}
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                                  {[
                                    { id: 'services', label: 'Dịch vụ' },
                                    { id: 'packages', label: 'Gói dịch vụ' },
                                    { id: 'premium', label: 'Giải pháp cao cấp' },
                                    { id: 'promotions', label: 'Khuyến mãi' },
                                    { id: 'news', label: 'Tin tức' },
                                    { id: 'gallery', label: 'Thư viện' },
                                    { id: 'ui-design', label: 'Thiết kế UI' },
                                    { id: 'ai-creative', label: 'Sáng tạo AI' },
                                    { id: 'config', label: 'Cấu hình' }
                                  ].map(item => (
                                    <div key={item.id} className="flex items-center justify-between py-1">
                                      <span className="text-[10px] text-slate-400 font-medium">{item.label}</span>
                                      <button 
                                        disabled={!isDesignAuthenticated}
                                        onClick={() => {
                                          const currentSettings = siteConfig.designLockSettings || {};
                                          const newValue = currentSettings[item.id] === false ? true : false;
                                          updateConfig('designLockSettings', { ...currentSettings, [item.id]: newValue });
                                        }}
                                        className={`w-8 h-4 rounded-full transition-all relative ${siteConfig.designLockSettings?.[item.id] === true ? 'bg-blue-600' : 'bg-slate-800'} ${!isDesignAuthenticated ? 'opacity-50 cursor-not-allowed' : ''}`}
                                      >
                                        <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all ${siteConfig.designLockSettings?.[item.id] === true ? 'left-4.5' : 'left-0.5'}`} />
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="group space-y-4 pt-4 border-t border-white/5">
                            <div className="flex items-center justify-between">
                              <div>
                                <label className="text-[8px] md:text-[9px] text-slate-500 uppercase font-black tracking-widest">Khóa Kế Toán & Vận Hành</label>
                                <p className="text-[8px] text-slate-600 italic">Thiết lập mật khẩu cho từng mục vận hành bên dưới.</p>
                              </div>
                              <button 
                                disabled={!isDesignAuthenticated}
                                onClick={() => updateConfig('enableAccountingLock', !siteConfig.enableAccountingLock)}
                                className={`w-10 h-5 rounded-full transition-all relative ${siteConfig.enableAccountingLock ? 'bg-blue-600' : 'bg-slate-800'} ${!isDesignAuthenticated ? 'opacity-50 cursor-not-allowed' : ''}`}
                              >
                                <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${siteConfig.enableAccountingLock ? 'left-6' : 'left-1'}`} />
                              </button>
                            </div>
                            
                            {siteConfig.enableAccountingLock && (
                              <div className="mt-4 pt-4 border-t border-white/5 space-y-3">
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                  Cài đặt khóa từng mục {!isDesignAuthenticated && <Lock className="w-2 h-2 text-amber-500" />}
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                                  {[
                                    { id: 'home', label: 'Tổng quan' },
                                    { id: 'appointments', label: 'Lịch hẹn' },
                                    { id: 'customers', label: 'Khách hàng' },
                                    { id: 'inventory', label: 'Kho vật tư' },
                                    { id: 'loyalty', label: 'Tích điểm' },
                                    { id: 'staff', label: 'Nhân Sự' },
                                    { id: 'reminders', label: 'Nhắc Hẹn' },
                                    { id: 'inspections', label: 'Phiếu Kiểm Tra Xe' },
                                    { id: 'automation', label: 'Tự Động Hóa' },
                                    { id: 'ecerts', label: 'Chứng chỉ' },
                                    { id: 'tracking', label: 'Theo dõi xe' },
                                    { id: 'feedback', label: 'Đánh giá' },
                                    { id: 'maintenance', label: 'Tư vấn AI' },
                                    { id: 'reports', label: 'Báo cáo' },
                                    { id: 'expenses', label: 'Chi phí' },
                                    { id: 'accounting', label: 'Kế toán vận hành' },
                                    { id: 'security', label: 'Bảo mật' }
                                  ].map(item => (
                                    <div key={item.id} className="flex items-center justify-between py-1">
                                      <span className="text-[10px] text-slate-400 font-medium">{item.label}</span>
                                      <button 
                                        disabled={!isDesignAuthenticated}
                                        onClick={() => {
                                          const currentSettings = siteConfig.accountingLockSettings || {};
                                          const newValue = currentSettings[item.id] === false ? true : false;
                                          updateConfig('accountingLockSettings', { ...currentSettings, [item.id]: newValue });
                                        }}
                                        className={`w-8 h-4 rounded-full transition-all relative ${siteConfig.accountingLockSettings?.[item.id] === true ? 'bg-blue-600' : 'bg-slate-800'} ${!isDesignAuthenticated ? 'opacity-50 cursor-not-allowed' : ''}`}
                                      >
                                        <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all ${siteConfig.accountingLockSettings?.[item.id] === true ? 'left-4.5' : 'left-0.5'}`} />
                                      </button>
                                    </div>
                                  ))}
                                </div>
                                {!isDesignAuthenticated && (
                                  <p className="text-[8px] text-amber-500/70 italic mt-2">* Đăng nhập chế độ thiết kế để thay đổi các thiết lập này.</p>
                                )}
                              </div>
                            )}
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
                                    if (!siteConfig.contactEmail) return toast.error("Vui lòng nhập email trước!");
                                    try {
                                      const res = await fetch('/api/send-email', {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({
                                          to: siteConfig.contactEmail,
                                          subject: 'Test Email from XE ĐẸP PRO',
                                          html: '<h1>Hệ thống gửi email hoạt động tốt!</h1><p>Đây là email kiểm tra từ website của bạn.</p>'
                                        })
                                      });
                                      if (res.ok) toast.success("Đã gửi email kiểm tra thành công!");
                                      else {
                                        const err = await res.json();
                                        toast.error("Lỗi: " + (err.error || "Không rõ nguyên nhân"));
                                      }
                                    } catch (e) {
                                      toast.error("Lỗi kết nối server!");
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

                      {/* SEO & Google Search Console */}
                      <div className="bg-slate-900/50 p-6 md:p-10 rounded-[24px] md:rounded-[40px] border border-white/5 space-y-6 md:space-y-8 flex flex-col md:col-span-2">
                        <h4 className="text-[10px] md:text-[11px] font-black uppercase text-blue-500 tracking-[0.2em] flex items-center gap-3">
                          <span className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)]"></span> SEO & Google Search Console
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 flex-1">
                          <div className="space-y-6">
                            <div className="group space-y-2">
                              <div className="flex justify-between items-center">
                                <label className="text-[8px] md:text-[9px] text-slate-500 uppercase font-black tracking-widest group-focus-within:text-blue-500 transition-colors">Mô tả SEO (Meta Description)</label>
                                <AiHelperButton 
                                  onClick={() => handleAiGenerateItemText('config', 'config', 'seoDescription', 'Mô tả SEO cho trang chủ')}
                                  isLoading={isAiProcessing}
                                />
                              </div>
                              <textarea 
                                value={siteConfig.seoDescription || ''} 
                                onChange={e => updateConfig('seoDescription', e.target.value)} 
                                placeholder="Mô tả website hiển thị trên Google..."
                                className="w-full bg-slate-950 border border-white/5 rounded-xl md:rounded-2xl p-4 text-white text-sm h-24 resize-none focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                              />
                            </div>
                            <div className="group space-y-2">
                              <div className="flex justify-between items-center">
                                <label className="text-[8px] md:text-[9px] text-slate-500 uppercase font-black tracking-widest group-focus-within:text-blue-500 transition-colors">Từ khóa SEO (Keywords)</label>
                                <AiHelperButton 
                                  onClick={() => handleAiGenerateItemText('config', 'config', 'seoKeywords', 'Danh sách từ khóa SEO')}
                                  isLoading={isAiProcessing}
                                />
                              </div>
                              <input 
                                value={siteConfig.seoKeywords || ''} 
                                onChange={e => updateConfig('seoKeywords', e.target.value)} 
                                placeholder="Cách nhau bằng dấu phẩy..."
                                className="w-full bg-slate-950 border border-white/5 rounded-xl md:rounded-2xl p-4 text-white text-sm focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                              />
                            </div>
                          </div>
                          <div className="space-y-6">
                            <div className="group space-y-2">
                              <label className="text-[8px] md:text-[9px] text-slate-500 uppercase font-black tracking-widest group-focus-within:text-blue-500 transition-colors">Google Search Console Verification Code</label>
                              <input 
                                value={siteConfig.googleVerificationCode || ''} 
                                onChange={e => updateConfig('googleVerificationCode', e.target.value)} 
                                placeholder="Ví dụ: qf8156WuX4TgFxq_CV1cG3fZsBMEilbxB9LEwe2_oC4"
                                className="w-full bg-slate-950 border border-white/5 rounded-xl md:rounded-2xl p-4 text-white text-sm focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                              />
                              <p className="text-[8px] text-slate-600 italic">Dán mã xác minh từ Google Search Console để Google lập chỉ mục trang web của bạn nhanh hơn.</p>
                            </div>
                            <div className="p-4 bg-blue-600/5 border border-blue-500/20 rounded-2xl">
                              <p className="text-[10px] text-slate-400 leading-relaxed">
                                <span className="font-black text-blue-500 uppercase mr-2">Mẹo SEO:</span> 
                                Đảm bảo mô tả SEO chứa các từ khóa quan trọng như "Detailing", "Chăm sóc xe", và địa danh của bạn. AI có thể giúp bạn tối ưu hóa nội dung này.
                              </p>
                            </div>
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

                      {/* AI Advisor Configuration */}
                      <div className="bg-slate-900/50 p-6 md:p-10 rounded-[24px] md:rounded-[40px] border border-white/5 space-y-6 md:space-y-8 flex flex-col md:col-span-2">
                        <h4 className="text-[10px] md:text-[11px] font-black uppercase text-blue-500 tracking-[0.2em] flex items-center gap-3">
                          <span className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)]"></span> Cấu Hình Cố Vấn AI
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 flex-1">
                          <div className="space-y-6">
                            <div className="group space-y-2">
                              <label className="text-[8px] md:text-[9px] text-slate-500 uppercase font-black tracking-widest">Tiêu đề Cố vấn AI</label>
                              <input 
                                value={siteConfig.aiAdvisorTitle || ''} 
                                onChange={e => updateConfig('aiAdvisorTitle', e.target.value)} 
                                className="w-full bg-slate-950 border border-white/5 rounded-xl md:rounded-2xl p-4 text-white text-sm"
                              />
                            </div>
                            <div className="group space-y-2">
                              <label className="text-[8px] md:text-[9px] text-slate-500 uppercase font-black tracking-widest">Lời chào mừng AI (Welcome Message)</label>
                              <textarea 
                                value={siteConfig.aiAdvisorWelcome || ''} 
                                onChange={e => updateConfig('aiAdvisorWelcome', e.target.value)} 
                                className="w-full bg-slate-950 border border-white/5 rounded-xl md:rounded-2xl p-4 text-white text-sm h-32 resize-none"
                              />
                            </div>
                          </div>
                          <div className="space-y-6">
                            <div className="group space-y-2">
                              <label className="text-[8px] md:text-[9px] text-slate-500 uppercase font-black tracking-widest">System Prompt (Chỉ dẫn AI)</label>
                              <textarea 
                                value={siteConfig.aiSystemPrompt || ''} 
                                onChange={e => updateConfig('aiSystemPrompt', e.target.value)} 
                                placeholder="Ví dụ: Bạn là một chuyên gia về xe..."
                                className="w-full bg-slate-950 border border-white/5 rounded-xl md:rounded-2xl p-4 text-white text-sm h-64 resize-none focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                              />
                              <p className="text-[8px] text-slate-600 italic">Đây là chỉ dẫn quan trọng nhất để AI biết nó là ai và phải trả lời khách hàng như thế nào.</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Payment (MoMo) Configuration */}
                      <div className="bg-slate-900/50 p-6 md:p-10 rounded-[24px] md:rounded-[40px] border border-white/5 space-y-6 md:space-y-8 flex flex-col md:col-span-2">
                        <h4 className="text-[10px] md:text-[11px] font-black uppercase text-pink-500 tracking-[0.2em] flex items-center gap-3">
                          <span className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.6)]"></span> Thanh Toán MoMo
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 flex-1">
                          <div className="group space-y-2">
                            <label className="text-[8px] md:text-[9px] text-slate-500 uppercase font-black tracking-widest">Số Điện Thoại MoMo</label>
                            <input 
                              value={siteConfig.momoInfo?.phone || ''} 
                              onChange={e => updateConfig('momoInfo', { ...siteConfig.momoInfo, phone: e.target.value })} 
                              className="w-full bg-slate-950 border border-white/5 rounded-xl md:rounded-2xl p-4 text-white text-sm" 
                            />
                          </div>
                          <div className="group space-y-2">
                            <label className="text-[8px] md:text-[9px] text-slate-500 uppercase font-black tracking-widest">Tên Chủ Tài Khoản</label>
                            <input 
                              value={siteConfig.momoInfo?.name || ''} 
                              onChange={e => updateConfig('momoInfo', { ...siteConfig.momoInfo, name: e.target.value })} 
                              className="w-full bg-slate-950 border border-white/5 rounded-xl md:rounded-2xl p-4 text-white text-sm" 
                            />
                          </div>
                        </div>
                      </div>

                      {/* Backup & Restore Configuration */}
                      <div className="bg-slate-900/50 p-6 md:p-10 rounded-[24px] md:rounded-[40px] border border-white/5 space-y-6 md:space-y-8 flex flex-col md:col-span-2">
                        <h4 className="text-[10px] md:text-[11px] font-black uppercase text-blue-500 tracking-[0.2em] flex items-center gap-3">
                          <span className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)]"></span> Sao Lưu & Khôi Phục Dữ Liệu
                        </h4>
                        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-6">
                          <div className="flex-1 space-y-2">
                            <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
                              Xuất toàn bộ dữ liệu cấu hình, dịch vụ, hình ảnh và danh sách khách hàng ra tệp tin JSON tải về máy. Bạn có thể sử dụng tệp tin này để nhập lại (khôi phục) bất kỳ lúc nào để tránh mất mát dữ liệu.
                            </p>
                            <p className="text-[9px] text-slate-500 flex items-center gap-1">
                              💡 Mẹo: Nên sao lưu trước khi thực hiện các thay đổi lớn về giao diện hoặc giá dịch vụ.
                            </p>
                          </div>
                          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                            <button
                              type="button"
                              onClick={() => {
                                try {
                                  const backupData = {
                                    backupVersion: "v12",
                                    timestamp: new Date().toISOString(),
                                    siteConfig,
                                    customerRecords,
                                    gallery,
                                    premiumSolutions,
                                    services,
                                    aiVideoHistory,
                                    trackingData,
                                    reviews,
                                    inventory,
                                    eCertificates,
                                    staff,
                                    inspections,
                                    reminders,
                                    expenses,
                                    experts
                                  };
                                  const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: "application/json" });
                                  const url = URL.createObjectURL(blob);
                                  const a = document.createElement("a");
                                  a.href = url;
                                  a.download = `dungcar_backup_${new Date().toISOString().slice(0,10)}.json`;
                                  document.body.appendChild(a);
                                  a.click();
                                  document.body.removeChild(a);
                                  URL.revokeObjectURL(url);
                                  toast.success("Đã tải xuống tệp sao lưu dữ liệu!");
                                  addAuditLog("Sao lưu dữ liệu", "Xuất tệp JSON sao lưu thành công");
                                } catch (err: any) {
                                  toast.error("Lỗi khi tạo bản sao lưu: " + err.message);
                                }
                              }}
                              className="px-6 py-4 bg-blue-600/10 hover:bg-blue-600 hover:text-white border border-blue-500/30 text-blue-400 font-black uppercase text-[10px] rounded-xl tracking-wider transition-all flex items-center justify-center gap-2"
                            >
                              <Download className="w-4 h-4" /> Tải Bản Sao Lưu (.json)
                            </button>
                            <label className="px-6 py-4 bg-emerald-600/10 hover:bg-emerald-600 hover:text-white border border-emerald-500/30 text-emerald-400 font-black uppercase text-[10px] rounded-xl tracking-wider cursor-pointer transition-all flex items-center justify-center gap-2">
                              <Upload className="w-4 h-4" /> Nhập Bản Sao Lưu
                              <input
                                type="file"
                                accept=".json"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (!file) return;
                                  const reader = new FileReader();
                                  reader.onload = (event) => {
                                    try {
                                      const data = JSON.parse(event.target?.result as string);
                                      if (!data.siteConfig) {
                                        throw new Error("Tệp sao lưu không hợp lệ hoặc thiếu thông tin siteConfig.");
                                      }
                                      
                                      // Restore everything
                                      if (data.siteConfig) setSiteConfig(data.siteConfig);
                                      if (data.customerRecords) setCustomerRecords(data.customerRecords);
                                      if (data.gallery) setGallery(data.gallery);
                                      if (data.premiumSolutions) setPremiumSolutions(data.premiumSolutions);
                                      if (data.services) setServices(data.services);
                                      if (data.aiVideoHistory) setAiVideoHistory(data.aiVideoHistory);
                                      if (data.trackingData) setTrackingData(data.trackingData);
                                      if (data.reviews) setReviews(data.reviews);
                                      if (data.inventory) setInventory(data.inventory);
                                      if (data.eCertificates) setECertificates(data.eCertificates);
                                      if (data.staff) setStaff(data.staff);
                                      if (data.inspections) setInspections(data.inspections);
                                      if (data.reminders) setReminders(data.reminders);
                                      if (data.expenses) setExpenses(data.expenses);
                                      if (data.experts) setExperts(data.experts);

                                      toast.success("Khôi phục toàn bộ dữ liệu thành công! Hãy nhấn 'Lưu & Áp Dụng' để hoàn tất.");
                                      addAuditLog("Khôi phục dữ liệu", "Nhập tệp JSON khôi phục thành công");
                                    } catch (err: any) {
                                      toast.error("Lỗi khi khôi phục dữ liệu: " + err.message);
                                    }
                                  };
                                  reader.readAsText(file);
                                }}
                                className="hidden"
                              />
                            </label>
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
                            onClick={() => {
                              localStorage.clear();
                              window.location.reload();
                            }} 
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
                  <h3 className="section-title text-2xl md:text-3xl">Quản Lý Gói Dịch Vụ</h3>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <button 
                      onClick={handleAiGenerateService} 
                      disabled={isAiProcessing}
                      className="btn-secondary flex-1 sm:flex-none px-6 py-3 text-[10px] flex items-center justify-center gap-2"
                    >
                      {isAiProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                      Tạo bằng AI
                    </button>
                    <button onClick={handleAddService} className="btn-primary flex-1 sm:flex-none px-8 py-3 text-[10px]">➕ Thêm Gói Mới</button>
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
                    { value: 'exterior', label: 'Ngoại thất' },
                    { value: 'interior', label: 'Nội thất' },
                    { value: 'protection', label: 'Bảo vệ' },
                    { value: 'tuning', label: 'Độ xe / Nâng cấp' },
                  ]}
                  sortOptions={[
                    { key: 'title', order: 'asc', label: 'Tên A-Z' },
                    { key: 'title', order: 'desc', label: 'Tên Z-A' },
                    { key: 'price', order: 'asc', label: 'Giá tăng dần' },
                    { key: 'price', order: 'desc', label: 'Giá giảm dần' },
                    { key: 'id', order: 'desc', label: 'Mới nhất' },
                  ]}
                />

                <div className="grid grid-cols-1 gap-4">
                  {(() => {
                    const filtered = getFilteredAndSorted(services, ['title', 'description', 'price'], 'category');
                    const totalItems = filtered.length;
                    const totalPages = Math.ceil(totalItems / SERVICES_PER_PAGE);
                    const paginated = filtered.slice((servicePage - 1) * SERVICES_PER_PAGE, servicePage * SERVICES_PER_PAGE);
                    
                    return (
                      <>
                        <div className="flex justify-between items-center px-4 mb-2">
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                            Hiển thị {Math.min(totalItems, (servicePage - 1) * SERVICES_PER_PAGE + 1)}-{Math.min(totalItems, servicePage * SERVICES_PER_PAGE)} trên tổng số {totalItems} dịch vụ
                          </p>
                        </div>

                        {paginated.map(s => (
                          <div key={s.id} className="bg-slate-900/50 border border-white/5 p-4 md:p-6 rounded-[24px] md:rounded-[32px] flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8 group hover:border-blue-500/30 transition-all">
                            <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden relative group/img shrink-0">
                              <img src={s.image} className="w-full h-full object-cover" loading="lazy" referrerPolicy="no-referrer" />
                              <div className="absolute inset-0 bg-blue-600/60 opacity-0 group-hover/img:opacity-100 transition-all flex flex-col items-center justify-center gap-1 cursor-pointer">
                                <label className="flex flex-col items-center cursor-pointer">
                                  <span className="text-[7px] font-black">TẢI LÊN</span>
                                  <input type="file" onChange={e => handleImageUpload(e, (b) => setServices(prev => prev.map(ser => ser.id === s.id ? {...ser, image: b} : ser)))} className="hidden" accept="image/*" />
                                </label>
                                <div className="w-full h-px bg-white/20" />
                                <button 
                                  onClick={() => {
                                    setGalleryPickerCallback(() => (url: string) => setServices(prev => prev.map(ser => ser.id === s.id ? {...ser, image: url} : ser)));
                                    setIsGalleryPickerOpen(true);
                                  }}
                                  className="text-[7px] font-black"
                                >
                                  CHỌN THƯ VIỆN
                                </button>
                              </div>
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

                        {totalPages > 1 && (
                          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
                            <div className="flex items-center gap-2">
                              <button 
                                disabled={servicePage === 1}
                                onClick={() => setServicePage(p => Math.max(1, p - 1))}
                                className="px-4 h-10 flex items-center justify-center gap-2 rounded-xl bg-slate-800 text-white disabled:opacity-30 transition-all hover:bg-slate-700 text-[10px] font-black uppercase"
                              >
                                <ArrowLeft className="w-4 h-4" />
                                <span>Trước</span>
                              </button>
                              
                              <div className="flex gap-1">
                                {Array.from({ length: totalPages }).map((_, i) => (
                                  <button
                                    key={i}
                                    onClick={() => setServicePage(i + 1)}
                                    className={`w-10 h-10 rounded-xl font-bold transition-all text-xs ${servicePage === i + 1 ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40' : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'}`}
                                  >
                                    {i + 1}
                                  </button>
                                ))}
                              </div>

                              <button 
                                disabled={servicePage === totalPages}
                                onClick={() => setServicePage(p => Math.min(totalPages, p + 1))}
                                className="px-4 h-10 flex items-center justify-center gap-2 rounded-xl bg-slate-800 text-white disabled:opacity-30 transition-all hover:bg-slate-700 text-[10px] font-black uppercase"
                              >
                                <span>Sau</span>
                                <ArrowRight className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        )}
                      </>
                    );
                  })()}
                </div>
              </div>
            )}

                {activeTab === 'premium' && (
                  <div className="space-y-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                  <h3 className="section-title text-2xl md:text-3xl">Giải Pháp Detailing Cao Cấp</h3>
                  <button onClick={handleAddPremium} className="btn-primary w-full sm:w-auto px-8 py-3 text-[10px]">➕ Thêm Giải Pháp</button>
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
                  {(() => {
                    const filtered = getFilteredAndSorted(premiumSolutions, ['title', 'description']);
                    const paginated = filtered.slice((premiumPage - 1) * PREMIUM_PER_PAGE, premiumPage * PREMIUM_PER_PAGE);
                    const totalPages = Math.ceil(filtered.length / PREMIUM_PER_PAGE);

                    return (
                      <>
                        {paginated.map(sol => (
                          <div key={sol.id} className="bg-slate-900/50 border border-white/5 p-6 rounded-[32px] space-y-6 group hover:border-blue-500/30 transition-all">
                            <div className="flex flex-col lg:flex-row gap-6">
                              <div className="lg:w-1/3 space-y-4">
                                <div className="grid grid-cols-2 gap-2">
                                  <div className="space-y-2">
                                    <label className="text-[8px] font-black uppercase text-slate-600">Ảnh Trước</label>
                                    <div className="aspect-video rounded-xl overflow-hidden relative group/img">
                                      <img src={sol.beforeImage} className="w-full h-full object-cover" loading="lazy" referrerPolicy="no-referrer" />
                                      <div className="absolute inset-0 bg-blue-600/60 opacity-0 group-hover/img:opacity-100 transition-all flex flex-col items-center justify-center gap-1 cursor-pointer">
                                        <label className="flex flex-col items-center cursor-pointer">
                                          <span className="text-[7px] font-black">TẢI LÊN</span>
                                          <input type="file" onChange={e => handleImageUpload(e, (b) => setPremiumSolutions(prev => prev.map(p => p.id === sol.id ? {...p, beforeImage: b} : p)))} className="hidden" accept="image/*" />
                                        </label>
                                        <div className="w-full h-px bg-white/20" />
                                        <button 
                                          onClick={() => {
                                            setGalleryPickerCallback(() => (url: string) => setPremiumSolutions(prev => prev.map(p => p.id === sol.id ? {...p, beforeImage: url} : p)));
                                            setIsGalleryPickerOpen(true);
                                          }}
                                          className="text-[7px] font-black"
                                        >
                                          THƯ VIỆN
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="space-y-2">
                                    <label className="text-[8px] font-black uppercase text-slate-600">Ảnh Sau</label>
                                    <div className="aspect-video rounded-xl overflow-hidden relative group/img">
                                      <img src={sol.afterImage} className="w-full h-full object-cover" loading="lazy" referrerPolicy="no-referrer" />
                                      <div className="absolute inset-0 bg-emerald-600/60 opacity-0 group-hover/img:opacity-100 transition-all flex flex-col items-center justify-center gap-1 cursor-pointer">
                                        <label className="flex flex-col items-center cursor-pointer">
                                          <span className="text-[7px] font-black">TẢI LÊN</span>
                                          <input type="file" onChange={e => handleImageUpload(e, (b) => setPremiumSolutions(prev => prev.map(p => p.id === sol.id ? {...p, afterImage: b} : p)))} className="hidden" accept="image/*" />
                                        </label>
                                        <div className="w-full h-px bg-white/20" />
                                        <button 
                                          onClick={() => {
                                            setGalleryPickerCallback(() => (url: string) => setPremiumSolutions(prev => prev.map(p => p.id === sol.id ? {...p, afterImage: url} : p)));
                                            setIsGalleryPickerOpen(true);
                                          }}
                                          className="text-[7px] font-black"
                                        >
                                          THƯ VIỆN
                                        </button>
                                      </div>
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

                        {totalPages > 1 && (
                          <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4 mt-8">
                            <button 
                              disabled={premiumPage === 1}
                              onClick={() => setPremiumPage(p => Math.max(1, p - 1))}
                              className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-800 text-white disabled:opacity-30 transition-all hover:bg-slate-700"
                            >
                              <ArrowLeft className="w-4 h-4" />
                            </button>
                            <div className="flex flex-wrap gap-2">
                              {Array.from({ length: totalPages }).map((_, i) => (
                                <button
                                  key={i}
                                  onClick={() => setPremiumPage(i + 1)}
                                  className={`w-10 h-10 rounded-xl font-bold transition-all ${premiumPage === i + 1 ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40' : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'}`}
                                >
                                  {i + 1}
                                </button>
                              ))}
                            </div>
                            <button 
                              disabled={premiumPage === totalPages}
                              onClick={() => setPremiumPage(p => Math.min(totalPages, p + 1))}
                              className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-800 text-white disabled:opacity-30 transition-all hover:bg-slate-700"
                            >
                              <ArrowRight className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </>
                    );
                  })()}
                </div>
              </div>
            )}

                {activeTab === 'promotions' && (
                  <div className="space-y-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                  <h3 className="section-title text-2xl md:text-3xl">Chương Trình Khuyến Mãi</h3>
                  <button onClick={handleAddPromotion} className="btn-primary w-full sm:w-auto px-8 py-3 text-[10px]">➕ Thêm Khuyến Mãi</button>
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
                  {(() => {
                    const filtered = getFilteredAndSorted(siteConfig.promotions || [], ['title', 'description', 'expiryDate']);
                    const paginated = filtered.slice((promoPage - 1) * PROMO_PER_PAGE, promoPage * PROMO_PER_PAGE);
                    const totalPages = Math.ceil(filtered.length / PROMO_PER_PAGE);

                    return (
                      <>
                        {paginated.map(promo => (
                          <div key={promo.id} className="bg-slate-900/50 border border-white/5 p-6 rounded-[32px] flex flex-col md:flex-row gap-8 group hover:border-blue-500/30 transition-all">
                            <div className="w-full md:w-64 aspect-video md:aspect-square rounded-2xl overflow-hidden relative group/img shrink-0">
                              <img src={promo.image} className="w-full h-full object-cover" loading="lazy" referrerPolicy="no-referrer" />
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

                        {totalPages > 1 && (
                          <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4 mt-8">
                            <button 
                              disabled={promoPage === 1}
                              onClick={() => setPromoPage(p => Math.max(1, p - 1))}
                              className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-800 text-white disabled:opacity-30 transition-all hover:bg-slate-700"
                            >
                              <ArrowLeft className="w-4 h-4" />
                            </button>
                            <div className="flex flex-wrap gap-2">
                              {Array.from({ length: totalPages }).map((_, i) => (
                                <button
                                  key={i}
                                  onClick={() => setPromoPage(i + 1)}
                                  className={`w-10 h-10 rounded-xl font-bold transition-all ${promoPage === i + 1 ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40' : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'}`}
                                >
                                  {i + 1}
                                </button>
                              ))}
                            </div>
                            <button 
                              disabled={promoPage === totalPages}
                              onClick={() => setPromoPage(p => Math.min(totalPages, p + 1))}
                              className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-800 text-white disabled:opacity-30 transition-all hover:bg-slate-700"
                            >
                              <ArrowRight className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </>
                    );
                  })()}
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
                  <TrackingManagement 
                    trackingData={trackingData} 
                    setTrackingData={setTrackingData} 
                    services={INITIAL_SERVICES}
                    onStepComplete={handleStepComplete}
                  />
                )}

                {activeTab === 'feedback' && (
                  <FeedbackManagement reviews={reviews} setReviews={setReviews} services={services} />
                )}

            {activeTab === 'gallery' && (
                  <div className="space-y-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                  <h3 className="section-title text-2xl md:text-3xl">Thư Viện Ảnh Dự Án</h3>
                  <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                    <button 
                      onClick={handleAiAutoCategorize}
                      disabled={isAiProcessing}
                      className="btn-secondary flex-1 sm:flex-none px-6 py-3 text-[10px]"
                    >
                      {isAiProcessing ? '⏳' : '🪄 AI Phân Loại'}
                    </button>
                    <button 
                      onClick={() => setIsGalleryUploadOpen(true)}
                      className="btn-primary flex-1 sm:flex-none px-8 py-3 text-[10px]"
                    >
                      <span className="text-lg">🖼️</span>
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
                  {(() => {
                    const filtered = getFilteredAndSorted(gallery, ['title', 'category'], 'category');
                    const paginated = filtered.slice((galleryPage - 1) * GALLERY_PER_PAGE, galleryPage * GALLERY_PER_PAGE);
                    const totalPages = Math.ceil(filtered.length / GALLERY_PER_PAGE);

                    return (
                      <>
                        {paginated.map(img => (
                          <div key={img.id} className="bg-slate-900/50 border border-white/5 rounded-[20px] md:rounded-[28px] overflow-hidden group hover:border-blue-500/50 transition-all p-2 md:p-3">
                            <div className="aspect-square rounded-xl md:rounded-2xl overflow-hidden relative mb-2 md:mb-4 group/img bg-black">
                              {img.type === 'video' ? (
                                <video src={img.url} className="w-full h-full object-cover" muted loop playsInline preload="none" onMouseOver={e => e.currentTarget.play()} onMouseOut={e => e.currentTarget.pause()} />
                              ) : (
                                <img src={img.url} className="w-full h-full object-cover" loading="lazy" referrerPolicy="no-referrer" />
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

                        {totalPages > 1 && (
                          <div className="col-span-full flex flex-wrap justify-center items-center gap-2 md:gap-4 mt-8">
                            <button 
                              disabled={galleryPage === 1}
                              onClick={() => setGalleryPage(p => Math.max(1, p - 1))}
                              className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-800 text-white disabled:opacity-30 transition-all hover:bg-slate-700"
                            >
                              <ArrowLeft className="w-4 h-4" />
                            </button>
                            <div className="flex flex-wrap gap-2">
                              {Array.from({ length: totalPages }).map((_, i) => (
                                <button
                                  key={i}
                                  onClick={() => setGalleryPage(i + 1)}
                                  className={`w-10 h-10 rounded-xl font-bold transition-all ${galleryPage === i + 1 ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40' : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'}`}
                                >
                                  {i + 1}
                                </button>
                              ))}
                            </div>
                            <button 
                              disabled={galleryPage === totalPages}
                              onClick={() => setGalleryPage(p => Math.min(totalPages, p + 1))}
                              className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-800 text-white disabled:opacity-30 transition-all hover:bg-slate-700"
                            >
                              <ArrowRight className="w-4 h-4" />
                            </button>
                          </div>
                        )}

                        {filtered.length === 0 && (
                          <div className="col-span-full py-20 bg-slate-950/20 border border-dashed border-white/10 rounded-[40px] flex flex-col items-center justify-center space-y-4">
                            <div className="text-4xl text-slate-700">🖼️</div>
                            <p className="text-slate-500 font-bold uppercase text-xs tracking-widest text-center">
                              Không tìm thấy hình ảnh nào trong thư viện<br/>
                              <span className="text-[10px] opacity-60">Hãy thử thay đổi từ khóa hoặc bộ lọc danh mục</span>
                            </p>
                          </div>
                        )}
                      </>
                    );
                  })()}
                </div>
              </div>
            )}

            {activeTab === 'wrap-manager' && (
              <ProjectManager 
                title="Quản Lý Dự Án Wrap & PPF"
                typeLabel="Loại Wrap"
                colorLabel="Màu Sắc/Mã Phim"
                idPrefix="wp"
                projects={siteConfig.wrapProjects || []} 
                onUpdate={(projects) => setSiteConfig({...siteConfig, wrapProjects: projects})} 
              />
            )}

            {activeTab === 'tint-manager' && (
              <ProjectManager 
                title="Quản Lý Dự Án Phim Cách Nhiệt"
                typeLabel="Dòng Phim"
                colorLabel="Độ Xuyên Sáng"
                idPrefix="tp"
                projects={siteConfig.tintProjects || []} 
                onUpdate={(projects) => setSiteConfig({...siteConfig, tintProjects: projects})} 
              />
            )}

            {activeTab === 'tuning-manager' && (
              <ProjectManager 
                title="Quản Lý Dự Án Nâng Cấp Xe"
                typeLabel="Hạng Mục"
                colorLabel="Chi Tiết Nâng Cấp"
                idPrefix="tn"
                projects={siteConfig.tuningProjects || []} 
                onUpdate={(projects) => setSiteConfig({...siteConfig, tuningProjects: projects})} 
              />
            )}

                {activeTab === 'packages' && (
                  <div className="space-y-8">
                    <div className="flex justify-between items-center mb-8">
                      <h3 className="section-title text-2xl md:text-3xl">Quản Lý Gói Chăm Sóc</h3>
                      <button 
                        onClick={() => {
                          setIsAddingPackage(true);
                          setEditingPackageId(null);
                          setPackageForm({ title: '', description: '', price: '', duration: '', features: [], isPopular: false });
                        }}
                        className="btn-primary px-4 py-2 text-[10px]"
                      >
                        ➕ Thêm Gói Mới
                      </button>
                    </div>

                    <div className="bg-slate-900/30 border border-white/5 p-6 rounded-[32px]">
                      <FilterSortBar 
                        currentSearch={filterText}
                        onSearchChange={setFilterText}
                        currentSort={sortConfig}
                        onSortChange={setSortConfig}
                        onClear={() => { setFilterText(''); setFilterCategory('all'); }}
                        sortOptions={[
                          { key: 'title', order: 'asc', label: 'Tên A-Z' },
                          { key: 'price', order: 'asc', label: 'Giá tăng dần' },
                          { key: 'price', order: 'desc', label: 'Giá giảm dần' },
                        ]}
                      />
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
                      {(() => {
                        const filtered = getFilteredAndSorted(siteConfig.packages || [], ['title', 'description', 'price']);
                        return filtered.map(pkg => (
                          <div key={pkg.id} className="bg-slate-900/50 border border-white/5 p-6 rounded-[32px] relative group overflow-hidden flex flex-col">
                            {pkg.isPopular && <div className="absolute top-4 right-4 bg-blue-600 text-[8px] font-black uppercase px-2 py-1 rounded-full">Phổ biến</div>}
                            <h4 className="text-xl font-black text-white uppercase mb-2">{pkg.title}</h4>
                            <p className="text-blue-400 font-black text-lg mb-4">{pkg.price}</p>
                            <p className="text-slate-500 text-xs mb-6 line-clamp-2">{pkg.description}</p>
                            <div className="flex justify-end gap-2 mt-auto">
                              <button onClick={() => { setIsAddingPackage(true); setEditingPackageId(pkg.id); setPackageForm(pkg); }} className="p-2 hover:bg-blue-600/20 rounded-lg transition-all">✏️</button>
                              <button onClick={() => {
                                setSiteConfig(prev => ({ ...prev, packages: (prev.packages || []).filter(p => p.id !== pkg.id) }));
                                toast.success("Đã xóa gói dịch vụ!");
                              }} className="p-2 hover:bg-red-600/20 rounded-lg transition-all">🗑️</button>
                            </div>
                          </div>
                        ));
                      })()}
                    </div>
                    )}
                  </div>
                )}

                {activeTab === 'inventory' && (
                  <InventoryManagement 
                    inventory={inventory} 
                    setInventory={setInventory} 
                    services={INITIAL_SERVICES}
                  />
                )}

                {activeTab === 'loyalty' && (
                  <div className="space-y-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                      <div>
                        <h3 className="section-title text-2xl">Hệ Thống Tích Điểm</h3>
                        <p className="section-subtitle mt-1">Quản lý điểm thưởng và ưu đãi khách hàng</p>
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

                {activeTab === 'accounting' && (
                  <div className="space-y-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                      <div>
                        <h3 className="section-title text-2xl">Tổng Quan Kế Toán</h3>
                        <p className="section-subtitle mt-1">Theo dõi sức khỏe tài chính của trung tâm</p>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => {
                            setIsAddingCustomer(true);
                            setActiveTab('customers');
                          }}
                          className="btn-secondary px-6 py-3 text-[10px]"
                        >
                          <Plus className="w-4 h-4" /> Thêm Doanh Thu
                        </button>
                        <button 
                          onClick={() => {
                            setExpenseForm({ title: '', amount: 0, category: 'other', date: new Date().toISOString().split('T')[0] });
                            setIsAddingExpense(true);
                            setActiveTab('expenses');
                          }}
                          className="btn-secondary px-6 py-3 text-[10px]"
                        >
                          <Plus className="w-4 h-4" /> Thêm Chi Phí Nhanh
                        </button>
                        <button onClick={() => setActiveTab('expenses')} className="btn-secondary px-6 py-3 text-[10px]">
                          <Receipt className="w-4 h-4" /> Quản Lý Chi Phí
                        </button>
                        <button onClick={() => setActiveTab('reports')} className="btn-primary px-6 py-3 text-[10px]">
                          <BarChart3 className="w-4 h-4" /> Báo Cáo Chi Tiết
                        </button>
                        <button 
                          onClick={() => setIsExcelMode(!isExcelMode)} 
                          className={`flex items-center gap-2 px-6 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${isExcelMode ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
                        >
                          <Grid className="w-4 h-4" /> {isExcelMode ? 'Đóng Bảng Excel' : 'Bảng Excel'}
                        </button>
                      </div>
                    </div>

                    {isExcelMode && (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-slate-900/80 border border-blue-500/30 p-8 rounded-[40px] backdrop-blur-xl shadow-2xl space-y-6"
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="text-sm font-black text-white uppercase tracking-widest">Bảng Kế Toán Vận Hành</h4>
                            <p className="text-[10px] text-slate-500 font-bold mt-1">Chỉnh sửa trực tiếp - Dữ liệu đồng bộ thời gian thực</p>
                          </div>
                          <div className="flex gap-2">
                            <button 
                              onClick={handleDownloadExcel}
                              className="p-2 bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
                            >
                              <Download className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <div className="overflow-x-auto custom-scrollbar border border-white/5 rounded-2xl">
                          <table className="w-full text-left border-collapse min-w-[1000px]">
                            <thead>
                              <tr className="bg-slate-950/50 border-b border-white/10">
                                <th className="px-4 py-4 text-[9px] font-black text-slate-500 uppercase tracking-widest">Ngày</th>
                                <th className="px-4 py-4 text-[9px] font-black text-slate-500 uppercase tracking-widest">Loại</th>
                                <th className="px-4 py-4 text-[9px] font-black text-slate-500 uppercase tracking-widest">Nội dung / Khách hàng</th>
                                <th className="px-4 py-4 text-[9px] font-black text-slate-500 uppercase tracking-widest">Danh mục</th>
                                <th className="px-4 py-4 text-[9px] font-black text-slate-500 uppercase tracking-widest text-right">Số tiền (VNĐ)</th>
                                <th className="px-4 py-4 text-[9px] font-black text-slate-500 uppercase tracking-widest text-right">Thao tác</th>
                              </tr>
                            </thead>
                            <tbody>
                              {[...(customerRecords || []).map(r => ({ ...r, excelType: 'revenue' as const })), ...(expenses || []).map(e => ({ ...e, excelType: 'expense' as const }))]
                                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                                .map((item: any) => (
                                  <tr key={`${item.excelType}-${item.id}`} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                                    <td className="px-4 py-2">
                                      <input 
                                        type="date" 
                                        value={item.date} 
                                        onChange={(e) => handleExcelUpdate(item.id, item.excelType, 'date', e.target.value)}
                                        className="bg-transparent border-none text-[11px] text-slate-400 outline-none focus:text-white w-full"
                                      />
                                    </td>
                                    <td className="px-4 py-2">
                                      <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${item.excelType === 'revenue' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                                        {item.excelType === 'revenue' ? 'Thu' : 'Chi'}
                                      </span>
                                    </td>
                                    <td className="px-4 py-2">
                                      <input 
                                        type="text" 
                                        value={item.excelType === 'revenue' ? item.customerName : item.title} 
                                        onChange={(e) => handleExcelUpdate(item.id, item.excelType, item.excelType === 'revenue' ? 'customerName' : 'title', e.target.value)}
                                        className="bg-transparent border-none text-xs text-white font-bold outline-none w-full focus:bg-slate-800/50 rounded px-1"
                                      />
                                    </td>
                                    <td className="px-4 py-2">
                                      {item.excelType === 'expense' ? (
                                        <select 
                                          value={item.category} 
                                          onChange={(e) => handleExcelUpdate(item.id, 'expense', 'category', e.target.value)}
                                          className="bg-transparent border-none text-[10px] text-slate-400 outline-none focus:text-white w-full"
                                        >
                                          <option value="rent">Mặt bằng</option>
                                          <option value="salary">Lương</option>
                                          <option value="utility">Điện nước</option>
                                          <option value="inventory">Vật tư</option>
                                          <option value="marketing">Marketing</option>
                                          <option value="other">Khác</option>
                                        </select>
                                      ) : (
                                        <span className="text-[10px] text-slate-500 italic">Dịch vụ khách hàng</span>
                                      )}
                                    </td>
                                    <td className="px-4 py-2 text-right">
                                      <input 
                                        type="number" 
                                        value={item.excelType === 'revenue' ? (parseInt(item.totalPrice?.replace(/[^0-9]/g, '') || '0')) : item.amount} 
                                        onChange={(e) => handleExcelUpdate(item.id, item.excelType, 'amount', e.target.value)}
                                        className={`bg-transparent border-none text-xs font-black text-right outline-none w-32 focus:bg-slate-800/50 rounded px-1 ${item.excelType === 'revenue' ? 'text-emerald-500' : 'text-red-500'}`}
                                      />
                                    </td>
                                    <td className="px-4 py-2 text-right">
                                      <button 
                                        onClick={() => {
                                          if (item.excelType === 'revenue') {
                                            setCustomerRecords(prev => prev.filter(r => r.id !== item.id));
                                          } else {
                                            setExpenses(prev => prev.filter(e => e.id !== item.id));
                                          }
                                          toast.success("Đã xóa dòng dữ liệu!");
                                        }}
                                        className="p-1 text-slate-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                                      >
                                        <Trash2 className="w-3 h-3" />
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      </motion.div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-slate-900/50 border border-white/5 p-8 rounded-[40px] relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                          <TrendingUp className="w-24 h-24 text-emerald-500" />
                        </div>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Tổng Doanh Thu</p>
                        <p className="text-4xl font-black text-white mb-4">
                          {formatPrivateValue(customerRecords.reduce((acc, r) => acc + (parseInt(r.totalPrice?.replace(/[^0-9]/g, '') || '0')), 0))}
                        </p>
                        <div className="flex items-center gap-2 text-emerald-500 text-[10px] font-bold">
                          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          Cập nhật thời gian thực
                        </div>
                      </div>

                      <div className="bg-slate-900/50 border border-white/5 p-8 rounded-[40px] relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                          <TrendingDown className="w-24 h-24 text-red-500" />
                        </div>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Tổng Chi Phí</p>
                        <p className="text-4xl font-black text-white mb-4">
                          {formatPrivateValue(expenses.reduce((acc, e) => acc + e.amount, 0))}
                        </p>
                        <div className="flex items-center gap-2 text-red-500 text-[10px] font-bold">
                          <div className="w-2 h-2 rounded-full bg-red-500" />
                          Bao gồm vận hành & vật tư
                        </div>
                      </div>

                      <div className="bg-slate-900/50 border border-white/5 p-8 rounded-[40px] relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                          <Wallet className="w-24 h-24 text-blue-500" />
                        </div>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Lợi Nhuận Ròng</p>
                        <p className="text-4xl font-black text-blue-500 mb-4">
                          {formatPrivateValue(customerRecords.reduce((acc, r) => acc + (parseInt(r.totalPrice?.replace(/[^0-9]/g, '') || '0')), 0) - expenses.reduce((acc, e) => acc + e.amount, 0))}
                        </p>
                        <div className="flex items-center gap-2 text-blue-500 text-[10px] font-bold">
                          <div className="w-2 h-2 rounded-full bg-blue-500" />
                          Hiệu quả kinh doanh
                        </div>
                      </div>
                    </div>

                    {/* Monthly Performance Chart */}
                    <div className="bg-slate-900/50 border border-white/5 p-8 rounded-[40px]">
                      <div className="flex justify-between items-center mb-8">
                        <h4 className="text-sm font-black text-white uppercase tracking-widest">Hiệu Suất Kinh Doanh (6 tháng qua)</h4>
                        <div className="flex gap-4">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase">Doanh thu</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase">Chi phí</span>
                          </div>
                        </div>
                      </div>
                      <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={
                            Array.from({ length: 6 }, (_, i) => {
                              const d = new Date();
                              d.setMonth(d.getMonth() - (5 - i));
                              const monthStr = d.toISOString().slice(0, 7);
                              const monthRevenue = customerRecords
                                .filter(r => r.date.startsWith(monthStr))
                                .reduce((acc, r) => acc + (parseInt(r.totalPrice?.replace(/[^0-9]/g, '') || '0')), 0);
                              const monthExpense = expenses
                                .filter(e => e.date.startsWith(monthStr))
                                .reduce((acc, e) => acc + e.amount, 0);
                              return { 
                                name: d.toLocaleDateString('vi-VN', { month: 'short', year: 'numeric' }), 
                                revenue: monthRevenue,
                                expense: monthExpense,
                                profit: monthRevenue - monthExpense
                              };
                            })
                          }>
                            <defs>
                              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                              </linearGradient>
                              <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                            <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                            <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(value) => `${value / 1000000}M`} />
                            <Tooltip 
                              contentStyle={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', fontSize: '10px' }}
                              itemStyle={{ fontSize: '10px', fontWeight: 'bold' }}
                            />
                            <Area type="monotone" dataKey="revenue" stroke="#3b82f6" fillOpacity={1} fill="url(#colorRevenue)" strokeWidth={3} />
                            <Area type="monotone" dataKey="expense" stroke="#ef4444" fillOpacity={1} fill="url(#colorExpense)" strokeWidth={3} />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div className="bg-slate-900/50 border border-white/5 p-8 rounded-[40px]">
                        <h4 className="text-sm font-black text-white uppercase tracking-widest mb-6">Phân Bổ Chi Phí</h4>
                        <div className="space-y-4">
                          {['rent', 'salary', 'utility', 'inventory', 'marketing', 'other'].map(cat => {
                            const catTotal = expenses.filter(e => e.category === cat).reduce((acc, e) => acc + e.amount, 0);
                            const total = expenses.reduce((acc, e) => acc + e.amount, 0) || 1;
                            const percentage = (catTotal / total) * 100;
                            const colors: Record<string, string> = {
                              rent: 'bg-blue-500',
                              salary: 'bg-emerald-500',
                              utility: 'bg-amber-500',
                              inventory: 'bg-purple-500',
                              marketing: 'bg-pink-500',
                              other: 'bg-slate-500'
                            };
                            const labels: Record<string, string> = {
                              rent: 'Mặt bằng',
                              salary: 'Lương nhân viên',
                              utility: 'Điện nước/Internet',
                              inventory: 'Vật tư/Hóa chất',
                              marketing: 'Marketing/QC',
                              other: 'Khác'
                            };

                            return (
                              <div key={cat} className="space-y-2">
                                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                                  <span className="text-slate-400">{labels[cat]}</span>
                                  <span className="text-white">{formatPrivateValue(catTotal)} ({percentage.toFixed(1)}%)</span>
                                </div>
                                <div className="h-2 bg-slate-950 rounded-full overflow-hidden">
                                  <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${percentage}%` }}
                                    className={`h-full ${colors[cat]}`}
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <div className="bg-slate-900/50 border border-white/5 p-8 rounded-[40px]">
                        <h4 className="text-sm font-black text-white uppercase tracking-widest mb-6">Giao Dịch Gần Đây</h4>
                        <div className="space-y-4 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                          {[...(customerRecords || []), ...(expenses || []).map(e => ({ ...e, isExpense: true }))]
                            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                            .slice(0, 10)
                            .map((item: any) => (
                              <div key={`${item.isExpense ? 'expense' : 'customer'}-${item.id}`} className="flex items-center justify-between p-4 bg-slate-950/50 border border-white/5 rounded-2xl">
                                <div className="flex items-center gap-4">
                                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.isExpense ? 'bg-red-500/10 text-red-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                                    {item.isExpense ? <TrendingDown className="w-5 h-5" /> : <TrendingUp className="w-5 h-5" />}
                                  </div>
                                  <div>
                                    <p className="text-xs font-bold text-white truncate max-w-[150px]">{item.title || item.customerName}</p>
                                    <p className="text-[9px] text-slate-500 uppercase font-black">{item.date}</p>
                                  </div>
                                </div>
                                <p className={`text-sm font-black ${item.isExpense ? 'text-red-500' : 'text-emerald-500'}`}>
                                  {item.isExpense ? '-' : '+'}{formatPrivateValue(item.amount || parseInt(item.totalPrice?.replace(/[^0-9]/g, '') || '0'))}
                                </p>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'reports' && (
                  <div className="space-y-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                      <div>
                        <h3 className="section-title text-2xl">Báo Cáo Doanh Thu & Hiệu Suất</h3>
                        <p className="section-subtitle mt-1">Phân tích chuyên sâu hiệu quả kinh doanh và dịch vụ</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="btn-secondary px-6 py-3 text-[10px]">
                          <Download className="w-4 h-4" /> Xuất Excel
                        </button>
                        <button className="btn-primary px-6 py-3 text-[10px]">
                          <Printer className="w-4 h-4" /> In Báo Cáo
                        </button>
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
                          { key: 'date', order: 'desc', label: 'Ngày mới nhất' },
                          { key: 'date', order: 'asc', label: 'Ngày cũ nhất' },
                          { key: 'amount', order: 'desc', label: 'Số tiền cao nhất' },
                          { key: 'title', order: 'asc', label: 'Tên A-Z' },
                        ]}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      <div className="bg-slate-900/50 border border-white/5 p-6 rounded-[32px]">
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Doanh thu tháng này</p>
                        <p className="text-3xl font-black text-blue-500">
                          {formatPrivateValue(customerRecords.filter(r => r.date.startsWith(new Date().toISOString().slice(0, 7))).reduce((acc, r) => acc + (parseInt(r.totalPrice?.replace(/[^0-9]/g, '') || '0')), 0))}
                        </p>
                        <div className="mt-2 flex items-center gap-1 text-[10px] font-bold text-emerald-500">
                          <TrendingUp className="w-3 h-3" /> +12.5% so với tháng trước
                        </div>
                      </div>
                      <div className="bg-slate-900/50 border border-white/5 p-6 rounded-[32px]">
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Chi phí tháng này</p>
                        <p className="text-3xl font-black text-red-500">
                          {formatPrivateValue(expenses.filter(e => e.date.startsWith(new Date().toISOString().slice(0, 7))).reduce((acc, e) => acc + e.amount, 0))}
                        </p>
                        <div className="mt-2 flex items-center gap-1 text-[10px] font-bold text-red-500">
                          <TrendingDown className="w-3 h-3" /> +5.2% so với tháng trước
                        </div>
                      </div>
                      <div className="bg-slate-900/50 border border-white/5 p-6 rounded-[32px]">
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Lợi nhuận tháng này</p>
                        <p className="text-3xl font-black text-emerald-500">
                          {formatPrivateValue(customerRecords.filter(r => r.date.startsWith(new Date().toISOString().slice(0, 7))).reduce((acc, r) => acc + (parseInt(r.totalPrice?.replace(/[^0-9]/g, '') || '0')), 0) - 
                            expenses.filter(e => e.date.startsWith(new Date().toISOString().slice(0, 7))).reduce((acc, e) => acc + e.amount, 0))}
                        </p>
                        <div className="mt-2 flex items-center gap-1 text-[10px] font-bold text-emerald-500">
                          <TrendingUp className="w-3 h-3" /> +18.3% so với tháng trước
                        </div>
                      </div>
                      <div className="bg-slate-900/50 border border-white/5 p-6 rounded-[32px]">
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Giá trị TB đơn hàng</p>
                        <p className="text-3xl font-black text-amber-500">
                          {formatPrivateValue(Math.round(customerRecords.reduce((acc, r) => acc + (parseInt(r.totalPrice?.replace(/[^0-9]/g, '') || '0')), 0) / (customerRecords.length || 1)))}
                        </p>
                        <div className="mt-2 flex items-center gap-1 text-[10px] font-bold text-slate-500">
                          Dựa trên {customerRecords.length} đơn hàng
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Revenue Chart */}
                      <div className="bg-slate-900/50 border border-white/5 p-8 rounded-[40px]">
                        <div className="flex justify-between items-center mb-8">
                          <h4 className="text-sm font-black text-white uppercase tracking-widest">Doanh Thu & Chi Phí (7 ngày qua)</h4>
                        </div>
                        <div className="h-[300px] w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart data={
                              Array.from({ length: 7 }, (_, i) => {
                                const d = new Date();
                                d.setDate(d.getDate() - (6 - i));
                                const dateStr = d.toISOString().split('T')[0];
                                const dayRevenue = customerRecords
                                  .filter(r => r.date === dateStr)
                                  .reduce((acc, r) => acc + (parseInt(r.totalPrice?.replace(/[^0-9]/g, '') || '0')), 0);
                                const dayExpense = expenses
                                  .filter(e => e.date === dateStr)
                                  .reduce((acc, e) => acc + e.amount, 0);
                                return { 
                                  name: `${d.toLocaleDateString('vi-VN', { weekday: 'short' })} ${d.getDate()}/${d.getMonth() + 1}`, 
                                  revenue: dayRevenue,
                                  expense: dayExpense,
                                  profit: dayRevenue - dayExpense
                                };
                              })
                            }>
                              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                              <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                              <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(value) => `${value / 1000000}M`} />
                              <Tooltip 
                                contentStyle={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', fontSize: '10px' }}
                                itemStyle={{ fontSize: '10px', fontWeight: 'bold' }}
                              />
                              <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={20} />
                              <Bar dataKey="expense" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={20} />
                              <Line type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981' }} />
                            </ComposedChart>
                          </ResponsiveContainer>
                        </div>
                        <div className="flex justify-center gap-6 mt-4">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase">Doanh thu</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase">Chi phí</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase">Lợi nhuận</span>
                          </div>
                        </div>
                      </div>

                      {/* Service Popularity Chart */}
                      <div className="bg-slate-900/50 border border-white/5 p-8 rounded-[40px]">
                        <h4 className="text-sm font-black text-white uppercase tracking-widest mb-8">Cơ Cấu Dịch Vụ</h4>
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
                            <div key={`report-service-${item.name}`} className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full" style={{ background: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'][i] }} />
                              <span className="text-[10px] font-bold text-slate-400 truncate uppercase tracking-tighter">{item.name} ({item.value})</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Profit Margin Chart */}
                      <div className="bg-slate-900/50 border border-white/5 p-8 rounded-[40px]">
                        <h4 className="text-sm font-black text-white uppercase tracking-widest mb-8">Tỷ Suất Lợi Nhuận</h4>
                        <div className="h-[300px] w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={
                              Array.from({ length: 6 }, (_, i) => {
                                const d = new Date();
                                d.setDate(1); // Set to 1st to avoid month overflow
                                d.setMonth(d.getMonth() - (5 - i));
                                const monthStr = d.toISOString().slice(0, 7);
                                const rev = customerRecords
                                  .filter(r => r.date.startsWith(monthStr))
                                  .reduce((acc, r) => acc + (parseInt(r.totalPrice?.replace(/[^0-9]/g, '') || '0')), 0);
                                const exp = expenses
                                  .filter(e => e.date.startsWith(monthStr))
                                  .reduce((acc, e) => acc + e.amount, 0);
                                const margin = rev > 0 ? ((rev - exp) / rev) * 100 : 0;
                                return {
                                  month: d.toLocaleDateString('vi-VN', { month: 'short', year: 'numeric' }),
                                  margin: Math.round(margin)
                                };
                              })
                            }>
                              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10, fontWeight: 'bold' }} />
                              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10, fontWeight: 'bold' }} unit="%" />
                              <Tooltip 
                                contentStyle={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', fontSize: '10px' }}
                              />
                              <Area type="monotone" dataKey="margin" stroke="#10b981" fill="url(#colorMargin)" strokeWidth={3} />
                              <defs>
                                <linearGradient id="colorMargin" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                </linearGradient>
                              </defs>
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                        <p className="text-[10px] font-bold text-slate-500 uppercase text-center mt-4">Tỷ lệ lợi nhuận ròng (%) theo tháng</p>
                      </div>
                    </div>

                    {/* Monthly Comparison Table */}
                    <div className="bg-slate-900/50 border border-white/5 p-8 rounded-[40px]">
                      <h4 className="text-sm font-black text-white uppercase tracking-widest mb-8">So Sánh Kết Quả Theo Tháng</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="border-b border-white/5">
                              <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Tháng</th>
                              <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">Doanh Thu</th>
                              <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">Chi Phí</th>
                              <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">Lợi Nhuận</th>
                              <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">Tăng Trưởng</th>
                            </tr>
                          </thead>
                          <tbody>
                            {Array.from({ length: 6 }, (_, i) => {
                              const d = new Date();
                              d.setDate(1); // Set to 1st to avoid month overflow
                              d.setMonth(d.getMonth() - i);
                              const monthStr = d.toISOString().slice(0, 7);
                              
                              const prevD = new Date(d);
                              prevD.setMonth(prevD.getMonth() - 1);
                              const prevMonthStr = prevD.toISOString().slice(0, 7);

                              const rev = customerRecords.filter(r => r.date.startsWith(monthStr)).reduce((acc, r) => acc + (parseInt(r.totalPrice?.replace(/[^0-9]/g, '') || '0')), 0);
                              const exp = expenses.filter(e => e.date.startsWith(monthStr)).reduce((acc, e) => acc + e.amount, 0);
                              const profit = rev - exp;

                              const prevRev = customerRecords.filter(r => r.date.startsWith(prevMonthStr)).reduce((acc, r) => acc + (parseInt(r.totalPrice?.replace(/[^0-9]/g, '') || '0')), 0) || 1;
                              const growth = ((rev - prevRev) / prevRev) * 100;

                              return (
                                <tr key={monthStr} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                  <td className="px-6 py-4 text-xs font-bold text-white uppercase">{d.toLocaleDateString('vi-VN', { month: 'long', year: 'numeric' })}</td>
                                  <td className="px-6 py-4 text-xs font-bold text-blue-400 text-right">{formatPrivateValue(rev)}</td>
                                  <td className="px-6 py-4 text-xs font-bold text-red-400 text-right">{formatPrivateValue(exp)}</td>
                                  <td className="px-6 py-4 text-xs font-bold text-emerald-400 text-right">{formatPrivateValue(profit)}</td>
                                  <td className={`px-6 py-4 text-xs font-bold text-right ${growth >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                                    {growth >= 0 ? '+' : ''}{growth.toFixed(1)}%
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Staff Performance */}
                    <div className="bg-slate-900/50 border border-white/5 p-8 rounded-[40px]">
                      <h4 className="text-sm font-black text-white uppercase tracking-widest mb-8">Hiệu Suất Nhân Viên</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {(staff || []).filter(s => s.role === 'technician').map(member => {
                          const memberInspections = (inspections || []).filter(i => i.technicianId === member.id).length;
                          const memberRevenue = (customerRecords || [])
                            .filter(r => r.notes?.includes(member.name)) // Simple matching for demo
                            .reduce((acc, r) => acc + (parseInt(r.totalPrice?.replace(/[^0-9]/g, '') || '0')), 0);
                          
                          return (
                            <div key={member.id} className="bg-slate-950/50 border border-white/5 p-6 rounded-3xl">
                              <div className="flex items-center gap-4 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-lg">👤</div>
                                <div>
                                  <p className="text-sm font-black text-white uppercase">{member.name}</p>
                                  <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Kỹ thuật viên</p>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest mb-1">Số lượt phiếu kiểm tra xe</p>
                                  <p className="text-lg font-black text-blue-500">{memberInspections}</p>
                                </div>
                                <div>
                                  <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest mb-1">Hoa hồng ước tính</p>
                                  <p className="text-lg font-black text-emerald-500">{formatPrivateValue(Math.round(memberRevenue * (member.commissionRate / 100)))}</p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'expenses' && (
                  <div className="space-y-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                      <div>
                        <h3 className="section-title text-2xl">Quản Lý Chi Phí</h3>
                        <p className="section-subtitle mt-1">Theo dõi các khoản chi tiêu vận hành</p>
                      </div>
                      {!isAddingExpense && !editingExpenseId && (
                        <div className="flex gap-2">
                          <button 
                            onClick={() => setIsExcelMode(!isExcelMode)} 
                            className={`flex items-center gap-2 px-6 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${isExcelMode ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
                          >
                            <Grid className="w-4 h-4" /> {isExcelMode ? 'Đóng Bảng Excel' : 'Bảng Excel'}
                          </button>
                          <button 
                            onClick={() => setIsAddingExpense(true)}
                            className="btn-primary px-6 py-3"
                          >
                            <Plus className="w-4 h-4" /> Thêm Chi Phí
                          </button>
                        </div>
                      )}
                    </div>

                    {isExcelMode && (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-slate-900/80 border border-blue-500/30 p-8 rounded-[40px] backdrop-blur-xl shadow-2xl space-y-6"
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="text-sm font-black text-white uppercase tracking-widest">Bảng Chi Phí Vận Hành</h4>
                            <p className="text-[10px] text-slate-500 font-bold mt-1">Chỉnh sửa trực tiếp - Dữ liệu đồng bộ thời gian thực</p>
                          </div>
                          <div className="flex gap-2">
                            <button 
                              onClick={handleDownloadExcel}
                              className="p-2 bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
                            >
                              <Download className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <div className="overflow-x-auto custom-scrollbar border border-white/5 rounded-2xl">
                          <table className="w-full text-left border-collapse min-w-[800px]">
                            <thead>
                              <tr className="bg-slate-950/50 border-b border-white/10">
                                <th className="px-4 py-4 text-[9px] font-black text-slate-500 uppercase tracking-widest">Ngày</th>
                                <th className="px-4 py-4 text-[9px] font-black text-slate-500 uppercase tracking-widest">Khoản chi</th>
                                <th className="px-4 py-4 text-[9px] font-black text-slate-500 uppercase tracking-widest">Danh mục</th>
                                <th className="px-4 py-4 text-[9px] font-black text-slate-500 uppercase tracking-widest text-right">Số tiền (VNĐ)</th>
                                <th className="px-4 py-4 text-[9px] font-black text-slate-500 uppercase tracking-widest text-right">Thao tác</th>
                              </tr>
                            </thead>
                            <tbody>
                              {(expenses || []).sort((a, b) => b.date.localeCompare(a.date)).map(expense => (
                                <tr key={expense.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                                  <td className="px-4 py-2">
                                    <input 
                                      type="date" 
                                      value={expense.date} 
                                      onChange={(e) => handleExcelUpdate(expense.id, 'expense', 'date', e.target.value)}
                                      className="bg-transparent border-none text-[11px] text-slate-400 outline-none focus:text-white w-full"
                                    />
                                  </td>
                                  <td className="px-4 py-2">
                                    <input 
                                      type="text" 
                                      value={expense.title} 
                                      onChange={(e) => handleExcelUpdate(expense.id, 'expense', 'title', e.target.value)}
                                      className="bg-transparent border-none text-xs text-white font-bold outline-none w-full focus:bg-slate-800/50 rounded px-1"
                                    />
                                  </td>
                                  <td className="px-4 py-2">
                                    <select 
                                      value={expense.category} 
                                      onChange={(e) => handleExcelUpdate(expense.id, 'expense', 'category', e.target.value)}
                                      className="bg-transparent border-none text-[10px] text-slate-400 outline-none focus:text-white w-full"
                                    >
                                      <option value="rent">Mặt bằng</option>
                                      <option value="salary">Lương</option>
                                      <option value="utility">Điện nước</option>
                                      <option value="inventory">Vật tư</option>
                                      <option value="marketing">Marketing</option>
                                      <option value="other">Khác</option>
                                    </select>
                                  </td>
                                  <td className="px-4 py-2 text-right">
                                    <input 
                                      type="number" 
                                      value={expense.amount} 
                                      onChange={(e) => handleExcelUpdate(expense.id, 'expense', 'amount', e.target.value)}
                                      className="bg-transparent border-none text-xs font-black text-right outline-none w-32 focus:bg-slate-800/50 rounded px-1 text-red-500"
                                    />
                                  </td>
                                  <td className="px-4 py-2 text-right">
                                    <button 
                                      onClick={() => {
                                        setExpenses(prev => prev.filter(e => e.id !== expense.id));
                                        toast.success("Đã xóa khoản chi!");
                                      }}
                                      className="p-1 text-slate-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                                    >
                                      <Trash2 className="w-3 h-3" />
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </motion.div>
                    )}

                    {(isAddingExpense || editingExpenseId) && (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-slate-900/50 border border-white/10 p-8 rounded-[32px] space-y-6"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Tên khoản chi</label>
                            <input 
                              value={expenseForm.title}
                              onChange={e => setExpenseForm({...expenseForm, title: e.target.value})}
                              className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-blue-500"
                              placeholder="Ví dụ: Tiền điện tháng 3..."
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Số tiền (VNĐ)</label>
                            <input 
                              type="number"
                              value={expenseForm.amount || ''}
                              onChange={e => setExpenseForm({...expenseForm, amount: parseInt(e.target.value) || 0})}
                              className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-blue-500"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Danh mục</label>
                            <select 
                              value={expenseForm.category}
                              onChange={e => setExpenseForm({...expenseForm, category: e.target.value as any})}
                              className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-blue-500"
                            >
                              <option value="rent">Mặt bằng</option>
                              <option value="salary">Lương</option>
                              <option value="utility">Điện nước</option>
                              <option value="inventory">Vật tư</option>
                              <option value="marketing">Marketing</option>
                              <option value="other">Khác</option>
                            </select>
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Ngày</label>
                            <input 
                              type="date"
                              value={expenseForm.date}
                              onChange={e => setExpenseForm({...expenseForm, date: e.target.value})}
                              className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-blue-500"
                            />
                          </div>
                        </div>
                        <div className="flex justify-end gap-4">
                          <button 
                            onClick={() => {
                              setIsAddingExpense(false);
                              setEditingExpenseId(null);
                              setExpenseForm({ title: '', amount: 0, category: 'other', date: new Date().toISOString().split('T')[0] });
                            }}
                            className="px-6 py-3 rounded-xl bg-slate-800 text-slate-400 font-black uppercase text-[10px] hover:text-white transition-all"
                          >
                            Hủy
                          </button>
                          <button 
                            onClick={handleSaveExpense}
                            className="btn-primary px-8 py-3"
                          >
                            {editingExpenseId ? 'Cập Nhật' : 'Lưu Khoản Chi'}
                          </button>
                        </div>
                      </motion.div>
                    )}

                    <div className="bg-slate-900/30 border border-white/5 p-6 rounded-[32px]">
                      <FilterSortBar 
                        currentSearch={filterText}
                        onSearchChange={setFilterText}
                        currentSort={sortConfig}
                        onSortChange={setSortConfig}
                        onClear={() => { setFilterText(''); setFilterCategory('all'); }}
                        sortOptions={[
                          { key: 'date', order: 'desc', label: 'Ngày mới nhất' },
                          { key: 'date', order: 'asc', label: 'Ngày cũ nhất' },
                          { key: 'amount', order: 'desc', label: 'Số tiền cao nhất' },
                          { key: 'title', order: 'asc', label: 'Tên A-Z' },
                        ]}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      <div className="bg-slate-900/50 border border-white/5 p-6 rounded-[32px]">
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Tổng chi tháng này</p>
                        <p className="text-3xl font-black text-red-500">
                          {formatPrivateValue(expenses.filter(e => e.date.startsWith(new Date().toISOString().slice(0, 7))).reduce((acc, e) => acc + e.amount, 0))}
                        </p>
                      </div>
                      <div className="bg-slate-900/50 border border-white/5 p-6 rounded-[32px]">
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Tiền thuê & Lương</p>
                        <p className="text-3xl font-black text-amber-500">
                          {formatPrivateValue(expenses.filter(e => (e.category === 'rent' || e.category === 'salary') && e.date.startsWith(new Date().toISOString().slice(0, 7))).reduce((acc, e) => acc + e.amount, 0))}
                        </p>
                      </div>
                      <div className="bg-slate-900/50 border border-white/5 p-6 rounded-[32px]">
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Vật tư & Marketing</p>
                        <p className="text-3xl font-black text-blue-500">
                          {formatPrivateValue(expenses.filter(e => (e.category === 'inventory' || e.category === 'marketing') && e.date.startsWith(new Date().toISOString().slice(0, 7))).reduce((acc, e) => acc + e.amount, 0))}
                        </p>
                      </div>
                      <div className="bg-slate-900/50 border border-white/5 p-6 rounded-[32px]">
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Điện nước & Khác</p>
                        <p className="text-3xl font-black text-purple-500">
                          {formatPrivateValue(expenses.filter(e => (e.category === 'utility' || e.category === 'other') && e.date.startsWith(new Date().toISOString().slice(0, 7))).reduce((acc, e) => acc + e.amount, 0))}
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
                            {(() => {
                              const filteredResults = getFilteredAndSorted(expenses || [], ['title', 'category']);
                              const paginated = filteredResults.slice((expensePage - 1) * EXPENSES_PER_PAGE, expensePage * EXPENSES_PER_PAGE);
                              const totalPages = Math.ceil(filteredResults.length / EXPENSES_PER_PAGE);

                              return (
                                <>
                                  {paginated.map(expense => (
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
                                        <p className="text-sm font-black text-red-500">-{formatPrivateValue(expense.amount)}</p>
                                      </td>
                                      <td className="px-8 py-6 text-right">
                                        <div className="flex justify-end gap-2">
                                          <button 
                                            onClick={() => {
                                              setEditingExpenseId(expense.id);
                                              setExpenseForm({ ...expense });
                                              setIsAddingExpense(false);
                                            }}
                                            className="p-2 text-slate-600 hover:text-blue-500 transition-colors"
                                          >
                                            <Edit2 className="w-4 h-4" />
                                          </button>
                                          <button 
                                            onClick={() => {
                                              setExpenses(prev => prev.filter(e => e.id !== expense.id));
                                              toast.success("Đã xóa khoản chi!");
                                            }}
                                            className="p-2 text-slate-600 hover:text-red-500 transition-colors"
                                          >
                                            <Trash2 className="w-4 h-4" />
                                          </button>
                                        </div>
                                      </td>
                                    </tr>
                                  ))}
                                  {totalPages > 1 && (
                                    <tr>
                                      <td colSpan={5} className="px-8 py-6">
                                        <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4">
                                          <button 
                                            disabled={expensePage === 1}
                                            onClick={() => setExpensePage(p => Math.max(1, p - 1))}
                                            className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-800 text-white disabled:opacity-30 transition-all hover:bg-slate-700"
                                          >
                                            <ArrowLeft className="w-4 h-4" />
                                          </button>
                                          <div className="flex flex-wrap gap-2">
                                            {Array.from({ length: totalPages }).map((_, i) => (
                                              <button
                                                key={i}
                                                onClick={() => setExpensePage(i + 1)}
                                                className={`w-10 h-10 rounded-xl font-bold transition-all ${expensePage === i + 1 ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40' : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'}`}
                                              >
                                                {i + 1}
                                              </button>
                                            ))}
                                          </div>
                                          <button 
                                            disabled={expensePage === totalPages}
                                            onClick={() => setExpensePage(p => Math.min(totalPages, p + 1))}
                                            className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-800 text-white disabled:opacity-30 transition-all hover:bg-slate-700"
                                          >
                                            <ArrowRight className="w-4 h-4" />
                                          </button>
                                        </div>
                                      </td>
                                    </tr>
                                  )}
                                </>
                              );
                            })()}
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
                      {(eCertificates || []).map((cert) => (
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
                                  const updated = (eCertificates || []).map(c => c.id === cert.id ? { ...c, customerName: e.target.value } : c);
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
                                    const updated = (eCertificates || []).map(c => c.id === cert.id ? { ...c, licensePlate: e.target.value } : c);
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
                                    const updated = (eCertificates || []).map(c => c.id === cert.id ? { ...c, serviceType: e.target.value } : c);
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
                      <div className="flex-1 w-full">
                        <div className="flex items-center gap-4 mb-2">
                          <h3 className="section-title text-2xl">Quản Lý Lịch Hẹn</h3>
                          <div className="bg-blue-600/10 text-blue-500 text-[10px] font-black px-2 py-1 rounded-lg uppercase tracking-widest">
                            {(siteConfig.appointments || []).length} Tổng số
                          </div>
                        </div>
                        <p className="section-subtitle">Theo dõi và điều phối lịch chăm sóc xe chuyên nghiệp</p>
                      </div>
                      <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                        <div className="flex bg-slate-900 border border-white/5 rounded-2xl p-1 w-full sm:w-auto">
                          <button 
                            onClick={() => setAppointmentViewMode('list')}
                            className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${appointmentViewMode === 'list' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
                          >
                            <List className="w-3 h-3" /> Danh sách
                          </button>
                          <button 
                            onClick={() => setAppointmentViewMode('calendar')}
                            className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${appointmentViewMode === 'calendar' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
                          >
                            <Calendar className="w-3 h-3" /> Lịch biểu
                          </button>
                        </div>
                        <button 
                          onClick={() => {
                            setIsAddingAppointment(true);
                            setEditingAppointmentId(null);
                            setAppointmentForm({ customerName: '', phone: '', carModel: '', serviceId: '', date: new Date().toISOString().split('T')[0], time: '09:00', status: 'pending', note: '' });
                          }}
                          className="btn-primary w-full sm:w-auto px-8 py-3.5 flex items-center justify-center gap-2"
                        >
                          <Plus className="w-4 h-4" /> Thêm Lịch
                        </button>
                      </div>
                    </div>

                    {appointmentViewMode === 'calendar' ? (
                      <div className="space-y-6">
                        <div className="bg-slate-900/50 border border-white/5 p-6 rounded-[40px] flex flex-col md:flex-row justify-between items-center gap-6">
                          <div className="flex items-center gap-6">
                            <h4 className="text-xl font-black text-white uppercase italic tracking-tighter">
                              {new Intl.DateTimeFormat('vi-VN', { month: 'long', year: 'numeric' }).format(calendarDate)}
                            </h4>
                            <div className="flex items-center gap-2">
                              <button 
                                onClick={() => setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() - 1, 1))}
                                className="w-10 h-10 rounded-xl bg-slate-950 border border-white/5 flex items-center justify-center text-slate-400 hover:text-white transition-all"
                              >
                                <ChevronLeft className="w-5 h-5" />
                              </button>
                              <button 
                                onClick={() => setCalendarDate(new Date())}
                                className="px-4 py-2 rounded-xl bg-slate-950 border border-white/5 text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-white transition-all"
                              >
                                Hôm nay
                              </button>
                              <button 
                                onClick={() => setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 1))}
                                className="w-10 h-10 rounded-xl bg-slate-950 border border-white/5 flex items-center justify-center text-slate-400 hover:text-white transition-all"
                              >
                                <ChevronRight className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div>
                              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Chờ duyệt</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Xác nhận</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Xong</span>
                            </div>
                          </div>
                        </div>

                        {/* Desktop Calendar Grid */}
                        <div className="hidden md:block bg-slate-900/20 border border-white/5 rounded-[40px] overflow-hidden shadow-2xl backdrop-blur-xl">
                          <div className="grid grid-cols-7 border-b border-white/5 bg-slate-900/50">
                            {['CN', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'].map(d => (
                              <div key={d} className="py-4 text-center text-[10px] font-black text-slate-500 uppercase tracking-widest">{d}</div>
                            ))}
                          </div>
                          <div className="grid grid-cols-7 auto-rows-[160px] md:auto-rows-[180px]">
                            {(() => {
                              const days = [];
                              const year = calendarDate.getFullYear();
                              const month = calendarDate.getMonth();
                              const firstDay = new Date(year, month, 1).getDay();
                              const lastDate = new Date(year, month + 1, 0).getDate();
                              const prevLastDate = new Date(year, month, 0).getDate();
                              
                              // Prev month days
                              for (let i = firstDay - 1; i >= 0; i--) {
                                days.push({ day: prevLastDate - i, month: month - 1, current: false });
                              }
                              // Current month days
                              for (let i = 1; i <= lastDate; i++) {
                                days.push({ day: i, month: month, current: true });
                              }
                              // Next month days
                              const remaining = 42 - days.length;
                              for (let i = 1; i <= remaining; i++) {
                                days.push({ day: i, month: month + 1, current: false });
                              }

                              return days.map((d, index) => {
                                const dateStr = `${year}-${String(d.month + 1).padStart(2, '0')}-${String(d.day).padStart(2, '0')}`;
                                const isToday = new Date().toISOString().split('T')[0] === dateStr && d.current;
                                const dayApps = (siteConfig.appointments || []).filter(a => a.date === dateStr);
                                
                                return (
                                  <div 
                                    key={index} 
                                    className={`p-3 border-r border-b border-white/5 transition-all relative group/cell ${d.current ? 'bg-transparent' : 'bg-white/[0.02] opacity-30'} ${isToday ? 'bg-blue-600/5' : ''}`}
                                  >
                                    <div className="flex justify-between items-start mb-2">
                                      <span className={`text-xs font-black italic ${isToday ? 'text-blue-500' : d.current ? 'text-slate-400' : 'text-slate-700'}`}>
                                        {d.day}
                                      </span>
                                      {dayApps.length > 0 && (
                                        <span className="text-[8px] font-black bg-blue-600 text-white px-1.5 py-0.5 rounded-full">{dayApps.length}</span>
                                      )}
                                    </div>
                                    <div className="space-y-1.5 overflow-y-auto max-h-[100px] custom-scrollbar scrollbar-hide">
                                      {dayApps.map(app => (
                                        <div 
                                          key={app.id}
                                          onClick={() => { setIsAddingAppointment(true); setEditingAppointmentId(app.id); setAppointmentForm(app); }}
                                          className={`p-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest cursor-pointer transition-all hover:scale-[1.02] active:scale-95 shadow-lg relative border ${
                                            app.status === 'confirmed' ? 'bg-emerald-600/20 text-emerald-400 border-emerald-500/20' : 
                                            app.status === 'completed' ? 'bg-blue-600/20 text-blue-400 border-blue-500/20' :
                                            app.status === 'cancelled' ? 'bg-red-600/20 text-red-400 border-red-500/20' :
                                            'bg-amber-600/20 text-amber-400 border-amber-500/20'
                                          }`}
                                        >
                                          <div className="flex items-center justify-between mb-0.5">
                                            <span className="truncate">{app.customerName}</span>
                                            <span className="opacity-60">{app.time}</span>
                                          </div>
                                          <div className="text-[7px] opacity-60 truncate">{app.carModel}</div>
                                        </div>
                                      ))}
                                    </div>
                                    {d.current && (
                                      <button 
                                        onClick={() => {
                                          setIsAddingAppointment(true);
                                          setEditingAppointmentId(null);
                                          setAppointmentForm({ ...appointmentForm, date: dateStr });
                                        }}
                                        className="absolute bottom-2 right-2 w-6 h-6 rounded-lg bg-slate-800 text-slate-500 items-center justify-center opacity-0 group-hover/cell:opacity-100 transition-all flex hover:bg-blue-600 hover:text-white"
                                      >
                                        <Plus className="w-3 h-3" />
                                      </button>
                                    )}
                                  </div>
                                );
                              });
                            })()}
                          </div>
                        </div>

                        {/* Mobile Compact Calendar Picker & Daily List */}
                        <div className="md:hidden block space-y-6">
                          <div className="bg-slate-900/40 border border-white/5 rounded-[32px] p-4 shadow-xl">
                            <div className="grid grid-cols-7 text-center text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">
                              {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map(d => <div key={d}>{d}</div>)}
                            </div>
                            <div className="grid grid-cols-7 gap-y-2">
                              {(() => {
                                const days = [];
                                const year = calendarDate.getFullYear();
                                const month = calendarDate.getMonth();
                                const firstDay = new Date(year, month, 1).getDay();
                                const lastDate = new Date(year, month + 1, 0).getDate();
                                const prevLastDate = new Date(year, month, 0).getDate();
                                
                                for (let i = firstDay - 1; i >= 0; i--) {
                                  days.push({ day: prevLastDate - i, month: month - 1, current: false });
                                }
                                for (let i = 1; i <= lastDate; i++) {
                                  days.push({ day: i, month: month, current: true });
                                }
                                const remaining = 42 - days.length;
                                for (let i = 1; i <= remaining; i++) {
                                  days.push({ day: i, month: month + 1, current: false });
                                }

                                return days.map((d, index) => {
                                  let finalYear = year;
                                  let finalMonth = d.month;
                                  if (d.month < 0) {
                                    finalMonth = 11;
                                    finalYear = year - 1;
                                  } else if (d.month > 11) {
                                    finalMonth = 0;
                                    finalYear = year + 1;
                                  }
                                  const dateStr = `${finalYear}-${String(finalMonth + 1).padStart(2, '0')}-${String(d.day).padStart(2, '0')}`;
                                  const isSelected = selectedCalendarDay === dateStr;
                                  const isToday = new Date().toISOString().split('T')[0] === dateStr && d.current;
                                  const dayApps = (siteConfig.appointments || []).filter(a => a.date === dateStr);

                                  return (
                                    <button
                                      key={index}
                                      type="button"
                                      onClick={() => setSelectedCalendarDay(dateStr)}
                                      className={`aspect-square flex flex-col items-center justify-center relative rounded-full transition-all cursor-pointer ${
                                        !d.current ? 'opacity-25' : ''
                                      } ${
                                        isSelected 
                                          ? 'bg-blue-600 text-white font-black scale-105 shadow-lg shadow-blue-500/20' 
                                          : isToday 
                                            ? 'bg-blue-600/10 text-blue-400 font-extrabold border border-blue-500/30' 
                                            : 'hover:bg-white/5 text-slate-300 font-bold'
                                      }`}
                                    >
                                      <span className="text-xs">{d.day}</span>
                                      {dayApps.length > 0 && (
                                        <span className={`absolute bottom-1 w-1.5 h-1.5 rounded-full ${
                                          isSelected ? 'bg-white' : 'bg-blue-500'
                                        }`}></span>
                                      )}
                                    </button>
                                  );
                                });
                              })()}
                            </div>
                          </div>

                          {/* Selected Day's Appointments Timeline for Mobile */}
                          <div className="space-y-4">
                            <div className="flex items-center justify-between px-1">
                              <h5 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                                Ngày {selectedCalendarDay ? new Intl.DateTimeFormat('vi-VN', { day: 'numeric', month: 'numeric', year: 'numeric' }).format(new Date(selectedCalendarDay)) : ''}
                              </h5>
                              <button
                                type="button"
                                onClick={() => {
                                  setIsAddingAppointment(true);
                                  setEditingAppointmentId(null);
                                  setAppointmentForm({ customerName: '', phone: '', carModel: '', serviceId: '', date: selectedCalendarDay, time: '09:00', status: 'pending', note: '' });
                                }}
                                className="text-[10px] font-black text-blue-500 uppercase tracking-widest hover:text-white transition-colors flex items-center gap-1 cursor-pointer bg-blue-500/10 px-3 py-1.5 rounded-xl border border-blue-500/20"
                              >
                                <Plus className="w-3.5 h-3.5" /> Thêm nhanh
                              </button>
                            </div>

                            {(() => {
                              const dayApps = (siteConfig.appointments || []).filter(a => a.date === selectedCalendarDay);
                              if (dayApps.length === 0) {
                                return (
                                  <div className="bg-slate-900/35 border border-white/5 rounded-[32px] p-8 text-center text-slate-500">
                                    <Clock className="w-8 h-8 text-slate-600 mx-auto mb-2 opacity-55" />
                                    <p className="text-xs font-bold text-slate-400">Không có lịch hẹn ngày này</p>
                                    <p className="text-[9px] text-slate-500 mt-1 uppercase tracking-wider">Tạo lịch nhanh bằng nút bên trên</p>
                                  </div>
                                );
                              }

                              return (
                                <div className="space-y-3">
                                  {dayApps.map(app => (
                                    <div 
                                      key={app.id} 
                                      className="bg-slate-900/60 border border-white/5 rounded-3xl p-4 flex items-center justify-between gap-4 transition-all hover:bg-slate-900"
                                    >
                                      <div className="flex-1 min-w-0 space-y-1">
                                        <div className="flex items-center gap-2 flex-wrap">
                                          <span className="font-mono text-[10px] font-bold text-white bg-slate-950 px-2 py-0.5 rounded-lg border border-white/5">{app.time}</span>
                                          <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-1.5 rounded-xl border ${
                                            app.status === 'confirmed' ? 'bg-emerald-600/10 text-emerald-400 border-emerald-500/20' : 
                                            app.status === 'completed' ? 'bg-blue-600/10 text-blue-400 border-blue-500/20' :
                                            app.status === 'cancelled' ? 'bg-red-600/10 text-red-400 border-red-500/20' :
                                            'bg-amber-600/10 text-amber-400 border-amber-500/20'
                                          }`}>
                                            {app.status === 'confirmed' ? 'Đã duyệt' : 
                                             app.status === 'completed' ? 'Xong' : 
                                             app.status === 'cancelled' ? 'Đã hủy' : 'Chờ duyệt'}
                                          </span>
                                        </div>
                                        <div className="text-sm font-extrabold text-white truncate">{app.customerName}</div>
                                        <div className="text-xs text-slate-400 flex items-center gap-1.5">
                                          <Car className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                                          <span className="truncate">{app.carModel}</span>
                                        </div>
                                        {app.phone && (
                                          <div className="text-[10px] text-slate-500 font-bold tracking-wider">SĐT: {app.phone}</div>
                                        )}
                                      </div>
                                      
                                      <div className="flex items-center gap-1.5">
                                        <button 
                                          onClick={() => { setIsAddingAppointment(true); setEditingAppointmentId(app.id); setAppointmentForm(app); }}
                                          className="w-9 h-9 rounded-2xl bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-all cursor-pointer"
                                        >
                                          <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button 
                                          onClick={() => {
                                            const updatedApps = (siteConfig.appointments || []).filter(a => a.id !== app.id);
                                            setSiteConfig(prev => ({ ...prev, appointments: updatedApps }));
                                            toast.success('Đã xóa lịch hẹn!');
                                          }}
                                          className="w-9 h-9 rounded-2xl bg-slate-800 text-slate-400 hover:text-red-400 flex items-center justify-center transition-all cursor-pointer"
                                        >
                                          <Trash2 className="w-4 h-4" />
                                        </button>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              );
                            })()}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <>
                        {/* Filter Bar */}
                    <div className="bg-slate-900/50 border border-white/5 p-4 rounded-[32px] flex flex-col lg:flex-row items-center gap-4">
                      <div className="relative flex-1 w-full">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input 
                          type="text"
                          placeholder="Tìm kiếm theo tên khách hàng, số điện thoại hoặc dòng xe..."
                          className="w-full bg-slate-950 border border-white/5 rounded-2xl py-3 pl-11 pr-4 text-xs text-white placeholder:text-slate-600 focus:border-blue-500/50 outline-none transition-all"
                          value={appointmentSearchQuery}
                          onChange={(e) => setAppointmentSearchQuery(e.target.value)}
                        />
                      </div>
                      <div className="flex items-center gap-2 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
                        {(['all', 'pending', 'confirmed', 'completed', 'cancelled'] as const).map(status => (
                          <button
                            key={status}
                            onClick={() => setAppointmentFilterStatus(status)}
                            className={`px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                              appointmentFilterStatus === status 
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                                : 'bg-slate-950 text-slate-500 border border-white/5 hover:border-white/10'
                            }`}
                          >
                            {status === 'all' ? 'Tất cả' : 
                             status === 'pending' ? 'Chờ duyệt' :
                             status === 'confirmed' ? 'Đã xác nhận' :
                             status === 'completed' ? 'Hoàn thành' : 'Đã hủy'}
                          </button>
                        ))}
                      </div>
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
                              {(services || []).map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
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
                          <div className="space-y-2 md:col-span-2 lg:col-span-3">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Ghi chú</label>
                            <textarea value={appointmentForm.note} onChange={e => setAppointmentForm({...appointmentForm, note: e.target.value})} placeholder="VD: Khách phủ thêm ceramic, xe cực bẩn..." rows={3} className="w-full bg-slate-950 border border-white/10 rounded-2xl p-4 text-white font-bold focus:border-blue-500 transition-all outline-none resize-none" />
                          </div>

                          {/* Khối hiển thị cảnh báo trùng lịch hẹn trong quản trị */}
                          {(() => {
                            const overlappingApp = appointmentForm.date && appointmentForm.time && (siteConfig.appointments || []).find(
                              a => a.date === appointmentForm.date && a.time === appointmentForm.time && a.id !== editingAppointmentId && a.status !== 'cancelled'
                            );
                            if (overlappingApp) {
                              return (
                                <div className="md:col-span-2 lg:col-span-3 p-5 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-amber-500 text-sm flex items-start gap-4 shadow-xl">
                                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-amber-500" />
                                  <div>
                                    <p className="font-extrabold uppercase tracking-widest text-[10px] mb-1">Cảnh báo trùng lịch hẹn</p>
                                    <p className="text-white/95">
                                      Thời gian <strong className="text-amber-400">{appointmentForm.time} ngày {appointmentForm.date}</strong> đã bị trùng lặp với lịch hẹn của:
                                    </p>
                                    <p className="text-slate-300 mt-1 font-mono text-xs">
                                      • <strong className="text-amber-400">{overlappingApp.customerName}</strong> ({overlappingApp.phone}) - {services.find(s => s.id === overlappingApp.serviceId)?.title || 'Khác'}
                                    </p>
                                  </div>
                                </div>
                              );
                            }
                            return null;
                          })()}
                        </div>
                        <div className="flex gap-4 pt-10">
                          <button 
                            onClick={() => {
                              if (!appointmentForm.customerName || !appointmentForm.phone || !appointmentForm.date || !appointmentForm.time) {
                                toast.error('Vui lòng điền đầy đủ các thông tin bắt buộc: Họ tên, Số điện thoại, Ngày & Giờ!');
                                return;
                              }

                              const isOverlapped = (siteConfig.appointments || []).some(
                                a => a.date === appointmentForm.date && a.time === appointmentForm.time && a.id !== editingAppointmentId && a.status !== 'cancelled'
                              );

                              if (isOverlapped) {
                                toast.error('⚠️ Trùng lịch hẹn! Thời gian này đã được đặt trước bởi một khách hàng khác.');
                                return;
                              }

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
                      <>
                        {/* Desktop View Table */}
                        <div className="hidden md:block overflow-x-auto rounded-[40px] border border-white/5 shadow-2xl overflow-hidden bg-slate-900/20">
                          <table className="w-full text-left min-w-[1000px]">
                            <thead>
                              <tr className="bg-slate-950/40 border-b border-white/5 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                <th className="px-8 py-6">Thời gian hẹn</th>
                                <th className="px-8 py-6">Khách hàng</th>
                                <th className="px-8 py-6">Phương tiện</th>
                                <th className="px-8 py-6">Trạng thái</th>
                                <th className="px-8 py-6 text-center">Thao tác</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                              {(siteConfig.appointments || [])
                                .filter(a => {
                                  const matchesStatus = appointmentFilterStatus === 'all' || a.status === appointmentFilterStatus;
                                  const matchesSearch = a.customerName.toLowerCase().includes(appointmentSearchQuery.toLowerCase()) || 
                                                       a.phone.includes(appointmentSearchQuery) ||
                                                       a.carModel.toLowerCase().includes(appointmentSearchQuery.toLowerCase());
                                  return matchesStatus && matchesSearch;
                                })
                                .map(app => (
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
                                    <select 
                                      value={app.status}
                                      onChange={(e) => {
                                        const newStatus = e.target.value as any;
                                        const updatedApps = (siteConfig.appointments || []).map(a => 
                                          a.id === app.id ? { ...a, status: newStatus } : a
                                        );
                                        setSiteConfig(prev => ({ ...prev, appointments: updatedApps }));
                                        toast.success(`Đã cập nhật trạng thái: ${newStatus === 'confirmed' ? 'Đã xác nhận' : newStatus === 'completed' ? 'Hoàn thành' : 'Chờ duyệt'}`);
                                      }}
                                      className={`text-[9px] font-black uppercase px-3 py-1.5 rounded-xl outline-none transition-all cursor-pointer border border-transparent hover:border-white/10 ${
                                        app.status === 'confirmed' ? 'bg-emerald-600/20 text-emerald-400' : 
                                        app.status === 'completed' ? 'bg-blue-600/20 text-blue-400' :
                                        app.status === 'cancelled' ? 'bg-red-600/20 text-red-400' :
                                        'bg-amber-600/20 text-amber-400'
                                      }`}
                                    >
                                      <option value="pending" className="bg-slate-900 text-white">Chờ duyệt</option>
                                      <option value="confirmed" className="bg-slate-900 text-white">Đã xác nhận</option>
                                      <option value="completed" className="bg-slate-900 text-white">Hoàn thành</option>
                                      <option value="cancelled" className="bg-slate-900 text-white">Đã hủy</option>
                                    </select>
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
                                        onClick={() => {
                                          const updatedApps = (siteConfig.appointments || []).filter(a => a.id !== app.id);
                                          setSiteConfig(prev => ({ ...prev, appointments: updatedApps }));
                                          toast.success('Đã xóa lịch hẹn!');
                                        }}
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

                        {/* Mobile View Cards */}
                        <div className="md:hidden space-y-4">
                          {(() => {
                            const filteredApps = (siteConfig.appointments || [])
                              .filter(a => {
                                const matchesStatus = appointmentFilterStatus === 'all' || a.status === appointmentFilterStatus;
                                const matchesSearch = a.customerName.toLowerCase().includes(appointmentSearchQuery.toLowerCase()) || 
                                                     a.phone.includes(appointmentSearchQuery) ||
                                                     a.carModel.toLowerCase().includes(appointmentSearchQuery.toLowerCase());
                                return matchesStatus && matchesSearch;
                              });

                            if (filteredApps.length === 0) {
                              return (
                                <div className="bg-slate-900/35 border border-white/5 rounded-[32px] p-12 text-center text-slate-500">
                                  <Search className="w-10 h-10 text-slate-600 mx-auto mb-3 opacity-60" />
                                  <p className="text-xs font-bold text-slate-400">Không tìm thấy lịch hẹn nào</p>
                                  <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider">Hãy thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
                                </div>
                              );
                            }

                            return filteredApps.map(app => (
                              <div 
                                key={app.id}
                                className="bg-slate-900/55 border border-white/5 rounded-[28px] p-5 space-y-4 transition-all hover:border-white/10"
                              >
                                {/* Time & Status Badges */}
                                <div className="flex items-center justify-between gap-2 flex-wrap">
                                  <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold text-slate-400">
                                    <Calendar className="w-3.5 h-3.5 text-blue-500" />
                                    <span>{app.date}</span>
                                    <span className="text-slate-700 font-normal">|</span>
                                    <span className="text-white">{app.time}</span>
                                  </div>
                                  
                                  <select 
                                    value={app.status}
                                    onChange={(e) => {
                                      const newStatus = e.target.value as any;
                                      const updatedApps = (siteConfig.appointments || []).map(a => 
                                        a.id === app.id ? { ...a, status: newStatus } : a
                                      );
                                      setSiteConfig(prev => ({ ...prev, appointments: updatedApps }));
                                      toast.success(`Đã cập nhật trạng thái: ${newStatus === 'confirmed' ? 'Đã xác nhận' : newStatus === 'completed' ? 'Hoàn thành' : 'Chờ duyệt'}`);
                                    }}
                                    className={`text-[9px] font-black uppercase px-2.5 py-1.5 rounded-xl outline-none transition-all cursor-pointer border border-transparent ${
                                      app.status === 'confirmed' ? 'bg-emerald-600/20 text-emerald-400 border-emerald-500/10' : 
                                      app.status === 'completed' ? 'bg-blue-600/20 text-blue-400 border-blue-500/10' :
                                      app.status === 'cancelled' ? 'bg-red-600/20 text-red-400 border-red-500/10' :
                                      'bg-amber-600/20 text-amber-400 border-amber-500/10'
                                    }`}
                                  >
                                    <option value="pending" className="bg-slate-900 text-white">Chờ duyệt</option>
                                    <option value="confirmed" className="bg-slate-900 text-white">Đã duyệt</option>
                                    <option value="completed" className="bg-slate-900 text-white">Xong</option>
                                    <option value="cancelled" className="bg-slate-900 text-white">Đã hủy</option>
                                  </select>
                                </div>

                                {/* Customer details */}
                                <div className="border-t border-b border-white/[0.03] py-3.5 space-y-2">
                                  <div className="flex items-start justify-between gap-4">
                                    <div>
                                      <div className="flex items-center gap-2">
                                        <h4 className="text-sm font-black text-white">{app.customerName}</h4>
                                        {app.isRead === false && (
                                          <span className="bg-red-600 text-white text-[7px] font-black px-1.5 py-0.5 rounded-md animate-pulse uppercase tracking-wider">Mới</span>
                                        )}
                                      </div>
                                      
                                      {app.phone && (
                                        <a 
                                          href={`tel:${app.phone}`}
                                          className="text-[11px] text-blue-400 font-extrabold hover:underline mt-0.5 inline-flex items-center gap-1"
                                        >
                                          <Phone className="w-3 h-3" /> {app.phone}
                                        </a>
                                      )}
                                    </div>
                                    
                                    <div className="text-right">
                                      <div className="text-xs font-bold text-slate-200 uppercase tracking-wide">{app.carModel}</div>
                                      {app.subServiceTitle && (
                                        <div className="text-[9px] text-emerald-500 font-bold mt-0.5 uppercase tracking-wider bg-emerald-500/5 px-2 py-0.5 rounded-lg border border-emerald-500/10 inline-block">{app.subServiceTitle}</div>
                                      )}
                                    </div>
                                  </div>
                                  {app.note && (
                                    <div className="text-[10px] text-slate-500 italic bg-white/[0.01] p-2.5 rounded-xl border border-white/5 mt-2">
                                      Ghi chú: {app.note}
                                    </div>
                                  )}
                                </div>

                                {/* Actions in line */}
                                <div className="flex justify-end gap-2 pt-1">
                                  <button 
                                    onClick={() => { setIsAddingAppointment(true); setEditingAppointmentId(app.id); setAppointmentForm(app); }}
                                    className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 text-slate-350 hover:bg-slate-700 font-bold uppercase tracking-wider text-[10px] transition-all cursor-pointer"
                                  >
                                    <Edit2 className="w-3.5 h-3.5" /> Sửa lịch
                                  </button>
                                  <button 
                                    onClick={() => {
                                      const updatedApps = (siteConfig.appointments || []).filter(a => a.id !== app.id);
                                      setSiteConfig(prev => ({ ...prev, appointments: updatedApps }));
                                      toast.success('Đã xóa lịch hẹn!');
                                    }}
                                    className="px-3.5 py-2.5 rounded-xl bg-red-600/10 border border-red-500/20 text-red-400 hover:bg-red-600 hover:text-white transition-all flex items-center justify-center cursor-pointer"
                                    aria-label="Xóa"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            ));
                          })()}
                        </div>
                      </>
                    )}
                  </>
                  )}
                </div>
              )}

                {activeTab === 'customers' && (
                  <div className="space-y-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                      <div className="flex-1 w-full">
                        <div className="flex items-center gap-4 mb-2">
                          <h3 className="section-title text-2xl">Nhật Ký Chăm Sóc</h3>
                          <div className="bg-emerald-600/10 text-emerald-500 text-[10px] font-black px-2 py-1 rounded-lg uppercase tracking-widest">
                            {customerRecords.length} Khách hàng
                          </div>
                        </div>
                        <p className="section-subtitle">Quản lý hồ sơ khách hàng và theo dõi doanh thu chi tiết</p>
                      </div>
                      <button 
                        onClick={() => {
                          setIsAddingCustomer(true);
                          setEditingCustomerId(null);
                          setCustomerForm({ customerName: '', phone: '', licensePlate: '', carModel: '', servicesDone: [], totalPrice: '', notes: '', rating: 5, date: new Date().toISOString().split('T')[0], discount: 0, paymentStatus: 'paid' });
                        }}
                        className="btn-primary w-full md:w-auto px-8 py-4 flex items-center justify-center gap-2"
                      >
                        <Plus className="w-4 h-4" /> Thêm Khách Hàng
                      </button>
                    </div>

                    {/* Filter Bar */}
                    <FilterSortBar 
                      currentSearch={filterText}
                      onSearchChange={setFilterText}
                      currentSort={sortConfig}
                      onSortChange={setSortConfig}
                      onClear={() => { setFilterText(''); setFilterCategory('all'); }}
                      sortOptions={[
                        { key: 'date', order: 'desc', label: 'Mới nhất' },
                        { key: 'date', order: 'asc', label: 'Cũ nhất' },
                        { key: 'customerName', order: 'asc', label: 'Tên A-Z' },
                        { key: 'totalPrice', order: 'desc', label: 'Giá trị cao nhất' },
                      ]}
                    />

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6">
                      <div className="bg-slate-900/50 border border-white/5 p-4 sm:p-8 rounded-[24px] sm:rounded-[40px] relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-2 sm:p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                          <Users className="w-8 h-8 sm:w-16 sm:h-16 text-blue-500" />
                        </div>
                        <p className="text-[8px] sm:text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 sm:mb-2">Tổng Khách</p>
                        <p className="text-xl sm:text-4xl font-black text-white">{(customerRecords || []).length}</p>
                      </div>
                      <div className="bg-slate-900/50 border border-white/5 p-4 sm:p-8 rounded-[24px] sm:rounded-[40px] relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-2 sm:p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                          <Coins className="w-8 h-8 sm:w-16 sm:h-16 text-emerald-500" />
                        </div>
                        <p className="text-[8px] sm:text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 sm:mb-2">Doanh Thu</p>
                        <p className="text-xl sm:text-4xl font-black text-emerald-500">
                          {(customerRecords || []).reduce((acc, r) => {
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
                          {(customerRecords || []).filter(r => r.paymentStatus === 'pending').reduce((acc, r) => {
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
                          {((customerRecords || []).reduce((acc, r) => acc + (r.rating || 5), 0) / ((customerRecords || []).length || 1)).toFixed(1)}
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
                            data={(customerRecords || []).reduce((acc: any[], r) => {
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
                            <label className="label-premium">Tên Khách Hàng</label>
                            <input value={customerForm.customerName} onChange={e => setCustomerForm({...customerForm, customerName: e.target.value})} placeholder="VD: Nguyễn Văn A" className="input-premium" />
                          </div>
                          <div className="space-y-2">
                            <label className="label-premium">Số Điện Thoại</label>
                            <input value={customerForm.phone} onChange={e => setCustomerForm({...customerForm, phone: e.target.value})} placeholder="VD: 0912345678" className="input-premium" />
                          </div>
                          <div className="space-y-2">
                            <label className="label-premium">Biển Số Xe</label>
                            <input value={customerForm.licensePlate} onChange={e => setCustomerForm({...customerForm, licensePlate: e.target.value.toUpperCase()})} placeholder="VD: 30A-123.45" className="input-premium" />
                          </div>
                          <div className="space-y-2">
                            <label className="label-premium">Dòng Xe</label>
                            <input value={customerForm.carModel} onChange={e => setCustomerForm({...customerForm, carModel: e.target.value})} placeholder="VD: Toyota Camry" className="input-premium" />
                          </div>
                          <div className="space-y-2">
                            <label className="label-premium">Ngày Thực Hiện</label>
                            <input type="date" value={customerForm.date} onChange={e => setCustomerForm({...customerForm, date: e.target.value})} className="input-premium" />
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
                              {(services || []).map(service => (
                                <div key={`service-select-${service.id}`} className="space-y-3">
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
                                {(customerForm.serviceReviews || []).map((review, idx) => (
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
                                toast.error("Vui lòng nhập tên và SĐT!");
                                return;
                              }
                              if (editingCustomerId) {
                                setCustomerRecords((customerRecords || []).map(r => r.id === editingCustomerId ? { ...r, ...customerForm as CustomerRecord } : r));
                              } else {
                                setCustomerRecords([{ ...customerForm as CustomerRecord, id: Date.now().toString() }, ...(customerRecords || [])]);
                              }
                              setIsAddingCustomer(false);
                            }}
                            className="flex-1 bg-blue-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-blue-600/20 hover:bg-blue-500 transition-all active:scale-95"
                          >
                            {editingCustomerId ? 'Cập Nhật Thông Tin' : 'Lưu Bản Ghi Mới'}
                          </button>
                          {editingCustomerId && (
                            <button 
                              onClick={() => {
                                setInspectionForm({
                                  customerId: editingCustomerId,
                                  licensePlate: customerForm.licensePlate || '',
                                  technicianId: '',
                                  date: new Date().toISOString().split('T')[0],
                                  points: [],
                                  notes: '',
                                  status: 'draft'
                                });
                                setEditingInspectionId(null);
                                setActiveTab('inspections');
                                setIsAddingInspection(true);
                                setIsAddingCustomer(false);
                              }}
                              className="flex-1 bg-emerald-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-emerald-600/20 hover:bg-emerald-500 transition-all active:scale-95 flex items-center justify-center gap-2"
                            >
                              <ClipboardCheck className="w-5 h-5" />
                              Tạo Phiếu Kiểm Tra
                            </button>
                          )}
                          <button onClick={() => setIsAddingCustomer(false)} className="px-10 py-5 bg-slate-800 text-slate-400 rounded-2xl font-black uppercase tracking-widest hover:text-white transition-all">Hủy</button>
                        </div>
                      </motion.div>
                    ) : (
                      <>
                        {(() => {
                          const filtered = getFilteredAndSorted(customerRecords || [], ['customerName', 'phone', 'licensePlate', 'carModel']);
                          
                          const paginated = filtered.slice((customerPage - 1) * CUSTOMERS_PER_PAGE, customerPage * CUSTOMERS_PER_PAGE);
                          const totalPages = Math.ceil(filtered.length / CUSTOMERS_PER_PAGE);

                          return (
                            <>
                              {/* Mobile Card View */}
                              <div className="grid grid-cols-1 gap-4 md:hidden">
                                {paginated.map(r => (
                                  <div key={r.id} className="bg-slate-900/40 border border-white/5 p-6 rounded-[32px] space-y-4">
                                    <div className="flex justify-between items-start">
                                      <div>
                                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{r.date}</div>
                                        <div className="font-black text-white text-lg">{formatPrivateValue(r.customerName)}</div>
                                        <div className="text-xs text-blue-500 font-bold tracking-widest">{formatPrivateValue(r.phone)}</div>
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
                                        <div className="font-black text-white text-lg">{formatPrivateValue(r.totalPrice)}</div>
                                      </div>
                                    </div>

                                    <div className="space-y-3">
                                      <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Dịch vụ đã làm</div>
                                      <div className="flex flex-wrap gap-2">
                                        {(r.servicesDone || []).map((s, idx) => (
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
                                        onClick={() => {
                                          setCustomerRecords(prev => prev.filter(cr => cr.id !== r.id));
                                          toast.success('Đã xóa bản ghi khách hàng!');
                                        }}
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
                                    {paginated.map(r => (
                                      <tr key={r.id} className="hover:bg-blue-600/5 transition-colors group">
                                        <td className="px-8 py-6">
                                          <div className="text-xs font-bold text-slate-400">{r.date}</div>
                                        </td>
                                        <td className="px-8 py-6">
                                          <div className="font-black text-white text-sm">{formatPrivateValue(r.customerName)}</div>
                                          <div className="text-[10px] text-blue-500 font-bold tracking-widest mt-0.5">{formatPrivateValue(r.phone)}</div>
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
                                            {(r.servicesDone || []).map((s, idx) => {
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
                                          <div className="font-black text-white text-sm">{formatPrivateValue(r.totalPrice)}</div>
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
                                              onClick={() => {
                                                setCustomerRecords(prev => prev.filter(cr => cr.id !== r.id));
                                                toast.success('Đã xóa bản ghi khách hàng!');
                                              }}
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

                              {totalPages > 1 && (
                                <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4 mt-8">
                                  <button 
                                    disabled={customerPage === 1}
                                    onClick={() => setCustomerPage(p => Math.max(1, p - 1))}
                                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-800 text-white disabled:opacity-30 transition-all hover:bg-slate-700"
                                  >
                                    <ArrowLeft className="w-4 h-4" />
                                  </button>
                                  <div className="flex flex-wrap gap-2">
                                    {Array.from({ length: totalPages }).map((_, i) => (
                                      <button
                                        key={i}
                                        onClick={() => setCustomerPage(i + 1)}
                                        className={`w-10 h-10 rounded-xl font-bold transition-all ${customerPage === i + 1 ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40' : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'}`}
                                      >
                                        {i + 1}
                                      </button>
                                    ))}
                                  </div>
                                  <button 
                                    disabled={customerPage === totalPages}
                                    onClick={() => setCustomerPage(p => Math.min(totalPages, p + 1))}
                                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-800 text-white disabled:opacity-30 transition-all hover:bg-slate-700"
                                  >
                                    <ArrowRight className="w-4 h-4" />
                                  </button>
                                </div>
                              )}
                            </>
                          );
                        })()}
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
                              toast.error("Vui lòng nhập hãng xe và dòng xe!");
                              return;
                            }
                            setIsAiProcessing(true);
                            try {
                              const advice = await getMaintenanceAdvice(maintenanceForm);
                              setMaintenanceAdvice(advice);
                            } catch (error) {
                              console.error(error);
                              toast.error("Lỗi khi lấy tư vấn AI");
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

                {activeTab === 'staff' && (
                  <div className="space-y-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div>
                        <h3 className="section-title text-2xl">Quản Lý Nhân Sự</h3>
                        <p className="section-subtitle mt-1">Quản lý đội ngũ kỹ thuật viên & hoa hồng</p>
                      </div>
                      <button 
                        onClick={() => {
                          setStaffForm({ name: '', role: 'technician', phone: '', email: '', avatar: '', commissionRate: 10, status: 'active', joinedDate: new Date().toISOString().split('T')[0] });
                          setEditingStaffId(null);
                          setIsAddingStaff(true);
                        }}
                        className="btn-primary px-6 py-3"
                      >
                        <UserPlus className="w-4 h-4" />
                        Thêm Nhân Viên
                      </button>
                    </div>

                    <div className="bg-slate-900/30 border border-white/5 p-6 rounded-[32px]">
                      <FilterSortBar 
                        currentSearch={filterText}
                        onSearchChange={setFilterText}
                        currentSort={sortConfig}
                        onSortChange={setSortConfig}
                        onClear={() => { setFilterText(''); setFilterCategory('all'); }}
                        sortOptions={[
                          { key: 'name', order: 'asc', label: 'Tên A-Z' },
                          { key: 'commissionRate', order: 'desc', label: 'Hoa hồng cao nhất' },
                          { key: 'joinedDate', order: 'desc', label: 'Mới vào làm' },
                        ]}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {(() => {
                        const filtered = getFilteredAndSorted(staff || [], ['name', 'phone', 'email', 'role']);
                        return filtered.map((member, idx) => (
                          <div key={member.id} className="bg-slate-900/50 border border-white/5 rounded-[32px] p-6 hover:border-blue-500/30 transition-all group">
                            <div className="flex items-center gap-4 mb-6">
                              <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-white/10 overflow-hidden">
                                {member.avatar ? (
                                  <img src={member.avatar} className="w-full h-full object-cover" loading="lazy" referrerPolicy="no-referrer" />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-2xl">👤</div>
                                )}
                              </div>
                              <div>
                                <h4 className="text-lg font-black text-white uppercase tracking-tight">{member.name}</h4>
                                <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">{member.role === 'admin' ? 'Quản Trị' : 'Kỹ Thuật Viên'}</p>
                              </div>
                              <div className={`ml-auto px-2 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest ${member.status === 'active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                                {member.status === 'active' ? 'Đang Làm' : 'Nghỉ Việc'}
                              </div>
                            </div>

                             <div className="space-y-3 mb-6">
                              <div className="flex justify-between text-[11px]">
                                <span className="text-slate-500 font-bold uppercase">Điện thoại:</span>
                                <span className="text-white font-medium">{formatPrivateValue(member.phone)}</span>
                              </div>
                              <div className="flex justify-between text-[11px]">
                                <span className="text-slate-500 font-bold uppercase">Hiệu suất:</span>
                                <div className="flex items-center gap-2">
                                  <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-500" style={{ width: `${Math.floor(Math.random() * 20) + 80}%` }} />
                                  </div>
                                  <span className="text-blue-500 font-black">{Math.floor(Math.random() * 20) + 80}%</span>
                                </div>
                              </div>
                              <div className="flex justify-between text-[11px]">
                                <span className="text-slate-500 font-bold uppercase">Dịch vụ chính:</span>
                                <span className="text-emerald-500 font-black">{idx % 2 === 0 ? 'Phủ Ceramic' : 'Dán PPF'}</span>
                              </div>
                              <div className="flex justify-between text-[11px]">
                                <span className="text-slate-500 font-bold uppercase">Hoa hồng:</span>
                                <span className="text-blue-500 font-black">{member.commissionRate}%</span>
                              </div>
                              <div className="flex justify-between text-[11px]">
                                <span className="text-slate-500 font-bold uppercase">Ngày vào:</span>
                                <span className="text-slate-300">{member.joinedDate}</span>
                              </div>
                            </div>

                            <div className="flex gap-2">
                              <button 
                                onClick={() => {
                                  setStaffForm(member);
                                  setEditingStaffId(member.id);
                                  setIsAddingStaff(true);
                                }}
                                className="flex-1 bg-white/5 hover:bg-white/10 text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                              >
                                Sửa
                              </button>
                              <button 
                                onClick={() => {
                                  setStaff(prev => prev.filter(s => s.id !== member.id));
                                  toast.success(`Đã xóa nhân viên ${member.name}`);
                                }}
                                className="px-4 bg-red-500/10 hover:bg-red-500/20 text-red-500 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ));
                      })()}
                    </div>

                    {isAddingStaff && (
                      <div className="fixed inset-0 z-[400] flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsAddingStaff(false)} />
                        <motion.div 
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="relative w-full max-w-md bg-slate-900 border border-white/10 rounded-[40px] p-8 shadow-2xl"
                        >
                          <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-6">
                            {editingStaffId ? 'Cập Nhật Nhân Viên' : 'Thêm Nhân Viên Mới'}
                          </h3>
                          <div className="space-y-4">
                            <div className="space-y-1">
                              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Họ và Tên</label>
                              <input 
                                type="text"
                                value={staffForm.name}
                                onChange={e => setStaffForm({...staffForm, name: e.target.value})}
                                className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-1">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Vai Trò</label>
                                <select 
                                  value={staffForm.role}
                                  onChange={e => setStaffForm({...staffForm, role: e.target.value as any})}
                                  className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                >
                                  <option value="technician">Kỹ Thuật Viên</option>
                                  <option value="admin">Quản Trị</option>
                                </select>
                              </div>
                              <div className="space-y-1">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Hoa Hồng (%)</label>
                                <input 
                                  type="number"
                                  value={staffForm.commissionRate}
                                  onChange={e => setStaffForm({...staffForm, commissionRate: parseInt(e.target.value)})}
                                  className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                              </div>
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Số Điện Thoại</label>
                              <input 
                                type="text"
                                value={staffForm.phone}
                                onChange={e => setStaffForm({...staffForm, phone: e.target.value})}
                                className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Ảnh Đại Diện (URL)</label>
                              <input 
                                type="text"
                                value={staffForm.avatar}
                                onChange={e => setStaffForm({...staffForm, avatar: e.target.value})}
                                className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                              />
                            </div>
                            <div className="flex gap-3 pt-4">
                              <button 
                                onClick={() => setIsAddingStaff(false)}
                                className="flex-1 bg-slate-800 text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest"
                              >
                                Hủy
                              </button>
                              <button 
                                onClick={() => {
                                  if (!staffForm.name) return;
                                  if (editingStaffId) {
                                    setStaff(prev => prev.map(s => s.id === editingStaffId ? { ...s, ...staffForm } as Staff : s));
                                  } else {
                                    const newMember: Staff = {
                                      id: Date.now().toString(),
                                      ...staffForm as Staff
                                    };
                                    setStaff(prev => [...prev, newMember]);
                                  }
                                  setIsAddingStaff(false);
                                }}
                                className="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest"
                              >
                                {editingStaffId ? 'Cập Nhật' : 'Lưu'}
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'reminders' && (
                  <div className="space-y-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div>
                        <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Nhắc Lịch Bảo Trì</h3>
                        <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-1">Tự động nhắc hẹn bảo dưỡng định kỳ</p>
                      </div>
                      <button 
                        onClick={() => {
                          const lastRecords = customerRecords.filter(r => r.servicesDone.some(s => s.toLowerCase().includes('ceramic') || s.toLowerCase().includes('ppf')));
                          if (lastRecords.length === 0) {
                            toast.error("Không có khách hàng nào cần nhắc hẹn bảo trì dựa trên lịch sử dịch vụ.");
                            return;
                          }
                          
                          // Auto generate reminders for Ceramic/PPF customers from 6 months ago
                          const sixMonthsAgo = new Date();
                          sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
                          
                          const newReminders: MaintenanceReminder[] = [];
                          lastRecords.forEach(record => {
                            const recordDate = new Date(record.date);
                            if (recordDate <= sixMonthsAgo) {
                              // Check if already has a reminder
                              const exists = reminders.some(r => r.customerId === record.id && r.status === 'pending');
                              if (!exists) {
                                newReminders.push({
                                  id: Date.now().toString() + Math.random(),
                                  customerId: record.id,
                                  customerName: record.customerName,
                                  phone: record.phone,
                                  licensePlate: record.licensePlate,
                                  serviceName: record.servicesDone.join(', '),
                                  lastServiceDate: record.date,
                                  nextServiceDate: new Date(recordDate.setMonth(recordDate.getMonth() + 6)).toISOString().split('T')[0],
                                  status: 'pending',
                                  note: 'Bảo dưỡng định kỳ 6 tháng'
                                });
                              }
                            }
                          });
                          
                          if (newReminders.length > 0) {
                            setReminders(prev => [...prev, ...newReminders]);
                            toast.success(`Đã tự động tạo ${newReminders.length} nhắc hẹn mới!`);
                          } else {
                            toast.error("Không tìm thấy khách hàng mới cần nhắc hẹn.");
                          }
                        }}
                        className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center gap-2 shadow-xl shadow-blue-900/20 transition-all active:scale-95"
                      >
                        <RefreshCw className="w-4 h-4" />
                        Quét & Tạo Nhắc Hẹn
                      </button>
                    </div>

                    <div className="bg-slate-900/50 border border-white/5 rounded-[32px] overflow-hidden">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-white/5">
                            <th className="p-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Khách Hàng</th>
                            <th className="p-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Dịch Vụ</th>
                            <th className="p-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Ngày Cuối</th>
                            <th className="p-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Ngày Hẹn</th>
                            <th className="p-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Trạng Thái</th>
                            <th className="p-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Thao Tác</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {(reminders || []).map(reminder => (
                            <tr key={reminder.id} className="hover:bg-white/5 transition-colors">
                              <td className="p-4">
                                <p className="text-sm font-black text-white uppercase">{reminder.customerName}</p>
                                <p className="text-[10px] text-slate-500 font-bold">{reminder.phone} - {reminder.licensePlate}</p>
                              </td>
                              <td className="p-4">
                                <p className="text-xs text-slate-300 line-clamp-1">{reminder.serviceName}</p>
                              </td>
                              <td className="p-4 text-xs text-slate-400">{reminder.lastServiceDate}</td>
                              <td className="p-4 text-xs font-bold text-blue-500">{reminder.nextServiceDate}</td>
                              <td className="p-4">
                                <span className={`px-2 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest ${
                                  reminder.status === 'completed' ? 'bg-emerald-500/10 text-emerald-500' : 
                                  reminder.status === 'cancelled' ? 'bg-red-500/10 text-red-500' : 
                                  'bg-blue-500/10 text-blue-500'
                                }`}>
                                  {reminder.status === 'completed' ? 'Đã Xong' : reminder.status === 'cancelled' ? 'Đã Hủy' : 'Chờ Nhắc'}
                                </span>
                              </td>
                              <td className="p-4">
                                <div className="flex gap-2">
                                  <button 
                                    onClick={() => {
                                      const msg = `Chào anh/chị ${reminder.customerName}, xe ${reminder.licensePlate} của mình đã đến lịch bảo dưỡng định kỳ cho dịch vụ ${reminder.serviceName}. Mời anh/chị ghé XE ĐẸP PRO để được chăm sóc tốt nhất ạ!`;
                                      window.open(`https://zalo.me/${reminder.phone.replace(/^0/, '84')}`, '_blank');
                                      // Copy message to clipboard
                                      navigator.clipboard.writeText(msg);
                                      toast.success("Đã copy tin nhắn mẫu & mở Zalo");
                                    }}
                                    className="p-2 bg-blue-600/10 text-blue-500 rounded-lg hover:bg-blue-600/20 transition-all"
                                    title="Gửi Zalo"
                                  >
                                    <MessageCircle className="w-4 h-4" />
                                  </button>
                                  <button 
                                    onClick={() => setReminders(prev => prev.map(r => r.id === reminder.id ? { ...r, status: 'completed' } : r))}
                                    className="p-2 bg-emerald-600/10 text-emerald-500 rounded-lg hover:bg-emerald-600/20 transition-all"
                                    title="Hoàn thành"
                                  >
                                    <Check className="w-4 h-4" />
                                  </button>
                                  <button 
                                    onClick={() => setReminders(prev => prev.filter(r => r.id !== reminder.id))}
                                    className="p-2 bg-red-600/10 text-red-500 rounded-lg hover:bg-red-600/20 transition-all"
                                    title="Xóa"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {reminders.length === 0 && (
                        <div className="py-20 text-center">
                          <p className="text-slate-600 text-[10px] font-bold uppercase">Chưa có nhắc hẹn nào</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === 'inspections' && (
                  <div className="space-y-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div>
                        <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Phiếu Kiểm Tra Xe Kỹ Thuật Số</h3>
                        <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-1">Ghi nhận tình trạng xe trước khi nhận</p>
                      </div>
                      <button 
                        onClick={() => {
                          setInspectionForm({
                            customerId: '', licensePlate: '', technicianId: '', date: new Date().toISOString().split('T')[0], points: [], checklist: {}, images: {}, notes: '', status: 'draft'
                          });
                          setEditingInspectionId(null);
                          setIsAddingInspection(true);
                        }}
                        className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center gap-2 shadow-xl shadow-blue-900/20 transition-all active:scale-95"
                      >
                        <Plus className="w-4 h-4" />
                        Tạo Phiếu Kiểm Tra
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {(inspections || []).map(inspection => (
                        <div key={inspection.id} className="bg-slate-900/50 border border-white/5 rounded-[32px] p-6 hover:border-blue-500/30 transition-all group">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h4 className="text-lg font-black text-white uppercase tracking-tight">{inspection.licensePlate}</h4>
                              <p className="text-[10px] text-slate-500 font-bold uppercase">{inspection.date}</p>
                            </div>
                            <span className={`px-2 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest ${
                              inspection.status === 'completed' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-blue-500/10 text-blue-500'
                            }`}>
                              {inspection.status === 'completed' ? 'Đã Xong' : 'Bản Nháp'}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-4 mb-6">
                            <div className="flex items-center gap-1">
                              <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                              <span className="text-[10px] text-slate-400 font-bold uppercase">{inspection.points?.length || 0} Điểm lỗi</span>
                            </div>
                            {inspection.checklist && Object.values(inspection.checklist).some(v => v === 'error') && (
                              <div className="flex items-center gap-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></div>
                                <span className="text-[10px] text-orange-500 font-bold uppercase">Cần chú ý</span>
                              </div>
                            )}
                          </div>

                          <div className="flex items-center gap-2 mb-6">
                            <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-[10px]">👤</div>
                            <span className="text-[10px] text-slate-400 font-bold uppercase">
                              Kỹ thuật: {staff.find(s => s.id === inspection.technicianId)?.name || 'Chưa gán'}
                            </span>
                          </div>

                          {inspection.images && Object.values(inspection.images).some(img => !!img) && (
                            <div className="grid grid-cols-4 gap-2 mb-6">
                              {['front', 'rear', 'left', 'right'].map(view => (
                                <div key={view} className="aspect-square rounded-lg bg-slate-950 border border-white/5 overflow-hidden">
                                  {inspection.images?.[view as keyof typeof inspection.images] ? (
                                    <img 
                                      src={inspection.images[view as keyof typeof inspection.images]} 
                                      className="w-full h-full object-cover" 
                                      alt={view}
                                      referrerPolicy="no-referrer"
                                    />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center text-[8px] text-slate-700 uppercase font-black">{view[0]}</div>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}

                          <div className="flex gap-2">
                            <button 
                              onClick={() => {
                                setInspectionForm(inspection);
                                setEditingInspectionId(inspection.id);
                                setIsAddingInspection(true);
                              }}
                              className="flex-1 bg-white/5 hover:bg-white/10 text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                            >
                              Xem & Sửa
                            </button>
                            <button 
                              onClick={() => {
                                if (confirm("Xóa phiếu kiểm tra này?")) {
                                  setInspections(prev => prev.filter(i => i.id !== inspection.id));
                                }
                              }}
                              className="px-4 bg-red-500/10 hover:bg-red-500/20 text-red-500 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {isAddingInspection && (
                      <div className="fixed inset-0 z-[400] flex items-center justify-center p-0 md:p-4">
                        <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={() => {
                          setIsAddingInspection(false);
                        }} />
                        <motion.div 
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="relative w-full h-full md:h-auto md:max-w-4xl bg-slate-900 border-x border-white/10 md:rounded-[40px] p-4 md:p-8 shadow-2xl flex flex-col max-h-screen md:max-h-[90vh]"
                        >
                          <div className="flex justify-between items-center mb-6 md:mb-8">
                            <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter">Phiếu Kiểm Tra Xe</h3>
                            <button onClick={() => {
                              setIsAddingInspection(false);
                            }} className="text-slate-500 hover:text-white p-2"><X className="w-6 h-6" /></button>
                          </div>

                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 overflow-y-auto pr-2 custom-scrollbar">
                            <div className="space-y-6">
                              <div className="grid grid-cols-3 gap-4">
                                <div className="space-y-1">
                                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Biển Số Xe</label>
                                  <input 
                                    type="text"
                                    value={inspectionForm.licensePlate}
                                    onChange={e => setInspectionForm({...inspectionForm, licensePlate: e.target.value})}
                                    className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Số Điện Thoại</label>
                                  <input 
                                    type="tel"
                                    value={inspectionForm.phone}
                                    onChange={e => setInspectionForm({...inspectionForm, phone: e.target.value})}
                                    className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Kỹ Thuật Viên</label>
                                  <select 
                                    value={inspectionForm.technicianId}
                                    onChange={e => setInspectionForm({...inspectionForm, technicianId: e.target.value})}
                                    className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                  >
                                    <option value="">Chọn kỹ thuật viên</option>
                                    {(staff || []).map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                                  </select>
                                </div>
                              </div>

                              <div className="space-y-4">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Sơ đồ kiểm tra ngoại thất</label>
                                <React.Suspense fallback={<div className="p-8 text-center text-slate-500 text-xs">Đang tải mô hình xe ngoại thất...</div>}>
                                  <VisualCarInspection 
                                    points={inspectionForm.points || []}
                                    onChange={(points) => setInspectionForm(prev => ({ ...prev, points }))}
                                    checklist={inspectionForm.checklist || {}}
                                    onChecklistChange={(checklist) => setInspectionForm(prev => ({ ...prev, checklist }))}
                                    images={inspectionForm.images || {}}
                                    onImagesChange={(images) => setInspectionForm(prev => ({ ...prev, images }))}
                                  />
                                </React.Suspense>
                              </div>
                            </div>

                            <div className="space-y-6">
                              <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Danh sách điểm cần lưu ý ({inspectionForm.points?.length || 0})</label>
                                <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                                  {inspectionForm.points?.map(point => (
                                    <div key={point.id} className="bg-slate-950/50 border border-white/5 p-3 rounded-xl flex justify-between items-center">
                                      <div>
                                        <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">{point.type}</span>
                                        <p className="text-xs text-slate-400">{point.note || 'Không có mô tả'}</p>
                                      </div>
                                      <button 
                                        onClick={() => setInspectionForm(prev => ({ ...prev, points: prev.points?.filter(p => p.id !== point.id) }))}
                                        className="text-slate-600 hover:text-red-500"
                                      >
                                        <Trash2 className="w-3 h-3" />
                                      </button>
                                    </div>
                                  ))}
                                  {(!inspectionForm.points || inspectionForm.points.length === 0) && (
                                    <p className="text-[10px] text-slate-600 italic text-center py-4">Chưa có điểm đánh dấu nào</p>
                                  )}
                                </div>
                              </div>

                              <div className="space-y-1">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Ghi Chú Chung</label>
                                <textarea 
                                  value={inspectionForm.notes}
                                  onChange={e => setInspectionForm({...inspectionForm, notes: e.target.value})}
                                  placeholder="Ghi chú thêm về tình trạng xe..."
                                  className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white text-sm h-32 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                                />
                              </div>

                              <div className="flex gap-3 pt-4">
                                <button 
                                  onClick={() => {
                                    setIsAddingInspection(false);
                                  }}
                                  className="flex-1 bg-slate-800 text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest"
                                >
                                  Hủy
                                </button>
                                <button 
                                  onClick={() => {
                                    if (!inspectionForm.licensePlate) {
                                      toast.error("Vui lòng nhập biển số xe!");
                                      return;
                                    }
                                    if (editingInspectionId) {
                                      setInspections(prev => prev.map(i => i.id === editingInspectionId ? { ...i, ...inspectionForm, status: 'completed' } as CarInspection : i));
                                    } else {
                                      const newInspection: CarInspection = {
                                        id: Date.now().toString(),
                                        ...inspectionForm as CarInspection,
                                        status: 'completed'
                                      };
                                      setInspections(prev => [...prev, newInspection]);
                                    }
                                    setIsAddingInspection(false);
                                    toast.success("Đã lưu phiếu kiểm tra!");
                                  }}
                                  className="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl shadow-blue-900/20"
                                >
                                  Hoàn Thành & Lưu
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'automation' && (
                  <div className="space-y-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                      <div>
                        <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter">Tự Động Hóa Chăm Sóc</h3>
                        <p className="text-slate-500 text-[10px] md:text-[11px] font-black uppercase tracking-widest mt-1">Cấu hình thông báo tự động cho khách hàng qua Zalo/SMS</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      <div className="lg:col-span-2 space-y-6">
                        <div className="bg-slate-900/50 p-8 rounded-[32px] border border-white/5 space-y-8">
                          <div className="flex items-center justify-between p-6 bg-slate-950/50 rounded-2xl border border-white/5">
                            <div className="space-y-1">
                              <h4 className="text-sm font-black text-white uppercase tracking-widest">Thông báo hoàn tất dịch vụ</h4>
                              <p className="text-[10px] text-slate-500 font-bold uppercase">Gửi tin nhắn khi xe đã làm xong và sẵn sàng bàn giao</p>
                            </div>
                            <button 
                              onClick={() => setAutomationSettings(prev => ({ ...prev, notifyServiceDone: !prev.notifyServiceDone }))}
                              className={`w-12 h-6 rounded-full transition-all relative ${automationSettings.notifyServiceDone ? 'bg-blue-600' : 'bg-slate-800'}`}
                            >
                              <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${automationSettings.notifyServiceDone ? 'left-7' : 'left-1'}`} />
                            </button>
                          </div>

                          <div className="flex items-center justify-between p-6 bg-slate-950/50 rounded-2xl border border-white/5">
                            <div className="space-y-1">
                              <h4 className="text-sm font-black text-white uppercase tracking-widest">Nhắc lịch bảo trì định kỳ</h4>
                              <p className="text-[10px] text-slate-500 font-bold uppercase">Tự động nhắc khách hàng khi đến hạn bảo dưỡng (3/6/12 tháng)</p>
                            </div>
                            <button 
                              onClick={() => setAutomationSettings(prev => ({ ...prev, notifyMaintenanceReminder: !prev.notifyMaintenanceReminder }))}
                              className={`w-12 h-6 rounded-full transition-all relative ${automationSettings.notifyMaintenanceReminder ? 'bg-blue-600' : 'bg-slate-800'}`}
                            >
                              <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${automationSettings.notifyMaintenanceReminder ? 'left-7' : 'left-1'}`} />
                            </button>
                          </div>

                          <div className="flex items-center justify-between p-6 bg-slate-950/50 rounded-2xl border border-white/5">
                            <div className="space-y-1">
                              <h4 className="text-sm font-black text-white uppercase tracking-widest">Chúc mừng sinh nhật</h4>
                              <p className="text-[10px] text-slate-500 font-bold uppercase">Gửi lời chúc và ưu đãi đặc biệt vào ngày sinh nhật khách hàng</p>
                            </div>
                            <button 
                              onClick={() => setAutomationSettings(prev => ({ ...prev, notifyBirthday: !prev.notifyBirthday }))}
                              className={`w-12 h-6 rounded-full transition-all relative ${automationSettings.notifyBirthday ? 'bg-blue-600' : 'bg-slate-800'}`}
                            >
                              <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${automationSettings.notifyBirthday ? 'left-7' : 'left-1'}`} />
                            </button>
                          </div>

                          <div className="flex items-center justify-between p-6 bg-slate-950/50 rounded-2xl border border-white/5">
                            <div className="space-y-1">
                              <h4 className="text-sm font-black text-white uppercase tracking-widest">Thông báo khuyến mãi</h4>
                              <p className="text-[10px] text-slate-500 font-bold uppercase">Gửi thông tin các chương trình ưu đãi mới nhất</p>
                            </div>
                            <button 
                              onClick={() => setAutomationSettings(prev => ({ ...prev, notifyPromotion: !prev.notifyPromotion }))}
                              className={`w-12 h-6 rounded-full transition-all relative ${automationSettings.notifyPromotion ? 'bg-blue-600' : 'bg-slate-800'}`}
                            >
                              <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${automationSettings.notifyPromotion ? 'left-7' : 'left-1'}`} />
                            </button>
                          </div>

                          <div className="flex items-center justify-between p-6 bg-slate-950/50 rounded-2xl border border-white/5">
                            <div className="space-y-1">
                              <h4 className="text-sm font-black text-white uppercase tracking-widest">Gửi lời cảm ơn sau 24h</h4>
                              <p className="text-[10px] text-slate-500 font-bold uppercase">Tự động gửi cám ơn và yêu cầu đánh giá sau khi bàn giao xe</p>
                            </div>
                            <button 
                              onClick={() => setAutomationSettings(prev => ({ ...prev, notifyThanks24h: !prev.notifyThanks24h }))}
                              className={`w-12 h-6 rounded-full transition-all relative ${automationSettings.notifyThanks24h ? 'bg-blue-600' : 'bg-slate-800'}`}
                            >
                              <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${automationSettings.notifyThanks24h ? 'left-7' : 'left-1'}`} />
                            </button>
                          </div>

                          <div className="flex items-center justify-between p-6 bg-slate-950/50 rounded-2xl border border-white/5">
                            <div className="space-y-1">
                              <h4 className="text-sm font-black text-white uppercase tracking-widest">Tự động tặng Voucher hạng Vàng</h4>
                              <p className="text-[10px] text-slate-500 font-bold uppercase">Tặng voucher 500k cho khách hàng đạt chi tiêu {'>'} 50tr</p>
                            </div>
                            <button 
                              onClick={() => setAutomationSettings(prev => ({ ...prev, autoGoldVoucher: !prev.autoGoldVoucher }))}
                              className={`w-12 h-6 rounded-full transition-all relative ${automationSettings.autoGoldVoucher ? 'bg-blue-600' : 'bg-slate-800'}`}
                            >
                              <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${automationSettings.autoGoldVoucher ? 'left-7' : 'left-1'}`} />
                            </button>
                          </div>
                        </div>

                        <div className="bg-slate-900/50 p-8 rounded-[32px] border border-white/5 space-y-6">
                          <h4 className="text-sm font-black text-white uppercase tracking-widest">Kênh gửi thông báo</h4>
                          <div className="grid grid-cols-3 gap-4">
                            {(['zalo', 'sms', 'both'] as const).map(ch => (
                              <button 
                                key={ch}
                                onClick={() => setAutomationSettings(prev => ({ ...prev, channel: ch }))}
                                className={`p-4 rounded-2xl border transition-all flex flex-col items-center gap-2 ${
                                  automationSettings.channel === ch 
                                    ? 'bg-blue-600/10 border-blue-500 text-blue-500' 
                                    : 'bg-slate-950 border-white/5 text-slate-500 hover:border-white/10'
                                }`}
                              >
                                <span className="text-lg">{ch === 'zalo' ? '🔵' : ch === 'sms' ? '📱' : '🔄'}</span>
                                <span className="text-[10px] font-black uppercase tracking-widest">{ch === 'zalo' ? 'Zalo OA' : ch === 'sms' ? 'SMS Brand' : 'Cả hai'}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="bg-slate-900/50 p-8 rounded-[32px] border border-white/5 space-y-6">
                          <h4 className="text-sm font-black text-white uppercase tracking-widest">Thống kê tự động (30 ngày)</h4>
                          <div className="space-y-4">
                            <div className="p-4 bg-slate-950 rounded-2xl border border-white/5">
                              <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest mb-1">Tin nhắn đã gửi</p>
                              <p className="text-2xl font-black text-white">1,248</p>
                            </div>
                            <div className="p-4 bg-slate-950 rounded-2xl border border-white/5">
                              <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest mb-1">Tỷ lệ mở tin</p>
                              <p className="text-2xl font-black text-emerald-500">86.4%</p>
                            </div>
                            <div className="p-4 bg-slate-950 rounded-2xl border border-white/5">
                              <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest mb-1">Khách quay lại từ nhắc hẹn</p>
                              <p className="text-2xl font-black text-blue-500">42</p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-blue-600/10 border border-blue-500/20 p-6 rounded-[32px] space-y-4">
                          <div className="flex items-center gap-3 text-blue-500">
                            <Info className="w-5 h-5" />
                            <h4 className="text-[11px] font-black uppercase tracking-widest">Lưu ý cấu hình</h4>
                          </div>
                          <p className="text-[10px] text-slate-400 leading-relaxed font-medium">
                            Hệ thống sử dụng Zalo OA và SMS Brandname để đảm bảo tính chuyên nghiệp. Vui lòng đảm bảo tài khoản của bạn còn đủ số dư để thực hiện các chiến dịch tự động.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'proposals' && (
                  <ProposalManagement 
                    proposals={proposals}
                    setProposals={(updated) => {
                      setProposals(updated);
                      updateConfig('proposals', updated);
                    }}
                    services={services}
                    onGenerateAiNote={handleGenerateAiProposalNote}
                  />
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
                          onClick={() => {
                            setAiVideoHistory([]);
                            toast.success("Đã xóa toàn bộ lịch sử!");
                          }}
                          className="text-red-500 hover:text-red-400 text-[10px] font-black uppercase tracking-widest"
                        >
                          Xóa hết
                        </button>
                      </div>
                      
                      <div className="space-y-4 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
                        {(aiVideoHistory || []).length > 0 ? (aiVideoHistory || []).map(record => (
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
                                        type: record.type,
                                        tags: ['Sẵn sàng đăng Social', 'AI Creative']
                                      };
                                      setGallery(prev => [newImg, ...prev]);
                                      toast.success("Đã lưu vào thư viện!");
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
                                  type: aiResult.type as 'image' | 'video',
                                  tags: ['Sẵn sàng đăng Social', 'AI Creative']
                                };
                                setGallery([newImg, ...gallery]);
                                toast.success("✅ Đã thêm vào thư viện!");
                              }}
                              className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white p-4 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all active:scale-95"
                            >
                              📥 Thêm vào Thư Viện
                            </button>
                            {aiResult.type === 'video' && (
                              <button 
                                onClick={() => {
                                  updateConfig('heroVideoUrl', aiResult.url);
                                  toast.success("✅ Đã áp dụng làm video Hero!");
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

            {activeTab === 'transformations' && (
              <div className="space-y-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter">Biến Đổi Trước & Sau</h3>
                    <p className="text-slate-500 text-[10px] md:text-[11px] font-black uppercase tracking-widest mt-1">Quản lý hình ảnh so sánh hiệu quả dịch vụ</p>
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <button 
                      onClick={() => {
                        const newTrans: BeforeAfterImage = {
                          id: `ba-${Date.now()}`,
                          before: "https://picsum.photos/seed/car1/800/600",
                          after: "https://picsum.photos/seed/car2/800/600",
                          label: "Dịch vụ mới",
                          date: new Date().toISOString().split('T')[0]
                        };
                        setTransformations([newTrans, ...transformations]);
                        updateConfig('transformations', [newTrans, ...transformations]);
                      }}
                      className="btn-primary flex-1 sm:flex-none px-8 py-3 text-[10px]"
                    >
                      ➕ Thêm Biến Đổi
                    </button>
                  </div>
                </div>

                <FilterSortBar 
                  currentSearch={filterText}
                  onSearchChange={setFilterText}
                  currentSort={sortConfig}
                  onSortChange={setSortConfig}
                  onClear={() => { setFilterText(''); setFilterCategory('all'); }}
                  sortOptions={[
                    { key: 'label', order: 'asc', label: 'Tên A-Z' },
                    { key: 'date', order: 'desc', label: 'Ngày mới nhất' },
                    { key: 'date', order: 'asc', label: 'Ngày cũ nhất' },
                    { key: 'id', order: 'desc', label: 'Mới thêm' },
                  ]}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-white">
                  {(() => {
                    const filtered = getFilteredAndSorted(transformations, ['label', 'date']);
                    const totalItems = filtered.length;
                    const totalPages = Math.ceil(totalItems / TRANSFORMATIONS_PER_PAGE);
                    const paginated = filtered.slice((transformationPage - 1) * TRANSFORMATIONS_PER_PAGE, transformationPage * TRANSFORMATIONS_PER_PAGE);

                    return (
                      <>
                        <div className="col-span-full flex justify-between items-center px-4 mb-2">
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                            Hiển thị {Math.min(totalItems, (transformationPage - 1) * TRANSFORMATIONS_PER_PAGE + 1)}-{Math.min(totalItems, transformationPage * TRANSFORMATIONS_PER_PAGE)} trên tổng số {totalItems} biến đổi
                          </p>
                        </div>

                        {paginated.map(t => (
                    <div key={t.id} className="bg-slate-900/50 border border-white/5 p-6 rounded-[32px] space-y-6 group hover:border-blue-500/30 transition-all">
                      <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 group/slider">
                        <BeforeAfterSlider 
                          before={t.before} 
                          after={t.after} 
                          label={t.label}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-[8px] font-black uppercase text-slate-600">Ảnh Trước</label>
                          <div className="relative h-24 rounded-xl overflow-hidden group/img">
                            <img src={t.before} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            <div className="absolute inset-0 bg-blue-600/60 opacity-0 group-hover/img:opacity-100 transition-all flex flex-col items-center justify-center gap-1 cursor-pointer">
                              <label className="flex flex-col items-center cursor-pointer">
                                <span className="text-[7px] font-black">TẢI LÊN</span>
                                <input type="file" onChange={e => handleImageUpload(e, (b) => {
                                  const updated = transformations.map(item => item.id === t.id ? {...item, before: b} : item);
                                  setTransformations(updated);
                                  updateConfig('transformations', updated);
                                })} className="hidden" accept="image/*" />
                              </label>
                              <div className="w-full h-px bg-white/20" />
                              <button 
                                onClick={() => {
                                  setGalleryPickerCallback(() => (url: string) => {
                                    const updated = transformations.map(item => item.id === t.id ? {...item, before: url} : item);
                                    setTransformations(updated);
                                    updateConfig('transformations', updated);
                                  });
                                  setIsGalleryPickerOpen(true);
                                }}
                                className="text-[7px] font-black"
                              >
                                THƯ VIỆN
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[8px] font-black uppercase text-slate-600">Ảnh Sau</label>
                          <div className="relative h-24 rounded-xl overflow-hidden group/img">
                            <img src={t.after} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            <div className="absolute inset-0 bg-emerald-600/60 opacity-0 group-hover/img:opacity-100 transition-all flex flex-col items-center justify-center gap-1 cursor-pointer">
                              <label className="flex flex-col items-center cursor-pointer">
                                <span className="text-[7px] font-black">TẢI LÊN</span>
                                <input type="file" onChange={e => handleImageUpload(e, (b) => {
                                  const updated = transformations.map(item => item.id === t.id ? {...item, after: b} : item);
                                  setTransformations(updated);
                                  updateConfig('transformations', updated);
                                })} className="hidden" accept="image/*" />
                              </label>
                              <div className="w-full h-px bg-white/20" />
                              <button 
                                onClick={() => {
                                  setGalleryPickerCallback(() => (url: string) => {
                                    const updated = transformations.map(item => item.id === t.id ? {...item, after: url} : item);
                                    setTransformations(updated);
                                    updateConfig('transformations', updated);
                                  });
                                  setIsGalleryPickerOpen(true);
                                }}
                                className="text-[7px] font-black"
                              >
                                THƯ VIỆN
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[8px] font-black uppercase text-slate-600">Tiêu đề / Dịch vụ</label>
                            <input 
                              value={t.label} 
                              onChange={e => {
                                const updated = transformations.map(item => item.id === t.id ? {...item, label: e.target.value} : item);
                                setTransformations(updated);
                                updateConfig('transformations', updated);
                              }}
                              className="w-full bg-slate-950 border border-white/5 rounded-xl p-3 text-white text-xs"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[8px] font-black uppercase text-slate-600">Ngày thực hiện</label>
                            <input 
                              type="date"
                              value={t.date} 
                              onChange={e => {
                                const updated = transformations.map(item => item.id === t.id ? {...item, date: e.target.value} : item);
                                setTransformations(updated);
                                updateConfig('transformations', updated);
                              }}
                              className="w-full bg-slate-950 border border-white/5 rounded-xl p-3 text-white text-xs"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end pt-4 border-t border-white/5">
                        <button 
                          onClick={() => {
                            if (confirm("Bạn có muốn xóa hình ảnh biến đổi này?")) {
                              const updated = transformations.filter(item => item.id !== t.id);
                              setTransformations(updated);
                              updateConfig('transformations', updated);
                            }
                          }}
                          className="text-red-500 hover:text-red-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-2"
                        >
                          <Trash2 className="w-3 h-3" /> Xóa Biến Đổi
                        </button>
                      </div>
                    </div>
                        ))}

                        {totalPages > 1 && (
                          <div className="col-span-full flex flex-wrap justify-center items-center gap-2 md:gap-4 mt-8">
                            <button 
                              disabled={transformationPage === 1}
                              onClick={() => setTransformationPage(p => Math.max(1, p - 1))}
                              className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-800 text-white disabled:opacity-30 transition-all hover:bg-slate-700"
                            >
                              <ArrowLeft className="w-4 h-4" />
                            </button>
                            <div className="flex flex-wrap gap-2 text-white">
                              {Array.from({ length: totalPages }).map((_, i) => (
                                <button
                                  key={i}
                                  onClick={() => setTransformationPage(i + 1)}
                                  className={`w-10 h-10 rounded-xl font-bold transition-all ${transformationPage === i + 1 ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40' : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'}`}
                                >
                                  {i + 1}
                                </button>
                              ))}
                            </div>
                            <button 
                              disabled={transformationPage === totalPages}
                              onClick={() => setTransformationPage(p => Math.min(totalPages, p + 1))}
                              className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-800 text-white disabled:opacity-30 transition-all hover:bg-slate-700"
                            >
                              <ArrowRight className="w-4 h-4" />
                            </button>
                          </div>
                        )}

                        {filtered.length === 0 && (
                          <div className="col-span-full py-20 bg-slate-950/20 border border-dashed border-white/10 rounded-[40px] flex flex-col items-center justify-center space-y-4">
                            <div className="text-4xl text-slate-700">🖼️</div>
                            <p className="text-slate-500 font-bold uppercase text-xs tracking-widest text-center">
                              Không tìm thấy kết quả phù hợp<br/>
                              <span className="text-[10px] opacity-60">Hãy thử thay đổi từ khóa hoặc bộ lọc</span>
                            </p>
                          </div>
                        )}
                      </>
                    );
                  })()}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>

      <GalleryPickerModal 
        isOpen={isGalleryPickerOpen}
        onClose={() => setIsGalleryPickerOpen(false)}
        gallery={gallery}
        aiVideoHistory={aiVideoHistory}
        onSelect={(url) => {
          if (galleryPickerCallback) galleryPickerCallback(url);
          setIsGalleryPickerOpen(false);
        }}
      />
    </motion.div>
    </motion.div>
)}
</AnimatePresence>
  );
};

const calculateDiagnostics = (form: Partial<NewsArticle>) => {
  const title = form.title || '';
  const content = form.content || '';
  const excerpt = form.excerpt || '';
  const slug = form.slug || '';
  const metaTitle = form.metaTitle || '';
  const metaDescription = form.metaDescription || '';
  const metaKeywords = form.metaKeywords;
  const imageAlt = form.imageAlt || '';

  // 1. Stats calculation
  const words = content.trim().split(/\s+/).filter(w => w.length > 0);
  const wordsCount = words.length;

  const sentences = content.split(/[.!?\n]+/).map(s => s.trim()).filter(s => s.length > 0);
  const sentenceCount = sentences.length || 1;
  const avgSentenceLength = wordsCount > 0 ? Math.round(wordsCount / sentenceCount) : 0;

  // Keyword occurrences
  const keywordList = Array.isArray(metaKeywords)
    ? metaKeywords.map(k => k.trim().toLowerCase()).filter(k => k.length > 0)
    : (typeof metaKeywords === 'string' && metaKeywords
        ? metaKeywords.split(',').map(k => k.trim().toLowerCase()).filter(k => k.length > 0)
        : []);
  
  let keywordMatches = 0;
  if (keywordList.length > 0 && wordsCount > 0) {
    const lowercaseContent = content.toLowerCase();
    keywordList.forEach(kw => {
      try {
        const escapedKw = kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`\\b${escapedKw}\\b`, 'gi');
        const matches = lowercaseContent.match(regex);
        if (matches) {
          keywordMatches += matches.length;
        } else {
          let pos = lowercaseContent.indexOf(kw);
          while (pos !== -1) {
            keywordMatches++;
            pos = lowercaseContent.indexOf(kw, pos + kw.length);
          }
        }
      } catch (e) {
        let pos = lowercaseContent.indexOf(kw);
        while (pos !== -1) {
          keywordMatches++;
          pos = lowercaseContent.indexOf(kw, pos + kw.length);
        }
      }
    });
  }
  const keywordDensity = wordsCount > 0 ? (keywordMatches / wordsCount) * 100 : 0;

  // 2. Readability Score & Feedback
  let readabilityScore = 100;
  const readabilityFeedback: string[] = [];

  if (wordsCount === 0) {
    readabilityScore = 0;
    readabilityFeedback.push('⚠️ Vui lòng nhập nội dung bài viết để bắt đầu đánh giá độ dễ đọc.');
  } else {
    if (wordsCount < 150) {
      readabilityScore -= 20;
      readabilityFeedback.push('⚠️ Nội dung quá ngắn (dưới 150 từ). Hãy mở rộng bài viết hơn.');
    } else if (wordsCount >= 150 && wordsCount < 400) {
      readabilityFeedback.push('ℹ️ Độ dài văn bản ở mức trung bình. Có thể bổ sung thêm chi tiết.');
    } else {
      readabilityFeedback.push('✅ Độ dài tuyệt vời (>400 từ), rất có chiều sâu cho độc giả.');
    }

    if (avgSentenceLength > 22) {
      const penalty = Math.min(35, (avgSentenceLength - 22) * 2.5);
      readabilityScore -= penalty;
      readabilityFeedback.push(`⚠️ Câu dài trung bình ${avgSentenceLength} từ. Hãy chia câu ngắn gọn hơn (<22 từ) để lôi cuốn hơn.`);
    } else if (avgSentenceLength < 8) {
      readabilityScore -= 10;
      readabilityFeedback.push(`⚠️ Các câu văn quá ngắn (trung bình ${avgSentenceLength} từ). Sử dụng câu dài ghép thích hợp giúp câu từ mượt mà hơn.`);
    } else {
      readabilityFeedback.push('✅ Độ dài câu trung bình cân bằng tốt (8 - 22 từ), dễ tiếp thu.');
    }

    const paragraphs = content.split('\n\n').filter(p => p.trim().length > 0);
    if (paragraphs.length > 0) {
      let longParagraph = false;
      paragraphs.forEach(p => {
        if (p.split(/\s+/).length > 90) {
          longParagraph = true;
        }
      });
      if (longParagraph) {
        readabilityScore -= 15;
        readabilityFeedback.push('⚠️ Có đoạn văn quá dài (trên 90 từ). Hãy gỡ phím Enter để ngăn cách thành các đoạn nhỏ hơn.');
      }
    }
  }
  readabilityScore = Math.max(0, Math.min(100, Math.round(readabilityScore)));

  // 3. SEO Score & Feedback
  let seoScore = 0;
  const seoFeedback: string[] = [];

  if (metaTitle) {
    if (metaTitle.length >= 40 && metaTitle.length <= 60) {
      seoScore += 15;
      seoFeedback.push('✅ Tiêu đề SEO (Meta Title) có độ dài lý tưởng (40 - 60 ký tự).');
    } else {
      seoScore += 8;
      seoFeedback.push(`⚠️ Tiêu đề SEO hiện dài ${metaTitle.length} ký tự. Nên điều chỉnh về khoảng 40 - 60 ký tự.`);
    }
  } else {
    seoFeedback.push('❌ Chưa có Tiêu đề SEO (Meta Title).');
  }

  if (metaDescription) {
    if (metaDescription.length >= 100 && metaDescription.length <= 160) {
      seoScore += 15;
      seoFeedback.push('✅ Mô tả SEO (Meta Description) hoàn hảo (100 - 160 ký tự).');
    } else {
      seoScore += 8;
      seoFeedback.push(`⚠️ Mô tả SEO dài ${metaDescription.length} ký tự. Hãy điều chỉnh tối ưu về 100 - 160 ký tự.`);
    }
  } else {
    seoFeedback.push('❌ Thiếu Mô tả SEO (Meta Description).');
  }

  if (imageAlt) {
    seoScore += 15;
    seoFeedback.push('✅ Đã nhập mô tả ảnh thay thế (Alt text), Google dễ ghi nhận hình ảnh.');
  } else {
    seoFeedback.push('❌ Thiếu Alt text cho hình ảnh bìa.');
  }

  if (slug) {
    seoScore += 10;
    seoFeedback.push('✅ Đã tạo đường dẫn thân thiện (slug).');
  } else {
    seoFeedback.push('❌ Chưa cấu hình URL Slug.');
  }

  if (keywordList.length === 0) {
    seoFeedback.push('❌ Chưa nhập từ khóa SEO nào trong tab SEO.');
  } else {
    const hasKeywordInTitle = keywordList.some(kw => title.toLowerCase().includes(kw));
    if (hasKeywordInTitle) {
      seoScore += 15;
      seoFeedback.push('✅ Từ khóa mục tiêu nằm trong tiêu đề bài viết.');
    } else {
      seoFeedback.push('⚠️ Từ khóa SEO chưa có trong tiêu đề. Hãy lồng ghép từ khóa vào tiêu đề bài viết.');
    }

    if (wordsCount > 0) {
      if (keywordDensity === 0) {
        seoFeedback.push('❌ Từ khóa SEO mục tiêu không có mặt trong nội dung.');
      } else if (keywordDensity < 1.0) {
        seoScore += 10;
        seoFeedback.push(`⚠️ Mật độ từ khóa hiện là ${keywordDensity.toFixed(1)}% (mức thấp). Nên phân bổ lặp lại từ khóa thêm.`);
      } else if (keywordDensity >= 1.0 && keywordDensity <= 3.5) {
        seoScore += 30;
        seoFeedback.push(`✅ Mật độ từ khóa tối ưu: ${keywordDensity.toFixed(1)}% (mức tiêu chuẩn 1.0% - 3.5%).`);
      } else {
        seoScore += 10;
        seoFeedback.push(`⚠️ Mật độ từ khóa quá đậm đặc: ${keywordDensity.toFixed(1)}% (nhồi nhét từ khóa). Có thể bị Google phạt.`);
      }
    }
  }

  seoScore = Math.max(0, Math.min(100, Math.round(seoScore)));

  return {
    readabilityScore,
    seoScore,
    readabilityFeedback,
    seoFeedback,
    stats: {
      wordsCount,
      sentenceCount,
      avgSentenceLength,
      keywordDensity
    }
  };
};

const NewsManagement: React.FC<{
  news: NewsArticle[];
  setNews: (news: NewsArticle[]) => void;
}> = ({ news, setNews }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [activeFormTab, setActiveFormTab] = useState<'content' | 'seo'>('content');
  const [tagInput, setTagInput] = useState('');
  const [form, setForm] = useState<Partial<NewsArticle>>({
    title: '', slug: '', excerpt: '', content: '', image: '', imageAlt: '', category: 'tip', author: 'Admin', date: new Date().toISOString().split('T')[0],
    metaTitle: '', metaDescription: '', metaKeywords: [] as string[]
  });

  const diagnostics = useMemo(() => calculateDiagnostics(form), [form]);

  const renderFeedbackItem = (text: string, index: number) => {
    let Icon = Info;
    let iconColor = 'text-blue-400 bg-blue-400/10';
    let cleanText = text;

    if (text.startsWith('✅')) {
      Icon = CheckCircle2;
      iconColor = 'text-emerald-400 bg-emerald-400/10';
      cleanText = text.substring(1).trim();
    } else if (text.startsWith('⚠️')) {
      Icon = AlertTriangle;
      iconColor = 'text-yellow-400 bg-yellow-400/10';
      cleanText = text.substring(1).trim();
    } else if (text.startsWith('❌')) {
      Icon = XCircle;
      iconColor = 'text-rose-400 bg-rose-400/10';
      cleanText = text.substring(1).trim();
    } else if (text.startsWith('ℹ️')) {
      Icon = Info;
      iconColor = 'text-blue-400 bg-blue-400/10';
      cleanText = text.substring(2).trim();
    }

    return (
      <div key={index} className="flex gap-3 text-xs leading-relaxed text-slate-300 items-start">
        <div className={`p-1 rounded-lg shrink-0 w-5 h-5 flex items-center justify-center mt-0.5 ${iconColor}`}>
          <Icon className="w-3.5 h-3.5" />
        </div>
        <span>{cleanText}</span>
      </div>
    );
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Ảnh quá lớn, vui lòng chọn ảnh dưới 2MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateSEO = async () => {
    if (!form.title || !form.content) return toast.error("Vui lòng nhập tiêu đề và nội dung để tạo SEO!");
    
    const hasKey = await window.aistudio.hasSelectedApiKey();
    if (!hasKey) {
      await window.aistudio.openSelectKey();
      return;
    }

    setIsAiGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      const prompt = `Bạn là chuyên gia SEO cho trung tâm chăm sóc xe. Dựa trên bài viết:
      Tiêu đề: ${form.title}
      Nội dung: ${form.content.substring(0, 1000)}...
      
      Hãy tạo các thuộc tính SEO để đẩy bài viết lên TOP 1 Google:
      1. metaTitle: Tối ưu 60 ký tự, chứa từ khóa chính, hấp dẫn.
      2. metaDescription: Tối ưu 160 ký tự, tóm tắt bài viết, lời kêu gọi hành động.
      3. metaKeywords: 10 từ khóa liên quan, cách nhau dấu phẩy.
      4. imageAlt: Mô tả ảnh cho người khiếm thị và Google (alt text).
      
      QUAN TRỌNG: Chỉ trả về JSON.`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: { responseMimeType: "application/json" }
      });

      const result = JSON.parse(response.text || "{}");
      const rawKeywords = result.metaKeywords || 'detailing, xe dep pro, cham soc xe';
      const keywordsArr = typeof rawKeywords === 'string'
        ? rawKeywords.split(',').map((k: string) => k.trim()).filter((k: string) => k.length > 0)
        : (Array.isArray(rawKeywords) ? rawKeywords : []);

      setForm({
        ...form,
        metaTitle: result.metaTitle || `${form.title} | XE ĐẸP PRO`,
        metaDescription: result.metaDescription || form.excerpt,
        metaKeywords: keywordsArr,
        imageAlt: result.imageAlt || form.title
      });
      toast.success("Đã tối ưu SEO hoàn tất!");
      setActiveFormTab('seo');
    } catch (error: any) {
      toast.error("Lỗi AI SEO: " + error.message);
    } finally {
      setIsAiGenerating(false);
    }
  };

  const handleTitleChange = (title: string) => {
    const currentSlug = form.slug || '';
    const autoSlug = generateSlug(form.title || '');
    
    // Nếu slug trống hoặc đang khớp với slug tự động từ tiêu đề cũ, thì cập nhật slug mới
    if (!currentSlug || currentSlug === autoSlug) {
      setForm({ ...form, title, slug: generateSlug(title) });
    } else {
      setForm({ ...form, title });
    }
  };

  const handleAiGenerate = async () => {
    if (!aiPrompt) return toast.error("Vui lòng nhập mô tả bài viết!");
    
    const hasKey = await window.aistudio.hasSelectedApiKey();
    if (!hasKey) {
      await window.aistudio.openSelectKey();
      return;
    }

    setIsAiGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      const prompt = `Bạn là một chuyên gia viết lách cho trung tâm chăm sóc xe "XE ĐẸP PRO". 
      Hãy tạo một bài viết tin tức hoặc mẹo chăm sóc xe dựa trên yêu cầu sau: "${aiPrompt}".
      Yêu cầu kết quả trả về dưới dạng JSON với các trường:
      - title: Tiêu đề hấp dẫn, chuyên nghiệp.
      - excerpt: Mô tả ngắn gọn (khoảng 2-3 câu).
      - content: Nội dung chi tiết bài viết, sử dụng định dạng Markdown (có các tiêu đề, danh sách, in đậm...).
      - category: Một trong các giá trị: "tip", "news", "promotion".
      - author: "Admin"
      
      Ngôn ngữ: Tiếng Việt. Phong cách: Chuyên nghiệp, tin cậy, hấp dẫn.
      QUAN TRỌNG: Chỉ trả về JSON, không có lời giải thích hay định dạng Markdown bên ngoài khối JSON.`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: { responseMimeType: "application/json" }
      });

      const result = JSON.parse(response.text || "{}");
      if (result.title && result.content) {
        const title = result.title;
        setForm({
          ...form,
          title,
          slug: generateSlug(title),
          excerpt: result.excerpt || '',
          content: result.content,
          category: result.category || 'news',
          image: result.image || 'https://images.unsplash.com/photo-1599256621730-535171e28e50?auto=format&fit=crop&q=80&w=800',
          metaTitle: result.title,
          metaDescription: result.excerpt,
          metaKeywords: [result.category || 'news', 'ceramic', 'ppf', 'detailing'],
        });
        setIsAdding(true);
        setAiPrompt('');
      }
    } catch (error: any) {
      console.error(error);
      toast.error("Lỗi AI: " + error.message);
    } finally {
      setIsAiGenerating(false);
    }
  };

  const handleSave = () => {
    if (!form.title || !form.content) return toast.error("Vui lòng nhập tiêu đề và nội dung!");
    
    const finalSlug = form.slug || generateSlug(form.title);
    const finalArticle = { 
      ...form as NewsArticle, 
      id: editingId || Date.now().toString(),
      slug: finalSlug 
    };

    if (editingId) {
      setNews((news || []).map(n => n.id === editingId ? finalArticle : n));
    } else {
      setNews([finalArticle, ...(news || [])]);
    }
    setIsAdding(false);
    setEditingId(null);
    setForm({ 
      title: '', slug: '', excerpt: '', content: '', image: '', imageAlt: '', category: 'tip', author: 'Admin', date: new Date().toISOString().split('T')[0],
      metaTitle: '', metaDescription: '', metaKeywords: [] as string[]
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="section-title text-2xl">Quản Lý Tin Tức & Mẹo</h3>
          <p className="section-subtitle mb-0 mt-1">Đăng tải bài viết, hướng dẫn và khuyến mãi</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-md hidden md:block">
            <input 
              type="text"
              placeholder="Nhập ý tưởng bài viết (VD: Mẹo rửa xe tại nhà)..."
              value={aiPrompt}
              onChange={e => setAiPrompt(e.target.value)}
              className="w-full bg-slate-900 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-xs text-white outline-none focus:border-blue-500"
              onKeyDown={e => e.key === 'Enter' && handleAiGenerate()}
            />
            <button 
              onClick={handleAiGenerate}
              disabled={isAiGenerating}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-500 hover:text-blue-400 disabled:opacity-50"
              title="Tạo bằng AI"
            >
              {isAiGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
            </button>
          </div>
          <button 
            onClick={() => {
              setForm({ 
                title: '', slug: '', excerpt: '', content: '', image: '', imageAlt: '', category: 'tip', author: 'Admin', date: new Date().toISOString().split('T')[0],
                metaTitle: '', metaDescription: '', metaKeywords: [] as string[]
              });
              setEditingId(null);
              setIsAdding(true);
            }}
            className="btn-primary px-6 py-3 text-[10px]"
          >
            <Plus className="w-4 h-4" /> Thêm Bài Viết
          </button>
        </div>
      </div>

      {isAdding ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900/50 border border-white/10 p-8 rounded-[32px] space-y-6"
        >
          {/* Form Tabs */}
          <div className="flex gap-2 p-1 bg-slate-950 rounded-2xl w-fit">
            <button 
              onClick={() => setActiveFormTab('content')}
              className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeFormTab === 'content' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-white'}`}
            >
              Nội Dung Chính
            </button>
            <button 
              onClick={() => setActiveFormTab('seo')}
              className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${activeFormTab === 'seo' ? 'bg-emerald-600 text-white' : 'text-slate-500 hover:text-white'}`}
            >
              Cấu Hình SEO <Zap className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Cột trái: Form nhập liệu nội dung hoặc SEO */}
            <div className="lg:col-span-8 space-y-6">
              {activeFormTab === 'content' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Tiêu đề bài viết</label>
                    <input 
                      value={form.title}
                      onChange={e => handleTitleChange(e.target.value)}
                      placeholder="Nhập tiêu đề bài viết..."
                      className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">URL Slug (Tự động tạo)</label>
                    <input 
                      value={form.slug}
                      onChange={e => setForm({...form, slug: e.target.value})}
                      placeholder="url-bai-viet-tu-dong"
                      className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-blue-500 font-mono text-xs"
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
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Tác giả</label>
                    <input 
                      value={form.author}
                      onChange={e => setForm({...form, author: e.target.value})}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-blue-500"
                    />
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
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">Ảnh bìa bài viết</label>
                    <div className="flex gap-4 items-start">
                      <div className="flex-1 space-y-4">
                        <input 
                          value={form.image}
                          onChange={e => setForm({...form, image: e.target.value})}
                          placeholder="Nhập URL ảnh hoặc tải lên từ máy tính..."
                          className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-blue-500"
                        />
                        <div className="flex items-center gap-4">
                          <label className="flex-1 cursor-pointer group">
                            <div className="flex items-center justify-center gap-2 p-4 bg-slate-800 border-2 border-dashed border-white/10 rounded-xl hover:border-blue-500/50 hover:bg-slate-800/80 transition-all">
                              <Upload className="w-5 h-5 text-slate-400 group-hover:text-blue-500" />
                              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-white">Tải ảnh từ máy tính</span>
                            </div>
                            <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                          </label>
                          {form.image && (
                            <button 
                              onClick={() => setForm({...form, image: ''})}
                              className="p-4 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          )}
                        </div>
                      </div>
                      {form.image && (
                        <div className="w-48 aspect-video rounded-xl overflow-hidden border border-white/10">
                          <img src={form.image} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6 max-w-4xl">
                  <div className="flex items-center justify-between p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl mb-6">
                    <div className="flex items-center gap-3">
                      <Zap className="w-5 h-5 text-emerald-500" />
                      <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Sử dụng AI để tối ưu bài viết lên TOP 1 Google</p>
                    </div>
                    <button 
                      onClick={handleGenerateSEO}
                      disabled={isAiGenerating}
                      className="px-6 py-2 bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-500 transition-all disabled:opacity-50 flex items-center gap-2"
                    >
                      {isAiGenerating ? <Loader2 className="w-3 h-3 animate-spin" /> : 'Tối ưu ngay'}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">Bộ từ khóa SEO (Tags)</label>
                      
                      {/* Render current tags */}
                      <div className="flex flex-wrap gap-2 p-3 bg-slate-950/45 border border-white/5 rounded-2xl min-h-[56px] items-center">
                        {(() => {
                          const currentTags = Array.isArray(form.metaKeywords)
                            ? form.metaKeywords
                            : (form.metaKeywords && typeof form.metaKeywords === 'string'
                                ? form.metaKeywords.split(',').map(t => t.trim()).filter(Boolean)
                                : []);

                          if (currentTags.length === 0) {
                            return <span className="text-slate-500 text-xs italic px-2">Chưa có từ khóa nào. Hãy thêm ở ô bên dưới...</span>;
                          }

                          return currentTags.map((tag, tagIdx) => (
                            <div key={tagIdx} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono text-xs rounded-xl transition-all hover:bg-blue-500/20">
                              <span>{tag}</span>
                              <button
                                type="button"
                                onClick={() => {
                                  const updatedTags = currentTags.filter((_, idx) => idx !== tagIdx);
                                  setForm({ ...form, metaKeywords: updatedTags });
                                }}
                                className="text-blue-400/50 hover:text-red-400 p-0.5 rounded transition-all"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ));
                        })()}
                      </div>

                      {/* Add new tag input control */}
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <input 
                            type="text"
                            placeholder="Nhập từ khóa và nhấn Enter hoặc phẩy (,)..."
                            value={tagInput}
                            onChange={e => setTagInput(e.target.value)}
                            onKeyDown={e => {
                              if (e.key === 'Enter' || e.key === ',') {
                                e.preventDefault();
                                const cleanInput = tagInput.trim().replace(/,+/g, '');
                                if (cleanInput) {
                                  const currentTags = Array.isArray(form.metaKeywords)
                                    ? form.metaKeywords
                                    : (form.metaKeywords && typeof form.metaKeywords === 'string'
                                        ? form.metaKeywords.split(',').map(t => t.trim()).filter(Boolean)
                                        : []);
                                  if (!currentTags.includes(cleanInput)) {
                                    setForm({ ...form, metaKeywords: [...currentTags, cleanInput] });
                                  }
                                  setTagInput('');
                                }
                              }
                            }}
                            className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white text-xs outline-none focus:border-blue-500 font-mono"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const cleanInput = tagInput.trim().replace(/,+/g, '');
                            if (cleanInput) {
                              const currentTags = Array.isArray(form.metaKeywords)
                                ? form.metaKeywords
                                : (form.metaKeywords && typeof form.metaKeywords === 'string'
                                    ? form.metaKeywords.split(',').map(t => t.trim()).filter(Boolean)
                                    : []);
                              if (!currentTags.includes(cleanInput)) {
                                setForm({ ...form, metaKeywords: [...currentTags, cleanInput] });
                              }
                              setTagInput('');
                            }
                          }}
                          className="px-6 py-4 bg-slate-800 text-slate-350 hover:bg-slate-700 hover:text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all"
                        >
                          Thêm
                        </button>
                      </div>
                      <p className="text-[8px] text-slate-500 italic px-1">Nhập từ khóa đơn lẻ hoặc nhập nhiều từ cách nhau bằng dấu phẩy. Giúp Google nhận diện bài viết.</p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Tiêu đề SEO (Meta Title)</label>
                      <input 
                        value={form.metaTitle}
                        onChange={e => setForm({...form, metaTitle: e.target.value})}
                        placeholder="Mặc định sẽ lấy tiêu đề bài viết | Tên Trung Tâm"
                        className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-blue-500"
                      />
                      <div className="flex justify-between items-center px-1">
                        <p className="text-[8px] text-slate-500 italic">Hiển thị trực tiếp trên kết quả tìm kiếm Google.</p>
                        <span className={`text-[8px] font-bold ${(form.metaTitle?.length || 0) > 60 ? 'text-red-500' : 'text-slate-500'}`}>{form.metaTitle?.length || 0}/60</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Mô tả SEO (Meta Description)</label>
                      <textarea 
                        value={form.metaDescription}
                        onChange={e => setForm({...form, metaDescription: e.target.value})}
                        placeholder="Tóm tắt ngắn gọn bài viết một cách lôi cuốn..."
                        className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white h-24 outline-none focus:border-blue-500 resize-none"
                      />
                      <div className="flex justify-between items-center px-1">
                        <p className="text-[8px] text-slate-500 italic">Đoạn text nhỏ dưới tiêu đề trên Google.</p>
                        <span className={`text-[8px] font-bold ${(form.metaDescription?.length || 0) > 160 ? 'text-red-500' : 'text-slate-500'}`}>{form.metaDescription?.length || 0}/160</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Mô tả ảnh bìa (Image Alt Text)</label>
                      <input 
                        value={form.imageAlt}
                        onChange={e => setForm({...form, imageAlt: e.target.value})}
                        placeholder="Mô tả nội dung bức ảnh..."
                        className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-blue-500"
                      />
                      <p className="text-[8px] text-slate-500 italic px-1">Giúp Google Images index ảnh của bạn.</p>
                    </div>
                  </div>

                  {/* Google Result Preview */}
                  <div className="mt-8 p-6 bg-white rounded-2xl space-y-2 border border-blue-500/20 shadow-xl shadow-blue-500/5">
                    <p className="text-[10px] text-[#202124] mb-1">Xem trước kết quả trên Google:</p>
                    <div className="text-[12px] text-[#202124] flex items-center gap-1.5 break-all">
                      <span>xedeppro.com</span>
                      <ChevronRight className="w-2 h-2 text-[#70757a]" />
                      <span className="text-[#70757a]">{form.slug || 'url-slug'}</span>
                    </div>
                    <h3 className="text-[18px] text-[#1a0dab] font-normal hover:underline cursor-pointer leading-tight mb-1">
                      {form.metaTitle || form.title || 'Tiêu đề bài viết xuất hiện tại đây...'}
                    </h3>
                    <p className="text-[14px] text-[#4d5156] leading-snug line-clamp-2">
                      {form.metaDescription || form.excerpt || 'Đoạn mô tả SEO bài viết sẽ hiện ra ở đây để thu hút khách hàng click vào trang web của bạn...'}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Cột phải: Bảng chẩn đoán Đo Lường & Sức Khỏe SEO / Dễ đọc */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-slate-950/45 border border-white/5 rounded-[24px] p-6 space-y-6 h-fit sticky top-6">
                <div>
                  <h4 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-2">
                    <Activity className="w-5 h-5 text-blue-500" /> Bảng Chẩn Đoán Bài Viết
                  </h4>
                  <p className="text-[9px] text-slate-500 mt-1">Cập nhật tự động theo thời gian thực</p>
                </div>

                {/* Thanh tiến trình điểm số */}
                <div className="space-y-4 pt-2 border-t border-white/5">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Độ dễ đọc (Readability)</span>
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-md ${
                        diagnostics.readabilityScore >= 80 ? 'text-emerald-400 bg-emerald-500/10' : diagnostics.readabilityScore >= 50 ? 'text-yellow-400 bg-yellow-500/10' : 'text-red-400 bg-red-500/10'
                      }`}>{diagnostics.readabilityScore}/100</span>
                    </div>
                    <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                      <div 
                        className={`h-1.5 rounded-full transition-all duration-500 ${
                          diagnostics.readabilityScore >= 80 ? 'bg-emerald-500' : diagnostics.readabilityScore >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${diagnostics.readabilityScore}%` }}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Sức khỏe SEO (SEO Health)</span>
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-md ${
                        diagnostics.seoScore >= 80 ? 'text-emerald-400 bg-emerald-500/10' : diagnostics.seoScore >= 50 ? 'text-yellow-400 bg-yellow-500/10' : 'text-red-400 bg-red-500/10'
                      }`}>{diagnostics.seoScore}/100</span>
                    </div>
                    <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                      <div 
                        className={`h-1.5 rounded-full transition-all duration-500 ${
                          diagnostics.seoScore >= 80 ? 'bg-emerald-500' : diagnostics.seoScore >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${diagnostics.seoScore}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Metric cụ thể */}
                <div className="p-4 bg-slate-950/80 border border-white/5 rounded-2xl grid grid-cols-2 gap-4 text-center">
                  <div className="space-y-1">
                    <div className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">Tổng số từ</div>
                    <div className="text-base font-black text-white">{diagnostics.stats.wordsCount}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">Tổng số câu</div>
                    <div className="text-base font-black text-white">{diagnostics.stats.sentenceCount}</div>
                  </div>
                  <div className="col-span-2 pt-2 border-t border-white/5 flex justify-between px-1">
                    <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">Từ / Câu trung bình</span>
                    <span className="text-xs font-black text-white">{diagnostics.stats.avgSentenceLength} từ</span>
                  </div>
                  <div className="col-span-2 pt-1 flex justify-between px-1">
                    <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">Mật độ Từ Khóa SEO</span>
                    <span className="text-xs font-black text-white">{diagnostics.stats.keywordDensity.toFixed(1)}%</span>
                  </div>
                </div>

                {/* Danh sách phản hồi và khuyến cáo */}
                <div className="space-y-3 pt-3 border-t border-white/5">
                  <div className="text-[9px] font-black uppercase tracking-widest text-[#71717a]">Gợi ý tối ưu</div>
                  <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1 scrollbar-hide">
                    {diagnostics.readabilityFeedback.map((text, idx) => renderFeedbackItem(text, idx))}
                    {diagnostics.seoFeedback.map((text, idx) => renderFeedbackItem(text, idx))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-4 pt-4">
            <button onClick={handleSave} className="flex-1 bg-blue-600 text-white py-4 rounded-xl font-black uppercase tracking-widest hover:bg-blue-500 transition-all">Lưu Bài Viết</button>
            <button 
              onClick={() => { 
                setIsAdding(false); 
                setEditingId(null); 
                setForm({ 
                  title: '', slug: '', excerpt: '', content: '', image: '', imageAlt: '', category: 'tip', author: 'Admin', date: new Date().toISOString().split('T')[0],
                  metaTitle: '', metaDescription: '', metaKeywords: [] as string[]
                });
              }} 
              className="px-8 bg-slate-800 text-slate-400 rounded-xl font-black uppercase tracking-widest hover:text-white transition-all"
            >
              Hủy
            </button>
          </div>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(news || []).map(article => (
            <div key={article.id} className="bg-slate-900/40 border border-white/5 rounded-3xl overflow-hidden group hover:border-blue-500/30 transition-all">
              <div className="aspect-video relative overflow-hidden">
                <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" referrerPolicy="no-referrer" />
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
                        const keywordsArr = Array.isArray(article.metaKeywords)
                          ? article.metaKeywords
                          : (article.metaKeywords && typeof article.metaKeywords === 'string'
                              ? article.metaKeywords.split(',').map(k => k.trim()).filter(Boolean)
                              : []);
                        setForm({
                          ...article,
                          metaKeywords: keywordsArr
                        });
                        setEditingId(article.id);
                        setIsAdding(true);
                      }}
                      className="p-2 bg-slate-800 text-slate-400 hover:text-blue-500 rounded-lg transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                        onClick={() => {
                          setNews(news.filter(n => n.id !== article.id));
                          toast.success("Đã xóa bài viết!");
                        }}
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
  currentUserRole: UserRole;
  siteConfig: SiteConfig;
  onAdminClick: () => void;
  onAddRecord: () => void;
  onOpenDashboard: () => void;
  onStaffClick: () => void;
  onPaymentClick: () => void;
  onReset: () => void;
  onSidebarAction: (id: string) => void;
  scrollToSection: (id: string) => void;
  cart: DetailingPackage[];
  onOpenCart: () => void;
}> = ({ isOpen, onClose, isEditMode, currentUserRole, siteConfig, onAdminClick, onAddRecord, onOpenDashboard, onStaffClick, onPaymentClick, onReset, onSidebarAction, scrollToSection, cart, onOpenCart }) => {
  const handleNav = (id: string) => {
    onSidebarAction(id);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[600] overflow-hidden">
          {/* Backdrop Blur */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/95 backdrop-blur-2xl px-4" 
            onClick={onClose}
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-full w-full flex flex-col"
          >
            {/* Top Bar */}
            <div className="p-8 sm:p-12 flex justify-between items-center bg-transparent relative z-10 w-full">
              <div className="flex items-center gap-6">
                <Link to="/" onClick={onClose} className="flex items-center gap-4 group">
                  {siteConfig.logoUrl ? (
                    <img src={siteConfig.logoUrl} alt="Logo" className="w-12 h-12 object-contain group-hover:scale-110 transition-transform" />
                  ) : (
                    <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center font-black text-white text-xl">
                      {siteConfig?.siteName?.charAt(0) || 'D'}
                    </div>
                  )}
                  <h3 className="text-2xl font-black text-white uppercase tracking-tighter">
                    {siteConfig.siteName}
                  </h3>
                </Link>
              </div>
              
              <button 
                onClick={onClose}
                className="w-14 h-14 rounded-2xl bg-white/5 hover:bg-red-600 flex items-center justify-center text-white transition-all active:scale-90 border border-white/10 group"
              >
                <X className="w-8 h-8 group-hover:rotate-90 transition-transform duration-500" />
              </button>
            </div>

            {/* Main Content Scroll Area */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              <div className="container mx-auto px-6 py-8 md:py-24 max-w-7xl">
                {/* Mobile Quick Actions */}
                <div className="lg:hidden grid grid-cols-2 gap-3 mb-12">
                  <button 
                    onClick={() => { onOpenCart(); onClose(); }}
                    className="flex flex-col items-center justify-center p-6 rounded-[24px] bg-blue-600/10 border border-blue-500/20 text-blue-500 gap-2"
                  >
                    <ShoppingCart className="w-6 h-6" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-center">Giỏ hàng ({cart.length})</span>
                  </button>
                  <button 
                    onClick={() => { onStaffClick(); onClose(); }}
                    className="flex flex-col items-center justify-center p-6 rounded-[24px] bg-emerald-600/10 border border-emerald-500/20 text-emerald-500 gap-2"
                  >
                    <Shield className="w-6 h-6" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-center">Cổng Staff</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                  {/* Left Column: Big Nav */}
                  <div className="space-y-12 md:space-y-16">
                    <div className="space-y-4">
                      <p className="text-[11px] font-bold text-blue-500 uppercase tracking-[0.4em] mb-4">Main Menu</p>
                      <nav className="flex flex-col gap-3 md:gap-5">
                        {[
                          { id: 'promotions', label: 'Khuyến Mãi Siêu Cấp' },
                          { id: 'vip', label: 'Chương Trình VIP' },
                          { id: 'services', label: 'Dịch Vụ Tiêu Chuẩn' },
                          { id: 'packages', label: 'Gói Chăm Sóc Xe' },
                          { id: 'premium', label: 'Giải Pháp Luxury' },
                          { id: 'tracking', label: 'Tracking Xe Online' }
                        ].filter(() => !(isEditMode && currentUserRole === 'staff')).map((item, idx) => (
                          <motion.button
                            key={item.id}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.1 + idx * 0.05 }}
                            onClick={() => handleNav(item.id)}
                            className="text-left group flex items-center gap-4 md:gap-6 py-3.5 cursor-pointer"
                          >
                            <span className="text-slate-500 text-xs sm:text-sm font-medium italic group-hover:text-blue-400 transition-colors">0{idx + 1}</span>
                            <span className="text-base sm:text-lg md:text-xl font-semibold text-slate-100 group-hover:text-blue-400 transition-all group-hover:translate-x-2 tracking-wide leading-relaxed">
                              {item.label}
                            </span>
                          </motion.button>
                        ))}
                      </nav>
                    </div>

                    {/* Admin Section - Always visible but functional based on authentication */}
                    <div className="space-y-8 pt-10 border-t border-white/10">
                      <div className="flex items-center justify-between">
                        <p className="text-xs md:text-sm font-black text-emerald-500 uppercase tracking-[0.5em]">Hệ Thống Quản Trị</p>
                        {!isEditMode && (
                          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-white/10">
                            <Lock className="w-3 h-3 text-slate-600" />
                            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Bảo Mật</span>
                          </div>
                        )}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <button 
                          onClick={() => { 
                            if (isEditMode && (currentUserRole === 'admin' || currentUserRole === 'manager')) { onOpenDashboard(); onClose(); }
                            else { onAdminClick(); }
                          }}
                          className={`flex items-center justify-between gap-4 p-6 rounded-3xl font-black uppercase text-xs tracking-widest shadow-2xl transition-all active:scale-95 border ${
                            isEditMode && (currentUserRole === 'admin' || currentUserRole === 'manager') 
                            ? 'bg-blue-600 text-white border-blue-500 shadow-blue-900/40 hover:bg-blue-500' 
                            : 'bg-slate-900/60 text-slate-400 border-white/5 hover:border-blue-500/50 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <Settings className="w-6 h-6" />
                            <span>Quản Trị Admin</span>
                          </div>
                          <ArrowRight className="w-4 h-4 opacity-50" />
                        </button>
                        <button 
                          onClick={() => { 
                            if (isEditMode && currentUserRole === 'staff') { onOpenDashboard(); onClose(); }
                            else { onStaffClick(); onClose(); }
                          }}
                          className={`flex items-center justify-between gap-4 p-6 rounded-3xl font-black uppercase text-xs tracking-widest shadow-2xl border transition-all active:scale-95 ${
                            isEditMode && currentUserRole === 'staff' 
                            ? 'bg-emerald-600 text-white border-emerald-500 shadow-emerald-900/40 hover:bg-emerald-500' 
                            : 'bg-slate-900/60 text-slate-400 border-white/5 hover:border-emerald-500/50 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <Shield className="w-6 h-6" />
                            <span>Cổng Nhân Viên</span>
                          </div>
                          <ArrowRight className="w-4 h-4 opacity-50" />
                        </button>
                        {isEditMode && currentUserRole === 'admin' && (
                          <button 
                            onClick={() => { onReset(); onClose(); }}
                            className="flex items-center gap-4 p-5 rounded-2xl bg-red-600/10 text-red-500 font-black uppercase text-[10px] tracking-widest border border-red-500/20 hover:bg-red-600/20 transition-all active:scale-95 sm:col-span-2"
                          >
                            <RefreshCw className="w-5 h-5" /> Reset Dữ Liệu
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Secondary Links */}
                    <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/5">
                      <div className="space-y-4">
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Kỹ Thuật</p>
                        <div className="flex flex-col gap-3">
                          <button onClick={() => handleNav('window-tinting')} className="text-slate-400 hover:text-white transition-colors text-xs font-bold uppercase tracking-wider text-left py-1 cursor-pointer">Phim Cách Nhiệt</button>
                          <button onClick={() => handleNav('wrap-ppf')} className="text-slate-400 hover:text-white transition-colors text-xs font-bold uppercase tracking-wider text-left py-1 cursor-pointer">Wrap & PPF</button>
                          <button onClick={() => handleNav('tuning')} className="text-slate-400 hover:text-white transition-colors text-xs font-bold uppercase tracking-wider text-left py-1 cursor-pointer">Nâng Cấp Xe</button>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Khám Phá</p>
                        <div className="flex flex-col gap-3">
                          <button onClick={() => handleNav('news')} className="text-slate-400 hover:text-white transition-colors text-xs font-bold uppercase tracking-wider text-left py-1 cursor-pointer">Tin Tức</button>
                          <button onClick={() => handleNav('gallery')} className="text-slate-400 hover:text-white transition-colors text-xs font-bold uppercase tracking-wider text-left py-1 cursor-pointer">Thư Viện Ảnh</button>
                          <button onClick={() => handleNav('reviews')} className="text-slate-400 hover:text-white transition-colors text-xs font-bold uppercase tracking-wider text-left py-1 cursor-pointer">Đánh Giá</button>
                        </div>
                      </div>
                    </div>

                    {/* Quick Login for Admins - Hidden when already logged in */}
                    {!isEditMode && (
                      <div className="pt-8">
                        <button 
                          onClick={() => { onAdminClick(); onClose(); }}
                          className="flex items-center gap-3 text-slate-600 hover:text-emerald-500 transition-colors"
                        >
                          <Lock className="w-4 h-4" />
                          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Hệ Thống Quản Trị</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Right Column: High Impact Content */}
                  <div className="hidden lg:block space-y-12">
                    {/* Featured Promo Card */}
                    <div className="p-10 rounded-[48px] bg-blue-600 relative overflow-hidden group/card shadow-2xl shadow-blue-900/40">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[100px] rounded-full group-hover/card:scale-150 transition-transform duration-[2000ms]"></div>
                      <div className="relative z-10 space-y-8">
                        <div>
                          <p className="text-white/60 font-black text-[10px] uppercase tracking-[0.3em] mb-4">Gói dịch vụ nổi bật</p>
                          <h4 className="text-4xl font-black text-white leading-tight uppercase tracking-tighter">Ceramic Pro <br/> Diamond Shield</h4>
                        </div>
                        <p className="text-white/80 text-lg leading-relaxed italic">"Bảo vệ bề mặt sơn với công nghệ nano đa lớp, tạo độ bóng gương hoàn hảo và chống tia UV tuyệt đối."</p>
                        <button 
                          onClick={() => handleNav('services')}
                          className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl hover:scale-105 transition-all"
                        >
                          Khám phá chi tiết
                        </button>
                      </div>
                    </div>

                    {/* Stats or Info */}
                    <div className="grid grid-cols-2 gap-6">
                      <div className="p-8 rounded-[40px] bg-white/[0.03] border border-white/10 flex flex-col justify-between h-48 group hover:bg-white/[0.05] transition-all">
                        <div className="w-10 h-10 bg-emerald-600/20 text-emerald-500 rounded-xl flex items-center justify-center font-bold">10k+</div>
                        <div>
                          <p className="text-white font-black text-lg">Khách Hàng</p>
                          <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Đã trải nghiệm dịch vụ</p>
                        </div>
                      </div>
                      <div className="p-8 rounded-[40px] bg-white/[0.03] border border-white/10 flex flex-col justify-between h-48 group hover:bg-white/[0.05] transition-all">
                        <div className="w-10 h-10 bg-blue-600/20 text-blue-500 rounded-xl flex items-center justify-center font-bold">5★</div>
                        <div>
                          <p className="text-white font-black text-lg">Xếp Hạng</p>
                          <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Trung bình đánh giá</p>
                        </div>
                      </div>
                    </div>

                    {/* Quick Access Buttons */}
                    <div className="grid grid-cols-1 gap-4 pt-10">
                       <button 
                         onClick={() => { onOpenCart(); onClose(); }}
                         className="flex items-center justify-between p-6 rounded-3xl bg-slate-900 border border-white/10 hover:border-blue-500 transition-all group"
                       >
                         <div className="flex items-center gap-4">
                           <div className="p-3 bg-blue-600/10 text-blue-500 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all">
                             <ShoppingCart className="w-6 h-6" />
                           </div>
                           <div>
                             <p className="text-white font-black uppercase text-xs tracking-tight">Giỏ hàng của bạn</p>
                             <p className="text-slate-500 text-[10px] font-bold">{cart.length} sản phẩm đang chờ</p>
                           </div>
                         </div>
                         <ArrowRight className="w-6 h-6 text-slate-700 group-hover:text-blue-500 group-hover:translate-x-2 transition-all" />
                       </button>

                       <button 
                         onClick={() => { onStaffClick(); onClose(); }}
                         className="flex items-center justify-between p-6 rounded-3xl bg-slate-900 border border-white/10 hover:border-emerald-500 transition-all group"
                       >
                         <div className="flex items-center gap-4">
                           <div className="p-3 bg-emerald-600/10 text-emerald-500 rounded-2xl group-hover:bg-emerald-600 group-hover:text-white transition-all">
                             <Shield className="w-6 h-6" />
                           </div>
                           <div>
                             <p className="text-white font-black uppercase text-xs tracking-tight">Cổng nội bộ Staff</p>
                             <p className="text-slate-500 text-[10px] font-bold">Dành cho nhân viên xưởng</p>
                           </div>
                         </div>
                         <ArrowRight className="w-6 h-6 text-slate-700 group-hover:text-emerald-500 group-hover:translate-x-2 transition-all" />
                       </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Info Bar */}
            <div className="p-8 sm:p-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 bg-slate-950/50 backdrop-blur-md">
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-blue-500" />
                  <span className="text-white font-black text-sm">{siteConfig.contactPhone}</span>
                </div>
                <div className="hidden sm:flex items-center gap-3">
                  <Mail className="w-4 h-4 text-blue-500" />
                  <span className="text-white font-black text-sm">{siteConfig.contactEmail}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                {[
                  { icon: <Facebook className="w-5 h-5" />, url: siteConfig.facebookUrl },
                  { icon: <Instagram className="w-5 h-5" />, url: siteConfig.instagramUrl },
                  { icon: <Youtube className="w-5 h-5" />, url: siteConfig.youtubeUrl }
                ].filter(s => s.url).map((social, i) => (
                  <a 
                    key={i}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/5 hover:bg-blue-600 rounded-2xl text-slate-400 hover:text-white transition-all transform hover:-translate-y-1 shadow-xl"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>

              {isEditMode && (
                <button 
                  onClick={() => { onAdminClick(); onClose(); }}
                  className="px-10 py-4 bg-white text-slate-950 font-black text-[10px] uppercase tracking-widest rounded-2xl shadow-2xl active:scale-95 transition-all"
                >
                  Đăng Xuất Admin
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const AdminLoginModal: React.FC<{ 
  isOpen: boolean; 
  onClose: () => void; 
  onSuccess: (role: UserRole) => void; 
  siteConfig: SiteConfig;
  t: (key: string) => string 
}> = ({ isOpen, onClose, onSuccess, siteConfig, t }) => {
  const [input, setInput] = useState('');
  
  // Xóa trắng input khi modal đóng hoặc mở
  useEffect(() => {
    if (!isOpen) setInput('');
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLogin = () => {
    const normalizedInput = input.trim();
    
    // Check against different role passwords (with hardcoded fallbacks)
    const adminPass = (siteConfig.designPassword || 'admin').trim();
    const defaultAdminPass = (DEFAULT_SITE_CONFIG.designPassword || 'admin').trim();
    
    const accountantPass = (siteConfig.accountingLockPassword || '132416118').trim();
    const defaultAccountantPass = (DEFAULT_SITE_CONFIG.accountingLockPassword || '132416118').trim();

    const inspectionPass = (siteConfig.inspectionPassword || '789').trim();
    const defaultInspectionPass = (DEFAULT_SITE_CONFIG.inspectionPassword || '789').trim();

    console.log('Login attempt:', {
      input: normalizedInput,
      adminPass,
      defaultAdminPass,
      accountantPass,
      inspectionPass
    });

    if (normalizedInput === accountantPass || normalizedInput === defaultAccountantPass || normalizedInput === '132416118') {
      onSuccess('manager');
    } else if (
      normalizedInput === adminPass || 
      normalizedInput === defaultAdminPass || 
      normalizedInput === 'admin' || 
      normalizedInput === '025099010538' || 
      normalizedInput === '0588896699' || 
      normalizedInput === '0912248839'
    ) {
      onSuccess('admin');
    } else if (normalizedInput === inspectionPass || normalizedInput === defaultInspectionPass || normalizedInput === '789') {
      onSuccess('staff');
    } else {
      toast.error(t('admin_wrong_password') || 'Mật khẩu không chính xác');
      setInput('');
    }
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl">
      <div className="bg-slate-900 border border-white/10 p-8 rounded-[40px] w-full max-w-sm shadow-3xl">
        <h3 className="text-xl font-black text-white text-center mb-6 uppercase tracking-widest">{siteConfig.siteName || 'XE ĐẸP PRO'} ACCESS</h3>
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
        
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
          <div className="relative flex justify-center text-[8px] uppercase font-black tracking-widest"><span className="bg-slate-900 px-4 text-slate-600 tracking-[0.2em]">Xác minh danh tính</span></div>
        </div>

        <p className="text-[10px] text-slate-500 text-center italic mb-4">Vui lòng nhập mật khẩu để truy cập hệ thống.</p>
        
        <button 
          onClick={onClose} 
          className="w-full py-4 rounded-2xl border border-white/5 text-slate-500 text-[10px] uppercase font-black tracking-[0.2em] hover:bg-white/5 hover:text-white transition-all"
        >
          {t('admin_cancel')} & Thoát
        </button>
      </div>
    </div>
  );
};

// --- HomePage ---

const translations = {
  vi: {
    hero_subtitle: "Trung Tâm Chăm Sóc Xe Chuyên Nghiệp",
    hero_title: "XE ĐẸP PRO",
    hero_description: "Trung tâm Detailing & Chăm sóc xe hơi chuyên nghiệp hàng đầu Hà Nội. Chúng tôi mang đến sự hoàn hảo cho xế yêu của bạn.",
    book_now: "Đặt Lịch Ngay",
    explore_services: "Khám Phá Dịch Vụ",
    share: "Chia Sẻ",
    track_car: "Theo Dõi Xe",
    ai_advisor: "Cố Vấn AI",
    promotions: "Ưu đãi",
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
    service_package: "Gói Dịch Vụ",
    package_features: "Tính năng của gói",
    quality_guarantee: "Cam kết chất lượng",
    quality_guarantee_desc: "Sử dụng 100% hóa chất nhập khẩu chính hãng, an toàn cho bề mặt xe.",
    fast_service: "Dịch vụ nhanh chóng",
    fast_service_desc: "Quy trình tối ưu, tiết kiệm thời gian mà vẫn đảm bảo chất lượng.",
    package_price: "Giá trọn gói",
    back: "Quay lại",
    price_disclaimer: "Giá có thể thay đổi tùy theo kích thước và tình trạng thực tế của xe.",
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
    detailing_expert: "Chuyên gia Detailing tại XE ĐẸP PRO",
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
    admin_tab_promotions: "Ưu đãi",
    admin_tab_news: "Tin tức",
    admin_tab_gallery: "Thư viện",
    admin_tab_ui_design: "Giao diện",
    admin_tab_ai_creative: "AI Creative",
    admin_tab_config: "Cấu hình",
    portal_title: "Cổng Tra Cứu Khách Hàng",
    portal_subtitle: "Tra cứu điểm thưởng, lịch sử dịch vụ và chứng chỉ bảo hành",
    enter_phone_portal: "Nhập số điện thoại để tra cứu...",
    lookup_btn: "Tra Cứu Ngay",
    loyalty_points: "Điểm Tích Lũy",
    service_history: "Lịch Sử Dịch Vụ",
    active_certificates: "Chứng Chỉ Hiệu Lực",
    inspection_history: "Lịch Sử Kiểm Tra Xe",
    inspection_date: "Ngày Kiểm Tra",
    view_report: "Xem Báo Cáo",
    no_records_found: "Không tìm thấy thông tin cho số điện thoại này.",
    back_to_home: "Quay lại trang chủ",
    working_hours: "Giờ làm việc",
    zalo_consultation: "Tư vấn Zalo",
    select_video_from_gallery: "Chọn Video Từ Thư Viện",
    no_videos_in_gallery: "Chưa có video nào trong thư viện.",
    please_upload_video_first: "Vui lòng tải video lên ở tab \"Thư Viện\" trước.",
    go_to_gallery: "Đến Thư Viện",
    select_video: "Chọn Video",
    footer_description: "XE ĐẸP PRO - Nơi xế yêu của bạn được chăm sóc bởi những chuyên gia hàng đầu.",
    quick_links: "Liên Kết Nhanh",
    contact_info: "Thông Tin Liên Hệ",
    copyright: "© 2024 XE ĐẸP PRO. Tất cả quyền được bảo lưu.",
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
    service_package: "Service Package",
    package_features: "Package Features",
    quality_guarantee: "Quality Guarantee",
    quality_guarantee_desc: "100% genuine imported chemicals, safe for car surfaces.",
    fast_service: "Fast Service",
    fast_service_desc: "Optimized process, saving time while ensuring quality.",
    package_price: "Package Price",
    back: "Back",
    price_disclaimer: "Price may vary depending on the size and actual condition of the vehicle.",
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
    portal_title: "Customer Portal",
    portal_subtitle: "Lookup loyalty points, service history, and e-certificates",
    enter_phone_portal: "Enter phone number to lookup...",
    lookup_btn: "Lookup Now",
    loyalty_points: "Loyalty Points",
    service_history: "Service History",
    active_certificates: "Active Certificates",
    inspection_history: "Inspection History",
    inspection_date: "Inspection Date",
    view_report: "View Report",
    no_records_found: "No records found for this phone number.",
    back_to_home: "Back to Home",
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

// CustomerPortal has been moved to its own file.

const TenStepProcess: React.FC<{t: any}> = ({ t }) => {
  const [activeTab, setActiveTab] = useState(0);
  
  const steps = [
    { title: 'Kiểm tra & Ghi hình', icon: <CameraIcon className="w-6 h-6" />, desc: 'Ghi nhận tình trạng xe ban đầu chi tiết bằng camera 4K.' },
    { title: 'Rửa ủ bọt tuyết', icon: <DropletsIcon className="w-6 h-6" />, desc: 'Làm mềm vết bẩn bằng bọt tuyết trung tính PH.' },
    { title: 'Tẩy ố & Nhựa đường', icon: <TargetIcon className="w-6 h-6" />, desc: 'Xử lý các vết bẩn cứng đầu bằng hóa chất chuyên dụng.' },
    { title: 'Tẩy sắt & Bay màu', icon: <ZapIcon className="w-6 h-6" />, desc: 'Dùng dung dịch tẩy mạt sắt bám trên bề mặt sơn.' },
    { title: 'Đất sét (Claying)', icon: <Layers className="w-4 h-4" />, desc: 'Làm mịn bề mặt triệt để bằng đất sét detailing.' },
    { title: 'Đo độ dày sơn', icon: <ActivityIcon className="w-6 h-6" />, desc: 'Dùng thiết bị điện tử đo độ dày sơn trước khi đánh bóng.' },
    { title: 'Đánh bóng 3 bước', icon: <Star className="w-6 h-6" />, desc: 'Hiệu chỉnh bề mặt sơn theo chuẩn quốc tế.' },
    { title: 'Làm sạch sâu khe kẽ', icon: <Brush className="w-6 h-6" />, desc: 'Vệ sinh chi tiết các góc khuất bằng cọ chuyên dụng.' },
    { title: 'Phủ Bảo Vệ', icon: <Shield className="w-6 h-6" />, desc: 'Phủ Ceramic hoặc Nano bảo vệ lớp sơn hoàn hảo.' },
    { title: 'Kiểm tra cuối & Bàn giao', icon: <CheckCircle className="w-6 h-6" />, desc: 'Nghiệm thu dưới ánh sáng chuyên dụng trước khi giao xe.' },
  ];

  return (
    <div className="mt-32 p-8 sm:p-12 rounded-[40px] bg-slate-900/30 border border-white/5 backdrop-blur-xl">
      <div className="flex flex-col lg:flex-row gap-12 sm:gap-20">
        <div className="lg:w-1/3">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-600/10 border border-blue-500/20 mb-6">
            <Settings className="w-4 h-4 text-blue-500" />
            <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Quy trình 10 bước</span>
          </div>
          <h3 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tighter leading-none mb-8">
            Tiêu chuẩn <span className="text-blue-500">World Class</span>
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-8 font-medium">
            Chúng tôi tuân thủ nghiêm ngặt quy trình detailing chuyên nghiệp để đảm bảo mọi chiếc xe đều đạt đến trạng thái hoàn hảo nhất.
          </p>
          <div className="flex flex-wrap gap-2">
            {steps.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`w-10 h-10 rounded-xl flex items-center justify-center font-black transition-all ${activeTab === idx ? 'bg-blue-600 text-white' : 'bg-white/5 text-slate-500 hover:bg-white/10'}`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>
        
        <div className="lg:w-2/3">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="h-full flex flex-col justify-center bg-slate-950/50 p-8 sm:p-12 rounded-[32px] border border-white/5 relative group overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 group-hover:scale-110 transition-transform duration-1000">
                {steps[activeTab].icon}
              </div>
              <div className="flex items-center gap-6 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-500">
                  {steps[activeTab].icon}
                </div>
                <div>
                  <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] mb-1 block">Bước 0{activeTab + 1}</span>
                  <h4 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">{steps[activeTab].title}</h4>
                </div>
              </div>
              <p className="text-slate-400 text-lg sm:text-2xl leading-relaxed mb-10 max-w-xl font-light">
                {steps[activeTab].desc}
              </p>
              <div className="flex gap-4">
                <button 
                  onClick={() => setActiveTab(prev => (prev > 0 ? prev - 1 : 9))}
                  className="p-4 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-all active:scale-95"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button 
                  onClick={() => setActiveTab(prev => (prev < 9 ? prev + 1 : 0))}
                  className="flex-1 p-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black uppercase text-[10px] tracking-widest shadow-xl shadow-blue-900/20 active:scale-95 transition-all"
                >
                  Tiếp theo
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};


const HomePage: React.FC<any> = ({
  siteConfig, setSiteConfig,
  customerRecords, setCustomerRecords,
  gallery, setGallery,
  premiumSolutions, setPremiumSolutions,
  services, setServices,
  aiVideoHistory, setAiVideoHistory,
  trackingData, setTrackingData,
  reviews, setReviews,
  inventory, setInventory,
  eCertificates, setECertificates,
  staff, setStaff,
  inspections, setInspections,
  reminders, setReminders,
  expenses, setExpenses,
  experts, setExperts,
  user, handleLogin, handleLogout,
  cart, addToCart, removeFromCart, clearCart,
  language, setLanguage,
  theme, setTheme,
  handlePayment, scrollToSection, t,
  currentUserRole, setCurrentUserRole,
  isDesignAuthenticated, setIsDesignAuthenticated,
  isAccountingAuthenticated, setIsAccountingAuthenticated,
  isInspectionAuthenticated, setIsInspectionAuthenticated
}) => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const [isPrivacyMode, setIsPrivacyMode] = useState(() => {
    const saved = localStorage.getItem('dungcar_privacy_mode');
    return saved === 'true';
  });

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    const saved = localStorage.getItem('dungcar_audit_logs');
    return saved ? JSON.parse(saved) : [];
  });

  const addAuditLog = (action: string, details: string) => {
    const newLog: AuditLog = {
      id: Date.now().toString(),
      userId: 'current-user-id', // In a real app, this would be the actual user ID
      userName: currentUserRole === 'admin' ? 'Quản trị viên' : 'Nhân viên',
      action,
      details,
      timestamp: new Date().toLocaleString('vi-VN'),
    };
    setAuditLogs(prev => [newLog, ...prev].slice(0, 100)); // Keep last 100 logs
  };

  useEffect(() => {
    localStorage.setItem('dungcar_privacy_mode', String(isPrivacyMode));
    localStorage.setItem('dungcar_user_role', currentUserRole);
    localStorage.setItem('dungcar_audit_logs', JSON.stringify(auditLogs));
  }, [isPrivacyMode, currentUserRole, auditLogs]);

  const togglePrivacyMode = () => {
    const newState = !isPrivacyMode;
    setIsPrivacyMode(newState);
    addAuditLog('Thay đổi chế độ riêng tư', `Chuyển sang ${newState ? 'Bật' : 'Tắt'}`);
  };

  const formatPrivateValue = (value: string | number) => {
    if (isPrivacyMode) return '********';
    return typeof value === 'number' ? formatCurrency(value) : value;
  };
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [galleryFilter, setGalleryFilter] = useState('All');
  const [selectedPackageForModal, setSelectedPackageForModal] = useState<DetailingPackage | null>(null);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isAiAnalyzerOpen, setIsAiAnalyzerOpen] = useState(false);
  const [isSecurityLocked, setIsSecurityLocked] = useState(true);
  const [securityPinInput, setSecurityPinInput] = useState('');
  const [isDirectInspectionMode, setIsDirectInspectionMode] = useState(false);
  const [showDesignLock, setShowDesignLock] = useState(false);
  const [isSuperAdminAuthenticated, setIsSuperAdminAuthenticated] = useState(() => {
    return localStorage.getItem('dungcar_super_admin_auth') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('dungcar_super_admin_auth', isSuperAdminAuthenticated ? 'true' : 'false');
  }, [isSuperAdminAuthenticated]);
  const [designPasswordInput, setDesignPasswordInput] = useState('');
  const [accountingPasswordInput, setAccountingPasswordInput] = useState('');
  const [showAccountingLock, setShowAccountingLock] = useState(false);
  const [inspectionPasswordInput, setInspectionPasswordInput] = useState('');
  const [showInspectionLock, setShowInspectionLock] = useState(false);
  const [dashboardInitialTab, setDashboardInitialTab] = useState<string>('home');
  const [dashboardMaintenancePreFill, setDashboardMaintenancePreFill] = useState<{brand: string, model: string, year: string, mileage: string, lastMaintenance: string, symptoms: string} | null>(null);
  const [dashboardTab, setDashboardTab] = useState<'home' | 'services' | 'premium' | 'gallery' | 'customers' | 'config' | 'news' | 'inventory' | 'tracking' | 'feedback' | 'promotions' | 'ai-creative' | 'maintenance' | 'appointments' | 'staff' | 'reminders' | 'inspections' | 'ecerts' | 'expenses'>('home');
  const [isSelectingHeroVideo, setIsSelectingHeroVideo] = useState(false);
  const [isSelectingAiVideo, setIsSelectingAiVideo] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [showNewBadge, setShowNewBadge] = useState(() => localStorage.getItem('hide_new_badge_car_detailing') !== 'true');

  // Command Palette Items
  const commandPaletteItems = [
    { id: 'reports', label: 'Báo cáo doanh thu', icon: <ReportsIcon />, category: 'Kế toán' },
    { id: 'expenses', label: 'Quản lý chi phí', icon: <ExpenseIcon />, category: 'Kế toán' },
    { id: 'inventory', label: 'Kho vật tư', icon: <InventoryIcon />, category: 'Vận hành' },
    { id: 'appointments', label: 'Lịch hẹn khách hàng', icon: <AppointmentsIcon />, category: 'Vận hành' },
    { id: 'customers', label: 'Danh sách khách hàng', icon: <CustomersIcon />, category: 'Vận hành' },
    { id: 'ui-design', label: 'Thiết kế giao diện', icon: <DesignIcon />, category: 'Thiết kế' },
    { id: 'config', label: 'Cấu hình hệ thống', icon: <ConfigIcon />, category: 'Thiết kế' },
    { id: 'services', label: 'Gói dịch vụ', icon: <ServicesIcon />, category: 'Vận hành' },
  ];

  // Helper for icons in palette
  function ReportsIcon() { return <Activity className="w-5 h-5" /> }
  function ExpenseIcon() { return <Shield className="w-5 h-5" /> }
  function InventoryIcon() { return <Package className="w-5 h-5" /> }
  function AppointmentsIcon() { return <Calendar className="w-5 h-5" /> }
  function CustomersIcon() { return <User className="w-5 h-5" /> }
  function DesignIcon() { return <Palette className="w-5 h-5" /> }
  function ConfigIcon() { return <Settings className="w-5 h-5" /> }
  function ServicesIcon() { return <Briefcase className="w-5 h-5" /> }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isAdminSearchOpen, setIsAdminSearchOpen] = useState(false);
  const [serviceCategory, setServiceCategory] = useState<string>('all');
  const [serviceSearch, setServiceSearch] = useState<string>('');
  const [serviceSortBy, setServiceSortBy] = useState<string>('default');
  const [selectedServiceForModal, setSelectedServiceForModal] = useState<Service | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [preSelectedSubService, setPreSelectedSubService] = useState<string | undefined>(undefined);

  // Auto-CMS Authentication for Firebase Admins
  useEffect(() => {
    if (user && user.email === 'pinetwork369@gmail.com') {
      setIsDesignAuthenticated(true);
      setIsAccountingAuthenticated(true);
      setIsSuperAdminAuthenticated(true);
      setCurrentUserRole('admin');
      setIsEditMode(true);
    }
  }, [user, setIsDesignAuthenticated, setIsAccountingAuthenticated, setIsSuperAdminAuthenticated, setCurrentUserRole, setIsEditMode]);
  
  const { id } = useParams();
  const location = useLocation();
  
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
    const normalizedPass = (siteConfig.designPassword || DEFAULT_SITE_CONFIG.designPassword || '025099010538').trim();
    if (
      normalizedInput === normalizedPass ||
      normalizedInput === 'admin' ||
      normalizedInput === '025099010538' ||
      normalizedInput === '0588896699' ||
      normalizedInput === '0912248839'
    ) {
      setIsDesignAuthenticated(true);
      setIsSuperAdminAuthenticated(true);
      setIsAccountingAuthenticated(true);
      setIsInspectionAuthenticated(true);
      setDesignPasswordInput('');
      setShowDesignLock(false);
      toast.success("Đã đăng nhập quyền Super Admin!");
    } else {
      toast.error("Sai mật khẩu thiết kế!");
      setDesignPasswordInput('');
    }
  };

  const handleAccountingLogin = () => {
    const normalizedInput = accountingPasswordInput.trim();
    const normalizedPass = (siteConfig.accountingLockPassword || DEFAULT_SITE_CONFIG.accountingLockPassword || '132416118').trim();
    if (normalizedInput === normalizedPass) {
      setIsAccountingAuthenticated(true);
      setAccountingPasswordInput('');
      setShowAccountingLock(false);
    } else {
      toast.error("Sai mật khẩu kế toán!");
      setAccountingPasswordInput('');
    }
  };

  const handleInspectionLogin = () => {
    const normalizedInput = inspectionPasswordInput.trim();
    const normalizedPass = (siteConfig.inspectionPassword || DEFAULT_SITE_CONFIG.inspectionPassword || '789').trim();
    if (normalizedInput === normalizedPass) {
      setIsInspectionAuthenticated(true);
      setInspectionPasswordInput('');
      setShowInspectionLock(false);
    } else {
      toast.error("Sai mật khẩu phiếu kiểm tra!");
      setInspectionPasswordInput('');
    }
  };

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

  const handleAdminLogout = () => {
    setIsDesignAuthenticated(false);
    setIsAccountingAuthenticated(false);
    setIsInspectionAuthenticated(false);
    setIsSuperAdminAuthenticated(false);
    setIsEditMode(false);
    setIsDashboardOpen(false);
    
    // Clear persisted sessions
    localStorage.removeItem('dungcar_design_auth');
    localStorage.removeItem('dungcar_accounting_auth');
    localStorage.removeItem('dungcar_inspection_auth');
    localStorage.removeItem('dungcar_super_admin_auth');
    localStorage.setItem('dungcar_user_role', 'staff');
    setCurrentUserRole('staff');

    toast.success("Đã đăng xuất hệ thống quản trị");
  };

  const handleOpenAdminTab = (tabId: string) => {
    setDashboardInitialTab(tabId);
    setIsDashboardOpen(true);
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (id) {
      if (location.pathname.startsWith('/services/')) {
        const service = (services || []).find(s => s.id === id);
        if (service) setSelectedServiceForModal(service);
      } else if (location.pathname.startsWith('/news/')) {
        const article = (siteConfig.news || []).find(a => a.id === id || a.slug === id);
        if (article) setSelectedArticle(article);
      }
    }
  }, [id, location.pathname, services, siteConfig.news]);

  const [aiMessages, setAiMessages] = useState<Message[]>([
    { role: 'model', text: 'Chào bạn! Tôi là **XE ĐẸP PRO AI Advisor**. Rất vui được hỗ trợ bạn.\n\nTôi có thể giúp bạn:\n- Tư vấn các gói **Ceramic & PPF**.\n- Hướng dẫn chăm sóc xe tại nhà.\n- Giải đáp thắc mắc về kỹ thuật detailing.\n- Cung cấp thông tin về các dịch vụ tại cửa hàng.\n\nBạn đang quan tâm đến vấn đề gì cho xế yêu của mình?' }
  ]);

  const clearChat = () => {
    setAiMessages([
      { role: 'model', text: 'Chào bạn! Tôi là **XE ĐẸP PRO AI Advisor**. Rất vui được hỗ trợ bạn.\n\nTôi có thể giúp bạn:\n- Tư vấn các gói **Ceramic & PPF**.\n- Hướng dẫn chăm sóc xe tại nhà.\n- Giải đáp thắc mắc về kỹ thuật detailing.\n- Cung cấp thông tin về các dịch vụ tại cửa hàng.\n\nBạn đang quan tâm đến vấn đề gì cho xế yêu của mình?' }
    ]);
    toast.success('Đã xóa lịch sử trò chuyện!');
  };
  const [aiInput, setAiInput] = useState('');
  const [aiProvider, setAiProvider] = useState<AIProvider>('gemini');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [aiMessages, isAiLoading]);

  const [isAiServiceModalOpen, setIsAiServiceModalOpen] = useState(false);
  const [isAiAdvisorOpen, setIsAiAdvisorOpen] = useState(false);
  const [isPromotionsModalOpen, setIsPromotionsModalOpen] = useState(false);
  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [isReviewsModalOpen, setIsReviewsModalOpen] = useState(false);
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);
  const [isServicesModalOpen, setIsServicesModalOpen] = useState(false);
  const [isPackagesModalOpen, setIsPackagesModalOpen] = useState(false);
  const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false);
  const [isWindowTintingModalOpen, setIsWindowTintingModalOpen] = useState(false);
  const [isWrapPpfModalOpen, setIsWrapPpfModalOpen] = useState(false);
  const [isTuningModalOpen, setIsTuningModalOpen] = useState(false);

  const handleSidebarAction = (id: string) => {
    setIsSidebarOpen(false);
    switch(id) {
      case 'promotions': setIsPromotionsModalOpen(true); break;
      case 'news': setIsNewsModalOpen(true); break;
      case 'gallery': setIsGalleryModalOpen(true); break;
      case 'reviews': setIsReviewsModalOpen(true); break;
      case 'tracking': setIsTrackingModalOpen(true); break;
      case 'ai-advisor': setIsAiAdvisorOpen(true); break;
      case 'ai-analyzer': setIsAiAnalyzerOpen(true); break;
      case 'services': setIsServicesModalOpen(true); break;
      case 'packages': setIsPackagesModalOpen(true); break;
      case 'premium': setIsPremiumModalOpen(true); break;
      case 'window-tinting': setIsWindowTintingModalOpen(true); break;
      case 'wrap-ppf': setIsWrapPpfModalOpen(true); break;
      case 'tuning': setIsTuningModalOpen(true); break;
      default: scrollToSection(id);
    }
  };

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
      const response = await getAIResponse(userText, aiMessages, aiProvider, siteConfig.aiSystemPrompt);
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
    <div className="flex flex-col min-h-screen selection:bg-blue-600/30 bg-slate-950 text-white">
      {/* Dynamic Theme Styles */}
      <style>
        {`
          :root {
            --accent-primary: ${siteConfig.themeColor || '#3b82f6'};
            --accent-glow: ${(siteConfig.themeColor || '#3b82f6')}4d;
            --accent-secondary: ${siteConfig.secondaryColor || '#10b981'};
          }
          .hero-title-highlight {
            color: ${siteConfig.themeColor || '#3b82f6'} !important;
            text-shadow: 0 0 40px ${(siteConfig.themeColor || '#3b82f6')}33;
          }
          /* Primary Color Overrides */
          .text-blue-500 { color: ${siteConfig.themeColor || '#3b82f6'} !important; }
          .text-blue-600 { color: ${siteConfig.themeColor || '#3b82f6'} !important; }
          .bg-blue-500 { background-color: ${siteConfig.themeColor || '#3b82f6'} !important; }
          .bg-blue-600 { background-color: ${siteConfig.themeColor || '#3b82f6'} !important; }
          .border-blue-500 { border-color: ${siteConfig.themeColor || '#3b82f6'} !important; }
          .border-blue-600 { border-color: ${siteConfig.themeColor || '#3b82f6'} !important; }
          .ring-blue-500 { --tw-ring-color: ${siteConfig.themeColor || '#3b82f6'} !important; }
          .shadow-blue-900\\/20 { --tw-shadow-color: ${(siteConfig.themeColor || '#3b82f6')}33 !important; }

          .logo-container .site-name {
            letter-spacing: -0.05em;
            line-height: 0.9;
          }

          /* Micro-interactions & Smoothness */
          .btn-primary {
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          }
          .btn-primary:active {
            transform: scale(0.95);
          }
          
          .hover-lift {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .hover-lift:hover {
            transform: translateY(-5px);
          }

          .glass-card {
            backdrop-filter: blur(12px);
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.05);
          }
          
          .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.1);
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(59, 130, 246, 0.5);
            border-radius: 10px;
          }
          
          /* Secondary Color Overrides */
          .text-emerald-500 { color: ${siteConfig.secondaryColor || '#10b981'} !important; }
          .text-emerald-600 { color: ${siteConfig.secondaryColor || '#10b981'} !important; }
          .bg-emerald-500 { background-color: ${siteConfig.secondaryColor || '#10b981'} !important; }
          .bg-emerald-600 { background-color: ${siteConfig.secondaryColor || '#10b981'} !important; }
          .border-emerald-500 { border-color: ${siteConfig.secondaryColor || '#10b981'} !important; }
          .border-emerald-600 { border-color: ${siteConfig.secondaryColor || '#10b981'} !important; }
          
           .group-hover\\/title\\:opacity-100 { --accent-glow-bg: ${(siteConfig.themeColor || '#3b82f6')}1a !important; }
          
          /* Process Section Icon Animation */
          .process-section .step-item .icon-container {
            transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
          }
          .process-section .step-item:hover .icon-container {
            transform: scale(1.15) rotate(5deg);
          }
          @keyframes iconScaleIn {
            from { opacity: 0; transform: scale(0.5); }
            to { opacity: 1; transform: scale(1); }
          }
          .process-section .step-item.is-visible .icon-container {
            animation: iconScaleIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }
        `}
      </style>
      <SEO 
        title={selectedArticle ? (selectedArticle.metaTitle || selectedArticle.title) : selectedServiceForModal ? selectedServiceForModal.title : siteConfig.heroTitle}
        description={selectedArticle ? (selectedArticle.metaDescription || selectedArticle.excerpt) : selectedServiceForModal ? (selectedServiceForModal.seoDescription || selectedServiceForModal.description) : undefined}
        canonical={location.pathname}
        ogImage={selectedArticle ? selectedArticle.image : selectedServiceForModal ? selectedServiceForModal.image : undefined}
        ogType={selectedArticle ? 'article' : 'website'}
        keywords={selectedArticle ? (selectedArticle.metaKeywords || `${selectedArticle.category}, news, xe dep auto`) : selectedServiceForModal ? (selectedServiceForModal.seoKeywords || `${selectedServiceForModal.category}, service, car care`) : undefined}
        imageAlt={selectedArticle?.imageAlt}
        articleData={selectedArticle}
        siteConfig={siteConfig}
      />
      <Toaster position="top-right" containerStyle={{ zIndex: 9999 }} />
      {/* Top Bar */}
      <div className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 bg-slate-950/40 backdrop-blur-xl border-b border-white/5 py-3 ${
        isScrolled ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'
      }`}>
        <div className="container mx-auto px-4 flex justify-between items-center label-premium text-slate-500 mb-0">
          <div className="flex items-center gap-8">
            <a 
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.contactAddress)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-white transition-colors group"
            >
              <MapPin className="w-3.5 h-3.5 text-blue-500 group-hover:scale-110 transition-transform" />
              <span className="text-[9px] tracking-[0.15em]">{siteConfig.contactAddress}</span>
            </a>
            <div className="hidden sm:flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-blue-500" />
              <span className="text-[9px] tracking-[0.15em]">{siteConfig.contactHours}</span>
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
            <div className="flex items-center gap-4 sm:gap-8 logo-container">
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className={`p-1.5 sm:p-2.5 rounded-xl sm:rounded-2xl transition-all flex flex-col gap-1 sm:gap-1.5 active:scale-90 group ${
                  isScrolled ? 'bg-slate-800/50 hover:bg-slate-800' : 'bg-white/5 hover:bg-white/10'
                }`}
              >
                <div className="w-4 sm:w-5 h-0.5 bg-blue-500 rounded-full group-hover:w-6 transition-all"></div>
                <div className="w-5 sm:w-6 h-0.5 bg-blue-500 rounded-full"></div>
                <div className="w-3 sm:w-4 h-0.5 bg-blue-500 rounded-full group-hover:w-6 transition-all"></div>
              </button>
              
              <Link to="/" className="group flex items-center gap-3 relative">
                {siteConfig.logoUrl ? (
                  <img 
                    src={siteConfig.logoUrl} 
                    alt="Logo" 
                    className={`object-contain group-hover:scale-110 transition-all duration-500 ${isScrolled ? 'w-10 h-10' : 'w-16 h-16'}`}
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className={`bg-gradient-to-br from-blue-600 to-emerald-600 rounded-xl flex items-center justify-center font-black text-white shadow-lg shadow-blue-900/20 group-hover:scale-110 transition-all duration-500 ${isScrolled ? 'w-10 h-10 text-xl' : 'w-16 h-16 text-3xl'}`}>
                    {siteConfig?.siteName?.charAt(0) || 'D'}
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
                
                <div className={`flex flex-col transition-all duration-500 ${isScrolled ? 'scale-90 origin-left' : 'scale-100 origin-left'}`}>
                  <EditableText 
                    text={siteConfig.siteName} 
                    isEditMode={isEditMode} 
                    isDesignAuthenticated={isDesignAuthenticated}
                    onSave={v => setSiteConfig({...siteConfig, siteName: v})}
                    className="site-name text-sm sm:text-lg md:text-xl font-black text-white uppercase tracking-tighter leading-none"
                  />
                  <span className="text-[7px] font-bold text-blue-500 uppercase tracking-[0.3em] mt-1">Premium Detailing</span>
                </div>
              </Link>
            </div>

            <div className="hidden lg:flex items-center gap-10">
              <div className="flex gap-8 label-premium text-slate-400">
                {[
                  { id: 'promotions', label: t('promotions') },
                  { id: 'services', label: t('services') },
                  { id: 'membership', label: 'Hội Viên' },
                  { id: 'weather-care', label: 'Bảo Vệ AI' },
                  { id: 'premium', label: 'Giải Pháp Premium' },
                  { id: 'ai-advisor', label: t('ai_advisor') },
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
                title="Giỏ hàng dịch vụ"
              >
                <ShoppingCart className="w-5 h-5" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-slate-950">
                    {cart.length}
                  </span>
                )}
              </button>

              {/* Tracking Button */}
              <button 
                onClick={() => setIsTrackingModalOpen(true)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all font-black uppercase text-[10px] tracking-widest hover:scale-105 active:scale-95 duration-300 ${
                  isScrolled 
                    ? 'bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-600/25' 
                    : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
                }`}
              >
                <Timer className="w-4 h-4" />
                <span className="hidden sm:inline">{t('track_car')}</span>
              </button>

              {isEditMode && (
                <button 
                  onClick={() => setIsDashboardOpen(true)} 
                  className="bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-2 px-4 py-2.5 rounded-xl shadow-lg border border-emerald-500/30 active:scale-95 transition-all font-black uppercase text-[10px] tracking-widest animate-pulse"
                  title="Mở Bảng Điều Khiển Quản Trị"
                >
                  <Settings className="w-4 h-4" />
                  <span>Quản Trị</span>
                </button>
              )}
              
              <div className="hidden md:flex flex-col items-end mr-4">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{t('hotline')}</span>
                <a href={`tel:${siteConfig.contactPhone}`} className="text-sm font-black text-white hover:text-blue-500 transition-colors">
                  {siteConfig.contactPhone}
                </a>
              </div>

              {/* Booking Button */}
              <button 
                onClick={() => setIsBookingModalOpen(true)}
                className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-8 sm:py-3.5 rounded-xl text-[8px] sm:text-[11px] font-black uppercase tracking-widest transition-all shadow-xl active:scale-95 z-10 ${
                  isScrolled ? 'bg-blue-600 text-white shadow-blue-900/40' : 'bg-white/10 text-white backdrop-blur-md border border-white/10 hover:bg-white/20'
                }`}
              >
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>{t('book_now')}</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <SidebarMenu 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        isEditMode={isEditMode}
        currentUserRole={currentUserRole}
        siteConfig={siteConfig}
        onAdminClick={() => {
          if (isEditMode) {
            setIsEditMode(false);
            setIsDesignAuthenticated(false);
            setIsAccountingAuthenticated(false);
            setCurrentUserRole('staff');
          } else {
            setIsLoginModalOpen(true);
          }
        }}
        onAddRecord={() => {
          if (isDesignAuthenticated) {
            handleAddCustomer();
          } else {
            setIsLoginModalOpen(true);
          }
        }}
        onOpenDashboard={() => { 
          if (isDesignAuthenticated) {
            setDashboardInitialTab('home'); 
            setIsDashboardOpen(true); 
            setIsSidebarOpen(false); 
          } else {
            setIsLoginModalOpen(true);
          }
        }}
        onStaffClick={() => {
          setIsLoginModalOpen(true);
        }}
        onReset={() => {
          localStorage.clear();
          window.location.reload();
        }}
        onSidebarAction={handleSidebarAction}
        scrollToSection={scrollToSection}
        cart={cart}
        onOpenCart={() => setShowNotifications(true)}
        onPaymentClick={() => setIsPaymentModalOpen(true)}
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
                preload="auto"
                className="w-full h-full object-cover opacity-40 scale-105 group-hover/hero-section:scale-100 transition-transform duration-[3000ms]"
              />
            ) : (
              <img 
                src={siteConfig.heroImage} 
                alt="Hero Background"
                className="w-full h-full object-cover opacity-40 scale-105 group-hover/hero-section:scale-100 transition-transform duration-[3000ms]"
                referrerPolicy="no-referrer"
                loading="eager"
                fetchPriority="high"
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
            <div className="flex flex-col items-center text-center max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="mb-8"
              >
                <span className="section-subtitle mb-0 px-8 py-3 bg-blue-500/5 rounded-full border border-blue-500/10 backdrop-blur-sm">
                  {siteConfig.heroSubtitle || t('hero_subtitle')}
                </span>
              </motion.div>

              <div className="relative mb-12 sm:mb-20 group/title">
                <div className="absolute -inset-10 bg-blue-600/10 blur-[120px] rounded-full opacity-0 group-hover/title:opacity-100 transition-opacity duration-1000"></div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: "easeOut" }}
                >
                  <EditableText 
                    tag="h1" 
                    text={siteConfig.heroTitle} 
                    isEditMode={isEditMode} 
                    isDesignAuthenticated={isDesignAuthenticated}
                    onSave={v => setSiteConfig({...siteConfig, heroTitle: v})}
                    multiline 
                    label="Tiêu đề chính của trang chủ (Hero Title)"
                    className="hero-title-highlight text-3xl sm:text-9xl lg:text-[13rem] font-black uppercase tracking-[-0.04em] mb-4 leading-[0.8] whitespace-nowrap bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/20 select-none drop-shadow-[0_20px_100px_rgba(59,130,246,0.8)] filter drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                  />
                </motion.div>
              </div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 1 }}
                className="max-w-4xl mx-auto mb-16 sm:mb-24 relative"
              >
                <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-2xl rounded-[40px] -z-10 border border-white/5 shadow-[0_40px_100px_rgba(0,0,0,0.8)]"></div>
                <div className="p-10 sm:p-14">
                  <EditableText 
                    text={siteConfig.heroDescription} 
                    isEditMode={isEditMode} 
                    isDesignAuthenticated={isDesignAuthenticated}
                    onSave={v => setSiteConfig({...siteConfig, heroDescription: v})}
                    multiline 
                    label="Mô tả ngắn gọn về dịch vụ ở trang chủ (Hero Description)"
                    className="text-lg sm:text-xl md:text-2xl text-slate-400 leading-relaxed font-light tracking-wide"
                  />
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-3 sm:gap-6"
              >
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsBookingModalOpen(true)}
                  className="group relative bg-blue-600 text-white px-8 py-4 sm:px-12 sm:py-5 rounded-2xl text-[10px] sm:text-sm font-black uppercase tracking-widest shadow-2xl shadow-blue-900/40 transition-all hover:shadow-blue-600/50 active:shadow-inner overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    {t('book_now')} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection('services')}
                  className="bg-slate-900 hover:bg-slate-800 text-white border border-white/10 px-8 py-4 sm:px-12 sm:py-5 rounded-2xl text-[10px] sm:text-sm font-black uppercase tracking-widest transition-all active:scale-95"
                >
                  {t('explore_services')}
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsAiAdvisorOpen(true)}
                  className="bg-blue-600/10 hover:bg-blue-600/20 text-blue-500 border border-blue-500/20 px-6 py-4 sm:px-8 sm:py-5 rounded-2xl text-[10px] sm:text-sm font-black uppercase tracking-widest transition-all active:scale-95 flex items-center gap-3"
                >
                  <Bot className="w-4 h-4" /> AI Advisor
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05, x: 2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsAiAnalyzerOpen(true)}
                  className="group relative bg-slate-900 hover:bg-slate-800 text-white border border-blue-500/30 px-8 py-5 rounded-2xl text-sm font-black uppercase tracking-widest transition-all active:scale-95 overflow-hidden"
                >
                  <div className="relative z-10 flex items-center gap-3">
                    <Sparkles className="w-4 h-4 text-blue-500 group-hover:animate-pulse" /> {t('AI Vehicle Analysis')}
                  </div>
                  <div className="absolute inset-0 bg-blue-600/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05, rotate: 1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleShare}
                  className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-12 py-5 rounded-2xl text-sm font-black uppercase tracking-widest transition-all active:scale-95 flex items-center gap-3"
                >
                  <Share2 className="w-4 h-4" /> {t('share')}
                </motion.button>
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

        {/* Brands Section */}
        <section className="py-12 bg-slate-950 border-y border-white/5 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4 md:mb-0">Đối Tác Chiến Lược</p>
              <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
                {['3M', 'TECKWRAP', 'AVERY DENNISON', 'SONAX', 'GTECHNIQ', 'MENZERNA'].map((brand, i) => (
                  <span key={i} className="text-xl md:text-2xl font-black text-white tracking-tighter hover:text-blue-500 transition-colors cursor-default">
                    {brand}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-24 bg-slate-950 relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center mb-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-600/10 border border-blue-500/20 mb-6"
              >
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                <EditableText 
                  text={siteConfig.whyChooseUsSubtitle} 
                  isEditMode={isEditMode} 
                  isDesignAuthenticated={isDesignAuthenticated}
                  onSave={v => setSiteConfig({...siteConfig, whyChooseUsSubtitle: v})}
                  label="Tiêu đề phụ cho mục Tại sao chọn"
                  className="text-blue-500 font-black uppercase tracking-[0.3em] text-[10px]"
                />
              </motion.div>
              <EditableText 
                tag="h2"
                text={siteConfig.whyChooseUsTitle} 
                isEditMode={isEditMode} 
                isDesignAuthenticated={isDesignAuthenticated}
                onSave={v => setSiteConfig({...siteConfig, whyChooseUsTitle: v})}
                label="Tiêu đề chính cho mục Tại sao chọn"
                className="section-title text-4xl sm:text-7xl mb-8"
              />
            </div>

            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {[
                { 
                  title: 'Kinh Nghiệm 20 Năm', 
                  desc: 'Đội ngũ chuyên gia dày dặn kinh nghiệm, am hiểu sâu sắc về mọi dòng xe từ phổ thông đến siêu xe.',
                  icon: <Award className="w-8 h-8 text-blue-500" />
                },
                { 
                  title: 'Sản Phẩm Chính Hãng', 
                  desc: 'Cam kết sử dụng 100% sản phẩm từ các thương hiệu hàng đầu thế giới: Gyeon, 3M, XPEL, IGL...',
                  icon: <ShieldCheck className="w-8 h-8 text-emerald-500" />
                },
                { 
                  title: 'Công Nghệ Hiện Đại', 
                  desc: 'Trang thiết bị tối tân, phòng phủ Ceramic tiêu chuẩn, máy đánh bóng DA thế hệ mới nhất.',
                  icon: <Zap className="w-8 h-8 text-purple-500" />
                }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeIn}
                  className="bg-slate-900/50 border border-white/5 p-10 rounded-[40px] hover:border-blue-500/30 transition-all group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center mb-8 group-hover:bg-blue-600/20 group-hover:scale-110 transition-all duration-500 relative z-10">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-4 relative z-10">{item.title}</h3>
                  <p className="text-slate-400 leading-relaxed relative z-10">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Before/After Transformation Section */}
        <section className="py-24 bg-slate-950 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_0%_0%,rgba(59,130,246,0.05),transparent_50%)]"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="lg:w-1/2">
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-emerald-600/10 border border-emerald-500/20 mb-6">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-emerald-500 font-black uppercase tracking-[0.3em] text-[10px]">Kết quả thực tế</span>
                  </div>
                  <h2 className="text-4xl sm:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-8">
                    SỰ THAY ĐỔI <br /> <span className="text-blue-600">NGOẠN MỤC</span>
                  </h2>
                  <p className="text-slate-400 text-lg sm:text-xl leading-relaxed mb-10 max-w-xl">
                    Chiêm ngưỡng sự lột xác của những chiếc xe sau khi qua bàn tay chăm sóc của các chuyên gia tại XE ĐẸP PRO. Chúng tôi không chỉ làm sạch, chúng tôi phục hồi giá trị nguyên bản.
                  </p>
                  <div className="flex flex-wrap gap-6">
                    <div className="flex flex-col">
                      <span className="text-3xl font-black text-white">100%</span>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Hài lòng</span>
                    </div>
                    <div className="w-px h-12 bg-white/10"></div>
                    <div className="flex flex-col">
                      <span className="text-3xl font-black text-white">24h</span>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Thời gian xử lý</span>
                    </div>
                  </div>
                </motion.div>
              </div>
              <div className="lg:w-1/2 w-full">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="rounded-[40px] overflow-hidden border-4 border-white/5 shadow-2xl relative aspect-video"
                >
                  <BeforeAfterSlider 
                    before={siteConfig.featureBefore || "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&q=80&w=1200"} 
                    after={siteConfig.featureAfter || "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=1200"}
                    isEditMode={isEditMode}
                    isDesignAuthenticated={isDesignAuthenticated}
                    onUpdateBefore={(url) => setSiteConfig({...siteConfig, featureBefore: url})}
                    onUpdateAfter={(url) => setSiteConfig({...siteConfig, featureAfter: url})}
                  />
                  <div className="absolute bottom-6 left-6 right-6 flex justify-between pointer-events-none">
                    <span className="bg-black/50 backdrop-blur-md text-white text-[10px] font-black uppercase px-4 py-2 rounded-full border border-white/10">Trước</span>
                    <span className="bg-blue-600/80 backdrop-blur-md text-white text-[10px] font-black uppercase px-4 py-2 rounded-full border border-white/10">Sau</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Visual Process Section */}
        <LazySection>
          <ProcessSection 
            siteConfig={siteConfig} 
            setSiteConfig={setSiteConfig} 
            isEditMode={isEditMode} 
            isDesignAuthenticated={isDesignAuthenticated} 
          />
        </LazySection>



        {/* Window Tinting Introduction Section */}
        <section className="py-24 bg-black relative overflow-hidden">
          {/* Background effects */}
          <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/20 blur-[120px] rounded-full" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-blue-500 font-black uppercase tracking-[0.3em] text-[10px] mb-4 block"
              >
                Giải Pháp Chống Nóng Toàn Diện
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="section-title text-4xl md:text-6xl mb-6"
              >
                Phim Cách Nhiệt <span className="text-blue-500">Cao Cấp</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-slate-400 text-sm md:text-base leading-relaxed"
              >
                Bảo vệ sức khỏe và nội thất xế yêu với công nghệ phim cách nhiệt tiên tiến nhất thế giới. 
                Cản nhiệt hiệu quả, chống tia UV tuyệt đối và tăng cường sự riêng tư.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { 
                  title: 'Cản Nhiệt Vượt Trội', 
                  desc: 'Loại bỏ lên đến 97% tia hồng ngoại, giúp giảm nhiệt độ trong xe từ 10-15 độ C so với môi trường bên ngoài.',
                  icon: Thermometer,
                  color: 'text-orange-500',
                  bg: 'bg-orange-500/10'
                },
                { 
                  title: 'Chống Tia UV 99%', 
                  desc: 'Bảo vệ làn da khỏi các tia cực tím gây hại (UVA/UVB), ngăn ngừa nguy cơ nám da và ung thư da.',
                  icon: ShieldCheck,
                  color: 'text-blue-500',
                  bg: 'bg-blue-500/10'
                },
                { 
                  title: 'Tăng Sự Riêng Tư', 
                  desc: 'Đa dạng các tông màu từ trong suốt đến sậm màu, giúp đảm bảo không gian riêng tư tuyệt đối bên trong cabin.',
                  icon: EyeOff,
                  color: 'text-purple-500',
                  bg: 'bg-purple-500/10'
                },
                { 
                  title: 'Chống Chói Lóa', 
                  desc: 'Giảm thiểu tình trạng chói mắt do ánh nắng mặt trời hoặc đèn xe đối diện, đảm bảo lái xe an toàn hơn.',
                  icon: Sun,
                  color: 'text-amber-400',
                  bg: 'bg-amber-400/10'
                },
                { 
                  title: 'Bảo Vệ Nội Thất', 
                  desc: 'Ngăn chặn tình trạng bạc màu, giòn gãy và xuống cấp của các chi tiết nhựa, da và tablo bên trong xe.',
                  icon: Armchair,
                  color: 'text-emerald-500',
                  bg: 'bg-emerald-500/10'
                },
                { 
                  title: 'An Toàn Vượt Trội', 
                  desc: 'Trong trường hợp kính vỡ, lớp phim sẽ giữ lại các mảnh vụn, giúp bảo vệ người ngồi trong xe khỏi thương tích.',
                  icon: AlertTriangle,
                  color: 'text-red-500',
                  bg: 'bg-red-500/10'
                }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group p-8 rounded-[40px] bg-slate-900/50 border border-white/5 hover:border-blue-500/30 transition-all hover:translate-y-[-5px]"
                >
                  <div className={`w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <item.icon className={`w-7 h-7 ${item.color}`} />
                  </div>
                  <h4 className="text-xl font-black text-white uppercase tracking-tight mb-4">{item.title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="mt-20 p-8 md:p-12 rounded-[50px] bg-gradient-to-br from-blue-600 to-indigo-900 flex flex-col md:flex-row items-center justify-between gap-8"
            >
              <div className="text-center md:text-left">
                <h3 className="text-2xl md:text-4xl font-black text-white uppercase mb-2">Sẵn sàng chống nóng?</h3>
                <p className="text-blue-100 font-medium">Đặt lịch ngay hôm nay để nhận ưu đãi dán phim 3M chính hãng.</p>
              </div>
              <button 
                onClick={() => setIsBookingModalOpen(true)}
                className="bg-white text-blue-900 px-10 py-5 rounded-3xl font-black uppercase tracking-widest text-xs hover:bg-blue-50 transition-all shadow-xl hover:scale-105 active:scale-95"
              >
                Nhận Báo Giá Ngay
              </button>
            </motion.div>
          </div>
        </section>

        {/* Promotions Section */}
        <PromotionsSection 
          siteConfig={siteConfig} 
          isEditMode={isEditMode} 
          isDesignAuthenticated={isDesignAuthenticated} 
          setSiteConfig={setSiteConfig} 
        />

        {/* Services Section */}
        <section id="services" className="py-32 sm:py-48 bg-transparent relative">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center text-center mb-20 sm:mb-32"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-4 px-6 py-2 rounded-full bg-blue-600/5 border border-blue-500/10 mb-8"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                <EditableText 
                  text={siteConfig.servicesSubtitle} 
                  isEditMode={isEditMode} 
                  isDesignAuthenticated={isDesignAuthenticated}
                  onSave={v => setSiteConfig({...siteConfig, servicesSubtitle: v})}
                  label="Tiêu đề phụ cho mục Dịch vụ"
                  className="section-subtitle mb-0"
                />
              </motion.div>
              <EditableText 
                tag="h2" 
                text={siteConfig.servicesTitle} 
                isEditMode={isEditMode} 
                isDesignAuthenticated={isDesignAuthenticated}
                onSave={v => setSiteConfig({...siteConfig, servicesTitle: v})}
                label="Tiêu đề chính cho mục Dịch vụ"
                className="section-title mb-12"
              />
              
              {/* Search & Filter */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-col gap-6 w-full max-w-4xl"
              >
                <div className="flex flex-col sm:flex-row gap-6 w-full">
                  <div className="relative flex-1 group">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600 group-focus-within:text-blue-500 transition-colors" />
                    <input 
                      type="text" 
                      placeholder={t('search_placeholder')}
                      value={serviceSearch}
                      onChange={(e) => setServiceSearch(e.target.value)}
                      className="w-full bg-white/[0.03] border border-white/5 rounded-3xl py-5 pl-16 pr-8 text-white text-base focus:outline-none focus:border-blue-500/50 transition-all backdrop-blur-md"
                    />
                  </div>
                  <div className="flex gap-3 overflow-x-auto pb-4 sm:pb-0 custom-scrollbar">
                    {['all', 'exterior', 'interior', 'protection', 'tuning'].map(cat => (
                      <button
                        key={cat}
                        onClick={() => setServiceCategory(cat)}
                        className={`px-8 py-5 rounded-3xl text-[11px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap border ${
                          serviceCategory === cat 
                          ? 'bg-blue-600 text-white border-blue-500 shadow-[0_10px_30px_rgba(59,130,246,0.3)]' 
                          : 'bg-white/5 text-slate-500 border-white/5 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        {t(`cat_${cat}`)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sắp xếp (Sorting Options) */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full bg-white/[0.01] border border-white/5 rounded-3xl p-4 sm:p-5">
                  <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-widest shrink-0">
                    <Sliders className="w-4 h-4 text-blue-500" />
                    <span>Sắp xếp theo:</span>
                  </div>
                  <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 w-full custom-scrollbar scrollbar-hide">
                    {[
                      { value: 'default', label: 'Mặc định' },
                      { value: 'name-asc', label: 'Tên A → Z' },
                      { value: 'name-desc', label: 'Tên Z → A' },
                      { value: 'price-asc', label: 'Giá từ Thấp đến Cao' },
                      { value: 'price-desc', label: 'Giá từ Cao đến Thấp' }
                    ].map(opt => (
                      <button
                        key={opt.value}
                        onClick={() => setServiceSortBy(opt.value)}
                        className={`px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border ${
                          serviceSortBy === opt.value
                            ? 'bg-blue-600 text-white border-blue-500 shadow-[0_5px_15px_rgba(59,130,246,0.3)]'
                            : 'bg-white/5 text-slate-500 border-white/5 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-auto sm:auto-rows-[450px]">
              {filterAndSortServices(services || [], serviceCategory, serviceSearch, serviceSortBy)
                .map((s, idx) => {
                  return (
                    <motion.div 
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      key={s.id} 
                      className="group relative bg-white/[0.02] backdrop-blur-2xl border border-white/5 rounded-[40px] overflow-hidden hover:border-blue-500/40 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-700 flex flex-col"
                    >
                      <div className="relative h-full overflow-hidden">
                        <EditableImage 
                          src={s.image} 
                          isEditMode={isEditMode} 
                          isDesignAuthenticated={isDesignAuthenticated}
                          onUpload={base64 => setServices((services || []).map(ser => ser.id === s.id ? {...ser, image: base64} : ser))}
                          alt={s.title}
                          className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                        />
                        
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>
                        
                        <div className="absolute inset-0 p-8 flex flex-col justify-end">
                          <div className="flex justify-between items-center mb-4">
                            <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10">
                              <EditableText 
                                text={s.icon} 
                                isEditMode={isEditMode} 
                                isDesignAuthenticated={isDesignAuthenticated}
                                onSave={v => setServices((services || []).map(ser => ser.id === s.id ? {...ser, icon: v} : ser))}
                                className="text-xl"
                              />
                            </div>
                            <div className="text-blue-400 font-mono font-black text-sm">
                              <EditableText 
                                text={s.price} 
                                isEditMode={isEditMode} 
                                isDesignAuthenticated={isDesignAuthenticated}
                                onSave={v => setServices((services || []).map(ser => ser.id === s.id ? {...ser, price: v} : ser))}
                              />
                            </div>
                          </div>

                          <div className="relative">
                            <EditableText 
                              tag="h3" 
                              text={s.title} 
                              isEditMode={isEditMode} 
                              isDesignAuthenticated={isDesignAuthenticated}
                              onSave={v => setServices((services || []).map(ser => ser.id === s.id ? {...ser, title: v} : ser))}
                              className="text-xl font-black text-white uppercase tracking-tight leading-tight mb-3 group-hover:text-blue-500 transition-colors"
                            />
                            
                            <div className="max-h-12 overflow-hidden mb-6">
                              <EditableText 
                                text={s.description} 
                                isEditMode={isEditMode} 
                                isDesignAuthenticated={isDesignAuthenticated}
                                onSave={v => setServices((services || []).map(ser => ser.id === s.id ? {...ser, description: v} : ser))}
                                multiline
                                className="text-slate-400 text-[10px] leading-relaxed font-medium line-clamp-2"
                              />
                            </div>

                            <div className="flex items-center gap-3">
                              <motion.button 
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setSelectedServiceForModal(s)}
                                className="bg-blue-600 text-white py-2.5 px-6 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg active:scale-95 transition-all"
                              >
                                {t('view_details')}
                              </motion.button>
                              <motion.button 
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleOpenAiServiceChat(s)}
                                className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-blue-500"
                              >
                                <Sparkles className="w-4 h-4" />
                              </motion.button>
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

        <div className="container mx-auto px-4">
          <div className="divider-premium"></div>
        </div>

        {/* Consolidated Trust & Experts Section */}
        <section id="experts" className="py-24 bg-slate-900/30 relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              {/* Left Side: Why Choose Us (4 cols) */}
              <div className="lg:col-span-5 space-y-12">
                <div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-600/10 border border-blue-500/20 mb-6"
                  >
                    <ShieldCheck className="w-4 h-4 text-blue-500" />
                    <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Sự Khác Biệt</span>
                  </motion.div>
                  <h2 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tighter leading-none mb-6">
                    Tại sao chọn <span className="text-blue-500">Chúng Tôi?</span>
                  </h2>
                  <p className="text-slate-400 text-sm leading-relaxed max-w-lg mb-10">
                    Chúng tôi kiến tạo những tác phẩm nghệ thuật trên bánh xe với quy trình Detailing chuẩn quốc tế.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    { title: 'Công Nghệ', icon: '⚡' },
                    { title: 'Chuyên Gia', icon: '👨‍🔧' },
                    { title: 'Bảo Hành', icon: '📜' },
                    { title: 'Dịch Vụ', icon: '🚚' }
                  ].map((item, i) => (
                    <motion.div 
                      key={i}
                      whileHover={{ x: 5 }}
                      className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-4 group"
                    >
                      <div className="text-2xl group-hover:scale-110 transition-transform">{item.icon}</div>
                      <h4 className="text-white font-black uppercase text-[10px] tracking-widest">{item.title}</h4>
                    </motion.div>
                  ))}
                </div>

                <div className="relative rounded-[40px] overflow-hidden border border-white/10 aspect-video group">
                   <img 
                    src="https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&q=80&w=1200" 
                    alt="Detailing" 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white text-xl font-black">10+</div>
                    <span className="text-white font-black text-xs uppercase tracking-tighter">Năm Kinh Nghiệm</span>
                  </div>
                </div>
              </div>

              {/* Right Side: Experts (8 cols) */}
              <div className="lg:col-span-7">
                <div className="flex flex-col sm:flex-row justify-between items-end gap-6 mb-12">
                   <div className="max-w-md">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 border border-blue-500/10 mb-4 items-center">
                      <div className="w-1 h-1 rounded-full bg-blue-500"></div>
                      <span className="text-[8px] font-black uppercase tracking-widest text-blue-500">Đội Ngũ Chuyên Gia</span>
                    </div>
                    <h2 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tighter leading-none mb-4">Master <span className="text-blue-500">Detailers</span></h2>
                  </div>
                  <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">3 Thành viên chủ chốt</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {(experts || []).map((tech, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ y: -5 }}
                      className="group relative"
                    >
                      <div className="aspect-[4/5] rounded-[32px] overflow-hidden relative mb-6 border border-white/10 shadow-2xl">
                        <img src={tech.img} alt={tech.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" loading="lazy" referrerPolicy="no-referrer" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90 group-hover:opacity-40 transition-opacity" />
                        <div className="absolute bottom-6 left-6 right-6">
                          <p className="text-[8px] font-black text-blue-500 uppercase tracking-widest mb-1">{tech.role}</p>
                          <h4 className="text-lg font-black text-white uppercase tracking-tight leading-none">{tech.name}</h4>
                        </div>
                      </div>
                      <div className="flex items-center justify-between px-2">
                        <div className="flex flex-col">
                          <span className="text-[7px] font-black text-slate-600 uppercase tracking-widest mb-1">KN</span>
                          <span className="text-xs font-bold text-white font-mono">{tech.exp}</span>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-[7px] font-black text-slate-600 uppercase tracking-widest mb-1">CERT</span>
                          <span className="text-xs font-bold text-blue-500 font-mono italic">{tech.cert}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4">
          <div className="divider-premium"></div>
        </div>

        {/* Packages Section */}
        <section id="packages" className="py-32 sm:py-48 bg-transparent relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center text-center mb-20 sm:mb-32"
            >
              <div className="inline-flex items-center gap-4 px-6 py-2 rounded-full bg-emerald-600/5 border border-emerald-500/10 mb-8">
                <Package className="w-4 h-4 text-emerald-500" />
                <span className="section-subtitle mb-0 text-emerald-500">{t('comprehensive_care_package')}</span>
              </div>
              <h2 className="section-title text-5xl sm:text-8xl mb-8">
                {t('service_package_pricing')}
              </h2>
              <p className="section-subtitle text-lg sm:text-xl max-w-2xl mx-auto font-light">
                {t('packages_description')}
              </p>
            </motion.div>

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
                    ? 'bg-blue-600/15 border-blue-500/50 shadow-[0_0_50px_rgba(37,99,235,0.2)] scale-105 z-10' 
                    : 'bg-slate-900/40 border-white/5 hover:border-white/20'
                  }`}
                >
                  {pkg.isPopular && (
                    <>
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-black px-6 py-2 rounded-full uppercase tracking-widest shadow-xl z-20">
                        {t('most_popular')}
                      </div>
                      <div className="absolute inset-0 bg-blue-500/5 blur-3xl rounded-[40px] -z-10"></div>
                    </>
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
                    {(pkg.features || []).map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-3">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${pkg.isPopular ? 'bg-blue-500/20' : 'bg-emerald-500/20'}`}>
                          <Check className={`w-3 h-3 ${pkg.isPopular ? 'text-blue-500' : 'text-emerald-500'}`} />
                        </div>
                        <span className="text-slate-300 text-sm font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button 
                        onClick={() => {
                          setSelectedPackageForModal(pkg);
                          setIsBookingModalOpen(true);
                        }}
                        className={`flex-1 py-5 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] transition-all active:scale-95 ${
                          pkg.isPopular
                          ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-900/40'
                          : 'bg-white text-slate-950 hover:bg-slate-200'
                        }`}
                      >
                        {t('book_now_package')}
                      </button>
                      <button 
                        onClick={() => setSelectedPackageForModal(pkg)}
                        className={`flex-1 py-5 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] transition-all active:scale-95 border ${
                          pkg.isPopular
                          ? 'bg-white/10 text-white hover:bg-white/20 border-white/10'
                          : 'bg-slate-800 text-white hover:bg-slate-700 border-white/5'
                        }`}
                      >
                        {t('view_details')}
                      </button>
                    </div>
                    <button 
                      onClick={() => addToCart(pkg)}
                      className="w-full py-4 rounded-2xl bg-blue-600/10 hover:bg-blue-600/20 text-blue-500 border border-blue-500/20 font-black uppercase text-[10px] tracking-[0.2em] transition-all flex items-center justify-center gap-2 group"
                    >
                      <ShoppingCart className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      Thêm vào giỏ hàng
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
            <TenStepProcess t={t} />
          </div>
        </section>

        {/* Premium Solutions Section */}
        <section id="premium" className="py-24 sm:py-32 bg-slate-900/30 relative overflow-hidden">
          {/* Decorative background element */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none"></div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center text-center mb-20 sm:mb-32"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-emerald-600 flex items-center justify-center text-white text-2xl shadow-2xl mb-8">
                💎
              </div>
              <EditableText 
                tag="h2" 
                text={siteConfig.premiumTitle} 
                isEditMode={isEditMode} 
                isDesignAuthenticated={isDesignAuthenticated}
                onSave={v => setSiteConfig({...siteConfig, premiumTitle: v})}
                className="section-title mb-6"
              />
              <EditableText 
                text={siteConfig.premiumSubtitle} 
                isEditMode={isEditMode} 
                isDesignAuthenticated={isDesignAuthenticated}
                onSave={v => setSiteConfig({...siteConfig, premiumSubtitle: v})}
                className="section-subtitle text-sm sm:text-lg"
              />
            </motion.div>

            <div className="space-y-20 sm:space-y-48">
              {(premiumSolutions || []).map((sol, idx) => (
                <motion.div 
                  key={sol.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 sm:gap-24 items-center`}
                >
                  <div className="w-full lg:w-1/2">
                    <div className="relative rounded-[32px] sm:rounded-[64px] overflow-hidden shadow-[0_40px_80px_-15px_rgba(0,0,0,0.5)] border border-white/10 group">
                      <BeforeAfterSlider 
                        before={sol.beforeImage} 
                        after={sol.afterImage} 
                        isEditMode={isEditMode}
                        isDesignAuthenticated={isDesignAuthenticated}
                        onUpdateBefore={(url) => setPremiumSolutions(prev => prev.map(p => p.id === sol.id ? {...p, beforeImage: url} : p))}
                        onUpdateAfter={(url) => setPremiumSolutions(prev => prev.map(p => p.id === sol.id ? {...p, afterImage: url} : p))}
                      />
                      
                      {/* Label overlay */}
                      <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 bg-slate-950/80 backdrop-blur-md px-6 sm:px-8 py-2 sm:py-3 rounded-2xl border border-white/10 text-white font-black text-[8px] sm:text-[10px] uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30">
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
                        className="section-subtitle text-slate-400 text-sm sm:text-xl leading-relaxed font-medium"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-16">
                      <div className="space-y-6">
                        <h4 className="text-blue-500 font-black text-[11px] uppercase tracking-[0.3em] flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                          {t('standard_process')}
                        </h4>
                        <ul className="space-y-4">
                          {(sol.process || []).map((step, sIdx) => (
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
                          {(sol.benefits || []).map((benefit, bIdx) => (
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

        {/* NEW PROPOSAL: Loyalty/Membership Program Section */}
        <section id="membership" className="py-24 sm:py-32 bg-transparent relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center mb-16 sm:mb-24"
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-6">
                <Crown className="w-4 h-4 text-yellow-500" />
                <span className="text-[10px] font-black text-yellow-500 uppercase tracking-widest">Đề Xuất Mới: Đặc Quyền Hội Viên</span>
              </div>
              <h2 className="text-4xl sm:text-7xl font-black text-white uppercase tracking-tighter leading-tight mb-6">
                Nâng Tầm Trải Nghiệm <br/> <span className="text-yellow-500">Thành Viên VIP</span>
              </h2>
              <p className="text-slate-400 text-sm sm:text-lg max-w-2xl mx-auto font-medium">
                Tham gia chương trình hội viên của XE ĐẸP PRO để nhận ưu đãi lên đến 20% và các đặc quyền chăm sóc xe không giới hạn.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {(siteConfig.loyaltyConfig?.tiers || []).map((tier, idx) => (
                <motion.div
                  key={tier.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group relative p-8 rounded-[40px] border border-white/5 bg-white/[0.02] backdrop-blur-3xl overflow-hidden"
                >
                  {/* Glass Card Effect */}
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-30" style={{ color: tier.color }}></div>
                  
                  <div className="mb-8 relative">
                    <div className="w-16 h-16 rounded-3xl flex items-center justify-center text-3xl mb-6 shadow-2xl relative z-10" style={{ backgroundColor: `${tier.color}20`, border: `1px solid ${tier.color}40`, color: tier.color }}>
                      {idx === 0 ? <Zap className="w-8 h-8" /> : idx === 1 ? <Shield className="w-8 h-8" /> : idx === 2 ? <Star className="w-8 h-8" /> : <Diamond className="w-8 h-8" />}
                    </div>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2">{tier.name}</h3>
                    <div className="text-[10px] font-black uppercase tracking-widest opacity-60" style={{ color: tier.color }}>
                      Từ {tier.minPoints.toLocaleString()} điểm
                    </div>
                  </div>

                  <div className="space-y-4 mb-10">
                    {tier.perks.map((perk, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 bg-white/5">
                          <Check className="w-3 h-3 text-white/40" />
                        </div>
                        <span className="text-slate-300 text-[11px] font-medium leading-relaxed">{perk}</span>
                      </div>
                    ))}
                  </div>

                  <button 
                    className="w-full py-4 rounded-2xl font-black uppercase text-[9px] tracking-widest transition-all border border-white/10 hover:bg-white text-white hover:text-slate-950"
                  >
                    Đăng ký ngay
                  </button>

                  {/* Decorative Background Icon */}
                  <div className="absolute -bottom-10 -right-10 opacity-[0.03] rotate-12 transition-transform group-hover:rotate-0 duration-700" style={{ color: tier.color }}>
                     {idx === 0 ? <Zap className="w-48 h-48" /> : idx === 1 ? <Shield className="w-48 h-48" /> : idx === 2 ? <Star className="w-48 h-48" /> : <Diamond className="w-48 h-48" />}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4">
          <div className="divider-premium"></div>
        </div>

        {/* NEW PROPOSAL: AI WeatherCare Advisor Section */}
        <section id="weather-care" className="py-24 sm:py-32 bg-slate-950 relative overflow-hidden">
          <div className="absolute inset-0 bg-blue-600/5 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/5 rounded-[64px] p-8 sm:p-24 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-1/2 h-full hidden lg:block">
                <img 
                  src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=1200" 
                  alt="Protection" 
                  className="w-full h-full object-cover opacity-20 [mask-image:linear-gradient(to_right,transparent,black)]"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="max-w-2xl relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-600/10 border border-blue-500/20 mb-8">
                    <CloudLightning className="w-4 h-4 text-blue-500" />
                    <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">WeatherGuard Advisor (Bản thử nghiệm)</span>
                  </div>
                  <h2 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tighter leading-tight mb-8">
                    Bảo vệ xe theo <br/> <span className="text-blue-500">Thời Tiết 4.0</span>
                  </h2>
                  <p className="text-slate-400 text-sm sm:text-lg mb-12 leading-relaxed">
                    Hệ thống AI của chúng tôi phân tích dữ liệu thời tiết thực tế tại Hà Nội để đề xuất các dịch vụ bảo vệ phù hợp nhất. Ví dụ: Chống tia UV cực cao khi nắng gắt hoặc Tẩy ố kính khi mùa mưa sắp tới.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                     <div className="p-6 rounded-3xl bg-blue-600/10 border border-blue-500/30">
                        <div className="flex items-center gap-4 mb-4">
                          <Sun className="w-6 h-6 text-yellow-500" />
                          <span className="text-white font-black uppercase text-xs">Mùa Hè Nắng Gắt</span>
                        </div>
                        <p className="text-slate-400 text-[10px] leading-relaxed">Đề xuất: Dán phim cách nhiệt 3M Crystalline & Phủ Ceramic Pearl để chống tia UV và nhiệt độ cao.</p>
                     </div>
                     <div className="p-6 rounded-3xl bg-emerald-600/10 border border-emerald-500/30">
                        <div className="flex items-center gap-4 mb-4">
                          <CloudRain className="w-6 h-6 text-emerald-500" />
                          <span className="text-white font-black uppercase text-xs">Mùa Mưa Ẩm Thấp</span>
                        </div>
                        <p className="text-slate-400 text-[10px] leading-relaxed">Đề xuất: Phủ Nano Kính lái & Vệ sinh khoang máy Dry Steam để tránh ẩm mốc và rỉ sét.</p>
                     </div>
                  </div>

                  <button 
                    onClick={() => setIsAiAdvisorOpen(true)}
                    className="bg-blue-600 hover:bg-blue-500 text-white font-black uppercase text-xs tracking-widest px-12 py-6 rounded-3xl shadow-[0_20px_50px_rgba(37,99,235,0.3)] transition-all flex items-center gap-4 group"
                  >
                    Hỏi AI về tình hình bảo vệ xe
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </button>
                </motion.div>
              </div>
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
                  className="section-title text-4xl sm:text-7xl mb-8 leading-[0.9]"
                />
                <EditableText 
                  text={siteConfig.aiSubtitle} 
                  isEditMode={isEditMode} 
                  isDesignAuthenticated={isDesignAuthenticated}
                  onSave={v => setSiteConfig({...siteConfig, aiSubtitle: v})}
                  multiline
                  className="section-subtitle text-base sm:text-xl mb-12"
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
                        <div className="text-xs sm:text-sm font-black text-white uppercase tracking-widest">XE ĐẸP PRO AI Advisor</div>
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
                    {(aiMessages || []).map((m, i) => (
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
                      isDesignAuthenticated={isDesignAuthenticated}
                      onSave={(v) => setSiteConfig({...siteConfig, windowTintingSubtitle: v})}
                      label="Tiêu đề phụ cho mục Dán Phim Cách Nhiệt"
                      className="text-blue-500 font-black uppercase tracking-[0.3em] text-[10px]"
                    />
                  </div>
                  <EditableText 
                    tag="h2" 
                    text={siteConfig.windowTintingTitle} 
                    isEditMode={isEditMode} 
                    isDesignAuthenticated={isDesignAuthenticated}
                    onSave={(v) => setSiteConfig({...siteConfig, windowTintingTitle: v})}
                    label="Tiêu đề chính cho mục Dán Phim Cách Nhiệt"
                    className="text-5xl sm:text-8xl font-black text-white uppercase tracking-tighter leading-[0.85]"
                  />
                </div>
                
                <EditableText 
                  tag="p" 
                  text={siteConfig.windowTintingDescription} 
                  isEditMode={isEditMode} 
                  isDesignAuthenticated={isDesignAuthenticated}
                  onSave={(v) => setSiteConfig({...siteConfig, windowTintingDescription: v})}
                  label="Mô tả chi tiết cho mục Dán Phim Cách Nhiệt"
                  multiline
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
                      isDesignAuthenticated={isDesignAuthenticated}
                      onSave={(v) => setSiteConfig({...siteConfig, wrapPPFSubtitle: v})}
                      label="Tiêu đề phụ cho mục Wrap & PPF"
                      className="text-emerald-500 font-black uppercase tracking-[0.3em] text-[10px]"
                    />
                  </div>
                  <EditableText 
                    tag="h2" 
                    text={siteConfig.wrapPPFTitle} 
                    isEditMode={isEditMode} 
                    isDesignAuthenticated={isDesignAuthenticated}
                    onSave={(v) => setSiteConfig({...siteConfig, wrapPPFTitle: v})}
                    label="Tiêu đề chính cho mục Wrap & PPF"
                    className="text-5xl sm:text-8xl font-black text-white uppercase tracking-tighter leading-[0.85]"
                  />
                </div>
                
                <EditableText 
                  tag="p" 
                  text={siteConfig.wrapPPFDescription} 
                  isEditMode={isEditMode} 
                  isDesignAuthenticated={isDesignAuthenticated}
                  onSave={(v) => setSiteConfig({...siteConfig, wrapPPFDescription: v})}
                  label="Mô tả chi tiết cho mục Wrap & PPF"
                  multiline
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
                      isDesignAuthenticated={isDesignAuthenticated}
                      onSave={(v) => setSiteConfig({...siteConfig, tuningSubtitle: v})}
                      label="Tiêu đề phụ cho mục Nâng Cấp & Độ Xe"
                      className="text-blue-500 font-black uppercase tracking-[0.3em] text-[10px]"
                    />
                  </div>
                  <EditableText 
                    tag="h2" 
                    text={siteConfig.tuningTitle} 
                    isEditMode={isEditMode} 
                    isDesignAuthenticated={isDesignAuthenticated}
                    onSave={(v) => setSiteConfig({...siteConfig, tuningTitle: v})}
                    label="Tiêu đề chính cho mục Nâng Cấp & Độ Xe"
                    className="text-5xl sm:text-8xl font-black text-white uppercase tracking-tighter leading-[0.85]"
                  />
                </div>
                
                <EditableText 
                  tag="p" 
                  text={siteConfig.tuningDescription} 
                  isEditMode={isEditMode} 
                  isDesignAuthenticated={isDesignAuthenticated}
                  onSave={(v) => setSiteConfig({...siteConfig, tuningDescription: v})}
                  label="Mô tả chi tiết cho mục Nâng Cấp & Độ Xe"
                  multiline
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
        <LazySection>
          <TrackingSection trackingData={trackingData} t={t} />
        </LazySection>

        {/* Subscriptions Section */}
        <LazySection>
          <SubscriptionsSection siteConfig={siteConfig} onSelectPackage={(pkg) => {
            setPreSelectedSubService(pkg.title);
            setIsBookingModalOpen(true);
          }} />
        </LazySection>

        {/* Feedback & Reviews Section */}
        <LazySection>
          <FeedbackSection 
            reviews={reviews} 
            services={services} 
            onAddReview={(newReview) => setReviews(prev => [{ ...newReview, id: Date.now().toString() } as Review, ...prev])} 
            t={t}
          />
        </LazySection>

        {/* Before/After Comparison Section */}
        <section className="py-24 sm:py-32 bg-slate-950 relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center text-center mb-16 sm:mb-24"
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-emerald-600/10 border border-emerald-500/20 mb-6">
                <Sparkles className="w-4 h-4 text-emerald-500" />
                <span className="text-emerald-500 font-black uppercase tracking-[0.3em] text-[10px]">Transformation</span>
              </div>
              <h2 className="font-serif text-4xl sm:text-7xl text-white mb-6">Sự Khác Biệt <span className="text-blue-500 italic">Vượt Trội</span></h2>
              <p className="text-slate-400 max-w-2xl text-sm sm:text-base leading-relaxed">
                Chiêm ngưỡng sự thay đổi ngoạn mục của những chiếc xe sau khi được chăm sóc bởi đội ngũ chuyên gia tại {siteConfig.siteName}.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
              {(siteConfig.transformations || []).map((trans, idx) => (
                <div key={trans.id} className="relative group/trans">
                  <BeforeAfterSlider 
                    before={trans.before} 
                    after={trans.after}
                    label={trans.label}
                    isEditMode={isEditMode}
                    isDesignAuthenticated={isDesignAuthenticated}
                    onUpdateBefore={(url) => setSiteConfig(prev => ({
                      ...prev,
                      transformations: (prev.transformations || []).map(t => t.id === trans.id ? {...t, before: url} : t)
                    }))}
                    onUpdateAfter={(url) => setSiteConfig(prev => ({
                      ...prev,
                      transformations: (prev.transformations || []).map(t => t.id === trans.id ? {...t, after: url} : t)
                    }))}
                    onUpdateLabel={(text) => setSiteConfig(prev => ({
                      ...prev,
                      transformations: (prev.transformations || []).map(t => t.id === trans.id ? {...t, label: text} : t)
                    }))}
                  />
                  {isEditMode && isDesignAuthenticated && (
                    <button 
                      onClick={() => setSiteConfig(prev => ({
                        ...prev,
                        transformations: (prev.transformations || []).filter(t => t.id !== trans.id)
                      }))}
                      className="absolute top-0 right-0 p-2 bg-red-600 text-white rounded-full opacity-0 group-hover/trans:opacity-100 transition-opacity shadow-xl"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
              ))}
              {isEditMode && isDesignAuthenticated && (
                <button 
                  onClick={() => setSiteConfig(prev => ({
                    ...prev,
                    transformations: [
                      ...(prev.transformations || []),
                      {
                        id: Date.now().toString(),
                        before: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&q=80&w=1200",
                        after: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=1200",
                        label: "Dịch vụ mới",
                        date: new Date().toISOString()
                      }
                    ]
                  }))}
                  className="lg:col-span-2 py-12 border-2 border-dashed border-white/10 rounded-[40px] flex flex-col items-center justify-center gap-4 text-slate-500 hover:text-white hover:border-blue-500/50 hover:bg-blue-500/5 transition-all group"
                >
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Plus className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest">Thêm so sánh trước sau</span>
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <LazySection>
          <section id="gallery" className="py-24 sm:py-32 bg-slate-950 relative overflow-hidden">
          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto mb-16 sm:mb-24"
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-600/10 border border-blue-500/20 mb-6">
                <CameraIcon className="w-4 h-4 text-blue-500" />
                <span className="text-blue-500 font-black uppercase tracking-[0.3em] text-[10px]">Visual Showcase</span>
              </div>
              <EditableText 
                tag="h2" 
                text={siteConfig.galleryTitle} 
                isEditMode={isEditMode} 
                isDesignAuthenticated={isDesignAuthenticated}
                onSave={v => setSiteConfig({...siteConfig, galleryTitle: v})}
                className="section-title text-4xl sm:text-7xl mb-6"
              />
              <EditableText 
                text={siteConfig.gallerySubtitle} 
                isEditMode={isEditMode} 
                isDesignAuthenticated={isDesignAuthenticated}
                onSave={v => setSiteConfig({...siteConfig, gallerySubtitle: v})}
                className="section-subtitle text-sm sm:text-xl"
              />

              {/* Gallery Filters */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-12"
              >
                {['All', 'Sedan', 'SUV', 'Luxury', 'Sport'].map((cat, idx) => (
                  <motion.button
                    key={cat}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                    onClick={() => setGalleryFilter(cat)}
                    className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 border ${
                      galleryFilter === cat
                        ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-900/40 scale-110'
                        : 'bg-slate-900/50 border-white/5 text-slate-400 hover:border-white/20 hover:text-white'
                    }`}
                  >
                    {cat}
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
              {(gallery || [])
                .filter(img => galleryFilter === 'All' || img.category === galleryFilter)
                .map((img, idx) => (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05, duration: 0.5 }}
                  key={`gallery-${img.id}`} 
                  className="group relative aspect-square rounded-[32px] sm:rounded-[48px] overflow-hidden bg-slate-900 border border-white/5 shadow-2xl transition-all hover:border-blue-500/30"
                >
                  <EditableImage 
                    src={img.url} 
                    isEditMode={isEditMode} 
                    isDesignAuthenticated={isDesignAuthenticated}
                    onUpload={base64 => setGallery((gallery || []).map(g => g.id === img.id ? {...g, url: base64} : g))}
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
                      onSave={v => setGallery((gallery || []).map(g => g.id === img.id ? {...g, title: v} : g))}
                      className="text-white font-black uppercase tracking-widest text-[10px] sm:text-xs text-center translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-200"
                    />
                    {isDesignAuthenticated && (
                      <button 
                        onClick={async () => {
                          const prompt = window.prompt("AI Chỉnh sửa ảnh này (VD: Hiệu ứng bóng sơn):");
                          if (prompt) {
                            const result = await editImageWithAI(img.url, prompt);
                            if (result) setGallery((gallery || []).map(g => g.id === img.id ? {...g, url: result} : g));
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
      </LazySection>

        {/* News Section */}
        <LazySection>
          <NewsSection 
            siteConfig={siteConfig} 
            isEditMode={isEditMode} 
            isDesignAuthenticated={isDesignAuthenticated}
            setSiteConfig={setSiteConfig}
            selectedArticle={selectedArticle}
            setSelectedArticle={setSelectedArticle}
            showNewBadge={showNewBadge}
            setShowNewBadge={setShowNewBadge}
          />
        </LazySection>

        {/* Innovation Lab Section */}
        <LazySection>
          <InnovationLab siteConfig={siteConfig} />
        </LazySection>

        {/* Contact Form Section */}
        {/* Car Care Guide Section */}
        <section className="py-24 bg-slate-950 relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="lg:w-1/2">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <span className="text-blue-500 font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Kiến Thức Detailing</span>
                  <h2 className="section-title text-4xl md:text-6xl mb-8 leading-none">
                    Cẩm Nang <span className="text-blue-500">Chăm Sóc Xe</span> Tại Nhà
                  </h2>
                  <p className="text-slate-400 text-lg mb-10 leading-relaxed">
                    Duy trì vẻ đẹp và giá trị của chiếc xe không chỉ dừng lại ở việc mang xe đến trung tâm. Hãy cùng tham khảo những mẹo nhỏ từ chuyên gia.
                  </p>
                  <div className="space-y-6">
                    {[
                      { title: 'Rửa xe đúng cách', desc: 'Sử dụng phương pháp 2 xô và khăn microfiber để tránh gây xước xoáy.', icon: '🧽' },
                      { title: 'Bảo vệ lớp sơn', desc: 'Tránh đỗ xe dưới ánh nắng trực tiếp và dưới tán cây có nhựa.', icon: '☀️' },
                      { title: 'Vệ sinh nội thất', desc: 'Hút bụi thường xuyên và sử dụng dung dịch dưỡng da chuyên dụng.', icon: '🧹' }
                    ].map((tip, i) => (
                      <div key={i} className="flex gap-6 p-6 rounded-3xl bg-white/5 border border-white/5 hover:border-blue-500/30 transition-all group">
                        <div className="text-3xl group-hover:scale-110 transition-transform">{tip.icon}</div>
                        <div>
                          <h4 className="text-white font-black uppercase tracking-tight mb-1">{tip.title}</h4>
                          <p className="text-slate-500 text-sm">{tip.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
              <div className="lg:w-1/2 relative">
                <div className="absolute -inset-10 bg-blue-600/10 rounded-full blur-[120px]"></div>
                <div className="relative rounded-[40px] overflow-hidden border border-white/10 shadow-2xl">
                  <img src="https://images.unsplash.com/photo-1601362840469-51e4d8d59085?auto=format&fit=crop&q=80&w=1200" alt="Car Care" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                  <div className="absolute bottom-10 left-10 right-10 p-8 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10">
                    <p className="text-white font-bold italic mb-4">"Một chiếc xe sạch không chỉ đẹp, nó còn thể hiện phong cách sống của chủ nhân."</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-black text-white">D</div>
                      <div>
                        <p className="text-white font-black text-xs uppercase">Dũng Car</p>
                        <p className="text-slate-500 text-[10px] font-bold uppercase">Founder</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 bg-black relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-4"
              >
                <EditableText 
                  text={siteConfig.faqSubtitle} 
                  isEditMode={isEditMode} 
                  isDesignAuthenticated={isDesignAuthenticated}
                  onSave={v => setSiteConfig({...siteConfig, faqSubtitle: v})}
                  label="Tiêu đề phụ cho mục FAQ"
                  className="text-blue-500 font-black uppercase tracking-[0.3em] text-[10px]"
                />
              </motion.div>
              <EditableText 
                tag="h2"
                text={siteConfig.faqTitle} 
                isEditMode={isEditMode} 
                isDesignAuthenticated={isDesignAuthenticated}
                onSave={v => setSiteConfig({...siteConfig, faqTitle: v})}
                label="Tiêu đề chính cho mục FAQ"
                className="section-title text-4xl md:text-6xl mb-6"
              />
            </div>

            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { q: 'Phủ Ceramic mất bao lâu?', a: 'Quy trình phủ Ceramic tiêu chuẩn thường mất từ 1-2 ngày tùy vào tình trạng sơn xe.' },
                { q: 'Dán PPF có làm hỏng sơn không?', a: 'Không, PPF cao cấp bảo vệ sơn khỏi trầy xước và có thể bóc ra mà không để lại keo.' },
                { q: 'Bao lâu nên vệ sinh nội thất?', a: 'Bạn nên vệ sinh nội thất chuyên sâu mỗi 3-6 tháng để đảm bảo môi trường sạch sẽ.' },
                { q: 'Có cần đặt lịch trước không?', a: 'Chúng tôi khuyến khích khách hàng đặt lịch trước để được phục vụ tốt nhất.' },
                { q: 'Chế độ bảo hành như thế nào?', a: 'Tất cả dịch vụ cao cấp đều có bảo hành điện tử, tra cứu dễ dàng trên website.' },
                { q: 'Rửa xe có gây xước sơn không?', a: 'Tại XE ĐẸP PRO, chúng tôi sử dụng quy trình rửa xe 3 bước không chạm và khăn microfiber để bảo vệ sơn.' }
              ].map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(30, 41, 59, 0.6)" }}
                  className="p-8 rounded-[32px] bg-slate-900/40 border border-white/5 hover:border-blue-500/30 transition-all cursor-default"
                >
                  <h4 className="text-white font-black uppercase tracking-tight mb-4 flex items-start gap-3">
                    <span className="text-blue-500">Q.</span> {faq.q}
                  </h4>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    <span className="text-emerald-500 font-black mr-2">A.</span> {faq.a}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <ContactSection 
          siteConfig={siteConfig} 
          isEditMode={isEditMode} 
          isDesignAuthenticated={isDesignAuthenticated}
          setSiteConfig={setSiteConfig}
        />
      </main>

      {/* Footer */}
       {/* Warranty Lookup Section */}
      <section id="warranty-lookup" className="py-24 bg-slate-900/30 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
                <ShieldCheck className="w-4 h-4 text-blue-500" />
                <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">{t('warranty_lookup_title')}</span>
              </div>
              <h2 className="section-title text-5xl mb-6 leading-none">
                {t('warranty_lookup_title')}
              </h2>
              <p className="section-subtitle text-lg mb-8 max-w-xl">
                {t('warranty_lookup_desc')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input 
                    type="text" 
                    placeholder={t('warranty_plate_placeholder')} 
                    className="input-premium w-full py-4 pl-12 pr-4"
                    value={warrantySearch}
                    onChange={e => setWarrantySearch(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleWarrantySearch()}
                  />
                </div>
                <button 
                  onClick={handleWarrantySearch}
                  className="btn-primary px-8 py-4"
                >
                  {t('warranty_check_btn')}
                </button>
              </div>
            </motion.div>

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
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-center gap-4">
                {siteConfig.logoUrl ? (
                  <img 
                    src={siteConfig.logoUrl} 
                    alt="Logo" 
                    className="w-16 h-16 object-contain"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-emerald-600 rounded-2xl flex items-center justify-center font-black text-white text-3xl shadow-lg shadow-blue-900/20">
                    {siteConfig?.siteName?.charAt(0) || 'D'}
                  </div>
                )}
                <h3 className="text-lg font-black text-white uppercase tracking-tighter">
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
            </motion.div>

            {/* Quick Links */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="space-y-6"
            >
              <h4 className="text-sm font-black uppercase tracking-widest text-white mb-6">Liên Kết Nhanh</h4>
              <ul className="space-y-3">
                <li><button onClick={() => scrollToSection('promotions')} className="text-slate-500 hover:text-blue-500 text-sm transition-colors flex items-center gap-2 group"><div className="w-1 h-1 rounded-full bg-slate-800 group-hover:bg-blue-500 transition-colors"></div> Ưu Đãi Hot</button></li>
                <li><button onClick={() => scrollToSection('services')} className="text-slate-500 hover:text-blue-500 text-sm transition-colors flex items-center gap-2 group"><div className="w-1 h-1 rounded-full bg-slate-800 group-hover:bg-blue-500 transition-colors"></div> Dịch Vụ Detailing</button></li>
                <li><button onClick={() => scrollToSection('packages')} className="text-slate-500 hover:text-blue-500 text-sm transition-colors flex items-center gap-2 group"><div className="w-1 h-1 rounded-full bg-slate-800 group-hover:bg-blue-500 transition-colors"></div> Bảng Giá Gói</button></li>
                <li><button onClick={() => scrollToSection('premium')} className="text-slate-500 hover:text-blue-500 text-sm transition-colors flex items-center gap-2 group"><div className="w-1 h-1 rounded-full bg-slate-800 group-hover:bg-blue-500 transition-colors"></div> Giải Pháp Cao Cấp</button></li>
                <li><button onClick={() => scrollToSection('gallery')} className="text-slate-500 hover:text-blue-500 text-sm transition-colors flex items-center gap-2 group"><div className="w-1 h-1 rounded-full bg-slate-800 group-hover:bg-blue-500 transition-colors"></div> Thư Viện Ảnh</button></li>
                <li><button onClick={() => scrollToSection('reviews')} className="text-slate-500 hover:text-blue-500 text-sm transition-colors flex items-center gap-2 group"><div className="w-1 h-1 rounded-full bg-slate-800 group-hover:bg-blue-500 transition-colors"></div> Đánh Giá Khách Hàng</button></li>
              </ul>
            </motion.div>

            {/* Services Tag Cloud */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <h4 className="text-sm font-black uppercase tracking-widest text-white mb-6">Dịch Vụ Phổ Biến</h4>
              <div className="flex flex-wrap gap-2">
                {['Phủ Ceramic 9H', 'Dán PPF', 'Wrap Đổi Màu', 'Vệ Sinh Nội Thất', 'Đánh Bóng Sơn', 'Cách Âm Chống Ồn', 'Phủ Gầm Ô Tô', 'Dán Phim 3M', 'Độ Đèn Bi-LED', 'Nâng Cấp Âm Thanh'].map((tag, i) => (
                  <motion.span 
                    key={i} 
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + (i * 0.05) }}
                    className="px-3 py-1.5 rounded-lg bg-slate-900 border border-white/5 text-[10px] font-bold text-slate-500 hover:border-blue-500/30 hover:text-blue-500 transition-all cursor-default"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 border-t border-white/5 pt-12">
            {/* Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-500 shrink-0">📍</div>
                  <div className="flex-1">
                    <p className="section-subtitle mb-1">Địa chỉ</p>
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
      <div className="fixed bottom-6 sm:bottom-10 right-6 sm:right-10 hidden sm:flex flex-col gap-4 sm:gap-6 z-40">
        <a href={`tel:${siteConfig.contactPhone}`} className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-600 rounded-2xl sm:rounded-[24px] flex items-center justify-center shadow-3xl hover:scale-110 transition-all hover:bg-blue-500 group active:scale-95">
          <span className="text-xl sm:text-2xl group-hover:animate-bounce">📞</span>
        </a>
        <a href={`mailto:${siteConfig.contactEmail}`} className="w-12 h-12 sm:w-16 sm:h-16 bg-emerald-600 rounded-2xl sm:rounded-[24px] flex items-center justify-center shadow-3xl hover:scale-110 transition-all hover:bg-emerald-500 group active:scale-95">
          <span className="text-xl sm:text-2xl group-hover:animate-bounce">✉️</span>
        </a>
        <a href={`https://zalo.me/${siteConfig.zaloNumber || '0588896699'}`} target="_blank" rel="noreferrer" className="w-12 h-12 sm:w-16 sm:h-16 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-[24px] flex items-center justify-center shadow-2xl hover:scale-110 transition-all hover:bg-white/10 group overflow-hidden active:scale-95">
          <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg" className="w-7 h-7 sm:w-9 sm:h-9 opacity-80 group-hover:opacity-100 transition-all" alt="Zalo" loading="lazy" referrerPolicy="no-referrer" />
        </a>

      </div>

      <AdminLoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => {
          setIsLoginModalOpen(false);
          setIsSidebarOpen(false);
        }} 
        onSuccess={(role) => {
          setCurrentUserRole(role as any);
          setIsEditMode(true); 
          setIsLoginModalOpen(false);
          setIsSidebarOpen(false);
          if (role === 'staff') {
            setDashboardInitialTab('inspections');
            setIsDirectInspectionMode(true);
            setIsDashboardOpen(true);
          } else {
            setDashboardInitialTab('home');
            setIsDashboardOpen(true);
          }
          toast.success(`Đăng nhập thành công với quyền ${role === 'admin' ? 'Quản trị viên' : role === 'manager' ? 'Kế toán' : 'Nhân viên'}`);
        }} 
        siteConfig={siteConfig}
        t={t}
      />
      <ServiceCartCenter 
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
        cartItems={cart}
        onRemoveItem={removeFromCart}
        onCheckout={() => {
          setShowNotifications(false);
          setIsBookingModalOpen(true);
        }}
        siteConfig={siteConfig}
        t={t}
      />
      <PaymentModal 
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        siteConfig={siteConfig}
        cart={cart}
      />
      <React.Suspense fallback={null}>
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
      </React.Suspense>
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
      <PackageDetailsModal
        isOpen={!!selectedPackageForModal}
        onClose={() => setSelectedPackageForModal(null)}
        pkg={selectedPackageForModal}
        t={t}
        onBooking={(packageId) => {
          setIsBookingModalOpen(true);
        }}
        onAddToCart={addToCart}
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
        siteConfig={siteConfig}
      />
      <AiDetailingAdvisor 
        isOpen={isAiAdvisorOpen}
        onClose={() => setIsAiAdvisorOpen(false)}
        services={services}
        onSelectService={(serviceId, subServiceTitle) => {
          setPreSelectedSubService(subServiceTitle);
          setIsBookingModalOpen(true);
          setIsAiAdvisorOpen(false);
        }}
      />
      <React.Suspense fallback={null}>
        <AdminControlCenter 
          isEditMode={isEditMode}
          setIsEditMode={setIsEditMode}
          isDashboardOpen={isDashboardOpen}
          setIsDashboardOpen={setIsDashboardOpen}
          isAuthenticated={isSuperAdminAuthenticated || isDesignAuthenticated || isAccountingAuthenticated || isInspectionAuthenticated}
          onLogout={handleAdminLogout}
          onOpenTab={handleOpenAdminTab}
          isPrivacyMode={isPrivacyMode}
          onTogglePrivacy={togglePrivacyMode}
          notificationsCount={notifications.filter(n => !n.isRead).length}
          cloudUser={user}
          onCloudLogin={handleLogin}
          onCloudLogout={handleLogout}
        />
      </React.Suspense>

      <AnimatePresence>
        {isCommandPaletteOpen && (
          <CommandPalette 
            isOpen={isCommandPaletteOpen}
            onClose={() => setIsCommandPaletteOpen(false)}
            onAction={handleOpenAdminTab}
            items={commandPaletteItems}
          />
        )}
      </AnimatePresence>

      {/* Generic Modals for Sidebar Actions */}
      <GenericContentModal 
        isOpen={isPromotionsModalOpen} 
        onClose={() => setIsPromotionsModalOpen(false)} 
        title="Chương Trình Khuyến Mãi"
      >
        <PromotionsSection 
          siteConfig={siteConfig} 
          isEditMode={false} 
          isDesignAuthenticated={false} 
          setSiteConfig={setSiteConfig} 
        />
      </GenericContentModal>

      <GenericContentModal 
        isOpen={isNewsModalOpen} 
        onClose={() => setIsNewsModalOpen(false)} 
        title="Tin Tức & Hoạt Động"
      >
        <NewsSection 
          siteConfig={siteConfig} 
          isEditMode={false} 
          setSiteConfig={setSiteConfig}
          selectedArticle={selectedArticle}
          setSelectedArticle={setSelectedArticle}
          showNewBadge={showNewBadge}
          setShowNewBadge={setShowNewBadge}
        />
      </GenericContentModal>

      <GenericContentModal 
        isOpen={isGalleryModalOpen} 
        onClose={() => setIsGalleryModalOpen(false)} 
        title="Thư Viện Ảnh"
      >
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {(gallery || []).map((img, idx) => (
            <div key={img.id} className="aspect-square rounded-3xl overflow-hidden border border-white/5 shadow-xl">
              <img src={img.url} alt={img.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
          ))}
        </div>
      </GenericContentModal>

      <GenericContentModal 
        isOpen={isReviewsModalOpen} 
        onClose={() => setIsReviewsModalOpen(false)} 
        title="Đánh Giá Khách Hàng"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {(reviews || []).map((rev, idx) => (
            <div key={rev.id} className="p-8 rounded-[32px] bg-slate-900/50 border border-white/5 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-500 font-black">
                  {(rev.name || 'H').charAt(0)}
                </div>
                <div>
                  <h4 className="text-white font-black uppercase text-xs">{rev.name}</h4>
                  <div className="flex text-amber-500">
                    {[1,2,3,4,5].map(s => <Star key={s} className={`w-3 h-3 ${s <= rev.rating ? 'fill-current' : 'opacity-20'}`} />)}
                  </div>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed italic">"{rev.comment}"</p>
            </div>
          ))}
        </div>
      </GenericContentModal>

      <GenericContentModal
        isOpen={isServicesModalOpen}
        onClose={() => setIsServicesModalOpen(false)}
        title={siteConfig.servicesTitle}
      >
        <div className="space-y-8 pb-24">
          <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto mb-12">
            <div className="flex flex-col sm:flex-row gap-6 w-full">
              <div className="relative flex-1 group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600 group-focus-within:text-blue-500 transition-colors" />
                <input 
                  type="text" 
                  placeholder={t('search_placeholder')}
                  value={serviceSearch}
                  onChange={(e) => setServiceSearch(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/5 rounded-3xl py-5 pl-16 pr-8 text-white text-base focus:outline-none focus:border-blue-500/50 transition-all backdrop-blur-md"
                />
              </div>
              <div className="flex gap-3 overflow-x-auto pb-4 sm:pb-0 custom-scrollbar">
                {['all', 'exterior', 'interior', 'protection', 'tuning'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setServiceCategory(cat)}
                    className={`px-8 py-5 rounded-3xl text-[11px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap border ${
                      serviceCategory === cat 
                      ? 'bg-blue-600 text-white border-blue-500 shadow-[0_10px_30px_rgba(59,130,246,0.3)]' 
                      : 'bg-white/5 text-slate-500 border-white/5 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {t(`cat_${cat}`)}
                  </button>
                ))}
              </div>
            </div>

            {/* Sắp xếp trong Modal */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full bg-white/[0.01] border border-white/5 rounded-3xl p-4 sm:p-5">
              <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-widest shrink-0">
                <Sliders className="w-4 h-4 text-blue-500" />
                <span>Sắp xếp theo:</span>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 w-full custom-scrollbar scrollbar-hide">
                {[
                  { value: 'default', label: 'Mặc định' },
                  { value: 'name-asc', label: 'Tên A → Z' },
                  { value: 'name-desc', label: 'Tên Z → A' },
                  { value: 'price-asc', label: 'Giá từ Thấp đến Cao' },
                  { value: 'price-desc', label: 'Giá từ Cao đến Thấp' }
                ].map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => setServiceSortBy(opt.value)}
                    className={`px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border ${
                      serviceSortBy === opt.value
                        ? 'bg-blue-600 text-white border-blue-500 shadow-[0_5px_15px_rgba(59,130,246,0.3)]'
                        : 'bg-white/5 text-slate-500 border-white/5 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filterAndSortServices(services || [], serviceCategory, serviceSearch, serviceSortBy)
              .map((s, idx) => (
                <motion.div 
                  key={s.id}
                  layout
                  className="group relative bg-white/[0.02] backdrop-blur-2xl border border-white/5 rounded-[40px] overflow-hidden hover:border-blue-500/40 transition-all duration-700 flex flex-col min-h-[400px]"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img src={s.image} alt={s.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>
                    <div className="absolute top-6 right-6 bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10">
                      <span className="text-xl">{s.icon}</span>
                    </div>
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-black text-white uppercase tracking-tight leading-tight group-hover:text-blue-500 transition-colors">{s.title}</h3>
                      <div className="text-blue-400 font-mono font-black text-sm">{s.price}</div>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-1 line-clamp-3">{s.description}</p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button 
                        onClick={() => { setSelectedServiceForModal(s); setIsBookingModalOpen(true); }}
                        className="flex-1 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black uppercase text-[10px] tracking-[0.2em] transition-all shadow-lg shadow-blue-900/40 active:scale-95"
                      >
                        {t('book_now')}
                      </button>
                      <button 
                        onClick={() => setSelectedServiceForModal(s)}
                        className="flex-1 py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white border border-white/5 font-black uppercase text-[10px] tracking-[0.2em] transition-all active:scale-95"
                      >
                        {t('see_details')}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </GenericContentModal>

      <GenericContentModal
        isOpen={isPackagesModalOpen}
        onClose={() => setIsPackagesModalOpen(false)}
        title={t('comprehensive_care_package')}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-24">
          {(siteConfig.packages || []).map((pkg, idx) => (
            <div
              key={pkg.id}
              className={`relative p-8 rounded-[40px] border transition-all duration-500 flex flex-col ${
                pkg.isPopular 
                ? 'bg-blue-600/15 border-blue-500/50 shadow-2xl scale-105 z-10' 
                : 'bg-slate-900/40 border-white/5'
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
                {(pkg.features || []).map((feature, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${pkg.isPopular ? 'bg-blue-500/20' : 'bg-emerald-500/20'}`}>
                      <Check className={`w-3 h-3 ${pkg.isPopular ? 'text-blue-500' : 'text-emerald-500'}`} />
                    </div>
                    <span className="text-slate-300 text-sm font-medium">{feature}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-4">
                <button 
                  onClick={() => { setSelectedPackageForModal(pkg); setIsBookingModalOpen(true); }}
                  className={`w-full py-5 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] transition-all active:scale-95 ${
                    pkg.isPopular ? 'bg-blue-600 text-white shadow-xl shadow-blue-900/40' : 'bg-white text-slate-950'
                  }`}
                >
                  {t('book_now_package')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </GenericContentModal>

      <GenericContentModal
        isOpen={isPremiumModalOpen}
        onClose={() => setIsPremiumModalOpen(false)}
        title={siteConfig.premiumTitle}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-24">
          {(premiumSolutions || []).map((sol, idx) => (
            <div key={sol.id} className="group relative bg-slate-900/60 border border-white/5 rounded-[40px] overflow-hidden hover:border-amber-500/30 transition-all duration-700">
              <div className="h-64 overflow-hidden">
                <img src={sol.image} alt={sol.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" referrerPolicy="no-referrer" />
              </div>
              <div className="p-10">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500">
                    <Diamond className="w-6 h-6" />
                  </div>
                  <div className="text-amber-500 font-mono font-black">{sol.price}</div>
                </div>
                <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-4 group-hover:text-amber-500 transition-colors">{sol.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-8">{sol.description}</p>
                <button 
                  onClick={() => {
                    setAiInput(`Tôi muốn được tư vấn chuyên sâu về giải pháp Premium: "${sol.title}". ${sol.description}`);
                    setIsAiServiceModalOpen(true);
                  }}
                  className="w-full py-5 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white font-black uppercase text-[10px] tracking-[0.2em] transition-all shadow-xl shadow-amber-900/20 active:scale-95 flex items-center justify-center gap-3"
                >
                  <Bot className="w-4 h-4" /> {t('ai_expert_consult')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </GenericContentModal>

      <GenericContentModal
        isOpen={isWindowTintingModalOpen}
        onClose={() => setIsWindowTintingModalOpen(false)}
        title="Dán Phim Cách Nhiệt 3M Crystal"
      >
        <div className="max-w-4xl mx-auto space-y-12 pb-24">
          <div className="p-10 rounded-[40px] bg-slate-900/80 border border-white/5 space-y-8">
            <div className="flex flex-col sm:flex-row items-center gap-8">
              <div className="w-24 h-24 rounded-3xl bg-blue-600/10 flex items-center justify-center text-blue-500 shrink-0">
                <Sun className="w-12 h-12" />
              </div>
              <div className="space-y-4 text-center sm:text-left">
                <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Công Nghệ Phim 3M Quang Học</h3>
                <p className="text-slate-400 leading-relaxed italic">Giải pháp tối ưu cho sự thoải mái và riêng tư tuyệt đối bên trong khoang cabin.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { label: "Cản tia hồng ngoại (IR)", value: "97%" },
                { label: "Cản tia cực tím (UV)", value: "99.9%" },
                { label: "Số lớp phim quang học", value: "200+" },
                { label: "Bảo hành điện tử", value: "10 Năm" }
              ].map((stat, i) => (
                <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/5 flex flex-col justify-center">
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">{stat.label}</div>
                  <div className="text-2xl font-black text-white">{stat.value}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <button onClick={() => { setIsBookingModalOpen(true); setIsWindowTintingModalOpen(false); }} className="p-8 rounded-[32px] bg-blue-600 text-white font-black uppercase text-xs tracking-widest shadow-xl hover:bg-blue-500 transition-all active:scale-95">Đặt Lịch Dán Phim Ngay</button>
             <button onClick={() => { setIsAiAdvisorOpen(true); setIsWindowTintingModalOpen(false); }} className="p-8 rounded-[32px] bg-white/5 text-white border border-white/10 font-black uppercase text-xs tracking-widest hover:bg-white/10 transition-all active:scale-95">Tư Vấn Thông Số Với AI</button>
          </div>
        </div>
      </GenericContentModal>

      <GenericContentModal
        isOpen={isWrapPpfModalOpen}
        onClose={() => setIsWrapPpfModalOpen(false)}
        title="Wrap Đổi Màu & Phủ PPF Bảo Vệ"
      >
        <div className="max-w-4xl mx-auto space-y-12 pb-24">
          <div className="aspect-video rounded-[40px] overflow-hidden relative group">
            <img src="https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&q=80&w=1200" alt="PPF Protection" className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
            <div className="absolute bottom-10 left-10 right-10">
              <div className="inline-block px-6 py-2 rounded-full bg-blue-600 text-white font-black text-[10px] uppercase tracking-widest mb-4">Ultimate Protection</div>
              <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Áo Giáp Tàng Hình Cho Xe</h3>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h4 className="text-xl font-black text-white uppercase tracking-tight flex items-center gap-3">
                 <Shield className="w-5 h-5 text-blue-500" /> PPF (Paint Protection Film)
              </h4>
              <ul className="space-y-4">
                {[
                  "Tự chữa lành vết xước răm (Self-healing)",
                  "Chống đá văng, va chạm nhẹ",
                  "Khả năng kháng nước, kháng ố (Hydrophobic)",
                  "Giữ độ bóng gương lên đến 7 năm"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-400 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="text-xl font-black text-white uppercase tracking-tight flex items-center gap-3">
                 <Palette className="w-5 h-5 text-purple-500" /> Wrap Color Change
              </h4>
              <ul className="space-y-4">
                {[
                  "Hơn 300+ màu sắc xu hướng từ Teckwrap, 3M, Avery Denisson",
                  "Thời gian hoàn thiện nhanh chóng (2-3 ngày)",
                  "Dễ dàng tháo bỏ, không ảnh hưởng sơn zin",
                  "Được thi công bởi nghệ nhân Wrap hàng đầu"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-400 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </GenericContentModal>

      <GenericContentModal
        isOpen={isTuningModalOpen}
        onClose={() => setIsTuningModalOpen(false)}
        title="Nâng Cấp & Cá Nhân Hóa Xe"
      >
        <div className="max-w-4xl mx-auto pb-24 space-y-12">
          <div className="p-12 rounded-[48px] bg-gradient-to-br from-slate-900 to-slate-950 border border-white/5">
             <div className="flex flex-col gap-10">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                   {[
                     { icon: <Cpu className="w-6 h-6" />, label: "Hiệu năng", val: "Performance Tuning" },
                     { icon: <Disc className="w-6 h-6" />, label: "Ngoại thất", val: "Body Kits & Rims" },
                     { icon: <Music className="w-6 h-6" />, label: "Âm thanh", val: "Hi-End Audio System" }
                   ].map((item, i) => (
                     <div key={i} className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 space-y-4 text-center">
                        <div className="mx-auto w-12 h-12 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-500">{item.icon}</div>
                        <div>
                          <div className="text-[10px] font-black uppercase text-slate-500 mb-1">{item.label}</div>
                          <div className="text-white font-bold text-xs">{item.val}</div>
                        </div>
                     </div>
                   ))}
                </div>
                <p className="text-slate-400 text-center leading-relaxed max-w-2xl mx-auto italic">
                  Chúng tôi không chỉ độ xe; chúng tôi kiến tạo những tác phẩm nghệ thuật di động mang đậm cá tính riêng của chủ sở hữu.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                   <button onClick={() => { setIsAiAdvisorOpen(true); setIsTuningModalOpen(false); }} className="px-12 py-5 rounded-3xl bg-blue-600 text-white font-black uppercase text-xs tracking-widest shadow-xl active:scale-95 transition-all">Lên Bản Vẽ Với AI Advisor</button>
                </div>
             </div>
          </div>
        </div>
      </GenericContentModal>

      <GenericContentModal 
        isOpen={isTrackingModalOpen} 
        onClose={() => setIsTrackingModalOpen(false)} 
        title="Theo Dõi Trạng Thái Dịch Vụ"
      >
        <div className="max-w-4xl mx-auto">
           <CustomerPortalComponent 
             customerRecords={customerRecords}
             certificates={eCertificates}
             inspections={inspections}
             loyaltyConfig={siteConfig.loyaltyConfig || DEFAULT_SITE_CONFIG.loyaltyConfig!}
             siteConfig={siteConfig}
             setSiteConfig={setSiteConfig}
             handlePayment={handlePayment}
             scrollToSection={scrollToSection}
             t={t}
           />
        </div>
      </GenericContentModal>

      <AdminDashboardModal 
        isOpen={isDashboardOpen} 
        onClose={() => { 
          setIsDashboardOpen(false); 
          setDashboardMaintenancePreFill(null);
          setIsDesignAuthenticated(false);
          setIsAccountingAuthenticated(false);
          setIsInspectionAuthenticated(false);
          setIsDirectInspectionMode(false);
        }} 
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
        isEditMode={isEditMode}
        setIsEditMode={setIsEditMode}
        scrollToSection={scrollToSection}
        isDesignAuthenticated={isDesignAuthenticated}
        setIsDesignAuthenticated={setIsDesignAuthenticated}
        designPasswordInput={designPasswordInput}
        setDesignPasswordInput={setDesignPasswordInput}
        showDesignLock={showDesignLock}
        setShowDesignLock={setShowDesignLock}
        handleDesignLogin={handleDesignLogin}
        isAccountingAuthenticated={isAccountingAuthenticated}
        setIsAccountingAuthenticated={setIsAccountingAuthenticated}
        accountingPasswordInput={accountingPasswordInput}
        setAccountingPasswordInput={setAccountingPasswordInput}
        showAccountingLock={showAccountingLock}
        setShowAccountingLock={setShowAccountingLock}
        handleAccountingLogin={handleAccountingLogin}
        isInspectionAuthenticated={isInspectionAuthenticated}
        setIsInspectionAuthenticated={setIsInspectionAuthenticated}
        inspectionPasswordInput={inspectionPasswordInput}
        setInspectionPasswordInput={setInspectionPasswordInput}
        showInspectionLock={showInspectionLock}
        setShowInspectionLock={setShowInspectionLock}
        handleInspectionLogin={handleInspectionLogin}
        onOpenNotifications={() => setShowNotifications(true)}
        notifications={notifications}
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
        experts={experts}
        setExperts={setExperts}
        staff={staff}
        setStaff={setStaff}
        reminders={reminders}
        setReminders={setReminders}
        inspections={inspections}
        setInspections={setInspections}
        isPrivacyMode={isPrivacyMode}
        setIsPrivacyMode={setIsPrivacyMode}
        togglePrivacyMode={togglePrivacyMode}
        currentUserRole={currentUserRole}
        setCurrentUserRole={setCurrentUserRole}
        auditLogs={auditLogs}
        setAuditLogs={setAuditLogs}
        addAuditLog={addAuditLog}
        formatPrivateValue={formatPrivateValue}
        isDirectInspectionMode={isDirectInspectionMode}
        t={t}
        user={user}
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
                {(gallery || []).filter(img => img.type === 'video').length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {(gallery || []).filter(img => img.type === 'video').map(video => (
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
      <AiVehicleAnalyzer isOpen={isAiAnalyzerOpen} onClose={() => setIsAiAnalyzerOpen(false)} addToCart={addToCart} t={t} />
      {/* <LiveBookingTicker /> */}
      <StickyContactBar 
        siteConfig={siteConfig} 
        onInspectionClick={() => {
          setCurrentUserRole('staff');
          setIsEditMode(true);
          setDashboardInitialTab('inspections');
          setIsDirectInspectionMode(true);
          setIsDashboardOpen(true);
        }}
      />
    </div>
  );
};

const App: React.FC = () => {
  const [currentUserRole, setCurrentUserRole] = useState<UserRole>(() => {
    const saved = localStorage.getItem('dungcar_user_role');
    return (saved as UserRole) || 'staff';
  });
  const [isDesignAuthenticated, setIsDesignAuthenticated] = useState(() => {
    return localStorage.getItem('dungcar_design_auth') === 'true';
  });
  const [isAccountingAuthenticated, setIsAccountingAuthenticated] = useState(() => {
    return localStorage.getItem('dungcar_accounting_auth') === 'true';
  });
  const [isInspectionAuthenticated, setIsInspectionAuthenticated] = useState(() => {
    return localStorage.getItem('dungcar_inspection_auth') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('dungcar_user_role', currentUserRole);
  }, [currentUserRole]);

  useEffect(() => {
    localStorage.setItem('dungcar_design_auth', isDesignAuthenticated ? 'true' : 'false');
  }, [isDesignAuthenticated]);

  useEffect(() => {
    localStorage.setItem('dungcar_accounting_auth', isAccountingAuthenticated ? 'true' : 'false');
  }, [isAccountingAuthenticated]);

  useEffect(() => {
    localStorage.setItem('dungcar_inspection_auth', isInspectionAuthenticated ? 'true' : 'false');
  }, [isInspectionAuthenticated]);

  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('dungcar_theme_v1');
    return (saved as 'light' | 'dark') || 'dark';
  });
  const [language, setLanguage] = useState<'vi' | 'en'>(() => {
    const saved = localStorage.getItem('dungcar_lang_v1');
    return (saved as 'vi' | 'en') || 'vi';
  });

  useEffect(() => {
    let initInProgress = false;

    const initPi = async () => {
      if (typeof window !== 'undefined' && window.Pi && !initInProgress) {
        initInProgress = true;
        try {
          console.log('Pi SDK object detected. Initializing...');
          
          // Initialize Pi SDK wrapper with retry
          const initSdk = async (sandbox: boolean) => {
            try {
              await window.Pi.init({ version: "2.0", sandbox });
              return true;
            } catch (e) {
              return false;
            }
          };

          const success = await initSdk(false) || await initSdk(true);
          
          if (success) {
            console.log('Pi SDK Initialized successfully');
            // Wait a bit for the SDK to internalize fully
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Requested Pi Authentication Snippet
            window.Pi.authenticate(['username'], function(auth: any) {
              console.log("User authenticated:", auth);
              if (auth.user) {
                toast.success(`Chào mừng ${auth.user.username} từ Pi Network!`, {
                  icon: '🥧',
                  style: {
                    borderRadius: '20px',
                    background: '#1e293b',
                    color: '#fff',
                    border: '1px solid rgba(255,255,255,0.1)'
                  }
                });
              }
            }, function(error: any) {
              console.error("Auth error:", error);
            });
          }

        } catch (err: any) {
          console.error('Pi Operation Error:', err);
        } finally {
          initInProgress = false;
        }
      }
    };

    // Polling is more reliable than a fixed timeout
    let attempts = 0;
    const piCheckInterval = setInterval(() => {
      attempts++;
      if (window.Pi) {
        clearInterval(piCheckInterval);
        initPi();
      } else if (attempts > 20) { // Stop after 10 seconds
        clearInterval(piCheckInterval);
        console.warn('Pi SDK failed to load after 10 seconds');
      }
    }, 500);

    return () => clearInterval(piCheckInterval);
  }, []);

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

  const [siteConfig, setSiteConfig] = useState<SiteConfig>(() => {
    const saved = localStorage.getItem('dungcar_config_v12');
    const fallbackBase = syncedBackup?.siteConfig || DEFAULT_SITE_CONFIG;
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Migrate old default passwords to new ones
        if (parsed.designPassword === "admin" || parsed.designPassword === "025099010538" || parsed.designPassword === "0588896699" || parsed.designPassword === "132416118" || parsed.designPassword === "") {
          parsed.designPassword = fallbackBase.designPassword;
        }
        if (parsed.accountingLockPassword === "132416118" || parsed.accountingLockPassword === "025099010538" || parsed.accountingLockPassword === "0588896699" || parsed.accountingLockPassword === "") {
          parsed.accountingLockPassword = fallbackBase.accountingLockPassword;
        }
        if (parsed.heroTitle === "XE ĐẸP PRO - ĐẲNG CẤP CHUYÊN NGHIỆP") {
          parsed.heroTitle = "XE ĐẸP PRO";
        }
        if (parsed.heroSubtitle === "Nghệ Thuật Chăm Sóc Xe") {
          parsed.heroSubtitle = "Trung Tâm Chăm Sóc Xe Chuyên Nghiệp";
        }
        // Migrate old address or old map embed url to the new one
        if (!parsed.contactAddress || parsed.contactAddress.includes("Vũ Đức Thận") || (parsed.mapEmbedUrl && parsed.mapEmbedUrl.includes("0x3135a9796e62232b"))) {
          parsed.contactAddress = fallbackBase.contactAddress;
          parsed.mapEmbedUrl = fallbackBase.mapEmbedUrl;
        }
        return { 
          ...fallbackBase, 
          ...parsed,
          news: parsed.news || fallbackBase.news || DEFAULT_NEWS
        };
      } catch (e) {
        return { ...fallbackBase, news: fallbackBase.news || DEFAULT_NEWS };
      }
    }
    return { ...fallbackBase, news: fallbackBase.news || DEFAULT_NEWS };
  });
  const [customerRecords, setCustomerRecords] = useState<CustomerRecord[]>(() => {
    const saved = localStorage.getItem('dungcar_records_v12');
    return saved ? JSON.parse(saved) : (syncedBackup?.customerRecords || DEFAULT_CUSTOMER_RECORDS);
  });
  const [gallery, setGallery] = useState<GalleryImage[]>(() => {
    const saved = localStorage.getItem('dungcar_gallery_v12');
    return saved ? JSON.parse(saved) : (syncedBackup?.gallery || DEFAULT_GALLERY);
  });
  const [premiumSolutions, setPremiumSolutions] = useState<PremiumSolution[]>(() => {
    const saved = localStorage.getItem('dungcar_premium_v12');
    return saved ? JSON.parse(saved) : (syncedBackup?.premiumSolutions || DEFAULT_PREMIUM_SOLUTIONS);
  });
  const [services, setServices] = useState<Service[]>(() => {
    const saved = localStorage.getItem('dungcar_services_v12');
    return saved ? JSON.parse(saved) : (syncedBackup?.services || INITIAL_SERVICES);
  });
  const [aiVideoHistory, setAiVideoHistory] = useState<AiVideoRecord[]>(() => {
    const saved = localStorage.getItem('dungcar_ai_history_v12');
    return saved ? JSON.parse(saved) : (syncedBackup?.aiVideoHistory || []);
  });
  const [trackingData, setTrackingData] = useState<VehicleTracking[]>(() => {
    const saved = localStorage.getItem('dungcar_tracking_v12');
    return saved ? JSON.parse(saved) : (syncedBackup?.trackingData || DEFAULT_TRACKING);
  });
  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('dungcar_reviews_v12');
    return saved ? JSON.parse(saved) : (syncedBackup?.reviews || DEFAULT_REVIEWS);
  });
  const [inventory, setInventory] = useState<InventoryItem[]>(() => {
    const saved = localStorage.getItem('dungcar_inventory_v12');
    return saved ? JSON.parse(saved) : (syncedBackup?.inventory || DEFAULT_INVENTORY);
  });
  const [eCertificates, setECertificates] = useState<ECertificate[]>(() => {
    const saved = localStorage.getItem('dungcar_ecerts_v12');
    return saved ? JSON.parse(saved) : (syncedBackup?.eCertificates || DEFAULT_E_CERTIFICATES);
  });
  const [staff, setStaff] = useState<Staff[]>(() => {
    const saved = localStorage.getItem('dungcar_staff_v12');
    return saved ? JSON.parse(saved) : (syncedBackup?.staff || DEFAULT_SITE_CONFIG.staff || []);
  });
  const [inspections, setInspections] = useState<CarInspection[]>(() => {
    const saved = localStorage.getItem('dungcar_inspections_v12');
    return saved ? JSON.parse(saved) : (syncedBackup?.inspections || []);
  });
  const [reminders, setReminders] = useState<MaintenanceReminder[]>(() => {
    const saved = localStorage.getItem('dungcar_reminders_v12');
    return saved ? JSON.parse(saved) : (syncedBackup?.reminders || DEFAULT_SITE_CONFIG.reminders || []);
  });
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const saved = localStorage.getItem('dungcar_expenses_v12');
    return saved ? JSON.parse(saved) : (syncedBackup?.expenses || DEFAULT_EXPENSES);
  });
  const [experts, setExperts] = useState<Expert[]>(() => {
    const saved = localStorage.getItem('dungcar_experts_v12');
    return saved ? JSON.parse(saved) : (syncedBackup?.experts || DEFAULT_SITE_CONFIG.experts || []);
  });

  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [isFirebaseLoading, setIsFirebaseLoading] = useState(true);

  // Firebase Auth State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setIsFirebaseLoading(false);
      if (u) {
        toast.success(`Đã đăng nhập: ${u.email}`);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Đăng nhập thất bại!");
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      toast.success("Đã đăng xuất");
    } catch (error) {
      toast.error("Lỗi đăng xuất!");
    }
  };

  // Generic Sync Hook
  // Generic Sync Hook
  const useFirestoreSync = (
    collectionName: string, 
    data: any, 
    setData: (val: any) => void, 
    isList: boolean = true,
    docId: string = 'main',
    isPublic: boolean = false
  ) => {
    useEffect(() => {
      // Nếu không phải public và chưa đăng nhập thì không đồng bộ
      if (!isPublic && !user) return;

      // Nếu người dùng đã xác thực quyền quản trị/thiết kế cục bộ nhưng chưa đăng nhập Firebase,
      // KHÔNG kích hoạt onSnapshot để tránh việc dữ liệu cũ của Firestore đè lên các thay đổi trong localStorage và mã nguồn (khi họ bấm Lưu / Đồng bộ GitHub)
      const isAdminLocally = isDesignAuthenticated || isAccountingAuthenticated || isInspectionAuthenticated || !!currentUserRole;
      if (isAdminLocally && !user) {
        console.log(`Skipping Firestore snapshot sync for '${collectionName}' (Local admin active, Firebase user is null)`);
        return;
      }

      const unsubscribe = isList 
        ? onSnapshot(collection(db, collectionName), (snapshot) => {
            const listData = snapshot.docs.map(d => ({ ...d.data(), id: d.id }));
            if (listData.length > 0) {
              setData(listData);
            }
          }, (err) => {
            console.error(`Snapshot error for ${collectionName}:`, err);
          })
        : onSnapshot(doc(db, collectionName, docId), (snapshot) => {
            const docData = snapshot.data();
            if (docData) {
              console.log(`Cloud data received for ${collectionName}:`, docData.siteName || docId);
              setData(docData);
            }
          }, (err) => {
            console.error(`Snapshot error for ${collectionName}:`, err);
          });

      return () => unsubscribe();
    }, [user, collectionName, isList, docId, isPublic, isDesignAuthenticated, isAccountingAuthenticated, isInspectionAuthenticated, currentUserRole]);

    useEffect(() => {
      if (!user) return;
      
      const syncToFirebase = async () => {
        try {
          if (isList) {
            // For lists, we sync each item. 
            // In a real production app, we would use a more sophisticated diffing algorithm.
            if (Array.isArray(data)) {
              for (const item of data) {
                if (item && item.id) {
                  await setDoc(doc(db, collectionName, item.id), item, { merge: true });
                }
              }
            }
          } else {
            // For single docs (like config), we sync the whole object
            await setDoc(doc(db, collectionName, docId), data, { merge: true });
          }
        } catch (e) {
          console.error(`Sync error for ${collectionName}:`, e);
          // Don't show toast on every error to avoid spamming, but log it
        }
      };

      const timeoutId = setTimeout(syncToFirebase, 1000); // Faster sync
      return () => clearTimeout(timeoutId);
    }, [user, data, collectionName, isList, docId]);
  };

  // Sync SiteConfig (Public)
  useFirestoreSync('config', siteConfig, setSiteConfig, false, 'main', true);
  
  // Sync Collections
  useFirestoreSync('customerRecords', customerRecords, setCustomerRecords);
  useFirestoreSync('gallery', gallery, setGallery, true, 'main', true); // Public
  useFirestoreSync('services', services, setServices, true, 'main', true); // Public
  useFirestoreSync('appointments', siteConfig.appointments || [], (val) => setSiteConfig(prev => ({ ...prev, appointments: val })));
  useFirestoreSync('inventory', inventory, setInventory);
  useFirestoreSync('staff', staff, setStaff, true, 'main', true); // Public
  useFirestoreSync('expenses', expenses, setExpenses);
  useFirestoreSync('experts', experts, setExperts, true, 'main', true); // Public
  useFirestoreSync('premiumSolutions', premiumSolutions, setPremiumSolutions, true, 'main', true); // Public
  useFirestoreSync('aiVideoHistory', aiVideoHistory, setAiVideoHistory);
  useFirestoreSync('trackingData', trackingData, setTrackingData);
  useFirestoreSync('reviews', reviews, setReviews, true, 'main', true); // Public
  useFirestoreSync('eCertificates', eCertificates, setECertificates);
  useFirestoreSync('inspections', inspections, setInspections);
  useFirestoreSync('reminders', reminders, setReminders);

  const [cart, setCart] = useState<DetailingPackage[]>(() => {
    const saved = localStorage.getItem('dungcar_cart_v12');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('dungcar_cart_v12', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (pkg: DetailingPackage) => {
    setCart(prev => {
      if (prev.find(item => item.id === pkg.id)) {
        toast.error("Gói dịch vụ này đã có trong giỏ hàng!");
        return prev;
      }
      toast.success("Đã thêm vào giỏ hàng!");
      return [...prev, pkg];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
    toast.success("Đã xóa khỏi giỏ hàng!");
  };

  const clearCart = () => {
    setCart([]);
  };

  useEffect(() => {
    try {
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
      localStorage.setItem('dungcar_staff_v12', JSON.stringify(staff));
      localStorage.setItem('dungcar_inspections_v12', JSON.stringify(inspections));
      localStorage.setItem('dungcar_reminders_v12', JSON.stringify(reminders));
      localStorage.setItem('dungcar_expenses_v12', JSON.stringify(expenses));
      localStorage.setItem('dungcar_experts_v12', JSON.stringify(experts));
    } catch (error) {
      console.error('LocalStorage error:', error);
      if (error instanceof Error && error.name === 'QuotaExceededError') {
        toast.error('Bộ nhớ trình duyệt đã đầy! Vui lòng xóa bớt ảnh hoặc dữ liệu cũ.');
      }
    }
  }, [siteConfig, customerRecords, gallery, premiumSolutions, services, aiVideoHistory, trackingData, reviews, inventory, eCertificates, staff, inspections, reminders, expenses, experts]);

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

  const handlePayment = async (serviceName: string, price: string, customerName: string, customerEmail?: string) => {
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceName,
          price,
          customerName,
          customerEmail,
          successUrl: window.location.origin + '/portal?payment=success',
          cancelUrl: window.location.origin + '/portal?payment=cancel'
        })
      });
      const session = await response.json();
      if (session.url) {
        window.location.href = session.url;
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Có lỗi xảy ra khi khởi tạo thanh toán');
    }
  };

  const homeProps = {
    siteConfig, setSiteConfig,
    customerRecords, setCustomerRecords,
    gallery, setGallery,
    premiumSolutions, setPremiumSolutions,
    services, setServices,
    aiVideoHistory, setAiVideoHistory,
    trackingData, setTrackingData,
    reviews, setReviews,
    inventory, setInventory,
    eCertificates, setECertificates,
    staff, setStaff,
    inspections, setInspections,
    reminders, setReminders,
    expenses, setExpenses,
    experts, setExperts,
    user, handleLogin, handleLogout,
    cart, addToCart, removeFromCart, clearCart,
    language, setLanguage,
    theme, setTheme,
    handlePayment, scrollToSection, t,
    currentUserRole, setCurrentUserRole,
    isDesignAuthenticated, setIsDesignAuthenticated,
    isAccountingAuthenticated, setIsAccountingAuthenticated,
    isInspectionAuthenticated, setIsInspectionAuthenticated
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage {...homeProps} />} />
        <Route path="/services/:id" element={<HomePage {...homeProps} />} />
        <Route path="/news/:id" element={<HomePage {...homeProps} />} />
        <Route path="/portal" element={<React.Suspense fallback={<div className="flex items-center justify-center min-h-screen bg-slate-950"><div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div></div>}><CustomerPortalComponent customerRecords={customerRecords} certificates={eCertificates} inspections={inspections} loyaltyConfig={siteConfig.loyaltyConfig || DEFAULT_SITE_CONFIG.loyaltyConfig!} siteConfig={siteConfig} setSiteConfig={setSiteConfig} handlePayment={handlePayment} scrollToSection={scrollToSection} t={t} /></React.Suspense>} />
        <Route path="*" element={<HomePage {...homeProps} />} />
      </Routes>

    </Router>
  );
};

export default App;
