import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Shield, 
  Palette, 
  ArrowRight, 
  Check, 
  RefreshCw, 
  AlertTriangle, 
  Eye, 
  Settings, 
  Compass, 
  Sun, 
  Moon, 
  Info, 
  HelpCircle, 
  Flame, 
  Plus, 
  ShoppingCart, 
  DollarSign, 
  Activity, 
  Sliders, 
  Image as ImageIcon 
} from 'lucide-react';
import { DecalColor } from '../types';
import { toast } from 'react-hot-toast';

interface Vehicle3DViewerProps {
  selectedColor: DecalColor | null;
  roofStyle?: 'body' | 'black' | 'white';
  setRoofStyle?: (style: 'body' | 'black' | 'white') => void;
  wheelsStyle?: 'silver' | 'black' | 'bronze';
  setWheelsStyle?: (style: 'silver' | 'black' | 'bronze') => void;
  caliperColor?: 'none' | 'red' | 'yellow' | 'green' | 'blue';
  setCaliperColor?: (color: 'none' | 'red' | 'yellow' | 'green' | 'blue') => void;
  tintLevel?: 0 | 50 | 80;
  setTintLevel?: (tint: 0 | 50 | 80) => void;
  environment?: 'studio' | 'neon' | 'sunset' | 'aurora';
  setEnvironment?: (env: 'studio' | 'neon' | 'sunset' | 'aurora') => void;
}

