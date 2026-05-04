
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, CheckCircle2 } from 'lucide-react';

const RECENT_BOOKINGS = [
  { name: 'Anh Hùng', service: 'Phủ Ceramic Diamond 9H', car: 'Mercedes S450', time: '2 phút trước' },
  { name: 'Chị Lan', service: 'Dọn Nội Thất Chuyên Sâu', car: 'BMW X5', time: '5 phút trước' },
  { name: 'Anh Tuấn', service: 'Dán PPF Full Xe', car: 'Porsche Panamera', time: '12 phút trước' },
  { name: 'Anh Minh', service: 'Rửa Xe Detailing 3 Bước', car: 'Audi A6', time: '15 phút trước' },
  { name: 'Chị Thảo', service: 'Dán Phim Cách Nhiệt 3M', car: 'Lexus RX350', time: '20 phút trước' },
  { name: 'Anh Dũng', service: 'Hiệu Chỉnh & Đánh Bóng Sơn', car: 'Ford Everest', time: '25 phút trước' },
  { name: 'Anh Hoàng', service: 'Vệ Sinh Khoang Máy Hơi Nước', car: 'Toyota Camry', time: '30 phút trước' },
  { name: 'Chị Mai', service: 'Wrap Đổi Màu Cao Cấp', car: 'Mini Cooper', time: '45 phút trước' },
];

const LiveBookingTicker: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => setIsVisible(true), 3000);
    
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % RECENT_BOOKINGS.length);
        setIsVisible(true);
      }, 1000);
    }, 15000); // Show every 15 seconds

    return () => {
      clearTimeout(showTimer);
      clearInterval(interval);
    };
  }, []);

  const booking = RECENT_BOOKINGS[currentIndex];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: -50, y: -50, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          exit={{ opacity: 0, x: -50, y: -50, scale: 0.8 }}
          className="fixed top-24 left-4 md:top-28 md:left-6 z-[100] max-w-[320px] w-full"
        >
          <div className="bg-slate-900/80 backdrop-blur-2xl border border-white/10 rounded-[24px] p-4 shadow-2xl flex items-center gap-4 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 blur-2xl -z-10"></div>
            
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0 border border-emerald-500/20">
              <ShoppingBag className="w-6 h-6 text-emerald-500" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">ĐẶT LỊCH MỚI</span>
                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
              </div>
              <p className="text-white text-xs font-bold leading-tight mb-1 truncate">
                <span className="text-blue-400">{booking.name}</span> vừa đặt {booking.service}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-[9px] text-slate-500 font-bold uppercase">{booking.car}</span>
                <span className="text-[9px] text-slate-600 italic">{booking.time}</span>
              </div>
            </div>

            <button 
              onClick={() => setIsVisible(false)}
              className="absolute top-2 right-2 text-slate-600 hover:text-white transition-colors"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LiveBookingTicker;
