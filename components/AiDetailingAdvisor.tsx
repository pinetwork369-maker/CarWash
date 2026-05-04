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
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[400] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl"
      >
        <div className="absolute inset-0" onClick={onClose} />
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="bg-slate-900 border border-white/10 rounded-[40px] shadow-2xl max-w-2xl w-full relative overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-8 border-b border-white/5 flex justify-between items-center bg-gradient-to-r from-blue-600/10 to-purple-600/10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/20">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Cố Vấn AI Detailing</h2>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Chẩn đoán tình trạng xe tức thì</p>
              </div>
            </div>
            <button onClick={onClose} className="p-3 hover:bg-white/5 rounded-2xl transition-colors">
              <X className="w-6 h-6 text-slate-400" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
            {!selectedImage ? (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-white/10 rounded-[32px] p-12 flex flex-col items-center justify-center gap-6 hover:border-blue-500/50 hover:bg-blue-600/5 transition-all cursor-pointer group"
              >
                <div className="w-20 h-20 bg-slate-800 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Camera className="w-10 h-10 text-slate-400 group-hover:text-blue-500" />
                </div>
                <div className="text-center">
                  <p className="text-white font-bold text-lg">Chụp ảnh hoặc tải lên</p>
                  <p className="text-slate-500 text-sm mt-1">Ảnh cận cảnh vết xước, ố hoặc móp</p>
                </div>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleImageUpload} 
                  accept="image/*" 
                  className="hidden" 
                />
              </div>
            ) : (
              <div className="space-y-8">
                <div className="relative rounded-[32px] overflow-hidden border border-white/10 aspect-video bg-black">
                  <img src={selectedImage} alt="Selected" className="w-full h-full object-contain" />
                  <button 
                    onClick={() => setSelectedImage(null)}
                    className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-md rounded-xl text-white hover:bg-red-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {!diagnosis && !isAnalyzing && (
                  <button 
                    onClick={analyzeImage}
                    className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center gap-3"
                  >
                    <Sparkles className="w-5 h-5" />
                    Bắt đầu chẩn đoán AI
                  </button>
                )}

                {isAnalyzing && (
                  <div className="py-12 flex flex-col items-center justify-center gap-6 text-center">
                    <div className="relative">
                      <Loader2 className="w-16 h-16 text-blue-500 animate-spin" />
                      <Sparkles className="w-6 h-6 text-purple-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                    </div>
                    <div>
                      <p className="text-white font-bold text-lg animate-pulse">AI đang phân tích bề mặt...</p>
                      <p className="text-slate-500 text-sm mt-1">Vui lòng đợi trong giây lát</p>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="p-6 bg-red-600/10 border border-red-600/20 rounded-2xl flex items-center gap-4 text-red-500">
                    <AlertCircle className="w-6 h-6 flex-shrink-0" />
                    <p className="font-bold">{error}</p>
                  </div>
                )}

                {diagnosis && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <div className="p-8 bg-white/5 border border-white/10 rounded-[32px] space-y-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2">Kết quả chẩn đoán</p>
                          <h3 className="text-2xl font-black text-white uppercase tracking-tighter">{diagnosis.condition}</h3>
                        </div>
                        <div className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                          diagnosis.severity === 'high' ? 'bg-red-600 text-white' :
                          diagnosis.severity === 'medium' ? 'bg-orange-500 text-white' :
                          'bg-emerald-600 text-white'
                        }`}>
                          Mức độ: {diagnosis.severity === 'high' ? 'Nghiêm trọng' : diagnosis.severity === 'medium' ? 'Trung bình' : 'Nhẹ'}
                        </div>
                      </div>

                      <p className="text-slate-400 leading-relaxed italic serif">"{diagnosis.explanation}"</p>

                      <div className="pt-6 border-t border-white/5">
                        <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-4">Dịch vụ đề xuất</p>
                        <div className="p-6 bg-blue-600/10 border border-blue-600/20 rounded-2xl flex items-center justify-between group cursor-pointer hover:bg-blue-600/20 transition-all">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                              <CheckCircle2 className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <p className="text-white font-bold">{services.find(s => s.id === diagnosis.recommendedServiceId)?.title}</p>
                              <p className="text-blue-500 text-xs font-bold">{services.find(s => s.id === diagnosis.recommendedServiceId)?.price}</p>
                            </div>
                          </div>
                          <ChevronRight className="w-6 h-6 text-blue-500 group-hover:translate-x-2 transition-transform" />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <button 
                        onClick={() => setSelectedImage(null)}
                        className="py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl transition-all"
                      >
                        Chụp lại
                      </button>
                      <button 
                        onClick={() => onSelectService(diagnosis.recommendedServiceId, diagnosis.subServiceTitle)}
                        className="py-4 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest rounded-2xl transition-all shadow-lg shadow-blue-600/20"
                      >
                        Đặt lịch ngay
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AiDetailingAdvisor;
