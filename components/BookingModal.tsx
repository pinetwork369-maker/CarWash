import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, User, Zap, Clock, CheckCircle2, Info, CreditCard, Timer, Check, Calendar, Car, ChevronRight, ArrowRight, Upload, AlertCircle, Loader2, Edit2 } from 'lucide-react';
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
  const [currentAppointmentId, setCurrentAppointmentId] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ phone?: string; email?: string }>({});
  const [formData, setFormData] = useState<BookingData>({
    name: initialName, 
    phone: initialPhone, 
    email: '', 
    vehicleType: 'sedan', 
    carModel: '', 
    serviceId: services[0]?.id || '', 
    subServiceTitle: preSelectedSubService, 
    date: new Date().toISOString().split('T')[0], 
    time: '', 
    note: ''
  });

  useEffect(() => {
    if (isOpen) {
      setIsSubmitted(false);
      setCurrentAppointmentId(null);
      setStep(1);
    }
  }, [isOpen]);

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
          
          if (preSelectedSubService && parsed.phone && parsed.carModel) {
            setStep(2);
          }
        } catch (e) {
          console.error("Failed to parse saved contact", e);
        }
      }
    }
  }, [isOpen, preSelectedSubService, initialName, initialPhone, isSubmitted]);

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
    if (step === 2) {
      const isOverlapped = (siteConfig.appointments || []).some(
        app => app.date === formData.date && app.time === formData.time && app.id !== currentAppointmentId && app.status !== 'cancelled'
      );
      if (isOverlapped) {
        toast.error('⚠️ Khung giờ này đã bị trùng lặp với một lịch hẹn khác. Vui lòng chọn khung giờ khác!');
        return;
      }
    }
    if (validateStep(step)) {
      setStep(prev => prev + 1);
    } else {
      toast.error('Vui lòng điền đầy đủ thông tin hợp lệ');
    }
  };

  const prevStep = () => setStep(prev => prev - 1);

  const handleSubmit = async () => {
    if (!validateStep(3)) return;
    
    // Kiểm tra trùng lặp một lần cuối trước khi lưu
    const isOverlapped = (siteConfig.appointments || []).some(
      app => app.date === formData.date && app.time === formData.time && app.id !== currentAppointmentId && app.status !== 'cancelled'
    );
    if (isOverlapped) {
      toast.error('⚠️ Trùng lịch hẹn! Thời gian này đã được đặt trước bởi một khách hàng khác.');
      setStep(2);
      return;
    }

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
      await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: siteConfig.contactEmail || 'carwash68.vn@gmail.com',
          subject: subject,
          html: adminHtml,
          isBooking: true
        })
      });

      if (formData.email) {
        await fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: formData.email,
            subject: `[XÁC NHẬN] Đặt lịch thành công tại ${siteConfig.siteName}`,
            html: customerHtml
          })
        });
      }
      
      const appointmentId = currentAppointmentId || Date.now().toString();
      
      const newAppointment: Appointment = {
        id: appointmentId,
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
      
      setSiteConfig(prev => {
        const existingApps = prev.appointments || [];
        const hasExisting = existingApps.some(a => a.id === appointmentId);
        
        let updatedApps;
        if (hasExisting) {
          updatedApps = existingApps.map(a => a.id === appointmentId ? newAppointment : a);
        } else {
          updatedApps = [newAppointment, ...existingApps];
        }
        
        return {
          ...prev,
          appointments: updatedApps
        };
      });

      if (onAddNotification) {
        onAddNotification({
          title: currentAppointmentId ? 'Cập nhật lịch hẹn thành công' : 'Đặt lịch thành công',
          message: `Lịch hẹn dịch vụ ${fullServiceTitle} vào lúc ${formData.time} ngày ${formData.date} đã được ${currentAppointmentId ? 'cập nhật' : 'gửi đi'}.`,
          type: 'success'
        });
      }

      toast.success(currentAppointmentId ? 'Cập nhật lịch hẹn thành công!' : 'Đặt lịch thành công!');
      setCurrentAppointmentId(appointmentId);
      setIsSubmitted(true);
      
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
        <div className="fixed inset-0 z-[400] overflow-hidden">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950 px-4" 
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="relative h-full w-full bg-slate-950 flex flex-col"
          >
            {/* Header */}
            <div className="sticky top-0 z-50 p-6 sm:p-10 border-b border-white/5 bg-slate-950/80 backdrop-blur-2xl flex justify-between items-center group">
              <div className="flex items-center gap-6">
                <button 
                  onClick={onClose} 
                  className="w-12 h-12 rounded-2xl bg-white/5 hover:bg-blue-600 flex items-center justify-center text-slate-400 hover:text-white transition-all active:scale-90 shadow-xl shadow-blue-900/0 hover:shadow-blue-900/40"
                >
                  <X className="w-6 h-6" />
                </button>
                <div className="flex flex-col">
                  <h3 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tighter leading-tight">Đặt Lịch Dịch Vụ</h3>
                  {!isSubmitted && (
                    <div className="flex gap-2 mt-2">
                      {[1, 2, 3].map(i => (
                        <div 
                          key={i} 
                          className={`h-1.5 rounded-full transition-all duration-500 ${
                            i === step ? 'w-12 bg-blue-600' : 
                            i < step ? 'w-6 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]' : 'w-6 bg-slate-800'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="hidden sm:block">
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em]">Easy Booking Flow</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar">
              <div className="container mx-auto max-w-4xl px-4 py-12 sm:py-24">
                {!isSubmitted ? (
                  <div className="space-y-12">
                    {step === 1 && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="space-y-12"
                      >
                        {/* Car Selection */}
                        <div className="space-y-8">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-500 border border-blue-500/20">
                              <Car className="w-6 h-6" />
                            </div>
                            <div>
                              <h4 className="text-xl font-black text-white uppercase tracking-tight">Cá nhân hóa theo xe của bạn</h4>
                              <p className="text-slate-500 text-sm">Chọn dòng xe để chúng tôi chuẩn bị giải pháp tối ưu nhất</p>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {[
                              { id: 'mini', label: 'HATCHBACK/MINI', icon: '🚗' },
                              { id: 'sedan', label: 'SEDAN/COUPE', icon: '🚘' },
                              { id: 'suv', label: 'SUV/CROSSOVER', icon: '🚙' },
                              { id: 'supercar', label: 'LUXURY/SUPER', icon: '🏎️' }
                            ].map((type) => (
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                key={type.id}
                                type="button"
                                onClick={() => setFormData({...formData, vehicleType: type.id as any})}
                                className={`p-8 rounded-[32px] border transition-all text-center flex flex-col items-center gap-4 relative overflow-hidden group ${
                                  formData.vehicleType === type.id 
                                  ? 'bg-blue-600/20 border-blue-500 text-white shadow-2xl shadow-blue-500/10' 
                                  : 'bg-white/[0.02] border-white/10 text-slate-500 hover:border-white/30 hover:bg-white/[0.05]'
                                }`}
                              >
                                <div className={`text-4xl transition-transform duration-500 ${formData.vehicleType === type.id ? 'scale-125 rotate-6' : 'group-hover:scale-110'}`}>
                                  {type.icon}
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest">{type.label}</span>
                                {formData.vehicleType === type.id && (
                                  <div className="absolute top-2 right-2">
                                     <CheckCircle2 className="w-4 h-4 text-blue-500" />
                                  </div>
                                )}
                              </motion.button>
                            ))}
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            <div className="space-y-3">
                              <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] ml-1">Đời xe / Biển số</label>
                              <input type="text" placeholder="VD: Mercedes S450 - 30K-123.45" value={formData.carModel} onChange={e => setFormData({...formData, carModel: e.target.value})} className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-base placeholder:text-slate-700" />
                            </div>
                            
                            <div className="space-y-3">
                              <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] ml-1">Gói dịch vụ chính</label>
                              <div className="relative">
                                <select value={formData.serviceId} onChange={e => setFormData({...formData, serviceId: e.target.value, subServiceTitle: undefined})} className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all appearance-none text-base">
                                  {services.map(s => <option key={s.id} value={s.id} className="bg-slate-900">{s.title}</option>)}
                                </select>
                                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                                   ▼
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Sub Services */}
                        {selectedService?.subServices && (
                          <div className="space-y-6">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-2xl bg-amber-600/10 flex items-center justify-center text-amber-500 border border-amber-500/20">
                                <Zap className="w-6 h-6" />
                              </div>
                              <div>
                                <h4 className="text-xl font-black text-white uppercase tracking-tight">Chi tiết gói cụ thể</h4>
                                <p className="text-slate-500 text-sm">Nâng cấp trải nghiệm với các gói chuyên sâu</p>
                              </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {selectedService.subServices.map((sub, idx) => (
                                <motion.button
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  key={idx}
                                  type="button"
                                  onClick={() => setFormData({...formData, subServiceTitle: formData.subServiceTitle === sub.title ? undefined : sub.title})}
                                  className={`p-6 rounded-3xl border transition-all text-left flex items-center justify-between group h-full ${
                                    formData.subServiceTitle === sub.title 
                                    ? 'bg-blue-600/10 border-blue-500 text-white shadow-xl shadow-blue-900/10' 
                                    : 'bg-white/[0.02] border-white/10 text-slate-400 hover:border-white/30'
                                  }`}
                                >
                                  <div>
                                    <p className="font-black text-sm uppercase tracking-tight group-hover:text-white transition-colors">{sub.title}</p>
                                    {sub.price && <p className="text-xs text-blue-500 font-bold mt-1 uppercase tracking-widest">{sub.price}</p>}
                                  </div>
                                  <div className={`w-8 h-8 rounded-2xl border flex items-center justify-center transition-all ${
                                    formData.subServiceTitle === sub.title ? 'bg-blue-500 border-blue-500 shadow-lg shadow-blue-500/40' : 'border-white/10'
                                  }`}>
                                    {formData.subServiceTitle === sub.title && <Check className="w-4 h-4 text-white" />}
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
                        className="space-y-12"
                      >
                        <div className="space-y-8">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-500 border border-blue-500/20">
                              <Calendar className="w-6 h-6" />
                            </div>
                            <div>
                              <h4 className="text-xl font-black text-white uppercase tracking-tight">Thời gian vàng cho xe</h4>
                              <p className="text-slate-500 text-sm">Chúng tôi sẽ dành trọn không gian cho xe của bạn theo lịch này</p>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em] ml-1">Chọn ngày phù hợp</label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
                                    className={`p-6 rounded-[28px] border transition-all text-center flex flex-col gap-1 ${
                                      formData.date === dateStr 
                                      ? 'bg-blue-600 border-blue-500 text-white shadow-2xl shadow-blue-500/40' 
                                      : 'bg-white/[0.02] border-white/10 text-slate-400 hover:border-white/30'
                                    }`}
                                  >
                                    <p className="text-xs font-black uppercase tracking-widest">{label}</p>
                                    <p className="text-[10px] opacity-60 font-mono mt-1">{dateStr}</p>
                                  </motion.button>
                                );
                              })}
                            </div>
                            <div className="relative mt-4">
                               <input 
                                 type="date" 
                                 value={formData.date} 
                                 onChange={e => setFormData({...formData, date: e.target.value})}
                                 className="w-full bg-white/[0.02] border border-white/5 rounded-2xl px-6 py-4 text-white text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                               />
                               <p className="text-[11px] text-slate-600 mt-2 italic font-medium">Hoặc chủ động chọn ngày khác trong tương lai</p>
                            </div>
                          </div>

                          <div className="space-y-6 pt-8">
                            <div className="flex items-center justify-between">
                              <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em] ml-1">Khung giờ đặt chỗ</label>
                              {formData.time && <span className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest animate-pulse shadow-lg shadow-blue-600/20">Giờ đã chọn: {formData.time}</span>}
                            </div>
                            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                              {timeSlots.map(slot => {
                                const isBooked = (siteConfig.appointments || []).some(
                                  app => app.date === formData.date && app.time === slot && app.id !== currentAppointmentId && app.status !== 'cancelled'
                                );
                                return (
                                  <motion.button
                                    whileHover={isBooked ? {} : { scale: 1.05 }}
                                    whileTap={isBooked ? {} : { scale: 0.95 }}
                                    key={slot}
                                    type="button"
                                    disabled={isBooked}
                                    onClick={() => setFormData({...formData, time: slot})}
                                    className={`py-3.5 rounded-2xl border text-xs font-black transition-all flex flex-col items-center justify-center min-h-[58px] ${
                                      isBooked
                                      ? 'bg-red-950/20 border-red-500/20 text-red-500/50 cursor-not-allowed opacity-60'
                                      : formData.time === slot 
                                      ? 'bg-blue-600 border-blue-500 text-white shadow-xl shadow-blue-600/30' 
                                      : 'bg-white/[0.02] border-white/10 text-slate-400 hover:text-white hover:border-white/30'
                                    }`}
                                  >
                                    <span className="leading-none">{slot}</span>
                                    {isBooked && (
                                      <span className="text-[7.5px] font-extrabold text-red-500 mt-1 uppercase tracking-wide leading-none">Đã Đặt</span>
                                    )}
                                  </motion.button>
                                );
                              })}
                            </div>
                            {(() => {
                              const isOverlapped = formData.time && (siteConfig.appointments || []).some(
                                app => app.date === formData.date && app.time === formData.time && app.id !== currentAppointmentId && app.status !== 'cancelled'
                              );
                              if (isOverlapped) {
                                return (
                                  <div className="mt-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-500 text-xs flex items-center gap-3">
                                    <AlertCircle className="w-5 h-5 shrink-0" />
                                    <span>⚠️ Cảnh báo: Khung giờ {formData.time} ngày {formData.date} đã bị trùng lặp với lịch hẹn khác! Vui lòng chọn khung giờ khác.</span>
                                  </div>
                                );
                              }
                              return null;
                            })()}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {step === 3 && (
                      <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-12"
                      >
                        <div className="space-y-8">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-600/10 flex items-center justify-center text-emerald-500 border border-emerald-500/20">
                              <User className="w-6 h-6" />
                            </div>
                            <div>
                              <h4 className="text-xl font-black text-white uppercase tracking-tight">Thông tin định danh khách hàng</h4>
                              <p className="text-slate-500 text-sm">Để chúng tôi gửi lời mời và mã xác nhận riêng biệt</p>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                               <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">Tên anh / chị</label>
                               <input required type="text" placeholder="VD: Anh Minh..." value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-base placeholder:text-slate-700" />
                            </div>
                            <div className="space-y-2">
                               <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">Số điện thoại liên hệ</label>
                               <input 
                                 required 
                                 type="tel" 
                                 placeholder="Số di động của bạn..." 
                                 value={formData.phone} 
                                 onChange={e => setFormData({...formData, phone: e.target.value})} 
                                 className={`w-full bg-white/[0.03] border ${errors.phone ? 'border-red-500' : 'border-white/10'} rounded-2xl px-6 py-4 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-base placeholder:text-slate-700`} 
                               />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                             <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">Địa chỉ Email (Nhận hóa đơn điện tử)</label>
                             <input type="email" placeholder="VD: khachhang@gmail.com..." value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className={`w-full bg-white/[0.03] border ${errors.email ? 'border-red-500' : 'border-white/10'} rounded-2xl px-6 py-4 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-base placeholder:text-slate-700`} />
                          </div>

                          <div className="space-y-2">
                             <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">Lời nhắn / Yêu cầu riêng cho quản lý xưởng</label>
                             <textarea placeholder="VD: Hãy kiểm tra kỹ giúp tôi phần vỏ cửa lái..." value={formData.note} onChange={e => setFormData({...formData, note: e.target.value})} className="w-full bg-white/[0.03] border border-white/10 rounded-3xl px-6 py-4 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all h-32 resize-none text-base placeholder:text-slate-700" />
                          </div>
                        </div>

                        {/* Summary View */}
                        <div className="p-4 sm:p-8 bg-white/[0.02] border border-white/10 rounded-[32px] sm:rounded-[48px] relative overflow-hidden shadow-2xl">
                           <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/5 blur-[80px] rounded-full"></div>
                           <div className="relative z-10 flex flex-col sm:flex-row justify-between items-center gap-6 sm:gap-8">
                             <div className="text-center sm:text-left">
                                <p className="text-[9px] sm:text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] mb-3">Tổng quan lịch hẹn</p>
                                <h4 className="text-xl sm:text-3xl font-black text-white uppercase tracking-tighter mb-2">{selectedService?.title}</h4>
                                {formData.subServiceTitle && <p className="text-[10px] sm:text-xs text-blue-400 font-bold uppercase tracking-widest mb-4">Gói: {formData.subServiceTitle}</p>}
                                <div className="flex flex-wrap justify-center sm:justify-start gap-4">
                                   <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/5">
                                      <Clock className="w-3 h-3 text-slate-400" />
                                      <span className="text-[9px] sm:text-[10px] text-slate-300 font-black tracking-widest uppercase">{formData.time} • {formData.date}</span>
                                   </div>
                                   <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/5">
                                      <Car className="w-3 h-3 text-slate-400" />
                                      <span className="text-[9px] sm:text-[10px] text-slate-300 font-black tracking-widest uppercase">{formData.carModel || 'XE ' + formData.vehicleType.toUpperCase()}</span>
                                   </div>
                                </div>
                             </div>
                             <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-emerald-500/20 flex items-center justify-center relative">
                                <div className="absolute inset-0 border-4 border-emerald-500 border-t-transparent rounded-full animate-[spin_3s_linear_infinite]"></div>
                                <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-500" />
                             </div>
                           </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Footer Nav */}
                    <div className="pt-8 sm:pt-12 flex gap-3 sm:gap-4">
                      {step > 1 && (
                        <motion.button 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={prevStep}
                          className="px-6 py-4 sm:px-10 sm:py-6 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white rounded-[24px] sm:rounded-[32px] font-black uppercase tracking-widest text-[9px] sm:text-[11px] transition-all border border-white/5 active:scale-90"
                        >
                          Quay lại
                        </motion.button>
                      )}
                      <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={step === 3 ? handleSubmit : nextStep}
                        disabled={isSending}
                        className="flex-1 py-4 sm:py-6 bg-blue-600 hover:bg-blue-500 text-white rounded-[24px] sm:rounded-[32px] font-black uppercase tracking-widest text-[9px] sm:text-[11px] transition-all shadow-2xl shadow-blue-900/40 disabled:opacity-50 flex items-center justify-center gap-4 group active:scale-[0.98]"
                      >
                        {isSending ? (
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <>
                            <span>{step === 3 ? 'Xác nhận đặt ngay' : 'Tiếp tục bước ' + (step + 1)}</span>
                            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-2 transition-all transition-transform" />
                          </>
                        )}
                      </motion.button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-20 max-w-2xl mx-auto space-y-12">
                    <div className="relative inline-block">
                       <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full scale-150 animate-pulse"></div>
                       <div className="w-32 h-32 bg-emerald-600/20 text-emerald-500 rounded-[40px] flex items-center justify-center mx-auto text-6xl relative z-10 border border-emerald-500/30">
                          ✓
                       </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter text-white">Lịch đã được gửi!</h3>
                      <p className="text-slate-400 text-lg leading-relaxed font-medium">Yêu cầu của bạn đang được điều phối viên xử lý. Chúng tôi sẽ gọi lại cho bạn qua số <strong>{formData.phone}</strong> trong vòng 15-30 phút tới để xác nhận.</p>
                    </div>
                    
                    {siteConfig.momoInfo && (
                      <div className="bg-white/[0.03] border border-white/5 rounded-[48px] p-8 sm:p-12 space-y-8 text-left shadow-3xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-pink-600/5 blur-[100px] rounded-full group-hover:bg-pink-600/10 transition-colors"></div>
                        <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10">
                          <div className="w-16 h-16 rounded-[24px] bg-pink-600 flex items-center justify-center text-white shadow-xl shadow-pink-600/30 group-hover:rotate-12 transition-transform">
                            <CreditCard className="w-8 h-8" />
                          </div>
                          <div>
                            <h4 className="text-xl font-black text-white uppercase tracking-tight">Thanh toán cọc qua MoMo</h4>
                            <p className="text-slate-500 text-sm">Để được ưu tiên giữ chỗ và nhận thêm voucher quà tặng</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center bg-black/40 rounded-[32px] p-8 relative z-10">
                          <div className="space-y-6 text-center sm:text-left">
                            <div>
                              <p className="text-pink-500 text-[10px] font-black uppercase tracking-widest mb-2">Thông tin tài khoản</p>
                              <p className="text-2xl font-black text-white leading-none">{siteConfig.momoInfo.phone}</p>
                              <p className="text-slate-400 font-bold mt-2 uppercase text-xs tracking-tight">{siteConfig.momoInfo.name}</p>
                            </div>
                            <button 
                              onClick={() => {
                                navigator.clipboard.writeText(siteConfig.momoInfo?.phone || '');
                                toast.success('Đã sao chép số MoMo');
                              }}
                              className="w-full sm:w-auto px-8 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-black uppercase tracking-widest text-[9px] transition-all border border-white/10"
                            >
                              Sao chép SĐT
                            </button>
                          </div>
                          <div className="flex justify-center flex-col items-center gap-3">
                             <div className="bg-white p-3 rounded-3xl shadow-2xl relative">
                               <img 
                                 src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https://nhantien.momo.vn/${siteConfig.momoInfo.phone}`}
                                 alt="MoMo QR"
                                 className="w-32 h-32 sm:w-40 sm:h-40"
                                 referrerPolicy="no-referrer"
                               />
                             </div>
                             <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Quét để thanh toán nhanh</p>
                          </div>
                        </div>
                        
                        <a 
                          href={`https://nhantien.momo.vn/${siteConfig.momoInfo.phone}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-6 bg-pink-600 hover:bg-pink-500 text-white rounded-3xl font-black uppercase tracking-widest text-xs transition-all text-center flex items-center justify-center gap-4 relative z-10 shadow-xl shadow-pink-900/40 active:scale-95"
                        >
                          <CreditCard className="w-5 h-5" /> Mở Ứng Dụng MoMo Ngay
                        </a>
                      </div>
                    )}

                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col sm:flex-row gap-4">
                        <button 
                          onClick={() => {
                            setIsSubmitted(false);
                            setStep(2); // Retain data, go back to Step 2 for reschedule/edit info
                          }}
                          className="flex-1 py-6 bg-amber-600/20 hover:bg-amber-600 text-amber-300 hover:text-white rounded-3xl font-black uppercase tracking-widest text-[10px] transition-all border border-amber-500/25 flex items-center justify-center gap-3 active:scale-95"
                        >
                          <Edit2 className="w-5 h-5" /> Sửa thông tin lịch vừa đặt
                        </button>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <button 
                          onClick={() => {
                            onClose();
                            scrollToSection('tracking');
                          }}
                          className="flex-1 py-6 bg-white/5 hover:bg-white/10 text-white rounded-3xl font-black uppercase tracking-widest text-[10px] transition-all border border-white/5 flex items-center justify-center gap-3 active:scale-95"
                        >
                          <Timer className="w-5 h-5 text-blue-500" /> Theo Dõi Trạng Thái Xe
                        </button>
                        <button 
                          onClick={onClose}
                          className="flex-1 py-6 bg-blue-600 hover:bg-blue-500 text-white rounded-3xl font-black uppercase tracking-widest text-[10px] transition-all shadow-xl active:scale-95"
                        >
                          Quay về trang chủ
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;
