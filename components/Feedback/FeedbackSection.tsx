import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, MessageSquare, User, Send, CheckCircle2, X } from 'lucide-react';
import { Review, Service } from '../../types';

interface FeedbackSectionProps {
  reviews: Review[];
  services: Service[];
  onAddReview: (review: Omit<Review, 'id'>) => void;
}

export const FeedbackSection: React.FC<FeedbackSectionProps> = ({ reviews, services, onAddReview }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newReview, setNewReview] = useState({
    author: '',
    text: '',
    rating: 5,
    serviceId: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.author || !newReview.text) return;
    
    onAddReview(newReview);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setIsModalOpen(false);
      setNewReview({ author: '', text: '', rating: 5, serviceId: '' });
    }, 2000);
  };

  return (
    <section id="feedback" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-600 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <span className="text-blue-500 font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Khách Hàng Nói Gì</span>
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none">
              Đánh Giá <span className="text-blue-500">& Phản Hồi</span>
            </h2>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest text-xs rounded-2xl transition-all shadow-lg shadow-blue-600/20"
          >
            Gửi Đánh Giá Của Bạn
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-slate-900/50 border border-white/5 p-8 rounded-[32px] hover:border-blue-500/30 transition-all group"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                  <User className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h4 className="text-white font-black uppercase tracking-tight">{review.author}</h4>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-3 h-3 ${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-slate-700'}`} 
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              <p className="text-slate-400 font-medium leading-relaxed mb-6 italic">
                "{review.text}"
              </p>

              {review.serviceId && (
                <div className="pt-6 border-t border-white/5">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1">Dịch vụ đã sử dụng</span>
                  <span className="text-blue-400 font-bold text-sm">
                    {services.find(s => s.id === review.serviceId)?.title || 'Dịch vụ Detailing'}
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Feedback Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-slate-900 border border-white/10 rounded-[40px] overflow-hidden shadow-2xl"
            >
              {isSubmitted ? (
                <div className="p-12 text-center">
                  <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500/30">
                    <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                  </div>
                  <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">Cảm Ơn Bạn!</h3>
                  <p className="text-slate-400 font-medium">Đánh giá của bạn đã được gửi thành công và đang chờ duyệt.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-8 sm:p-12">
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Gửi Đánh Giá</h3>
                    <button 
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                    >
                      <X className="w-5 h-5 text-white" />
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block">Họ Tên Của Bạn</label>
                      <input 
                        type="text"
                        required
                        value={newReview.author}
                        onChange={e => setNewReview({...newReview, author: e.target.value})}
                        placeholder="VD: Nguyễn Văn A"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 transition-all font-bold"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block">Dịch Vụ Đã Sử Dụng</label>
                      <select 
                        value={newReview.serviceId}
                        onChange={e => setNewReview({...newReview, serviceId: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-blue-500/50 transition-all font-bold appearance-none"
                      >
                        <option value="" className="bg-slate-900">Chọn dịch vụ...</option>
                        {services.map(service => (
                          <option key={service.id} value={service.id} className="bg-slate-900">{service.title}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block">Mức Độ Hài Lòng</label>
                      <div className="flex gap-4">
                        {[1, 2, 3, 4, 5].map(star => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setNewReview({...newReview, rating: star})}
                            className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-all ${
                              newReview.rating >= star 
                                ? 'bg-yellow-500/10 border-yellow-500/50 text-yellow-500' 
                                : 'bg-white/5 border-white/10 text-slate-600'
                            }`}
                          >
                            <Star className={`w-6 h-6 ${newReview.rating >= star ? 'fill-yellow-500' : ''}`} />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block">Nhận Xét Của Bạn</label>
                      <textarea 
                        required
                        rows={4}
                        value={newReview.text}
                        onChange={e => setNewReview({...newReview, text: e.target.value})}
                        placeholder="Chia sẻ trải nghiệm của bạn tại Dũng Car Detailing..."
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 transition-all font-bold resize-none"
                      />
                    </div>

                    <button 
                      type="submit"
                      className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-[0.2em] text-xs rounded-2xl transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center gap-3"
                    >
                      <Send className="w-4 h-4" />
                      Gửi Đánh Giá Ngay
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
