import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Car, Clock, CheckCircle2, Circle, Timer, User, ShieldCheck, ChevronRight, Phone, Briefcase, DollarSign, Info, MessageSquare } from 'lucide-react';
import { VehicleTracking, TrackingStep } from './types';

interface TrackingSectionProps {
  trackingData: VehicleTracking[];
}

export const TrackingSection: React.FC<TrackingSectionProps> = ({ trackingData }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleTracking | null>(null);

  const filteredData = trackingData.filter(item => 
    item.licensePlate.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.customerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-emerald-500';
      case 'in-progress': return 'text-blue-500';
      default: return 'text-slate-500';
    }
  };

  const getVehicleStatusBadge = (status: string) => {
    switch (status) {
      case 'ready': return <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase rounded-full border border-emerald-500/20">Sẵn sàng</span>;
      case 'working': return <span className="px-2 py-0.5 bg-blue-500/10 text-blue-500 text-[10px] font-black uppercase rounded-full border border-blue-500/20">Đang xử lý</span>;
      default: return <span className="px-2 py-0.5 bg-slate-500/10 text-slate-500 text-[10px] font-black uppercase rounded-full border border-slate-500/20">Đang chờ</span>;
    }
  };

  return (
    <section id="tracking" className="py-24 bg-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-600/20 rounded-full blur-[120px]" />
        <div className="absolute top-[30%] left-[20%] w-[300px] h-[300px] bg-purple-600/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em]">Hệ thống theo dõi trực tuyến</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter mb-8 leading-[0.9]"
            >
              Kiểm Tra <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-emerald-500 to-blue-500 bg-[length:200%_auto] animate-gradient">Tiến Độ</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-slate-400 max-w-2xl mx-auto font-medium text-lg"
            >
              Minh bạch trong từng công đoạn. Nhập biển số xe của bạn để xem quy trình chăm sóc đang diễn ra như thế nào.
            </motion.p>
          </div>

          {/* Quick Stats Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { label: 'Đang xử lý', count: trackingData.filter(v => v.status === 'working').length, icon: Timer, color: 'text-blue-500' },
              { label: 'Sẵn sàng bàn giao', count: trackingData.filter(v => v.status === 'ready').length, icon: CheckCircle2, color: 'text-emerald-500' },
              { label: 'Đang chờ', count: trackingData.filter(v => v.status === 'waiting').length, icon: Clock, color: 'text-slate-500' },
              { label: 'Tổng số xe', count: trackingData.length, icon: Car, color: 'text-white' },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + idx * 0.1 }}
                className="bg-slate-900/40 border border-white/5 rounded-2xl p-4 flex items-center gap-4"
              >
                <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</p>
                  <p className="text-xl font-black text-white leading-none mt-1">{stat.count}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative mb-16 group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-[36px] blur opacity-20 group-focus-within:opacity-40 transition-opacity" />
            <div className="relative">
              <div className="absolute inset-y-0 left-8 flex items-center pointer-events-none">
                <Search className="w-6 h-6 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Nhập biển số xe của bạn (VD: 30A-123.45)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-[32px] py-8 pl-20 pr-8 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 transition-all text-xl font-black uppercase tracking-widest"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:block">
                <div className="px-6 py-3 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-blue-600/20">
                  Tìm kiếm ngay
                </div>
              </div>
            </div>
          </div>

          {/* Results Area */}
          <div className="space-y-6">
            <AnimatePresence mode="popLayout">
              {searchQuery && filteredData.length > 0 ? (
                filteredData.map((vehicle) => (
                  <motion.div
                    key={vehicle.id}
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    onClick={() => setSelectedVehicle(vehicle)}
                    className="group bg-slate-900/40 border border-white/5 hover:border-blue-500/30 rounded-[32px] p-8 cursor-pointer transition-all relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-[60px] group-hover:bg-blue-500/10 transition-colors" />
                    
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
                      <div className="flex items-center gap-8">
                        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-500/20 to-emerald-500/20 flex items-center justify-center border border-white/10 group-hover:scale-105 transition-transform shadow-inner">
                          <Car className="w-10 h-10 text-white" />
                        </div>
                        <div>
                          <div className="flex items-center gap-4 mb-2">
                            <h3 className="text-3xl font-black text-white tracking-tighter uppercase">{vehicle.licensePlate}</h3>
                            {getVehicleStatusBadge(vehicle.status)}
                          </div>
                          <div className="flex items-center gap-3">
                            <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">{vehicle.carModel}</p>
                            <span className="w-1 h-1 bg-slate-700 rounded-full" />
                            <p className="text-blue-500 font-black text-[10px] uppercase tracking-widest">{vehicle.serviceType}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col md:items-end gap-4">
                        <div className="text-left md:text-right">
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Tiến độ hiện tại</p>
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                            <p className="text-white font-black uppercase text-sm tracking-tight">{vehicle.steps[vehicle.currentStepIndex]?.name}</p>
                          </div>
                        </div>
                        
                        <div className="w-full md:w-48 h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${((vehicle.currentStepIndex + 1) / vehicle.steps.length) * 100}%` }}
                            className="h-full bg-gradient-to-r from-blue-500 to-emerald-500"
                          />
                        </div>
                      </div>

                      <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-blue-600 transition-all group-hover:translate-x-2">
                        <ChevronRight className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : searchQuery ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20 bg-slate-900/20 rounded-[40px] border border-dashed border-white/10"
                >
                  <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6">
                    <Search className="w-8 h-8 text-slate-600" />
                  </div>
                  <h4 className="text-white font-black uppercase tracking-widest mb-2">Không tìm thấy xe</h4>
                  <p className="text-slate-500 font-medium">Vui lòng kiểm tra lại biển số xe bạn đã nhập.</p>
                </motion.div>
              ) : (
                <div className="text-center py-20 opacity-20 grayscale">
                   <div className="w-24 h-24 rounded-[40px] bg-white/5 flex items-center justify-center mx-auto mb-8 border border-white/10">
                    <Car className="w-12 h-12 text-white" />
                  </div>
                  <p className="text-white font-black uppercase tracking-[0.3em] text-xs">Nhập biển số để bắt đầu theo dõi</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedVehicle && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedVehicle(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-slate-900 border border-white/10 rounded-[40px] overflow-hidden shadow-2xl"
            >
              {/* Modal Header */}
              <div className="p-8 border-bottom border-white/5 bg-gradient-to-b from-white/5 to-transparent">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-4xl font-black text-white tracking-tighter">{selectedVehicle.licensePlate}</h4>
                      {getVehicleStatusBadge(selectedVehicle.status)}
                    </div>
                    <div className="flex items-center gap-3">
                      <p className="text-blue-500 font-black uppercase tracking-widest text-xs">{selectedVehicle.carModel}</p>
                      <span className="w-1 h-1 bg-slate-700 rounded-full" />
                      <p className="text-emerald-500 font-black uppercase tracking-widest text-xs">{selectedVehicle.serviceType || 'Dịch vụ Detailing'}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedVehicle(null)}
                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 text-white rotate-90" />
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                    <div className="flex items-center gap-2 mb-2">
                      <User className="w-3 h-3 text-slate-500" />
                      <span className="text-[10px] font-black text-slate-500 uppercase">Khách hàng</span>
                    </div>
                    <p className="text-white font-bold text-sm">{selectedVehicle.customerName}</p>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                    <div className="flex items-center gap-2 mb-2">
                      <Briefcase className="w-3 h-3 text-slate-500" />
                      <span className="text-[10px] font-black text-slate-500 uppercase">KTV Phụ trách</span>
                    </div>
                    <p className="text-white font-bold text-sm">{selectedVehicle.technicianName || 'Đang cập nhật'}</p>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-3 h-3 text-slate-500" />
                      <span className="text-[10px] font-black text-slate-500 uppercase">Dự kiến xong</span>
                    </div>
                    <p className="text-white font-bold text-sm">
                      {new Date(selectedVehicle.estimatedEndTime).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="w-3 h-3 text-slate-500" />
                      <span className="text-[10px] font-black text-slate-500 uppercase">Tổng chi phí</span>
                    </div>
                    <p className="text-white font-bold text-sm">{selectedVehicle.totalAmount?.toLocaleString('vi-VN')}đ</p>
                  </div>
                </div>
              </div>

              {/* Progress Steps */}
              <div className="p-8 max-h-[50vh] overflow-y-auto custom-scrollbar bg-slate-950/30">
                <div className="space-y-12 relative">
                  {/* Vertical Line with Gradient */}
                  <div className="absolute left-[19px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-blue-500 via-emerald-500 to-slate-800" />

                  {selectedVehicle.steps.map((step, index) => (
                    <div key={step.id} className="relative flex gap-8 group/step">
                      <div className={`relative z-10 w-10 h-10 rounded-2xl flex items-center justify-center border-2 transition-all duration-500 ${
                        step.status === 'completed' ? 'bg-emerald-500 border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3)]' :
                        step.status === 'in-progress' ? 'bg-blue-600 border-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.4)] animate-pulse' :
                        'bg-slate-900 border-slate-800'
                      }`}>
                        {step.status === 'completed' ? (
                          <CheckCircle2 className="w-6 h-6 text-white" />
                        ) : step.status === 'in-progress' ? (
                          <Timer className="w-6 h-6 text-white" />
                        ) : (
                          <div className="w-2 h-2 rounded-full bg-slate-700" />
                        )}
                      </div>
                      
                      <div className="flex-1 pt-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h5 className={`text-lg font-black uppercase tracking-tight transition-colors ${
                              step.status === 'completed' ? 'text-white' :
                              step.status === 'in-progress' ? 'text-blue-400' :
                              'text-slate-600'
                            }`}>{step.name}</h5>
                            {step.timestamp && (
                              <div className="flex items-center gap-2 mt-1">
                                <Clock className="w-3 h-3 text-slate-500" />
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                  Hoàn thành lúc: {new Date(step.timestamp).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                                </span>
                              </div>
                            )}
                          </div>
                          {step.status === 'in-progress' && (
                            <span className="px-3 py-1 bg-blue-500/10 text-blue-500 text-[8px] font-black uppercase tracking-widest rounded-full border border-blue-500/20">
                              Đang thực hiện
                            </span>
                          )}
                        </div>
                        
                        {(step.note || step.technician) && (
                          <div className={`mt-3 p-4 rounded-2xl border transition-all ${
                            step.status === 'completed' ? 'bg-white/5 border-white/5' :
                            step.status === 'in-progress' ? 'bg-blue-500/5 border-blue-500/10' :
                            'bg-transparent border-transparent'
                          }`}>
                            {step.note && (
                              <div className="flex items-start gap-3 mb-2">
                                <MessageSquare className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                                <p className="text-xs text-slate-400 font-medium leading-relaxed">{step.note}</p>
                              </div>
                            )}
                            {step.technician && (
                              <div className="flex items-center gap-3">
                                <div className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center">
                                  <User className="w-3 h-3 text-slate-400" />
                                </div>
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                                  Kỹ thuật viên: <span className="text-slate-300">{step.technician}</span>
                                </p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="p-8 bg-white/5 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Dữ liệu được bảo mật & cập nhật liên tục</span>
                </div>
                <button 
                  onClick={() => setSelectedVehicle(null)}
                  className="px-6 py-2 bg-white text-black font-black text-[10px] uppercase rounded-full hover:bg-slate-200 transition-colors"
                >
                  Đóng
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
