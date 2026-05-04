
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
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl"
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-white/10 rounded-[32px] overflow-hidden flex flex-col shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/5 bg-slate-900/50 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center border border-blue-500/20">
              <Sparkles className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <h3 className="text-white font-black uppercase tracking-tight">AI Phân Tích Tình Trạng Xe</h3>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Công nghệ giám định sơn thông minh</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {!image ? (
            <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-white/5 rounded-[24px] bg-white/[0.02]">
              <div className="w-20 h-20 rounded-3xl bg-blue-600/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Camera className="w-10 h-10 text-blue-500" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Chụp hoặc Tải ảnh xe của bạn</h4>
              <p className="text-slate-500 text-center max-w-sm mb-8">
                Tải lên ảnh chụp bề mặt sơn, đèn xe hoặc nội thất để AI của chúng tôi phân tích và tư vấn giải pháp tốt nhất.
              </p>
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="btn-primary flex items-center gap-3 px-8"
              >
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
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Image Preview */}
              <div className="space-y-4">
                <div className="relative aspect-[4/3] rounded-[24px] overflow-hidden border border-white/10 shadow-2xl">
                  <img src={image} alt="Vehicle to analyze" className="w-full h-full object-cover" />
                  <button 
                    onClick={() => setImage(null)}
                    className="absolute top-4 right-4 bg-black/50 backdrop-blur-md p-2 rounded-full text-white hover:bg-black/70 transition-all"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
                {!analysis && !isAnalyzing && (
                  <button 
                    onClick={handleAnalysis}
                    className="w-full btn-primary py-5 flex items-center justify-center gap-3 text-lg"
                  >
                    <Zap className="w-6 h-6 fill-current" />
                    <span>Bắt Đầu Phân Tích AI</span>
                  </button>
                )}
              </div>

              {/* Analysis Result */}
              <div className="space-y-6">
                {isAnalyzing ? (
                  <div className="h-full flex flex-col items-center justify-center space-y-4 py-12">
                    <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
                    <div className="text-center">
                      <p className="text-white font-bold text-lg mb-1 animate-pulse">Đang quét bề mặt...</p>
                      <p className="text-slate-500 text-sm">Chuyên gia AI đang đánh giá tình trạng xe của bạn</p>
                    </div>
                  </div>
                ) : analysis ? (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div className="bg-blue-600/5 border border-blue-500/10 rounded-2xl p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <Shield className="w-5 h-5 text-blue-500" />
                        <h4 className="text-blue-500 font-black text-xs uppercase tracking-widest">Kết quả chẩn đoán</h4>
                      </div>
                      <div className="prose prose-invert prose-sm max-w-none text-slate-300">
                        <ReactMarkdown>{analysis.text}</ReactMarkdown>
                      </div>
                    </div>

                    {analysis.suggestions.length > 0 && (
                      <div className="space-y-4">
                        <h4 className="text-white font-bold flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-emerald-500" />
                          Dịch vụ đề xuất phù hợp
                        </h4>
                        <div className="grid grid-cols-1 gap-3">
                          {analysis.suggestions.map((service, idx) => (
                            <button 
                              key={idx}
                              onClick={() => onBookService?.(service)}
                              className="group w-full flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-blue-600/10 hover:border-blue-500/30 transition-all"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                  {idx + 1}
                                </div>
                                <span className="text-white font-bold text-sm tracking-tight">{service}</span>
                              </div>
                              <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10 text-emerald-500 text-xs font-medium">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>Lưu ý: Đây là đánh giá từ AI dựa trên hình ảnh. Kết quả thực tế có thể thay đổi sau khi kiểm tra chuyên sâu tại xưởng.</span>
                    </div>
                  </motion.div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center p-8 bg-white/[0.02] border border-white/5 rounded-3xl opacity-50">
                    <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mb-4">
                      <Sparkles className="w-8 h-8 text-slate-600" />
                    </div>
                    <p className="text-slate-500 text-center font-medium">Nhấn nút bên trái để bắt đầu phân tích</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default AiVehicleAnalyzer;
