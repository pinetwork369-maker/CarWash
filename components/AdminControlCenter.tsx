
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Settings, 
  Menu, 
  X, 
  Layout, 
  Users, 
  Boxes, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  Edit3, 
  Smartphone,
  ChevronRight,
  Plus,
  Search,
  Zap,
  Camera as CameraIcon,
  Lock,
  LogOut,
  Sparkles,
  BarChart,
  Calendar,
  ClipboardCheck,
  Package,
  Cloud
} from 'lucide-react';
import { toast } from 'react-hot-toast';

interface AdminControlCenterProps {
  isEditMode: boolean;
  setIsEditMode: (val: boolean) => void;
  isDashboardOpen: boolean;
  setIsDashboardOpen: (val: boolean) => void;
  isAuthenticated: boolean;
  onLogout: () => void;
  onOpenTab: (tab: string) => void;
  isPrivacyMode: boolean;
  onTogglePrivacy: () => void;
  notificationsCount?: number;
  cloudUser?: any;
  onCloudLogin?: () => void;
  onCloudLogout?: () => void;
}

export const AdminControlCenter: React.FC<AdminControlCenterProps> = ({
  isEditMode,
  setIsEditMode,
  isDashboardOpen,
  setIsDashboardOpen,
  isAuthenticated,
  onLogout,
  onOpenTab,
  isPrivacyMode,
  onTogglePrivacy,
  notificationsCount = 0,
  cloudUser,
  onCloudLogin,
  onCloudLogout
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const quicklinks = [
    { id: 'home', label: 'Tổng quan', icon: <BarChart className="w-4 h-4" /> },
    { id: 'appointments', label: 'Lịch hẹn', icon: <Calendar className="w-4 h-4" /> },
    { id: 'customers', label: 'Khách hàng', icon: <Users className="w-4 h-4" /> },
    { id: 'tracking', label: 'Theo dõi xe', icon: <Zap className="w-4 h-4" /> },
    { id: 'inspections', label: 'Kiểm tra xe', icon: <ClipboardCheck className="w-4 h-4" /> },
    { id: 'inventory', label: 'Kho hàng', icon: <Boxes className="w-4 h-4" /> },
    { id: 'wrap-manager', label: 'Dự án Wrap', icon: <CameraIcon className="w-4 h-4" /> },
    { id: 'ui-design', label: 'Thiết kế', icon: <Layout className="w-4 h-4" /> },
  ];

  const filteredLinks = quicklinks.filter(link => 
    link.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return null;
};
