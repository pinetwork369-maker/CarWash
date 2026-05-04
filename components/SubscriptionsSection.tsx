
import React from 'react';
import { motion } from 'motion/react';
import { Check, Star, Zap, Shield, Award, Crown } from 'lucide-react';
import { SiteConfig, SubscriptionPackage } from '../types';

interface SubscriptionsSectionProps {
  siteConfig: SiteConfig;
  onSelectPackage: (pkg: SubscriptionPackage) => void;
}

export const SubscriptionsSection: React.FC<SubscriptionsSectionProps> = ({ siteConfig, onSelectPackage }) => {
  const packages = siteConfig.subscriptions || [];

  if (packages.length === 0) return null;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'zap': return <Zap className="w-6 h-6" />;
      case 'shield': return <Shield className="w-6 h-6" />;
      case 'award': return <Award className="w-6 h-6" />;
      case 'crown': return <Crown className="w-6 h-6" />;
      default: return <Star className="w-6 h-6" />;
    }
  };

  return (
    <section id="subscriptions" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tighter mb-4">
              Gói Thành Viên <span className="text-blue-500">Định Kỳ</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Tiết kiệm hơn và chăm sóc xe toàn diện với các gói đăng ký linh hoạt theo tháng hoặc năm.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {packages.map((pkg, idx) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className={`relative p-8 rounded-[32px] border transition-all flex flex-col h-full ${
                pkg.isPopular 
                  ? 'bg-blue-600/10 border-blue-500/50 shadow-[0_20px_50px_-10px_rgba(37,99,235,0.3)]' 
                  : 'bg-slate-900/50 border-white/5 hover:border-white/20'
              }`}
            >
              {pkg.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-full">
                  Phổ Biến Nhất
                </div>
              )}

              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${
                pkg.isPopular ? 'bg-blue-600 text-white' : 'bg-slate-800 text-blue-500'
              }`}>
                {getIcon(pkg.icon)}
              </div>

              <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2">{pkg.title}</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-3xl font-black text-white">{pkg.price}</span>
                <span className="text-slate-500 text-sm font-medium">/{pkg.interval === 'monthly' ? 'tháng' : 'năm'}</span>
              </div>
              
              <p className="text-slate-400 text-sm mb-8 flex-grow">{pkg.description}</p>

              <div className="space-y-4 mb-8">
                {pkg.features.map((feature, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-3">
                    <div className="mt-1 w-4 h-4 rounded-full bg-blue-600/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-blue-500" />
                    </div>
                    <span className="text-slate-300 text-xs leading-tight">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => onSelectPackage(pkg)}
                className={`w-full py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all active:scale-95 ${
                  pkg.isPopular 
                    ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20' 
                    : 'bg-white text-slate-950 hover:bg-slate-200'
                }`}
              >
                Đăng Ký Ngay
              </button>
            </motion.div>
          ))}
        </div>

        {/* Perks Section */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 border-t border-white/5 pt-16">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-600/10 flex items-center justify-center text-emerald-500">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Bảo Hiểm Dịch Vụ</h4>
              <p className="text-slate-500 text-xs">Cam kết chất lượng 100%</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-amber-600/10 flex items-center justify-center text-amber-500">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Ưu Tiên Đặt Lịch</h4>
              <p className="text-slate-500 text-xs">Không phải chờ đợi</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-purple-600/10 flex items-center justify-center text-purple-500">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Quà Tặng Sinh Nhật</h4>
              <p className="text-slate-500 text-xs">Ưu đãi đặc biệt cho thành viên</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
