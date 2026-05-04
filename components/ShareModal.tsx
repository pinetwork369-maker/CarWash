import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Facebook, Twitter, MessageCircle, Copy } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface ShareModalProps {
  isOpen: boolean; 
  onClose: () => void; 
  url: string; 
  title: string;
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, url, title }) => {
  if (!isOpen) return null;

  const shareLinks = [
    {
      name: 'Facebook',
      icon: <Facebook className="w-5 h-5" />,
      color: 'bg-[#1877F2]',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    },
    {
      name: 'Twitter',
      icon: <Twitter className="w-5 h-5" />,
      color: 'bg-[#1DA1F2]',
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
    },
    {
      name: 'WhatsApp',
      icon: <MessageCircle className="w-5 h-5" />,
      color: 'bg-[#25D366]',
      href: `https://api.whatsapp.com/send?text=${encodeURIComponent(title + ' ' + url)}`
    }
  ];

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
      >
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl max-w-sm w-full relative"
        >
          <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors">✕</button>
          <h3 className="text-xl font-black text-white text-center mb-6 uppercase">Chia Sẻ Trang Web</h3>
          
          <div className="grid grid-cols-3 gap-4 mb-8">
            {shareLinks.map(link => (
              <a 
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 group"
              >
                <div className={`${link.color} p-4 rounded-2xl text-white shadow-lg group-hover:scale-110 transition-transform`}>
                  {link.icon}
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{link.name}</span>
              </a>
            ))}
          </div>

          <div className="relative">
            <input 
              readOnly 
              value={url}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-400 outline-none pr-12"
            />
            <button 
              onClick={() => {
                navigator.clipboard.writeText(url);
                toast.success("Đã sao chép liên kết!");
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-blue-500 hover:text-blue-400 transition-colors"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ShareModal;
