import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, MessageCircle, MapPin, ChevronUp, ClipboardCheck } from 'lucide-react';
import { SiteConfig } from '../types';

interface StickyContactBarProps {
  siteConfig: SiteConfig;
  onInspectionClick: () => void;
}

const StickyContactBar: React.FC<StickyContactBarProps> = ({ siteConfig, onInspectionClick }) => {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {/* Desktop Scroll to Top */}
      <AnimatePresence>
        {isVisible && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={scrollToTop}
            className="fixed bottom-24 right-6 z-[100] hidden md:flex w-12 h-12 bg-blue-600 text-white rounded-full items-center justify-center shadow-2xl hover:bg-blue-500 transition-all border border-white/20"
          >
            <ChevronUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Mobile Sticky Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-[150] md:hidden p-3 pointer-events-none">
        <motion.div 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="bg-slate-900/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl flex items-center justify-around p-1 pointer-events-auto"
        >
          <motion.a 
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            href={`tel:${siteConfig.contactPhone}`}
            className="flex flex-col items-center gap-0.5 p-2 text-slate-400 hover:text-blue-500 transition-colors"
          >
            <div className="w-8 h-8 rounded-xl bg-blue-600/10 flex items-center justify-center">
              <Phone className="w-4 h-4 text-blue-500" />
            </div>
            <span className="text-[8px] font-black uppercase tracking-widest">Gọi</span>
          </motion.a>

          <motion.a 
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            href={`https://zalo.me/${siteConfig.zaloNumber || '0588896699'}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-0.5 p-2 text-slate-400 hover:text-blue-500 transition-colors"
          >
            <div className="w-8 h-8 rounded-xl bg-blue-600/10 flex items-center justify-center">
              <MessageCircle className="w-4 h-4 text-blue-500" />
            </div>
            <span className="text-[8px] font-black uppercase tracking-widest">Zalo</span>
          </motion.a>

          <motion.a 
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.contactAddress)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-0.5 p-2 text-slate-400 hover:text-blue-500 transition-colors"
          >
            <div className="w-8 h-8 rounded-xl bg-blue-600/10 flex items-center justify-center">
              <MapPin className="w-4 h-4 text-blue-500" />
            </div>
            <span className="text-[8px] font-black uppercase tracking-widest">Đường</span>
          </motion.a>
        </motion.div>
      </div>
    </>
  );
};

export default StickyContactBar;
