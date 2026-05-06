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
        <div className="fixed inset-0 z-[200] overflow-y-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/90 backdrop-blur-xl" 
            onClick={onClose}
          />
          <div className="relative min-h-screen flex items-center justify-center p-4 sm:p-10 pointer-events-none">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-slate-900 border border-white/10 rounded-[40px] w-full max-w-7xl overflow-hidden shadow-2xl pointer-events-auto flex flex-col max-h-[90vh]"
            >
               <div className="p-8 border-b border-white/5 flex justify-between items-center bg-slate-950/50">
                 <h2 className="text-2xl font-black text-white uppercase tracking-tighter">{title}</h2>
                 <button onClick={onClose} className="w-12 h-12 rounded-2xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all active:scale-90">✕</button>
               </div>
               <div className="p-8 sm:p-12 overflow-y-auto custom-scrollbar bg-slate-950/20">
                 {children}
               </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
