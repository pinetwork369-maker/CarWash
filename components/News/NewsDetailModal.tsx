import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, User, X, Tag, Clock, Share2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { NewsArticle } from './types';

interface NewsDetailModalProps {
  article: NewsArticle | null;
  onClose: () => void;
}

export const NewsDetailModal: React.FC<NewsDetailModalProps> = ({ article, onClose }) => {
  return (
    <AnimatePresence>
      {article && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[400] flex items-center justify-center p-0 sm:p-4 bg-slate-950/95 backdrop-blur-2xl"
        >
          <div className="absolute inset-0" onClick={onClose} />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 40 }}
            className="relative bg-slate-900 border border-white/10 sm:rounded-[40px] w-full max-w-5xl h-full sm:max-h-[90vh] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] flex flex-col"
          >
            <div className="absolute top-6 right-6 z-50">
              <button 
                onClick={onClose}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-black/50 backdrop-blur-xl text-white flex items-center justify-center hover:bg-red-600 transition-all border border-white/10"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            <div className="overflow-y-auto custom-scrollbar flex-1">
              <div className="relative h-[40vh] sm:h-[500px]">
                <img 
                  src={article.image} 
                  className="w-full h-full object-cover" 
                  alt={article.title}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-12">
                  <div className="flex flex-wrap gap-3 mb-6">
                    <span className="bg-blue-600 text-white text-[9px] font-black uppercase tracking-widest px-4 py-2 rounded-full shadow-xl">
                      {article.category}
                    </span>
                    <span className="bg-white/10 backdrop-blur-md text-white text-[9px] font-black uppercase tracking-widest px-4 py-2 rounded-full border border-white/10">
                      5 Phút Đọc
                    </span>
                  </div>
                  <h2 className="text-3xl sm:text-6xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-4">
                    {article.title}
                  </h2>
                </div>
              </div>

              <div className="p-6 sm:p-16">
                <div className="flex flex-wrap items-center gap-8 text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-12 pb-12 border-b border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-600/20 flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-blue-500" />
                    </div>
                    {article.date}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-600/20 flex items-center justify-center">
                      <User className="w-4 h-4 text-blue-500" />
                    </div>
                    {article.author}
                  </div>
                  <button className="ml-auto flex items-center gap-2 hover:text-white transition-colors">
                    <Share2 className="w-4 h-4" /> Chia sẻ
                  </button>
                </div>

                <div className="max-w-3xl mx-auto">
                  <div className="markdown-body prose prose-invert prose-blue max-w-none">
                    <ReactMarkdown>{article.content}</ReactMarkdown>
                  </div>
                </div>

                <div className="mt-20 pt-12 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-10">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white font-black text-2xl shadow-xl">
                      {article.author.charAt(0)}
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-1">Được viết bởi</p>
                      <p className="text-xl font-black text-white uppercase tracking-tight">{article.author}</p>
                      <p className="text-xs text-slate-500 font-medium">Chuyên gia Detailing tại Carwash Detailing</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button 
                      onClick={onClose}
                      className="bg-white text-slate-950 px-10 py-5 rounded-2xl font-black uppercase tracking-widest transition-all active:scale-95 text-xs"
                    >
                      Đóng Bài Viết
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
