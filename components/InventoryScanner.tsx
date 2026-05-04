import React, { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { X, Camera, Package, Search } from 'lucide-react';
import { InventoryItem } from '../types';

interface InventoryScannerProps {
  inventory: InventoryItem[];
  onScan: (item: InventoryItem) => void;
  onClose: () => void;
}

const InventoryScanner: React.FC<InventoryScannerProps> = ({ inventory, onScan, onClose }) => {
  const [error, setError] = useState<string | null>(null);
  const [manualBarcode, setManualBarcode] = useState('');

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      /* verbose= */ false
    );

    scanner.render(
      (decodedText) => {
        const item = inventory.find(i => i.barcode === decodedText || i.id === decodedText);
        if (item) {
          onScan(item);
          scanner.clear();
        } else {
          setError(`Không tìm thấy vật tư với mã: ${decodedText}`);
        }
      },
      (err) => {
        // console.warn(err);
      }
    );

    return () => {
      scanner.clear().catch(error => console.error("Failed to clear scanner", error));
    };
  }, [inventory, onScan]);

  const handleManualSearch = () => {
    const item = inventory.find(i => i.barcode === manualBarcode || i.id === manualBarcode);
    if (item) {
      onScan(item);
    } else {
      setError(`Không tìm thấy vật tư với mã: ${manualBarcode}`);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-slate-900 w-full max-w-md rounded-[32px] overflow-hidden border border-white/10 shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="section-title text-lg mb-0">Quét Mã Vật Tư</h3>
              <p className="section-subtitle mb-0 text-[10px]">Quét QR/Barcode để nhập/xuất kho</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <div className="p-6">
          <div id="reader" className="w-full rounded-2xl overflow-hidden border-2 border-dashed border-white/10 bg-black/40 aspect-square"></div>
          
          {error && (
            <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-sm rounded-xl flex items-center gap-2">
              <Package className="w-4 h-4" />
              {error}
            </div>
          )}

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-white/5"></span>
              </div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-widest">
                <span className="bg-slate-900 px-2 text-slate-500 font-bold">Hoặc nhập mã thủ công</span>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                <input
                  type="text"
                  value={manualBarcode}
                  onChange={(e) => setManualBarcode(e.target.value)}
                  placeholder="Nhập mã vạch..."
                  className="input-premium pl-10 pr-4 py-2 text-sm"
                  onKeyDown={(e) => e.key === 'Enter' && handleManualSearch()}
                />
              </div>
              <button
                onClick={handleManualSearch}
                className="btn-primary px-4 py-2 text-sm"
              >
                Tìm
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white/5 border-t border-white/5 text-center">
          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Đảm bảo mã vạch nằm trong khung hình và đủ ánh sáng</p>
        </div>
      </div>
    </div>
  );
};

export default InventoryScanner;
