
import React, { useState, useRef, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Phone, Clock, ExternalLink, Copy, ChevronRight, Star, Shield, Zap, Award, CheckCircle2, Info, MessageSquare, Send, User, Calendar, Car, Tag, Plus, Trash2, Edit2, Save, X, Settings, LogOut, Menu, Search, Filter, ArrowRight, ArrowLeft, ArrowUp, Play, Pause, Volume2, VolumeX, Maximize2, Minimize2, Download, Share2, Heart, Eye, Clock3, Check, AlertCircle, HelpCircle, MoreVertical, MoreHorizontal, Grid, List, Layout, Image as ImageIcon, Video as VideoIcon, FileText, Settings2, Bell, UserCircle, LogIn, UserPlus, Mail, Lock, Smartphone, Globe, Facebook, Youtube, Instagram, Twitter, Linkedin, Github, Chrome, Compass, Map, Navigation, Layers, MousePointer2, Hand, ZoomIn, ZoomOut, RotateCcw, RotateCw, Trash, RefreshCw, CheckCircle, XCircle, Minus, Move, Square, Circle, Triangle, Type, PenTool, Eraser, Palette, Scissors, Copy as CopyIcon, Clipboard, Share, Upload, Camera, Mic, Music, Headphones, Monitor, Laptop, Tablet, Watch, Battery, Wifi, Bluetooth, Cloud, Sun, Moon, CloudRain, CloudLightning, Wind, Snowflake, Thermometer, Droplets, Flame, Zap as ZapIcon, Activity, Heart as HeartIcon, Target, Flag, Trophy, Medal, Briefcase, ShoppingBag, ShoppingCart, CreditCard, Wallet, Banknote, Coins, PieChart, BarChart, LineChart, TrendingUp, TrendingDown, Presentation, Book, Bookmark, BookOpen, GraduationCap, School, Building, Home, Warehouse, Factory, Truck, Bike, Plane, Ship, Anchor, LifeBuoy, MapPin as MapPinIcon, Map as MapIcon, Navigation2, Compass as CompassIcon, Locate, LocateFixed, Pin, MapPinOff, Phone as PhoneIcon, PhoneCall, PhoneForwarded, PhoneIncoming, PhoneMissed, PhoneOff, PhoneOutgoing, Video, VideoOff, MicOff, Speaker, Volume, Volume1, Mail as MailIcon, Inbox, Archive, Send as SendIcon, Paperclip, Link as LinkIcon, Link2, ExternalLink as ExternalLinkIcon, Share2 as Share2Icon, MessageCircle, MessageSquare as MessageSquareIcon, Hash, AtSign, User as UserIcon, Users, UserPlus as UserPlusIcon, UserMinus, UserCheck, UserX, Fingerprint, Key, Shield as ShieldIcon, ShieldCheck, ShieldAlert, ShieldOff, Lock as LockIcon, Unlock, Eye as EyeIcon, EyeOff, Search as SearchIcon, ZoomIn as ZoomInIcon, ZoomOut as ZoomOutIcon, Settings as SettingsIcon, Sliders, Bell as BellIcon, BellOff, Calendar as CalendarIcon, Clock as ClockIcon, History, Timer, Hourglass, AlarmClock, Watch as WatchIcon, Sun as SunIcon, Moon as MoonIcon, Cloud as CloudIcon, CloudRain as CloudRainIcon, CloudLightning as CloudLightningIcon, Wind as WindIcon, Snowflake as SnowflakeIcon, Thermometer as ThermometerIcon, Droplets as DropletsIcon, Flame as FlameIcon, Zap as ZapIcon2, Activity as ActivityIcon, Heart as HeartIcon2, Target as TargetIcon, Flag as FlagIcon, Trophy as TrophyIcon, Medal as MedalIcon, Briefcase as BriefcaseIcon, ShoppingBag as ShoppingBagIcon, ShoppingCart as ShoppingCartIcon, CreditCard as CreditCardIcon, Wallet as WalletIcon, Banknote as BanknoteIcon, Coins as CoinsIcon, PieChart as PieChartIcon, BarChart as BarChartIcon, LineChart as LineChartIcon, TrendingUp as TrendingUpIcon, TrendingDown as TrendingDownIcon, Presentation as PresentationIcon, Book as BookIcon, Bookmark as BookmarkIcon, BookOpen as BookOpenIcon, GraduationCap as GraduationCapIcon, School as SchoolIcon, Building as BuildingIcon, Home as HomeIcon, Warehouse as WarehouseIcon, Factory as FactoryIcon, Truck as TruckIcon, Bike as BikeIcon, Plane as PlaneIcon, Ship as ShipIcon, Anchor as AnchorIcon, LifeBuoy as LifeBuoyIcon, Sparkles } from 'lucide-react';
import { SERVICES as INITIAL_SERVICES, DEFAULT_GALLERY, DEFAULT_SITE_CONFIG, DEFAULT_CUSTOMER_RECORDS, DEFAULT_PREMIUM_SOLUTIONS } from './constants.tsx';
import { Service, Message, GalleryImage, SiteConfig, CustomerRecord, BookingData, PremiumSolution, Vehicle, VehicleServiceHistory, Promotion, AiVideoRecord } from './types.ts';
import { getAIResponse, editImageWithAI, generateImageWithAI, generateVideoWithAI, getMaintenanceAdvice } from './services/geminiService.ts';
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from 'react-markdown';

