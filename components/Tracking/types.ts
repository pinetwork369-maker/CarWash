export type TrackingStatus = 'pending' | 'in-progress' | 'completed';
export type VehicleStatus = 'waiting' | 'working' | 'ready';

export interface TrackingStep {
  id: string;
  name: string;
  status: TrackingStatus;
  timestamp?: string;
  note?: string;
  technician?: string;
  images?: string[];
}

export interface VehicleTracking {
  id: string;
  licensePlate: string;
  customerName: string;
  customerPhone?: string;
  carModel: string;
  technicianName?: string;
  serviceType?: string;
  status: VehicleStatus;
  startTime: string;
  estimatedEndTime: string;
  steps: TrackingStep[];
  currentStepIndex: number;
  lastUpdate: string;
  totalAmount?: number;
  vehicleImage?: string;
}
