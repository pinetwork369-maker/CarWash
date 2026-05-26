
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Upload, Shield, Zap, Sparkles, X, ChevronRight, Loader2, AlertCircle, RefreshCw, ArrowRight } from 'lucide-react';
import { analyzeCarCondition } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';

interface AiVehicleAnalyzerProps {
  isOpen: boolean;
  onClose: () => void;
  onBookService?: (serviceName: string) => void;
  addToCart?: (service: any) => void;
  t: (key: string) => string;
}

const AiVehicleAnalyzer: React.FC<AiVehicleAnalyzerProps> = ({ isOpen, onClose, onBookService, addToCart, t }) => {
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<{ text: string; suggestions: string[] } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setAnalysis(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalysis = async () => {
    if (!image) return;
    setIsAnalyzing(true);
    try {
      const result = await analyzeCarCondition(image);
      setAnalysis(result);
    } catch (error) {
      console.error(error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[400] overflow-hidden">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950 px-4" 
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="relative h-full w-full bg-slate-950 flex flex-col"
          >
            {/* Header */}
            <div className="sticky top-0 z-50 p-6 sm:p-10 border-b border-white/5 bg-slate-950/80 backdrop-blur-2xl flex justify-between items-center group">
              <div className="flex items-center gap-6">
                <button 
                  onClick={onClose} 
                  className="w-12 h-12 rounded-2xl bg-white/5 hover:bg-blue-600 flex items-center justify-center text-slate-400 hover:text-white transition-all active:scale-90 shadow-xl shadow-blue-900/0 hover:shadow-blue-900/40"
                >
                  <X className="w-6 h-6" />
                </button>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-600/20 border border-blue-500/20 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/10">
                    <Sparkles className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tighter leading-tight">AI Vehicle Analyzer</h2>
                    <div className="h-1 w-12 bg-blue-600 rounded-full mt-1 group-hover:w-24 transition-all duration-500"></div>
                  </div>
                </div>
              </div>
              <div className="hidden sm:block">
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em]">Vehicle Analysis v3.2</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-12 sm:py-24 custom-scrollbar">
              <div className="max-w-6xl mx-auto">
                {!image ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={() => fileInputRef.current?.click()}
                    className="flex flex-col items-center justify-center py-20 sm:py-40 border-2 border-dashed border-white/10 rounded-[48px] bg-white/[0.02] hover:bg-blue-600/5 hover:border-blue-500/50 transition-all cursor-pointer group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="w-24 h-24 rounded-3xl bg-blue-600/10 flex items-center justify-center mb-10 group-hover:scale-110 transition-transform shadow-2xl relative z-10">
                      <Camera className="w-12 h-12 text-blue-500" />
                    </div>
                    <div className="text-center relative z-10">
                      <h4 className="text-2xl sm:text-3xl font-black text-white mb-4 uppercase tracking-tighter">Chụp hoặc Tải ảnh xe của bạn</h4>
                      <p className="text-slate-500 font-medium max-w-lg mx-auto">
                        Tải lên ảnh chụp bề mặt sơn, đèn xe hoặc nội thất để AI của chúng tôi phân tích và tư vấn giải pháp tốt nhất.
                      </p>
                    </div>
                    <button className="mt-12 bg-blue-600 text-white font-black uppercase text-[10px] tracking-widest px-10 py-5 rounded-3xl shadow-xl shadow-blue-900/40 relative z-10 flex items-center gap-3">
                      <Upload className="w-5 h-5" />
                      <span>Chọn Hình Ảnh</span>
                    </button>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      className="hidden" 
                      accept="image/*" 
                      onChange={handleImageUpload} 
                    />
                  </motion.div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-20">
                    {/* Image Preview */}
                    <div className="space-y-8">
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative aspect-[4/3] rounded-[48px] overflow-hidden border border-white/10 shadow-3xl bg-black group"
                      >
                        <img src={image} alt="Vehicle to analyze" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                           <p className="text-white text-[10px] font-black uppercase tracking-widest border border-white/20 px-4 py-2 rounded-full backdrop-blur-md">Xem trước chi tiết</p>
                        </div>
                        <button 
                          onClick={() => setImage(null)}
                          className="absolute top-8 right-8 bg-black/50 backdrop-blur-md p-4 rounded-2xl text-white hover:bg-red-600 transition-all active:scale-90"
                        >
                          <RefreshCw className="w-5 h-5" />
                        </button>
                      </motion.div>
                      {!analysis && !isAnalyzing && (
                        <button 
                          onClick={handleAnalysis}
                          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest py-8 rounded-[32px] shadow-[0_20px_60px_rgba(37,99,235,0.4)] transition-all flex items-center justify-center gap-4 text-sm group active:scale-95"
                        >
                          <Zap className="w-6 h-6 fill-current group-hover:scale-125 transition-transform" />
                          <span>Bắt Đầu Phân Tích AI Advisor</span>
                        </button>
                      )}
                    </div>

                    {/* Analysis Result */}
                    <div className="space-y-10">
                      {isAnalyzing ? (
                        <div className="h-full flex flex-col items-center justify-center space-y-8 py-24 bg-white/[0.02] border border-white/5 rounded-[48px] backdrop-blur-3xl">
                          <div className="relative">
                            <div className="absolute inset-0 bg-blue-500/20 blur-3xl animate-pulse scale-150"></div>
                            <Loader2 className="w-16 h-16 text-blue-500 animate-spin relative z-10" />
                          </div>
                          <div className="text-center">
                            <p className="text-white font-black text-2xl uppercase tracking-tighter mb-2 animate-pulse">Đang định vị bề mặt...</p>
                            <p className="text-slate-500 font-medium">Chuyên gia AI đang phân tích dữ liệu điểm ảnh</p>
                          </div>
                        </div>
                      ) : analysis ? (
                        <motion.div 
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="space-y-8"
                        >
                          <div className="bg-white/[0.03] border border-white/10 rounded-[40px] p-8 sm:p-12 relative overflow-hidden backdrop-blur-3xl shadow-2xl">
                            <div className="absolute top-0 left-0 w-2 h-full bg-blue-600"></div>
                            <div className="flex items-center gap-3 mb-8">
                              <Shield className="w-5 h-5 text-blue-500" />
                              <h4 className="text-blue-500 font-black text-xs uppercase tracking-[0.3em]">Bản báo cáo kỹ thuật AI</h4>
                            </div>
                            <div className="prose prose-invert prose-lg max-w-none text-slate-300 leading-relaxed custom-markdown">
                              <ReactMarkdown>{analysis.text}</ReactMarkdown>
                            </div>
                          </div>

                          {analysis.suggestions.length > 0 && (
                            <div className="space-y-6">
                              <h4 className="text-white font-black uppercase text-xs tracking-widest px-4 flex items-center gap-3">
                                <Sparkles className="w-4 h-4 text-emerald-500" />
                                PHÁC ĐỒ CHĂM SÓC XE ĐỀ XUẤT
                              </h4>
                              <div className="grid grid-cols-1 gap-4">
                                {analysis.suggestions.map((service, idx) => (
                                  <button 
                                    key={idx}
                                    onClick={() => onBookService?.(service)}
                                    className="group w-full flex items-center justify-between p-6 sm:p-8 rounded-[32px] bg-white/[0.03] border border-white/5 hover:bg-blue-600/10 hover:border-blue-500/30 transition-all shadow-xl hover:shadow-blue-900/20"
                                  >
                                    <div className="flex items-center gap-6">
                                      <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center text-blue-500 font-black text-sm group-hover:bg-blue-600 group-hover:text-white transition-all">
                                        {idx + 1}
                                      </div>
                                      <span className="text-white font-black text-lg sm:text-2xl tracking-tight group-hover:text-blue-500 transition-colors uppercase">{service}</span>
                                    </div>
                                    <ArrowRight className="w-6 h-6 text-slate-700 group-hover:text-blue-500 group-hover:translate-x-3 transition-all" />
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}

                          <div className="flex items-start gap-4 p-8 rounded-[32px] bg-emerald-500/5 border border-emerald-500/10 text-emerald-500 text-xs font-bold leading-relaxed italic">
                            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                            <span>Lưu ý: Đây là đánh giá khởi tạo bởi trí tuệ nhân tạo dựa trên hình ảnh cung cấp. Kết quả chính xác nhất sẽ được kỹ thuật viên XE ĐẸP PRO xác nhận trực tiếp sau khi đo kiểm chuyên sâu.</span>
                          </div>
                        </motion.div>
                      ) : (
                        <div className="h-full flex flex-col items-center justify-center p-12 sm:p-24 bg-white/[0.02] border border-white/5 rounded-[48px] opacity-30 border-dashed">
                          <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center mb-6">
                            <Sparkles className="w-10 h-10 text-slate-600" />
                          </div>
                          <p className="text-slate-500 text-center font-black uppercase text-xs tracking-widest leading-loose">
                            Hệ thống AI đang ở chế độ chờ... <br/> Vui lòng cung cấp hình ảnh bên trái.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AiVehicleAnalyzer;
