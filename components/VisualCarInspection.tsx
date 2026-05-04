import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InspectionPoint, CarInspection } from '../types';
import { X, AlertCircle, Info, FileCheck, Check, Camera, Plus, Trash2, Image as ImageIcon, Upload } from 'lucide-react';

interface VisualCarInspectionProps {
  points: InspectionPoint[];
  onChange: (points: InspectionPoint[]) => void;
  checklist?: Record<string, 'ok' | 'warning' | 'error' | 'na'>;
  onChecklistChange?: (checklist: Record<string, 'ok' | 'warning' | 'error' | 'na'>) => void;
  images?: CarInspection['images'];
  onImagesChange?: (images: CarInspection['images']) => void;
  readOnly?: boolean;
}

const CHECKLIST_ITEMS = [
  { id: 'paint', label: 'Tình trạng sơn (Paint)', category: 'Ngoại thất' },
  { id: 'glass', label: 'Kính xe (Glass)', category: 'Ngoại thất' },
  { id: 'lights', label: 'Đèn xe (Lights)', category: 'Ngoại thất' },
  { id: 'wheels', label: 'Mâm & Lốp (Wheels)', category: 'Ngoại thất' },
  { id: 'interior_seats', label: 'Ghế ngồi (Seats)', category: 'Nội thất' },
  { id: 'interior_dash', label: 'Taplo & Tapli', category: 'Nội thất' },
  { id: 'interior_floor', label: 'Sàn xe (Floor)', category: 'Nội thất' },
  { id: 'engine_bay', label: 'Khoang máy (Engine)', category: 'Kỹ thuật' },
];

