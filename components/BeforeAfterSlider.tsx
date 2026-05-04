import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { MoveHorizontal, PenTool } from 'lucide-react';

interface BeforeAfterSliderProps {
  before: string;
  after: string;
  label?: string;
  className?: string;
  isEditMode?: boolean;
  isDesignAuthenticated?: boolean;
  onUpdateBefore?: (url: string) => void;
  onUpdateAfter?: (url: string) => void;
  onUpdateLabel?: (text: string) => void;
}

const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({ 
  before, 
  after, 
  label, 
  className = "",
  isEditMode = false,
  isDesignAuthenticated = false,
  onUpdateBefore,
  onUpdateAfter,
  onUpdateLabel
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isResizing, setIsResizing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const beforeInputRef = useRef<HTMLInputElement>(null);
  const afterInputRef = useRef<HTMLInputElement>(null);

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, side: 'before' | 'after') => {
    const file = e.target.files?.[0];
    if (file) {
      const base64 = await fileToBase64(file);
      if (side === 'before' && onUpdateBefore) onUpdateBefore(base64);
      if (side === 'after' && onUpdateAfter) onUpdateAfter(base64);
    }
  };

  const handleMove = (e: MouseEvent | TouchEvent) => {
    if (!containerRef.current || (!isResizing && e.type !== 'mousemove')) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const position = ((x - rect.left) / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, position)));
  };

  const handleStart = () => setIsResizing(true);
  const handleEnd = () => setIsResizing(false);

  useEffect(() => {
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleEnd);
    window.addEventListener('touchmove', handleMove);
    window.addEventListener('touchend', handleEnd);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [isResizing]);

  const canEdit = isEditMode && isDesignAuthenticated;

  return (
    <div className={`space-y-4 ${className}`}>
      {label !== undefined && (
        <div className="flex items-center gap-3 group/label">
          <div className="h-4 w-1 bg-blue-600 rounded-full" />
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">{label}</p>
          {canEdit && onUpdateLabel && (
            <button 
              onClick={() => {
                const newLabel = prompt("Nhập tiêu đề mới:", label);
                if (newLabel !== null) onUpdateLabel(newLabel);
              }}
              className="opacity-0 group-hover/label:opacity-100 p-1 bg-white/5 rounded-lg text-blue-500 hover:bg-white/10 transition-all"
            >
              <PenTool className="w-3 h-3" />
            </button>
          )}
        </div>
      )}
      
      <div 
        ref={containerRef}
        className="relative aspect-[16/9] rounded-[40px] overflow-hidden cursor-ew-resize select-none border border-white/5 shadow-2xl group"
        onMouseDown={handleStart}
        onTouchStart={handleStart}
      >
        {/* After Image */}
        <img 
          src={after} 
          alt="After" 
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        
        {/* Before Image (Clipped) */}
        <div 
          className="absolute inset-0 overflow-hidden border-r-2 border-white/20"
          style={{ width: `${sliderPosition}%` }}
        >
          <img 
            src={before} 
            alt="Before" 
            className="absolute inset-0 w-full h-full object-cover"
            style={{ 
              width: `${100 * (100 / Math.max(0.1, sliderPosition))}%`, 
              maxWidth: 'none'
            }}
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Labels Overlay */}
        <div className="absolute top-6 left-6 flex flex-col items-start gap-2">
          <div className="px-3 py-1 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-[8px] font-black text-white uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Trước
          </div>
          {canEdit && onUpdateBefore && (
            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
              <button 
                onClick={() => beforeInputRef.current?.click()}
                className="bg-blue-600 text-white font-black text-[8px] uppercase px-3 py-1.5 rounded-full shadow-xl hover:bg-blue-500 transition-all active:scale-95"
              >
                Thay Ảnh Trước
              </button>
              <button 
                onClick={() => {
                  const url = prompt("Nhập URL ảnh trước:", before);
                  if (url) onUpdateBefore(url);
                }}
                className="bg-slate-800 text-white font-black text-[8px] uppercase px-3 py-1.5 rounded-full shadow-xl hover:bg-slate-700 transition-all active:scale-95"
              >
                URL
              </button>
              <input type="file" ref={beforeInputRef} onChange={(e) => handleFileChange(e, 'before')} accept="image/*" className="hidden" />
            </div>
          )}
        </div>
        <div className="absolute top-6 right-6 flex flex-col items-end gap-2">
          <div className="px-3 py-1 bg-blue-600/40 backdrop-blur-md border border-blue-500/20 rounded-full text-[8px] font-black text-white uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Sau
          </div>
          {canEdit && onUpdateAfter && (
            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
              <button 
                onClick={() => {
                  const url = prompt("Nhập URL ảnh sau:", after);
                  if (url) onUpdateAfter(url);
                }}
                className="bg-slate-800 text-white font-black text-[8px] uppercase px-3 py-1.5 rounded-full shadow-xl hover:bg-slate-700 transition-all active:scale-95"
              >
                URL
              </button>
              <button 
                onClick={() => afterInputRef.current?.click()}
                className="bg-blue-600 text-white font-black text-[8px] uppercase px-3 py-1.5 rounded-full shadow-xl hover:bg-blue-500 transition-all active:scale-95"
              >
                Thay Ảnh Sau
              </button>
              <input type="file" ref={afterInputRef} onChange={(e) => handleFileChange(e, 'after')} accept="image/*" className="hidden" />
            </div>
          )}
        </div>

        {/* Slider Handle */}
        <motion.div 
          className="absolute inset-y-0 z-10 flex items-center justify-center"
          style={{ left: `${sliderPosition}%` }}
          animate={{ scale: isResizing ? 1.1 : 1 }}
        >
          <div className="h-full w-0.5 bg-white/50 backdrop-blur-md" />
          <div className="absolute w-12 h-12 bg-white rounded-full shadow-2xl flex items-center justify-center border-4 border-slate-950 transition-transform group-hover:scale-110">
            <MoveHorizontal className="w-5 h-5 text-slate-900" />
          </div>
        </motion.div>

        {/* Interaction Hint */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-40 group-hover:opacity-0 transition-opacity duration-500">
           <div className="bg-black/20 backdrop-blur-sm p-4 rounded-full border border-white/10">
              <MoveHorizontal className="w-8 h-8 text-white/50" />
           </div>
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
