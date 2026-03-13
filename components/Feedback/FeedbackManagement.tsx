import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Star, Trash2, Search, Filter, User, MessageSquare, CheckCircle2 } from 'lucide-react';
import { Review, Service } from '../../types';

interface FeedbackManagementProps {
  reviews: Review[];
  setReviews: React.Dispatch<React.SetStateAction<Review[]>>;
  services: Service[];
}

export const FeedbackManagement: React.FC<FeedbackManagementProps> = ({ reviews, setReviews, services }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRating, setFilterRating] = useState<number | 'all'>('all');

  const handleDelete = (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa đánh giá này?')) {
      setReviews(prev => prev.filter(r => r.id !== id));
    }
  };

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = review.author.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         review.text.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRating = filterRating === 'all' || review.rating === filterRating;
    return matchesSearch && matchesRating;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Quản Lý Đánh Giá</h3>
          <p className="text-slate-500 text-sm font-medium">Xem và quản lý phản hồi từ khách hàng.</p>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input 
            type="text"
            placeholder="Tìm kiếm theo tên hoặc nội dung..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 transition-all font-bold"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
          <button 
            onClick={() => setFilterRating('all')}
            className={`px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all whitespace-nowrap ${
              filterRating === 'all' ? 'bg-blue-600 text-white' : 'bg-white/5 text-slate-400 hover:bg-white/10'
            }`}
          >
            Tất Cả
          </button>
          {[5, 4, 3, 2, 1].map(rating => (
            <button 
              key={rating}
              onClick={() => setFilterRating(rating)}
              className={`px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all whitespace-nowrap flex items-center gap-2 ${
                filterRating === rating ? 'bg-blue-600 text-white' : 'bg-white/5 text-slate-400 hover:bg-white/10'
              }`}
            >
              {rating} <Star className={`w-3 h-3 ${filterRating === rating ? 'fill-white' : 'fill-slate-400'}`} />
            </button>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredReviews.length > 0 ? (
          filteredReviews.map((review) => (
            <motion.div
              key={review.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 group hover:bg-white/[0.07] transition-all"
            >
              <div className="flex gap-6 items-start flex-1">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 shrink-0">
                  <User className="w-6 h-6 text-blue-500" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
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
                  <p className="text-slate-400 text-sm font-medium leading-relaxed mb-3">
                    {review.text}
                  </p>
                  {review.serviceId && (
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Dịch vụ:</span>
                      <span className="text-blue-500 font-bold text-xs uppercase">
                        {services.find(s => s.id === review.serviceId)?.title || 'Dịch vụ Detailing'}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                <button 
                  onClick={() => handleDelete(review.id)}
                  className="p-4 rounded-2xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all border border-red-500/20"
                  title="Xóa đánh giá"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-20 bg-white/5 border border-dashed border-white/10 rounded-[40px]">
            <MessageSquare className="w-12 h-12 text-slate-700 mx-auto mb-4" />
            <p className="text-slate-500 font-bold">Không tìm thấy đánh giá nào phù hợp.</p>
          </div>
        )}
      </div>
    </div>
  );
};
