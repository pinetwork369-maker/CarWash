import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Upload, X, Image as ImageIcon, Video as VideoIcon, Plus, Trash2, Link as LinkIcon, CheckCircle2, AlertCircle } from 'lucide-react';
import { GalleryImage } from '../../types.ts';

interface PendingImage extends Omit<GalleryImage, 'id'> {
  id: string;
  file?: File;
  status: 'pending' | 'uploading' | 'success' | 'error';
}

interface GalleryUploadManagerProps {
  onUpload: (images: GalleryImage[]) => void;
  onClose: () => void;
  categories: { value: string; label: string }[];
  t: (key: string) => string;
}

export const GalleryUploadManager: React.FC<GalleryUploadManagerProps> = ({ onUpload, onClose, categories, t }) => {
  const [pendingImages, setPendingImages] = useState<PendingImage[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [urlInput, setUrlInput] = useState('');

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const handleFiles = useCallback(async (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    const newPending: PendingImage[] = [];

    for (const file of fileArray) {
      if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) continue;
      
      try {
        const base64 = await fileToBase64(file);
        newPending.push({
          id: Math.random().toString(36).substr(2, 9),
          url: base64,
          title: file.name.split('.')[0],
          category: 'general',
          type: file.type.startsWith('video/') ? 'video' : 'image',
          file,
          status: 'pending'
        });
      } catch (err) {
        console.error('Error processing file:', err);
      }
    }

    setPendingImages(prev => [...prev, ...newPending]);
  }, []);

  const handleUrlAdd = () => {
    if (!urlInput.trim()) return;
    
    const isVideo = urlInput.match(/\.(mp4|webm|ogg)$/i) || urlInput.includes('youtube.com') || urlInput.includes('vimeo.com');
    
    const newImg: PendingImage = {
      id: Math.random().toString(36).substr(2, 9),
      url: urlInput,
      title: t('gallery_url_image'),
      category: 'general',
      type: isVideo ? 'video' : 'image',
      status: 'pending'
    };

    setPendingImages(prev => [...prev, newImg]);
    setUrlInput('');
  };

  const removePending = (id: string) => {
    setPendingImages(prev => prev.filter(img => img.id !== id));
  };

  const updatePending = (id: string, updates: Partial<PendingImage>) => {
    setPendingImages(prev => prev.map(img => img.id === id ? { ...img, ...updates } : img));
  };

  const handleConfirmUpload = () => {
    const finalImages: GalleryImage[] = pendingImages.map(({ id, url, category, title, type }) => ({
      id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
      url,
      category,
      title,
      type
    }));
    onUpload(finalImages);
    onClose();
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl"
    >
      <div className="absolute inset-0" onClick={onClose} />
      
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative bg-slate-900 border border-white/10 rounded-[32px] w-full max-w-5xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
      >
        {/* Header */}
        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-slate-900/50">
          <div>
            <h3 className="text-xl font-black text-white uppercase tracking-tight">{t('gallery_add_title')}</h3>
            <p className="text-slate-500 text-xs font-medium">{t('gallery_add_desc')}</p>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-xl bg-slate-800 text-slate-400 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar space-y-8">
          {/* Upload Zone */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div 
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleFiles(e.dataTransfer.files); }}
              className={`relative border-2 border-dashed rounded-[24px] p-10 flex flex-col items-center justify-center text-center transition-all group ${
                isDragging ? 'border-blue-500 bg-blue-500/10 scale-[0.98]' : 'border-white/10 hover:border-blue-500/50 hover:bg-white/5'
              }`}
            >
              <div className="w-16 h-16 rounded-2xl bg-blue-600/20 text-blue-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Upload className="w-8 h-8" />
              </div>
              <h4 className="text-white font-bold mb-2">{t('gallery_drag_drop')}</h4>
              <p className="text-slate-500 text-xs mb-6 max-w-[200px]">{t('gallery_formats')}</p>
              
              <label className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer shadow-lg shadow-blue-900/20">
                {t('gallery_select_computer')}
                <input 
                  type="file" 
                  className="hidden" 
                  multiple 
                  accept="image/*,video/*" 
                  onChange={(e) => e.target.files && handleFiles(e.target.files)} 
                />
              </label>
            </div>

            <div className="bg-slate-800/30 rounded-[24px] p-8 border border-white/5 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center">
                  <LinkIcon className="w-5 h-5" />
                </div>
                <h4 className="text-white font-bold">{t('gallery_add_url')}</h4>
              </div>
              <div className="space-y-4">
                <div className="relative">
                  <input 
                    type="text" 
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder={t('gallery_url_placeholder')}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl py-4 pl-4 pr-12 text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                  <button 
                    onClick={handleUrlAdd}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center hover:bg-blue-500 transition-all"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-[10px] text-slate-500 italic">{t('gallery_url_tip')}</p>
              </div>
            </div>
          </div>

          {/* Pending List */}
          {pendingImages.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
                  {t('gallery_queue')} 
                  <span className="bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded-full">{pendingImages.length}</span>
                </h4>
                <button 
                  onClick={() => setPendingImages([])}
                  className="text-red-500 text-[10px] font-black uppercase tracking-widest hover:underline"
                >
                  {t('gallery_delete_all')}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AnimatePresence mode="popLayout">
                  {pendingImages.map((img) => (
                    <motion.div 
                      key={img.id}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="bg-slate-800/50 border border-white/5 rounded-2xl p-4 flex gap-4 group hover:border-blue-500/30 transition-all"
                    >
                      <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-slate-950 border border-white/10 relative">
                        {img.type === 'video' ? (
                          <video src={img.url} className="w-full h-full object-cover" />
                        ) : (
                          <img src={img.url} className="w-full h-full object-cover" alt="Preview" />
                        )}
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          {img.type === 'video' ? <VideoIcon className="text-white w-6 h-6" /> : <ImageIcon className="text-white w-6 h-6" />}
                        </div>
                      </div>

                      <div className="flex-1 space-y-3">
                        <div className="flex justify-between items-start">
                          <input 
                            value={img.title}
                            onChange={(e) => updatePending(img.id, { title: e.target.value })}
                            className="bg-transparent border-b border-white/10 text-white font-bold text-sm focus:border-blue-500 outline-none w-full pb-1"
                            placeholder={t('gallery_image_title_placeholder')}
                          />
                          <button 
                            onClick={() => removePending(img.id)}
                            className="text-slate-500 hover:text-red-500 p-1 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {categories.map(cat => (
                            <button
                              key={cat.value}
                              onClick={() => updatePending(img.id, { category: cat.value })}
                              className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${
                                img.category === cat.value 
                                ? 'bg-blue-600 text-white' 
                                : 'bg-slate-950 text-slate-500 hover:bg-slate-900'
                              }`}
                            >
                              {cat.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )}

          {pendingImages.length === 0 && (
            <div className="py-20 flex flex-col items-center justify-center text-slate-600 border border-white/5 border-dashed rounded-[32px]">
              <ImageIcon className="w-12 h-12 mb-4 opacity-20" />
              <p className="text-sm font-medium">{t('gallery_no_images')}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/5 bg-slate-900/80 flex items-center justify-between">
          <div className="text-slate-500 text-[10px] font-medium">
            {pendingImages.length > 0 ? t('gallery_selected_files').replace('{{count}}', pendingImages.length.toString()) : t('gallery_please_select')}
          </div>
          <div className="flex gap-4">
            <button 
              onClick={onClose}
              className="px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-all"
            >
              {t('gallery_cancel')}
            </button>
            <button 
              disabled={pendingImages.length === 0}
              onClick={handleConfirmUpload}
              className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-10 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-blue-900/20 transition-all flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              {t('gallery_confirm_upload')}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
