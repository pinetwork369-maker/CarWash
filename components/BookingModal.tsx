import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Zap, Clock, CheckCircle2, Info, CreditCard, Timer, Check, Calendar, Car } from 'lucide-react';
import { Service, SiteConfig, AppNotification, BookingData, Appointment } from '../types';
import { toast } from 'react-hot-toast';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  services: Service[];
  siteConfig: SiteConfig;
  setSiteConfig: React.Dispatch<React.SetStateAction<SiteConfig>>;
  handlePayment: (serviceName: string, price: string, customerName: string, customerEmail?: string) => Promise<void>;
  preSelectedSubService?: string;
  onAddNotification?: (notification: Omit<AppNotification, 'id' | 'date' | 'isRead'>) => void;
  scrollToSection: (id: string) => void;
  initialPhone?: string;
  initialName?: string;
}

const timeSlots = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"
];

const BookingModal: React.FC<BookingModalProps> = ({ 
  isOpen, onClose, services, siteConfig, setSiteConfig, handlePayment, 
  preSelectedSubService, onAddNotification, scrollToSection, 
  initialPhone = '', initialName = '' 
}) => {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [errors, setErrors] = useState<{ phone?: string; email?: string }>({});
  const [formData, setFormData] = useState<BookingData>({
    name: initialName, phone: initialPhone, email: '', vehicleType: 'sedan', carModel: '', serviceId: services[0]?.id || '', subServiceTitle: preSelectedSubService, date: new Date().toISOString().split('T')[0], time: '', note: ''
  });

  // Optimization: Load previous data
  useEffect(() => {
    if (isOpen && !isSubmitted) {
      const savedData = localStorage.getItem('last_booking_contact');
      if (savedData) {
        try {
          const parsed = JSON.parse(savedData);
          setFormData(prev => ({
            ...prev,
            name: initialName || parsed.name || prev.name,
            phone: initialPhone || parsed.phone || prev.phone,
            email: parsed.email || prev.email,
            carModel: parsed.carModel || prev.carModel,
            vehicleType: parsed.vehicleType || prev.vehicleType
          }));
          
          // If we have contact and car info, and a service is pre-selected, jump to step 2 (newly optimized)
          if (preSelectedSubService && parsed.phone && parsed.carModel) {
            setStep(2);
          }
        } catch (e) {
          console.error("Failed to parse saved contact", e);
        }
      }
    }
  }, [isOpen, preSelectedSubService, initialName, initialPhone]);

  if (!isOpen) return null;

  const validateStep = (currentStep: number) => {
    const newErrors: { phone?: string; email?: string } = {};
    if (currentStep === 1) {
      if (!formData.vehicleType || !formData.serviceId) return false;
    }
    if (currentStep === 2) {
      if (!formData.date || !formData.time) return false;
    }
    if (currentStep === 3) {
      const phoneRegex = /^(0[3|5|7|8|9])[0-9]{8}$/;
      if (!phoneRegex.test(formData.phone)) {
        newErrors.phone = 'SĐT không hợp lệ';
      }
      if (formData.email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
          newErrors.email = 'Email sai định dạng';
        }
      }
      if (!formData.name) return false;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(prev => prev + 1);
    } else {
      toast.error('Vui lòng điền đầy đủ thông tin hợp lệ');
    }
  };

  const prevStep = () => setStep(prev => prev - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) return;
    setIsSending(true);
    const service = services.find(s => s.id === formData.serviceId);
    const serviceTitle = service?.title || 'Chưa chọn';
    const fullServiceTitle = formData.subServiceTitle ? `${serviceTitle} (${formData.subServiceTitle})` : serviceTitle;
    const vehicleTypeLabel = formData.vehicleType === 'mini' ? 'MINI' : formData.vehicleType === 'sedan' ? 'SEDAN' : formData.vehicleType === 'suv' ? 'SUV' : 'SUPERCAR';
    const subject = `[ĐẶT LỊCH ${siteConfig.siteName.toUpperCase()}] - ${formData.name}`;
    
    const adminHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">Yêu cầu đặt lịch mới</h2>
        <p><strong>Họ tên:</strong> ${formData.name}</p>
        <p><strong>SĐT:</strong> ${formData.phone}</p>
        <p><strong>Email:</strong> ${formData.email || 'Không cung cấp'}</p>
        <p><strong>Dòng xe:</strong> ${formData.carModel} (${vehicleTypeLabel})</p>
        <p><strong>Dịch vụ:</strong> ${fullServiceTitle}</p>
        <p><strong>Ngày:</strong> ${formData.date}</p>
        <p><strong>Giờ:</strong> ${formData.time || 'Chưa chọn'}</p>
        <p><strong>Ghi chú:</strong> ${formData.note}</p>
        <div style="margin-top: 20px; font-size: 12px; color: #666;">
          Đây là email tự động từ hệ thống website ${siteConfig.siteName}.
        </div>
      </div>
    `;

    const customerHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">Xác nhận đặt lịch thành công</h2>
        <p>Chào <strong>${formData.name}</strong>,</p>
        <p>Cảm ơn bạn đã tin tưởng và đặt lịch tại <strong>${siteConfig.siteName}</strong>. Chúng tôi đã nhận được yêu cầu của bạn với thông tin sau:</p>
        <div style="background: #f9fafb; padding: 15px; border-radius: 8px; margin: 15px 0;">
          <p style="margin: 5px 0;"><strong>Dịch vụ:</strong> ${fullServiceTitle}</p>
          <p style="margin: 5px 0;"><strong>Ngày hẹn:</strong> ${formData.date}</p>
          <p style="margin: 5px 0;"><strong>Giờ hẹn:</strong> ${formData.time || 'Chưa chọn'}</p>
          <p style="margin: 5px 0;"><strong>Dòng xe:</strong> ${formData.carModel} (${vehicleTypeLabel})</p>
        </div>
        <p>Nhân viên của chúng tôi sẽ liên hệ lại với bạn qua số điện thoại <strong>${formData.phone}</strong> để xác nhận lịch hẹn trong thời gian sớm nhất.</p>
        <p>Trân trọng,<br/>Đội ngũ ${siteConfig.siteName}</p>
      </div>
    `;
    
    try {
      // Gửi email cho Admin
      fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: siteConfig.contactEmail || 'carwash68.vn@gmail.com',
          subject: subject,
          html: adminHtml,
          isBooking: true
        })
      }).catch(err => console.error("Admin email failed", err));

      // Gửi email cho khách hàng nếu có
      if (formData.email) {
        fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: formData.email,
            subject: `[XÁC NHẬN] Đặt lịch thành công tại ${siteConfig.siteName}`,
            html: customerHtml
          })
        }).catch(err => console.error("Customer email failed", err));
      }
      
      // Sync with Admin Appointments
      const newAppointment: Appointment = {
        id: Date.now().toString(),
        customerName: formData.name,
        phone: formData.phone,
        email: formData.email,
        carModel: formData.carModel,
        serviceId: formData.serviceId,
        subServiceTitle: formData.subServiceTitle,
        date: formData.date,
        time: formData.time,
        status: 'pending',
        note: formData.note,
        createdAt: new Date().toISOString(),
        isRead: false
      };
      setSiteConfig(prev => ({
        ...prev,
        appointments: [newAppointment, ...(prev.appointments || [])]
      }));

      if (onAddNotification) {
        onAddNotification({
          title: 'Đặt lịch thành công',
          message: `Lịch hẹn dịch vụ ${fullServiceTitle} vào lúc ${formData.time} ngày ${formData.date} đã được gửi đi.`,
          type: 'success'
        });
      }

      toast.success('Đặt lịch thành công!');
      setIsSubmitted(true);
      
      // Optimization: Save contact for next time
      localStorage.setItem('last_booking_contact', JSON.stringify({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        carModel: formData.carModel,
        vehicleType: formData.vehicleType
      }));
    } catch (error) {
      console.error("Error in submission:", error);
      toast.error('Có lỗi xảy ra, vui lòng thử lại sau');
    } finally {
      setIsSending(false);
    }
  };

  const selectedService = services.find(s => s.id === formData.serviceId);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-slate-900 border border-white/10 p-0 rounded-[40px] shadow-2xl max-w-lg w-full relative overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="p-8 border-b border-white/5 bg-slate-950/50 flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Đặt Lịch Dịch Vụ</h3>
                <div className="flex gap-2 mt-2">
                  {[1, 2, 3].map(i => (
                    <div 
                      key={i} 
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        i === step ? 'w-12 bg-blue-600' : 
                        i < step ? 'w-6 bg-emerald-500' : 'w-6 bg-slate-800'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-xl text-slate-500 hover:text-white transition-all">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-8 overflow-y-auto custom-scrollbar flex-1">
              {!isSubmitted ? (
                <div className="space-y-6">
                  {step === 1 && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-8"
                    >
                      {/* Car Selection */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center text-blue-400">
                            <Car className="w-4 h-4" />
                          </div>
                          <h4 className="text-sm font-bold text-white uppercase tracking-normal">Chọn dòng xe & Dịch vụ</h4>
                        </div>
                        
                        <div className="grid grid-cols-4 gap-2">
                          {[
                            { id: 'mini', label: 'MINI', icon: '🚗' },
                            { id: 'sedan', label: 'SEDAN', icon: '🚘' },
                            { id: 'suv', label: 'SUV', icon: '🚙' },
                            { id: 'supercar', label: 'SUPER', icon: '🏎️' }
                          ].map((type) => (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              key={type.id}
                              type="button"
                              onClick={() => setFormData({...formData, vehicleType: type.id as any})}
                              className={`p-3 rounded-2xl border transition-all text-center flex flex-col items-center gap-1 ${
                                formData.vehicleType === type.id 
                                ? 'bg-blue-600/20 border-blue-500 text-white shadow-lg shadow-blue-500/10' 
                                : 'bg-slate-950/50 border-white/5 text-slate-500 hover:border-white/20'
                              }`}
                            >
                              <span className="text-xl">{type.icon}</span>
                              <span className="text-[8px] font-black uppercase tracking-tight">{type.label}</span>
                            </motion.button>
                          ))}
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider ml-1">Tên xe / Biển số (Không bắt buộc)</label>
                            <input type="text" placeholder="VD: Mercedes S450..." value={formData.carModel} onChange={e => setFormData({...formData, carModel: e.target.value})} className="w-full bg-slate-950/80 border border-white/10 rounded-2xl px-5 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm" />
                          </div>
                          
                          <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider ml-1">Dịch vụ chính</label>
                            <select value={formData.serviceId} onChange={e => setFormData({...formData, serviceId: e.target.value, subServiceTitle: undefined})} className="w-full bg-slate-950/80 border border-white/10 rounded-2xl px-5 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all appearance-none text-sm">
                              {services.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Packages */}
                      {selectedService?.subServices && (
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-emerald-600/20 flex items-center justify-center text-emerald-500">
                              <Zap className="w-4 h-4" />
                            </div>
                            <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Chọn gói nâng cấp</label>
                          </div>
                          <div className="grid grid-cols-1 gap-2">
                            {selectedService.subServices.map((sub, idx) => (
                              <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                key={idx}
                                type="button"
                                onClick={() => setFormData({...formData, subServiceTitle: formData.subServiceTitle === sub.title ? undefined : sub.title})}
                                className={`p-4 rounded-2xl border transition-all text-left flex items-center justify-between group ${
                                  formData.subServiceTitle === sub.title 
                                  ? 'bg-blue-600/10 border-blue-500 text-white' 
                                  : 'bg-slate-950 border-white/5 text-slate-400 hover:border-white/20'
                                }`}
                              >
                                <div>
                                  <p className="font-bold text-sm">{sub.title}</p>
                                  {sub.price && <p className="text-[10px] text-blue-500 font-bold mt-0.5">{sub.price}</p>}
                                </div>
                                <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                                  formData.subServiceTitle === sub.title ? 'bg-blue-500 border-blue-500' : 'border-white/10'
                                }`}>
                                  {formData.subServiceTitle === sub.title && <Check className="w-3 h-3 text-white" />}
                                </div>
                              </motion.button>
                            ))}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6"
                    >
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center text-blue-400">
                            <Calendar className="w-4 h-4" />
                          </div>
                          <h4 className="text-sm font-bold text-white uppercase tracking-normal">Thời gian linh hoạt</h4>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider ml-1">Chọn ngày</label>
                          <div className="grid grid-cols-2 gap-2">
                            {[0, 1, 2, 3].map(offset => {
                              const d = new Date();
                              d.setDate(d.getDate() + offset);
                              const dateStr = d.toISOString().split('T')[0];
                              const label = offset === 0 ? 'Hôm nay' : offset === 1 ? 'Ngày mai' : `Thứ ${d.getDay() === 0 ? 'CN' : d.getDay() + 1}, ${d.getDate()}/${d.getMonth() + 1}`;
                              
                              return (
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  key={dateStr}
                                  type="button"
                                  onClick={() => setFormData({...formData, date: dateStr})}
                                  className={`p-3 rounded-xl border transition-all text-center ${
                                    formData.date === dateStr 
                                    ? 'bg-blue-600 border-blue-500 text-white shadow-lg' 
                                    : 'bg-slate-950/50 border-white/5 text-slate-400 hover:border-white/20'
                                  }`}
                                >
                                  <p className="text-[10px] font-bold uppercase tracking-tight">{label}</p>
                                  <p className="text-[8px] opacity-60 mt-0.5">{dateStr}</p>
                                </motion.button>
                              );
                            })}
                            <div className="col-span-2 relative">
                               <input 
                                 type="date" 
                                 value={formData.date} 
                                 onChange={e => setFormData({...formData, date: e.target.value})}
                                 className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-4 py-2 text-white text-xs outline-none focus:ring-1 focus:ring-blue-500"
                               />
                               <p className="text-[9px] text-slate-500 mt-1 italic">Hoặc chọn ngày khác tùy ý</p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider ml-1">Chọn khung giờ</label>
                            {formData.time && <span className="text-[10px] font-bold text-blue-400 drop-shadow-sm">Đã chọn: {formData.time}</span>}
                          </div>
                          <div className="grid grid-cols-4 gap-2">
                            {timeSlots.map(slot => (
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                key={slot}
                                type="button"
                                onClick={() => setFormData({...formData, time: slot})}
                                className={`py-2 rounded-lg border text-[10px] font-bold transition-all ${
                                  formData.time === slot 
                                  ? 'bg-blue-600 border-blue-500 text-white shadow-md' 
                                  : 'bg-slate-950 border-white/5 text-slate-500 hover:text-slate-300'
                                }`}
                              >
                                {slot}
                              </motion.button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6"
                    >
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-emerald-600/20 flex items-center justify-center text-emerald-500">
                            <Info className="w-4 h-4" />
                          </div>
                          <h4 className="text-sm font-bold text-white uppercase tracking-normal">Xác nhận thông tin & Liên hệ</h4>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <input required type="text" placeholder="Họ và tên..." value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-2xl px-5 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm" />
                          <input 
                            required 
                            type="tel" 
                            placeholder="Số điện thoại..." 
                            value={formData.phone} 
                            onChange={e => setFormData({...formData, phone: e.target.value})} 
                            className={`w-full bg-slate-950 border ${errors.phone ? 'border-red-500' : 'border-white/10'} rounded-2xl px-5 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm`} 
                          />
                        </div>
                        <input type="email" placeholder="Email nhận xác nhận (tùy chọn)..." value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className={`w-full bg-slate-950 border ${errors.email ? 'border-red-500' : 'border-white/10'} rounded-2xl px-5 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm`} />
                        <textarea placeholder="Ghi chú yêu cầu đặc biệt..." value={formData.note} onChange={e => setFormData({...formData, note: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-2xl px-5 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all h-20 resize-none text-sm" />
                      </div>

                      {/* Full Confirmation Card */}
                      <div className="bg-slate-950 border border-white/5 rounded-[32px] overflow-hidden">
                        <div className="bg-white/5 px-6 py-3 border-b border-white/5">
                           <p className="text-[10px] font-black text-blue-400 uppercase tracking-wider drop-shadow-[0_0_5px_rgba(59,130,246,0.3)]">Kiểm tra lại lịch đã chọn</p>
                        </div>
                        <div className="p-6 space-y-4">
                           <div className="flex justify-between items-start">
                              <div>
                                 <p className="text-white font-bold text-base">{selectedService?.title}</p>
                                 {formData.subServiceTitle && <p className="text-blue-400 text-xs font-bold drop-shadow-sm">{formData.subServiceTitle}</p>}
                                 <p className="text-slate-500 text-[10px] uppercase font-bold mt-1 tracking-tight">XE {formData.vehicleType} • {formData.carModel || 'Chưa rõ đời xe'}</p>
                              </div>
                              <div className="text-right">
                                 <div className="flex items-center gap-1 justify-end text-white font-black text-sm">
                                    <Clock className="w-3 h-3 text-blue-400" /> {formData.time}
                                 </div>
                                 <p className="text-slate-500 text-[10px] font-bold">{formData.date}</p>
                              </div>
                           </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-emerald-600/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 text-5xl animate-bounce">✓</div>
                  <h3 className="text-3xl font-black uppercase tracking-tighter mb-4">Đặt lịch thành công!</h3>
                  <p className="text-slate-400 mb-10 text-lg">Yêu cầu của bạn đã được gửi tới hệ thống. Đội ngũ chuyên gia sẽ liên hệ lại với bạn trong thời gian sớm nhất qua số điện thoại <strong>{formData.phone}</strong>.</p>
                  
                  <div className="flex flex-col gap-4">
                    {siteConfig.momoInfo && (
                      <div className="bg-pink-600/10 border border-pink-500/20 rounded-[32px] p-6 space-y-4 mb-4 text-left">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-pink-600 flex items-center justify-center text-white">
                            <CreditCard className="w-4 h-4" />
                          </div>
                          <h4 className="text-sm font-black text-white uppercase tracking-tighter">Thanh toán đặt cọc qua MoMo</h4>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-pink-500 text-[9px] font-black uppercase tracking-widest mb-1">Số MoMo</p>
                            <p className="text-white font-black text-sm">{siteConfig.momoInfo.phone}</p>
                          </div>
                          <div>
                            <p className="text-pink-500 text-[9px] font-black uppercase tracking-widest mb-1">Người nhận</p>
                            <p className="text-white font-bold text-sm">{siteConfig.momoInfo.name}</p>
                          </div>
                        </div>
                        <div className="flex justify-center">
                          <div className="bg-white p-2 rounded-2xl shadow-inner inline-block">
                            <img 
                              src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://nhantien.momo.vn/${siteConfig.momoInfo.phone}`}
                              alt="MoMo QR"
                              className="w-20 h-20"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <button 
                            onClick={() => {
                              navigator.clipboard.writeText(siteConfig.momoInfo?.phone || '');
                              toast.success('Đã sao chép số MoMo');
                            }}
                            className="py-3 bg-pink-600 hover:bg-pink-500 text-white rounded-xl font-black uppercase tracking-widest text-[9px] transition-all shadow-lg shadow-pink-600/20"
                          >
                            Sao chép SĐT
                          </button>
                          <a 
                            href={`https://nhantien.momo.vn/${siteConfig.momoInfo.phone}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="py-3 bg-slate-800 hover:bg-slate-700 text-white border border-white/5 rounded-xl font-black uppercase tracking-widest text-[9px] transition-all text-center flex items-center justify-center gap-2"
                          >
                            <CreditCard className="w-3 h-3" /> Mở MoMo
                          </a>
                        </div>
                      </div>
                    )}
                    <div className="grid grid-cols-2 gap-4">
                      <button 
                        onClick={() => {
                          onClose();
                          scrollToSection('tracking');
                        }}
                        className="w-full py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all border border-white/5 flex items-center justify-center gap-2"
                      >
                        <Timer className="w-4 h-4" /> Theo Dõi Xe
                      </button>
                      <button 
                        onClick={onClose}
                        className="w-full py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all border border-white/5"
                      >
                        Đóng
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Actions */}
            {!isSubmitted && (
              <div className="p-8 border-t border-white/5 bg-slate-950/50 flex gap-4">
                {step > 1 && (
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={prevStep}
                    className="flex-1 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all border border-white/5"
                  >
                    Quay lại
                  </motion.button>
                )}
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={step === 3 ? handleSubmit : nextStep}
                  disabled={isSending}
                  className="flex-[2] py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all shadow-lg shadow-blue-600/20 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSending ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      {step === 3 ? 'Xác nhận đặt ngay' : 'Tiếp theo'}
                      <CheckCircle2 className="w-4 h-4" />
                    </>
                  )}
                </motion.button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;
