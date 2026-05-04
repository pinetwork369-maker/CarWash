import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar } from 'lucide-react';
import { NewsArticle, SiteConfig } from '../types';
import SEO from './SEO';

interface NewsArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
  article: NewsArticle | null;
  siteConfig?: SiteConfig;
}

const NewsArticleModal: React.FC<NewsArticleModalProps> = ({ isOpen, onClose, article, siteConfig }) => {
  if (!isOpen || !article) return null;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": article.title,
    "image": [article.image],
    "datePublished": article.date,
    "description": article.excerpt,
    "author": {
      "@type": "Organization",
      "name": siteConfig?.siteName || "XE ĐẸP PRO",
      "url": window.location.origin
    },
    "publisher": {
      "@type": "Organization",
      "name": siteConfig?.siteName || "XE ĐẸP PRO",
      "logo": {
        "@type": "ImageObject",
        "url": siteConfig?.logoUrl || `${window.location.origin}/logo.png`
      }
    }
  };

  return (
    <>
      <SEO 
        title={article.title}
        description={article.metaDescription || article.excerpt}
        ogImage={article.image}
        ogType="article"
        keywords={article.metaKeywords}
        siteConfig={siteConfig}
      />
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      
      <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl"
      >
        <div className="absolute inset-0" onClick={onClose} />
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="bg-slate-900 border border-white/10 p-0 rounded-[32px] shadow-2xl max-w-4xl w-full relative overflow-hidden flex flex-col max-h-[90vh]"
        >
          <button onClick={onClose} className="absolute top-6 right-6 z-50 bg-black/50 hover:bg-red-600 backdrop-blur-xl p-3 rounded-2xl text-white transition-all shadow-2xl active:scale-90">
            <X className="w-6 h-6" />
          </button>
          
          <div className="overflow-y-auto custom-scrollbar">
            <div className="h-[300px] sm:h-[450px] relative">
              <img src={article.image} alt={article.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                    article.category === 'promotion' ? 'bg-red-600 text-white' : 
                    article.category === 'tip' ? 'bg-blue-600 text-white' : 'bg-emerald-600 text-white'
                  }`}>
                    {article.category === 'promotion' ? 'Khuyến mãi' : article.category === 'tip' ? 'Mẹo vặt' : 'Tin tức'}
                  </span>
                  <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {article.date}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tighter leading-tight">{article.title}</h3>
              </div>
            </div>
            
            <div className="p-8 sm:p-12 space-y-8">
              <div className="prose prose-invert max-w-none">
                <p className="text-slate-300 text-lg leading-relaxed font-medium italic serif mb-8">
                  {article.excerpt}
                </p>
                <div className="text-slate-400 leading-relaxed space-y-6">
                  {article.content.split('\n').map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              </div>
              
              {article.category === 'promotion' && (
                <div className="p-8 bg-red-600/10 border border-red-600/20 rounded-[32px] flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div>
                    <p className="text-red-500 font-black uppercase tracking-widest text-xs mb-1">Ưu đãi giới hạn</p>
                    <p className="text-white font-bold">Liên hệ ngay để nhận ưu đãi này!</p>
                  </div>
                  <button className="w-full sm:w-auto px-8 py-4 bg-red-600 hover:bg-red-500 text-white font-black uppercase tracking-widest text-[10px] rounded-2xl transition-all shadow-lg shadow-red-600/20">
                    Nhận ưu đãi
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
    </>
  );
};

export default NewsArticleModal;
