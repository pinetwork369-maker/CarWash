import React, { useState } from 'react';
import { CustomerRecord, ECertificate, LoyaltyConfig, CarInspection, SiteConfig, AppNotification } from '../types';
import { 
  Search, Phone, History, Award, ShieldCheck, ChevronRight, Star, 
  Calendar, Car, Gift, CreditCard, ImageIcon, FileCheck, ClipboardCheck, 
  X, AlertCircle, CheckCircle2, Camera, Smartphone 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import BeforeAfterSlider from './BeforeAfterSlider';
import BookingModal from './BookingModal';

interface CustomerPortalProps {
  customerRecords: CustomerRecord[];
  certificates: ECertificate[];
  inspections: CarInspection[];
  loyaltyConfig: LoyaltyConfig;
  siteConfig: SiteConfig;
  setSiteConfig: React.Dispatch<React.SetStateAction<SiteConfig>>;
  handlePayment: (serviceName: string, price: string, customerName: string, customerEmail?: string) => Promise<void>;
  scrollToSection: (id: string) => void;
  onAddNotification?: (notification: Omit<AppNotification, 'id' | 'date' | 'isRead'>) => void;
  t: (key: string) => string;
}

const CustomerPortal: React.FC<CustomerPortalProps> = ({ 
  customerRecords, certificates, inspections, loyaltyConfig, 
  siteConfig, setSiteConfig, handlePayment, scrollToSection, 
  onAddNotification, t 
}) => {
  const [phone, setPhone] = useState('');
  const [results, setResults] = useState<{
    record?: CustomerRecord;
    history: CustomerRecord[];
    certs: ECertificate[];
    inspections: CarInspection[];
  } | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [showOffers, setShowOffers] = useState(false);
  const [selectedInspection, setSelectedInspection] = useState<CarInspection | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const handleSearch = () => {
    if (!phone.trim()) return;
    setIsSearching(true);
    
    const cleanSearch = phone.trim().replace(/\s/g, '').toLowerCase();
    
    // Simulate API delay
    setTimeout(() => {
      const filteredRecords = customerRecords.filter(r => 
        r.phone.replace(/\s/g, '').includes(cleanSearch) || 
        r.licensePlate.replace(/\s/g, '').toLowerCase().includes(cleanSearch)
      );
      
      const filteredCerts = certificates.filter(c => 
        c.phone?.replace(/\s/g, '').includes(cleanSearch) || 
        c.licensePlate.replace(/\s/g, '').toLowerCase().includes(cleanSearch)
      );

      const filteredInspections = inspections.filter(i => 
        i.phone?.replace(/\s/g, '').includes(cleanSearch) || 
        i.licensePlate.replace(/\s/g, '').toLowerCase().includes(cleanSearch)
      );
      
      if (filteredRecords.length > 0 || filteredCerts.length > 0 || filteredInspections.length > 0) {
        setResults({
          record: filteredRecords[0], // Use first record for points/tier
          history: filteredRecords,
          certs: filteredCerts,
          inspections: filteredInspections
        });
      } else {
        setResults({
          history: [],
          certs: [],
          inspections: []
        });
      }
      setIsSearching(false);
    }, 800);
  };

  const currentTier = results?.record?.loyaltyPoints 
    ? loyaltyConfig.tiers.slice().reverse().find(t => results.record!.loyaltyPoints! >= t.minPoints) 
    : loyaltyConfig.tiers[0];

  const points = results?.record?.loyaltyPoints || 0;
  const nextTier = loyaltyConfig.tiers.find(t => t.minPoints > points);
  const progress = nextTier 
    ? ((points - currentTier!.minPoints) / (nextTier.minPoints - currentTier!.minPoints)) * 100 
    : 100;

  const latestInspection = results?.inspections[0];
  const healthScore = latestInspection ? (() => {
    const totalItems = Object.keys(latestInspection.checklist || {}).length || 1;
    const okItems = Object.values(latestInspection.checklist || {}).filter(v => v === 'ok').length;
    return Math.round((okItems / totalItems) * 100);
  })() : null;

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-500 text-[10px] font-black uppercase tracking-widest mb-6"
        >
          <Award className="w-3 h-3" />
          Loyalty & Warranty
        </motion.div>
        <h2 className="section-title text-4xl mb-4">{t('portal_title') || 'Tra Cứu Dịch Vụ Khách Hàng'}</h2>
        <p className="section-subtitle max-w-2xl mx-auto">
          {t('portal_subtitle') || 'Nhập số điện thoại hoặc biển số xe để xem lịch sử bảo dưỡng, điểm tích lũy và bảo hành điện tử.'}
        </p>
      </div>

      <div className="relative max-w-xl mx-auto mb-16">
        <div className="flex flex-col md:flex-row gap-3 p-3 bg-slate-900 rounded-[32px] shadow-2xl border border-white/10">
          <div className="flex-1 flex items-center px-5 gap-4">
            <Smartphone className="w-6 h-6 text-slate-600" />
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={t('enter_phone_portal') || "Số điện thoại hoặc biển số..."}
              className="w-full py-4 bg-transparent outline-none text-white font-bold text-lg placeholder:text-slate-700"
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={isSearching}
            className="btn-primary px-10 py-4 disabled:opacity-50 rounded-2xl"
          >
            {isSearching ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Search className="w-5 h-5" />
            )}
            <span className="font-black uppercase tracking-widest text-xs">Tìm kiếm</span>
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {results ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-12"
          >
            {results.record || results.certs.length > 0 || results.inspections.length > 0 ? (
              <>
                {/* Quick Actions */}
                <div className="flex flex-wrap gap-4">
                  <button 
                    onClick={() => setIsBookingModalOpen(true)}
                    className="flex-1 bg-blue-600 hover:bg-blue-500 text-white px-8 py-5 rounded-[24px] font-black uppercase tracking-widest text-xs transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-3 group"
                  >
                    <Calendar className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    Đặt Lịch Dịch Vụ Mới
                  </button>
                  <button 
                    className="flex-1 bg-slate-900 border border-white/10 hover:border-blue-500/50 text-white px-8 py-5 rounded-[24px] font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-3 group"
                  >
                    <CreditCard className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    Mua Gói Bảo Hành
                  </button>
                </div>

                {results.record && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Loyalty Card */}
                    <div className={`md:col-span-2 bg-gradient-to-br rounded-[40px] p-10 text-white relative overflow-hidden shadow-2xl border border-white/10 group ${
                      currentTier?.id === 'diamond' ? 'from-slate-900 to-indigo-900' :
                      currentTier?.id === 'gold' ? 'from-amber-500 to-orange-600' :
                      currentTier?.id === 'silver' ? 'from-slate-400 to-slate-600' :
                      'from-blue-600 to-indigo-700'
                    }`}>
                      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl group-hover:scale-110 transition-transform duration-1000" />
                      <div className="absolute bottom-0 left-0 w-80 h-80 bg-black/10 rounded-full -ml-32 -mb-32 blur-2xl group-hover:scale-110 transition-transform duration-1000" />
                      
                      <div className="relative z-10 h-full flex flex-col justify-between">
                        <div className="flex justify-between items-start mb-12">
                          <div>
                            <p className="text-white/60 text-[10px] font-black uppercase tracking-[0.3em] mb-2">Premium Member Card</p>
                            <h3 className="text-4xl font-black uppercase tracking-tighter leading-none flex items-center gap-4">
                              {results.record.customerName}
                              {currentTier?.id === 'diamond' && <span className="text-xs bg-white/20 px-3 py-1 rounded-full backdrop-blur-md">VIP</span>}
                            </h3>
                            <p className="text-white/40 text-[9px] font-bold uppercase tracking-widest mt-2">Member since {results.record.date.split('-')[0]}</p>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <div className="px-6 py-2.5 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 text-[11px] font-black uppercase tracking-widest flex items-center gap-3 shadow-xl">
                              <Award className="w-5 h-5" style={{ color: currentTier?.color }} />
                              {currentTier?.name}
                            </div>
                            {nextTier && (
                              <p className="text-[9px] font-bold text-white/50 uppercase tracking-widest">
                                {nextTier.minPoints - points} pts to {nextTier.name}
                              </p>
                            )}
                          </div>
                        </div>
                        
                        <div className="space-y-6">
                          <div className="flex items-end justify-between">
                            <div>
                              <p className="text-white/60 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Available Points</p>
                              <p className="text-6xl font-black tracking-tighter">{points.toLocaleString()} <span className="text-xl font-normal opacity-60 ml-1">PTS</span></p>
                            </div>
                            <div className="text-right">
                              <p className="text-white/60 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Vehicle ID</p>
                              <p className="text-2xl font-black uppercase tracking-tight bg-white/10 px-4 py-1 rounded-xl border border-white/10 inline-block backdrop-blur-md">{results.record.licensePlate}</p>
                            </div>
                          </div>

                          {/* Progress Bar */}
                          {nextTier && (
                            <div className="space-y-2">
                              <div className="h-2 bg-black/20 rounded-full overflow-hidden border border-white/5">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: `${progress}%` }}
                                  transition={{ duration: 1, ease: "easeOut" }}
                                  className="h-full bg-gradient-to-r from-white/40 to-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Car Health Score & Stats */}
                    <div className="bg-slate-900/50 rounded-[40px] p-8 border border-white/5 shadow-xl flex flex-col gap-8 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Car className="w-32 h-32" />
                      </div>
                      
                      {healthScore !== null ? (
                        <div className="text-center space-y-4 relative z-10">
                          <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Car Health Score</p>
                          <div className="relative inline-flex items-center justify-center">
                            <svg className="w-32 h-32 transform -rotate-90">
                              <circle
                                cx="64"
                                cy="64"
                                r="58"
                                stroke="currentColor"
                                strokeWidth="8"
                                fill="transparent"
                                className="text-slate-800"
                              />
                              <motion.circle
                                cx="64"
                                cy="64"
                                r="58"
                                stroke="currentColor"
                                strokeWidth="8"
                                fill="transparent"
                                strokeDasharray={364.4}
                                initial={{ strokeDashoffset: 364.4 }}
                                animate={{ strokeDashoffset: 364.4 - (364.4 * healthScore) / 100 }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                className={healthScore > 80 ? 'text-emerald-500' : healthScore > 50 ? 'text-amber-500' : 'text-red-500'}
                              />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                              <span className="text-3xl font-black text-white">{healthScore}%</span>
                              <span className="text-[8px] font-bold text-slate-500 uppercase">Optimal</span>
                            </div>
                          </div>
                          <p className="text-[10px] font-bold text-slate-400 leading-relaxed">
                            Based on your last inspection on {latestInspection?.date}
                          </p>
                        </div>
                      ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-center p-6 bg-white/5 rounded-3xl border border-dashed border-white/10">
                          <AlertCircle className="w-10 h-10 text-slate-700 mb-3" />
                          <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">No Health Data</p>
                          <p className="text-[9px] text-slate-700 mt-2">Book an inspection to see your car's health score.</p>
                        </div>
                      )}

                      <div className="space-y-4 relative z-10">
                        <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                          <div className="flex items-center gap-3">
                            <History className="w-4 h-4 text-blue-500" />
                            <span className="text-[10px] font-black text-slate-400 uppercase">Total Visits</span>
                          </div>
                          <span className="text-lg font-black text-white">{results.history.length}</span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                          <div className="flex items-center gap-3">
                            <ShieldCheck className="w-4 h-4 text-emerald-500" />
                            <span className="text-[10px] font-black text-slate-400 uppercase">Active Warranties</span>
                          </div>
                          <span className="text-lg font-black text-white">{results.certs.length}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Exclusive Offers Section */}
                <AnimatePresence>
                  {showOffers && currentTier && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="bg-slate-900 rounded-[40px] p-10 border border-blue-500/20 shadow-2xl space-y-8 relative">
                        <div className="absolute top-0 right-0 p-10 opacity-5">
                          <Gift className="w-40 h-40 text-blue-500" />
                        </div>
                        <div className="flex items-center gap-4 relative z-10">
                          <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/30">
                            <Gift className="w-6 h-6" />
                          </div>
                          <h3 className="text-2xl font-black uppercase tracking-tighter">Ưu Đãi Đặc Quyền</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                          {currentTier.perks.map((perk, idx) => (
                            <div key={idx} className="flex items-start gap-4 p-5 bg-black/40 rounded-3xl border border-white/5 hover:border-blue-500/30 transition-colors group">
                              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                                <Star className="w-4 h-4 fill-emerald-500" />
                              </div>
                              <p className="text-slate-300 font-bold leading-relaxed">{perk}</p>
                            </div>
                          ))}
                          <div className="md:col-span-2 p-6 bg-blue-600/10 rounded-3xl border border-blue-600/20 flex items-center justify-between group">
                            <div className="flex items-center gap-4">
                              <Award className="w-6 h-6 text-blue-500 group-hover:rotate-12 transition-transform" />
                              <p className="text-blue-400 font-black uppercase tracking-widest text-xs">Giảm thêm 5% cho lần dịch vụ tiếp theo!</p>
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] bg-blue-600 text-white px-5 py-2 rounded-full shadow-lg">Member Only</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Before/After Comparisons */}
                {results.record?.beforeAfterImages && results.record.beforeAfterImages.length > 0 && (
                  <div className="bg-slate-900 border border-white/10 rounded-[40px] overflow-hidden shadow-xl">
                    <div className="p-10 border-b border-white/5 flex items-center justify-between bg-slate-950/50">
                      <h3 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-4">
                        <ImageIcon className="w-7 h-7 text-indigo-500" />
                        Kết Quả Dịch Vụ (Trước & Sau)
                      </h3>
                    </div>
                    <div className="p-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
                      {results.record.beforeAfterImages.map((item, idx) => (
                        <div key={idx} className="space-y-6">
                          <div className="flex items-center justify-between">
                            <h4 className="text-xl font-black uppercase tracking-tighter text-white">{item.serviceName}</h4>
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full">{item.date}</span>
                          </div>
                          <BeforeAfterSlider before={item.before} after={item.after} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* History & Certs Tabs */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  {/* Service History */}
                  <div className="space-y-6">
                    <h3 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-4">
                      <History className="w-7 h-7 text-blue-500" />
                      Lịch Sử Bảo Dưỡng
                    </h3>
                    <div className="space-y-4">
                      {results.history.length > 0 ? results.history.map((record) => (
                        <div key={record.id} className="bg-slate-900/50 p-6 rounded-[32px] border border-white/5 shadow-lg hover:bg-white/5 transition-all group">
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-500 group-hover:text-blue-500 transition-colors">
                                <Calendar className="w-5 h-5" />
                              </div>
                              <div>
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-0.5">Ngày thực hiện</p>
                                <span className="text-sm text-white font-bold">{record.date}</span>
                              </div>
                            </div>
                            <div className="flex gap-1 bg-black/20 p-2 rounded-xl">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`w-3 h-3 ${i < (record.rating || 5) ? 'text-yellow-500 fill-yellow-500' : 'text-slate-700'}`} 
                                />
                              ))}
                            </div>
                          </div>
                          <h4 className="text-lg font-black text-white mb-4 leading-tight">{record.servicesDone.join(', ')}</h4>
                          <div className="flex items-center justify-between pt-4 border-t border-white/5">
                            <div className="flex items-center gap-3 text-sm text-slate-400">
                              <Car className="w-4 h-4" />
                              <span className="font-bold">{record.carModel} • {record.licensePlate}</span>
                            </div>
                            <span className="text-emerald-500 font-black text-lg">{record.totalPrice}</span>
                          </div>
                        </div>
                      )) : (
                        <div className="bg-slate-900/30 border border-dashed border-white/10 rounded-[32px] py-16 text-center">
                          <p className="text-slate-600 font-bold italic">Chưa có lịch sử dịch vụ</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* E-Certificates */}
                  <div className="space-y-6">
                    <h3 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-4">
                      <FileCheck className="w-7 h-7 text-emerald-500" />
                      Bảo Hành Điện Tử
                    </h3>
                    <div className="space-y-4">
                      {results.certs.length > 0 ? results.certs.map((cert) => (
                        <div key={cert.id} className="bg-gradient-to-br from-emerald-500/5 to-transparent p-8 rounded-[32px] border border-emerald-500/10 shadow-xl relative overflow-hidden group">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform" />
                          <div className="relative z-10">
                            <div className="flex justify-between items-start mb-6">
                              <div>
                                <p className="text-emerald-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2">E-Certificate</p>
                                <h4 className="text-xl font-black text-white uppercase tracking-tight">{cert.serviceType}</h4>
                              </div>
                              <div className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg ${cert.status === 'active' ? 'bg-emerald-500 text-white' : 'bg-red-500/20 text-red-500'}`}>
                                {cert.status === 'active' ? 'Đang hiệu lực' : 'Hết hạn'}
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-8 mb-6">
                              <div>
                                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2">Ngày cấp</p>
                                <p className="font-black text-white text-lg">{cert.issueDate}</p>
                              </div>
                              <div>
                                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2">Ngày hết hạn</p>
                                <p className="font-black text-blue-500 text-lg">{cert.expiryDate}</p>
                              </div>
                            </div>
                            <div className="pt-6 border-t border-white/5 flex justify-between items-center">
                              <p className="text-[10px] text-slate-600 font-black uppercase tracking-widest">Mã định danh: {cert.id}</p>
                              <button className="text-blue-500 text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors flex items-center gap-2">
                                Chi tiết bảo hành
                                <ChevronRight className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      )) : (
                        <div className="bg-slate-900/30 border border-dashed border-white/10 rounded-[32px] py-16 text-center">
                          <p className="text-slate-600 font-bold italic">Chưa có thông tin bảo hành</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Inspection History */}
                <div className="bg-slate-900 border border-white/10 rounded-[40px] overflow-hidden shadow-xl">
                  <div className="p-10 border-b border-white/5 flex items-center justify-between bg-slate-950/50">
                    <h3 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-4">
                      <ClipboardCheck className="w-7 h-7 text-amber-500" />
                      Lịch Sử Kiểm Tra Xe
                    </h3>
                  </div>
                  <div className="p-10">
                    {results.inspections.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {results.inspections.map(inspection => (
                          <div key={inspection.id} className="bg-slate-950 border border-white/10 rounded-3xl p-6 relative overflow-hidden group hover:border-amber-500/30 transition-all">
                            <div className="flex items-center justify-between mb-6">
                              <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">#{inspection.id}</span>
                              <span className="px-3 py-1 bg-amber-500/10 text-amber-500 rounded-full text-[10px] font-black uppercase tracking-widest border border-amber-500/20">
                                {inspection.licensePlate}
                              </span>
                            </div>
                            <h4 className="text-xl font-black uppercase tracking-tighter mb-6 text-white">{inspection.customerName}</h4>
                            <div className="flex items-center justify-between pt-6 border-t border-white/5">
                              <div>
                                <p className="text-[9px] font-black uppercase text-slate-600 tracking-widest mb-1">Ngày kiểm tra</p>
                                <p className="text-sm font-bold text-slate-300">{inspection.date}</p>
                              </div>
                              <button 
                                onClick={() => setSelectedInspection(inspection)}
                                className="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-600/20 hover:bg-blue-500 transition-all"
                              >
                                Xem Báo Cáo
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="py-16 text-center">
                        <p className="text-slate-600 font-bold italic">Chưa có bản kiểm tra xe nào</p>
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-[32px] p-12 text-center">
                <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
                <h3 className="text-xl font-black uppercase tracking-tighter text-amber-500 mb-2">Không tìm thấy thông tin</h3>
                <p className="text-amber-500/70 font-bold">Vui lòng kiểm tra lại số điện thoại hoặc biển số xe.</p>
              </div>
            )}
          </motion.div>
        ) : (
          <div className="text-center py-32 opacity-20 grayscale">
            <Award className="w-32 h-32 mx-auto mb-6 text-slate-700" />
            <p className="text-2xl font-black uppercase tracking-tighter text-slate-500">Vui lòng nhập thông tin để tra cứu</p>
          </div>
        )}
      </AnimatePresence>

      {/* Booking Modal */}
      <BookingModal 
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)} 
        services={siteConfig.services || []}
        siteConfig={siteConfig}
        setSiteConfig={setSiteConfig}
        handlePayment={handlePayment}
        scrollToSection={scrollToSection}
        initialPhone={phone}
        initialName={results?.record?.customerName}
        onAddNotification={onAddNotification}
      />

      {/* Inspection Modal */}
      <AnimatePresence>
        {selectedInspection && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedInspection(null)}
              className="absolute inset-0 bg-slate-950/95 backdrop-blur-2xl"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-5xl bg-slate-900 border border-white/10 rounded-[48px] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="p-10 border-b border-white/5 flex items-center justify-between bg-slate-950/50">
                <div>
                  <h2 className="text-3xl font-black uppercase tracking-tighter">Báo Cáo Kiểm Tra Xe</h2>
                  <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-black mt-2">Mã: #{selectedInspection.id} • Ngày: {selectedInspection.date}</p>
                </div>
                <button onClick={() => setSelectedInspection(null)} className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-slate-400 hover:bg-white/10 hover:text-white transition-all">
                  <X className="w-7 h-7" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                  {/* Car Diagram */}
                  <div className="space-y-8">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-black uppercase tracking-widest text-blue-500 flex items-center gap-3">
                        <Car className="w-5 h-5" />
                        Sơ đồ hư hại ngoại thất
                      </h3>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { id: 'front', name: 'Phía Trước', img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800' },
                        { id: 'rear', name: 'Phía Sau', img: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=800' },
                        { id: 'left', name: 'Bên Trái', img: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&q=80&w=800' },
                        { id: 'right', name: 'Bên Phải', img: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&q=80&w=800' }
                      ].map((view) => (
                        <div key={view.id} className="space-y-2">
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 text-center">{view.name}</p>
                          <div className="relative aspect-video bg-slate-950 rounded-2xl border border-white/5 p-4 flex items-center justify-center overflow-hidden shadow-inner">
                            <img 
                              src={view.img} 
                              alt={view.name} 
                              className="w-full h-full object-cover opacity-40"
                              referrerPolicy="no-referrer"
                            />
                            {selectedInspection.points
                              .filter(p => p.view === view.id || (!p.view && view.id === 'front'))
                              .map(point => (
                                <div 
                                  key={point.id}
                                  className={`absolute w-6 h-6 -ml-3 -mt-3 rounded-full border border-white flex items-center justify-center text-[9px] font-black shadow-2xl ${
                                    point.type === 'scratch' ? 'bg-amber-500' :
                                    point.type === 'dent' ? 'bg-red-500' :
                                    point.type === 'crack' ? 'bg-purple-500' : 'bg-blue-500'
                                  }`}
                                  style={{ left: `${point.x}%`, top: `${point.y}%` }}
                                >
                                  {point.type === 'scratch' ? 'S' : point.type === 'dent' ? 'D' : point.type === 'crack' ? 'C' : 'O'}
                                </div>
                              ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-3 p-3 bg-white/5 rounded-2xl border border-white/5">
                        <div className="w-4 h-4 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Trầy xước (S)</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-white/5 rounded-2xl border border-white/5">
                        <div className="w-4 h-4 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Móp méo (D)</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-white/5 rounded-2xl border border-white/5">
                        <div className="w-4 h-4 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Nứt vỡ (C)</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-white/5 rounded-2xl border border-white/5">
                        <div className="w-4 h-4 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Khác (O)</span>
                      </div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-10">
                    <div className="space-y-6">
                      <h3 className="text-sm font-black uppercase tracking-widest text-emerald-500 flex items-center gap-3">
                        <AlertCircle className="w-5 h-5" />
                        Chi tiết tình trạng
                      </h3>
                      <div className="space-y-4">
                        {selectedInspection.points.length > 0 ? (
                          selectedInspection.points.map((point, idx) => (
                            <div key={point.id} className="bg-slate-950 border border-white/5 p-6 rounded-3xl flex items-start gap-5 group hover:border-white/10 transition-colors">
                              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 font-black text-sm shadow-lg ${
                                point.type === 'scratch' ? 'bg-amber-500/20 text-amber-500' :
                                point.type === 'dent' ? 'bg-red-500/20 text-red-500' :
                                point.type === 'crack' ? 'bg-purple-500/20 text-purple-500' : 'bg-blue-500/20 text-blue-500'
                              }`}>
                                {idx + 1}
                              </div>
                              <div>
                                <p className="text-xs font-black uppercase tracking-[0.2em] text-white mb-2">
                                  {point.type === 'scratch' ? 'Trầy xước' : point.type === 'dent' ? 'Móp méo' : point.type === 'crack' ? 'Nứt vỡ' : 'Khác'}
                                </p>
                                <p className="text-sm text-slate-500 leading-relaxed font-medium">{point.note || 'Không có ghi chú thêm.'}</p>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="bg-emerald-500/10 border border-emerald-500/20 p-10 rounded-[32px] text-center">
                            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
                            <p className="text-emerald-500 font-black uppercase tracking-widest text-xs">Xe hoàn hảo - Không có hư hại</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {selectedInspection.images && Object.values(selectedInspection.images).some(img => !!img) && (
                      <div className="space-y-6">
                        <h3 className="text-sm font-black uppercase tracking-widest text-blue-500 flex items-center gap-3">
                          <Camera className="w-5 h-5" />
                          Hình ảnh hiện trạng
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                          {['front', 'rear', 'left', 'right'].map(view => {
                            const img = selectedInspection.images?.[view as keyof typeof selectedInspection.images];
                            if (!img) return null;
                            return (
                              <div key={view} className="space-y-2">
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">{view}</p>
                                <div className="rounded-3xl overflow-hidden border border-white/10 aspect-square shadow-xl">
                                  <img src={img} alt={view} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="p-10 border-t border-white/5 bg-slate-950/50 flex justify-end">
                <button 
                  onClick={() => setSelectedInspection(null)}
                  className="bg-slate-800 hover:bg-slate-700 text-white px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl"
                >
                  Đóng Báo Cáo
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomerPortal;
