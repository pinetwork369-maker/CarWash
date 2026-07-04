import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageIcon } from 'lucide-react';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  wrapperClassName?: string;
  fallbackColor?: string;
  priority?: boolean;
}

const LazyImage: React.FC<LazyImageProps> = ({ 
  src, 
  alt, 
  className, 
  wrapperClassName = "", 
  fallbackColor = "bg-slate-900",
  priority = false,
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(priority);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!src || priority) return;
    const img = new Image();
    img.src = src;
    img.onload = () => setIsLoaded(true);
    img.onerror = () => setError(true);
  }, [src, priority]);

  return (
    <div className={`relative overflow-hidden ${wrapperClassName}`}>
      <AnimatePresence>
        {!isLoaded && !error && !priority && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`absolute inset-0 z-10 flex items-center justify-center ${fallbackColor}`}
          >
            <motion.div
              animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.95, 1, 0.95] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ImageIcon className="w-6 h-6 text-slate-700" />
            </motion.div>
          </motion.div>
        )}
        {error && (
          <div className={`absolute inset-0 z-10 flex items-center justify-center bg-slate-950 text-slate-800`}>
            <ImageIcon className="w-6 h-6" />
          </div>
        )}
      </AnimatePresence>

      {src ? (
        <img
          src={src}
          alt={alt}
          className={`transition-all duration-700 ease-out ${priority ? 'opacity-100 blur-0 scale-100' : isLoaded ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-105 blur-lg'} ${className}`}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding={priority ? "sync" : "async"}
          referrerPolicy="no-referrer"
          onLoad={() => setIsLoaded(true)}
          {...props}
        />
      ) : null}
    </div>
  );
};

export default LazyImage;
