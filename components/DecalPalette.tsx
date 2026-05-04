import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Palette, Filter, Info, Check, ChevronRight, Image as ImageIcon, Camera as CameraIcon } from 'lucide-react';
import { DecalColor, WrapProject } from '../types';
import { DECAL_COLORS } from '../constants';

interface DecalPaletteProps {
  wrapProjects?: WrapProject[];
}

const DecalPalette: React.FC<DecalPaletteProps> = ({ wrapProjects = [] }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedColor, setSelectedColor] = useState<DecalColor | null>(null);

  const displayProjects = wrapProjects.length > 0 ? wrapProjects : [
    { id: '1', title: 'Porsche 911 - Satin Dark Basalt', img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800', color: 'Satin Dark Basalt' },
    { id: '2', title: 'BMW M4 - Gloss Nardo Gray', img: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=800', color: 'Gloss Nardo Gray' },
    { id: '3', title: 'Mercedes AMG - Matte Deep Black', img: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=800', color: 'Matte Deep Black' },
    { id: '4', title: 'Audi RS6 - Gloss Miami Blue', img: 'https://images.unsplash.com/photo-1603584173870-7f3ca99a4741?auto=format&fit=crop&q=80&w=800', color: 'Gloss Miami Blue' },
    { id: '5', title: 'Lamborghini - Color Shift Purple', img: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=800', color: 'Purple Blue Shift' },
    { id: '6', title: 'Ferrari - Gloss Carmine Red', img: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&q=80&w=800', color: 'Gloss Carmine Red' },
  ];

  const categories = ['All', 'Gloss', 'Matte', 'Satin', 'Chrome', 'ColorShift'];

  const filteredColors = activeCategory === 'All' 
    ? DECAL_COLORS 
    : DECAL_COLORS.filter(c => c.category === activeCategory);

  return (
    <div className="bg-slate-900/50 border border-white/5 rounded-[40px] overflow-hidden backdrop-blur-xl">
      <div className="p-8 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-2 flex items-center gap-3">
            <Palette className="w-6 h-6 text-blue-500" /> Bảng Màu Decal Cao Cấp
          </h2>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            Hơn 200+ mã màu từ TeckWrap, 3M & Avery Dennison
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                activeCategory === cat 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                  : 'bg-white/5 text-slate-500 hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="p-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {filteredColors.map((color, idx) => (
          <motion.div
            key={color.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className={`group cursor-pointer rounded-3xl p-3 border transition-all ${
              selectedColor?.id === color.id ? 'bg-blue-600/10 border-blue-500/50' : 'bg-slate-950/50 border-white/5 hover:border-white/10'
            }`}
            onClick={() => setSelectedColor(color)}
          >
            <div 
              className="aspect-square rounded-2xl mb-3 shadow-inner relative overflow-hidden group-hover:scale-105 transition-transform duration-500"
              style={{ background: color.hex.startsWith('linear') ? color.hex : color.hex }}
            >
              {selectedColor?.id === color.id && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[2px]">
                  <Check className="w-8 h-8 text-white drop-shadow-lg" />
                </div>
              )}
              {/* Glossy Overlay */}
              {color.category === 'Gloss' && (
                <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-50" />
              )}
              {/* Chrome Overlay */}
              {color.category === 'Chrome' && (
                <div className="absolute inset-0 bg-gradient-to-tr from-white/60 via-transparent to-white/40 opacity-70" />
              )}
            </div>
            <div className="px-1 text-center">
              <p className="text-[9px] font-black text-white uppercase truncate mb-0.5">{color.name}</p>
              <div className="flex items-center justify-center gap-1.5">
                <span className="text-[8px] font-bold text-slate-500 tracking-widest">{color.code}</span>
                <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
                <span className="text-[8px] font-bold text-blue-500 uppercase">{color.category}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {selectedColor && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 border-t border-white/5 bg-slate-950/30 flex flex-col md:flex-row items-center gap-8"
        >
          <div 
            className="w-32 h-32 rounded-[32px] shadow-2xl shrink-0"
            style={{ background: selectedColor.hex.startsWith('linear') ? selectedColor.hex : selectedColor.hex }}
          />
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-xl font-black text-white uppercase tracking-tight mb-2">{selectedColor.name}</h3>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-4">
              <span className="px-3 py-1 bg-white/5 rounded-full text-[9px] font-black text-slate-400 uppercase tracking-widest border border-white/5">
                Mã Màu: {selectedColor.code}
              </span>
              <span className="px-3 py-1 bg-white/5 rounded-full text-[9px] font-black text-slate-400 uppercase tracking-widest border border-white/5">
                Chất liệu: {selectedColor.finish}
              </span>
              <span className="px-3 py-1 bg-blue-500/10 rounded-full text-[9px] font-black text-blue-500 uppercase tracking-widest border border-blue-500/10">
                Phân khúc: {selectedColor.category} Premium
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-2xl">
              Chất liệu decal cao cấp với độ bền màu trên 5 năm. Công nghệ thoát khí giúp dán không bong tróc, bảo vệ sơn zin tuyệt đối. Liên hệ ngay để nhận báo giá chi tiết cho dòng xe của bạn.
            </p>
          </div>
          <button className="px-10 py-5 bg-blue-600 text-white rounded-[24px] text-[11px] font-black uppercase tracking-widest hover:bg-blue-500 transition-all shadow-xl shadow-blue-600/30 flex items-center gap-3">
            Đặt Lịch Dán Wrap <ChevronRight className="w-4 h-4" />
          </button>
        </motion.div>
      )}

      {!selectedColor && (
        <div className="p-8 border-t border-white/5 bg-slate-950/30 text-center">
          <div className="flex items-center justify-center gap-3 text-slate-500">
            <Info className="w-4 h-4" />
            <p className="text-[10px] font-bold uppercase tracking-widest">Chọn một mã màu để xem chi tiết thông số kỹ thuật</p>
          </div>
        </div>
      )}

      {/* Gallery Section */}
      <div className="p-8 border-t border-white/5 bg-slate-950/50">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-xl font-black text-white uppercase tracking-tighter flex items-center gap-3">
              <CameraIcon className="w-5 h-5 text-blue-500" /> Dự Án Thực Tế
            </h3>
            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1">
              Hình ảnh thi công trực tiếp tại XE ĐẸP PRO
            </p>
          </div>
          <button className="text-[9px] font-black text-blue-500 uppercase tracking-widest hover:text-blue-400 transition-colors">
            Xem tất cả dự án
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayProjects.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative aspect-[16/10] rounded-[32px] overflow-hidden border border-white/5 bg-slate-900 shadow-xl"
            >
              <img 
                src={item.img} 
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                style={{ objectPosition: item.objectPosition || '50% 50%' }}
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-1">{item.color}</p>
                <h4 className="text-sm font-black text-white uppercase tracking-tight">{item.title}</h4>
              </div>

              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-xl">
                  <ImageIcon className="w-5 h-5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DecalPalette;
