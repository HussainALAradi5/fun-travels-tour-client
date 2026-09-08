import type { GenericStatus } from '../../enums/GenericStatus';

export interface TourResponse {
  id: number;
  tourNumber: string;
  title: string;
  description?: string;
  basePrice: number;
  discountPrice?: number;
  totalPrice?: number;
  numberOfDays: number;
  startDate: string;
  endDate: string;
  maxCapacity: number;
  availableSlots: number;
  status: GenericStatus;
  hasTransportation: boolean;
  startCountry?: { id: number; famousName: string };
  endCountry?: { id: number; famousName: string };
  startCity?: { id: number; name: string };
  endCity?: { id: number; name: string };
  agency?: { id: number; agencyName: string };
  agencyBranch?: { id: number; branchName: string };
  transportation?: { id: number; transportationNumber: string; type?: string };
  createdBy?: { id: number; name: string };
  createdAt?: string;
}
