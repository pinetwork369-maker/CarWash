import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Trash2, Edit2, Save, X, Camera as CameraIcon, Palette, ExternalLink, Image as ImageIcon, Move } from 'lucide-react';
import { WrapProject } from '../../types';
import { toast } from 'react-hot-toast';

interface WrapProjectManagerProps {
  projects: WrapProject[];
  onUpdate: (projects: WrapProject[]) => void;
}

const WrapProjectManager: React.FC<WrapProjectManagerProps> = ({ projects, onUpdate }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newProject, setNewProject] = useState<Partial<WrapProject>>({
    title: '',
    img: '',
    color: ''
  });
  const [showAddForm, setShowAddForm] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, isNew: boolean, projectId?: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        const maxWidth = 1000; // Reduced for better performance
        const quality = 0.6; // Lowered quality to save space

        if (width > maxWidth) {
          height = (maxWidth / width) * height;
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, width, height);
        }
        
        const base64String = canvas.toDataURL('image/jpeg', quality);
        
        if (isNew) {
          setNewProject({ ...newProject, img: base64String });
        } else if (projectId) {
          const project = projects.find(p => p.id === projectId);
          if (project) {
            handleUpdate({ ...project, img: base64String });
          }
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleAdd = () => {
    if (!newProject.title) {
      toast.error('Vui lòng nhập tên dự án/xe');
      return;
    }
    if (!newProject.img) {
      toast.error('Vui lòng chọn hoặc nhập link hình ảnh');
      return;
    }

    const project: WrapProject = {
      id: `wp-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
      title: newProject.title,
      img: newProject.img,
      color: newProject.color || 'Custom Wrap',
      date: new Date().toISOString(),
      objectPosition: '50% 50%'
    };
    
    try {
      onUpdate([...projects, project]);
      setNewProject({ title: '', img: '', color: '' });
      setShowAddForm(false);
      toast.success('Đã lưu dự án mới thành công!');
    } catch (error) {
      console.error('Error adding project:', error);
      toast.error('Không thể lưu dự án. Có thể do ảnh quá lớn hoặc bộ nhớ đầy.');
    }
  };

  const handleDelete = (id: string) => {
    onUpdate(projects.filter(p => p.id !== id));
  };

  const handleUpdate = (updatedProject: WrapProject) => {
    onUpdate(projects.map(p => p.id === updatedProject.id ? updatedProject : p));
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center bg-slate-900/50 p-6 rounded-[24px] border border-white/5">
        <div>
          <h3 className="text-xl font-black text-white uppercase tracking-tighter flex items-center gap-3">
            <CameraIcon className="w-5 h-5 text-blue-500" /> Quản Lý Dự Án Thực Tế (Wrap)
          </h3>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">
            Chỉnh sửa bộ sưu tập xe đã thi công tại trung tâm
          </p>
        </div>
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> {showAddForm ? 'Hủy' : 'Thêm Dự Án'}
        </button>
      </div>

      <AnimatePresence>
        {showAddForm && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-slate-900/80 p-8 rounded-[32px] border border-blue-500/30 gap-6 grid grid-cols-1 md:grid-cols-3 items-end"
          >
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 px-2">Tên Xe / Dự Án</label>
                <input 
                  type="text"
                  value={newProject.title}
                  onChange={e => setNewProject({...newProject, title: e.target.value})}
                  placeholder="Ví dụ: BMW M4 Edition"
                  className="w-full bg-slate-950 border border-white/10 rounded-2xl px-4 py-3 text-white text-sm focus:border-blue-500 transition-all outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 px-2">Màu Sắc / Mã Màu</label>
                <input 
                  type="text"
                  value={newProject.color}
                  onChange={e => setNewProject({...newProject, color: e.target.value})}
                  placeholder="Ví dụ: Matte Black"
                  className="w-full bg-slate-950 border border-white/10 rounded-2xl px-4 py-3 text-white text-sm focus:border-blue-500 transition-all outline-none"
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 px-2">Hình Ảnh Dự Án</label>
              <div className="flex gap-4">
                <div className="flex-1 relative group/upload">
                  <input 
                    type="file"
                    id="new-project-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, true)}
                  />
                  <label 
                    htmlFor="new-project-upload"
                    className="flex flex-col items-center justify-center w-full aspect-[16/6] bg-slate-950 border-2 border-dashed border-white/10 rounded-2xl cursor-pointer hover:border-blue-500/50 hover:bg-blue-500/5 transition-all"
                  >
                    {newProject.img ? (
                      <img src={newProject.img} alt="Preview" className="w-full h-full object-cover rounded-xl" />
                    ) : (
                      <>
                        <Plus className="w-6 h-6 text-slate-600 mb-2" />
                        <span className="text-[10px] font-bold text-slate-500">Tải ảnh lên</span>
                      </>
                    )}
                  </label>
                </div>
              </div>
              <div className="pt-2">
                <p className="text-[8px] text-slate-600 px-2 uppercase font-black">Hoặc nhập link trực tiếp:</p>
                <input 
                  type="text"
                  value={newProject.img}
                  onChange={e => setNewProject({...newProject, img: e.target.value})}
                  placeholder="https://..."
                  className="w-full bg-slate-950 border border-white/10 rounded-2xl px-4 py-2 mt-2 text-white text-xs focus:border-blue-500 outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col justify-end">
              <button 
                onClick={handleAdd}
                className="w-full h-[52px] bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-500 transition-all shadow-lg"
              >
                Lưu Dự Án Mới
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="group relative bg-slate-900 border border-white/5 rounded-[32px] overflow-hidden">
            <div className="aspect-[16/10] relative">
              <img 
                src={project.img} 
                alt={project.title} 
                className="w-full h-full object-cover" 
                style={{ objectPosition: project.objectPosition || '50% 50%' }}
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                <button 
                  onClick={() => setEditingId(project.id)}
                  className="w-10 h-10 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => handleDelete(project.id)}
                  className="w-10 h-10 bg-red-500/20 backdrop-blur-xl border border-red-500/30 rounded-full flex items-center justify-center text-red-500 hover:bg-red-500/40 transition-all"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              {editingId === project.id ? (
                <div className="space-y-3">
                  <div>
                    <label className="block text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1 px-1">Tên Dự Án</label>
                    <input 
                      type="text"
                      value={project.title}
                      onChange={e => handleUpdate({...project, title: e.target.value})}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-white text-xs focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1 px-1">Màu Sắc</label>
                    <input 
                      type="text"
                      value={project.color}
                      onChange={e => handleUpdate({...project, color: e.target.value})}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-white text-xs focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1 px-1">Thay Đổi Hình Ảnh</label>
                    <div className="flex gap-2">
                      <input 
                        type="file"
                        id={`edit-upload-${project.id}`}
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, false, project.id)}
                      />
                      <label 
                        htmlFor={`edit-upload-${project.id}`}
                        className="flex-1 flex items-center justify-center gap-2 bg-slate-950 border border-dashed border-white/20 rounded-xl py-2 cursor-pointer hover:border-blue-500/50 transition-all"
                      >
                        <ImageIcon className="w-3 h-3 text-slate-500" />
                        <span className="text-[8px] font-bold text-slate-500">Tải ảnh mới</span>
                      </label>
                    </div>
                    <input 
                      type="text"
                      value={project.img}
                      onChange={e => handleUpdate({...project, img: e.target.value})}
                      placeholder="Hoặc nhập link..."
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 mt-2 text-white text-[9px] focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1 px-1">Căn Chỉnh Ảnh (Focal Point)</label>
                    <div className="relative aspect-[16/6] bg-slate-950 border border-white/10 rounded-xl overflow-hidden cursor-crosshair group/focal">
                      <img 
                        src={project.img} 
                        alt="Focal selector" 
                        className="w-full h-full object-cover opacity-30 grayscale blur-[2px]" 
                      />
                      <div 
                        className="absolute inset-0"
                        onClick={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          const x = ((e.clientX - rect.left) / rect.width) * 100;
                          const y = ((e.clientY - rect.top) / rect.height) * 100;
                          handleUpdate({...project, objectPosition: `${x.toFixed(0)}% ${y.toFixed(0)}%`});
                        }}
                      >
                        <div 
                          className="absolute w-6 h-6 border-2 border-blue-500 rounded-full flex items-center justify-center -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-all duration-300"
                          style={{ 
                            left: project.objectPosition?.split(' ')[0] || '50%', 
                            top: project.objectPosition?.split(' ')[1] || '50%' 
                          }}
                        >
                          <div className="w-1 h-1 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                        </div>
                      </div>
                      <div className="absolute top-2 right-2 flex gap-1">
                        <span className="text-[7px] font-black text-blue-500 bg-slate-900/80 px-1.5 py-0.5 rounded border border-blue-500/30">
                          {project.objectPosition || '50% 50%'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button 
                      onClick={() => setEditingId(null)}
                      className="flex-1 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-[8px] font-black uppercase tracking-widest transition-all shadow-lg shadow-blue-600/20"
                    >
                      Xác Nhận
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-1">{project.color}</p>
                  <h4 className="text-sm font-black text-white uppercase tracking-tight truncate">{project.title}</h4>
                </>
              )}
            </div>
          </div>
        ))}
        
        {projects.length === 0 && (
          <div className="col-span-full py-20 flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-[40px] text-slate-500">
            <ImageIcon className="w-12 h-12 mb-4 opacity-20" />
            <p className="text-[10px] font-bold uppercase tracking-widest">Chưa có dự án nào được thêm</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WrapProjectManager;
