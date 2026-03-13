import React, { useState } from 'react';
import { Plus, Trash2, Edit2, Save, X, Car, User, Clock, CheckCircle2, Timer, Circle, ChevronRight, ChevronDown, Phone, Briefcase, DollarSign, Image as ImageIcon, MessageSquare } from 'lucide-react';
import { VehicleTracking, TrackingStep, TrackingStatus, VehicleStatus } from './types';

interface TrackingManagementProps {
  trackingData: VehicleTracking[];
  setTrackingData: React.Dispatch<React.SetStateAction<VehicleTracking[]>>;
}

export const TrackingManagement: React.FC<TrackingManagementProps> = ({ trackingData, setTrackingData }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Partial<VehicleTracking>>({
    licensePlate: '',
    customerName: '',
    customerPhone: '',
    carModel: '',
    technicianName: '',
    serviceType: '',
    totalAmount: 0,
    status: 'waiting',
    steps: [
      { id: '1', name: 'Tiếp nhận & Kiểm tra xe', status: 'pending' },
      { id: '2', name: 'Rửa xe chi tiết', status: 'pending' },
      { id: '3', name: 'Vệ sinh nội thất', status: 'pending' },
      { id: '4', name: 'Kiểm tra cuối & Bàn giao', status: 'pending' }
    ],
    currentStepIndex: 0
  });

  const handleAdd = () => {
    const newRecord: VehicleTracking = {
      ...formData as VehicleTracking,
      id: Date.now().toString(),
      startTime: new Date().toISOString(),
      estimatedEndTime: new Date(Date.now() + 8 * 3600000).toISOString(),
      lastUpdate: new Date().toISOString(),
      steps: formData.steps || []
    };
    setTrackingData([newRecord, ...trackingData]);
    setIsAdding(false);
    resetForm();
  };

  const handleUpdateRecord = (id: string, updates: Partial<VehicleTracking>) => {
    setTrackingData(prev => prev.map(item => item.id === id ? { ...item, ...updates, lastUpdate: new Date().toISOString() } : item));
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa bản ghi này?')) {
      setTrackingData(trackingData.filter(item => item.id !== id));
    }
  };

  const handleUpdateStep = (vehicleId: string, stepId: string, updates: Partial<TrackingStep>) => {
    setTrackingData(prev => prev.map(vehicle => {
      if (vehicle.id === vehicleId) {
        const updatedSteps = vehicle.steps.map(step => 
          step.id === stepId ? { 
            ...step, 
            ...updates, 
            timestamp: updates.status === 'completed' ? new Date().toISOString() : step.timestamp 
          } : step
        );
        
        // Auto update currentStepIndex and vehicle status
        const lastCompletedIndex = updatedSteps.map(s => s.status).lastIndexOf('completed');
        const currentStepIndex = lastCompletedIndex + 1 < updatedSteps.length ? lastCompletedIndex + 1 : updatedSteps.length - 1;
        
        let vehicleStatus: VehicleStatus = 'working';
        if (updatedSteps.every(s => s.status === 'completed')) vehicleStatus = 'ready';
        if (updatedSteps.every(s => s.status === 'pending')) vehicleStatus = 'waiting';

        return {
          ...vehicle,
          steps: updatedSteps,
          currentStepIndex,
          status: vehicleStatus,
          lastUpdate: new Date().toISOString()
        };
      }
      return vehicle;
    }));
  };

  const resetForm = () => {
    setFormData({
      licensePlate: '',
      customerName: '',
      customerPhone: '',
      carModel: '',
      technicianName: '',
      serviceType: '',
      totalAmount: 0,
      status: 'waiting',
      steps: [
        { id: '1', name: 'Tiếp nhận & Kiểm tra xe', status: 'pending' },
        { id: '2', name: 'Rửa xe chi tiết', status: 'pending' },
        { id: '3', name: 'Vệ sinh nội thất', status: 'pending' },
        { id: '4', name: 'Kiểm tra cuối & Bàn giao', status: 'pending' }
      ],
      currentStepIndex: 0
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Quản Lý Tiến Độ Xe</h3>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-black text-xs uppercase rounded-2xl hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20"
        >
          <Plus className="w-4 h-4" />
          Thêm Xe Mới
        </button>
      </div>

      {/* Add Form */}
      {isAdding && (
        <div className="bg-slate-900 border border-blue-500/30 rounded-3xl p-8 mb-8 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase mb-2">Biển số xe</label>
              <div className="relative">
                <Car className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                <input
                  type="text"
                  value={formData.licensePlate}
                  onChange={(e) => setFormData({ ...formData, licensePlate: e.target.value })}
                  className="w-full bg-black border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:border-blue-500 outline-none"
                  placeholder="30A-123.45"
                />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase mb-2">Tên khách hàng</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                <input
                  type="text"
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  className="w-full bg-black border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:border-blue-500 outline-none"
                  placeholder="Nguyễn Văn A"
                />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase mb-2">Số điện thoại</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                <input
                  type="text"
                  value={formData.customerPhone}
                  onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                  className="w-full bg-black border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:border-blue-500 outline-none"
                  placeholder="0912345678"
                />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase mb-2">Dòng xe</label>
              <input
                type="text"
                value={formData.carModel}
                onChange={(e) => setFormData({ ...formData, carModel: e.target.value })}
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none"
                placeholder="Mercedes C200"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase mb-2">Kỹ thuật viên phụ trách</label>
              <div className="relative">
                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                <input
                  type="text"
                  value={formData.technicianName}
                  onChange={(e) => setFormData({ ...formData, technicianName: e.target.value })}
                  className="w-full bg-black border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:border-blue-500 outline-none"
                  placeholder="Trần Văn B"
                />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase mb-2">Loại dịch vụ</label>
              <input
                type="text"
                value={formData.serviceType}
                onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none"
                placeholder="Phủ Ceramic Pro"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase mb-2">Tổng chi phí (VNĐ)</label>
              <div className="relative">
                <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                <input
                  type="number"
                  value={formData.totalAmount}
                  onChange={(e) => setFormData({ ...formData, totalAmount: Number(e.target.value) })}
                  className="w-full bg-black border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:border-blue-500 outline-none"
                  placeholder="5000000"
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-[10px] font-black text-slate-500 uppercase mb-2">Link ảnh xe (Tùy chọn)</label>
              <div className="relative">
                <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                <input
                  type="text"
                  value={formData.vehicleImage}
                  onChange={(e) => setFormData({ ...formData, vehicleImage: e.target.value })}
                  className="w-full bg-black border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:border-blue-500 outline-none"
                  placeholder="https://..."
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <button onClick={() => setIsAdding(false)} className="px-6 py-2 text-slate-400 font-bold uppercase text-[10px]">Hủy</button>
            <button onClick={handleAdd} className="px-8 py-3 bg-blue-600 text-white font-black rounded-xl uppercase text-[10px] shadow-lg shadow-blue-600/20">Lưu bản ghi</button>
          </div>
        </div>
      )}

      {/* List */}
      <div className="space-y-4">
        {trackingData.map((vehicle) => (
          <div key={vehicle.id} className="bg-slate-900/50 border border-white/5 rounded-3xl overflow-hidden">
            <div 
              className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer hover:bg-white/5 transition-colors"
              onClick={() => setExpandedId(expandedId === vehicle.id ? null : vehicle.id)}
            >
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                  <Car className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h4 className="text-xl font-black text-white">{vehicle.licensePlate}</h4>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">{vehicle.carModel} - {vehicle.customerName}</p>
                </div>
              </div>

              <div className="flex items-center gap-8">
                <div className="text-right">
                  <p className="text-[10px] font-black text-slate-500 uppercase mb-1">Trạng thái</p>
                  <span className={`text-xs font-black uppercase ${
                    vehicle.status === 'ready' ? 'text-emerald-500' :
                    vehicle.status === 'working' ? 'text-blue-500' : 'text-slate-500'
                  }`}>{vehicle.status}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleDelete(vehicle.id); }}
                    className="p-2 text-slate-500 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  {expandedId === vehicle.id ? <ChevronDown className="w-5 h-5 text-slate-500" /> : <ChevronRight className="w-5 h-5 text-slate-500" />}
                </div>
              </div>
            </div>

            {expandedId === vehicle.id && (
              <div className="p-8 border-t border-white/5 bg-black/20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Steps Editor */}
                  <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between mb-4">
                      <h5 className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Cập nhật tiến độ chi tiết</h5>
                      <span className="text-[10px] text-slate-500 font-bold">Bấm vào trạng thái để thay đổi</span>
                    </div>
                    <div className="space-y-4">
                      {vehicle.steps.map((step) => (
                        <div key={step.id} className="bg-white/5 rounded-2xl border border-white/5 overflow-hidden">
                          <div className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className={`w-3 h-3 rounded-full ${
                                step.status === 'completed' ? 'bg-emerald-500' :
                                step.status === 'in-progress' ? 'bg-blue-500 animate-pulse' : 'bg-slate-700'
                              }`} />
                              <div>
                                <span className={`text-sm font-bold ${step.status === 'completed' ? 'text-slate-400' : 'text-white'}`}>{step.name}</span>
                                {step.timestamp && <p className="text-[10px] text-slate-500">{new Date(step.timestamp).toLocaleString('vi-VN')}</p>}
                              </div>
                            </div>
                            <div className="flex gap-1 bg-black/40 p-1 rounded-xl">
                              {(['pending', 'in-progress', 'completed'] as TrackingStatus[]).map((s) => (
                                <button 
                                  key={s}
                                  onClick={() => handleUpdateStep(vehicle.id, step.id, { status: s })}
                                  className={`px-3 py-1.5 rounded-lg text-[8px] font-black uppercase transition-all ${
                                    step.status === s 
                                      ? s === 'completed' ? 'bg-emerald-500 text-white' : s === 'in-progress' ? 'bg-blue-500 text-white' : 'bg-slate-600 text-white'
                                      : 'text-slate-500 hover:text-white'
                                  }`}
                                >
                                  {s === 'pending' ? 'Chờ' : s === 'in-progress' ? 'Làm' : 'Xong'}
                                </button>
                              ))}
                            </div>
                          </div>
                          <div className="px-4 pb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="relative">
                              <MessageSquare className="absolute left-3 top-3 w-3 h-3 text-slate-600" />
                              <input 
                                type="text"
                                placeholder="Ghi chú bước này..."
                                value={step.note || ''}
                                onChange={(e) => handleUpdateStep(vehicle.id, step.id, { note: e.target.value })}
                                className="w-full bg-black/40 border border-white/5 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-300 focus:border-blue-500/50 outline-none"
                              />
                            </div>
                            <div className="relative">
                              <User className="absolute left-3 top-3 w-3 h-3 text-slate-600" />
                              <input 
                                type="text"
                                placeholder="KTV thực hiện..."
                                value={step.technician || ''}
                                onChange={(e) => handleUpdateStep(vehicle.id, step.id, { technician: e.target.value })}
                                className="w-full bg-black/40 border border-white/5 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-300 focus:border-blue-500/50 outline-none"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Info Summary & Quick Actions */}
                  <div className="space-y-6">
                    <h5 className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-4">Thông tin & Hành động</h5>
                    
                    {vehicle.vehicleImage && (
                      <div className="rounded-2xl overflow-hidden border border-white/10 mb-4 aspect-video">
                        <img src={vehicle.vehicleImage} alt="Vehicle" className="w-full h-full object-cover" />
                      </div>
                    )}

                    <div className="bg-white/5 rounded-3xl p-6 space-y-4 border border-white/5">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] text-slate-500 font-bold uppercase">Khách hàng</span>
                        <span className="text-xs text-white font-bold">{vehicle.customerName}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] text-slate-500 font-bold uppercase">Số điện thoại</span>
                        <span className="text-xs text-blue-400 font-bold">{vehicle.customerPhone || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] text-slate-500 font-bold uppercase">KTV Phụ trách</span>
                        <span className="text-xs text-white font-bold">{vehicle.technicianName || 'Chưa phân công'}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] text-slate-500 font-bold uppercase">Dịch vụ</span>
                        <span className="text-xs text-emerald-400 font-bold">{vehicle.serviceType || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t border-white/5">
                        <span className="text-[10px] text-slate-500 font-bold uppercase">Tổng chi phí</span>
                        <span className="text-sm text-white font-black">{vehicle.totalAmount?.toLocaleString('vi-VN')} VNĐ</span>
                      </div>
                    </div>

                    <div className="bg-white/5 rounded-3xl p-6 space-y-4 border border-white/5">
                      <div className="flex justify-between">
                        <span className="text-[10px] text-slate-500 font-bold uppercase">Bắt đầu</span>
                        <span className="text-[10px] text-white font-mono">{new Date(vehicle.startTime).toLocaleString('vi-VN')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[10px] text-slate-500 font-bold uppercase">Dự kiến xong</span>
                        <span className="text-[10px] text-white font-mono">{new Date(vehicle.estimatedEndTime).toLocaleString('vi-VN')}</span>
                      </div>
                      
                      <div className="pt-4">
                        <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-emerald-500 h-full transition-all duration-500"
                            style={{ width: `${((vehicle.steps.filter(s => s.status === 'completed').length) / vehicle.steps.length) * 100}%` }}
                          />
                        </div>
                        <p className="text-[10px] text-slate-500 font-black uppercase mt-2 text-right">
                          Hoàn thành {Math.round(((vehicle.steps.filter(s => s.status === 'completed').length) / vehicle.steps.length) * 100)}%
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <button 
                        onClick={() => {
                          const newEndTime = new Date(new Date(vehicle.estimatedEndTime).getTime() + 3600000).toISOString();
                          handleUpdateRecord(vehicle.id, { estimatedEndTime: newEndTime });
                        }}
                        className="p-3 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase text-slate-400 hover:text-white hover:bg-white/10 transition-all"
                      >
                        +1 Giờ dự kiến
                      </button>
                      <button 
                        onClick={() => {
                          if (confirm('Xác nhận hoàn tất toàn bộ quy trình?')) {
                            const allDone = vehicle.steps.map(s => ({ ...s, status: 'completed' as TrackingStatus, timestamp: new Date().toISOString() }));
                            handleUpdateRecord(vehicle.id, { steps: allDone, status: 'ready', currentStepIndex: allDone.length - 1 });
                          }
                        }}
                        className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-[10px] font-black uppercase text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all"
                      >
                        Hoàn tất nhanh
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
