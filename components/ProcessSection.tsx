import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Shield, Zap, Award, Search, Droplets, Sparkles, Wand2, Loader2 } from 'lucide-react';
import { SiteConfig } from '../types';

interface ProcessSectionProps {
  siteConfig: SiteConfig;
  setSiteConfig: (config: SiteConfig) => void;
  isEditMode: boolean;
  isDesignAuthenticated: boolean;
}

// Simple internal version of EditableText since moving components is complex
const LocalEditableText: React.FC<{
  text: string;
  isEditMode: boolean;
  isDesignAuthenticated: boolean;
  onSave: (val: string) => void;
  className?: string;
  tag?: any;
}> = ({ text, isEditMode, isDesignAuthenticated, onSave, className, tag: Tag = 'p' }) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [val, setVal] = React.useState(text);

  React.useEffect(() => setVal(text), [text]);

  const canEdit = isEditMode && isDesignAuthenticated;

  if (canEdit && isEditing) {
    return (
      <input
        autoFocus
        value={val}
        onChange={e => setVal(e.target.value)}
        onBlur={() => { setIsEditing(false); onSave(val); }}
        className={`${className} bg-slate-800 text-white border border-blue-500 rounded px-2 outline-none w-full`}
      />
    );
  }

  return (
    <Tag 
      className={`${className} ${canEdit ? 'cursor-text hover:bg-blue-500/10 rounded' : ''}`}
      onClick={() => canEdit && setIsEditing(true)}
    >
      {text}
    </Tag>
  );
};

const steps = [
  {
    title: 'Tiếp Nhận & Kiểm Tra',
    desc: 'Kiểm tra tình trạng xe tổng quát, ghi nhận các khuyết điểm trên bề mặt sơn và nội thất.',
    icon: Search,
    color: 'blue'
  },
  {
    title: 'Vệ Sinh Chuyên Sâu',
    desc: 'Loại bỏ bụi bẩn, nhựa đường, mạt sắt bằng đất sét (Clay bar) và dung dịch chuyên dụng.',
    icon: Droplets,
    color: 'emerald'
  },
  {
    title: 'Hiệu Chỉnh Bề Mặt',
    desc: 'Xử lý các vết xước xoáy, xước dăm và phục hồi độ bóng nguyên bản của lớp sơn.',
    icon: Zap,
    color: 'amber'
  },
  {
    title: 'Bảo Vệ Bề Mặt',
    desc: 'Phủ Ceramic hoặc dán PPF để bảo vệ xe khỏi tác động môi trường và tia UV.',
    icon: Shield,
    color: 'purple'
  },
  {
    title: 'Chăm Sóc Nội Thất',
    desc: 'Vệ sinh, diệt khuẩn và dưỡng các chi tiết da, nhựa bên trong không gian xe.',
    icon: Sparkles,
    color: 'pink'
  },
  {
    title: 'Kiểm Tra Cuối Cùng',
    desc: 'Rà soát lại toàn bộ các chi tiết để đảm bảo chất lượng hoàn hảo nhất trước khi bàn giao.',
    icon: CheckCircle2,
    color: 'indigo'
  },
  {
    title: 'Bàn Giao & Bảo Hành',
    desc: 'Hướng dẫn khách hàng cách chăm sóc xe tại nhà và kích hoạt chế độ bảo hành điện tử.',
    icon: Award,
    color: 'rose'
  }
];

const ProcessSection: React.FC<ProcessSectionProps> = ({ siteConfig, setSiteConfig, isEditMode, isDesignAuthenticated }) => {
  return (
    <section id="process" className="process-section py-24 bg-slate-900/50 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4"
          >
            <LocalEditableText 
              text={siteConfig.processSubtitle || 'Tiêu Chuẩn Quốc Tế'} 
              isEditMode={isEditMode} 
              isDesignAuthenticated={isDesignAuthenticated}
              onSave={v => setSiteConfig({...siteConfig, processSubtitle: v})}
              className="text-blue-500 font-black uppercase tracking-[0.3em] text-[10px] mb-0"
            />
          </motion.div>
          <LocalEditableText 
            tag="h2"
            text={siteConfig.processTitle || 'Quy Trình Chăm Sóc Xe'} 
            isEditMode={isEditMode} 
            isDesignAuthenticated={isDesignAuthenticated}
            onSave={v => setSiteConfig({...siteConfig, processTitle: v})}
            className="section-title text-4xl md:text-6xl mb-6"
          />
        </div>

        <div className="relative">
          {/* Connection Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent -translate-y-1/2" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-8">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative group step-item"
                  onViewportEnter={(entry) => {
                    entry?.target.classList.add('is-visible');
                  }}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className={`icon-container w-20 h-20 rounded-[32px] bg-slate-950 border border-white/10 flex items-center justify-center mb-6 relative z-10 group-hover:border-${step.color}-500/50 transition-all duration-500 shadow-2xl group-hover:shadow-${step.color}-500/20`}>
                      <div className={`absolute inset-0 bg-${step.color}-500/5 rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity`} />
                      <Icon className={`w-8 h-8 text-slate-400 group-hover:text-${step.color}-500 transition-colors duration-500`} />
                      
                      {/* Step Number */}
                      <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center text-[10px] font-black text-white shadow-xl">
                        0{idx + 1}
                      </div>
                    </div>
                    
                    <h3 className="text-white font-black uppercase tracking-tight text-sm mb-3 group-hover:text-blue-400 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-slate-500 text-xs leading-relaxed px-4 lg:px-0">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
