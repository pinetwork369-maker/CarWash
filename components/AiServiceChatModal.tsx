import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, MessageSquare, Send, Trash2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Service, Message, SiteConfig } from '../types';
import { AIProvider } from '../services/geminiService';

interface AiServiceChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: Service | null;
  aiMessages: Message[];
  aiInput: string;
  setAiInput: (v: string) => void;
  handleAiChat: (customInput?: string) => void;
  isAiLoading: boolean;
  aiProvider: AIProvider;
  setAiProvider: (v: AIProvider) => void;
  clearChat: () => void;
  chatEndRef: React.RefObject<HTMLDivElement>;
  siteConfig: SiteConfig;
}

const AiServiceChatModal: React.FC<AiServiceChatModalProps> = ({ 
  isOpen, onClose, service, aiMessages, aiInput, setAiInput, 
  handleAiChat, isAiLoading, aiProvider, setAiProvider, clearChat, chatEndRef,
  siteConfig
}) => {
  if (!isOpen || !service) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[300] flex items-center justify-center p-0 sm:p-4 bg-slate-950/95 backdrop-blur-2xl"
      >
        <div className="absolute inset-0" onClick={onClose} />
        <motion.div 
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="bg-slate-900 border-t sm:border border-white/10 rounded-t-[40px] sm:rounded-[48px] shadow-[0_0_100px_rgba(0,0,0,0.5)] max-w-4xl w-full h-full sm:h-[85vh] overflow-hidden relative flex flex-col"
        >
          {/* Header */}
          <div className="p-6 sm:p-8 bg-white/5 border-b border-white/5 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center font-black text-xl overflow-hidden border border-white/10 shadow-lg">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-slate-900"></div>
              </div>
              <div>
                <div className="text-xs sm:text-sm font-black text-white uppercase tracking-widest">{siteConfig.aiAdvisorTitle || `Tư vấn dịch vụ: ${service.title}`}</div>
                <div className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">{siteConfig.aiAdvisorSubtitle || 'AI Advisor đang trực tuyến'}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <select 
                value={aiProvider}
                onChange={(e) => setAiProvider(e.target.value as AIProvider)}
                className="hidden sm:block bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-[10px] font-black uppercase tracking-widest text-slate-400 outline-none focus:border-blue-500 transition-all cursor-pointer"
              >
                <option value="gemini" className="bg-slate-900">Gemini</option>
                <option value="openai" className="bg-slate-900">OpenAI</option>
                <option value="claude" className="bg-slate-900">Claude</option>
              </select>
              <button 
                onClick={onClose} 
                className="bg-white/5 hover:bg-red-600 p-3 rounded-2xl text-white transition-all active:scale-90"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Chat Body */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-6 sm:space-y-8 custom-scrollbar bg-slate-900/50">
            {aiMessages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-6 opacity-80">
                <div className="w-20 h-20 rounded-full bg-blue-600/10 flex items-center justify-center">
                  <MessageSquare className="w-10 h-10 text-blue-500" />
                </div>
                <div className="space-y-4 max-w-lg mx-auto">
                  <p className="text-white font-black uppercase tracking-widest text-sm underline decoration-blue-500 decoration-4 underline-offset-8 mb-6">Xin chào!</p>
                  <p className="text-slate-300 text-base leading-relaxed font-medium">
                    {siteConfig.aiAdvisorWelcome || `Bạn đang quan tâm đến ${service.title}? Hãy đặt câu hỏi để tôi có thể hỗ trợ bạn ngay lập tức.`}
                  </p>
                </div>
              </div>
            )}
            {aiMessages.map((m, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={i} 
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[85%] sm:max-w-[75%] p-4 sm:p-6 rounded-[28px] text-sm sm:text-base leading-relaxed shadow-xl ${
                  m.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none' 
                    : 'bg-slate-800/50 border border-white/5 text-slate-200 rounded-tl-none'
                }`}>
                  <ReactMarkdown>{m.text}</ReactMarkdown>
                </div>
              </motion.div>
            ))}
            {isAiLoading && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-3 ml-2"
              >
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce delay-150"></div>
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce delay-300"></div>
                </div>
                <span className="text-slate-600 text-[10px] uppercase font-black tracking-widest italic">AI đang xử lý...</span>
              </motion.div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Chat Input */}
          <div className="p-6 sm:p-8 border-t border-white/5 bg-slate-950/50 shrink-0">
            <div className="relative flex items-center gap-4">
              <input 
                value={aiInput}
                onChange={e => setAiInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleAiChat()}
                disabled={isAiLoading}
                placeholder="Nhập câu hỏi của bạn..." 
                className="flex-1 bg-slate-800/50 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-white text-sm sm:text-base placeholder:text-slate-600 disabled:opacity-50"
              />
              <button 
                onClick={() => handleAiChat()} 
                disabled={isAiLoading || !aiInput.trim()}
                className="bg-blue-600 hover:bg-blue-500 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center transition-all shadow-2xl shadow-blue-900/40 active:scale-90 group disabled:opacity-50"
              >
                <Send className="w-5 h-5 text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <button 
                onClick={clearChat}
                className="text-[9px] font-black uppercase tracking-widest text-slate-500 hover:text-red-500 transition-all flex items-center gap-2"
              >
                <Trash2 className="w-3 h-3" /> Xóa lịch sử
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AiServiceChatModal;
