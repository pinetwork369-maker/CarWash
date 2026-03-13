import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Car, Clock, CheckCircle2, Circle, Timer, User, ShieldCheck, ChevronRight, Phone, Briefcase, DollarSign, Info } from 'lucide-react';
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
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4"
            >
              <Timer className="w-3 h-3 text-blue-500" />
              <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Real-time Tracking</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-6"
            >
              Theo Dõi <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-emerald-500">Tiến Độ</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-slate-400 max-w-2xl mx-auto font-medium"
            >
              Nhập biển số xe của bạn để kiểm tra trạng thái chăm sóc và thời gian dự kiến hoàn thành ngay lập tức.
            </motion.p>
          </div>

          {/* Search Bar */}
          <div className="relative mb-12">
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-slate-500" />
            </div>
            <input
              type="text"
              placeholder="Nhập biển số xe (VD: 30A-123.45)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/50 border border-white/10 rounded-3xl py-6 pl-16 pr-6 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 transition-all text-lg font-bold"
            />
          </div>

          {/* Results Area */}
          <div className="space-y-6">
            <AnimatePresence mode="popLayout">
              {searchQuery && filteredData.length > 0 ? (
                filteredData.map((vehicle) => (
                  <motion.div
                    key={vehicle.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    onClick={() => setSelectedVehicle(vehicle)}
                    className="group bg-slate-900/40 border border-white/5 hover:border-blue-500/30 rounded-3xl p-6 cursor-pointer transition-all"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 group-hover:scale-110 transition-transform">
                          <Car className="w-8 h-8 text-blue-500" />
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="text-2xl font-black text-white tracking-tight">{vehicle.licensePlate}</h3>
                            {getVehicleStatusBadge(vehicle.status)}
                          </div>
                          <p className="text-slate-400 font-bold text-sm uppercase tracking-wider">{vehicle.carModel}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-8">
                        <div className="text-right hidden sm:block">
                          <p className="text-[10px] font-black text-slate-500 uppercase mb-1">Tiến độ hiện tại</p>
                          <p className="text-white font-bold">{vehicle.steps[vehicle.currentStepIndex]?.name}</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                          <ChevronRight className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : searchQuery ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12 bg-slate-900/20 rounded-3xl border border-dashed border-white/10"
                >
                  <p className="text-slate-500 font-bold">Không tìm thấy thông tin xe với biển số này.</p>
                </motion.div>
              ) : null}
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
              <div className="p-8 max-h-[50vh] overflow-y-auto custom-scrollbar">
                <div className="space-y-8 relative">
                  {/* Vertical Line */}
                  <div className="absolute left-[15px] top-2 bottom-2 w-px bg-white/10" />

                  {selectedVehicle.steps.map((step, index) => (
                    <div key={step.id} className="relative flex gap-6">
                      <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                        step.status === 'completed' ? 'bg-emerald-500 border-emerald-500' :
                        step.status === 'in-progress' ? 'bg-blue-500 border-blue-500 animate-pulse' :
                        'bg-slate-900 border-slate-700'
                      }`}>
                        {step.status === 'completed' ? (
                          <CheckCircle2 className="w-5 h-5 text-white" />
                        ) : step.status === 'in-progress' ? (
                          <Timer className="w-5 h-5 text-white" />
                        ) : (
                          <Circle className="w-4 h-4 text-slate-700" />
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <h5 className={`font-bold ${
                            step.status === 'completed' ? 'text-white' :
                            step.status === 'in-progress' ? 'text-blue-400' :
                            'text-slate-500'
                          }`}>{step.name}</h5>
                          {step.timestamp && (
                            <span className="text-[10px] font-mono text-slate-500">
                              {new Date(step.timestamp).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          )}
                        </div>
                        {step.note && (
                          <div className="flex items-start gap-2 mt-1">
                            <Info className="w-3 h-3 text-blue-500 shrink-0 mt-0.5" />
                            <p className="text-xs text-slate-400 italic">{step.note}</p>
                          </div>
                        )}
                        {step.technician && (
                          <p className="text-[10px] text-slate-500 mt-1 flex items-center gap-1">
                            <Briefcase className="w-2 h-2" /> KTV: {step.technician}
                          </p>
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
