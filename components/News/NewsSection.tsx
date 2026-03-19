import React, { useState } from 'react';
import { Calendar, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { NewsArticle } from './types';
import { NewsCard } from './NewsCard';
import { NewsDetailModal } from './NewsDetailModal';
import { VehicleTracking } from '../Tracking/types';
import { Search, Car, Timer, ChevronRight } from 'lucide-react';

interface NewsSectionProps {
  news: NewsArticle[];
  trackingData: VehicleTracking[];
  t: (key: string) => string;
  language: 'vi' | 'en';
}

export const NewsSection: React.FC<NewsSectionProps> = ({ news, trackingData, t, language }) => {
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleTracking | null>(null);
  const [visibleCount, setVisibleCount] = useState(4);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 3);
  };

  const filteredTracking = trackingData.filter(item => 
    item.licensePlate.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.customerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getVehicleStatusBadge = (status: string) => {
    switch (status) {
      case 'ready': return <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-500 text-[8px] font-black uppercase rounded-full border border-emerald-500/20">{t('status_ready')}</span>;
      case 'working': return <span className="px-2 py-0.5 bg-blue-500/10 text-blue-500 text-[8px] font-black uppercase rounded-full border border-blue-500/20">{t('status_working')}</span>;
      default: return <span className="px-2 py-0.5 bg-slate-500/10 text-slate-500 text-[8px] font-black uppercase rounded-full border border-slate-500/20">{t('status_waiting')}</span>;
    }
  };

  return (
    <section id="news" className="py-24 sm:py-32 bg-slate-900/50 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <span className="text-blue-500 font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">{t('news_subtitle')}</span>
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none">
              {t('news_title').split('&')[0]}<span className="text-blue-500">& {t('news_title').split('&')[1]}</span>
            </h2>
          </div>
          
          {/* Integrated Tracking Search */}
          <div className="w-full md:w-96 relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-slate-500" />
            </div>
            <input
              type="text"
              placeholder={t('search_plate_to_track')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 transition-all text-sm font-bold"
            />
            
            <AnimatePresence>
              {searchQuery && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-50 max-h-64 overflow-y-auto custom-scrollbar"
                >
                  {filteredTracking.length > 0 ? (
                    filteredTracking.map(vehicle => (
                      <div 
                        key={vehicle.id}
                        onClick={() => {
                          setSelectedVehicle(vehicle);
                        }}
                        className="p-4 hover:bg-white/5 cursor-pointer border-b border-white/5 last:border-0 flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-3">
                          <Car className="w-4 h-4 text-blue-500" />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-white font-black text-sm">{vehicle.licensePlate}</span>
                              {getVehicleStatusBadge(vehicle.status)}
                            </div>
                            <p className="text-[10px] text-slate-500 font-bold uppercase">{vehicle.carModel}</p>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-white transition-colors" />
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-slate-500 text-xs font-bold">{t('no_vehicle_found')}</div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Featured Article */}
          {news.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              onClick={() => setSelectedArticle(news[0])}
              className="lg:col-span-2 group cursor-pointer relative rounded-[48px] overflow-hidden border border-white/10 h-[400px] sm:h-[600px]"
            >
              <img 
                src={news[0].image} 
                alt={news[0].title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12">
                <span className="bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full mb-6 inline-block">
                  {t('featured_article')} • {news[0].category}
                </span>
                <h3 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tighter mb-4 leading-none group-hover:text-blue-400 transition-colors">
                  {news[0].title}
                </h3>
                <p className="text-slate-300 text-sm sm:text-lg max-w-2xl line-clamp-2 mb-8 font-medium opacity-80">
                  {news[0].summary}
                </p>
                <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-white/60">
                  <span className="flex items-center gap-2"><User className="w-4 h-4 text-blue-500" /> {news[0].author}</span>
                  <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-blue-500" /> {news[0].date}</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Side List */}
          <div className="space-y-8">
            <AnimatePresence mode="popLayout">
              {news.slice(1, visibleCount).map((article, idx) => (
                <NewsCard 
                  key={article.id}
                  article={article}
                  idx={idx}
                  onClick={() => setSelectedArticle(article)}
                  t={t}
                />
              ))}
            </AnimatePresence>
            
            {news.length > visibleCount && (
              <button 
                onClick={handleLoadMore}
                className="w-full py-4 rounded-2xl border border-white/5 hover:bg-white/5 text-[10px] font-black uppercase tracking-widest text-slate-400 transition-all flex items-center justify-center gap-2 group"
              >
                {t('load_more_news')}
                <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </button>
            )}
          </div>
        </div>
      </div>

      <NewsDetailModal 
        article={selectedArticle} 
        onClose={() => setSelectedArticle(null)} 
        t={t}
      />

      {/* Integrated Tracking Modal */}
      <AnimatePresence>
        {selectedVehicle && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedVehicle(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-slate-900 border border-white/10 rounded-[40px] overflow-hidden shadow-2xl"
            >
              <div className="p-8 border-b border-white/5 bg-gradient-to-b from-white/5 to-transparent">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-4xl font-black text-white tracking-tighter">{selectedVehicle.licensePlate}</h4>
                      {getVehicleStatusBadge(selectedVehicle.status)}
                    </div>
                    <p className="text-blue-500 font-black uppercase tracking-widest text-xs">{selectedVehicle.carModel}</p>
                  </div>
                  <button 
                    onClick={() => setSelectedVehicle(null)}
                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 text-white rotate-90" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                    <div className="flex items-center gap-2 mb-2">
                      <Timer className="w-3 h-3 text-slate-500" />
                      <span className="text-[10px] font-black text-slate-500 uppercase">{t('current_progress')}</span>
                    </div>
                    <p className="text-white font-bold">{selectedVehicle.steps[selectedVehicle.currentStepIndex]?.name}</p>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                    <div className="flex items-center gap-2 mb-2">
                      <Search className="w-3 h-3 text-slate-500" />
                      <span className="text-[10px] font-black text-slate-500 uppercase">{t('last_update')}</span>
                    </div>
                    <p className="text-white font-bold">{new Date(selectedVehicle.lastUpdate).toLocaleTimeString(language === 'vi' ? 'vi-VN' : 'en-US')}</p>
                  </div>
                </div>
              </div>

              <div className="p-8 max-h-[40vh] overflow-y-auto custom-scrollbar">
                <div className="space-y-6 relative">
                  <div className="absolute left-[11px] top-2 bottom-2 w-px bg-white/10" />
                  {selectedVehicle.steps.map((step) => (
                    <div key={step.id} className="relative flex gap-4">
                      <div className={`relative z-10 w-6 h-6 rounded-full flex items-center justify-center border-2 ${
                        step.status === 'completed' ? 'bg-emerald-500 border-emerald-500' :
                        step.status === 'in-progress' ? 'bg-blue-500 border-blue-500 animate-pulse' :
                        'bg-slate-900 border-slate-700'
                      }`}>
                        {step.status === 'completed' && <div className="w-2 h-2 bg-white rounded-full" />}
                      </div>
                      <div className="flex-1">
                        <h5 className={`text-sm font-bold ${step.status === 'completed' ? 'text-slate-400' : 'text-white'}`}>{step.name}</h5>
                        {step.timestamp && <p className="text-[10px] text-slate-500">{new Date(step.timestamp).toLocaleTimeString(language === 'vi' ? 'vi-VN' : 'en-US')}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-8 bg-white/5 border-t border-white/5 flex justify-end">
                <button 
                  onClick={() => setSelectedVehicle(null)}
                  className="px-8 py-3 bg-white text-black font-black text-[10px] uppercase rounded-full hover:bg-slate-200 transition-colors"
                >
                  {t('close')}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default NewsSection;
