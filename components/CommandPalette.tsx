
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Settings, User, Calendar, Image as ImageIcon, Briefcase, FileText, X, Command } from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onAction: (actionId: string) => void;
  items: { id: string; label: string; icon: React.ReactNode; category: string }[];
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose, onAction, items }) => {
  const [search, setSearch] = useState('');
  
  const filteredItems = items.filter(item => 
    item.label.toLowerCase().includes(search.toLowerCase()) || 
    item.category.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose(); // Toggle mechanism handled externally or here
      }
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-24 px-4 sm:pt-40">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" 
        onClick={onClose} 
      />
      
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: -20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: -20 }}
        className="relative w-full max-w-2xl bg-slate-900 border border-white/10 rounded-[32px] shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden"
      >
        <div className="p-6 border-b border-white/5 flex items-center gap-4">
          <Search className="w-5 h-5 text-slate-500" />
          <input 
            autoFocus
            type="text"
            placeholder="Tìm kiếm chức năng, dịch vụ, khách hàng... (⌘K)"
            className="flex-1 bg-transparent border-none outline-none text-white text-lg placeholder:text-slate-600"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-white/5 text-slate-500">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="max-h-[400px] overflow-y-auto p-4 custom-scrollbar">
          {filteredItems.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-slate-500 text-sm italic">Không tìm thấy kết quả nào...</p>
            </div>
          ) : (
            <div className="space-y-6">
              {['Kế toán', 'Vận hành', 'Thiết kế'].map(cat => {
                const catItems = filteredItems.filter(i => i.category === cat);
                if (catItems.length === 0) return null;
                
                return (
                  <div key={cat} className="space-y-2">
                    <h3 className="px-4 text-[9px] font-black text-slate-600 uppercase tracking-widest">{cat}</h3>
                    {catItems.map(item => (
                      <button
                        key={item.id}
                        onClick={() => {
                          onAction(item.id);
                          onClose();
                        }}
                        className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl hover:bg-white/5 transition-all text-left group"
                      >
                        <div className="w-10 h-10 rounded-xl bg-slate-950 flex items-center justify-center text-slate-500 group-hover:text-blue-500 group-hover:bg-blue-600/10 transition-all">
                          {item.icon}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white group-hover:text-blue-500 transition-colors">{item.label}</p>
                          <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">{item.category}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                );
              })}
            </div>
          )}
        </div>
        
        <div className="p-4 bg-slate-950 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-1 rounded bg-slate-800 text-[10px] font-bold text-slate-400 border border-white/5 shadow-inner">↵</kbd>
              <span className="text-[10px] text-slate-600 uppercase font-black">Chọn</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-1 rounded bg-slate-800 text-[10px] font-bold text-slate-400 border border-white/5 shadow-inner">ESC</kbd>
              <span className="text-[10px] text-slate-600 uppercase font-black">Đóng</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Command className="w-3 h-3 text-slate-600" />
            <span className="text-[10px] text-slate-600 uppercase font-black">Quick Access</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
