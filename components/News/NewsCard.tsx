import React from 'react';
import { motion } from 'motion/react';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { NewsArticle } from './types';

interface NewsCardProps {
  article: NewsArticle;
  idx: number;
  onClick: () => void;
}

export const NewsCard: React.FC<NewsCardProps> = ({ article, idx, onClick }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.1 }}
      onClick={onClick}
      className="group cursor-pointer"
    >
      <div className="relative aspect-[16/10] rounded-[32px] overflow-hidden mb-6 border border-white/5">
        <img 
          src={article.image} 
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-blue-600 text-white text-[8px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-xl">
            {article.category}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-3 text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-3">
        <Calendar className="w-3 h-3" /> {article.date}
        <span className="w-1 h-1 rounded-full bg-slate-700"></span>
        <User className="w-3 h-3" /> {article.author}
      </div>
      <h3 className="text-xl font-black text-white uppercase tracking-tight mb-3 group-hover:text-blue-500 transition-colors line-clamp-2">
        {article.title}
      </h3>
      <p className="text-slate-400 text-sm line-clamp-2 mb-6 leading-relaxed">
        {article.summary}
      </p>
      <div className="flex items-center gap-2 text-blue-500 text-[10px] font-black uppercase tracking-widest group-hover:gap-4 transition-all">
        Đọc Thêm <ArrowRight className="w-3 h-3" />
      </div>
    </motion.div>
  );
};
