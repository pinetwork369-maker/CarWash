import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Clock, Calendar, ShieldCheck, Zap, Package, ShoppingCart } from 'lucide-react';
import { DetailingPackage } from '../types';
interface PackageDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  pkg: DetailingPackage | null;
  onBooking: (packageId: string) => void;
  onAddToCart: (pkg: DetailingPackage) => void;
  t: (key: string) => string;
}

const PackageDetailsModal: React.FC<PackageDetailsModalProps> = ({ isOpen, onClose, pkg, onBooking, onAddToCart, t }) => {
  if (!isOpen || !pkg) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[250] flex items-center justify-center p-0 sm:p-4 bg-slate-950/95 backdrop-blur-2xl"
      >
        <div className="absolute inset-0" onClick={onClose} />
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="bg-slate-900 border-t sm:border border-white/10 rounded-t-[40px] sm:rounded-[48px] shadow-[0_0_100px_rgba(0,0,0,0.5)] max-w-5xl w-full h-full sm:h-auto max-h-[90vh] overflow-hidden relative flex flex-col"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-50 bg-black/50 hover:bg-red-600 backdrop-blur-xl p-3 rounded-2xl text-white transition-all shadow-2xl active:scale-90"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="flex-1 overflow-y-auto custom-scrollbar p-8 sm:p-16">
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Left Column: Header & Features */}
              <div className="flex-1 space-y-10">
                <div>
                  <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-600/10 border border-blue-500/20 mb-6">
                    <Package className="w-4 h-4 text-blue-500" />
                    <span className="text-blue-500 font-black uppercase tracking-widest text-[10px]">{pkg.category || t('service_package')}</span>
                  </div>
                  <h3 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tighter leading-tight mb-4">
                    {pkg.title}
                  </h3>
                  <p className="text-slate-400 text-lg sm:text-xl font-medium leading-relaxed italic serif">
                    "{pkg.description}"
                  </p>
                </div>

                <div className="space-y-6">
                  <h4 className="text-[11px] font-black text-blue-500 uppercase tracking-[0.2em] flex items-center gap-3">
                    <div className="w-8 h-[1px] bg-blue-500/30"></div>
                    {t('package_features')}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {(pkg.features || []).map((feature, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5"
                      >
                        <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                        </div>
                        <span className="text-slate-300 text-sm font-bold">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="p-6 rounded-3xl bg-slate-800/30 border border-white/5">
                    <ShieldCheck className="w-6 h-6 text-emerald-500 mb-4" />
                    <h5 className="text-white font-black uppercase text-xs tracking-widest mb-2">{t('quality_guarantee')}</h5>
                    <p className="text-slate-500 text-[11px] leading-relaxed">{t('quality_guarantee_desc')}</p>
                  </div>
                  <div className="p-6 rounded-3xl bg-slate-800/30 border border-white/5">
                    <Zap className="w-6 h-6 text-amber-500 mb-4" />
                    <h5 className="text-white font-black uppercase text-xs tracking-widest mb-2">{t('fast_service')}</h5>
                    <p className="text-slate-500 text-[11px] leading-relaxed">{t('fast_service_desc')}</p>
                  </div>
                </div>
              </div>

              {/* Right Column: Pricing & CTA */}
              <div className="w-full lg:w-[350px] space-y-8">
                <div className="p-8 rounded-[40px] bg-blue-600/10 border border-blue-500/20 text-center">
                  <span className="text-blue-500 font-black uppercase tracking-[0.2em] text-[10px] mb-4 block">{t('package_price')}</span>
                  <div className="text-5xl sm:text-6xl font-black text-white tracking-tighter mb-2">
                    {pkg.price}
                  </div>
                  <div className="flex items-center justify-center gap-2 text-slate-500 text-[11px] font-bold uppercase tracking-widest">
                    <Clock className="w-4 h-4" />
                    {t('execution_time')}: {pkg.duration}
                  </div>
                </div>

                <div className="space-y-4">
                  <button
                    onClick={() => { onBooking(pkg.id); onClose(); }}
                    className="w-full py-6 bg-blue-600 hover:bg-blue-500 text-white text-xs font-black uppercase tracking-[0.2em] rounded-[24px] transition-all active:scale-95 shadow-2xl shadow-blue-600/30 flex items-center justify-center gap-3"
                  >
                    <Calendar className="w-5 h-5" /> {t('book_now_package')}
                  </button>
                  <button
                    onClick={() => { onAddToCart(pkg); onClose(); }}
                    className="w-full py-6 bg-white/5 hover:bg-white/10 text-white text-xs font-black uppercase tracking-[0.2em] rounded-[24px] transition-all border border-white/10 flex items-center justify-center gap-3"
                  >
                    <ShoppingCart className="w-5 h-5" /> Thêm vào giỏ hàng
                  </button>
                  <button
                    onClick={onClose}
                    className="w-full py-6 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white text-xs font-black uppercase tracking-[0.2em] rounded-[24px] transition-all"
                  >
                    {t('back')}
                  </button>
                </div>

                <div className="p-6 rounded-3xl bg-slate-950/50 border border-white/5">
                  <p className="text-slate-500 text-[10px] leading-relaxed text-center italic">
                    {t('price_disclaimer')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PackageDetailsModal;
