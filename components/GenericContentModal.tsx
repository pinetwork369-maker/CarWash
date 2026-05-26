import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface GenericContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const GenericContentModal: React.FC<GenericContentModalProps> = ({ isOpen, onClose, title, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[250] overflow-hidden">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950" 
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="relative h-full w-full bg-slate-950 flex flex-col"
          >
             {/* Dynamic Header */}
             <div className="sticky top-0 z-50 p-6 sm:p-10 border-b border-white/5 bg-slate-950/80 backdrop-blur-2xl flex justify-between items-center group">
               <div className="space-y-1">
                 <div className="flex items-center gap-4">
                   <button 
                     onClick={onClose} 
                     className="w-12 h-12 rounded-2xl bg-white/5 hover:bg-blue-600 flex items-center justify-center text-slate-400 hover:text-white transition-all active:scale-90 group/btn shadow-xl shadow-blue-900/0 hover:shadow-blue-900/40"
                   >
                     <span className="text-xl sm:text-2xl">←</span>
                   </button>
                   <div>
                     <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tighter leading-tight">{title}</h2>
                     <div className="h-1 w-12 bg-blue-600 rounded-full mt-1 group-hover:w-24 transition-all duration-500"></div>
                   </div>
                 </div>
               </div>
               
               <div className="hidden sm:flex items-center gap-4">
                 <button onClick={onClose} className="px-6 py-3 rounded-xl bg-white/5 text-slate-400 font-bold uppercase text-[10px] tracking-widest hover:text-white hover:bg-white/10 transition-all">Quay lại trang chủ</button>
               </div>
             </div>

             {/* Content Area */}
             <div className="flex-1 overflow-y-auto custom-scrollbar">
               <div className="container mx-auto px-4 py-12 sm:py-24">
                 {children}
               </div>

               {/* Footer Decoration */}
               <div className="container mx-auto px-4 pb-24 text-center">
                 <div className="h-px bg-gradient-to-r from-transparent via-white/5 to-transparent mb-12"></div>
                 <p className="text-slate-600 font-black uppercase text-[10px] tracking-[0.4em]">© XE ĐẸP PRO DETAILING</p>
               </div>
             </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