const VisualCarInspection: React.FC<VisualCarInspectionProps> = ({ 
  points, 
  onChange, 
  checklist = {}, 
  onChecklistChange, 
  images = {},
  onImagesChange,
  readOnly 
}) => {
  const [selectedPoint, setSelectedPoint] = useState<InspectionPoint | null>(null);

  const handleImageUpload = (view: 'front' | 'rear' | 'left' | 'right', e: React.ChangeEvent<HTMLInputElement>) => {
    if (readOnly || !onImagesChange) return;
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImagesChange({
          ...images,
          [view]: reader.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (view: 'front' | 'rear' | 'left' | 'right') => {
    if (readOnly || !onImagesChange) return;
    onImagesChange({
      ...images,
      [view]: undefined
    });
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>, view: 'front' | 'rear' | 'left' | 'right') => {
    if (readOnly) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const newPoint: InspectionPoint = {
      id: Math.random().toString(36).substr(2, 9),
      x,
      y,
      view,
      type: 'scratch',
      note: ''
    };

    onChange([...points, newPoint]);
    setSelectedPoint(newPoint);
  };

  const updatePoint = (id: string, updates: Partial<InspectionPoint>) => {
    const newPoints = points.map(p => p.id === id ? { ...p, ...updates } : p);
    onChange(newPoints);
    if (selectedPoint?.id === id) {
      setSelectedPoint({ ...selectedPoint, ...updates });
    }
  };

  const removePoint = (id: string) => {
    onChange(points.filter(p => p.id !== id));
    setSelectedPoint(null);
  };

  const handleChecklistToggle = (itemId: string, status: 'ok' | 'warning' | 'error' | 'na') => {
    if (readOnly || !onChecklistChange) return;
    onChecklistChange({
      ...checklist,
      [itemId]: status
    });
  };

  const CAR_VIEWS = [
    { id: 'front', label: 'FRONT (TRƯỚC)', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800' },
    { id: 'rear', label: 'REAR (SAU)', image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=800' },
    { id: 'left', label: 'LEFT SIDE (BÊN TRÁI)', image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=800' },
    { id: 'right', label: 'RIGHT SIDE (BÊN PHẢI)', image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=800' },
  ] as const;

  return (
    <div className="space-y-4 md:space-y-8">
      {/* Overall Car Photos Section */}
      <div className="bg-slate-950 p-4 md:p-8 rounded-[32px] md:rounded-[40px] border border-white/10 shadow-2xl space-y-6 md:space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg md:text-2xl font-black text-white uppercase tracking-tighter">HÌNH ẢNH TỔNG THỂ XE</h3>
            <p className="text-slate-500 text-[8px] md:text-[10px] font-bold uppercase tracking-widest">Chụp 4 góc quanh xe để ghi nhận tình trạng thực tế</p>
          </div>
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-blue-600/20 flex items-center justify-center text-blue-500">
            <Camera className="w-5 h-5 md:w-6 md:h-6" />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CAR_VIEWS.map((view) => (
            <div key={`photo-${view.id}`} className="space-y-3">
              <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest text-center">{view.label.split(' ')[0]}</p>
              <div className="relative aspect-square bg-slate-900 rounded-3xl border border-white/5 overflow-hidden group shadow-lg">
                {images[view.id] ? (
                  <>
                    <img 
                      src={images[view.id]} 
                      alt={view.label} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    {!readOnly && (
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <label className="p-2 bg-blue-600 rounded-xl text-white cursor-pointer hover:bg-blue-500 transition-colors">
                          <Upload className="w-4 h-4" />
                          <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(view.id, e)} />
                        </label>
                        <button 
                          onClick={() => removeImage(view.id)}
                          className="p-2 bg-red-600 rounded-xl text-white hover:bg-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <label className="absolute inset-0 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-white/5 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-500 group-hover:text-blue-500 group-hover:bg-blue-500/10 transition-all">
                      <Plus className="w-5 h-5" />
                    </div>
                    <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest">Tải ảnh {view.id}</span>
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(view.id, e)} />
                  </label>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-950 p-4 md:p-8 rounded-[32px] md:rounded-[40px] border border-white/10 shadow-2xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 md:mb-8 gap-4">
          <div>
            <h3 className="text-lg md:text-2xl font-black text-white uppercase tracking-tighter">SƠ ĐỒ KIỂM TRA NGOẠI THẤT</h3>
            <p className="text-slate-500 text-[8px] md:text-[10px] font-bold uppercase tracking-widest">Chạm vào vị trí trên xe để đánh dấu lỗi</p>
          </div>
          <div className="flex flex-wrap gap-3 md:gap-4">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
              <span className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">Trầy xước</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-orange-500" />
              <span className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">Móp méo</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
              <span className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">Nứt vỡ</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CAR_VIEWS.map((view) => (
            <div key={view.id} className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em]">{view.label}</p>
              </div>
              <div 
                className="relative aspect-[16/10] bg-slate-900 rounded-[32px] border border-white/5 overflow-hidden cursor-crosshair group shadow-xl"
                onClick={(e) => handleCanvasClick(e, view.id)}
              >
                <img 
                  src={view.image} 
                  alt={view.label} 
                  className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity pointer-events-none"
                  referrerPolicy="no-referrer"
                />
                
                {/* Points for this view */}
                {points.filter(p => p.view === view.id || (!p.view && view.id === 'front')).map((point) => (
                  <button
                    key={point.id}
                    className={`absolute w-6 h-6 -ml-3 -mt-3 rounded-full flex items-center justify-center transition-all hover:scale-125 z-10 shadow-2xl ${
                      selectedPoint?.id === point.id ? 'ring-2 ring-white scale-125' : ''
                    } ${
                      point.type === 'scratch' ? 'bg-red-500' : 
                      point.type === 'dent' ? 'bg-orange-500' : 
                      point.type === 'crack' ? 'bg-yellow-500' : 'bg-blue-500'
                    }`}
                    style={{ left: `${point.x}%`, top: `${point.y}%` }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPoint(point);
                    }}
                  >
                    <AlertCircle className="w-4 h-4 text-white" />
                    {selectedPoint?.id === point.id && (
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-slate-900 text-[8px] font-black px-2 py-1 rounded-full whitespace-nowrap shadow-xl uppercase tracking-widest">
                        {point.type}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Checklist Section */}
      <div className="bg-slate-900/50 p-4 md:p-8 rounded-[32px] md:rounded-[40px] border border-white/5 shadow-2xl space-y-6 md:space-y-8">
        <div className="flex items-center gap-3 md:gap-4">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-blue-600/20 flex items-center justify-center text-blue-500">
            <FileCheck className="w-5 h-5 md:w-6 md:h-6" />
          </div>
          <div>
            <h4 className="section-title text-lg md:text-xl mb-0">Bảng Kiểm Tra Chi Tiết</h4>
            <p className="section-subtitle mb-0 text-[8px] md:text-[10px]">Đánh giá tình trạng các hạng mục chính</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CHECKLIST_ITEMS.map((item) => (
            <div key={item.id} className="bg-slate-950/50 p-4 rounded-2xl border border-white/5 flex items-center justify-between group hover:border-white/10 transition-all">
              <div className="space-y-1">
                <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest">{item.category}</p>
                <p className="text-sm font-bold text-white">{item.label}</p>
              </div>
              <div className="flex gap-2">
                {(['ok', 'warning', 'error', 'na'] as const).map((status) => (
                  <button
                    key={status}
                    disabled={readOnly}
                    onClick={() => handleChecklistToggle(item.id, status)}
                    className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                      checklist[item.id] === status
                        ? status === 'ok' ? 'bg-emerald-500 text-white' :
                          status === 'warning' ? 'bg-orange-500 text-white' :
                          status === 'error' ? 'bg-red-500 text-white' : 'bg-slate-700 text-white'
                        : 'bg-slate-900 text-slate-600 hover:bg-slate-800'
                    }`}
                    title={status.toUpperCase()}
                  >
                    {status === 'ok' && <Check className="w-4 h-4" />}
                    {status === 'warning' && <AlertCircle className="w-4 h-4" />}
                    {status === 'error' && <X className="w-4 h-4" />}
                    {status === 'na' && <span className="text-[8px] font-black">N/A</span>}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Point Details Editor */}
      <AnimatePresence>
        {selectedPoint && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="bg-slate-900/50 p-6 rounded-[32px] border border-white/5 shadow-2xl"
          >
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${
                selectedPoint.type === 'scratch' ? 'bg-red-500' : 
                selectedPoint.type === 'dent' ? 'bg-orange-500' : 
                selectedPoint.type === 'crack' ? 'bg-yellow-500' : 'bg-blue-500'
              }`} />
              <h4 className="font-black text-white uppercase tracking-widest text-xs">Chi tiết điểm đánh dấu</h4>
            </div>
            <button onClick={() => setSelectedPoint(null)} className="p-2 hover:bg-white/5 rounded-xl transition-colors">
              <X className="w-5 h-5 text-slate-500" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="label-premium">Loại hư hại</label>
              <select
                disabled={readOnly}
                value={selectedPoint.type}
                onChange={(e) => updatePoint(selectedPoint.id, { type: e.target.value as any })}
                className="input-premium"
              >
                <option value="scratch">Trầy xước (Scratch)</option>
                <option value="dent">Móp méo (Dent)</option>
                <option value="crack">Nứt vỡ / Bẩn (Crack/Stain)</option>
                <option value="other">Khác (Other)</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="label-premium">Ghi chú chi tiết</label>
              <input
                disabled={readOnly}
                type="text"
                value={selectedPoint.note || ''}
                onChange={(e) => updatePoint(selectedPoint.id, { note: e.target.value })}
                placeholder="Mô tả cụ thể tình trạng..."
                className="input-premium"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="label-premium">Ảnh thực tế (Close-up)</label>
              <div className="flex items-center gap-4">
                {selectedPoint.photo ? (
                  <div className="relative w-24 h-24 rounded-2xl overflow-hidden border border-white/10 group/photo">
                    <img src={selectedPoint.photo} alt="Damage" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    {!readOnly && (
                      <button 
                        onClick={() => updatePoint(selectedPoint.id, { photo: undefined })}
                        className="absolute inset-0 bg-red-500/80 opacity-0 group-hover/photo:opacity-100 transition-opacity flex items-center justify-center text-white"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ) : !readOnly && (
                  <label className="w-24 h-24 rounded-2xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center gap-2 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all cursor-pointer">
                    <Camera className="w-6 h-6 text-slate-500" />
                    <span className="text-[8px] font-black uppercase text-slate-500">Tải ảnh</span>
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*" 
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            updatePoint(selectedPoint.id, { photo: reader.result as string });
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
                )}
                <p className="text-[10px] text-slate-500 leading-relaxed italic">
                  Chụp ảnh cận cảnh vị trí hư hại để làm bằng chứng đối chiếu sau khi hoàn thành dịch vụ.
                </p>
              </div>
            </div>
          </div>

          {!readOnly && (
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => removePoint(selectedPoint.id)}
                className="px-6 py-2.5 text-[10px] font-black uppercase tracking-widest text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
              >
                Xóa điểm đánh dấu
              </button>
            </div>
          )}
        </motion.div>
      )}
      </AnimatePresence>
    </div>
  );
};

export default VisualCarInspection;
