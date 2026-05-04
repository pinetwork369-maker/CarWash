
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CloudSun, 
  Wind, 
  ShieldCheck, 
  Zap, 
  Users, 
  Trophy, 
  ChevronRight, 
  Sparkles, 
  Compass, 
  Thermometer,
  CloudRain,
  Sun,
  Droplets,
  Star,
  Gift,
  ArrowRight
} from 'lucide-react';
import { SiteConfig, LoyaltyTier } from '../types';

interface InnovationLabProps {
  siteConfig: SiteConfig;
}

const InnovationLab: React.FC<InnovationLabProps> = ({ siteConfig }) => {
  const [activeFeature, setActiveFeature] = useState<number>(0);
  const [weather, setWeather] = useState({ temp: 28, status: 'Sunny', advice: 'Tia UV cao, hãy phủ Ceramic bảo vệ sơn.' });

  const features = [
    {
      id: 0,
      title: "WeatherGuard Advisor",
      subtitle: "Bảo vệ xe theo thời tiết",
      description: "Hệ thống AI phân tích thời tiết thực tế để đưa ra lời khuyên chăm sóc xe tối ưu nhất.",
      icon: <CloudSun className="w-8 h-8" />,
      color: "from-blue-600 to-cyan-500",
      content: (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-white/5 p-6 rounded-3xl border border-white/5">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-orange-500/20 flex items-center justify-center text-orange-500">
                <Sun className="w-8 h-8" />
              </div>
              <div>
                <p className="text-white font-black text-2xl">32°C</p>
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Tp. Hồ Chí Minh • Nắng gắt</p>
              </div>
            </div>
            <div className="text-right">
              <span className="px-3 py-1 bg-red-500/20 text-red-500 text-[9px] font-black uppercase tracking-widest rounded-full border border-red-500/20">Cảnh báo UV: Cao</span>
            </div>
          </div>
          
          <div className="bg-blue-600/10 border border-blue-500/20 p-6 rounded-[32px] relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10">
                <Zap className="w-12 h-12 text-blue-500" />
             </div>
             <p className="text-blue-400 text-[10px] font-black uppercase tracking-widest mb-2 flex items-center gap-2">
               <Sparkles className="w-3 h-3" /> AI Khuyên dùng
             </p>
             <h4 className="text-white font-bold text-lg mb-2">Gói Phủ Ceramic 9H Ultra</h4>
             <p className="text-slate-400 text-sm leading-relaxed">Thời tiết nắng nóng kéo dài dễ làm oxy hóa lớp sơn. Phủ Ceramic giúp ngăn chặn tia UV và giữ độ bóng cho xe.</p>
             <button className="mt-4 flex items-center gap-2 text-blue-400 text-xs font-black uppercase tracking-widest hover:text-blue-300 transition-colors">
               Tìm hiểu ngay <ArrowRight className="w-4 h-4" />
             </button>
          </div>
        </div>
      )
    },
    {
      id: 1,
      title: "Wheel Vision AI",
      subtitle: "Xem trước độ bóng mâm xe",
      description: "Công nghệ mô phỏng giúp bạn thấy trước kết quả phục hồi mâm xe trước khi thực hiện.",
      icon: <Zap className="w-8 h-8" />,
      color: "from-purple-600 to-pink-500",
      content: (
        <div className="space-y-6 text-center">
            <div className="aspect-video bg-slate-950 rounded-[40px] relative overflow-hidden flex items-center justify-center border border-white/5">
               <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10"></div>
               <img src="https://picsum.photos/seed/wheel/800/450" className="w-full h-full object-cover opacity-60" referrerPolicy="no-referrer" alt="Wheel Preview" />
               <div className="absolute inset-0 flex items-center justify-center z-20">
                  <div className="w-px h-full bg-blue-500/50 relative shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-xl">
                        <Droplets className="w-5 h-5" />
                     </div>
                  </div>
               </div>
               <div className="absolute bottom-6 left-6 text-left z-20">
                  <p className="text-white font-black text-xs uppercase tracking-widest">Trước (Cũ/Mờ)</p>
               </div>
               <div className="absolute bottom-6 right-6 text-right z-20">
                  <p className="text-blue-400 font-black text-xs uppercase tracking-widest">Sau (Mirror Polish)</p>
               </div>
            </div>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.3em]">Kéo thanh trượt để so sánh hiệu quả</p>
        </div>
      )
    },
    {
      id: 2,
      title: "Elite Member Journey",
      subtitle: "Hành trình Kim Cương",
      description: "Theo dõi hành trình thăng hạng và các đặc quyền cao cấp dành riêng cho bạn.",
      icon: <Trophy className="w-8 h-8" />,
      color: "from-amber-500 to-orange-500",
      content: (
        <div className="space-y-8">
           <div className="flex justify-between items-end">
              <div>
                 <p className="text-amber-500 text-[10px] font-black uppercase tracking-widest mb-1">Cấp độ hiện tại</p>
                 <h4 className="text-white font-black text-3xl uppercase tracking-tighter italic">Vàng (Gold)</h4>
              </div>
              <div className="text-right">
                 <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Tiến tới Kim Cương</p>
                 <p className="text-white font-bold">850 / 1000 Pts</p>
              </div>
           </div>
           
           <div className="h-4 bg-slate-950 rounded-full overflow-hidden border border-white/5 p-1">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '85%' }}
                className="h-full bg-gradient-to-r from-amber-600 to-orange-400 rounded-full shadow-[0_0_15px_rgba(251,191,36,0.4)]"
              ></motion.div>
           </div>

           <div className="grid grid-cols-2 gap-4">
              <div className="p-5 rounded-3xl bg-white/5 border border-white/5">
                 <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-500 mb-4">
                    <Star className="w-5 h-5" />
                 </div>
                 <h5 className="text-white font-bold text-sm mb-1">Giảm 15%</h5>
                 <p className="text-slate-500 text-[9px] uppercase tracking-widest font-black">Toàn bộ dịch vụ</p>
              </div>
              <div className="p-5 rounded-3xl bg-white/5 border border-white/5">
                 <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-500 mb-4">
                    <Users className="w-5 h-5" />
                 </div>
                 <h5 className="text-white font-bold text-sm mb-1">Pick up & Drop off</h5>
                 <p className="text-slate-500 text-[9px] uppercase tracking-widest font-black">Giao nhận xe tận nhà</p>
              </div>
           </div>
        </div>
      )
    },
    {
      id: 3,
      title: "Referral Rewards",
      subtitle: "Chia sẻ - Nhận quà Spa",
      description: "Giới thiệu XE ĐẸP PRO cho bạn bè và nhận ngay các gói dịch vụ miễn phí cực trị giá.",
      icon: <Users className="w-8 h-8" />,
      color: "from-emerald-600 to-green-500",
      content: (
        <div className="space-y-6">
           <div className="bg-emerald-600/10 border border-emerald-500/20 p-8 rounded-[40px] text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-emerald-600 flex items-center justify-center text-white mx-auto shadow-2xl shadow-emerald-600/20">
                 <Gift className="w-10 h-10" />
              </div>
              <div>
                 <h4 className="text-white font-black text-xl uppercase tracking-tight">Tặng bạn 500k</h4>
                 <p className="text-emerald-500 text-[10px] font-black uppercase tracking-widest">Cho mỗi lượt giới thiệu thành công</p>
              </div>
              <div className="bg-slate-950 p-4 rounded-2xl border border-white/5 flex items-center justify-between">
                 <code className="text-white font-mono text-sm tracking-widest uppercase">XEDEP-PRO-888</code>
                 <button className="text-blue-500 text-[10px] font-black uppercase tracking-widest">Copy Link</button>
              </div>
           </div>
           <p className="text-slate-500 text-[10px] text-center leading-relaxed">Người được giới thiệu cũng sẽ nhận ngay voucher giảm 20% cho lần đầu trải nghiệm tại trung tâm.</p>
        </div>
      )
    },
    {
      id: 4,
      title: "AI Smart History",
      subtitle: "Nhật ký chăm sóc 4.0",
      description: "Hệ thống tự động ghi lại mọi thay đổi của xe qua hình ảnh AI, giúp bạn theo dõi sự lột xác của xế yêu theo thời gian.",
      icon: <Sparkles className="w-8 h-8" />,
      color: "from-blue-600 to-indigo-600",
      content: (
        <div className="space-y-6">
           <div className="grid grid-cols-2 gap-4">
              <div className="aspect-square rounded-3xl bg-slate-950 border border-white/5 overflow-hidden group/item relative">
                 <img src="https://picsum.photos/seed/history1/400/400" className="w-full h-full object-cover opacity-50 group-hover/item:opacity-80 transition-opacity" alt="History 1" />
                 <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-[8px] font-black text-white uppercase">T06/2023</div>
              </div>
              <div className="aspect-square rounded-3xl bg-slate-950 border border-white/5 overflow-hidden group/item relative">
                 <img src="https://picsum.photos/seed/history2/400/400" className="w-full h-full object-cover opacity-100 transition-opacity" alt="History 2" />
                 <div className="absolute top-4 left-4 bg-blue-600 px-3 py-1 rounded-full text-[8px] font-black text-white uppercase">HIỆN TẠI</div>
              </div>
           </div>
           <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
              <div className="flex items-center gap-3 mb-3">
                 <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                 <p className="text-white font-bold text-sm">Độ bóng sơn: Tăng 45%</p>
              </div>
              <p className="text-slate-500 text-xs">Phân tích từ 12 lần bảo dưỡng định kỳ gần nhất.</p>
           </div>
        </div>
      )
    }
  ];

  return (
    <section className="py-24 sm:py-32 bg-slate-950 relative overflow-hidden border-b border-white/5">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16 sm:mb-24">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-600/10 border border-blue-500/20 mb-8"
          >
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 font-black uppercase tracking-[0.3em] text-[10px]">Phòng LAB Công Nghệ (Beta)</span>
          </motion.div>
          
          <h2 className="text-5xl sm:text-8xl font-black text-white uppercase tracking-tighter leading-[0.8] font-display mb-8">
            Đề xuất <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Tính năng mới</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto italic">
            "Chúng tôi không ngừng đổi mới để mang lại trải nghiệm chăm sóc xe dẫn đầu công nghệ và cá nhân hóa cho từng khách hàng."
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-7xl mx-auto">
          {/* Navigation */}
          <div className="lg:col-span-4 space-y-4">
            {features.map((feature, idx) => (
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                key={feature.id}
                onClick={() => setActiveFeature(feature.id)}
                className={`w-full text-left p-8 rounded-[32px] transition-all duration-500 border group ${
                  activeFeature === feature.id 
                  ? `bg-gradient-to-br ${feature.color} border-transparent shadow-2xl` 
                  : 'bg-white/5 border-white/5 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-6">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                    activeFeature === feature.id ? 'bg-white/20 text-white' : 'bg-slate-900 text-slate-400 group-hover:scale-110'
                  }`}>
                    {React.cloneElement(feature.icon as React.ReactElement<any>, { className: 'w-7 h-7' })}
                  </div>
                  <div>
                    <h4 className={`font-black uppercase tracking-tight text-lg ${activeFeature === feature.id ? 'text-white' : 'text-slate-300'}`}>
                      {feature.title}
                    </h4>
                    <p className={`text-[10px] font-black uppercase tracking-widest ${activeFeature === feature.id ? 'text-white/60' : 'text-slate-500'}`}>
                      {feature.subtitle}
                    </p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Feature Display */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeature}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: "circOut" }}
                className="bg-slate-900/60 border border-white/10 rounded-[48px] p-10 sm:p-16 backdrop-blur-3xl min-h-[500px] flex flex-col justify-between"
              >
                <div className="space-y-12">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div className="space-y-3">
                      <div className={`w-16 h-1 bg-gradient-to-r ${features[activeFeature].color}`}></div>
                      <h3 className="text-4xl font-black text-white uppercase tracking-tighter">
                        {features[activeFeature].title}
                      </h3>
                      <p className="text-slate-400 text-lg sm:text-xl font-medium max-w-lg">
                        {features[activeFeature].description}
                      </p>
                    </div>
                    <div className="hidden sm:block">
                       <Zap className={`w-20 h-20 opacity-10 text-transparent bg-clip-text bg-gradient-to-r ${features[activeFeature].color}`} />
                    </div>
                  </div>

                  <div className="relative">
                    {features[activeFeature].content}
                  </div>
                </div>

                <div className="pt-12 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-8">
                  <div className="flex -space-x-4">
                     {[1, 2, 3, 4].map(i => (
                       <img key={i} src={`https://i.pravatar.cc/150?u=${i}`} className="w-10 h-10 rounded-full border-4 border-slate-900" alt="User" />
                     ))}
                     <div className="w-10 h-10 rounded-full border-4 border-slate-900 bg-blue-600 flex items-center justify-center text-white text-[10px] font-black">+42</div>
                  </div>
                  <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest text-center sm:text-left">
                    Sắp ra mắt • 42 khách hàng đã quan tâm đến tính năng này
                  </p>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-8 py-4 rounded-2xl bg-gradient-to-r ${features[activeFeature].color} text-white font-black uppercase text-[10px] tracking-widest shadow-xl transition-all hover:scale-105 active:scale-95`}
                  >
                     Tôi quan tâm
                  </motion.button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InnovationLab;
