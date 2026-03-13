import React, { useState } from 'react';
import { NewsArticle } from './types';
import { getAIResponse, AIProvider } from '../../services/geminiService.ts';
import { Sparkles, Loader2, Trash2, Plus, Image as ImageIcon, Type, FileText } from 'lucide-react';

interface NewsAdminProps {
  news: NewsArticle[];
  setNews: React.Dispatch<React.SetStateAction<NewsArticle[]>>;
}

const NewsManagement: React.FC<NewsAdminProps> = ({ news, setNews }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiProvider, setAiProvider] = useState<AIProvider>('gemini');

  const handleAddNews = () => {
    const newArticle: NewsArticle = {
      id: Date.now().toString(),
      title: 'Tiêu đề bài viết mới',
      summary: 'Tóm tắt bài viết mới...',
      content: 'Nội dung chi tiết bài viết...',
      image: 'https://images.unsplash.com/photo-1552933529-e359b2477252?auto=format&fit=crop&q=80&w=800',
      author: 'Admin',
      date: new Date().toISOString().split('T')[0],
      category: 'Tin tức'
    };
    setNews(prev => [newArticle, ...prev]);
  };

  const handleGenerateAIArticle = async () => {
    const topic = prompt("Nhập chủ đề bài viết (ví dụ: Cách bảo quản lớp phủ Ceramic mùa mưa):");
    if (!topic) return;

    setIsGenerating(true);
    try {
      const promptText = `Hãy viết một bài viết chuyên nghiệp về chủ đề: "${topic}" cho một trung tâm chăm sóc xe cao cấp (Detailing). 
      Yêu cầu:
      1. Tiêu đề thu hút, chuẩn SEO.
      2. Tóm tắt ngắn gọn (khoảng 2 câu).
      3. Nội dung chi tiết trình bày bằng Markdown, có các tiêu đề phụ (h2, h3), danh sách gạch đầu dòng, lời khuyên chuyên gia.
      4. Giọng văn chuyên nghiệp, am hiểu kỹ thuật nhưng dễ tiếp cận.
      5. Trả lời theo định dạng JSON: {"title": "...", "summary": "...", "content": "...", "category": "..."}`;

      const response = await getAIResponse(promptText, [], aiProvider);
      
      // Try to parse JSON from response
      let articleData;
      try {
        const jsonMatch = response.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          articleData = JSON.parse(jsonMatch[0]);
        } else {
          throw new Error("No JSON found");
        }
      } catch (e) {
        // Fallback if AI doesn't return perfect JSON
        articleData = {
          title: topic,
          summary: "Bài viết được tạo bởi AI về " + topic,
          content: response,
          category: "Kỹ thuật"
        };
      }

      const newArticle: NewsArticle = {
        id: Date.now().toString(),
        title: articleData.title || topic,
        summary: articleData.summary || "Tóm tắt bài viết...",
        content: articleData.content || response,
        image: `https://picsum.photos/seed/${Date.now()}/1200/800`,
        author: 'AI Expert',
        date: new Date().toISOString().split('T')[0],
        category: articleData.category || 'Kỹ thuật'
      };

      setNews(prev => [newArticle, ...prev]);
    } catch (error) {
      console.error("AI Generation Error:", error);
      alert("Đã xảy ra lỗi khi tạo bài viết bằng AI.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDeleteNews = (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa bài viết này?")) {
      setNews(prev => prev.filter(n => n.id !== id));
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter">Quản Lý Tin Tức</h3>
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-slate-900 border border-white/10 rounded-2xl px-3 py-1">
            <span className="text-[8px] font-black text-slate-500 uppercase">Model:</span>
            <select 
              value={aiProvider}
              onChange={(e) => setAiProvider(e.target.value as AIProvider)}
              className="bg-transparent text-[10px] font-black text-blue-500 uppercase outline-none cursor-pointer"
            >
              <option value="gemini">Gemini</option>
              <option value="openai">OpenAI</option>
              <option value="claude">Claude</option>
            </select>
          </div>
          <button 
            onClick={handleGenerateAIArticle}
            disabled={isGenerating}
            className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-emerald-900/20 transition-all flex items-center gap-2"
          >
            {isGenerating ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
            Tạo Bài Viết AI
          </button>
          <button 
            onClick={handleAddNews} 
            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-blue-900/20 transition-all flex items-center gap-2"
          >
            <Plus className="w-3 h-3" />
            Thêm Thủ Công
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        {news.map(article => (
          <div key={article.id} className="bg-slate-900/50 rounded-[32px] border border-white/5 p-6 md:p-8 flex flex-col md:flex-row gap-8 group hover:border-blue-500/30 transition-all">
            <div className="w-full md:w-64 h-48 rounded-2xl overflow-hidden flex-shrink-0 border border-white/10">
              <img 
                src={article.image} 
                alt={article.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                referrerPolicy="no-referrer" 
              />
            </div>
            <div className="flex-1 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[8px] font-black uppercase text-slate-600">Tiêu đề bài viết</label>
                  <input 
                    value={article.title} 
                    onChange={e => setNews(prev => prev.map(n => n.id === article.id ? {...n, title: e.target.value} : n))} 
                    className="w-full bg-slate-950 border border-white/5 rounded-xl p-3 text-white font-bold" 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[8px] font-black uppercase text-slate-600">Danh mục</label>
                  <input 
                    value={article.category} 
                    onChange={e => setNews(prev => prev.map(n => n.id === article.id ? {...n, category: e.target.value} : n))} 
                    className="w-full bg-slate-950 border border-white/5 rounded-xl p-3 text-blue-400 font-bold" 
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[8px] font-black uppercase text-slate-600">Tóm tắt</label>
                <textarea 
                  value={article.summary} 
                  onChange={e => setNews(prev => prev.map(n => n.id === article.id ? {...n, summary: e.target.value} : n))} 
                  className="w-full bg-slate-950 border border-white/5 rounded-xl p-3 text-slate-400 text-sm h-20" 
                />
              </div>
              <div className="space-y-1">
                <label className="text-[8px] font-black uppercase text-slate-600">Nội dung (Markdown)</label>
                <textarea 
                  value={article.content} 
                  onChange={e => setNews(prev => prev.map(n => n.id === article.id ? {...n, content: e.target.value} : n))} 
                  className="w-full bg-slate-950 border border-white/5 rounded-xl p-3 text-slate-400 text-sm h-40 font-mono" 
                />
              </div>
              <div className="flex justify-end">
                <button 
                  onClick={() => handleDeleteNews(article.id)} 
                  className="bg-red-900/20 text-red-500 px-6 py-2 rounded-xl text-[10px] font-black uppercase hover:bg-red-600 hover:text-white transition-all"
                >
                  Xóa Bài Viết
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { NewsManagement };
