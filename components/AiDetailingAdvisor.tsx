import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Upload, Sparkles, X, ChevronRight, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { Service } from '../types';

interface AiDetailingAdvisorProps {
  isOpen: boolean;
  onClose: () => void;
  services: Service[];
  onSelectService: (serviceId: string, subServiceTitle?: string) => void;
}

const AiDetailingAdvisor: React.FC<AiDetailingAdvisorProps> = ({ isOpen, onClose, services, onSelectService }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnosis, setDiagnosis] = useState<{
    condition: string;
    severity: 'low' | 'medium' | 'high';
    recommendedServiceId: string;
    subServiceTitle?: string;
    explanation: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setDiagnosis(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
      const base64Data = selectedImage.split(',')[1];
      
      const prompt = `Bạn là một chuyên gia detailing xe hơi cao cấp tại XE ĐẸP PRO. 
      Hãy phân tích hình ảnh này của bề mặt xe hơi. 
      Xác định tình trạng (vết xước, ố, móp, v.v.), mức độ nghiêm trọng (thấp, trung bình, cao) 
      và đề xuất dịch vụ phù hợp nhất từ danh sách sau: ${services.map(s => s.title).join(', ')}.
      Trả về kết quả dưới dạng JSON:
      {
        "condition": "mô tả tình trạng",
        "severity": "low" | "medium" | "high",
        "recommendedServiceId": "ID của dịch vụ phù hợp nhất",
        "subServiceTitle": "Tên gói dịch vụ cụ thể nếu có (ví dụ: Gói Cơ Bản, Gói Cao Cấp)",
        "explanation": "giải thích ngắn gọn tại sao chọn dịch vụ này"
      }
      Chỉ trả về JSON, không thêm văn bản khác.`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          {
            parts: [
              { text: prompt },
              { inlineData: { mimeType: "image/jpeg", data: base64Data } }
            ]
          }
        ],
        config: { responseMimeType: "application/json" }
      });

      const result = JSON.parse(response.text);
      
      // Find the closest service ID if the AI didn't return an exact match
      const recommendedService = services.find(s => 
        s.id === result.recommendedServiceId || 
        s.title.toLowerCase().includes(result.recommendedServiceId.toLowerCase())
      );

      setDiagnosis({
        ...result,
        recommendedServiceId: recommendedService?.id || services[0].id,
        subServiceTitle: result.subServiceTitle
      });
    } catch (err) {
      console.error("AI Analysis Error:", err);
      setError("Không thể phân tích hình ảnh. Vui lòng thử lại với ảnh rõ nét hơn.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[400] overflow-hidden">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950" 
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
                  <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/20">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tighter leading-tight">Cố Vấn AI Advisor</h2>
                    <div className="h-1 w-12 bg-blue-600 rounded-full mt-1 group-hover:w-24 transition-all duration-500"></div>
                  </div>
                </div>
              </div>
              <div className="hidden sm:block">
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em]">Smart Diagnosis v2.0</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-12 sm:py-24 custom-scrollbar">
              <div className="max-w-4xl mx-auto">
                {!selectedImage ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-white/10 rounded-[48px] p-12 sm:p-24 flex flex-col items-center justify-center gap-8 hover:border-blue-500/50 hover:bg-blue-600/5 transition-all cursor-pointer group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="w-24 h-24 bg-slate-800 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl relative z-10">
                      <Camera className="w-12 h-12 text-slate-400 group-hover:text-blue-500 transition-colors" />
                    </div>
                    <div className="text-center relative z-10">
                      <p className="text-white font-black text-2xl sm:text-3xl uppercase tracking-tighter mb-2">Chụp ảnh hoặc tải lên</p>
                      <p className="text-slate-500 text-sm font-medium">AI sẽ phân tích bề mặt sơn, vết xước, ố hoặc tình trạng chi tiết xe</p>
                    </div>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleImageUpload} 
                      accept="image/*" 
                      className="hidden" 
                    />
                  </motion.div>
                ) : (
                  <div className="space-y-12">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="relative rounded-[48px] overflow-hidden border border-white/10 aspect-video bg-black shadow-2xl group"
                    >
                      <img src={selectedImage} alt="Selected" className="w-full h-full object-contain" />
                      <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                         <p className="text-white/60 text-xs font-bold uppercase tracking-widest text-center">Hình ảnh được chọn để phân tích</p>
                      </div>
                      <button 
                        onClick={() => setSelectedImage(null)}
                        className="absolute top-8 right-8 w-12 h-12 bg-black/50 backdrop-blur-md rounded-2xl text-white hover:bg-red-600 transition-all flex items-center justify-center active:scale-90"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </motion.div>

                    <div className="max-w-2xl mx-auto">
                      {!diagnosis && !isAnalyzing && (
                        <button 
                          onClick={analyzeImage}
                          className="w-full py-8 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase text-sm tracking-widest rounded-[32px] transition-all shadow-[0_20px_60px_rgba(37,99,235,0.4)] flex items-center justify-center gap-4 group active:scale-95"
                        >
                          <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                          Bắt đầu chẩn đoán bằng AI
                        </button>
                      )}

                      {isAnalyzing && (
                        <div className="py-24 flex flex-col items-center justify-center gap-8 text-center bg-white/[0.02] rounded-[48px] border border-white/5">
                          <div className="relative">
                            <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full scale-150 animate-pulse"></div>
                            <Loader2 className="w-20 h-20 text-blue-500 animate-spin relative z-10" />
                            <Sparkles className="w-8 h-8 text-purple-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 relative z-20" />
                          </div>
                          <div>
                            <p className="text-white font-black text-2xl uppercase tracking-tighter mb-2 animate-pulse">AI đang xử lý hình ảnh...</p>
                            <p className="text-slate-500 font-medium">Hệ thống đang đối chiếu với cơ sở dữ liệu 50,000+ lỗi bề mặt xe</p>
                          </div>
                        </div>
                      )}

                      {error && (
                        <div className="p-8 bg-red-600/10 border border-red-600/20 rounded-[32px] flex items-center gap-6 text-red-500">
                          <AlertCircle className="w-8 h-8 flex-shrink-0" />
                          <p className="font-bold">{error}</p>
                        </div>
                      )}

                      {diagnosis && (
                        <motion.div 
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="space-y-8"
                        >
                          <div className="p-10 bg-white/[0.03] border border-white/10 rounded-[48px] space-y-10 backdrop-blur-3xl shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-3xl rounded-full"></div>
                            
                            <div className="flex flex-col sm:flex-row items-start justify-between gap-6 relative z-10">
                              <div>
                                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-3">Tình trạng thực tế</p>
                                <h3 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tighter leading-tight">{diagnosis.condition}</h3>
                              </div>
                              <div className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg ${
                                diagnosis.severity === 'high' ? 'bg-red-600 text-white shadow-red-900/40' :
                                diagnosis.severity === 'medium' ? 'bg-orange-500 text-white shadow-orange-900/40' :
                                'bg-emerald-600 text-white shadow-emerald-900/40'
                              }`}>
                                Mức độ: {diagnosis.severity === 'high' ? 'Nghiêm trọng' : diagnosis.severity === 'medium' ? 'Trung bình' : 'Nhẹ'}
                              </div>
                            </div>

                            <div className="p-6 rounded-3xl bg-white/5 border-l-4 border-blue-600">
                              <p className="text-slate-300 text-lg leading-relaxed italic font-medium">"{diagnosis.explanation}"</p>
                            </div>

                            <div className="pt-10 border-t border-white/5">
                              <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-6">GIẢI PHÁP TỐI ƯU ĐƯỢC AI ĐỀ XUẤT</p>
                              <div className="p-8 bg-blue-600/10 border border-blue-600/30 rounded-[32px] flex flex-col sm:flex-row items-center justify-between gap-6 group cursor-pointer hover:bg-blue-600/20 transition-all shadow-xl shadow-blue-950/20">
                                <div className="flex items-center gap-6">
                                  <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/40 group-hover:scale-110 transition-transform">
                                    <CheckCircle2 className="w-8 h-8 text-white" />
                                  </div>
                                  <div className="text-center sm:text-left">
                                    <h4 className="text-xl font-black text-white uppercase tracking-tight mb-1">{services.find(s => s.id === diagnosis.recommendedServiceId)?.title}</h4>
                                    <div className="flex items-center gap-3 justify-center sm:justify-start">
                                       <span className="text-blue-500 font-black text-lg">{services.find(s => s.id === diagnosis.recommendedServiceId)?.price}</span>
                                       {diagnosis.subServiceTitle && <span className="px-3 py-1 rounded-lg bg-blue-600/20 text-blue-400 text-[9px] font-black uppercase tracking-widest">{diagnosis.subServiceTitle}</span>}
                                    </div>
                                  </div>
                                </div>
                                <ChevronRight className="w-8 h-8 text-blue-500 group-hover:translate-x-3 transition-transform" />
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <button 
                              onClick={() => setSelectedImage(null)}
                              className="py-6 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white font-black uppercase text-[10px] tracking-widest rounded-3xl transition-all active:scale-95 border border-white/5"
                            >
                              Phân tích lại ảnh khác
                            </button>
                            <button 
                              onClick={() => onSelectService(diagnosis.recommendedServiceId, diagnosis.subServiceTitle)}
                              className="py-6 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase text-[10px] tracking-widest rounded-3xl transition-all shadow-[0_15px_40px_rgba(37,99,235,0.3)] active:scale-95"
                            >
                              Đặt lịch dịch vụ này ngay
                            </button>
                          </div>
                        </motion.div>
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

export default AiDetailingAdvisor;
