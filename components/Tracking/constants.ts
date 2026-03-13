import { VehicleTracking } from './types';

export const DEFAULT_TRACKING: VehicleTracking[] = [
  {
    id: 'track1',
    licensePlate: '30A-123.45',
    customerName: 'Nguyễn Văn A',
    customerPhone: '0912345678',
    carModel: 'Mercedes-Benz C200',
    technicianName: 'Trần Văn Hùng',
    serviceType: 'Gói Ceramic Pro',
    status: 'working',
    startTime: '2024-03-12T08:00:00Z',
    estimatedEndTime: '2024-03-12T17:00:00Z',
    lastUpdate: '2024-03-12T10:30:00Z',
    currentStepIndex: 1,
    totalAmount: 12500000,
    vehicleImage: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=800',
    steps: [
      { id: 's1', name: 'Tiếp nhận & Kiểm tra xe', status: 'completed', timestamp: '2024-03-12T08:15:00Z', technician: 'Trần Văn Hùng', note: 'Xe có vết xước nhẹ ở cản trước' },
      { id: 's2', name: 'Rửa xe chi tiết', status: 'in-progress', timestamp: '2024-03-12T09:00:00Z', technician: 'Lê Văn Nam' },
      { id: 's3', name: 'Hiệu chỉnh bề mặt sơn', status: 'pending' },
      { id: 's4', name: 'Phủ Ceramic 9H', status: 'pending' },
      { id: 's5', name: 'Kiểm tra cuối & Bàn giao', status: 'pending' }
    ]
  },
  {
    id: 'track2',
    licensePlate: '51G-999.99',
    customerName: 'Trần Thị B',
    customerPhone: '0988776655',
    carModel: 'BMW X5',
    technicianName: 'Nguyễn Hoàng Long',
    serviceType: 'Vệ sinh nội thất & Dán phim',
    status: 'waiting',
    startTime: '2024-03-12T10:00:00Z',
    estimatedEndTime: '2024-03-13T10:00:00Z',
    lastUpdate: '2024-03-12T10:00:00Z',
    currentStepIndex: 0,
    totalAmount: 8500000,
    vehicleImage: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=800',
    steps: [
      { id: 's1', name: 'Tiếp nhận & Kiểm tra xe', status: 'in-progress', timestamp: '2024-03-12T10:05:00Z', technician: 'Nguyễn Hoàng Long' },
      { id: 's2', name: 'Vệ sinh nội thất chuyên sâu', status: 'pending' },
      { id: 's3', name: 'Dán phim cách nhiệt 3M', status: 'pending' },
      { id: 's4', name: 'Kiểm tra cuối & Bàn giao', status: 'pending' }
    ]
  }
];