declare global {
  interface Window {
    aistudio: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }
}

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
  onSave: (newVal: string) => void; 
  className?: string; 
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  multiline?: boolean;
}> = ({ text, isEditMode, onSave, className, tag = 'p', multiline = false }) => {
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

  if (isEditMode && isEditing) {
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
      className={`relative group/edit ${isEditMode ? 'cursor-text hover:ring-2 hover:ring-blue-500/50 hover:bg-blue-500/5 p-1 rounded transition-all duration-300' : ''}`} 
      onClick={() => isEditMode && setIsEditing(true)}
    >
      <Tag className={`${className} transition-colors duration-300`}>
        {safeText.split('\n').map((line, i) => <React.Fragment key={i}>{line}{i < safeText.split('\n').length - 1 && <br/>}</React.Fragment>)}
      </Tag>
      {isEditMode && !isEditing && (
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
  onUpload: (base64: string) => void;
  className: string;
  alt: string;
}> = ({ src, isEditMode, onUpload, className, alt }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64 = await fileToBase64(file);
      onUpload(base64);
    }
  };

  return (
    <div className={`relative group/img ${className}`}>
      <img src={src} alt={alt} className="w-full h-full object-cover" />
      {isEditMode && (
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

const VehicleManagerModal: React.FC<{ 
  isOpen: boolean; 
  onClose: () => void; 
  vehicles: Vehicle[];
  setVehicles: React.Dispatch<React.SetStateAction<Vehicle[]>>;
  onMaintenanceAdvice?: (vehicle: Vehicle) => void;
}> = ({ isOpen, onClose, vehicles, setVehicles, onMaintenanceAdvice }) => {
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null);
  const [isAddingVehicle, setIsAddingVehicle] = useState(false);
  const [isEditingVehicle, setIsEditingVehicle] = useState(false);
  const [newVehicle, setNewVehicle] = useState<Partial<Vehicle>>({ make: '', model: '', year: '', licensePlate: '' });
  const [editingRecordId, setEditingRecordId] = useState<string | null>(null);
  const [editingRecord, setEditingRecord] = useState<Partial<VehicleServiceHistory>>({});

  if (!isOpen) return null;

  const selectedVehicle = vehicles.find(v => v.id === selectedVehicleId);

  const handleAddVehicle = () => {
    if (!newVehicle.make || !newVehicle.model) return;
    const vehicle: Vehicle = {
      id: Date.now().toString(),
      make: newVehicle.make!,
      model: newVehicle.model!,
      year: newVehicle.year || '',
      licensePlate: newVehicle.licensePlate || '',
      serviceHistory: []
    };
    setVehicles([...vehicles, vehicle]);
    setIsAddingVehicle(false);
    setNewVehicle({ make: '', model: '', year: '', licensePlate: '' });
    setSelectedVehicleId(vehicle.id);
  };

  const handleUpdateVehicle = () => {
    if (!selectedVehicleId || !newVehicle.make || !newVehicle.model) return;
    setVehicles(prev => prev.map(v => v.id === selectedVehicleId ? { 
      ...v, 
      make: newVehicle.make!, 
      model: newVehicle.model!, 
      year: newVehicle.year || '', 
      licensePlate: newVehicle.licensePlate || '' 
    } : v));
    setIsEditingVehicle(false);
    setNewVehicle({ make: '', model: '', year: '', licensePlate: '' });
  };

  const handleStartEditVehicle = (vehicle: Vehicle) => {
    setNewVehicle({ make: vehicle.make, model: vehicle.model, year: vehicle.year, licensePlate: vehicle.licensePlate });
    setIsEditingVehicle(true);
    setIsAddingVehicle(false);
  };

  const handleAddServiceRecord = (vehicleId: string) => {
    const serviceName = prompt("Tên dịch vụ:");
    if (!serviceName) return;
    const cost = prompt("Chi phí (VD: 500.000 VNĐ):") || '0 VNĐ';
    const record: VehicleServiceHistory = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      serviceName,
      cost
    };
    setVehicles(prev => prev.map(v => v.id === vehicleId ? { ...v, serviceHistory: [record, ...v.serviceHistory] } : v));
  };

  const handleUpdateServiceRecord = (vehicleId: string) => {
    if (!editingRecordId || !editingRecord.serviceName) return;
    setVehicles(prev => prev.map(v => v.id === vehicleId ? { 
      ...v, 
      serviceHistory: v.serviceHistory.map(r => r.id === editingRecordId ? { ...r, ...editingRecord as VehicleServiceHistory } : r) 
    } : v));
    setEditingRecordId(null);
    setEditingRecord({});
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-slate-900 border border-white/10 p-8 rounded-[40px] max-w-4xl w-full h-[80vh] flex flex-col relative shadow-3xl overflow-hidden"
          >
            <button onClick={onClose} className="absolute top-6 right-8 text-slate-500 hover:text-white transition-colors text-xl">✕</button>
            <h3 className="text-3xl font-black text-white mb-8 uppercase tracking-tighter">Gara Của Tôi</h3>
            
            <div className="flex-1 flex flex-col md:flex-row gap-8 overflow-hidden">
              <div className="w-full md:w-72 flex flex-col gap-4 overflow-y-auto no-scrollbar pr-2 border-r border-white/5">
                <button 
                  onClick={() => { setIsAddingVehicle(true); setIsEditingVehicle(false); setNewVehicle({ make: '', model: '', year: '', licensePlate: '' }); }}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white p-4 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-lg transition-all active:scale-95"
                >
                  ➕ Thêm Xe Mới
                </button>
                {vehicles.map(v => (
                  <button 
                    key={v.id}
                    onClick={() => { setSelectedVehicleId(v.id); setIsAddingVehicle(false); setIsEditingVehicle(false); }}
                    className={`w-full text-left p-5 rounded-2xl transition-all duration-300 border group ${
                      selectedVehicleId === v.id 
                        ? 'bg-blue-600 border-blue-400 shadow-2xl shadow-blue-900/40 translate-x-2' 
                        : 'bg-slate-950/50 border-white/5 hover:bg-slate-800 hover:border-blue-500/30 hover:translate-x-1'
                    }`}
                  >
                    <div className={`font-black uppercase text-sm transition-colors ${selectedVehicleId === v.id ? 'text-white' : 'text-slate-200 group-hover:text-white'}`}>{v.make} {v.model}</div>
                    <div className={`text-[10px] font-bold transition-colors ${selectedVehicleId === v.id ? 'text-blue-100' : 'text-slate-500 group-hover:text-blue-400'}`}>{v.licensePlate || 'Chưa có biển số'}</div>
                  </button>
                ))}
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
                {(isAddingVehicle || isEditingVehicle) ? (
                  <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                    <h4 className="text-xl font-black text-white uppercase tracking-tight">{isEditingVehicle ? 'Sửa Thông Tin Xe' : 'Thông Tin Xe Mới'}</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase">Hãng Xe</label>
                        <input value={newVehicle.make} onChange={e => setNewVehicle({...newVehicle, make: e.target.value})} placeholder="VD: Toyota" className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase">Dòng Xe</label>
                        <input value={newVehicle.model} onChange={e => setNewVehicle({...newVehicle, model: e.target.value})} placeholder="VD: Camry" className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase">Năm Sản Xuất</label>
                        <input value={newVehicle.year} onChange={e => setNewVehicle({...newVehicle, year: e.target.value})} placeholder="VD: 2022" className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase">Biển Số</label>
                        <input value={newVehicle.licensePlate} onChange={e => setNewVehicle({...newVehicle, licensePlate: e.target.value})} placeholder="VD: 30A-123.45" className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white" />
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <button onClick={isEditingVehicle ? handleUpdateVehicle : handleAddVehicle} className="flex-1 bg-blue-600 text-white p-4 rounded-xl font-black uppercase">{isEditingVehicle ? 'Cập Nhật' : 'Lưu Xe'}</button>
                      <button onClick={() => { setIsAddingVehicle(false); setIsEditingVehicle(false); }} className="flex-1 bg-slate-800 text-slate-400 p-4 rounded-xl font-black uppercase">Hủy</button>
                    </div>
                  </div>
                ) : selectedVehicle ? (
                  <div className="space-y-8 animate-in fade-in">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-3xl font-black text-white uppercase tracking-tighter">{selectedVehicle.make} {selectedVehicle.model}</h4>
                        <p className="text-blue-500 font-bold tracking-widest uppercase text-xs">{selectedVehicle.licensePlate} • {selectedVehicle.year}</p>
                      </div>
                      <div className="flex gap-4">
                        <button 
                          onClick={() => {
                            if (onMaintenanceAdvice) onMaintenanceAdvice(selectedVehicle);
                          }}
                          className="bg-blue-600/10 text-blue-500 hover:bg-blue-600 hover:text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border border-blue-500/30 flex items-center gap-2"
                        >
                          <span>✨</span> Tư vấn AI
                        </button>
                        <button 
                          onClick={() => handleStartEditVehicle(selectedVehicle)}
                          className="text-blue-500 hover:text-blue-400 text-[10px] font-black uppercase tracking-widest"
                        >
                          Sửa
                        </button>
                        <button 
                          onClick={() => confirm("Xóa xe này?") && (setVehicles(vehicles.filter(v => v.id !== selectedVehicle.id)), setSelectedVehicleId(null))}
                          className="text-red-500 hover:text-red-400 text-[10px] font-black uppercase tracking-widest"
                        >
                          Xóa
                        </button>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <h5 className="text-sm font-black text-slate-400 uppercase tracking-widest">Lịch Sử Bảo Dưỡng</h5>
                        <button onClick={() => handleAddServiceRecord(selectedVehicle.id)} className="text-blue-500 hover:text-blue-400 text-[10px] font-black uppercase tracking-widest">➕ Thêm Bản Ghi</button>
                      </div>
                      
                      <div className="space-y-4">
                        {selectedVehicle.serviceHistory.length > 0 ? selectedVehicle.serviceHistory.map(record => (
                          <div key={record.id} className="bg-slate-950/50 border border-white/5 p-5 rounded-2xl flex justify-between items-center group hover:border-blue-500/30 transition-all">
                            {editingRecordId === record.id ? (
                              <div className="flex-1 flex gap-4 items-end">
                                <div className="flex-1 space-y-2">
                                  <input 
                                    value={editingRecord.serviceName} 
                                    onChange={e => setEditingRecord({...editingRecord, serviceName: e.target.value})}
                                    className="w-full bg-slate-900 border border-white/10 rounded-lg p-2 text-white text-xs"
                                  />
                                  <input 
                                    value={editingRecord.cost} 
                                    onChange={e => setEditingRecord({...editingRecord, cost: e.target.value})}
                                    className="w-full bg-slate-900 border border-white/10 rounded-lg p-2 text-blue-400 text-xs font-bold"
                                  />
                                </div>
                                <div className="flex gap-2">
                                  <button onClick={() => handleUpdateServiceRecord(selectedVehicle.id)} className="bg-blue-600 text-white px-3 py-1 rounded-lg text-[10px] font-black uppercase">Lưu</button>
                                  <button onClick={() => setEditingRecordId(null)} className="bg-slate-800 text-slate-400 px-3 py-1 rounded-lg text-[10px] font-black uppercase">Hủy</button>
                                </div>
                              </div>
                            ) : (
                              <>
                                <div>
                                  <div className="text-white font-bold text-sm">{record.serviceName}</div>
                                  <div className="text-slate-500 text-[10px] font-medium">{record.date}</div>
                                </div>
                                <div className="text-right flex flex-col items-end gap-2">
                                  <div className="text-blue-400 font-black text-sm">{record.cost}</div>
                                  <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-all">
                                    <button 
                                      onClick={() => { setEditingRecordId(record.id); setEditingRecord(record); }}
                                      className="text-[8px] text-blue-500 uppercase font-black"
                                    >
                                      Sửa
                                    </button>
                                    <button 
                                      onClick={() => setVehicles(prev => prev.map(v => v.id === selectedVehicle.id ? { ...v, serviceHistory: v.serviceHistory.filter(r => r.id !== record.id) } : v))}
                                      className="text-[8px] text-red-500 uppercase font-black"
                                    >
                                      Xóa
                                    </button>
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        )) : (
                          <div className="text-center py-12 bg-slate-950/20 rounded-3xl border border-dashed border-white/5">
                            <p className="text-slate-600 text-xs font-medium italic">Chưa có lịch sử bảo dưỡng cho xe này.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-40">
                    <div className="text-6xl">🚗</div>
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Chọn một chiếc xe hoặc thêm xe mới để quản lý</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const BookingModal: React.FC<{ 
  isOpen: boolean; 
  onClose: () => void; 
  services: Service[];
  vehicles: Vehicle[];
  siteConfig: SiteConfig;
}> = ({ isOpen, onClose, services, vehicles, siteConfig }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [errors, setErrors] = useState<{ phone?: string; email?: string }>({});
  const [formData, setFormData] = useState<BookingData>({
    name: '', phone: '', email: '', carModel: '', serviceId: services[0]?.id || '', date: '', note: ''
  });

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: { phone?: string; email?: string } = {};
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
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSending(true);
    const serviceTitle = services.find(s => s.id === formData.serviceId)?.title || 'Chưa chọn';
    const subject = `[ĐẶT LỊCH ${siteConfig.siteName.toUpperCase()}] - ${formData.name}`;
    
    const adminHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">Yêu cầu đặt lịch mới</h2>
        <p><strong>Họ tên:</strong> ${formData.name}</p>
        <p><strong>SĐT:</strong> ${formData.phone}</p>
        <p><strong>Email:</strong> ${formData.email || 'Không cung cấp'}</p>
        <p><strong>Dòng xe:</strong> ${formData.carModel}</p>
        <p><strong>Dịch vụ:</strong> ${serviceTitle}</p>
        <p><strong>Ngày:</strong> ${formData.date}</p>
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
          <p style="margin: 5px 0;"><strong>Dịch vụ:</strong> ${serviceTitle}</p>
          <p style="margin: 5px 0;"><strong>Ngày hẹn:</strong> ${formData.date}</p>
          <p style="margin: 5px 0;"><strong>Dòng xe:</strong> ${formData.carModel}</p>
        </div>
        <p>Nhân viên của chúng tôi sẽ liên hệ lại với bạn qua số điện thoại <strong>${formData.phone}</strong> để xác nhận lịch hẹn trong thời gian sớm nhất.</p>
        <p>Trân trọng,<br/>Đội ngũ ${siteConfig.siteName}</p>
      </div>
    `;
    
    try {
      // Send to Admin
      await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: siteConfig.contactEmail || 'carwash68.vn@gmail.com',
          subject: subject,
          html: adminHtml
        })
      });

      // Send to Customer if email provided
      if (formData.email) {
        await fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: formData.email,
            subject: `[XÁC NHẬN] Đặt lịch thành công tại ${siteConfig.siteName}`,
            html: customerHtml
          })
        });
      }
      
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error sending email:", error);
      // Fallback to mailto
      const body = `Họ tên: ${formData.name}\nSĐT: ${formData.phone}\nEmail: ${formData.email}\nDòng xe: ${formData.carModel}\nDịch vụ: ${serviceTitle}\nNgày: ${formData.date}\nGhi chú: ${formData.note}`;
      window.location.href = `mailto:${siteConfig.contactEmail || 'carwash68.vn@gmail.com'}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setIsSubmitted(true);
    } finally {
      setIsSending(false);
    }
  };

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
            className="bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl max-w-md w-full relative"
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors">✕</button>
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-2xl font-black text-white text-center mb-6 uppercase">Đặt Lịch Chăm Sóc</h3>
                
                {vehicles.length > 0 && (
                  <div className="space-y-2 mb-4">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Chọn xe từ Gara</label>
                    <select 
                      className="w-full bg-blue-600/10 border border-blue-500/20 rounded-xl px-4 py-3 text-blue-400 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      onChange={(e) => {
                        const v = vehicles.find(veh => veh.id === e.target.value);
                        if (v) setFormData({...formData, carModel: `${v.make} ${v.model} (${v.licensePlate})`});
                      }}
                    >
                      <option value="">-- Chọn xe của bạn --</option>
                      {vehicles.map(v => (
                        <option key={v.id} value={v.id}>{v.make} {v.model} - {v.licensePlate}</option>
                      ))}
                    </select>
                  </div>
                )}

                <input required type="text" placeholder="Họ tên" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <input 
                      required 
                      type="tel" 
                      placeholder="Số điện thoại" 
                      value={formData.phone} 
                      onChange={e => {
                        setFormData({...formData, phone: e.target.value});
                        if (errors.phone) setErrors({...errors, phone: undefined});
                      }} 
                      className={`w-full bg-slate-950 border ${errors.phone ? 'border-red-500' : 'border-slate-800'} rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all`} 
                    />
                    {errors.phone && <p className="text-[9px] text-red-500 font-bold ml-1">{errors.phone}</p>}
                  </div>
                  <div className="space-y-1">
                    <input 
                      type="email" 
                      placeholder="Email (để nhận xác nhận)" 
                      value={formData.email} 
                      onChange={e => {
                        setFormData({...formData, email: e.target.value});
                        if (errors.email) setErrors({...errors, email: undefined});
                      }} 
                      className={`w-full bg-slate-950 border ${errors.email ? 'border-red-500' : 'border-slate-800'} rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all`} 
                    />
                    {errors.email && <p className="text-[9px] text-red-500 font-bold ml-1">{errors.email}</p>}
                  </div>
                </div>
                <input type="text" placeholder="Dòng xe (VD: Porsche 911)" value={formData.carModel} onChange={e => setFormData({...formData, carModel: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                <select value={formData.serviceId} onChange={e => setFormData({...formData, serviceId: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all">
                  {services.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
                </select>
                <input required type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                <textarea placeholder="Ghi chú thêm về xe..." value={formData.note} onChange={e => setFormData({...formData, note: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white h-24 resize-none focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                <button 
                  type="submit" 
                  disabled={isSending}
                  className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-black py-4 rounded-xl uppercase tracking-widest transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
                >
                  {isSending ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Đang gửi...
                    </>
                  ) : 'Gửi Yêu Cầu'}
                </button>
              </form>
            ) : (
              <div className="text-center py-8">
                <div className="text-6xl mb-4 animate-bounce">✅</div>
                <h3 className="text-xl font-black text-white mb-2 uppercase">Gửi Thành Công!</h3>
                <p className="text-slate-400 text-sm mb-6">Thông tin đã được gửi tới hệ thống và Gmail của chúng tôi. Chúng tôi sẽ liên hệ lại sớm nhất!</p>
                <button onClick={onClose} className="bg-white/5 hover:bg-white/10 text-white px-8 py-3 rounded-xl font-bold transition-all">Đóng</button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
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
      await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: siteConfig.contactEmail || 'carwash68.vn@gmail.com',
          subject,
          html
        })
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error sending email:", error);
      const body = `Họ tên: ${formData.name}\nSĐT: ${formData.phone}\nEmail: ${formData.email}\nNội dung: ${formData.message}`;
      window.location.href = `mailto:${siteConfig.contactEmail || 'carwash68.vn@gmail.com'}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
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
              <div className="rounded-[32px] overflow-hidden border border-white/10 h-64 shadow-2xl group/map relative mb-6">
                <iframe 
                  src={siteConfig.mapEmbedUrl} 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer"
                  title="Bản đồ vị trí"
                  className="grayscale group-hover/map:grayscale-0 transition-all duration-700"
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
                  <p className="text-slate-400 mb-10 text-lg">Yêu cầu của bạn đã được gửi tới Gmail của chúng tôi. Đội ngũ chuyên gia sẽ liên hệ lại với bạn trong thời gian sớm nhất.</p>
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
  initialTab?: 'home' | 'services' | 'premium' | 'gallery' | 'customers' | 'promotions' | 'config' | 'ai-creative' | 'maintenance';
  maintenancePreFill?: {brand: string, model: string, year: string, mileage: string, lastMaintenance: string, symptoms: string} | null;
  isSelectingHeroVideo: boolean;
  setIsSelectingHeroVideo: React.Dispatch<React.SetStateAction<boolean>>;
  isSelectingAiVideo: boolean;
  setIsSelectingAiVideo: React.Dispatch<React.SetStateAction<boolean>>;
  aiVideoHistory: AiVideoRecord[];
  setAiVideoHistory: React.Dispatch<React.SetStateAction<AiVideoRecord[]>>;
}> = ({ isOpen, onClose, siteConfig, setSiteConfig, gallery, setGallery, services, setServices, premiumSolutions, setPremiumSolutions, customerRecords, setCustomerRecords, initialTab = 'home', maintenancePreFill, isSelectingHeroVideo, setIsSelectingHeroVideo, isSelectingAiVideo, setIsSelectingAiVideo, aiVideoHistory, setAiVideoHistory }) => {
  const [activeTab, setActiveTab] = useState<'home' | 'services' | 'premium' | 'gallery' | 'customers' | 'promotions' | 'config' | 'ai-creative' | 'maintenance'>(initialTab);
  
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
      const valA = (a as any)[sortConfig.key];
      const valB = (b as any)[sortConfig.key];
      
      if (valA === undefined || valB === undefined) return 0;
      
      if (valA < valB) return sortConfig.order === 'asc' ? -1 : 1;
      if (valA > valB) return sortConfig.order === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  };
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
  const [generationStatus, setGenerationStatus] = useState('');

  const [isAddingCustomer, setIsAddingCustomer] = useState(false);
  const [editingCustomerId, setEditingCustomerId] = useState<string | null>(null);
  const [customerForm, setCustomerForm] = useState<Partial<CustomerRecord>>({
    customerName: '', phone: '', licensePlate: '', carModel: '', servicesDone: [], totalPrice: '', notes: ''
  });

  if (!isOpen) return null;

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
      image: 'https://images.unsplash.com/photo-1599256621730-535171e28e50?q=80&w=800'
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
      image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=800',
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

  const tabs = [
    { id: 'home', label: 'Trang Chủ', icon: '🏠' },
    { id: 'services', label: 'Dịch Vụ', icon: '🛠️' },
    { id: 'premium', label: 'Cao Cấp', icon: '💎' },
    { id: 'promotions', label: 'Khuyến Mãi', icon: '🎁' },
    { id: 'gallery', label: 'Media', icon: '🖼️' },
    { id: 'customers', label: 'Khách Hàng', icon: '👤' },
    { id: 'maintenance', label: 'Bảo Dưỡng', icon: '🛠️' },
    { id: 'ai-creative', label: 'AI Creative', icon: '🪄' },
    { id: 'config', label: 'Cài Đặt', icon: '⚙️' },
  ];

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
      const prompt = `Bạn là một chuyên gia marketing cho trung tâm chăm sóc xe "Carwash Detailing". 
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

      const prompt = `Bạn là chuyên gia marketing cho "Carwash Detailing". 
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
          className="fixed inset-0 z-[300] flex items-center justify-center p-0 md:p-4 bg-slate-950/98 backdrop-blur-3xl"
        >
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 30 }}
            className="bg-slate-900 border border-white/5 md:rounded-[48px] w-full max-w-7xl h-full md:h-[92vh] flex flex-col shadow-3xl overflow-hidden"
          >
        {/* Dashboard Header */}
        <div className="px-6 md:px-10 py-6 md:py-8 border-b border-white/5 flex justify-between items-center bg-slate-900/50">
          <div className="flex items-center gap-4 md:gap-6">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-blue-600 flex items-center justify-center font-black text-white text-lg md:text-xl shadow-lg shadow-blue-900/40">DC</div>
            <div>
              <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter">{siteConfig.siteName} CMS</h2>
              <p className="text-blue-500 text-[8px] md:text-[10px] font-black uppercase tracking-widest mt-0.5 animate-pulse hidden sm:block">Hệ thống quản trị đang hoạt động</p>
            </div>
          </div>
          <button onClick={onClose} className="w-10 h-10 md:w-14 md:h-14 flex items-center justify-center rounded-2xl md:rounded-3xl bg-slate-800 text-slate-400 hover:text-white transition-all hover:bg-slate-700 active:scale-90">✕</button>
        </div>

        {/* Dashboard Body */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Sidebar / Tabs Navigation */}
          <div className="w-full md:w-72 border-b md:border-b-0 md:border-r border-white/5 p-2 md:p-6 flex md:flex-col gap-1 md:gap-2 bg-slate-950/20 overflow-x-auto no-scrollbar">
            {tabs.map(tab => (
              <motion.button 
                key={tab.id}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab(tab.id as any)} 
                className={`flex-shrink-0 md:w-full text-left px-4 py-3 md:p-4 rounded-xl md:rounded-2xl font-black text-[10px] md:text-[11px] uppercase tracking-widest transition-all flex items-center gap-2 md:gap-3 ${activeTab === tab.id ? 'bg-blue-600 text-white shadow-xl shadow-blue-900/20' : 'text-slate-500 hover:bg-slate-800'}`}
              >
                <span>{tab.icon}</span>
                <span className="md:inline">{tab.label}</span>
                {activeTab === tab.id && (
                  <motion.div 
                    layoutId="activeTab"
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-white hidden md:block"
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Dynamic Content Area */}
          <div className="flex-1 overflow-y-auto p-6 md:p-12 custom-scrollbar bg-slate-950/40">
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
                  <div className="space-y-10">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-4">
                  <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter">Nội Dung Trang Chủ</h3>
                  <button onClick={() => { alert("✅ Đã lưu thay đổi!"); onClose(); }} className="w-full sm:w-auto bg-blue-600 text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase shadow-lg hover:bg-blue-500 transition-all">Lưu Thay Đổi</button>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10">
                  <div className="space-y-6">
                    <div className="bg-slate-900/50 p-6 md:p-8 rounded-[24px] md:rounded-[32px] border border-white/5">
                      <div className="flex justify-between items-center mb-4">
                        <label className="text-[10px] font-black uppercase text-blue-500 tracking-[0.2em]">Hero Section Text</label>
                        <div className="flex gap-2">
                          <AiHelperButton onClick={() => handleAiGenerateText('heroTitle', 'Tiêu đề Hero')} isLoading={isAiGeneratingText === 'heroTitle'} />
                          <AiHelperButton onClick={() => handleAiGenerateText('heroDescription', 'Mô tả Hero')} isLoading={isAiGeneratingText === 'heroDescription'} />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <input value={siteConfig.heroTitle} onChange={e => updateConfig('heroTitle', e.target.value)} placeholder="Tiêu đề lớn" className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white font-bold" />
                        <textarea value={siteConfig.heroDescription} onChange={e => updateConfig('heroDescription', e.target.value)} placeholder="Mô tả ngắn" className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white text-sm h-24" />
                      </div>
                    </div>
                    <div className="bg-slate-900/50 p-6 md:p-8 rounded-[24px] md:rounded-[32px] border border-white/5">
                      <div className="flex justify-between items-center mb-4">
                        <label className="text-[10px] font-black uppercase text-blue-500 tracking-[0.2em]">Section Headers</label>
                        <div className="flex gap-2">
                          <AiHelperButton onClick={() => handleAiGenerateText('servicesTitle', 'Tiêu đề Dịch vụ')} isLoading={isAiGeneratingText === 'servicesTitle'} />
                          <AiHelperButton onClick={() => handleAiGenerateText('premiumTitle', 'Tiêu đề Cao cấp')} isLoading={isAiGeneratingText === 'premiumTitle'} />
                          <AiHelperButton onClick={() => handleAiGenerateText('galleryTitle', 'Tiêu đề Thư viện')} isLoading={isAiGeneratingText === 'galleryTitle'} />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <input value={siteConfig.servicesTitle} onChange={e => updateConfig('servicesTitle', e.target.value)} placeholder="Dịch vụ" className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white text-sm" />
                        <input value={siteConfig.premiumTitle} onChange={e => updateConfig('premiumTitle', e.target.value)} placeholder="Cao cấp" className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white text-sm" />
                        <input value={siteConfig.galleryTitle} onChange={e => updateConfig('galleryTitle', e.target.value)} placeholder="Thư viện" className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white text-sm" />
                      </div>
                    </div>
                    <div className="bg-slate-900/50 p-6 md:p-8 rounded-[24px] md:rounded-[32px] border border-white/5">
                      <div className="flex justify-between items-center mb-4">
                        <label className="text-[10px] font-black uppercase text-blue-500 tracking-[0.2em]">Section Subtitles</label>
                        <div className="flex gap-2">
                          <AiHelperButton onClick={() => handleAiGenerateText('servicesSubtitle', 'Phụ đề Dịch vụ')} isLoading={isAiGeneratingText === 'servicesSubtitle'} />
                          <AiHelperButton onClick={() => handleAiGenerateText('premiumSubtitle', 'Phụ đề Cao cấp')} isLoading={isAiGeneratingText === 'premiumSubtitle'} />
                          <AiHelperButton onClick={() => handleAiGenerateText('gallerySubtitle', 'Phụ đề Thư viện')} isLoading={isAiGeneratingText === 'gallerySubtitle'} />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <textarea value={siteConfig.servicesSubtitle} onChange={e => updateConfig('servicesSubtitle', e.target.value)} placeholder="Phụ đề Dịch vụ" className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white text-xs h-20" />
                        <textarea value={siteConfig.premiumSubtitle} onChange={e => updateConfig('premiumSubtitle', e.target.value)} placeholder="Phụ đề Cao cấp" className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white text-xs h-20" />
                        <textarea value={siteConfig.gallerySubtitle} onChange={e => updateConfig('gallerySubtitle', e.target.value)} placeholder="Phụ đề Thư viện" className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white text-xs h-20" />
                      </div>
                    </div>
                    <div className="bg-slate-900/50 p-6 md:p-8 rounded-[24px] md:rounded-[32px] border border-white/5">
                      <div className="flex justify-between items-center mb-4">
                        <label className="text-[10px] font-black uppercase text-blue-500 tracking-[0.2em]">Reviews & Map Headers</label>
                        <div className="flex gap-2">
                          <AiHelperButton onClick={() => handleAiGenerateText('reviewsTitle', 'Tiêu đề Đánh giá')} isLoading={isAiGeneratingText === 'reviewsTitle'} />
                          <AiHelperButton onClick={() => handleAiGenerateText('reviewsSubtitle', 'Phụ đề Đánh giá')} isLoading={isAiGeneratingText === 'reviewsSubtitle'} />
                          <AiHelperButton onClick={() => handleAiGenerateText('mapTitle', 'Tiêu đề Bản đồ')} isLoading={isAiGeneratingText === 'mapTitle'} />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <input value={siteConfig.reviewsTitle} onChange={e => updateConfig('reviewsTitle', e.target.value)} placeholder="Tiêu đề Đánh giá" className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white text-sm" />
                        <textarea value={siteConfig.reviewsSubtitle} onChange={e => updateConfig('reviewsSubtitle', e.target.value)} placeholder="Phụ đề Đánh giá" className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white text-xs h-20" />
                        <input value={siteConfig.mapTitle} onChange={e => updateConfig('mapTitle', e.target.value)} placeholder="Tiêu đề Bản đồ" className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white text-sm" />
                      </div>
                    </div>
                    <div className="bg-slate-900/50 p-6 md:p-8 rounded-[24px] md:rounded-[32px] border border-white/5">
                      <div className="flex justify-between items-center mb-4">
                        <label className="text-[10px] font-black uppercase text-blue-500 tracking-[0.2em]">Wrap & PPF Section</label>
                        <div className="flex gap-2">
                          <AiHelperButton onClick={() => handleAiGenerateText('wrapPPFTitle', 'Tiêu đề Wrap & PPF')} isLoading={isAiGeneratingText === 'wrapPPFTitle'} />
                          <AiHelperButton onClick={() => handleAiGenerateText('wrapPPFSubtitle', 'Phụ đề Wrap & PPF')} isLoading={isAiGeneratingText === 'wrapPPFSubtitle'} />
                          <AiHelperButton onClick={() => handleAiGenerateText('wrapPPFDescription', 'Mô tả Wrap & PPF')} isLoading={isAiGeneratingText === 'wrapPPFDescription'} />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <input value={siteConfig.wrapPPFTitle} onChange={e => updateConfig('wrapPPFTitle', e.target.value)} placeholder="Tiêu đề Wrap & PPF" className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white text-sm" />
                        <input value={siteConfig.wrapPPFSubtitle} onChange={e => updateConfig('wrapPPFSubtitle', e.target.value)} placeholder="Phụ đề Wrap & PPF" className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white text-sm" />
                        <textarea value={siteConfig.wrapPPFDescription} onChange={e => updateConfig('wrapPPFDescription', e.target.value)} placeholder="Mô tả Wrap & PPF" className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white text-sm h-24" />
                      </div>
                    </div>
                    <div className="bg-slate-900/50 p-6 md:p-8 rounded-[24px] md:rounded-[32px] border border-white/5">
                      <div className="flex justify-between items-center mb-4">
                        <label className="text-[10px] font-black uppercase text-blue-500 tracking-[0.2em]">Tuning Section</label>
                        <div className="flex gap-2">
                          <AiHelperButton onClick={() => handleAiGenerateText('tuningTitle', 'Tiêu đề Độ Xe')} isLoading={isAiGeneratingText === 'tuningTitle'} />
                          <AiHelperButton onClick={() => handleAiGenerateText('tuningSubtitle', 'Phụ đề Độ Xe')} isLoading={isAiGeneratingText === 'tuningSubtitle'} />
                          <AiHelperButton onClick={() => handleAiGenerateText('tuningDescription', 'Mô tả Độ Xe')} isLoading={isAiGeneratingText === 'tuningDescription'} />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <input value={siteConfig.tuningTitle} onChange={e => updateConfig('tuningTitle', e.target.value)} placeholder="Tiêu đề Độ Xe" className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white text-sm" />
                        <input value={siteConfig.tuningSubtitle} onChange={e => updateConfig('tuningSubtitle', e.target.value)} placeholder="Phụ đề Độ Xe" className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white text-sm" />
                        <textarea value={siteConfig.tuningDescription} onChange={e => updateConfig('tuningDescription', e.target.value)} placeholder="Mô tả Độ Xe" className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white text-sm h-24" />
                      </div>
                    </div>
                    <div className="bg-slate-900/50 p-6 md:p-8 rounded-[24px] md:rounded-[32px] border border-white/5">
                      <label className="text-[10px] font-black uppercase text-blue-500 tracking-[0.2em] mb-4 block">AI Advisor & Map Settings</label>
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <div className="flex justify-between items-center">
                            <label className="text-[8px] text-slate-500 uppercase font-black tracking-widest">AI Video Intro URL</label>
                            <button 
                              onClick={() => setIsSelectingAiVideo(true)}
                              className="text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-blue-500/30 bg-blue-600/10 text-blue-500 hover:bg-blue-600 hover:text-white transition-all"
                            >
                              📂 Thư viện
                            </button>
                          </div>
                          <input 
                            value={siteConfig.aiVideoUrl || ''} 
                            onChange={e => updateConfig('aiVideoUrl', e.target.value)} 
                            placeholder="Link video giới thiệu AI..." 
                            className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-white text-[10px]" 
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[8px] text-slate-500 uppercase font-black tracking-widest">Google Maps Embed URL</label>
                          <input 
                            value={siteConfig.mapEmbedUrl || ''} 
                            onChange={e => updateConfig('mapEmbedUrl', e.target.value)} 
                            placeholder="Link embed Google Maps..." 
                            className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-white text-[10px]" 
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-slate-900/50 p-6 md:p-8 rounded-[24px] md:rounded-[32px] border border-white/5 relative group">
                    <div className="flex justify-between items-center mb-4">
                      <label className="text-[10px] font-black uppercase text-blue-500 tracking-[0.2em]">Hero Media (Video/Image)</label>
                      <span className="text-[8px] text-slate-500 font-black uppercase">Preview</span>
                    </div>
                    <div className="space-y-4">
                      <div className="group space-y-2">
                        <div className="flex justify-between items-center">
                          <label className="text-[8px] text-slate-500 uppercase font-black tracking-widest">Video URL (MP4)</label>
                          <div className="flex gap-2">
                            <button 
                              onClick={() => setIsSelectingHeroVideo(true)}
                              className="text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-blue-500/30 bg-blue-600/10 text-blue-500 hover:bg-blue-600 hover:text-white transition-all"
                            >
                              📂 Thư viện
                            </button>
                            <button 
                              onClick={handleGenerateAiVideo}
                              disabled={isGeneratingVideo}
                              className={`text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full border transition-all ${isGeneratingVideo ? 'bg-slate-800 text-slate-500 border-slate-700 cursor-not-allowed' : 'bg-blue-600/10 text-blue-500 border-blue-500/30 hover:bg-blue-600 hover:text-white'}`}
                            >
                              {isGeneratingVideo ? '⏳ Đang tạo...' : '✨ Tạo bằng AI'}
                            </button>
                          </div>
                        </div>
                        <input 
                          value={siteConfig.heroVideoUrl || ''} 
                          onChange={e => updateConfig('heroVideoUrl', e.target.value)} 
                          placeholder="Link video .mp4..." 
                          className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-white text-[10px]" 
                        />
                        {isGeneratingVideo && (
                          <p className="text-[8px] text-blue-400 font-bold animate-pulse italic">{generationStatus}</p>
                        )}
                      </div>
                      <div className="aspect-[4/5] sm:aspect-video lg:aspect-[4/5] rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 relative shadow-2xl group/hero">
                        {siteConfig.heroVideoUrl ? (
                          <video src={siteConfig.heroVideoUrl} autoPlay muted loop playsInline className="w-full h-full object-cover" />
                        ) : (
                          <img src={siteConfig.heroImage} className="w-full h-full object-cover transition-transform duration-700 group-hover/hero:scale-110" alt="Hero Preview" />
                        )}
                        <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover/hero:opacity-100 transition-all flex flex-col items-center justify-center gap-4">
                          <div className="text-center space-y-1">
                            <p className="text-white font-black text-[10px] uppercase tracking-widest">Thay đổi nền chính</p>
                            <p className="text-slate-400 text-[8px] uppercase">Ảnh (1920x1080) hoặc Video (.mp4)</p>
                          </div>
                          <div className="flex flex-col gap-2 w-full px-8 max-w-[240px]">
                            <label className="bg-white text-slate-950 py-3 rounded-xl font-black text-[10px] uppercase cursor-pointer hover:bg-blue-500 hover:text-white transition-all shadow-xl active:scale-95 text-center">
                              Chọn Ảnh Mới
                              <input type="file" onChange={e => handleImageUpload(e, (b) => updateConfig('heroImage', b))} className="hidden" accept="image/*" />
                            </label>
                            <label className="bg-slate-800 text-white py-3 rounded-xl font-black text-[10px] uppercase cursor-pointer hover:bg-blue-500 transition-all shadow-xl active:scale-95 text-center">
                              Chọn Video Mới
                              <input type="file" onChange={e => handleImageUpload(e, (b) => updateConfig('heroVideoUrl', b))} className="hidden" accept="video/*" />
                            </label>
                            {siteConfig.heroVideoUrl && (
                              <button 
                                onClick={() => updateConfig('heroVideoUrl', '')}
                                className="bg-red-600/20 text-red-500 border border-red-500/30 py-2 rounded-xl font-black text-[9px] uppercase hover:bg-red-600 hover:text-white transition-all"
                              >
                                Xóa Video (Dùng Ảnh)
                              </button>
                            )}
                          </div>
                        </div>
                        {/* Status indicator */}
                        <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                          <span className="text-[8px] font-black text-white uppercase tracking-tighter">Live Preview</span>
                        </div>
                      </div>
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
                    <label className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-blue-900/20 transition-all cursor-pointer text-center flex items-center justify-center gap-2 group">
                      <span className="text-lg group-hover:scale-110 transition-transform">🖼️</span>
                      Tải Lên
                      <input 
                        type="file" 
                        className="hidden" 
                        accept="image/*,video/*" 
                        multiple
                        onChange={async (e) => {
                        const fileList = e.target.files;
                        if (fileList && fileList.length > 0) {
                          const files = Array.from(fileList) as File[];
                          const newImages: GalleryImage[] = [];
                          for (const file of files) {
                            const base64 = await fileToBase64(file);
                            const isVideo = file.type.startsWith('video/');
                            newImages.push({
                              id: (Date.now() + Math.random()).toString(),
                              url: base64,
                              title: file.name.split('.')[0],
                              category: 'general',
                              type: isVideo ? 'video' : 'image'
                            });
                          }
                          setGallery(prev => [...newImages, ...prev]);
                        }
                      }} 
                    />
                  </label>
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

                {activeTab === 'customers' && (
                  <div className="space-y-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                  <div className="flex items-center gap-4">
                    <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter">Nhật Ký Chăm Sóc</h3>
                    <button 
                      onClick={() => {
                        setIsAddingCustomer(true);
                        setEditingCustomerId(null);
                        setCustomerForm({ customerName: '', phone: '', licensePlate: '', carModel: '', servicesDone: [], totalPrice: '', notes: '', date: new Date().toISOString().split('T')[0] });
                      }}
                      className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg transition-all active:scale-95"
                    >
                      ➕ Thêm Mới
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
                    { key: 'date', order: 'desc', label: 'Ngày gần nhất' },
                    { key: 'date', order: 'asc', label: 'Ngày xa nhất' },
                    { key: 'customerName', order: 'asc', label: 'Tên A-Z' },
                    { key: 'totalPrice', order: 'desc', label: 'Giá trị cao nhất' },
                  ]}
                />

                {isAddingCustomer ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-slate-900/50 border border-blue-500/30 p-6 md:p-10 rounded-[32px] space-y-6"
                  >
                    <h4 className="text-xl font-black text-white uppercase tracking-tight">{editingCustomerId ? 'Sửa Thông Tin Khách' : 'Thêm Khách Hàng Mới'}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase">Tên Khách Hàng</label>
                        <input value={customerForm.customerName} onChange={e => setCustomerForm({...customerForm, customerName: e.target.value})} placeholder="VD: Nguyễn Văn A" className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase">Số Điện Thoại</label>
                        <input value={customerForm.phone} onChange={e => setCustomerForm({...customerForm, phone: e.target.value})} placeholder="VD: 0912345678" className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase">Biển Số Xe</label>
                        <input value={customerForm.licensePlate} onChange={e => setCustomerForm({...customerForm, licensePlate: e.target.value.toUpperCase()})} placeholder="VD: 30A-123.45" className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase">Dòng Xe</label>
                        <input value={customerForm.carModel} onChange={e => setCustomerForm({...customerForm, carModel: e.target.value})} placeholder="VD: Toyota Camry" className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase">Ngày Thực Hiện</label>
                        <input type="date" value={customerForm.date} onChange={e => setCustomerForm({...customerForm, date: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase">Tổng Tiền</label>
                        <input value={customerForm.totalPrice} onChange={e => setCustomerForm({...customerForm, totalPrice: e.target.value})} placeholder="VD: 5.000.000 VNĐ" className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white" />
                      </div>
                      <div className="space-y-2 md:col-span-2 lg:col-span-3">
                        <label className="text-[10px] font-black text-slate-500 uppercase">Dịch Vụ Đã Làm (Cách nhau dấu phẩy)</label>
                        <input 
                          value={customerForm.servicesDone?.join(', ')} 
                          onChange={e => setCustomerForm({...customerForm, servicesDone: e.target.value.split(',').map(s => s.trim())})} 
                          placeholder="VD: Rửa xe, Đánh bóng, Phủ Ceramic" 
                          className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white" 
                        />
                      </div>
                    </div>
                    <div className="flex gap-4 pt-4">
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
                        className="flex-1 bg-blue-600 text-white p-4 rounded-2xl font-black uppercase tracking-widest shadow-xl hover:bg-blue-500 transition-all"
                      >
                        {editingCustomerId ? 'Cập Nhật' : 'Lưu Bản Ghi'}
                      </button>
                      <button onClick={() => setIsAddingCustomer(false)} className="flex-1 bg-slate-800 text-slate-400 p-4 rounded-2xl font-black uppercase tracking-widest hover:text-white transition-all">Hủy</button>
                    </div>
                  </motion.div>
                ) : (
                  <div className="overflow-x-auto rounded-2xl md:rounded-[32px] border border-white/5 shadow-2xl overflow-hidden">
                    <table className="w-full text-left bg-slate-900/30 min-w-[900px]">
                      <thead>
                        <tr className="bg-slate-950/50 border-b border-white/5 text-[9px] font-black text-slate-500 uppercase tracking-widest">
                          <th className="p-4 md:p-6">Thời gian</th>
                          <th className="p-4 md:p-6">Khách hàng / SĐT</th>
                          <th className="p-4 md:p-6">Xe / Biển số</th>
                          <th className="p-4 md:p-6">Dịch vụ đã làm</th>
                          <th className="p-4 md:p-6 text-right">Thành tiền</th>
                          <th className="p-4 md:p-6 text-center">Tác vụ</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {getFilteredAndSorted(customerRecords, ['customerName', 'phone', 'licensePlate', 'carModel']).map(r => (
                          <tr key={r.id} className="hover:bg-blue-600/5 transition-colors group">
                            <td className="p-4 md:p-6 text-[10px] md:text-xs text-slate-500">{r.date}</td>
                            <td className="p-4 md:p-6">
                              <div className="font-bold text-white text-sm">{r.customerName}</div>
                              <div className="text-[10px] text-blue-500 font-bold tracking-widest">{r.phone}</div>
                            </td>
                            <td className="p-4 md:p-6">
                              <div className="text-xs text-slate-300">{r.carModel}</div>
                              <div className="text-[10px] bg-slate-800 px-2 py-0.5 rounded border border-white/5 inline-block font-black text-slate-400 mt-1">{r.licensePlate}</div>
                            </td>
                            <td className="p-4 md:p-6">
                              <div className="flex flex-wrap gap-1">
                                {r.servicesDone.map((s, idx) => (
                                  <span key={idx} className="text-[8px] bg-blue-600/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded-full font-bold uppercase">{s}</span>
                                ))}
                              </div>
                            </td>
                            <td className="p-4 md:p-6 text-right font-black text-white text-sm">{r.totalPrice}</td>
                            <td className="p-4 md:p-6 text-center">
                              <div className="flex justify-center gap-2">
                                <button 
                                  onClick={() => {
                                    setIsAddingCustomer(true);
                                    setEditingCustomerId(r.id);
                                    setCustomerForm(r);
                                  }}
                                  className="w-10 h-10 rounded-xl hover:bg-blue-600/20 text-slate-600 hover:text-blue-500 transition-all flex items-center justify-center"
                                >
                                  ✏️
                                </button>
                                <button onClick={() => confirm("Xóa bản ghi?") && setCustomerRecords(customerRecords.filter(rec => rec.id !== r.id))} className="w-10 h-10 rounded-xl hover:bg-red-600/20 text-slate-600 hover:text-red-500 transition-all flex items-center justify-center">🗑️</button>
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
                        <label className="text-[8px] md:text-[9px] text-slate-500 uppercase font-black tracking-widest group-focus-within:text-blue-500 transition-colors">Mật Khẩu Quản Trị</label>
                        <input 
                          type="password" 
                          value={siteConfig.adminPassword} 
                          onChange={e => updateConfig('adminPassword', e.target.value)} 
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
                                      subject: 'Test Email from Carwash Detailing',
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

const SidebarMenu: React.FC<{ 
  isOpen: boolean; 
  onClose: () => void; 
  isEditMode: boolean;
  siteConfig: SiteConfig;
  onAdminClick: () => void;
  onAddRecord: () => void;
  onOpenDashboard: () => void;
  onOpenGarage: () => void;
  onReset: () => void;
  scrollToSection: (id: string) => void;
}> = ({ isOpen, onClose, isEditMode, siteConfig, onAdminClick, onAddRecord, onOpenDashboard, onOpenGarage, onReset, scrollToSection }) => {
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
                <button onClick={() => { onOpenGarage(); onClose(); }} className="w-full text-left p-4 rounded-2xl bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/20 transition-all font-bold text-blue-400 flex items-center justify-between group">
                  <span className="flex items-center gap-3">🚗 Gara Của Tôi</span>
                  <span className="text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">Mới</span>
                </button>
                <button onClick={() => handleNav('promotions')} className="w-full text-left p-4 rounded-2xl hover:bg-slate-900 transition-all font-bold text-slate-300 flex items-center gap-3">🎁 Khuyến Mãi</button>
                <button onClick={() => handleNav('services')} className="w-full text-left p-4 rounded-2xl hover:bg-slate-900 transition-all font-bold text-slate-300 flex items-center gap-3">🛠️ Dịch Vụ</button>
                <button onClick={() => handleNav('window-tinting')} className="w-full text-left p-4 rounded-2xl hover:bg-slate-900 transition-all font-bold text-slate-300 flex items-center gap-3">🕶️ Dán Phim</button>
                <button onClick={() => handleNav('wrap-ppf')} className="w-full text-left p-4 rounded-2xl hover:bg-slate-900 transition-all font-bold text-slate-300 flex items-center gap-3">🎨 Wrap & PPF</button>
                <button onClick={() => handleNav('tuning')} className="w-full text-left p-4 rounded-2xl hover:bg-slate-900 transition-all font-bold text-slate-300 flex items-center gap-3">🏎️ Độ Xe</button>
                <button onClick={() => handleNav('premium')} className="w-full text-left p-4 rounded-2xl hover:bg-slate-900 transition-all font-bold text-slate-300 flex items-center gap-3">💎 Giải Pháp Cao Cấp</button>
                <button onClick={() => handleNav('ai-advisor')} className="w-full text-left p-4 rounded-2xl hover:bg-slate-900 transition-all font-bold text-slate-300 flex items-center gap-3">🤖 Cố Vấn AI</button>
                <button onClick={() => handleNav('gallery')} className="w-full text-left p-4 rounded-2xl hover:bg-slate-900 transition-all font-bold text-slate-300 flex items-center gap-3">🖼️ Thư Viện</button>
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

const AdminLoginModal: React.FC<{ isOpen: boolean; onClose: () => void; onSuccess: () => void; pass?: string; siteName: string }> = ({ isOpen, onClose, onSuccess, pass, siteName }) => {
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
      alert("Sai mật khẩu! Vui lòng kiểm tra lại.");
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
          placeholder="Mật khẩu bảo mật..." 
          className="w-full bg-slate-950 border border-white/5 rounded-2xl p-4 text-center tracking-[0.3em] md:tracking-[0.8em] mb-4 text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleLogin()}
        />
        <button 
          onClick={handleLogin} 
          className="w-full bg-blue-600 p-4 rounded-2xl font-black uppercase tracking-widest text-white shadow-xl shadow-blue-900/40 hover:bg-blue-500 transition-all active:scale-95"
        >Đăng Nhập</button>
        <button onClick={onClose} className="w-full mt-4 text-slate-500 text-xs uppercase font-bold tracking-widest hover:text-white transition-colors">Huỷ bỏ</button>
      </div>
    </div>
  );
};

// --- HomePage ---

const HomePage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [dashboardInitialTab, setDashboardInitialTab] = useState<'home' | 'services' | 'premium' | 'gallery' | 'customers' | 'promotions' | 'config' | 'ai-creative' | 'maintenance'>('home');
  const [dashboardMaintenancePreFill, setDashboardMaintenancePreFill] = useState<{brand: string, model: string, year: string, mileage: string, lastMaintenance: string, symptoms: string} | null>(null);
  const [dashboardTab, setDashboardTab] = useState<'home' | 'services' | 'premium' | 'gallery' | 'customers' | 'config'>('home');
  const [isVehicleModalOpen, setIsVehicleModalOpen] = useState(false);
  const [isSelectingHeroVideo, setIsSelectingHeroVideo] = useState(false);
  const [isSelectingAiVideo, setIsSelectingAiVideo] = useState(false);
  
  const [isScrolled, setIsScrolled] = useState(false);

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
        return { ...DEFAULT_SITE_CONFIG, ...JSON.parse(saved) };
      } catch (e) {
        return DEFAULT_SITE_CONFIG;
      }
    }
    return DEFAULT_SITE_CONFIG;
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
  const [vehicles, setVehicles] = useState<Vehicle[]>(() => {
    const saved = localStorage.getItem('dungcar_vehicles_v12');
    return saved ? JSON.parse(saved) : [];
  });
  const [aiVideoHistory, setAiVideoHistory] = useState<AiVideoRecord[]>(() => {
    const saved = localStorage.getItem('dungcar_ai_history_v12');
    return saved ? JSON.parse(saved) : [];
  });

  const [aiMessages, setAiMessages] = useState<Message[]>([{ role: 'model', text: 'Chào bạn! Tôi là Carwash Detailing AI. Bạn cần tư vấn về dịch vụ detailing nào?' }]);
  const [aiInput, setAiInput] = useState('');
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
    localStorage.setItem('dungcar_vehicles_v12', JSON.stringify(vehicles));
    localStorage.setItem('dungcar_ai_history_v12', JSON.stringify(aiVideoHistory));
  }, [siteConfig, customerRecords, gallery, services, premiumSolutions, vehicles, aiVideoHistory]);

  const handleAiChat = async () => {
    if (!aiInput.trim()) return;
    const userText = aiInput;
    setAiInput('');
    const newMsgs: Message[] = [...aiMessages, { role: 'user', text: userText }];
    setAiMessages(newMsgs);
    setIsAiLoading(true);
    const response = await getAIResponse(userText, aiMessages);
    setAiMessages(prev => [...prev, { role: 'model', text: response }]);
    setIsAiLoading(false);
  };

  const handleAddCustomer = () => {
    setDashboardTab('customers');
    setIsDashboardOpen(true);
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen selection:bg-blue-600/30">
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
            {siteConfig.facebookUrl && <a href={siteConfig.facebookUrl} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors"><Facebook className="w-3 h-3" /></a>}
            {siteConfig.instagramUrl && <a href={siteConfig.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors"><Instagram className="w-3 h-3" /></a>}
            {siteConfig.youtubeUrl && <a href={siteConfig.youtubeUrl} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors"><Youtube className="w-3 h-3" /></a>}
          </div>
        </div>
      </div>

      {/* Navbar */}
      <nav className={`fixed left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'top-0 py-3 bg-slate-950/90 backdrop-blur-xl border-b border-white/10 shadow-2xl' 
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
                    className="w-10 h-10 object-contain group-hover:scale-110 transition-transform"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-emerald-600 rounded-xl flex items-center justify-center font-black text-white text-xl shadow-lg shadow-blue-900/20 group-hover:scale-110 transition-transform">
                    {siteConfig.siteName.charAt(0)}
                  </div>
                )}
                
                {isEditMode && (
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
                
                <div className="flex flex-col">
                  <EditableText 
                    text={siteConfig.siteName} 
                    isEditMode={isEditMode} 
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
                  { id: 'promotions', label: 'Khuyến Mãi' },
                  { id: 'services', label: 'Dịch Vụ' },
                  { id: 'window-tinting', label: 'Dán Phim' },
                  { id: 'wrap-ppf', label: 'Wrap & PPF' },
                  { id: 'tuning', label: 'Độ Xe' },
                  { id: 'ai-advisor', label: 'Cố Vấn AI' },
                  { id: 'gallery', label: 'Thư Viện' }
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
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Hotline 24/7</span>
                <a href={`tel:${siteConfig.contactPhone}`} className="text-sm font-black text-white hover:text-blue-500 transition-colors">
                  {siteConfig.contactPhone}
                </a>
              </div>

              <button 
                onClick={() => setIsBookingModalOpen(true)}
                className="relative group overflow-hidden bg-blue-600 hover:bg-blue-500 text-white px-6 sm:px-8 py-2.5 sm:py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-blue-900/40 transition-all active:scale-95"
              >
                <span className="relative z-10">Đặt Lịch Ngay</span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
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
            className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-2xl shadow-blue-900/40 hover:bg-blue-500 transition-all active:scale-90"
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
        onOpenGarage={() => setIsVehicleModalOpen(true)}
        onReset={() => confirm("Reset trang web?") && (localStorage.clear(), window.location.reload())}
        scrollToSection={scrollToSection}
      />

      <VehicleManagerModal 
        isOpen={isVehicleModalOpen} 
        onClose={() => setIsVehicleModalOpen(false)} 
        vehicles={vehicles}
        setVehicles={setVehicles}
        onMaintenanceAdvice={(v) => {
          setDashboardInitialTab('maintenance');
          setDashboardMaintenancePreFill({
            brand: v.make,
            model: v.model,
            year: v.year,
            mileage: '',
            lastMaintenance: v.serviceHistory[0]?.date || '',
            symptoms: ''
          });
          setIsDashboardOpen(true);
        }}
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
                className="w-full h-full object-cover opacity-30 scale-105"
              />
            ) : (
              <img 
                src={siteConfig.heroImage} 
                alt="Hero Background"
                className="w-full h-full object-cover opacity-30 scale-105"
                referrerPolicy="no-referrer"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-transparent to-slate-950"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]"></div>
          </div>

          {/* Floating Accents */}
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>

          {isEditMode && (
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
                  The Art of Car Detailing
                </span>
              </motion.div>

              <div className="relative mb-8 sm:mb-12">
                <EditableText 
                  tag="h1" 
                  text={siteConfig.heroTitle} 
                  isEditMode={isEditMode} 
                  onSave={v => setSiteConfig({...siteConfig, heroTitle: v})}
                  multiline 
                  className="text-5xl sm:text-7xl md:text-[140px] font-black text-white leading-[0.85] tracking-[-0.04em] uppercase"
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
                  className="group relative bg-blue-600 hover:bg-blue-500 text-white px-12 py-5 rounded-2xl text-sm font-black uppercase tracking-widest shadow-2xl shadow-blue-900/40 transition-all active:scale-95 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    Đặt Lịch Ngay <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </button>
                <button 
                  onClick={() => scrollToSection('services')}
                  className="bg-slate-900 hover:bg-slate-800 text-white border border-white/10 px-12 py-5 rounded-2xl text-sm font-black uppercase tracking-widest transition-all active:scale-95"
                >
                  Khám Phá Dịch Vụ
                </button>
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
            <span className="text-[8px] font-black uppercase tracking-[0.3em] text-slate-500">Scroll</span>
            <div className="w-px h-12 bg-gradient-to-b from-blue-500 to-transparent"></div>
          </motion.div>
        </section>

        {/* Promotions Section */}
        {siteConfig.promotions && siteConfig.promotions.length > 0 && (
          <section id="promotions" className="py-24 sm:py-32 bg-slate-950 border-y border-white/5 relative overflow-hidden">
            {/* Background Text */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-[0.02] select-none">
              <div className="text-[300px] font-black uppercase tracking-tighter leading-none whitespace-nowrap">
                OFFERS OFFERS OFFERS
              </div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
              <div className="flex flex-col lg:flex-row justify-between items-end gap-10 mb-20">
                <div className="max-w-3xl">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4 mb-6"
                  >
                    <div className="w-12 h-px bg-blue-600"></div>
                    <span className="text-blue-500 font-black uppercase tracking-[0.3em] text-[10px] sm:text-xs">Limited Time Only</span>
                  </motion.div>
                  <h2 className="text-5xl sm:text-8xl font-black text-white leading-[0.85] tracking-tighter uppercase">
                    Ưu Đãi <span className="text-blue-600 italic">Đặc Biệt</span>
                  </h2>
                </div>
                <p className="text-slate-500 text-sm sm:text-lg font-medium max-w-md lg:text-right">
                  Nâng tầm trải nghiệm chăm sóc xe với những chương trình ưu đãi độc quyền chỉ có tại {siteConfig.siteName}.
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {siteConfig.promotions.map((promo, idx) => (
                  <motion.div 
                    key={promo.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.2 }}
                    className={`group relative bg-slate-900/50 rounded-[48px] overflow-hidden border border-white/5 hover:border-blue-500/30 transition-all duration-700 ${
                      idx === 0 ? 'lg:col-span-7' : 'lg:col-span-5'
                    }`}
                  >
                    <div className="flex flex-col h-full">
                      <div className="relative aspect-[16/9] lg:aspect-auto lg:flex-1 overflow-hidden">
                        <img 
                          src={promo.image} 
                          alt={promo.title} 
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                        <div className="absolute top-8 left-8">
                          <div className="bg-blue-600 text-white text-[10px] font-black px-6 py-2 rounded-full uppercase tracking-widest shadow-2xl">
                            {idx === 0 ? 'Ưu Đãi Lớn Nhất' : 'Khuyến Mãi'}
                          </div>
                        </div>
                      </div>
                      <div className="p-10 sm:p-12 flex flex-col justify-between">
                        <div>
                          <h3 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight mb-6 group-hover:text-blue-500 transition-colors leading-none">
                            {promo.title}
                          </h3>
                          <p className="text-slate-400 text-sm sm:text-base leading-relaxed line-clamp-2 mb-8 opacity-80 group-hover:opacity-100 transition-opacity">
                            {promo.description}
                          </p>
                        </div>
                        <div className="flex items-center justify-between pt-8 border-t border-white/5">
                          <div className="flex flex-col">
                            <span className="text-[9px] font-black uppercase text-slate-500 tracking-widest mb-1">Thời hạn đến</span>
                            <div className="flex items-center gap-2 text-blue-500">
                              <Clock className="w-4 h-4" />
                              <span className="font-black text-sm sm:text-base">{new Date(promo.expiryDate).toLocaleDateString('vi-VN')}</span>
                            </div>
                          </div>
                          <button 
                            onClick={() => setIsBookingModalOpen(true)}
                            className="bg-white text-slate-950 px-8 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-2xl active:scale-95 flex items-center gap-2"
                          >
                            Nhận Ngay <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Services Section */}
        <section id="services" className="py-24 sm:py-32 bg-slate-950 relative">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center text-center mb-20 sm:mb-28">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-600/10 border border-blue-500/20 mb-6"
              >
                <Zap className="w-4 h-4 text-blue-500" />
                <span className="text-blue-500 font-black uppercase tracking-widest text-[10px]">Professional Services</span>
              </motion.div>
              <EditableText 
                tag="h2" 
                text={siteConfig.servicesTitle} 
                isEditMode={isEditMode} 
                onSave={v => setSiteConfig({...siteConfig, servicesTitle: v})}
                className="text-4xl sm:text-7xl font-black text-white uppercase mb-6 tracking-tighter leading-none"
              />
              <EditableText 
                text={siteConfig.servicesSubtitle} 
                isEditMode={isEditMode} 
                onSave={v => setSiteConfig({...siteConfig, servicesSubtitle: v})}
                className="text-slate-500 max-w-2xl mx-auto text-sm sm:text-lg font-medium"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
              {services.map((s, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  key={s.id} 
                  className="group relative bg-slate-900/40 border border-white/5 rounded-[48px] overflow-hidden hover:border-blue-500/30 transition-all duration-500 flex flex-col"
                >
                  <div className="relative h-64 sm:h-80 overflow-hidden">
                    <EditableImage 
                      src={s.image} 
                      isEditMode={isEditMode} 
                      onUpload={base64 => setServices(services.map(ser => ser.id === s.id ? {...ser, image: base64} : ser))}
                      alt={s.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    {['ppf', 'wrap', 'tuning', 'underbody'].includes(s.id) && (
                      <div className="absolute top-6 right-6 z-20">
                        <div className="bg-emerald-500 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-xl animate-pulse">New Service</div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                      <div className="bg-slate-950/80 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-2xl">
                        <EditableText 
                          text={s.icon} 
                          isEditMode={isEditMode} 
                          onSave={v => setServices(services.map(ser => ser.id === s.id ? {...ser, icon: v} : ser))}
                          className="text-3xl"
                        />
                      </div>
                      <div className="bg-blue-600 text-white px-4 py-2 rounded-xl font-black text-sm shadow-xl">
                        <EditableText 
                          text={s.price} 
                          isEditMode={isEditMode} 
                          onSave={v => setServices(services.map(ser => ser.id === s.id ? {...ser, price: v} : ser))}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-10 flex-1 flex flex-col">
                    <EditableText 
                      tag="h3" 
                      text={s.title} 
                      isEditMode={isEditMode} 
                      onSave={v => setServices(services.map(ser => ser.id === s.id ? {...ser, title: v} : ser))}
                      className="text-2xl sm:text-3xl font-black text-white mb-4 uppercase tracking-tight group-hover:text-blue-500 transition-colors"
                    />
                    <EditableText 
                      text={s.description} 
                      isEditMode={isEditMode} 
                      onSave={v => setServices(services.map(ser => ser.id === s.id ? {...ser, description: v} : ser))}
                      multiline
                      className="text-slate-400 text-sm sm:text-base leading-relaxed mb-6 flex-1 opacity-80 group-hover:opacity-100 transition-opacity"
                    />

                    {s.subServices && s.subServices.length > 0 && (
                      <div className="mb-8 space-y-3">
                        {s.subServices.map((sub, sIdx) => (
                          <div key={sIdx} className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                            <div className="flex flex-col">
                              <span className="text-xs font-bold text-white">{sub.title}</span>
                              {sub.note && <span className="text-[10px] text-slate-500">{sub.note}</span>}
                            </div>
                            <span className="text-[10px] font-black text-blue-400">{sub.price}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <button 
                      onClick={() => window.location.href = `tel:${siteConfig.contactPhone}`} 
                      className="w-full group/btn relative bg-slate-800 hover:bg-blue-600 text-white font-black uppercase py-5 rounded-2xl transition-all text-xs tracking-[0.2em] shadow-xl active:scale-95 flex items-center justify-center gap-3"
                    >
                      <span>Liên Hệ Tư Vấn</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
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
                onSave={v => setSiteConfig({...siteConfig, premiumTitle: v})}
                className="text-4xl sm:text-7xl font-black text-white uppercase mb-6 tracking-tighter leading-none"
              />
              <EditableText 
                text={siteConfig.premiumSubtitle} 
                isEditMode={isEditMode} 
                onSave={v => setSiteConfig({...siteConfig, premiumSubtitle: v})}
                className="text-slate-500 max-w-2xl mx-auto text-sm sm:text-lg font-medium"
              />
            </div>

            <div className="space-y-32 sm:space-y-48">
              {premiumSolutions.map((sol, idx) => (
                <motion.div 
                  key={sol.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 sm:gap-24 items-center`}
                >
                  <div className="w-full lg:w-1/2">
                    <div className="relative aspect-[4/3] rounded-[48px] sm:rounded-[64px] overflow-hidden shadow-[0_40px_80px_-15px_rgba(0,0,0,0.5)] border border-white/10 group">
                      <div className="absolute inset-0 flex">
                        <div className="w-1/2 h-full relative overflow-hidden">
                          <EditableImage 
                            src={sol.beforeImage} 
                            isEditMode={isEditMode} 
                            onUpload={base64 => setPremiumSolutions(prev => prev.map(p => p.id === sol.id ? {...p, beforeImage: base64} : p))}
                            alt="Before"
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-black/20"></div>
                          <div className="absolute top-8 left-8 bg-slate-950/80 backdrop-blur-md text-white text-[10px] font-black px-6 py-2 rounded-full uppercase tracking-widest border border-white/10">Trước</div>
                        </div>
                        <div className="w-1/2 h-full relative overflow-hidden">
                          <EditableImage 
                            src={sol.afterImage} 
                            isEditMode={isEditMode} 
                            onUpload={base64 => setPremiumSolutions(prev => prev.map(p => p.id === sol.id ? {...p, afterImage: base64} : p))}
                            alt="After"
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                          />
                          <div className="absolute top-8 right-8 bg-blue-600 text-white text-[10px] font-black px-6 py-2 rounded-full uppercase tracking-widest shadow-xl">Sau</div>
                        </div>
                      </div>
                      <div className="absolute inset-0 pointer-events-none border-x border-white/20 left-1/2 -translate-x-1/2 shadow-[0_0_40px_rgba(0,0,0,0.5)]"></div>
                      
                      {/* Label overlay */}
                      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-slate-950/80 backdrop-blur-md px-8 py-3 rounded-2xl border border-white/10 text-white font-black text-[10px] uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        Sự Khác Biệt Tuyệt Đối
                      </div>
                    </div>
                  </div>

                  <div className="w-full lg:w-1/2 space-y-10 sm:space-y-12">
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <span className="text-blue-600 font-black text-4xl sm:text-5xl opacity-20">0{idx + 1}</span>
                        <div className="h-px flex-1 bg-gradient-to-r from-blue-600/50 to-transparent"></div>
                      </div>
                      <EditableText 
                        tag="h3" 
                        text={sol.title} 
                        isEditMode={isEditMode} 
                        onSave={v => setPremiumSolutions(prev => prev.map(p => p.id === sol.id ? {...p, title: v} : p))}
                        className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tighter leading-none"
                      />
                      <EditableText 
                        text={sol.description} 
                        isEditMode={isEditMode} 
                        onSave={v => setPremiumSolutions(prev => prev.map(p => p.id === sol.id ? {...p, description: v} : p))}
                        className="text-slate-400 text-base sm:text-xl leading-relaxed font-medium"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-16">
                      <div className="space-y-6">
                        <h4 className="text-blue-500 font-black text-[11px] uppercase tracking-[0.3em] flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                          Quy trình chuẩn
                        </h4>
                        <ul className="space-y-4">
                          {sol.process.map((step, sIdx) => (
                            <li key={sIdx} className="flex gap-4 text-slate-300 text-sm sm:text-base group/item">
                              <span className="text-blue-600 font-black opacity-40 group-hover/item:opacity-100 transition-opacity">0{sIdx + 1}</span>
                              <EditableText 
                                text={step} 
                                isEditMode={isEditMode} 
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
                  onSave={v => setSiteConfig({...siteConfig, aiTitle: v})}
                  className="text-4xl sm:text-7xl font-black text-white uppercase mb-8 leading-[0.9] tracking-tighter"
                />
                <EditableText 
                  text={siteConfig.aiSubtitle} 
                  isEditMode={isEditMode} 
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
                        <div className="text-xs sm:text-sm font-black text-white uppercase tracking-widest">Carwash Detailing AI Advisor</div>
                        <div className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">Chuyên gia tư vấn kỹ thuật</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:bg-white/10 transition-all"><Phone className="w-4 h-4" /></button>
                      <button className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:bg-white/10 transition-all"><MoreVertical className="w-4 h-4" /></button>
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
                        onClick={handleAiChat} 
                        disabled={isAiLoading || !aiInput.trim()}
                        className="bg-blue-600 hover:bg-blue-500 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center transition-all shadow-2xl shadow-blue-900/40 active:scale-90 group disabled:opacity-50 disabled:grayscale"
                      >
                        <Send className="w-6 h-6 text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </button>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {['Giá phủ Ceramic?', 'PPF là gì?', 'Địa chỉ ở đâu?'].map(text => (
                        <button 
                          key={text}
                          onClick={() => { setAiInput(text); }}
                          className="text-[9px] font-black uppercase tracking-widest text-slate-500 hover:text-blue-500 transition-colors bg-white/5 px-3 py-1 rounded-lg border border-white/5"
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
                onSave={v => setSiteConfig({...siteConfig, galleryTitle: v})}
                className="text-4xl sm:text-7xl font-black uppercase mb-6 tracking-tighter text-white"
              />
              <EditableText 
                text={siteConfig.gallerySubtitle} 
                isEditMode={isEditMode} 
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
                      onSave={v => setGallery(gallery.map(g => g.id === img.id ? {...g, title: v} : g))}
                      className="text-white font-black uppercase tracking-widest text-[10px] sm:text-xs text-center translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-200"
                    />
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
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <ContactSection siteConfig={siteConfig} />
      </main>

      {/* Footer */}
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
                    onSave={v => setSiteConfig({...siteConfig, siteName: v})}
                  />
                </h3>
              </div>
              <EditableText 
                text={siteConfig.heroDescription} 
                isEditMode={isEditMode} 
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
                        onSave={v => setSiteConfig({...siteConfig, contactEmail: v})}
                        className="text-slate-300 text-sm font-medium"
                      />
                    </a>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-500 shrink-0">⏰</div>
                  <div className="flex-1">
                    <p className="text-[10px] font-black uppercase text-slate-500 mb-1">Giờ làm việc</p>
                    <EditableText 
                      text={siteConfig.contactHours} 
                      isEditMode={isEditMode} 
                      onSave={v => setSiteConfig({...siteConfig, contactHours: v})}
                      className="text-slate-300 text-sm font-medium"
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-500 shrink-0">💬</div>
                  <div className="flex-1">
                    <p className="text-[10px] font-black uppercase text-slate-500 mb-1">Tư vấn Zalo</p>
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
      />
      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
        services={services}
        vehicles={vehicles}
        siteConfig={siteConfig}
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
                <h3 className="text-xl font-black text-white uppercase tracking-tighter">Chọn Video Từ Thư Viện</h3>
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
                          <span className="bg-blue-600 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase shadow-xl">Chọn Video</span>
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
                    <p className="text-slate-400 font-bold">Chưa có video nào trong thư viện.</p>
                    <p className="text-slate-600 text-xs mt-2">Vui lòng tải video lên ở tab "Thư Viện" trước.</p>
                    <button 
                      onClick={() => {
                        setDashboardInitialTab('gallery');
                        setIsDashboardOpen(true);
                        setIsSelectingHeroVideo(false);
                        setIsSelectingAiVideo(false);
                      }}
                      className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-xl text-[10px] font-black uppercase hover:bg-blue-500 transition-all"
                    >
                      Đến Thư Viện
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
    </Routes>
  </Router>
);

export default App;
