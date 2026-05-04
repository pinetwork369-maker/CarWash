import React from 'react';
import { motion } from 'motion/react';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { NewsArticle } from './types';

interface NewsCardProps {
  article: NewsArticle;
  idx: number;
  onClick: () => void;
  t: (key: string) => string;
}

export const NewsCard: React.FC<NewsCardProps> = ({ article, idx, onClick, t }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.1 }}
      onClick={onClick}
      className="group cursor-pointer"
    >
      <div className="relative aspect-[16/10] rounded-2xl sm:rounded-[32px] overflow-hidden mb-4 sm:mb-6 border border-white/5">
        <img 
          src={article.image} 
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
          <span className="bg-blue-600 text-white text-[7px] sm:text-[8px] font-black uppercase tracking-widest px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-xl">
            {article.category}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-3 text-slate-500 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest mb-2 sm:mb-3">
        <Calendar className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> {article.date}
        <span className="w-1 h-1 rounded-full bg-slate-700"></span>
        <User className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> {article.author}
      </div>
      <h3 className="text-lg sm:text-xl font-black text-white uppercase tracking-tight mb-2 sm:mb-3 group-hover:text-blue-500 transition-colors line-clamp-2">
        {article.title}
      </h3>
      <p className="text-slate-400 text-xs sm:text-sm line-clamp-2 mb-4 sm:mb-6 leading-relaxed opacity-80">
        {article.excerpt}
      </p>
      <div className="flex items-center gap-2 text-blue-500 text-[10px] font-black uppercase tracking-widest group-hover:gap-4 transition-all">
        {t('read_more')} <ArrowRight className="w-3 h-3" />
      </div>
    </motion.div>
  );
};
