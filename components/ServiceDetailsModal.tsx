import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap, ShieldCheck, Clock, Calendar, Bot } from 'lucide-react';
import { Service } from '../types';

interface ServiceDetailsModalProps {
  isOpen: boolean; 
  onClose: () => void; 
  service: Service | null; 
  onBooking: (serviceId: string, subServiceTitle?: string) => void;
  onAiChat: (service: Service) => void;
}

const ServiceDetailsModal: React.FC<ServiceDetailsModalProps> = ({ isOpen, onClose, service, onBooking, onAiChat }) => {
  if (!isOpen || !service) return null;

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
          className="bg-slate-950 border-t sm:border border-white/10 rounded-t-[40px] sm:rounded-[48px] shadow-[0_0_100px_rgba(0,0,0,0.5)] max-w-6xl w-full h-full sm:h-[90vh] overflow-hidden relative flex flex-col"
        >
          {/* Close Button */}
          <button 
            onClick={onClose} 
            className="absolute top-6 right-6 z-50 bg-white/5 hover:bg-red-500/20 hover:text-red-500 backdrop-blur-xl p-3 rounded-2xl text-white transition-all shadow-2xl active:scale-90 border border-white/10"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="flex flex-col lg:flex-row min-h-full">
              {/* Left Column: Content */}
              <div className="flex-1">
                {/* Hero Image */}
                <div className="w-full h-[350px] sm:h-[600px] relative overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-[3000ms]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                  <div className="absolute bottom-12 left-8 sm:left-16 right-8 sm:right-16">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="flex items-center gap-6 mb-6">
                        <div className="bg-blue-600/20 backdrop-blur-3xl border border-blue-500/30 p-5 sm:p-6 rounded-[32px] shadow-2xl shadow-blue-600/20">
                          <span className="text-5xl sm:text-7xl">{service.icon}</span>
                        </div>
                        <div>
                          <span className="section-subtitle mb-2">Premium Detailing Solution</span>
                          <h3 className="section-title text-4xl sm:text-8xl leading-[0.8]">{service.title}</h3>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>

                <div className="p-8 sm:p-20 space-y-16 sm:space-y-24">
                  {/* Description Section */}
                  <section className="max-w-4xl">
                    <span className="label-premium">Giới thiệu dịch vụ</span>
                    <p className="text-slate-300 leading-relaxed text-xl sm:text-3xl font-medium italic font-serif">
                      "{service.description}"
                    </p>
                  </section>

                  {/* Upgrade Packages Section */}
                  {service.subServices && service.subServices.length > 0 && (
                    <section>
                      <span className="label-premium">Các gói nâng cấp & Báo giá</span>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {service.subServices.map((sub, idx) => (
                          <motion.div 
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="card-premium group"
                          >
                            <div className="mb-10">
                              <div className="flex justify-between items-start mb-6">
                                <div className="w-16 h-16 rounded-2xl bg-slate-950 border border-white/5 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform shadow-xl">
                                  <Zap className="w-8 h-8" />
                                </div>
                                <div className="text-right">
                                  <p className="text-blue-500 font-black text-xl tracking-tighter uppercase">{sub.price || 'Liên hệ'}</p>
                                </div>
                              </div>
                              <h5 className="text-white font-black text-2xl mb-3 group-hover:text-blue-400 transition-colors uppercase tracking-tight">{sub.title}</h5>
                              {sub.note && <p className="text-base text-slate-400 font-medium leading-relaxed">{sub.note}</p>}
                            </div>
                            <button 
                              onClick={() => { onBooking(service.id, sub.title); onClose(); }}
                              className="btn-secondary w-full group-hover:bg-blue-600 group-hover:border-transparent transition-all"
                            >
                              Chọn gói này
                            </button>
                          </motion.div>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Features / Benefits */}
                  <section className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                    <div className="card-premium !p-10">
                      <div className="w-14 h-14 rounded-2xl bg-emerald-600/20 flex items-center justify-center text-emerald-500 mb-8 shadow-lg shadow-emerald-600/10">
                        <ShieldCheck className="w-7 h-7" />
                      </div>
                      <h5 className="text-white font-black uppercase tracking-tight text-lg mb-3">Cam kết chất lượng</h5>
                      <p className="text-slate-400 text-base leading-relaxed">Sử dụng 100% hóa chất nhập khẩu chính hãng, an toàn cho bề mặt xe và sức khỏe người dùng.</p>
                    </div>
                    <div className="card-premium !p-10">
                      <div className="w-14 h-14 rounded-2xl bg-amber-600/20 flex items-center justify-center text-amber-500 mb-8 shadow-lg shadow-amber-600/10">
                        <Clock className="w-7 h-7" />
                      </div>
                      <h5 className="text-white font-black uppercase tracking-tight text-lg mb-3">Bảo hành dài hạn</h5>
                      <p className="text-slate-400 text-base leading-relaxed">Chế độ bảo hành điện tử minh bạch, hỗ trợ bảo trì định kỳ miễn phí cho các gói cao cấp.</p>
                    </div>
                  </section>
                </div>
              </div>

              {/* Right Column: Sidebar */}
              <div className="w-full lg:w-[450px] border-t lg:border-t-0 lg:border-l border-white/5 bg-slate-900/30 backdrop-blur-3xl p-10 sm:p-16 lg:sticky lg:top-0 lg:h-screen flex flex-col justify-between">
                <div className="space-y-16">
                  <div className="text-center lg:text-left">
                    <span className="label-premium">Báo giá dịch vụ</span>
                    <div className="flex items-baseline justify-center lg:justify-start gap-3">
                      <span className="text-4xl sm:text-5xl font-black text-white tracking-tighter uppercase">{service.price || 'Liên hệ báo giá'}</span>
                    </div>
                    <p className="text-slate-500 text-xs sm:text-sm font-medium mt-6 leading-relaxed">Vui lòng đặt lịch hoặc liên hệ hotline để nhận báo giá chính xác nhất cho xế yêu của bạn.</p>
                  </div>

                  <div className="space-y-8">
                    <h5 className="label-premium flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                      Quy trình thực hiện
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5">
                      {['Kiểm tra tình trạng xe', 'Tư vấn giải pháp tối ưu', 'Vệ sinh chuyên sâu', 'Thi công kỹ thuật cao', 'Kiểm tra chất lượng (QC)'].map((step, i) => (
                        <div key={i} className="flex items-center gap-5 group">
                          <div className="w-10 h-10 rounded-xl bg-slate-950 border border-white/5 flex items-center justify-center text-xs font-black text-slate-500 group-hover:border-blue-500/50 group-hover:text-blue-500 transition-all shrink-0 shadow-lg">
                            0{i + 1}
                          </div>
                          <span className="text-slate-300 text-base font-bold group-hover:text-white transition-colors">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-16 space-y-5 sticky bottom-0 bg-slate-950/80 backdrop-blur-2xl p-6 -mx-10 sm:-mx-16 lg:mx-0 lg:p-0 lg:bg-transparent lg:backdrop-blur-none lg:static border-t border-white/5 lg:border-0">
                  <button 
                    onClick={() => { onBooking(service.id); onClose(); }}
                    className="btn-primary w-full !py-6 !rounded-[24px] shadow-blue-600/30"
                  >
                    <Calendar className="w-6 h-6" /> Đặt lịch ngay
                  </button>
                  <button 
                    onClick={() => { onAiChat(service); onClose(); }}
                    className="w-full py-6 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black uppercase tracking-[0.2em] rounded-[24px] transition-all active:scale-95 shadow-2xl shadow-emerald-600/30 flex items-center justify-center gap-3 border border-emerald-400/20"
                  >
                    <Bot className="w-6 h-6" /> Tư vấn với AI
                  </button>
                  <button 
                    onClick={onClose}
                    className="btn-secondary w-full !py-6 !rounded-[24px]"
                  >
                    Quay lại
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ServiceDetailsModal;