// Convert Hex color to HSL to perform precision hue-shifting, saturation and lightness adjustments on the original pink car photo
function hexToHsl(hex: string): { h: number; s: number; l: number } {
  hex = hex.replace(/^\s*#|\s*$/g, '');

  if (hex.length === 3) {
    hex = hex.replace(/(.)/g, '$1$1');
  }

  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}

interface Vf3Preset {
  name: string;
  desc: string;
  badge: string;
  bodyColor: DecalColor;
  roof: 'body' | 'black' | 'white';
  wheels: 'silver' | 'black' | 'bronze';
  caliper: 'none' | 'red' | 'yellow' | 'green' | 'blue';
  tint: 0 | 50 | 80;
}

// 6 Best Trendy Presets specifically curated for VinFast VF3 Custom livery
const VF3_TRENDING_PRESETS: Vf3Preset[] = [
  {
    name: 'Tiffany Dream',
    desc: 'Satin Tiffany X Mái Trắng',
    badge: 'Trend 2026',
    bodyColor: { id: 'pres-1', name: 'Satin Tiffany Teal', hex: '#63d3cc', category: 'Satin' as const, finish: 'Mờ (Satin)', code: 'VF-TIFF' },
    roof: 'white' as const,
    wheels: 'silver' as const,
    caliper: 'blue' as const,
    tint: 50 as const
  },
  {
    name: 'Cherry Bold Candy',
    desc: 'Glossy Đỏ Candy X Mái Đen',
    badge: 'Bestseller',
    bodyColor: { id: 'pres-2', name: 'Gloss Cherry Pink Red', hex: '#d01337', category: 'Gloss' as const, finish: 'Bóng Cao Cấp', code: 'VF-CHER' },
    roof: 'black' as const,
    wheels: 'black' as const,
    caliper: 'red' as const,
    tint: 80 as const
  },
  {
    name: 'Sunset Chrome Gold',
    desc: 'Chrome Sunset Gold X Mái Đen',
    badge: 'Vip Luxury',
    bodyColor: { id: 'pres-3', name: 'Chrome Sunset Gold', hex: '#cca125', category: 'Chrome' as const, finish: 'Mạ Chrome Cao Cấp', code: 'VF-CGLD' },
    roof: 'black' as const,
    wheels: 'bronze' as const,
    caliper: 'yellow' as const,
    tint: 80 as const
  },
  {
    name: 'Desert Storm',
    desc: 'Matte Desert Sand X Mái Đen',
    badge: 'Adventure',
    bodyColor: { id: 'pres-4', name: 'Matte Sand Beige', hex: '#baa982', category: 'Matte' as const, finish: 'Nhám Quân Đội', code: 'VF-DES' },
    roof: 'black' as const,
    wheels: 'bronze' as const,
    caliper: 'none' as const,
    tint: 50 as const
  },
  {
    name: 'Cyber Neon Mint',
    desc: 'Gloss Neon Mint X Mái Đen',
    badge: 'Futuristic',
    bodyColor: { id: 'pres-5', name: 'Gloss Neon Mint', hex: '#9be038', category: 'Gloss' as const, finish: 'Bóng Neon', code: 'VF-CYB' },
    roof: 'black' as const,
    wheels: 'black' as const,
    caliper: 'green' as const,
    tint: 80 as const
  },
  {
    name: 'Sakura Ribbon',
    desc: 'Satin Sakura Pink X Mái Trắng',
    badge: 'Elegant',
    bodyColor: { id: 'pres-6', name: 'Satin Sakura Pink', hex: '#eba2c5', category: 'Satin' as const, finish: 'Mờ Ngọc Trai', code: 'VF-SAK' },
    roof: 'white' as const,
    wheels: 'silver' as const,
    caliper: 'red' as const,
    tint: 50 as const
  }
];

export const Vehicle3DViewer: React.FC<Vehicle3DViewerProps> = ({ 
  selectedColor,
  roofStyle: propRoofStyle,
  setRoofStyle: propSetRoofStyle,
  wheelsStyle: propWheelsStyle,
  setWheelsStyle: propSetWheelsStyle,
  caliperColor: propCaliperColor,
  setCaliperColor: propSetCaliperColor,
  tintLevel: propTintLevel,
  setTintLevel: propSetTintLevel,
  environment: propEnvironment,
  setEnvironment: propSetEnvironment
}) => {
  // Local states to use if parent didn't provide props
  const [localRoofStyle, localSetRoofStyle] = useState<'body' | 'black' | 'white'>('body');
  const [localWheelsStyle, localSetWheelsStyle] = useState<'silver' | 'black' | 'bronze'>('silver');
  const [localCaliperColor, localSetCaliperColor] = useState<'none' | 'red' | 'yellow' | 'green' | 'blue'>('none');
  const [localTintLevel, localSetTintLevel] = useState<0 | 50 | 80>(0);
  const [localEnvironment, localSetEnvironment] = useState<'studio' | 'neon' | 'sunset' | 'aurora'>('studio');

  // Five new state parameters for VF3 detailing hotspots
  const [headlightStyle, setHeadlightStyle] = useState<'zin' | 'smoked' | 'led'>('zin');
  const [bumperStyle, setBumperStyle] = useState<'matte_black' | 'glossy_black' | 'raptor'>('matte_black');
  const [mirrorStyle, setMirrorStyle] = useState<'matte_black' | 'body_color' | 'carbon'>('matte_black');
  const [doorHandleStyle, setDoorHandleStyle] = useState<'matte_black' | 'glossy_black' | 'carbon'>('matte_black');
  const [windshieldTint, setWindshieldTint] = useState<'none' | 'vkool' | 'crystalline'>('none');

  // Unified color of choice: can be a custom color of the workspace of VF3
  const [activeLocalColor, setActiveLocalColor] = useState<DecalColor | null>(null);

  // Sync with parent selectedColor if parent selects a color
  useEffect(() => {
    if (selectedColor) {
      setActiveLocalColor(selectedColor);
    }
  }, [selectedColor]);

  // Handle custom customizer sliders
  const [customHex, setCustomHex] = useState<string>('#efa0ba');
  const [customCategory, setCustomCategory] = useState<'Gloss' | 'Matte' | 'Satin' | 'Chrome' | 'ColorShift'>('Gloss');

  // Resolve dynamic states
  const roofStyle = propRoofStyle !== undefined ? propRoofStyle : localRoofStyle;
  const setRoofStyle = propSetRoofStyle || localSetRoofStyle;
  const wheelsStyle = propWheelsStyle !== undefined ? propWheelsStyle : localWheelsStyle;
  const setWheelsStyle = propSetWheelsStyle || localSetWheelsStyle;
  const caliperColor = propCaliperColor !== undefined ? propCaliperColor : localCaliperColor;
  const setCaliperColor = propSetCaliperColor || localSetCaliperColor;
  const tintLevel = propTintLevel !== undefined ? propTintLevel : localTintLevel;
  const setTintLevel = propSetTintLevel || localSetTintLevel;
  const environment = propEnvironment !== undefined ? propEnvironment : localEnvironment;
  const setEnvironment = propSetEnvironment || localSetEnvironment;

  const [activeTab, setActiveTab] = useState<'presets' | 'custom' | 'configs' | 'pricing'>('presets');
  const [showHotspots, setShowHotspots] = useState(true);
  const [imgSrc, setImgSrc] = useState('/image_2b169e.jpg');
  const [activeAngle, setActiveAngle] = useState<'front-left' | 'rear-left' | 'left' | 'right' | 'front' | 'top' | 'rear'>('front-left');

  const CAR_ANGLES_CONFIG = {
    'front-left': { label: 'Góc Trước', desc: 'Sườn chéo phía trước', size: '230% auto', pos: '6% 16.5%' },
    'rear-left': { label: 'Góc Sau', desc: 'Sườn chéo phía sau', size: '230% auto', pos: '94% 16.5%' },
    'left': { label: 'Cạnh Trái', desc: 'Hông trái sườn xe', size: '250% auto', pos: '3% 54%' },
    'right': { label: 'Cạnh Phải', desc: 'Hông phải sườn xe', size: '250% auto', pos: '97% 54%' },
    'front': { label: 'Mặt Trước', desc: 'Chính diện mặt ca-lăng', size: '410% auto', pos: '5.5% 84%' },
    'top': { label: 'Mặt Trên', desc: 'Mặt góc nhìn từ trên', size: '270% auto', pos: '49% 82%' },
    'rear': { label: 'Mặt Sau', desc: 'Chính diện đuôi xe', size: '370% auto', pos: '94.5% 84%' }
  } as const;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hasFallback, setHasFallback] = useState(false);
  const [retryKey, setRetryKey] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [focusedPart, setFocusedPart] = useState<'paint' | 'roof' | 'wheels' | 'caliper' | 'tint' | 'headlight' | 'bumper' | 'mirror' | 'door_handle' | 'windshield'>('paint');

  // Original pink color of the VinFast VF3 in the photo (base of HSL calculations)
  const defaultHex = '#efa0ba';
  
  // Decide active color displaying
  const activeColor = activeLocalColor || selectedColor || {
    id: 'original',
    name: 'Ngoại thất Nguyên Bản (Hồng)',
    hex: defaultHex,
    category: 'Gloss' as const,
    finish: 'Bóng nguyên bản',
    code: 'OEM-PNK'
  };

  const activeColorHex = activeColor.hex;
  const cleanHex = activeColorHex.startsWith('linear') 
    ? (activeColorHex.match(/#[a-fA-F0-9]{6}/)?.[0] || defaultHex) 
    : activeColorHex;

  // Calculate HSL shifts
  const targetHsl = hexToHsl(cleanHex);
  
  // Calculate hue shift from base pink (340)
  const hueShift = targetHsl.h - 340;
  
  // Advanced High-Fidelity Color Mapping Logic (Calibrated for photorealistic decal finishes)
  let saturateVal = 100;
  let brightnessVal = 100;
  let contrastVal = 100;

  // Extract HSL values
  const h = targetHsl.h;
  const s = targetHsl.s;
  const l = targetHsl.l;

  // Check if target is a grayscale/neutral tone (White, Gray, Black, Silver)
  const isGrayscale = s <= 12;

  if (isGrayscale) {
    saturateVal = 0; // Strip away the pink hue completely
    
    if (l < 18) {
      brightnessVal = Math.round(16 + (l / 18) * 12); 
      contrastVal = Math.round(165 + (18 - l) * 2.5); 
    } else if (l >= 75) {
      brightnessVal = Math.round(100 + ((l - 75) / 25) * 28); 
      contrastVal = Math.round(110 - ((l - 75) / 25) * 15);  
    } else {
      brightnessVal = Math.round(28 + ((l - 18) / 57) * 72);  
      contrastVal = Math.round(145 - ((l - 18) / 57) * 35);   
    }
  } else {
    // Colorful Decal wraps
    if (l < 45) {
      saturateVal = Math.round(s * 1.45 + 15);
      brightnessVal = Math.round(25 + ((l - 8) / 37) * 55);    
      contrastVal = Math.round(135 - ((l - 8) / 37) * 20);     
    } else if (l >= 45 && l < 75) {
      saturateVal = Math.round(s * 1.15 + 10);
      brightnessVal = Math.round(80 + ((l - 45) / 30) * 25);   
      contrastVal = Math.round(115 - ((l - 45) / 30) * 13);    
    } else {
      saturateVal = Math.round(s * 0.95 + 5);
      brightnessVal = Math.round(105 + ((l - 75) / 25) * 20);  
      contrastVal = Math.round(102 - ((l - 75) / 25) * 12);    
    }

    // Apply Hue-Specific Fine Calibration (Recreates actual automotive paint reactions)
    let hueContrastAdj = 0;
    let hueBrightnessAdj = 0;
    let hueSaturateAdj = 0;

    if (h >= 340 || h < 20) {
      const dist = h >= 340 ? (360 - h) / 20 : h / 20;
      const factor = 1 - dist;
      hueContrastAdj = Math.round(15 * factor);
      hueBrightnessAdj = Math.round(-6 * factor);
      hueSaturateAdj = Math.round(20 * factor);
    } else if (h >= 20 && h < 70) {
      const factor = 1 - Math.abs(h - 50) / 30; // Peak orange
      if (factor > 0) {
        hueContrastAdj = Math.round(-15 * factor);
        hueBrightnessAdj = Math.round(14 * factor);
        hueSaturateAdj = Math.round(-10 * factor);
      }
    } else if (h >= 70 && h < 150) {
      const factor = 1 - Math.abs(h - 120) / 40; // Peak green
      if (factor > 0) {
        hueContrastAdj = Math.round(8 * factor);
        hueBrightnessAdj = Math.round(-5 * factor);
        hueSaturateAdj = Math.round(5 * factor);
      }
    } else if (h >= 150 && h < 210) {
      const factor = 1 - Math.abs(h - 190) / 30; // Peak cyan
      if (factor > 0) {
        hueContrastAdj = Math.round(5 * factor);
        hueBrightnessAdj = Math.round(4 * factor);
        hueSaturateAdj = Math.round(12 * factor);
      }
    } else if (h >= 210 && h < 265) {
      const factor = 1 - Math.abs(h - 235) / 25; // Peak blue
      if (factor > 0) {
        hueContrastAdj = Math.round(15 * factor);
        hueBrightnessAdj = Math.round(8 * factor);
        hueSaturateAdj = Math.round(15 * factor);
      }
    } else if (h >= 265 && h < 340) {
      const factor = 1 - Math.abs(h - 295) / 40; // Peak violet
      if (factor > 0) {
        hueContrastAdj = Math.round(10 * factor);
        hueBrightnessAdj = Math.round(-3 * factor);
        hueSaturateAdj = Math.round(8 * factor);
      }
    }

    saturateVal = Math.max(0, Math.min(280, saturateVal + hueSaturateAdj));
    brightnessVal = Math.max(10, Math.min(150, brightnessVal + hueBrightnessAdj));
    contrastVal = Math.max(50, Math.min(220, contrastVal + hueContrastAdj));
  }

  // Material finish adjustments
  if (activeColor.category === 'Matte') {
    contrastVal = Math.round(contrastVal * 0.78);
    saturateVal = Math.round(saturateVal * 0.85);
    brightnessVal = Math.round(brightnessVal * 0.92);
  } else if (activeColor.category === 'Satin') {
    contrastVal = Math.round(contrastVal * 0.88);
    saturateVal = Math.round(saturateVal * 0.92);
    brightnessVal = Math.round(brightnessVal * 0.96);
  } else if (activeColor.category === 'Chrome') {
    contrastVal = Math.round(contrastVal * 1.38);
    brightnessVal = Math.round(brightnessVal * 1.10);
    saturateVal = Math.round(saturateVal * 1.10);
  } else if (activeColor.category === 'ColorShift') {
    contrastVal = Math.round(contrastVal * 1.18);
    saturateVal = Math.round(saturateVal * 1.08);
    brightnessVal = Math.round(brightnessVal * 1.04);
  }

  // Environment-based filter adjustments
  if (environment === 'neon') {
    contrastVal = Math.round(contrastVal * 1.12);
    saturateVal = Math.round(saturateVal * 1.15);
    brightnessVal = Math.round(brightnessVal * 0.95);
  } else if (environment === 'sunset') {
    saturateVal = Math.round(saturateVal * 1.08);
    brightnessVal = Math.round(brightnessVal * 1.04);
  } else if (environment === 'aurora') {
    contrastVal = Math.round(contrastVal * 1.05);
    saturateVal = Math.round(saturateVal * 1.10);
  }

  // Construct final CSS filter string
  const imageFilter = `hue-rotate(${hueShift}deg) saturate(${saturateVal}%) brightness(${brightnessVal}%) contrast(${contrastVal}%)`;

  const handleRetry = () => {
    setError(false);
    setLoading(true);
    setHasFallback(false);
    setImgSrc(`/image_2b169e.jpg?v=${Date.now()}`);
  };

  const handleImageError = () => {
    if (!hasFallback) {
      setImgSrc(`https://images.weserv.nl/?url=${encodeURIComponent("https://vinfastgiare.vn/wp-content/uploads/2024/05/vinfast-vf3-mau-hong.jpg")}&w=800&il&output=webp&t=fit&q=85&v=${retryKey}`);
      setHasFallback(true);
    } else {
      setError(true);
      setLoading(false);
    }
  };

  // Environment background style sheets
  const envConfigs = {
    studio: {
      bgColor: 'from-slate-100 via-white to-slate-200/95',
      gridColor: 'bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)]',
      spotlight: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)',
      desc: 'Phòng chụp xe tiêu chuẩn châu Âu',
      hudBorder: 'border-slate-200/50 bg-[#ffffffd2]'
    },
    neon: {
      bgColor: 'from-slate-950 via-purple-950/80 to-[#03001e]',
      gridColor: 'bg-[linear-gradient(to_right,#3b0764_1px,transparent_1px),linear-gradient(to_bottom,#3b0764_1px,transparent_1px)]',
      spotlight: 'linear-gradient(135deg, rgba(236,72,153,0.2) 0%, rgba(59,130,246,0.25) 100%)',
      desc: 'Phố đêm rực rỡ neon Tokyo',
      hudBorder: 'border-purple-500/20 bg-slate-950/80'
    },
    sunset: {
      bgColor: 'from-amber-950/40 via-[#2c1a04] to-slate-900',
      gridColor: 'bg-[linear-gradient(to_right,#78350f_1px,transparent_1px),linear-gradient(to_bottom,#78350f_1px,transparent_1px)]',
      spotlight: 'radial-gradient(circle, rgba(245,158,11,0.22) 0%, transparent 75%)',
      desc: 'Hoàng hôn rực rỡ nắng vàng',
      hudBorder: 'border-amber-500/10 bg-slate-950/85'
    },
    aurora: {
      bgColor: 'from-emerald-950/30 via-teal-950/50 to-slate-950',
      gridColor: 'bg-[linear-gradient(to_right,#0f766e_1px,transparent_1px),linear-gradient(to_bottom,#0f766e_1px,transparent_1px)]',
      spotlight: 'radial-gradient(circle, rgba(20,184,166,0.25) 0%, rgba(13,148,136,0.05) 80%)',
      desc: 'Bắc cực quang hư ảo huyền bí',
      hudBorder: 'border-teal-500/20 bg-slate-950/80'
    }
  };

  // Price calculations
  const getPrices = () => {
    let wrapBase = 12000000;
    if (activeColor.category === 'Matte') wrapBase = 13500000;
    else if (activeColor.category === 'Satin') wrapBase = 14500000;
    else if (activeColor.category === 'ColorShift') wrapBase = 17500000;
    else if (activeColor.category === 'Chrome') wrapBase = 22000000;

    const roofCost = roofStyle !== 'body' ? 1800000 : 0;
    const rimCost = wheelsStyle !== 'silver' ? 2200000 : 0;
    const caliperCostVal = caliperColor !== 'none' ? 950000 : 0;
    const tintCost = tintLevel !== 0 ? 3800000 : 0;

    return {
      wrapBase,
      roofCost,
      rimCost,
      caliperCost: caliperCostVal,
      tintCost,
      total: wrapBase + roofCost + rimCost + caliperCostVal + tintCost
    };
  };

  const prices = getPrices();

  // Apply custom design presets for VinFast VF3
  const handleApplyPreset = (preset: typeof VF3_TRENDING_PRESETS[0]) => {
    setActiveLocalColor(preset.bodyColor);
    setRoofStyle(preset.roof);
    setWheelsStyle(preset.wheels);
    setCaliperColor(preset.caliper);
    setTintLevel(preset.tint);
    
    toast.success(`Đã tải bản phối Hot Trend: ${preset.name}!`, {
      icon: '✨',
      duration: 3000
    });
  };

  // Handle custom color input event
  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCustomHex(val);
    const updated: DecalColor = {
      id: 'custom-hue',
      name: `Custom Design (${val.toUpperCase()})`,
      hex: val,
      category: customCategory,
      finish: `${customCategory === 'Matte' ? 'Nhám mờ' : customCategory === 'Satin' ? 'Satin' : customCategory === 'Chrome' ? 'Tráng Gương' : 'Bóng Cao Cấp'}`,
      code: `DIY-${val.substring(1).toUpperCase()}`
    };
    setActiveLocalColor(updated);
  };

  // Switch custom materials
  const handleCustomMaterialChange = (category: typeof customCategory) => {
    setCustomCategory(category);
    const updated: DecalColor = {
      id: 'custom-hue',
      name: `Custom Design (${customHex.toUpperCase()})`,
      hex: customHex,
      category: category,
      finish: `${category === 'Matte' ? 'Nhám mờ' : category === 'Satin' ? 'Satin' : category === 'Chrome' ? 'Tráng Gương' : 'Bóng Cao Cấp'}`,
      code: `DIY-${customHex.substring(1).toUpperCase()}`
    };
    setActiveLocalColor(updated);
  };

  const triggerHotspotOption = (hotspot: string) => {
    if (activeHotspot === hotspot) {
      setActiveHotspot(null);
    } else {
      setActiveHotspot(hotspot);
    }
    
    if (hotspot === 'roof') {
      setFocusedPart('roof');
      setActiveAngle('top');
    } else if (hotspot === 'tint') {
      setFocusedPart('tint');
      setActiveAngle('left');
    } else if (hotspot === 'paint') {
      setFocusedPart('paint');
      setActiveAngle('front-left');
    } else if (hotspot === 'wheels') {
      setFocusedPart('wheels');
      setActiveAngle('left');
    } else if (hotspot === 'caliper') {
      setFocusedPart('caliper');
      setActiveAngle('left');
    } else if (hotspot === 'headlight') {
      setFocusedPart('headlight');
      setActiveAngle('front');
    } else if (hotspot === 'bumper') {
      setFocusedPart('bumper');
      setActiveAngle('front');
    } else if (hotspot === 'mirror') {
      setFocusedPart('mirror');
      setActiveAngle('left');
    } else if (hotspot === 'door_handle') {
      setFocusedPart('door_handle');
      setActiveAngle('left');
    } else if (hotspot === 'windshield') {
      setFocusedPart('windshield');
      setActiveAngle('front');
    }
  };

  // Dispatch custom event to trigger booking workflow
  const handleReserveSpec = () => {
    const specDetails = `Cấu hình VinFast VF3: Màu ${activeColor.name || 'Nguyên bản'} (${activeColor.category} - ${activeColor.code || 'N/A'}), Nóc: ${roofStyle === 'body' ? 'Cùng màu xe' : roofStyle === 'black' ? 'Đen bóng tương phản' : 'Trắng ánh kim tương phản'}, Mâm: ${wheelsStyle === 'silver' ? 'Bạc OEM' : wheelsStyle === 'black' ? 'Đen bóng Sport' : 'Đồng Satin cổ điển'}, Cùm phanh: ${caliperColor === 'none' ? 'Không sơn' : 'Màu ' + caliperColor.toUpperCase()}, Kính: ${tintLevel}% dán phim cách nhiệt. Tổng phí dự kiến: ${prices.total.toLocaleString('vi-VN')}đ.`;
    
    // Save to clipboard for easy pasting
    navigator.clipboard.writeText(specDetails);
    
    toast.success("📋 Đã sao chép cấu hình xe của bạn!", {
      duration: 50 * 100, // 5 seconds
      icon: '📝'
    });

    // Fire window event to prompt standard booking modal inside App.tsx
    const event = new CustomEvent('open-booking-modal', { detail: { spec: specDetails } });
    window.dispatchEvent(event);
    
    setTimeout(() => {
      toast("Hãy gửi tin nhắn hoặc dán cấu hình vừa lưu vào mô tả đặt lịch để đại lý thi công chuẩn xác nhất!", {
        icon: '🚀'
      });
    }, 800);
  };

  return (
    <div className="w-full bg-slate-900/60 rounded-[42px] border border-white/5 overflow-hidden relative flex flex-col items-center shadow-2xl">
      
      {/* Top Header Controls */}
      <div className="absolute top-6 left-6 right-6 z-20 flex items-center justify-between pointer-events-none select-none">
        <div className="flex items-center gap-2 bg-slate-950/80 backdrop-blur-md border border-white/10 rounded-full px-4 py-2 shadow-xl pointer-events-auto">
          <Palette className="w-3.5 h-3.5 text-blue-500 animate-spin" style={{ animationDuration: '8s' }} />
          <span className="text-[10px] font-black uppercase text-white tracking-wider flex items-center gap-1.5">
            Phối màu VinFast VF3
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
          </span>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          <button 
            onClick={() => setShowHotspots(!showHotspots)}
            className={`flex items-center gap-1.5 backdrop-blur-md border rounded-full px-3.5 py-2 shadow-lg transition-all text-[9px] font-extrabold uppercase tracking-wider ${showHotspots ? 'bg-blue-600 border-blue-500 text-white' : 'bg-slate-950/80 border-white/10 text-slate-300 hover:text-white'}`}
          >
            <Eye className="w-3.5 h-3.5" />
            Hotspots: {showHotspots ? 'Mở' : 'Tắt'}
          </button>
        </div>
      </div>

      {/* Main Workspace Stage */}
      <div className={`w-full relative h-[400px] sm:h-[460px] md:h-[540px] lg:h-[600px] flex items-center justify-center p-6 select-none bg-gradient-to-b ${envConfigs[environment].bgColor} transition-all duration-[1200ms] ease-in-out overflow-hidden`}>
        
        {/* Atmosphere grids */}
        <div className={`absolute inset-0 ${envConfigs[environment].gridColor} bg-[size:32px_32px] opacity-15 pointer-events-none transition-all duration-1000`} />

        {/* Dynamic Studio Ambient Spotlight reflection backdrop */}
        <div 
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] md:w-[800px] lg:w-[1000px] h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] rounded-full blur-[100px] pointer-events-none transition-all duration-[1000ms] ease-in-out opacity-90"
          style={{ 
            background: environment !== 'studio' 
              ? envConfigs[environment].spotlight 
              : `radial-gradient(circle, ${cleanHex}28 0%, transparent 70%)` 
          }}
        />

        {/* Seamless Soft Studio Wall Base */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[340px] sm:w-[500px] md:w-[660px] lg:w-[820px] h-[200px] sm:h-[260px] md:h-[340px] lg:h-[420px] bg-gradient-to-tr from-slate-100/90 via-white to-slate-200/90 rounded-[180px] filter blur-[22px] shadow-[0_12px_45px_rgba(0,0,0,0.03)] opacity-95" />
        </div>

        {/* Loading Spinner */}
        {loading && !error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-30 bg-slate-950/15 backdrop-blur-md">
            <div className="relative flex items-center justify-center">
              <div className="w-14 h-14 rounded-full border-t-2 border-b-2 border-blue-600 animate-spin" />
              <Palette className="w-5 h-5 text-blue-600 absolute animate-pulse" />
            </div>
            <span className="text-[10px] uppercase font-black tracking-widest text-slate-700 mt-4 animate-pulse bg-white/80 px-3 py-1.5 rounded-full shadow-md">
              Bộ lọc HSL đang thiết kế màu xe...
            </span>
          </div>
        )}

        {/* Error State View */}
        {error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-35 bg-white/95 p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-3">
              <AlertTriangle className="w-6 h-6 text-red-500" />
            </div>
            <p className="text-sm font-black text-slate-800 uppercase tracking-wider">Không tải được mã hình</p>
            <button 
              onClick={handleRetry}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-4 py-2 rounded-full shadow-lg transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Thử tải lại
            </button>
          </div>
        )}
        
        {/* Main Simulated Car Body Frame */}
        <div className="relative w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl flex items-center justify-center min-h-[220px] sm:min-h-[280px] md:min-h-[340px] lg:min-h-[400px] z-10 transition-transform duration-500 hover:scale-[1.01]">
          <motion.div 
            className="relative w-[340px] sm:w-[420px] md:w-[500px] lg:w-[580px] h-auto p-2"
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: loading ? 0.94 : 1, opacity: loading ? 0 : 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            {activeAngle === 'front-left' ? (
              <>
                {/* Direct Image element with CSS transition for hardware accelerated, real-time smooth color morphs */}
                <img 
                  src={imgSrc}
                  alt="VinFast VF3 Car Customizer"
                  className="w-full h-auto select-none pointer-events-none relative z-10"
                  style={{ 
                    filter: imageFilter,
                    mixBlendMode: 'multiply',
                    transition: 'filter 0.9s cubic-bezier(0.2, 0.8, 0.2, 1)',
                    willChange: 'filter'
                  }}
                  onLoad={() => setLoading(false)}
                  onError={handleImageError}
                  referrerPolicy="no-referrer"
                />

                {/* Custom Dual-Tone Roof Mask Overlay */}
                {roofStyle !== 'body' && (
                  <div 
                    className="absolute inset-0 z-12 pointer-events-none transition-all duration-700 ease-in-out"
                    style={{
                      clipPath: "polygon(34% 41%, 38% 35.5%, 62.5% 35%, 65% 40%, 62.5% 44%, 43% 44.5%)",
                      background: roofStyle === 'black' 
                        ? 'linear-gradient(to bottom, rgba(5,5,10,0.94) 0%, rgba(20,20,30,0.85) 100%)' 
                        : 'linear-gradient(to bottom, rgba(255,255,255,0.95) 0%, rgba(230,235,245,0.8) 100%)',
                      boxShadow: roofStyle === 'black' 
                        ? 'inset 0 1px 1px rgba(255,255,255,0.1)' 
                        : 'inset 0 1px 1px rgba(255,255,255,0.5)',
                      opacity: 0.88,
                      mixBlendMode: roofStyle === 'black' ? 'multiply' : 'normal'
                    }}
                  />
                )}

                {/* Custom Interactive Windows Tint Mask Overlay */}
                {tintLevel > 0 && (
                  <div 
                    className="absolute inset-0 z-11 pointer-events-none transition-all duration-500 ease-in-out"
                    style={{
                      clipPath: "polygon(41.5% 42.5%, 44% 39%, 56% 39%, 58.5% 42.5%, 57.5% 47.5%, 45% 48%)",
                      backgroundColor: `rgba(15, 23, 42, ${tintLevel === 80 ? 0.85 : 0.55})`,
                      backdropFilter: `blur(${tintLevel === 80 ? '1.5px' : '0.5px'})`,
                      mixBlendMode: 'multiply',
                      opacity: 0.9
                    }}
                  />
                )}

                {/* FRONT WHEEL CUSTOM PAINT & CALIPERS */}
                <div 
                  className="absolute z-13 rounded-full overflow-hidden transition-all duration-700 pointer-events-none"
                  style={{
                    left: '19.8%',
                    top: '61.6%',
                    width: '16.2%',
                    height: '25.8%',
                  }}
                >
                  {/* Brake Caliper Overlay */}
                  {caliperColor !== 'none' && (
                    <div 
                      className={`absolute w-3 h-3 rounded-full transition-colors duration-500`}
                      style={{
                        left: '52%',
                        top: '36%',
                        backgroundColor: caliperColor === 'red' ? '#e11d48' 
                          : caliperColor === 'yellow' ? '#f59e0b' 
                          : caliperColor === 'green' ? '#10b981' 
                          : '#2563eb',
                        filter: 'drop-shadow(0 0 2px rgba(0,0,0,0.8)) saturate(1.4) brightness(1.2)',
                        clipPath: "polygon(0% 0%, 100% 0%, 80% 100%, 20% 100%)",
                        transform: 'rotate(-25deg)',
                        zIndex: 14
                      }}
                    />
                  )}

                  {/* Alloy Ring Surface */}
                  <div 
                    className={`w-full h-full rounded-full border-[1.5px] border-black/80 transition-all duration-[800ms] ${
                      wheelsStyle === 'black' 
                        ? 'bg-gradient-to-tr from-slate-950 via-slate-900 to-slate-800/80 brightness-75 ring-1 ring-white/10' 
                        : wheelsStyle === 'bronze'
                        ? 'bg-gradient-to-tr from-amber-950/90 via-amber-900/80 to-[#7c2d12] brightness-90 saturate-110 border-amber-950/40'
                        : 'bg-transparent'
                    }`}
                    style={{
                      opacity: wheelsStyle === 'silver' ? 0 : 0.85,
                      mixBlendMode: wheelsStyle === 'black' ? 'normal' : 'multiply'
                    }}
                  >
                    {wheelsStyle !== 'silver' && (
                      <div className="absolute inset-0 flex items-center justify-center opacity-65 radial-spokes" />
                    )}
                  </div>
                </div>

                {/* REAR WHEEL CUSTOM PAINT & CALIPERS */}
                <div 
                  className="absolute z-13 rounded-full overflow-hidden transition-all duration-700 pointer-events-none"
                  style={{
                    left: '67.4%',
                    top: '60.6%',
                    width: '15.6%',
                    height: '25.2%',
                  }}
                >
                  {/* Brake Caliper Overlay (Rear) */}
                  {caliperColor !== 'none' && (
                    <div 
                      className={`absolute w-2.5 h-2.5 rounded-full transition-colors duration-500`}
                      style={{
                        left: '52%',
                        top: '36%',
                        backgroundColor: caliperColor === 'red' ? '#e11d48' 
                          : caliperColor === 'yellow' ? '#f59e0b' 
                          : caliperColor === 'green' ? '#10b981' 
                          : '#2563eb',
                        filter: 'drop-shadow(0 0 2px rgba(0,0,0,0.8)) saturate(1.4) brightness(1.2)',
                        clipPath: "polygon(0% 0%, 100% 0%, 80% 100%, 20% 100%)",
                        transform: 'rotate(-25deg)',
                        zIndex: 14
                      }}
                    />
                  )}

                  {/* Alloy Ring Surface */}
                  <div 
                    className={`w-full h-full rounded-full border-[1.5px] border-black/80 transition-all duration-[800ms] ${
                      wheelsStyle === 'black' 
                        ? 'bg-gradient-to-tr from-slate-950 via-slate-900 to-slate-800/80 brightness-75 ring-1 ring-white/10' 
                        : wheelsStyle === 'bronze'
                        ? 'bg-gradient-to-tr from-amber-950/90 via-amber-900/80 to-[#7c2d12] brightness-90 saturate-110 border-amber-950/40'
                        : 'bg-transparent'
                    }`}
                    style={{
                      opacity: wheelsStyle === 'silver' ? 0 : 0.85,
                      mixBlendMode: wheelsStyle === 'black' ? 'normal' : 'multiply'
                    }}
                  >
                    {wheelsStyle !== 'silver' && (
                      <div className="absolute inset-0 flex items-center justify-center opacity-65 radial-spokes" />
                    )}
                  </div>
                </div>

                {/* Glossy Sheen Overlay Animation on color shift */}
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={cleanHex + "-sheen"}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none z-20"
                    style={{ 
                      transform: 'skewX(-28deg)',
                      mixBlendMode: 'overlay',
                      clipPath: 'polygon(5% 0%, 95% 0%, 90% 100%, 0% 100%)'
                    }}
                    initial={{ left: '-150%', opacity: 0 }}
                    animate={{ left: '150%', opacity: [0, 0.9, 0.9, 0] }}
                    transition={{ duration: 1.3, ease: 'easeInOut' }}
                  />
                </AnimatePresence>

                {/* Glowing Hotspots blueprint tech HUD lines */}
                {showHotspots && !loading && (
                <>
                  {/* Architectural Technical Connecting Lines - Replaced with pristine direct hotspots */}

                  {/* Glowing Interactive Hotspot HUD Pins on Vehicle Body */}
                  <div className="absolute inset-0 z-30 pointer-events-auto">

                    {/* Pin 1: NÓC XE (Sliders) */}
                    <div 
                      className="absolute z-40 group" 
                      style={{ left: '42%', top: '17.5%', transform: 'translate(-50%, -50%)' }}
                    >
                      <button 
                        onClick={() => triggerHotspotOption('roof')}
                        className={`flex items-center gap-1.5 bg-slate-950/90 border rounded-full px-2 py-1 text-[8px] sm:text-[9px] font-extrabold uppercase tracking-widest shadow-lg cursor-pointer transition-all active:scale-95 ${
                          activeHotspot === 'roof' 
                            ? 'bg-purple-600 border-purple-400 ring-4 ring-purple-500/20 scale-105 text-white' 
                            : 'border-purple-500/30 text-purple-300 hover:border-purple-400 hover:scale-105'
                        }`}
                      >
                        <Sliders className="w-2.5 h-2.5" />
                        <span className="hidden sm:inline-block">Nóc Xe</span>
                        <span className="w-1 h-1 rounded-full bg-purple-400 animate-pulse" />
                      </button>
                      <AnimatePresence>
                        {activeHotspot === 'roof' && (
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.9, y: 5 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 5 }}
                            className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-slate-950/95 border border-purple-500/35 p-3.5 rounded-2xl shadow-2xl z-[110] w-52 text-left backdrop-blur-md"
                          >
                            <div className="flex items-center justify-between mb-1.5">
                              <p className="text-[10px] font-black text-purple-400 uppercase tracking-widest flex items-center gap-1">
                                🌌 Loại Màu Mái Nóc
                              </p>
                              <button 
                                onClick={(e) => { e.stopPropagation(); setActiveHotspot(null); }}
                                className="text-slate-400 hover:text-white text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-full bg-white/5"
                              >
                                ✕
                              </button>
                            </div>
                            <p className="text-[8.5px] text-slate-400 mb-2 font-medium">Hiện tại: {roofStyle === 'body' ? 'Đồng bộ thân xe' : roofStyle === 'black' ? 'Mái Đen Piano' : 'Mái Trắng Ánh Kim'}</p>
                            <div className="grid grid-cols-3 gap-1">
                              {[
                                { id: 'body', label: 'Một màu' },
                                { id: 'black', label: 'Bóng Đen' },
                                { id: 'white', label: 'Bóng Trắng' }
                              ].map((item) => (
                                <button 
                                  key={item.id}
                                  onClick={(e) => { e.stopPropagation(); setRoofStyle(item.id as any); }}
                                  className={`px-1 py-1 text-[8.5px] font-black uppercase rounded text-center transition-all ${roofStyle === item.id ? 'bg-purple-600 text-white font-bold shadow-md' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}
                                >
                                  {item.label}
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Pin 2: KÍNH PHIM SƯỜN (Shield) */}
                    <div 
                      className="absolute z-40 group" 
                      style={{ left: '48%', top: '41%', transform: 'translate(-50%, -50%)' }}
                    >
                      <button 
                        onClick={() => triggerHotspotOption('tint')}
                        className={`flex items-center gap-1.5 bg-slate-950/90 border rounded-full px-2 py-1 text-[8px] sm:text-[9px] font-extrabold uppercase tracking-widest shadow-lg cursor-pointer transition-all active:scale-95 ${
                          activeHotspot === 'tint' 
                            ? 'bg-blue-600 border-blue-400 ring-4 ring-blue-500/20 scale-105 text-white' 
                            : 'border-blue-500/30 text-blue-300 hover:border-blue-400 hover:scale-105'
                        }`}
                      >
                        <Shield className="w-2.5 h-2.5" />
                        <span className="hidden sm:inline-block">Kính Phim</span>
                        <span className="w-1 h-1 rounded-full bg-blue-450 animate-pulse" />
                      </button>
                      <AnimatePresence>
                        {activeHotspot === 'tint' && (
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.9, y: 5 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 5 }}
                            className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-slate-950/95 border border-blue-500/35 p-3.5 rounded-2xl shadow-2xl z-[110] w-52 text-left backdrop-blur-md"
                          >
                            <div className="flex items-center justify-between mb-1.5">
                              <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest flex items-center gap-1">
                                🛡️ Phim Sườn Cách Nhiệt
                              </p>
                              <button 
                                onClick={(e) => { e.stopPropagation(); setActiveHotspot(null); }}
                                className="text-slate-400 hover:text-white text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-full bg-white/5"
                              >
                                ✕
                              </button>
                            </div>
                            <p className="text-[8.5px] text-slate-400 mb-2 font-medium">Truyền sáng: {tintLevel === 0 ? 'Zin trong suốt' : `${tintLevel}% Dark`}</p>
                            <div className="grid grid-cols-3 gap-1">
                              {[
                                { id: 0, label: 'Trong suốt' },
                                { id: 50, label: 'Râm 50%' },
                                { id: 80, label: 'Đen 80%' }
                              ].map((item) => (
                                <button 
                                  key={item.id}
                                  onClick={(e) => { e.stopPropagation(); setTintLevel(item.id as any); }}
                                  className={`px-1 py-1 text-[8.5px] font-black uppercase rounded text-center transition-all ${tintLevel === item.id ? 'bg-blue-600 text-white font-bold shadow-md' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}
                                >
                                  {item.label}
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Pin 3: THÂN XE SƠN DECAL (Palette) */}
                    <div 
                      className="absolute z-40 group" 
                      style={{ left: '54%', top: '54%', transform: 'translate(-50%, -50%)' }}
                    >
                      <button 
                        onClick={() => triggerHotspotOption('paint')}
                        className={`flex items-center gap-1.5 bg-slate-950/90 border rounded-full px-2 py-1 text-[8px] sm:text-[9px] font-extrabold uppercase tracking-widest shadow-lg cursor-pointer transition-all active:scale-95 ${
                          activeHotspot === 'paint' 
                            ? 'bg-pink-600 border-pink-400 ring-4 ring-pink-500/20 scale-105 text-white' 
                            : 'border-pink-500/30 text-pink-300 hover:border-pink-400 hover:scale-105'
                        }`}
                      >
                        <Palette className="w-2.5 h-2.5" />
                        <span className="hidden sm:inline-block">Thân Xe</span>
                        <span className="w-1 h-1 rounded-full bg-pink-400 animate-pulse" />
                      </button>
                      <AnimatePresence>
                        {activeHotspot === 'paint' && (
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.9, y: 5 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 5 }}
                            className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-slate-950/95 border border-pink-500/35 p-3.5 rounded-2xl shadow-2xl z-[110] w-60 text-left backdrop-blur-md"
                          >
                            <div className="flex items-center justify-between mb-1.5">
                              <p className="text-[10px] font-black text-pink-400 uppercase tracking-widest flex items-center gap-1">
                                🎨 Màu Sơn Thân Vỏ
                              </p>
                              <button 
                                onClick={(e) => { e.stopPropagation(); setActiveHotspot(null); }}
                                className="text-slate-400 hover:text-white text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-full bg-white/5"
                              >
                                ✕
                              </button>
                            </div>
                            <div className="mb-2">
                              <p className="text-[9px] text-white font-black uppercase leading-tight">{activeColor.name}</p>
                              <p className="text-[8px] text-slate-400 font-bold mt-0.5">Mã màu: {activeColor.code} • Finish: {activeColor.finish}</p>
                            </div>
                            <button 
                              onClick={(e) => { e.stopPropagation(); setActiveTab('custom'); setActiveHotspot(null); toast("Sử dụng bảng chọn màu RGB bên dưới để phối tự do!"); }}
                              className="w-full py-1.5 bg-gradient-to-r from-pink-500 to-indigo-600 text-white rounded-xl text-[8.5px] font-black uppercase tracking-widest shadow-md hover:brightness-110 active:scale-98 transition-all"
                            >
                              Phối màu tự do 🛠️
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Pin 4: MÂM XE DƯỚI (Settings) */}
                    <div 
                      className="absolute z-40 group" 
                      style={{ left: '27.8%', top: '74.4%', transform: 'translate(-50%, -50%)' }}
                    >
                      <button 
                        onClick={() => triggerHotspotOption('wheels')}
                        className={`flex items-center gap-1.5 bg-slate-950/90 border rounded-full px-2 py-1 text-[8px] sm:text-[9px] font-extrabold uppercase tracking-widest shadow-lg cursor-pointer transition-all active:scale-95 ${
                          activeHotspot === 'wheels' 
                            ? 'bg-amber-600 border-amber-400 ring-4 ring-amber-500/20 scale-105 text-white' 
                            : 'border-amber-500/30 text-amber-300 hover:border-amber-400 hover:scale-105'
                        }`}
                      >
                        <Settings className="w-2.5 h-2.5" />
                        <span className="hidden sm:inline-block">Mâm Xe</span>
                        <span className="w-1 h-1 rounded-full bg-amber-400 animate-pulse" />
                      </button>
                      <AnimatePresence>
                        {activeHotspot === 'wheels' && (
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.9, y: 5 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 5 }}
                            className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-slate-950/95 border border-amber-500/35 p-3.5 rounded-2xl shadow-2xl z-[110] w-52 text-left backdrop-blur-md"
                          >
                            <div className="flex items-center justify-between mb-1.5">
                              <p className="text-[10px] font-black text-amber-400 uppercase tracking-widest flex items-center gap-1">
                                ⚙️ Thẩm Mỹ Lăzăng
                              </p>
                              <button 
                                onClick={(e) => { e.stopPropagation(); setActiveHotspot(null); }}
                                className="text-slate-400 hover:text-white text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-full bg-white/5"
                              >
                                ✕
                              </button>
                            </div>
                            <p className="text-[8.5px] text-slate-400 mb-2 font-medium">Hiện tại: {wheelsStyle === 'silver' ? 'Hợp kim Bạc Zin' : wheelsStyle === 'black' ? 'Đen bóng Piano' : 'Đồng mờ Satin'}</p>
                            <div className="grid grid-cols-3 gap-1">
                              {[
                                { id: 'silver', label: 'Bạc Zin' },
                                { id: 'black', label: 'Bóng Đen' },
                                { id: 'bronze', label: 'Satin Đồng' }
                              ].map((item) => (
                                <button 
                                  key={item.id}
                                  onClick={(e) => { e.stopPropagation(); setWheelsStyle(item.id as any); }}
                                  className={`px-1 py-1 text-[8.5px] font-black uppercase rounded text-center transition-all ${wheelsStyle === item.id ? 'bg-amber-600 text-white font-bold shadow-md' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}
                                >
                                  {item.label}
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Pin 5: CÙM PHANH HEO DẦU (Activity) */}
                    <div 
                      className="absolute z-40 group" 
                      style={{ left: '23%', top: '70.5%', transform: 'translate(-50%, -50%)' }}
                    >
                      <button 
                        onClick={() => triggerHotspotOption('caliper')}
                        className={`flex items-center gap-1.5 bg-slate-950/90 border rounded-full px-2 py-1 text-[8px] sm:text-[9px] font-extrabold uppercase tracking-widest shadow-lg cursor-pointer transition-all active:scale-95 ${
                          activeHotspot === 'caliper' 
                            ? 'bg-red-600 border-red-400 ring-4 ring-red-500/20 scale-105 text-white' 
                            : 'border-red-500/30 text-red-300 hover:border-red-400 hover:scale-105'
                        }`}
                      >
                        <Activity className="w-2.5 h-2.5" />
                        <span className="hidden sm:inline-block">Cùm Phanh</span>
                        <span className="w-1 h-1 rounded-full bg-red-400 animate-pulse" />
                      </button>
                      <AnimatePresence>
                        {activeHotspot === 'caliper' && (
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.9, y: 5 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 5 }}
                            className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-slate-950/95 border border-red-500/35 p-3.5 rounded-2xl shadow-2xl z-[110] w-64 text-left backdrop-blur-md"
                          >
                            <div className="flex items-center justify-between mb-1.5">
                              <p className="text-[10px] font-black text-red-400 uppercase tracking-widest flex items-center gap-1">
                                🛑 Heo Dầu Thể Thao
                              </p>
                              <button 
                                onClick={(e) => { e.stopPropagation(); setActiveHotspot(null); }}
                                className="text-slate-400 hover:text-white text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-full bg-white/5"
                              >
                                ✕
                              </button>
                            </div>
                            <p className="text-[8.5px] text-slate-400 mb-1.5 font-medium">Sơn heo dầu: {caliperColor === 'none' ? 'Zin chưa sơn' : caliperColor.toUpperCase() + ' SPORT'}</p>
                            <div className="grid grid-cols-5 gap-1">
                              {[
                                { id: 'none', label: 'Zin' },
                                { id: 'red', label: 'Đỏ' },
                                { id: 'yellow', label: 'Vàng' },
                                { id: 'green', label: 'Xanh' },
                                { id: 'blue', label: 'Lam' }
                              ].map((item) => (
                                <button 
                                  key={item.id}
                                  onClick={(e) => { e.stopPropagation(); setCaliperColor(item.id as any); }}
                                  className={`px-1 py-1 text-[7.5px] font-black uppercase rounded text-center transition-all ${caliperColor === item.id ? 'bg-red-600 text-white font-bold shadow-md' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}
                                >
                                  {item.label}
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Pin 6: ĐÈN PHA (Sparkles) */}
                    <div 
                      className="absolute z-40 group" 
                      style={{ left: '9.3%', top: '49.5%', transform: 'translate(-50%, -50%)' }}
                    >
                      <button 
                        onClick={() => triggerHotspotOption('headlight')}
                        className={`flex items-center gap-1.5 bg-slate-950/90 border rounded-full px-2 py-1 text-[8px] sm:text-[9px] font-extrabold uppercase tracking-widest shadow-lg cursor-pointer transition-all active:scale-95 ${
                          activeHotspot === 'headlight' 
                            ? 'bg-sky-600 border-sky-450 ring-4 ring-sky-500/20 scale-105 text-white' 
                            : 'border-sky-500/30 text-sky-300 hover:border-sky-450 hover:scale-105'
                        }`}
                      >
                        <Sparkles className="w-2.5 h-2.5" />
                        <span className="hidden sm:inline-block">Đèn Pha</span>
                        <span className="w-1 h-1 rounded-full bg-sky-400 animate-pulse" />
                      </button>
                      <AnimatePresence>
                        {activeHotspot === 'headlight' && (
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.9, y: 5 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 5 }}
                            className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-slate-950/95 border border-sky-500/35 p-3.5 rounded-2xl shadow-2xl z-[110] w-52 text-left backdrop-blur-md"
                          >
                            <div className="flex items-center justify-between mb-1.5">
                              <p className="text-[10px] font-black text-sky-400 uppercase tracking-widest flex items-center gap-1">
                                💡 Thiết Kế Đèn Pha
                              </p>
                              <button 
                                onClick={(e) => { e.stopPropagation(); setActiveHotspot(null); }}
                                className="text-slate-400 hover:text-white text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-full bg-white/5"
                              >
                                ✕
                              </button>
                            </div>
                            <p className="text-[8.5px] text-slate-400 mb-2 font-medium">Hiện tại: {headlightStyle === 'zin' ? 'Zin Halogen nguyên bản' : headlightStyle === 'smoked' ? 'Chóa Pha Khói Thể Thao' : 'Siêu Sáng Laser Bi-LED'}</p>
                            <div className="grid grid-cols-3 gap-1">
                              {[
                                { id: 'zin', label: 'Zin' },
                                { id: 'smoked', label: 'Chóa khói' },
                                { id: 'led', label: 'Bi-LED' }
                              ].map((item) => (
                                <button 
                                  key={item.id}
                                  onClick={(e) => { e.stopPropagation(); setHeadlightStyle(item.id as any); }}
                                  className={`px-1 py-1 text-[8.5px] font-black uppercase rounded text-center transition-all ${headlightStyle === item.id ? 'bg-sky-600 text-white font-bold shadow-md' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}
                                >
                                  {item.label}
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Pin 7: CẢN TRƯỚC (Shield) */}
                    <div 
                      className="absolute z-40 group" 
                      style={{ left: '10%', top: '61.5%', transform: 'translate(-50%, -50%)' }}
                    >
                      <button 
                        onClick={() => triggerHotspotOption('bumper')}
                        className={`flex items-center gap-1.5 bg-slate-950/90 border rounded-full px-2 py-1 text-[8px] sm:text-[9px] font-extrabold uppercase tracking-widest shadow-lg cursor-pointer transition-all active:scale-95 ${
                          activeHotspot === 'bumper' 
                            ? 'bg-emerald-600 border-emerald-450 ring-4 ring-emerald-500/20 scale-105 text-white' 
                            : 'border-emerald-500/30 text-emerald-300 hover:border-emerald-450 hover:scale-105'
                        }`}
                      >
                        <Shield className="w-2.5 h-2.5" />
                        <span className="hidden sm:inline-block">Cản Trước</span>
                        <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                      </button>
                      <AnimatePresence>
                        {activeHotspot === 'bumper' && (
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.9, y: 5 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 5 }}
                            className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-slate-950/95 border border-emerald-500/35 p-3.5 rounded-2xl shadow-2xl z-[110] w-52 text-left backdrop-blur-md"
                          >
                            <div className="flex items-center justify-between mb-1.5">
                              <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest flex items-center gap-1">
                                🛡️ Chất Liệu Cản Trước
                              </p>
                              <button 
                                onClick={(e) => { e.stopPropagation(); setActiveHotspot(null); }}
                                className="text-slate-400 hover:text-white text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-full bg-white/5"
                              >
                                ✕
                              </button>
                            </div>
                            <p className="text-[8.5px] text-slate-400 mb-2 font-medium">Hiện tại: {bumperStyle === 'matte_black' ? 'Hạt Nhựa Đen ABS Zin' : bumperStyle === 'glossy_black' ? 'Đen Bóng Luxury' : 'Sơn Phủ Siêu Bền Raptor'}</p>
                            <div className="grid grid-cols-3 gap-1">
                              {[
                                { id: 'matte_black', label: 'Nhựa đen' },
                                { id: 'glossy_black', label: 'Bóng Đen' },
                                { id: 'raptor', label: 'Raptor' }
                              ].map((item) => (
                                <button 
                                  key={item.id}
                                  onClick={(e) => { e.stopPropagation(); setBumperStyle(item.id as any); }}
                                  className={`px-1 py-1 text-[8.5px] font-black uppercase rounded text-center transition-all ${bumperStyle === item.id ? 'bg-emerald-600 text-white font-bold shadow-md' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}
                                >
                                  {item.label}
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Pin 8: GƯƠNG CHIẾU HẬU (Eye) */}
                    <div 
                      className="absolute z-40 group" 
                      style={{ left: '29.5%', top: '41.5%', transform: 'translate(-50%, -50%)' }}
                    >
                      <button 
                        onClick={() => triggerHotspotOption('mirror')}
                        className={`flex items-center gap-1.5 bg-slate-950/90 border rounded-full px-2 py-1 text-[8px] sm:text-[9px] font-extrabold uppercase tracking-widest shadow-lg cursor-pointer transition-all active:scale-95 ${
                          activeHotspot === 'mirror' 
                            ? 'bg-amber-600 border-amber-450 ring-4 ring-amber-500/20 scale-105 text-white' 
                            : 'border-amber-500/30 text-amber-300 hover:border-amber-450 hover:scale-105'
                        }`}
                      >
                        <Eye className="w-2.5 h-2.5" />
                        <span className="hidden sm:inline-block">Ốp Gương</span>
                        <span className="w-1 h-1 rounded-full bg-amber-400 animate-pulse" />
                      </button>
                      <AnimatePresence>
                        {activeHotspot === 'mirror' && (
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.9, y: 5 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 5 }}
                            className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-slate-950/95 border border-amber-500/35 p-3.5 rounded-2xl shadow-2xl z-[110] w-52 text-left backdrop-blur-md"
                          >
                            <div className="flex items-center justify-between mb-1.5">
                              <p className="text-[10px] font-black text-amber-400 uppercase tracking-widest flex items-center gap-1">
                                🔍 Ốp Gương Chiếu Hậu
                              </p>
                              <button 
                                onClick={(e) => { e.stopPropagation(); setActiveHotspot(null); }}
                                className="text-slate-400 hover:text-white text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-full bg-white/5"
                              >
                                ✕
                              </button>
                            </div>
                            <p className="text-[8.5px] text-slate-400 mb-2 font-medium">Hiện tại: {mirrorStyle === 'matte_black' ? 'Nhựa Đen ABS Zin' : mirrorStyle === 'body_color' ? 'Cùng màu sơn Cabin' : 'Ốp Vân Carbon 3D'}</p>
                            <div className="grid grid-cols-3 gap-1">
                              {[
                                { id: 'matte_black', label: 'Đen Zin' },
                                { id: 'body_color', label: 'Theo Màu' },
                                { id: 'carbon', label: 'Carbon' }
                              ].map((item) => (
                                <button 
                                  key={item.id}
                                  onClick={(e) => { e.stopPropagation(); setMirrorStyle(item.id as any); }}
                                  className={`px-1 py-1 text-[8.5px] font-black uppercase rounded text-center transition-all ${mirrorStyle === item.id ? 'bg-amber-600 text-white font-bold shadow-md' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}
                                >
                                  {item.label}
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Pin 9: TAY NẮM CỬA (Plus) */}
                    <div 
                      className="absolute z-40 group" 
                      style={{ left: '55%', top: '46.5%', transform: 'translate(-50%, -50%)' }}
                    >
                      <button 
                        onClick={() => triggerHotspotOption('door_handle')}
                        className={`flex items-center gap-1.5 bg-slate-950/90 border rounded-full px-2 py-1 text-[8px] sm:text-[9px] font-extrabold uppercase tracking-widest shadow-lg cursor-pointer transition-all active:scale-95 ${
                          activeHotspot === 'door_handle' 
                            ? 'bg-pink-600 border-pink-450 ring-4 ring-pink-500/20 scale-105 text-white' 
                            : 'border-pink-500/30 text-pink-300 hover:border-pink-450 hover:scale-105'
                        }`}
                      >
                        <Plus className="w-2.5 h-2.5" />
                        <span className="hidden sm:inline-block">Tay Nắm</span>
                        <span className="w-1 h-1 rounded-full bg-pink-400 animate-pulse" />
                      </button>
                      <AnimatePresence>
                        {activeHotspot === 'door_handle' && (
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.9, y: 5 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 5 }}
                            className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-slate-950/95 border border-pink-500/35 p-3.5 rounded-2xl shadow-2xl z-[110] w-52 text-left backdrop-blur-md"
                          >
                            <div className="flex items-center justify-between mb-1.5">
                              <p className="text-[10px] font-black text-pink-400 uppercase tracking-widest flex items-center gap-1">
                                🚪 Ốp Tay Nắm Cửa
                              </p>
                              <button 
                                onClick={(e) => { e.stopPropagation(); setActiveHotspot(null); }}
                                className="text-slate-400 hover:text-white text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-full bg-white/5"
                              >
                                ✕
                              </button>
                            </div>
                            <p className="text-[8.5px] text-slate-400 mb-2 font-medium">Hiện tại: {doorHandleStyle === 'matte_black' ? 'Nhựa Đen Nhám' : doorHandleStyle === 'glossy_black' ? 'Đen Bóng Sport' : 'Ốp Carbon Bóng'}</p>
                            <div className="grid grid-cols-3 gap-1">
                              {[
                                { id: 'matte_black', label: 'Đen Zin' },
                                { id: 'glossy_black', label: 'Đen Bóng' },
                                { id: 'carbon', label: 'Carbon' }
                              ].map((item) => (
                                <button 
                                  key={item.id}
                                  onClick={(e) => { e.stopPropagation(); setDoorHandleStyle(item.id as any); }}
                                  className={`px-1 py-1 text-[8.5px] font-black uppercase rounded text-center transition-all ${doorHandleStyle === item.id ? 'bg-pink-600 text-white font-bold shadow-md' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}
                                >
                                  {item.label}
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Pin 10: KÍNH CHẮN GIÓ (Sun) */}
                    <div 
                      className="absolute z-40 group" 
                      style={{ left: '22%', top: '31%', transform: 'translate(-50%, -50%)' }}
                    >
                      <button 
                        onClick={() => triggerHotspotOption('windshield')}
                        className={`flex items-center gap-1.5 bg-slate-950/90 border rounded-full px-2 py-1 text-[8px] sm:text-[9px] font-extrabold uppercase tracking-widest shadow-lg cursor-pointer transition-all active:scale-95 ${
                          activeHotspot === 'windshield' 
                            ? 'bg-blue-600 border-blue-450 ring-4 ring-blue-500/20 scale-105 text-white' 
                            : 'border-blue-500/30 text-blue-300 hover:border-blue-450 hover:scale-105'
                        }`}
                      >
                        <Sun className="w-2.5 h-2.5" />
                        <span className="hidden sm:inline-block">Kính Lái</span>
                        <span className="w-1 h-1 rounded-full bg-blue-450 animate-pulse" />
                      </button>
                      <AnimatePresence>
                        {activeHotspot === 'windshield' && (
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.9, y: 5 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 5 }}
                            className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-slate-950/95 border border-blue-500/35 p-3.5 rounded-2xl shadow-2xl z-[110] w-52 text-left backdrop-blur-md"
                          >
                            <div className="flex items-center justify-between mb-1.5">
                              <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest flex items-center gap-1">
                                ☀️ Phim Kính Lái Cách Nhiệt
                              </p>
                              <button 
                                onClick={(e) => { e.stopPropagation(); setActiveHotspot(null); }}
                                className="text-slate-400 hover:text-white text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-full bg-white/5"
                              >
                                ✕
                              </button>
                            </div>
                            <p className="text-[8.5px] text-slate-400 mb-2 font-medium">Hiện tại: {windshieldTint === 'none' ? 'Bản Zin Không Dán Phim' : windshieldTint === 'vkool' ? 'V-Kool VK70 Siêu Cách Nhiệt' : '3M Crystalline CR60 đỉnh cao'}</p>
                            <div className="grid grid-cols-3 gap-1">
                              {[
                                { id: 'none', label: 'Zin' },
                                { id: 'vkool', label: 'V-Kool' },
                                { id: 'crystalline', label: '3M CR60' }
                              ].map((item) => (
                                <button 
                                  key={item.id}
                                  onClick={(e) => { e.stopPropagation(); setWindshieldTint(item.id as any); }}
                                  className={`px-1 py-1 text-[8.5px] font-black uppercase rounded text-center transition-all ${windshieldTint === item.id ? 'bg-blue-600 text-white font-bold shadow-md' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}
                                >
                                  {item.label}
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                  </div>
                </>
                )}
              </>
            ) : (
              /* Beautiful Cropped Angle for other viewpoints */
              <div className="relative w-full aspect-[1.78] rounded-[28px] overflow-hidden bg-transparent z-10 p-2 flex items-center justify-center">
                <div 
                  className="w-[340px] sm:w-[420px] md:w-[500px] lg:w-[580px] h-[190px] sm:h-[235px] md:h-[280px] lg:h-[325px] rounded-[24px] relative transition-all duration-500 ease-out shadow-inner"
                  style={{
                    backgroundImage: `url(${imgSrc})`,
                    backgroundSize: CAR_ANGLES_CONFIG[activeAngle].size,
                    backgroundPosition: CAR_ANGLES_CONFIG[activeAngle].pos,
                    backgroundRepeat: 'no-repeat',
                    filter: imageFilter,
                    mixBlendMode: 'multiply',
                    // Hardware acceleration & smoother rendering
                    transform: 'translate3d(0, 0, 0)',
                    willChange: 'filter, background-position',
                  }}
                />
                
                {/* Visual perspective angle watermark / label overlay inside the preview corner */}
                <span className="absolute bottom-4 right-4 bg-slate-950/75 backdrop-blur-md text-white/90 text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border border-white/5 shadow-md flex items-center gap-1.5 pointer-events-none">
                  {CAR_ANGLES_CONFIG[activeAngle].label}
                  <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse" />
                </span>
              </div>
            )}
          </motion.div>

          {/* Realistic Floor Dropped Shadow */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[85%] h-[24px] bg-[radial-gradient(ellipse_at_center,rgba(15,23,42,0.45)_0%,rgba(0,0,0,0)_70%)] blur-[5px] z-0 pointer-events-none" />
        </div>

        {/* Floating color description tag */}
        <div className="absolute bottom-4 left-6 z-20 pointer-events-none select-none">
          <p className="text-[9px] text-slate-600 font-bold uppercase tracking-widest flex items-center justify-center gap-1.5 bg-white/95 border border-slate-200/80 shadow-md px-3.5 py-1.5 rounded-full backdrop-blur-md">
            <span>VinFast VF3</span>
            <span className="w-1 h-1 bg-indigo-600 rounded-full" />
            <span className="text-slate-900 flex items-center gap-1.5 font-black">
              {activeColor.name}
            </span>
          </p>
        </div>

        {/* Atmosphere/Lighting Toggles */}
        <div className="absolute bottom-4 right-6 z-20 flex gap-1.5 pointer-events-auto">
          {(['studio', 'neon', 'sunset', 'aurora'] as const).map((env) => (
            <button 
              key={env}
              onClick={() => {
                setEnvironment(env);
                toast(`Chuyển bối cảnh: ${envConfigs[env].desc}`, { icon: '🌌' });
              }}
              className={`w-7 h-7 rounded-full flex items-center justify-center border transition-all hover:scale-105 active:scale-90 ${
                environment === env 
                  ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg' 
                  : 'bg-white/90 border-slate-200 text-slate-600 hover:text-slate-900'
              }`}
              title={envConfigs[env].desc}
            >
              {env === 'studio' && <Sun className="w-3.5 h-3.5" />}
              {env === 'neon' && <Moon className="w-3.5 h-3.5" />}
              {env === 'sunset' && <Flame className="w-3.5 h-3.5" />}
              {env === 'aurora' && <Activity className="w-3.5 h-3.5" />}
            </button>
          ))}
        </div>

      </div>

      {/* CHI TIẾT BỘ PHẬN ĐANG CHỌN • LIVE CLOSEUP INSPECTOR */}
      <div id="closeup-inspector" className="w-full bg-slate-950/95 border-t border-b border-white/10 p-6 flex flex-col gap-6 relative select-none">
        
        {/* Header with Part Navigation buttons */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <span className="text-[9px] font-black uppercase text-indigo-400 tracking-widest flex items-center gap-1.5 mb-1 col-span-full">
              <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-ping" />
              Kính phóng đại kỹ thuật số (Dynamic Closeup View)
            </span>
            <h4 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
              Bộ phận đang kiểm tra: {focusedPart === 'paint' ? 'Thân vỏ & Decal dán cao cấp' 
                                      : focusedPart === 'roof' ? 'Nóc xe phối màu tương phản'
                                      : focusedPart === 'wheels' ? 'Mâm đúc hợp kim thể thao'
                                      : focusedPart === 'caliper' ? 'Hệ thống kẹp phanh thể thao'
                                      : 'Kính sườn cách nhiệt cách âm'}
            </h4>
          </div>

          <div className="flex flex-wrap gap-1.5 bg-white/5 p-1 rounded-2xl border border-white/10">
            {[
              { id: 'paint', label: 'Thân vỏ & Sơn', icon: Palette, color: 'text-pink-400' },
              { id: 'roof', label: 'Nóc Xe', icon: Sliders, color: 'text-purple-400' },
              { id: 'wheels', label: 'Mâm Xe', icon: Settings, color: 'text-amber-400' },
              { id: 'caliper', label: 'Kẹp Phanh', icon: Activity, color: 'text-red-400' },
              { id: 'tint', label: 'Kính Sườn', icon: Shield, color: 'text-blue-400' }
            ].map((part) => (
              <button
                key={part.id}
                onClick={() => {
                  setFocusedPart(part.id as any);
                  setActiveHotspot(part.id === 'paint' ? 'paint' : part.id);
                  if (part.id === 'paint') {
                    setActiveAngle('front-left');
                  } else if (part.id === 'roof') {
                    setActiveAngle('top');
                  } else if (part.id === 'wheels' || part.id === 'caliper' || part.id === 'tint') {
                    setActiveAngle('left');
                  }
                  toast(`Đang phóng to: ${part.label}`, { icon: '🔍' });
                }}
                className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
                  focusedPart === part.id
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 scale-102'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <part.icon className={`w-3 h-3 ${part.color}`} />
                <span>{part.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Major Visual Splitscreen */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Left Column: Live Responsive SVG Closeup Render */}
          <div className="lg:col-span-6 flex items-center justify-center bg-slate-900/50 rounded-3xl border border-white/5 p-8 relative overflow-hidden h-[300px] sm:h-[340px] md:h-[380px]">
            {/* Visual Backgrid decorative */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.05)_0%,transparent_75%)] animate-pulse" style={{ animationDuration: '4s' }} />
            <div className="absolute inset-0 bg-[size:16px_16px] opacity-10" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)' }} />

            <AnimatePresence mode="wait">
              {focusedPart === 'paint' && (
                <motion.div 
                  key="paint-closeup"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full flex flex-col items-center justify-center gap-4 relative"
                >
                  <div className="relative w-44 h-44 rounded-3xl p-0.5 shadow-2xl overflow-hidden group">
                    <div 
                      className="absolute inset-0 rounded-3xl transition-transform duration-700 ease-out"
                      style={{ 
                        background: activeColor.hex.startsWith('linear') ? activeColor.hex : activeColor.hex,
                        boxShadow: 'inset 0 16px 32px rgba(255,255,255,0.25), inset 0 -16px 32px rgba(0,0,0,0.4), 0 10px 30px rgba(0,0,0,0.5)'
                      }}
                    />
                    
                    {/* Reflective Sheen effect */}
                    <div className="absolute inset-0 pointer-events-none rounded-3xl overflow-hidden">
                      <div className="absolute top-0 -left-[100%] w-[300%] h-[30%] bg-gradient-to-b from-white/20 to-transparent rotate-[35deg] transform translate-y-3 skew-y-12" />
                      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.15)_0%,transparent_50%,rgba(0,0,0,0.2)_100%)]" />
                      
                      {/* Metallic Specks if Metallic/Satin */}
                      {(activeColor.category === 'Satin' || activeColor.category === 'Chrome' || activeColor.category === 'ColorShift') && (
                        <div className="absolute inset-0 opacity-20 mix-blend-overlay bg-[size:4px_4px]" style={{ backgroundImage: 'radial-gradient(circle, white 0.5px, transparent 0.5px)' }} />
                      )}
                    </div>

                    {/* Center details */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/10 text-center">
                      <span className="text-[10px] font-black text-white/50 bg-black/35 px-2.5 py-1 rounded-full uppercase tracking-widest border border-white/10 backdrop-blur-sm">
                        {activeColor.category} Premium
                      </span>
                    </div>
                  </div>

                  <div className="text-center">
                    <h5 className="text-xs font-black text-white uppercase tracking-widest">{activeColor.name}</h5>
                    <p className="text-[9px] text-[#fb4a8b] uppercase font-bold mt-1">Mã decal: {activeColor.code}</p>
                  </div>
                </motion.div>
              )}

              {focusedPart === 'roof' && (
                <motion.div 
                  key="roof-closeup"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full flex flex-col items-center justify-center gap-4 relative"
                >
                  <div className="w-56 h-36 border border-white/10 bg-slate-950/80 rounded-2xl p-4 shadow-xl flex flex-col justify-between overflow-hidden relative">
                    <div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'radial-gradient(#38bdf8 0.5px, transparent 0.5px)', backgroundSize: '12px_12px' }} />
                    <div className="text-left">
                      <span className="text-[8px] font-black text-[#a855f7] bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded uppercase tracking-wider block w-fit mb-2">
                        Bản mẫu tương phản 3D
                      </span>
                      <p className="text-[10px] font-bold text-slate-400">Thiết kế nóc:</p>
                      <p className="text-xs font-black text-white uppercase">
                        {roofStyle === 'body' ? 'Đồng bộ màu xe' : roofStyle === 'black' ? 'Mái Đen Bóng Piano' : 'Mái Trắng Ngọc Trai'}
                      </p>
                    </div>

                    {/* Graphic roof representation of car split */}
                    <div className="w-full h-14 rounded-lg flex border border-white/5 overflow-hidden z-10">
                      <div className="w-1/2 flex items-center justify-center text-[9px] font-black uppercase text-slate-500 border-r border-white/5" style={{ background: activeColor.hex }}>
                        <span className="bg-slate-900/60 text-white px-1.5 py-0.5 rounded text-[8px]">Body</span>
                      </div>
                      <div className="w-1/2 flex items-center justify-center text-[9px] font-black uppercase" style={{ background: roofStyle === 'body' ? activeColor.hex : roofStyle === 'black' ? '#07070a' : '#f8fafc', color: roofStyle === 'white' ? '#0a0a0c' : '#f8fafc' }}>
                        <span className="bg-slate-900/60 text-white px-1.5 py-0.5 rounded text-[8px]">Roof</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-[9px] text-slate-400 font-bold uppercase text-center">Nửa trên cabin được đổi tôn màu sắc sảo</p>
                </motion.div>
              )}

              {focusedPart === 'wheels' && (
                <motion.div 
                  key="wheels-closeup"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full flex flex-col items-center justify-center gap-4 relative"
                >
                  {/* Wheel & Spoke detailed SVG */}
                  <div className="w-44 h-44 rounded-full border-4 border-slate-950 flex items-center justify-center shadow-2xl relative bg-slate-900 overflow-hidden animate-none">
                    {/* Tyre Treads inner border */}
                    <div className="absolute inset-2 rounded-full border-[8px] border-slate-900/50 opacity-100 flex items-center justify-center" style={{ strokeDasharray: '4,4' }}>
                      <div className="w-full h-full rounded-full border border-dashed border-slate-800" />
                    </div>

                    {/* Tyre wall depth */}
                    <div className="absolute inset-[15%] rounded-full bg-slate-950 shadow-inner flex items-center justify-center">
                      <p className="text-[7px] text-slate-600 font-black tracking-widest absolute top-1.5">175/75 R16</p>
                      
                      {/* Alloy Rim Inner Body */}
                      <svg viewBox="0 0 100 100" className="w-[82%] h-[82%] rounded-full">
                        {/* Rim shadow */}
                        <circle cx="50" cy="50" r="48" fill="#18181b" />
                        
                        {/* Spokes structure */}
                        <g stroke={wheelsStyle === 'silver' ? '#e4e4e7' : wheelsStyle === 'bronze' ? '#d97706' : '#27272a'} strokeWidth="5" strokeLinecap="round">
                          {/* 5 star spokes */}
                          <line x1="50" y1="50" x2="50" y2="10" />
                          <line x1="50" y1="50" x2="88" y2="38" />
                          <line x1="50" y1="50" x2="74" y2="82" />
                          <line x1="50" y1="50" x2="26" y2="82" />
                          <line x1="50" y1="50" x2="12" y2="38" />
                        </g>

                        {/* Alloy details ring */}
                        <circle cx="50" cy="50" r="40" stroke={wheelsStyle === 'silver' ? '#a1a1aa' : wheelsStyle === 'bronze' ? '#b45309' : '#09090b'} strokeWidth="1.5" fill="none" />
                        <circle cx="50" cy="50" r="28" stroke={wheelsStyle === 'silver' ? '#d4d4d8' : wheelsStyle === 'bronze' ? '#ea580c' : '#18181b'} strokeWidth="1" fill="none" />
                        
                        {/* Center cap cover */}
                        <circle cx="50" cy="50" r="14" fill={wheelsStyle === 'silver' ? '#71717a' : wheelsStyle === 'bronze' ? '#78350f' : '#09090b'} stroke="#000" strokeWidth="1" />
                        <circle cx="50" cy="50" r="4" fill="#1e293b" />
                        {/* Lug nuts */}
                        <circle cx="43" cy="43" r="1.5" fill="#e2e8f0" />
                        <circle cx="57" cy="43" r="1.5" fill="#e2e8f0" />
                        <circle cx="57" cy="57" r="1.5" fill="#e2e8f0" />
                        <circle cx="43" cy="57" r="1.5" fill="#e2e8f0" />
                      </svg>
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-[10px] font-black text-white uppercase tracking-widest">
                      Mâm: {wheelsStyle === 'silver' ? 'Hợp kim màu Bạc Zin' : wheelsStyle === 'black' ? 'Đen bóng Thể Thao' : 'Đồng Mờ Satin'}
                    </p>
                  </div>
                </motion.div>
              )}

              {focusedPart === 'caliper' && (
                <motion.div 
                  key="caliper-closeup"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full flex flex-col items-center justify-center gap-4 relative"
                >
                  {/* Detailed mechanical brake disc + caliper view */}
                  <div className="w-44 h-44 flex items-center justify-center relative">
                    {/* Ventilated Steel Disc Rotor */}
                    <div className="w-40 h-40 rounded-full bg-gradient-to-tr from-slate-400 via-slate-200 to-slate-400 border border-slate-500/40 relative shadow-lg flex items-center justify-center">
                      <div className="absolute inset-4 rounded-full border border-slate-400/60" />
                      <div className="absolute inset-8 rounded-full border border-slate-300" />
                      <div className="absolute inset-12 rounded-full border border-slate-400/80" />
                      <div className="absolute inset-16 rounded-full border border-slate-400/50" />
                      
                      {/* Helical drill cooling holes */}
                      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
                        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                          <g key={deg} transform={`rotate(${deg}, 50, 50)`}>
                            <circle cx="50" cy="18" r="1.2" fill="#1e293b" opacity="0.65" />
                            <circle cx="50" cy="24" r="1.2" fill="#1e293b" opacity="0.65" />
                            <circle cx="50" cy="30" r="1.2" fill="#1e293b" opacity="0.65" />
                            <circle cx="50" cy="36" r="1.2" fill="#1e293b" opacity="0.65" />
                          </g>
                        ))}
                      </svg>
                    </div>

                    {/* Caliper overlay */}
                    <div 
                      className="absolute z-10 w-22 h-14 rounded-2xl flex items-center justify-center shadow-xl border border-white/10"
                      style={{
                        right: '0px',
                        top: '12px',
                        transform: 'rotate(-15deg)',
                        backgroundColor: caliperColor === 'none' ? '#52525b' 
                          : caliperColor === 'red' ? '#dc2626' 
                          : caliperColor === 'yellow' ? '#eab308' 
                          : caliperColor === 'green' ? '#10b981' 
                          : '#2563eb',
                        filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.5))'
                      }}
                    >
                      <div className="text-[8px] font-black text-white tracking-widest uppercase">
                        {caliperColor === 'none' ? 'ZEST' : 'BREMBO'}
                      </div>
                      <div className="absolute bottom-1 right-3 text-[5px] text-white/50 font-bold uppercase">PRO-COATING</div>
                      <div className="w-1.5 h-1.5 rounded-full bg-black/30 absolute left-2 top-2" />
                      <div className="w-1.5 h-1.5 rounded-full bg-black/30 absolute left-2 bottom-2" />
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-[10px] font-black text-white uppercase tracking-widest">
                      Heo dầu sơn tĩnh nhiệt: {caliperColor === 'none' ? 'Nguyên bản (Xám sần)' : caliperColor.toUpperCase() + ' SPORT RACING'}
                    </p>
                  </div>
                </motion.div>
              )}

              {focusedPart === 'tint' && (
                <motion.div 
                  key="tint-closeup"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full flex flex-col items-center justify-center gap-4 relative"
                >
                  <div className="w-56 h-36 border border-white/10 rounded-2xl p-4 bg-slate-950/85 shadow-2xl relative overflow-hidden flex items-center justify-between">
                    <div className="w-1/2 h-full bg-sky-200/20 border-r border-dashed border-white/30 flex flex-col justify-between items-start text-left p-2">
                      <span className="text-[7px] font-black text-sky-400 uppercase bg-sky-500/10 px-1 py-0.5 rounded animate-pulse">Bên Trong</span>
                      <p className="text-[9px] text-slate-300 font-bold mt-2 leading-none">Cảnh quan trung thực</p>
                      <p className="text-[7.5px] text-slate-400 font-medium whitespace-nowrap">Truyền sáng 70%</p>
                    </div>
                    
                    <div 
                      className="w-1/2 h-full flex flex-col justify-between items-end text-right p-2 transition-all duration-500"
                      style={{ 
                        backgroundColor: `rgba(15, 23, 42, ${tintLevel === 0 ? 0.1 : tintLevel === 50 ? 0.55 : 0.85})` 
                      }}
                    >
                      <span className="text-[7px] font-black text-[#60a5fa] bg-indigo-500/20 px-1 py-0.5 rounded uppercase">Bên Ngoài</span>
                      <div className="text-right">
                        <p className="text-[9px] font-black text-white leading-none">Chống UV 99%</p>
                        <p className="text-[8px] text-slate-400 font-medium">{tintLevel === 0 ? 'Trong Suốt' : `${tintLevel}% Dark`}</p>
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-[10px] font-black text-white uppercase tracking-widest">
                      Độ râm kính: {tintLevel === 0 ? 'Trong suốt nguyên bản' : `Phim dán cao cấp ${tintLevel}% sẫm màu`}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column: Specification details of active focusedPart */}
          <div className="lg:col-span-6 flex flex-col gap-4 text-left">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md">
              <span className="text-[8.5px] text-slate-400 uppercase tracking-widest font-extrabold flex items-center gap-1.5 mb-2">
                <Info className="w-3.5 h-3.5 text-blue-400 animate-bounce" style={{ animationDuration: '3s' }} />
                Thông số cao cấp & Quy trình thi hành
              </span>

              <AnimatePresence mode="wait">
                {focusedPart === 'paint' && (
                  <motion.div 
                    key="paint-specs"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-3.5"
                  >
                    <div>
                      <h4 className="text-xs font-black text-white uppercase tracking-widest">Màng bọc TeckWrap Cao Cấp Hoa Kỳ</h4>
                      <p className="text-[10px] font-semibold text-slate-400 mt-1 uppercase leading-relaxed">
                        Màng nhựa dẻo PVC đổi màu decal xe dày 155 microns siêu chịu bền, keo acrylic chất bền, tích hợp công nghệ rãnh dẫn khí thoát bóng tốt giúp bảo vệ sơn gốc cực cao khỏi sỏi cát chảo sượt, chống tia cực tím mài mòn bạc màu sơn.
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-3 pb-3 border-b border-white/5">
                      <div className="bg-slate-900/50 p-2.5 rounded-xl border border-white/5 text-center sm:text-left">
                        <span className="text-[8px] font-black text-slate-400 uppercase block">Thương hiệu</span>
                        <span className="text-[10.5px] font-black text-pink-400 uppercase">TeckWrap / 3M USA</span>
                      </div>
                      <div className="bg-slate-900/50 p-2.5 rounded-xl border border-white/5 text-center sm:text-left">
                        <span className="text-[8px] font-black text-slate-400 uppercase block">Chế độ bảo hành</span>
                        <span className="text-[10.5px] font-black text-emerald-400 uppercase">05 Năm Toàn Diện</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-[11px] font-bold text-slate-300">
                      <span>Phí dự kiến (Bao gồm nhân lực dệt ôm hoàn chỉnh):</span>
                      <span className="text-sm font-black text-pink-400 underline">{prices.wrapBase.toLocaleString('vi-VN')} ₫</span>
                    </div>
                  </motion.div>
                )}

                {focusedPart === 'roof' && (
                  <motion.div 
                    key="roof-specs"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-3.5"
                  >
                    <div>
                      <h4 className="text-xs font-black text-white uppercase tracking-widest">Nóc xe tương phản cá tính (Contrast Roof)</h4>
                      <p className="text-[10px] font-semibold text-slate-400 mt-1 uppercase leading-relaxed">
                        Tách cấu trúc cabin nóc và kính đen sành điệu làm cân bằng tỉ lệ thân VF3 thon lùn, trông ngầu hơn hẳn như các mẫu xe SUV việt dã cao sang. Decal siêu bóng mờ bảo vệ vùng đọng mưa nắng cực kỳ bền vững.
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-3 pb-3 border-b border-white/5">
                      <div className="bg-slate-900/50 p-2.5 rounded-xl border border-white/5 text-center sm:text-left">
                        <span className="text-[8px] font-black text-slate-400 uppercase block">Chất liệu màng</span>
                        <span className="text-[10.5px] font-black text-purple-400 uppercase">Super Gloss Acrylic</span>
                      </div>
                      <div className="bg-slate-900/50 p-2.5 rounded-xl border border-white/5 text-center sm:text-left">
                        <span className="text-[8px] font-black text-slate-400 uppercase block">Ưu điểm</span>
                        <span className="text-[10.5px] font-black text-purple-400 uppercase">Thiết kế dán mịn viền</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-[8.5px] font-black text-slate-400 uppercase">Thay đổi màu nóc:</span>
                      <div className="flex gap-1 animate-none">
                        {['body', 'black', 'white'].map((item) => (
                          <button
                            key={item}
                            onClick={() => {
                              setRoofStyle(item as any);
                              toast.success('Đã xếp kiểu màu mái!');
                            }}
                            className={`px-2.5 py-1 text-[8px] font-black uppercase rounded transition-all cursor-pointer ${roofStyle === item ? 'bg-purple-600 text-white' : 'bg-white/10 text-slate-400 hover:bg-white/15'}`}
                          >
                            {item === 'body' ? 'Zin' : item === 'black' ? 'Đen' : 'Trắng'}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-bold text-slate-300">
                      <span>Phí trọn gói dịch dán nóc:</span>
                      <span className="text-sm font-black text-purple-400 underline">{prices.roofCost.toLocaleString('vi-VN')} ₫</span>
                    </div>
                  </motion.div>
                )}

                {focusedPart === 'wheels' && (
                  <motion.div 
                    key="wheels-specs"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-3.5"
                  >
                    <div>
                      <h4 className="text-xs font-black text-white uppercase tracking-widest">Sơn đổi màu mâm lazang đúc hợp kim</h4>
                      <p className="text-[10px] font-semibold text-slate-400 mt-1 uppercase leading-relaxed">
                        Tăng độ khỏe khoắn, bề thế cho dàn chân xe nhỏ VF3. Quy trình ráp sơn tĩnh nhiệt đa lớp độ dính siêu bền và chống trầy cát lội mương cực đỉnh. Ba màu sơn Bạc sần Zin, Đen Bóng Sport hoặc Đồng sẫm Retro.
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-3 pb-3 border-b border-white/5">
                      <div className="bg-slate-900/50 p-2.5 rounded-xl border border-white/5 text-center sm:text-left">
                        <span className="text-[8px] font-black text-slate-400 uppercase block">Quy trình</span>
                        <span className="text-[10.5px] font-black text-amber-500 uppercase">Sơn tĩnh điện nhiệt hầm</span>
                      </div>
                      <div className="bg-slate-900/50 p-2.5 rounded-xl border border-white/5 text-center sm:text-left">
                        <span className="text-[8px] font-black text-slate-400 uppercase block">Khuyên chọn</span>
                        <span className="text-[10.5px] font-black text-amber-500 uppercase">Màu Đen hợp decal sặc sỡ</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[8.5px] font-black text-slate-400 uppercase">Đổi kiểu mâm:</span>
                      <div className="flex gap-1 animate-none">
                        {['silver', 'black', 'bronze'].map((item) => (
                          <button
                            key={item}
                            onClick={() => {
                              setWheelsStyle(item as any);
                              toast.success('Đã sơn dọn mâm bánh!');
                            }}
                            className={`px-2.5 py-1 text-[8px] font-black uppercase rounded transition-all cursor-pointer ${wheelsStyle === item ? 'bg-amber-600 text-white' : 'bg-white/10 text-slate-400 hover:bg-white/15'}`}
                          >
                            {item === 'silver' ? 'Bạc' : item === 'black' ? 'Đen' : 'Đồng'}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-bold text-slate-300">
                      <span>Phí sơn dọn toàn diện mâm bánh (4 cái):</span>
                      <span className="text-sm font-black text-amber-500 underline">{prices.rimCost.toLocaleString('vi-VN')} ₫</span>
                    </div>
                  </motion.div>
                )}

                {focusedPart === 'caliper' && (
                  <motion.div 
                    key="caliper-specs"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-3.5"
                  >
                    <div>
                      <h4 className="text-xs font-black text-white uppercase tracking-widest">Sơn heo dầu cùm phanh tản nhiệt High-temp</h4>
                      <p className="text-[10px] font-semibold text-slate-400 mt-1 uppercase leading-relaxed">
                        Trang hoàng cùm dĩa phanh thể thao lấp ló sau căm mâm bằng chất liệu sơn chống cháy ceramic đặc chủng, không phồng rộp nứt nẻ sau thời gian dồn phanh thắng kịch liệt tích nhiệt lên đến 600°C.
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-3 pb-3 border-b border-white/5">
                      <div className="bg-slate-900/50 p-2.5 rounded-xl border border-white/5 text-center sm:text-left">
                        <span className="text-[8px] font-black text-slate-400 uppercase block">Vật liệu sơn</span>
                        <span className="text-[10.5px] font-black text-red-500 uppercase">Sơn sấy Ceramic chịu nhiệt</span>
                      </div>
                      <div className="bg-slate-900/50 p-2.5 rounded-xl border border-white/5 text-center sm:text-left">
                        <span className="text-[8px] font-black text-slate-400 uppercase block">Thời gian</span>
                        <span className="text-[10.5px] font-black text-red-500 uppercase">Lắp ráp trong 90 Phút</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[8.5px] font-black text-slate-400 uppercase">Màu phanh:</span>
                      <div className="flex flex-wrap gap-1 animate-none">
                        {['none', 'red', 'yellow', 'green', 'blue'].map((item) => (
                          <button
                            key={item}
                            onClick={() => {
                              setCaliperColor(item as any);
                              toast.success('Đã áp màu cùm heo!');
                            }}
                            className={`px-2 py-1 text-[8px] font-black uppercase rounded transition-all cursor-pointer ${caliperColor === item ? 'bg-red-600 text-white' : 'bg-white/10 text-slate-400 hover:bg-white/15'}`}
                          >
                            {item === 'none' ? 'Zin' : item === 'red' ? 'Đỏ' : item === 'yellow' ? 'Vàng' : item === 'green' ? 'Xanh' : 'Lam'}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-bold text-slate-300">
                      <span>Phí trọn gói sơn heo cùm dầu:</span>
                      <span className="text-sm font-black text-red-500 underline">{prices.caliperCost.toLocaleString('vi-VN')} ₫</span>
                    </div>
                  </motion.div>
                )}

                {focusedPart === 'tint' && (
                  <motion.div 
                    key="tint-specs"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-3.5"
                  >
                    <div>
                      <h4 className="text-xs font-black text-white uppercase tracking-widest">Dán Phim Cách Nhiệt Quang Học 3M Crystalline</h4>
                      <p className="text-[10px] font-semibold text-slate-400 mt-1 uppercase leading-relaxed">
                        Tấm che nắng chống nóng cao cấp hàng đầu Việt Nam. Lọc bỏ hoàn toàn bớt nhiệt hừng hực, dọn mát chỗ nghỉ ngơi bên trong xe VinFast và tối ưu lực điều hòa cho hành trình mùa hè dài oi ả.
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-3 pb-3 border-b border-white/5">
                      <div className="bg-slate-900/50 p-2.5 rounded-xl border border-white/5 text-center sm:text-left">
                        <span className="text-[8px] font-black text-slate-400 uppercase block">Cản hồng ngoại</span>
                        <span className="text-[10.5px] font-black text-blue-400 uppercase">IRR 97% Tránh bỏng rát</span>
                      </div>
                      <div className="bg-slate-900/50 p-2.5 rounded-xl border border-white/5 text-center sm:text-left">
                        <span className="text-[8px] font-black text-slate-400 uppercase block">Cách tia UV</span>
                        <span className="text-[10.5px] font-black text-blue-400 uppercase">UVR 99.9% Bảo vệ da</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[8.5px] font-black text-slate-400 uppercase">Chỉnh độ râm:</span>
                      <div className="flex gap-1 animate-none">
                        {[0, 50, 80].map((item) => (
                          <button
                            key={item}
                            onClick={() => {
                              setTintLevel(item as any);
                              toast.success('Đã áp dụng mức che kính!');
                            }}
                            className={`px-2.5 py-1 text-[8px] font-black uppercase rounded transition-all cursor-pointer ${tintLevel === item ? 'bg-blue-600 text-white' : 'bg-white/10 text-slate-400 hover:bg-white/15'}`}
                          >
                            {item === 0 ? 'Trong' : `${item}%`}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-bold text-slate-300">
                      <span>Phí dán 3M Crystalline sườn sành điệu:</span>
                      <span className="text-sm font-black text-blue-400 underline">{prices.tintCost.toLocaleString('vi-VN')} ₫</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed p-4 border border-indigo-500/10 rounded-2xl bg-indigo-500/5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse shrink-0" />
              <span>Góc dọn xe thực quy tụ máy dán sấy khí nén tỉ mỉ cho chất liệu bám sát mép gân ô tô.</span>
            </div>
          </div>

        </div>

      </div>

      {/* DETAILED DIRECT TUNING EXTERIOR RAIL BAR */}
      <div className="w-full px-6 py-4.5 border-t border-slate-100 bg-slate-50/50 flex flex-wrap items-center justify-between gap-4">
        
        {/* Quick config - Roof */}
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider flex items-center gap-1">
            <Sliders className="w-3 h-3 text-indigo-500" /> Phối Nóc Xe:
          </span>
          <div className="flex gap-1.5">
            {[
              { id: 'body', label: 'Cùng màu xe' },
              { id: 'black', label: 'Nóc Đen Bóng' },
              { id: 'white', label: 'Mái Trắng Ngọc' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setRoofStyle(item.id as any);
                  toast.success(`Đã đổi mái: ${item.label}`);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-[9px] font-semibold uppercase tracking-wider border transition-all ${
                  roofStyle === item.id 
                    ? 'bg-slate-950 border-slate-950 text-white shadow-inner scale-102 font-extrabold' 
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Quick config - Wheels */}
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider flex items-center gap-1">
            <Settings className="w-3 h-3 text-amber-500 animation-pulse" /> Mâm Thể Thao:
          </span>
          <div className="flex gap-1.5">
            {[
              { id: 'silver', label: 'Mâm Bạc Nguyên Bản' },
              { id: 'black', label: 'Đen Bóng Sport' },
              { id: 'bronze', label: 'Đồng Xước Satin' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setWheelsStyle(item.id as any);
                  toast.success(`Thiết kế mâm: ${item.label}`);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-[9px] font-semibold uppercase tracking-wider border transition-all ${
                  wheelsStyle === item.id 
                    ? 'bg-amber-600 border-amber-600 text-white shadow-md font-extrabold scale-102' 
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Upgraded Info & HUD configurator / Cost sheets console pane */}
      <div className="w-full bg-white border-t border-slate-100 p-6 flex flex-col gap-5">
        
        {/* Navigation Tabs */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 flex-wrap gap-2">
          <div className="flex gap-1 bg-slate-100 p-1 rounded-2xl">
            <button 
              onClick={() => setActiveTab('presets')}
              className={`px-4 py-2 text-[10px] font-black uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5 ${
                activeTab === 'presets' 
                  ? 'bg-indigo-600 text-white shadow-md' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Sparkles className="w-3 h-3" /> VF3 Hot Trend 🔥
            </button>
            
            <button 
              onClick={() => setActiveTab('custom')}
              className={`px-4 py-2 text-[10px] font-black uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5 ${
                activeTab === 'custom' 
                  ? 'bg-pink-600 text-white shadow-md' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Palette className="w-3 h-3" /> Tự Phối Màu Cá Nhân 🎨
            </button>

            <button 
              onClick={() => setActiveTab('configs')}
              className={`px-4 py-2 text-[10px] font-black uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5 ${
                activeTab === 'configs' 
                  ? 'bg-slate-900 text-white shadow-md' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Info className="w-3 h-3" /> Thông số kỹ thuật
            </button>

            <button 
              onClick={() => setActiveTab('pricing')}
              className={`px-4 py-2 text-[10px] font-black uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5 ${
                activeTab === 'pricing' 
                  ? 'bg-emerald-600 text-white shadow-md' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <DollarSign className="w-3 h-3" /> Giá ước tính 💰
            </button>
          </div>

          <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-500" />
            BÀN THIẾT KẾ MÔ PHỎNG VF3 V2.5
          </div>
        </div>

        {/* Tab CONTENT: presets list */}
        {activeTab === 'presets' && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {VF3_TRENDING_PRESETS.map((preset) => (
              <div 
                key={preset.name}
                onClick={() => handleApplyPreset(preset)}
                className="group relative border border-slate-100 p-3.5 rounded-2xl hover:border-indigo-500 bg-slate-50/50 hover:bg-indigo-50/10 cursor-pointer transition-all flex items-center gap-3 shadow-sm"
              >
                <div 
                  className="w-10 h-10 rounded-full shrink-0 shadow-inner border border-white relative flex items-center justify-center overflow-hidden" 
                  style={{ backgroundColor: preset.bodyColor.hex }}
                >
                  {/* Roof indicator */}
                  <div 
                    className="absolute inset-[15%] rounded-full border border-black/10"
                    style={{ 
                      backgroundColor: preset.roof === 'white' ? '#ffffff' : preset.roof === 'black' ? '#0a0a0c' : preset.bodyColor.hex 
                    }}
                  />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <p className="text-[10px] font-black text-slate-800 uppercase truncate leading-none">{preset.name}</p>
                    <span className="shrink-0 scale-90 px-1 py-0.5 bg-indigo-100 text-indigo-700 rounded text-[7px] font-black uppercase tracking-widest">{preset.badge}</span>
                  </div>
                  <p className="text-[8.5px] text-slate-500 font-bold tracking-tight">{preset.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab CONTENT: Custom Hex Color Wheel */}
        {activeTab === 'custom' && (
          <div className="p-4 bg-slate-50 border border-slate-100 rounded-3xl grid grid-cols-1 md:grid-cols-12 gap-5 text-left">
            <div className="md:col-span-5 flex flex-col gap-3">
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">1. Chọn Màu Ước Mơ</span>
              <div className="flex items-center gap-3">
                <input 
                  type="color" 
                  value={customHex} 
                  onChange={handleCustomColorChange}
                  className="w-16 h-16 rounded-2xl border-2 border-white shadow-lg cursor-pointer bg-transparent"
                />
                <div className="flex-1">
                  <p className="text-xs font-black text-slate-800 uppercase">Bút màu RGB</p>
                  <p className="text-[11px] font-mono text-slate-400 font-semibold uppercase">{customHex}</p>
                  <span className="text-[8px] text-slate-500 font-medium block">Kéo ô tròn để chọn tỉ lệ sắc tố đậm sâu.</span>
                </div>
              </div>
            </div>

            <div className="md:col-span-7 flex flex-col justify-between gap-4">
              <div>
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest block mb-2.5">2. Chọn Chất Liệu Decal Đổi Màu</span>
                <div className="flex flex-wrap gap-1.5">
                  {(['Gloss', 'Matte', 'Satin', 'Chrome', 'ColorShift'] as const).map((finish) => (
                    <button
                      key={finish}
                      onClick={() => handleCustomMaterialChange(finish)}
                      className={`px-3 py-1.5 text-[9px] font-black uppercase tracking-wider rounded-xl transition-all border ${
                        customCategory === finish 
                          ? 'bg-pink-600 border-pink-600 text-white shadow-md' 
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {finish === 'Gloss' ? 'Glossy (Bóng)' 
                       : finish === 'Matte' ? 'Matte (Nhám)' 
                       : finish === 'Satin' ? 'Satin (Mờ)' 
                       : finish === 'Chrome' ? 'Chrome (Tráng Gương)' 
                       : 'ColorShift (Chuyển Sắc)'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="text-[8.5px] font-semibold text-slate-400 uppercase tracking-wider bg-white p-2 border border-slate-100 rounded-xl leading-relaxed flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-500 shrink-0" />
                <span>Màu tự chọn sẽ đồng bộ tức thì trên mô hình 3D. Sử dụng bộ lọc kĩ thuật số để tối ưu hóa tương phản.</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab CONTENT: Interactive parameters specification sheet */}
        {activeTab === 'configs' && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
            <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-2xl">
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block mb-1">Màu sơn thân dán</span>
              <p className="text-[11px] font-black text-slate-800 uppercase tracking-tight truncate">{activeColor.name}</p>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="w-2.5 h-2.5 rounded-full border border-white" style={{ backgroundColor: cleanHex }} />
                <span className="text-[9px] font-extrabold text-indigo-600 uppercase">{activeColor.category} Premium</span>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-2xl">
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block mb-1">Nóc xe phối</span>
              <p className="text-[11px] font-black text-slate-800 uppercase tracking-tight">
                {roofStyle === 'body' ? 'Cùng màu thân xe' : roofStyle === 'black' ? 'Đen Bóng Thể Thao' : 'Trắng Ngọc Trai VIP'}
              </p>
              <span className="text-[8px] text-slate-400 block mt-1">Chất liệu nóc tráng gương dày dặn bảo vệ trần.</span>
            </div>

            <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-2xl">
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block mb-1">Mâm & Kẹp phanh</span>
              <p className="text-[11px] font-black text-slate-800 uppercase tracking-tight">
                Mâm {wheelsStyle === 'silver' ? 'OEM' : wheelsStyle === 'black' ? 'Đen Sport' : 'Đồng mờ'} | Phanh {caliperColor === 'none' ? 'Zin' : caliperColor.toUpperCase()}
              </p>
              <span className="text-[8px] text-slate-400 block mt-1">Ưu đãi miễn phí sơn cùm phanh thể thao cao cấp.</span>
            </div>

            <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-2xl font-mono">
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-sans tracking-widest block mb-1">Cấu hình HSL bộ lọc</span>
              <p className="text-[10.5px] font-black text-slate-800">
                H: {targetHsl.h}° S: {targetHsl.s}% L: {targetHsl.l}%
              </p>
              <span className="text-[8px] text-slate-500 block truncate mt-1">
                Tone dịch chuyển: {hueShift}° (Filter H: {hueShift} S: {saturateVal} B: {brightnessVal})
              </span>
            </div>
          </div>
        )}

        {/* Tab CONTENT: Detailed quoting itemization with costs */}
        {activeTab === 'pricing' && (
          <div className="bg-slate-50 border border-slate-100 p-4 rounded-3xl text-left scale-98 transition-all">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[10px] font-sans font-bold text-slate-600">
              <div className="space-y-2">
                <div className="flex justify-between border-b border-dashed border-slate-200 pb-1.5">
                  <span className="uppercase tracking-wide font-medium">Bản mã dán Decal thân xe ({activeColor.category})</span>
                  <span className="font-extrabold text-slate-900">{prices.wrapBase.toLocaleString('vi-VN')} ₫</span>
                </div>
                <div className="flex justify-between border-b border-dashed border-slate-200 pb-1.5">
                  <span className="uppercase tracking-wide font-medium">Mái trần tương phản (Contrast Roof)</span>
                  <span className="font-extrabold text-slate-900">{prices.roofCost === 0 ? 'N/A' : `+ ${prices.roofCost.toLocaleString('vi-VN')} ₫`}</span>
                </div>
                <div className="flex justify-between border-b border-dashed border-slate-200 pb-1.5">
                  <span className="uppercase tracking-wide font-medium">Phim cách nhiệt dán kính VIP</span>
                  <span className="font-extrabold text-slate-900">{prices.tintCost === 0 ? 'Chưa chọn' : `+ ${prices.tintCost.toLocaleString('vi-VN')} ₫`}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between border-b border-dashed border-slate-200 pb-1.5">
                  <span className="uppercase tracking-wide font-medium">Sơn lazang Lazang / Mâm xe ({wheelsStyle.toUpperCase()})</span>
                  <span className="font-extrabold text-slate-900">{prices.rimCost === 0 ? 'Mâm OEM' : `+ ${prices.rimCost.toLocaleString('vi-VN')} ₫`}</span>
                </div>
                <div className="flex justify-between border-b border-dashed border-slate-200 pb-1.5">
                  <span className="uppercase tracking-wide font-medium">Sơn cùm heo dầu phanh Brembo ({caliperColor !== 'none' ? caliperColor.toUpperCase() : 'ZIN'})</span>
                  <span className="font-extrabold text-slate-900">{prices.caliperCost === 0 ? 'Zin' : `+ ${prices.caliperCost.toLocaleString('vi-VN')} ₫`}</span>
                </div>
                <div className="flex justify-between border-b border-dashed border-slate-200 pb-1.5 text-indigo-600 font-extrabold font-sans">
                  <span className="uppercase tracking-wide">Tổng chi phí dự kiến</span>
                  <span className="text-sm font-black underline">{prices.total.toLocaleString('vi-VN')} ₫</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Action Trigger Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4.5 border-t border-slate-100">
          <div className="flex items-center gap-2 text-left">
            <Check className="w-4 h-4 text-emerald-500 border border-emerald-500/20 bg-emerald-500/5 rounded-full p-0.5 shrink-0" />
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest block leading-relaxed max-w-xl">
              Giá mang tính chất ước lượng • Dữ liệu bao gồm decal TeckWrap chính hãng bảo hành chống bay màu 5 năm tại Xe Đẹp Pro
            </span>
          </div>

          <button 
            onClick={handleReserveSpec}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-indigo-600/15 transition-all hover:scale-102 active:scale-98 flex items-center justify-center gap-2 shrink-0"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            Đặt lịch & dán màu VF3 này • {prices.total.toLocaleString('vi-VN')} ₫ <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </div>
  );
};
