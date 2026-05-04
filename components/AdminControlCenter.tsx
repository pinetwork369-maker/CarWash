
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Settings, 
  Menu, 
  X, 
  Layout, 
  Users, 
  Boxes, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  Edit3, 
  Smartphone,
  ChevronRight,
  Plus,
  Search,
  Zap,
  Camera as CameraIcon,
  Lock,
  LogOut,
  Sparkles,
  BarChart,
  Calendar,
  ClipboardCheck,
  Package
} from 'lucide-react';
import { toast } from 'react-hot-toast';

interface AdminControlCenterProps {
  isEditMode: boolean;
  setIsEditMode: (val: boolean) => void;
  isDashboardOpen: boolean;
  setIsDashboardOpen: (val: boolean) => void;
  isAuthenticated: boolean;
  onLogout: () => void;
  onOpenTab: (tab: string) => void;
  isPrivacyMode: boolean;
  onTogglePrivacy: () => void;
  notificationsCount?: number;
}

export const AdminControlCenter: React.FC<AdminControlCenterProps> = ({
  isEditMode,
  setIsEditMode,
  isDashboardOpen,
  setIsDashboardOpen,
  isAuthenticated,
  onLogout,
  onOpenTab,
  isPrivacyMode,
  onTogglePrivacy,
  notificationsCount = 0
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const quicklinks = [
    { id: 'home', label: 'Tổng quan', icon: <BarChart className="w-4 h-4" /> },
    { id: 'appointments', label: 'Lịch hẹn', icon: <Calendar className="w-4 h-4" /> },
    { id: 'customers', label: 'Khách hàng', icon: <Users className="w-4 h-4" /> },
    { id: 'tracking', label: 'Theo dõi xe', icon: <Zap className="w-4 h-4" /> },
    { id: 'inspections', label: 'Kiểm tra xe', icon: <ClipboardCheck className="w-4 h-4" /> },
    { id: 'inventory', label: 'Kho hàng', icon: <Boxes className="w-4 h-4" /> },
    { id: 'wrap-manager', label: 'Dự án Wrap', icon: <CameraIcon className="w-4 h-4" /> },
    { id: 'ui-design', label: 'Thiết kế', icon: <Layout className="w-4 h-4" /> },
  ];

  const filteredLinks = quicklinks.filter(link => 
    link.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isAuthenticated) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[600] flex flex-col items-end gap-3 pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-2 w-72 bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-[32px] shadow-2xl overflow-hidden pointer-events-auto"
          >
            {/* Header */}
            <div className="p-5 border-b border-white/5 flex items-center justify-between bg-slate-950/50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-black text-white uppercase tracking-tighter">Control Center</h3>
                  <p className="text-[8px] text-emerald-500 font-bold uppercase tracking-widest">Admin Online</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/5 rounded-lg text-slate-500 hover:text-white transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Stats/Search */}
            <div className="p-4 bg-slate-950/30">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
                <input 
                  type="text"
                  placeholder="Tìm nhanh..."
                  className="w-full bg-slate-950 border border-white/5 rounded-xl py-2 pl-9 pr-4 text-[10px] text-white outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Main Navigation */}
            <div className="p-4 grid grid-cols-2 gap-2">
              <button 
                onClick={() => { setIsEditMode(!isEditMode); toast.success(`Thiết kế: ${!isEditMode ? 'BẬT' : 'TẮT'}`); }}
                className={`flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border transition-all ${isEditMode ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/20' : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10'}`}
              >
                <Edit3 className="w-5 h-5" />
                <span className="text-[9px] font-black uppercase tracking-widest">{isEditMode ? 'Dừng Sửa' : 'Sửa Trang'}</span>
              </button>
              <button 
                onClick={onTogglePrivacy}
                className={`flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border transition-all ${isPrivacyMode ? 'bg-amber-600 border-amber-500 text-white shadow-lg shadow-amber-600/20' : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10'}`}
              >
                {isPrivacyMode ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                <span className="text-[9px] font-black uppercase tracking-widest">{isPrivacyMode ? 'Hiện Dữ Liệu' : 'Ẩn Dữ Liệu'}</span>
              </button>
            </div>

            {/* Links List */}
            <div className="p-2 max-h-48 overflow-y-auto custom-scrollbar">
              {filteredLinks.map(link => (
                <button
                  key={link.id}
                  onClick={() => { onOpenTab(link.id); setIsOpen(false); }}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                      {link.icon}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider">{link.label}</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0" />
                </button>
              ))}
            </div>

            {/* Footer Actions */}
            <div className="p-4 mt-2 border-t border-white/5 flex gap-2">
              <button 
                onClick={() => { setIsDashboardOpen(true); setIsOpen(false); }}
                className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-[9px] font-black uppercase tracking-widest transition-all shadow-lg shadow-blue-600/20"
              >
                Mở Admin Panel
              </button>
              <button 
                onClick={onLogout}
                className="p-3 bg-white/5 hover:bg-red-500 hover:text-white text-slate-500 rounded-xl transition-all"
                title="Đăng xuất"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        layout
        onClick={() => setIsOpen(!isOpen)}
        className={`pointer-events-auto h-14 w-14 rounded-full flex items-center justify-center shadow-2xl shadow-blue-900/40 relative transition-all active:scale-95 group ${isOpen ? 'bg-slate-900 text-blue-500 rotate-90 scale-90' : 'bg-blue-600 text-white hover:bg-blue-500'}`}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Settings className="w-6 h-6 animate-pulse" />}
        {!isOpen && notificationsCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[9px] font-black rounded-full flex items-center justify-center border-2 border-slate-950">
            {notificationsCount}
          </span>
        )}
      </motion.button>
    </div>
  );
};
