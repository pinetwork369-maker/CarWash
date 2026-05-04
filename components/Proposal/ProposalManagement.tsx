import React, { useState } from 'react';
import { 
  FileText, 
  Plus, 
  Search, 
  Trash2, 
  Send, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Brain, 
  Sparkles,
  Calendar,
  User,
  Car,
  ChevronDown,
  ChevronUp,
  Download,
  Share2,
  MoreVertical,
  Edit,
  Loader2,
  DollarSign
} from 'lucide-react';
import { ServiceProposal, Service } from '../../types';
import { motion, AnimatePresence } from 'motion/react';

interface ProposalManagementProps {
  proposals: ServiceProposal[];
  setProposals: React.Dispatch<React.SetStateAction<ServiceProposal[]>>;
  services: Service[];
  onGenerateAiNote: (carInfo: string, services: string[]) => Promise<string>;
}

const ProposalManagement: React.FC<ProposalManagementProps> = ({ 
  proposals, 
  setProposals, 
  services,
  onGenerateAiNote 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Partial<ServiceProposal>>({
    customerName: '',
    phone: '',
    licensePlate: '',
    carModel: '',
    services: [],
    expertNote: '',
    status: 'draft',
    totalPrice: 0,
    date: new Date().toISOString().split('T')[0],
    expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  });

  const filteredProposals = proposals.filter(p => 
    p.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.licensePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.carModel.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddService = (serviceId: string) => {
    const service = services.find(s => s.id === serviceId);
    if (!service) return;

    const newServices = [...(formData.services || []), { 
      serviceId, 
      price: service.price, 
      note: '' 
    }];
    
    // Calculate total price accurately (stripping symbols)
    const total = newServices.reduce((acc, curr) => {
      const p = parseInt(curr.price.replace(/[^0-9]/g, '')) || 0;
      return acc + p;
    }, 0);

    setFormData({ ...formData, services: newServices, totalPrice: total });
  };

  const handleRemoveService = (index: number) => {
    const newServices = [...(formData.services || [])];
    newServices.splice(index, 1);
    
    const total = newServices.reduce((acc, curr) => {
      const p = parseInt(curr.price.replace(/[^0-9]/g, '')) || 0;
      return acc + p;
    }, 0);

    setFormData({ ...formData, services: newServices, totalPrice: total });
  };

  const handleAiSuggest = async () => {
    if (!formData.carModel || !formData.services?.length) {
      alert("Vui lòng nhập mẫu xe và chọn ít nhất 1 dịch vụ để AI tư vấn.");
      return;
    }
    
    setIsGenerating(true);
    try {
      const selectedServiceTitles = formData.services.map(ps => 
        services.find(s => s.id === ps.serviceId)?.title || ''
      );
      const carInfo = `${formData.carModel} (${formData.licensePlate})`;
      const note = await onGenerateAiNote(carInfo, selectedServiceTitles);
      setFormData({ ...formData, expertNote: note });
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = () => {
    if (!formData.customerName || !formData.phone || !formData.services?.length) return;

    if (editingId) {
      setProposals(proposals.map(p => p.id === editingId ? { ...p, ...formData } as ServiceProposal : p));
      setEditingId(null);
    } else {
      const newProposal: ServiceProposal = {
        ...formData,
        id: `PROP-${Date.now()}`,
        status: 'draft',
      } as ServiceProposal;
      setProposals([newProposal, ...proposals]);
    }
    
    resetForm();
    setIsAdding(false);
  };

  const resetForm = () => {
    setFormData({
      customerName: '',
      phone: '',
      licensePlate: '',
      carModel: '',
      services: [],
      expertNote: '',
      status: 'draft',
      totalPrice: 0,
      date: new Date().toISOString().split('T')[0],
      expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    });
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'sent': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'accepted': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case 'rejected': return 'bg-red-500/10 text-red-500 border-red-500/20';
      default: return 'bg-slate-500/10 text-slate-500 border-slate-500/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-6 bg-slate-900/50 border border-white/5 rounded-3xl">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Tổng Đề Xuất</p>
          <p className="text-2xl font-black text-white">{proposals.length}</p>
        </div>
        <div className="p-6 bg-blue-500/10 border border-blue-500/20 rounded-3xl">
          <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-1">Đã Gửi</p>
          <p className="text-2xl font-black text-white">{proposals.filter(p => p.status === 'sent').length}</p>
        </div>
        <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-3xl">
          <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">Đã Chấp Nhận</p>
          <p className="text-2xl font-black text-white">{proposals.filter(p => p.status === 'accepted').length}</p>
        </div>
        <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-3xl">
          <p className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-1">Bị Từ Chối</p>
          <p className="text-2xl font-black text-white">{proposals.filter(p => p.status === 'rejected').length}</p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input 
            type="text"
            placeholder="Tìm theo tênkhách, biển số..."
            className="w-full bg-slate-900 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-xs text-white focus:outline-none focus:border-blue-500 transition-all"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <button 
          onClick={() => { resetForm(); setIsAdding(true); setEditingId(null); }}
          className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20"
        >
          <Plus className="w-4 h-4" /> Tạo Đề Xuất Mới
        </button>
      </div>

      {/* Main List */}
      <div className="space-y-3">
        {filteredProposals.map(proposal => (
          <div key={proposal.id} className="bg-slate-900/40 border border-white/5 rounded-3xl overflow-hidden hover:border-white/10 transition-all">
            <div className="p-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4 min-w-[250px]">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${getStatusStyle(proposal.status)} border shadow-sm`}>
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-black text-white uppercase tracking-tight">{proposal.customerName}</h3>
                    <span className={`text-[8px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ${getStatusStyle(proposal.status)}`}>
                      {proposal.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                    <span className="flex items-center gap-1.5"><Car className="w-3 h-3" /> {proposal.carModel}</span>
                    <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
                    <span>{proposal.licensePlate}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-8 text-[11px] font-bold uppercase tracking-widest">
                <div className="hidden sm:block">
                  <p className="text-slate-500 text-[8px] mb-1">Ngày lập</p>
                  <p className="text-slate-300">{proposal.date}</p>
                </div>
                <div className="hidden sm:block">
                  <p className="text-slate-500 text-[8px] mb-1">Hết hạn</p>
                  <p className="text-red-500/70">{proposal.expiryDate}</p>
                </div>
                <div className="text-right">
                  <p className="text-slate-500 text-[8px] mb-1">Tổng cộng</p>
                  <p className="text-blue-500 font-black text-sm">{proposal.totalPrice.toLocaleString()}đ</p>
                </div>
              </div>

              <div className="flex items-center gap-2 ml-auto">
                <button 
                  onClick={() => setExpandedId(expandedId === proposal.id ? null : proposal.id)}
                  className="p-3 bg-white/5 text-slate-400 rounded-xl hover:bg-white/10 transition-all"
                >
                  {expandedId === proposal.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                <div className="h-8 w-px bg-white/5 mx-1"></div>
                <button 
                  onClick={() => {
                    setFormData(proposal);
                    setEditingId(proposal.id);
                    setIsAdding(true);
                  }}
                  className="p-3 bg-blue-500/10 text-blue-500 rounded-xl hover:bg-blue-500 hover:text-white transition-all"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setProposals(proposals.filter(p => p.id !== proposal.id))}
                  className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <AnimatePresence>
              {expandedId === proposal.id && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-t border-white/5 bg-slate-950/30 overflow-hidden"
                >
                  <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <CheckCircle className="w-3 h-3" /> Danh sách dịch vụ đề xuất
                      </h4>
                      <div className="space-y-3">
                        {proposal.services.map((ps, i) => {
                          const s = services.find(serv => serv.id === ps.serviceId);
                          return (
                            <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-2xl text-[11px]">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 font-bold">
                                  {i + 1}
                                </div>
                                <div>
                                  <p className="text-white font-black uppercase">{s?.title || 'Dịch vụ không tồn tại'}</p>
                                  {ps.note && <p className="text-slate-500 text-[9px] mt-0.5">{ps.note}</p>}
                                </div>
                              </div>
                              <p className="text-slate-300 font-bold">{ps.price}</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Brain className="w-3 h-3 text-purple-500" /> Tư vấn từ chuyên gia AI
                      </h4>
                      <div className="p-5 bg-purple-500/5 border border-purple-500/10 rounded-2xl relative">
                        <Sparkles className="absolute top-4 right-4 w-4 h-4 text-purple-500/30" />
                        <div className="text-[11px] text-slate-300 leading-relaxed italic whitespace-pre-line">
                          {proposal.expertNote || "Chưa có lời tư vấn."}
                        </div>
                      </div>
                      
                      <div className="flex gap-3 mt-6">
                        <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-600 text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-blue-500 transition-all">
                          <Send className="w-3 h-3" /> Gửi Báo Giá (WhatsApp/Zalo)
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/5 text-slate-300 border border-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                          <Download className="w-3 h-3" /> TẢI PDF
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
        {filteredProposals.length === 0 && (
          <div className="py-20 text-center bg-slate-900/20 border border-dashed border-white/10 rounded-[32px]">
            <FileText className="w-12 h-12 text-slate-700 mx-auto mb-4" />
            <p className="text-slate-500 font-bold text-xs">Không tìm thấy bản đề xuất nào phù hợp.</p>
          </div>
        )}
      </div>

      {/* Editor Modal */}
      <AnimatePresence>
        {isAdding && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAdding(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-slate-900 border border-white/10 rounded-[40px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-8 border-b border-white/5 flex items-center justify-between bg-gradient-to-r from-slate-900 to-slate-950">
                <div>
                  <h2 className="text-xl font-black text-white uppercase tracking-tighter mb-1">
                    {editingId ? 'Chỉnh Sửa Đề Xuất' : 'Tạo Đề Xuất Mới'}
                  </h2>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    Cá nhân hóa dịch vụ cho khách hàng của bạn
                  </p>
                </div>
                <button 
                  onClick={() => setIsAdding(false)}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-white/10 transition-all"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <div className="p-8 overflow-y-auto custom-scrollbar space-y-8">
                {/* Section 1: Customer Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Tên khách hàng</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                      <input 
                        className="w-full bg-slate-950 border border-white/5 rounded-2xl py-3.5 pl-12 pr-4 text-xs text-white outline-none focus:border-blue-500/50 transition-all"
                        value={formData.customerName}
                        onChange={e => setFormData({ ...formData, customerName: e.target.value })}
                        placeholder="Nguyễn Văn A"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Số điện thoại</label>
                    <input 
                      className="w-full bg-slate-950 border border-white/5 rounded-2xl py-3.5 px-4 text-xs text-white outline-none focus:border-blue-500/50 transition-all"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="0901234xxx"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Biển số xe</label>
                    <div className="relative">
                      <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                      <input 
                        className="w-full bg-slate-950 border border-white/5 rounded-2xl py-3.5 pl-12 pr-4 text-xs text-white outline-none focus:border-blue-500/50 transition-all uppercase"
                        value={formData.licensePlate}
                        onChange={e => setFormData({ ...formData, licensePlate: e.target.value })}
                        placeholder="30A-123.45"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Dòng xe</label>
                    <div className="relative">
                      <Car className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                      <input 
                        className="w-full bg-slate-950 border border-white/5 rounded-2xl py-3.5 pl-12 pr-4 text-xs text-white outline-none focus:border-blue-500/50 transition-all"
                        value={formData.carModel}
                        onChange={e => setFormData({ ...formData, carModel: e.target.value })}
                        placeholder="Toyota Camry"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 2: Services */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Dịch vụ đề xuất</label>
                    <p className="text-blue-500 font-black text-xs">Tổng: {formData.totalPrice?.toLocaleString()}đ</p>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                    {services.map(s => {
                      const isSelected = formData.services?.some(ps => ps.serviceId === s.id);
                      return (
                        <button 
                          key={s.id}
                          onClick={() => isSelected ? handleRemoveService(formData.services!.findIndex(ps => ps.serviceId === s.id)) : handleAddService(s.id)}
                          className={`p-3 rounded-2xl text-[9px] font-bold uppercase transition-all text-center h-full flex flex-col items-center justify-center gap-1.5 border shadow-sm ${
                            isSelected 
                              ? 'bg-blue-600 text-white border-blue-500' 
                              : 'bg-slate-950 text-slate-500 border-white/5 hover:border-white/20'
                          }`}
                        >
                          <span className="truncate w-full">{s.title}</span>
                          <span className={`text-[8px] opacity-70`}>{s.price}</span>
                        </button>
                      );
                    })}
                  </div>

                  {formData.services && formData.services.length > 0 && (
                    <div className="space-y-2 mt-4 max-h-48 overflow-y-auto custom-scrollbar p-2 bg-slate-950/50 rounded-3xl">
                      {formData.services.map((ps, idx) => {
                        const s = services.find(serv => serv.id === ps.serviceId);
                        return (
                          <div key={idx} className="flex items-center gap-3 bg-white/5 p-3 rounded-2xl group">
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-black text-white uppercase">{s?.title}</span>
                                <span className="text-[9px] font-bold text-slate-400">{ps.price}</span>
                              </div>
                              <input 
                                className="w-full bg-transparent text-[10px] text-slate-500 mt-1 outline-none placeholder:text-slate-800"
                                placeholder="Thêm ghi chú cho dịch vụ này..."
                                value={ps.note}
                                onChange={e => {
                                  const newS = [...formData.services!];
                                  newS[idx].note = e.target.value;
                                  setFormData({...formData, services: newS});
                                }}
                              />
                            </div>
                            <button 
                              onClick={() => handleRemoveService(idx)}
                              className="p-2 text-slate-600 hover:text-red-500 transition-colors"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Section 3: AI Advisor */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                       <Brain className="w-3 h-3 text-purple-500" /> Chuyên gia AI tư vấn
                    </label>
                    <button 
                      onClick={handleAiSuggest}
                      disabled={isGenerating}
                      className="flex items-center gap-2 px-4 py-2 bg-purple-600/20 text-purple-400 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-purple-600/30 transition-all disabled:opacity-50"
                    >
                      {isGenerating ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                      Generate AI Insight
                    </button>
                  </div>
                  <textarea 
                    className="w-full bg-slate-950 border border-white/5 rounded-[32px] p-6 text-xs text-slate-300 leading-relaxed outline-none focus:border-purple-500/30 transition-all min-h-[150px] shadow-inner font-serif italic"
                    value={formData.expertNote}
                    onChange={e => setFormData({ ...formData, expertNote: e.target.value })}
                    placeholder="Viết lời dẫn hoặc click nút AI để tự động tạo..."
                  />
                </div>

                {/* Section 4: Dates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Ngày lập đề xuất</label>
                    <input 
                      type="date"
                      className="w-full bg-slate-950 border border-white/5 rounded-2xl py-3.5 px-4 text-xs text-white"
                      value={formData.date}
                      onChange={e => setFormData({ ...formData, date: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Hạn báo giá</label>
                    <input 
                      type="date"
                      className="w-full bg-slate-950 border border-white/5 rounded-2xl py-3.5 px-4 text-xs text-white"
                      value={formData.expiryDate}
                      onChange={e => setFormData({ ...formData, expiryDate: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="p-8 border-t border-white/5 bg-slate-950/50 flex items-center justify-end gap-4">
                <button 
                  onClick={() => setIsAdding(false)}
                  className="px-8 py-4 bg-white/5 text-slate-400 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all"
                >
                  Hủy bỏ
                </button>
                <button 
                  onClick={handleSubmit}
                  className="px-10 py-4 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20"
                >
                  {editingId ? 'Cập Nhật Đề Xuất' : 'Lưu Đề Xuất'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProposalManagement;
