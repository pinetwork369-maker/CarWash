import React, { useState } from 'react';
import { Plus, Trash2, Edit2, Save, X, Package, AlertTriangle, CheckCircle2, TrendingDown, History, ArrowUpRight, ArrowDownRight, Search, Filter } from 'lucide-react';
import { InventoryItem, InventoryConsumption, Service } from '../../types';
import { motion, AnimatePresence } from 'motion/react';
import toast from 'react-hot-toast';

interface InventoryManagementProps {
  inventory: InventoryItem[];
  setInventory: React.Dispatch<React.SetStateAction<InventoryItem[]>>;
  services: Service[];
}

export const InventoryManagement: React.FC<InventoryManagementProps> = ({ inventory, setInventory, services }) => {
  const [filterText, setFilterText] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [formData, setFormData] = useState<Omit<InventoryItem, 'id'>>({
    name: '',
    category: '',
    quantity: 0,
    unit: '',
    minThreshold: 5,
    pricePerUnit: 0,
    lastRestocked: new Date().toISOString()
  });

  const [sortConfig, setSortConfig] = useState<{ key: string, order: 'asc' | 'desc' }>({ key: 'name', order: 'asc' });

  const categories = Array.from(new Set(inventory.map(item => item.category)));

  const filteredInventory = inventory.filter(item => {
    const matchesText = item.name.toLowerCase().includes(filterText.toLowerCase()) || 
                       item.category.toLowerCase().includes(filterText.toLowerCase());
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    return matchesText && matchesCategory;
  }).sort((a, b) => {
    let valA = (a as any)[sortConfig.key];
    let valB = (b as any)[sortConfig.key];
    const order = sortConfig.order === 'asc' ? 1 : -1;

    if (sortConfig.key === 'quantity' || sortConfig.key === 'pricePerUnit') {
      return (valA - valB) * order;
    }
    return String(valA || '').localeCompare(String(valB || '')) * order;
  });

  const handleUpdateQuantity = (id: string, delta: number) => {
    setInventory(prev => prev.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(0, item.quantity + delta);
        if (newQuantity <= item.minThreshold && item.quantity > item.minThreshold) {
          toast.error(`Cảnh báo: ${item.name} sắp hết hàng!`, { icon: '⚠️' });
        }
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const handleDelete = (id: string) => {
    setInventory(prev => prev.filter(item => item.id !== id));
    toast.success('Đã xóa vật tư khỏi kho');
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h3 className="section-title text-3xl">Hệ Thống Quản Lý Kho Thông Minh</h3>
          <p className="section-subtitle mt-1">Tự động khấu trừ vật tư & cảnh báo tồn kho thời gian thực</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button 
            onClick={() => setShowHistory(!showHistory)}
            className="btn-secondary flex-1 md:flex-none px-6 py-4 text-[10px]"
          >
            <History className="w-4 h-4" /> Lịch sử
          </button>
          <button 
            onClick={() => {
              setFormData({ 
                name: '', 
                category: '', 
                quantity: 0, 
                unit: '', 
                minThreshold: 5, 
                pricePerUnit: 0,
                lastRestocked: new Date().toISOString()
              });
              setEditingId(null);
              setIsAdding(true);
            }}
            className="btn-primary flex-1 md:flex-none px-8 py-4 text-[10px]"
          >
            <Plus className="w-4 h-4" /> Thêm Vật Tư
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-900/50 border border-white/5 p-6 rounded-[32px]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/10 flex items-center justify-center">
              <Package className="w-5 h-5 text-blue-500" />
            </div>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Tổng mặt hàng</p>
          </div>
          <p className="text-4xl font-black text-white">{inventory.length}</p>
        </div>
        <div className="bg-slate-900/50 border border-red-500/20 p-6 rounded-[32px]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-2xl bg-red-500/10 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-500" />
            </div>
            <p className="text-[10px] font-black text-red-500 uppercase tracking-widest">Sắp hết kho</p>
          </div>
          <p className="text-4xl font-black text-red-500">{inventory.filter(item => item.quantity <= item.minThreshold).length}</p>
        </div>
        <div className="bg-slate-900/50 border border-emerald-500/20 p-6 rounded-[32px]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
              <TrendingDown className="w-5 h-5 text-emerald-500" />
            </div>
            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Giá trị kho</p>
          </div>
          <p className="text-2xl font-black text-emerald-500">
            {(inventory.reduce((acc, item) => acc + (item.quantity * (item.pricePerUnit || 0)), 0)).toLocaleString('vi-VN')} đ
          </p>
        </div>
        <div className="bg-slate-900/50 border border-blue-500/20 p-6 rounded-[32px]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/10 flex items-center justify-center">
              <ArrowUpRight className="w-5 h-5 text-blue-500" />
            </div>
            <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Nhập kho tháng này</p>
          </div>
          <p className="text-2xl font-black text-blue-500">12.500.000 đ</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input 
            type="text"
            placeholder="Tìm kiếm vật tư theo tên hoặc danh mục..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="w-full bg-slate-900/50 border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-white focus:border-blue-500 outline-none transition-all"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <select 
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="bg-slate-900/50 border border-white/5 rounded-2xl px-6 py-4 text-white text-[10px] font-black uppercase outline-none focus:border-blue-500"
          >
            <option value="all">Tất cả danh mục</option>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          <select 
            value={`${sortConfig.key}-${sortConfig.order}`}
            onChange={(e) => {
              const [key, order] = e.target.value.split('-');
              setSortConfig({ key, order: order as 'asc' | 'desc' });
            }}
            className="bg-slate-900/50 border border-white/5 rounded-2xl px-6 py-4 text-white text-[10px] font-black uppercase outline-none focus:border-blue-500"
          >
            <option value="name-asc">Sắp xếp: Tên A-Z</option>
            <option value="name-desc">Sắp xếp: Tên Z-A</option>
            <option value="quantity-asc">Tồn kho: Ít nhất</option>
            <option value="quantity-desc">Tồn kho: Nhiều nhất</option>
            <option value="pricePerUnit-desc">Giá trị: Cao nhất</option>
          </select>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-slate-900/50 border border-white/5 rounded-[40px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-white/5">
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Vật Tư</th>
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Danh Mục</th>
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Tồn Kho</th>
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Trạng Thái</th>
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredInventory.map(item => (
                <tr key={`inventory-${item.id}`} className="hover:bg-white/5 transition-colors group">
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${
                        item.quantity <= item.minThreshold ? 'bg-red-500/10 border-red-500/20' : 'bg-blue-500/10 border-blue-500/20'
                      }`}>
                        <Package className={`w-6 h-6 ${item.quantity <= item.minThreshold ? 'text-red-500' : 'text-blue-500'}`} />
                      </div>
                      <div>
                        <p className="text-sm font-black text-white uppercase">{item.name}</p>
                        <p className="text-[10px] text-slate-500 font-bold mt-1">Đơn giá: {item.pricePerUnit?.toLocaleString('vi-VN')} đ</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-400 text-[9px] font-black uppercase tracking-widest">
                      {item.category}
                    </span>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <button 
                          onClick={() => handleUpdateQuantity(item.id, -1)}
                          className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-red-600 hover:text-white transition-all"
                        >
                          -
                        </button>
                        <div className="w-20 text-center">
                          <p className="text-sm font-black text-white">{item.quantity}</p>
                          <p className="text-[9px] text-slate-500 font-bold uppercase">{item.unit}</p>
                        </div>
                        <button 
                          onClick={() => handleUpdateQuantity(item.id, 1)}
                          className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-emerald-600 hover:text-white transition-all"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    {item.quantity <= item.minThreshold ? (
                      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 w-fit">
                        <AlertTriangle className="w-3 h-3 text-red-500" />
                        <span className="text-red-500 text-[9px] font-black uppercase tracking-widest">Sắp hết hàng</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 w-fit">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                        <span className="text-emerald-500 text-[9px] font-black uppercase tracking-widest">Ổn định</span>
                      </div>
                    )}
                  </td>
                  <td className="p-6 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => {
                          setEditingId(item.id);
                          setFormData(item);
                          setIsAdding(true);
                        }}
                        className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="w-10 h-10 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {isAdding && (
          <div className="fixed inset-0 z-[500] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAdding(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-slate-900 border border-white/10 rounded-[40px] p-8 shadow-2xl overflow-hidden"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-black text-white uppercase tracking-tighter">
                  {editingId ? 'Cập Nhật Vật Tư' : 'Thêm Vật Tư Mới'}
                </h3>
                <button onClick={() => setIsAdding(false)} className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-all">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Tên Vật Tư</label>
                  <input 
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="VD: Dung dịch Ceramic"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Danh Mục</label>
                    <input 
                      type="text"
                      value={formData.category}
                      onChange={e => setFormData({...formData, category: e.target.value})}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="VD: Hóa chất"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Đơn Vị</label>
                    <input 
                      type="text"
                      value={formData.unit}
                      onChange={e => setFormData({...formData, unit: e.target.value})}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="VD: Chai, Lít"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Số Lượng</label>
                    <input 
                      type="number"
                      value={formData.quantity}
                      onChange={e => setFormData({...formData, quantity: parseInt(e.target.value) || 0})}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Ngưỡng Cảnh Báo</label>
                    <input 
                      type="number"
                      value={formData.minThreshold}
                      onChange={e => setFormData({...formData, minThreshold: parseInt(e.target.value) || 0})}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Đơn Giá Nhập (VNĐ)</label>
                  <input 
                    type="number"
                    value={formData.pricePerUnit}
                    onChange={e => setFormData({...formData, pricePerUnit: parseInt(e.target.value) || 0})}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-8">
                <button 
                  onClick={() => setIsAdding(false)}
                  className="flex-1 bg-slate-800 text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest"
                >
                  Hủy
                </button>
                <button 
                  onClick={() => {
                    if (!formData.name) {
                      toast.error('Vui lòng nhập tên vật tư');
                      return;
                    }
                    if (editingId) {
                      setInventory(prev => prev.map(item => item.id === editingId ? { ...formData, id: editingId } : item));
                      toast.success('Đã cập nhật vật tư');
                    } else {
                      setInventory(prev => [...prev, { ...formData, id: Date.now().toString() }]);
                      toast.success('Đã thêm vật tư mới');
                    }
                    setIsAdding(false);
                    setEditingId(null);
                  }}
                  className="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl shadow-blue-600/20"
                >
                  {editingId ? 'Lưu Thay Đổi' : 'Thêm Vào Kho'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Automated Deduction Logic Info */}
      <div className="bg-blue-600/10 border border-blue-500/20 rounded-[32px] p-8">
        <div className="flex items-start gap-6">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center shrink-0">
            <TrendingDown className="w-6 h-6 text-white" />
          </div>
          <div>
            <h4 className="text-lg font-black text-white uppercase mb-2">Hệ thống khấu trừ tự động</h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              Vật tư sẽ được tự động trừ vào kho khi kỹ thuật viên đánh dấu hoàn thành các bước dịch vụ tương ứng. 
              Ví dụ: Khi hoàn thành bước "Phủ Ceramic", hệ thống sẽ tự động trừ 1 chai dung dịch Ceramic 9H khỏi kho.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              {services.filter(s => s.inventoryConsumptions && s.inventoryConsumptions.length > 0).map(service => (
                <div key={`inventory-service-${service.id}`} className="bg-black/40 rounded-2xl p-4 border border-white/5">
                  <p className="text-[10px] font-black text-blue-500 uppercase mb-2">{service.title}</p>
                  {service.inventoryConsumptions?.map(cons => {
                    const item = inventory.find(i => i.id === cons.itemId);
                    return (
                      <div key={`inventory-cons-${cons.itemId}`} className="flex justify-between items-center">
                        <span className="text-[10px] text-slate-400">{item?.name}</span>
                        <span className="text-[10px] text-white font-bold">-{cons.amount} {item?.unit}</span>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
