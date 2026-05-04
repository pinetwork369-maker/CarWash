
import React from 'react';
import { Search, Filter, ArrowUp, ArrowDown } from 'lucide-react';

interface TableControlsProps {
  filterText: string;
  setFilterText: (val: string) => void;
  filterCategory?: string;
  setFilterCategory?: (val: string) => void;
  categories?: { id: string; label: string }[];
  sortKey: string;
  sortOrder: 'asc' | 'desc';
  onSort: (key: string) => void;
  placeholder?: string;
}

export const TableControls: React.FC<TableControlsProps> = ({
  filterText,
  setFilterText,
  filterCategory,
  setFilterCategory,
  categories,
  sortKey,
  sortOrder,
  onSort,
  placeholder = "Tìm kiếm..."
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="relative flex-1 group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
        <input 
          type="text"
          placeholder={placeholder}
          className="w-full bg-slate-900/50 border border-white/5 rounded-2xl py-3 pl-11 pr-4 text-xs text-white placeholder:text-slate-600 focus:border-blue-500/50 outline-none transition-all"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
      </div>

      {categories && setFilterCategory && (
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-500" />
          <select 
            className="bg-slate-900 border border-white/5 rounded-xl px-4 py-2 text-[10px] font-black uppercase text-slate-400 outline-none focus:border-blue-500 transition-all"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="all">Tất cả danh mục</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.label}</option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export const SortHeader: React.FC<{
  label: string;
  sortKey: string;
  currentSortKey: string;
  order: 'asc' | 'desc';
  onSort: (key: string) => void;
  className?: string;
}> = ({ label, sortKey, currentSortKey, order, onSort, className = "" }) => {
  const isActive = currentSortKey === sortKey;
  
  return (
    <th 
      className={`px-6 py-4 text-left text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] cursor-pointer hover:bg-white/5 transition-all ${className}`}
      onClick={() => onSort(sortKey)}
    >
      <div className="flex items-center gap-2">
        {label}
        <div className="flex flex-col opacity-0 group-hover:opacity-100 transition-opacity">
          <ArrowUp className={`w-2 h-2 ${isActive && order === 'asc' ? 'text-blue-500 opacity-100' : 'text-slate-700'}`} />
          <ArrowDown className={`w-2 h-2 ${isActive && order === 'desc' ? 'text-blue-500 opacity-100' : 'text-slate-700'}`} />
        </div>
      </div>
    </th>
  );
};
