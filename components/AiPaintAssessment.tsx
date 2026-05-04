
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Upload, RefreshCw, CheckCircle2, AlertTriangle, ArrowRight, X, Bot, ShieldCheck, Zap } from 'lucide-react';
import { analyzeCarCondition } from '../services/geminiService';
import { toast } from 'react-hot-toast';

interface AiPaintAssessmentProps {
  isOpen: boolean;
  onClose: () => void;
  siteConfig: any;
  t: (key: string) => string;
}

const AiPaintAssessment: React.FC<AiPaintAssessmentProps> = ({ isOpen, onClose, siteConfig, t }) => {
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<{ text: string; suggestions: string[] } | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Vui lòng chọn tệp hình ảnh.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target?.result as string);
      setResult(null);
    };
    reader.readAsDataURL(file);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleAnalyze = async () => {
    if (!image) return;
    setIsAnalyzing(true);
    try {
      const data = await analyzeCarCondition(image);
      setResult(data);
    } catch (error) {
      toast.error('Có lỗi xảy ra khi phân tích.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-950/90 backdrop-blur-2xl"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-5xl bg-slate-900 border border-white/5 rounded-[40px] shadow-[0_50px_100px_rgba(0,0,0,0.8)] overflow-hidden"
        >
          <div className="flex flex-col lg:flex-row h-full max-h-[90vh]">
            {/* Left side: Upload/Image */}
            <div className="w-full lg:w-1/2 p-8 border-b lg:border-b-0 lg:border-r border-white/5 flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-4 h-4 text-blue-500" />
                    <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">
                      {siteConfig.aiAssessmentSubtitle || 'Công nghệ AI phân tích'}
                    </span>
                  </div>
                  <h2 className="text-3xl font-black text-white uppercase tracking-tighter">
                    {siteConfig.aiAssessmentTitle || 'Giám định xe AI'}
                  </h2>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-slate-500 hover:text-white transition-colors lg:hidden">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                {siteConfig.aiAssessmentDescription || 'Chụp ảnh bề mặt sơn xe để AI phân tích tình trạng.'}
              </p>

              <div 
                className={`flex-1 min-h-[300px] border-2 border-dashed rounded-[32px] overflow-hidden transition-all relative group ${
                  dragActive ? 'border-blue-500 bg-blue-500/10' : 'border-white/5 bg-slate-950/30'
                }`}
                onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                onDragLeave={() => setDragActive(false)}
                onDrop={onDrop}
              >
                {image ? (
                  <div className="relative w-full h-full">
                    <img src={image} className="w-full h-full object-cover" alt="Car assessment" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                      <button 
                        onClick={() => setImage(null)}
                        className="bg-red-500 text-white p-4 rounded-2xl shadow-xl hover:scale-110 active:scale-95 transition-all"
                      >
                        <RefreshCw className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer hover:bg-white/5 transition-all">
                    <div className="w-20 h-20 rounded-3xl bg-blue-500/10 flex items-center justify-center text-blue-500 mb-6 group-hover:scale-110 transition-transform">
                      <Camera className="w-10 h-10" />
                    </div>
                    <span className="text-white font-bold opacity-80 mb-2">Chụp ảnh hoặc Tải lên</span>
                    <span className="text-slate-500 text-xs">Kéo thả ảnh tình trạng xe vào đây</span>
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => e.target.files && handleFile(e.target.files[0])} />
                  </label>
                )}
              </div>

              {image && !result && (
                <button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="w-full mt-8 bg-blue-600 hover:bg-blue-500 text-white py-5 rounded-2xl font-black uppercase text-sm tracking-widest shadow-2xl shadow-blue-500/20 disabled:opacity-50 flex items-center justify-center gap-3 active:scale-[0.98] transition-all"
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      Đang phân tích...
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5" />
                      Bắt đầu phân tích ngay
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Right side: Results */}
            <div className="w-full lg:w-1/2 p-8 bg-slate-950/20 flex flex-col">
              <div className="hidden lg:flex justify-end mb-8">
                <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-slate-500 hover:text-white transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {!result && !isAnalyzing && (
                <div className="flex-1 flex flex-col items-center justify-center text-center px-12">
                  <div className="w-24 h-24 rounded-full bg-slate-900 border border-white/5 flex items-center justify-center text-slate-700 mb-8">
                    <Bot className="w-12 h-12" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">Sẵn sàng phân tích</h3>
                  <p className="text-slate-500 text-sm">
                    Hãy tải ảnh lên để AI của chúng tôi kiểm tra mức độ trầy xước, ố mốc và đề xuất gói dịch vụ phù hợp nhất.
                  </p>
                </div>
              )}

              {isAnalyzing && (
                <div className="flex-1 flex flex-col items-center justify-center">
                  <div className="relative w-32 h-32 mb-12">
                    <div className="absolute inset-0 border-4 border-blue-500/20 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Bot className="w-12 h-12 text-blue-500" />
                    </div>
                  </div>
                  <div className="space-y-3 text-center">
                    <p className="text-white font-bold animate-pulse">Đang rà quét bề mặt sơn...</p>
                    <p className="text-slate-500 text-xs tracking-widest uppercase">Phát hiện khuyết tật bề mặt</p>
                  </div>
                </div>
              )}

              {result && (
                <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                    <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Phân tích hoàn tất</span>
                  </div>
                  
                  <div className="prose prose-invert prose-sm max-w-none text-slate-300 mb-10 leading-relaxed">
                    {result.text.split('["')[0]}
                  </div>

                  {result.suggestions.length > 0 && (
                    <div className="space-y-4">
                      <h4 className="text-xs font-black uppercase tracking-widest text-blue-500 mb-4">Dịch vụ đề xuất</h4>
                      <div className="grid grid-cols-1 gap-3">
                        {result.suggestions.map((s, i) => (
                          <div key={i} className="group p-5 bg-white/[0.03] border border-white/5 rounded-2xl flex items-center justify-between hover:bg-blue-600/5 hover:border-blue-500/30 transition-all">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                                <ShieldCheck className="w-5 h-5" />
                              </div>
                              <span className="text-sm font-bold text-white">{s}</span>
                            </div>
                            <ArrowRight className="w-4 h-4 text-slate-700 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                          </div>
                        ))}
                      </div>
                      
                      <button 
                        onClick={onClose}
                        className="w-full mt-10 btn-primary py-5"
                      >
                        Đặt lịch ngay theo đề xuất
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AiPaintAssessment;
