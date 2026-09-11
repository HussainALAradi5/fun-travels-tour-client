import type { GenericStatus } from '../../enums/GenericStatus';
import type { CountrySummary } from './CountrySummary';
import type { CitySummary } from './CitySummary';
import type { AgencySummary } from './AgencySummary';
import type { BranchSummary } from './BranchSummary';
import type { TransportationSummary } from './TransportationSummary';
import type { UserSummary } from './UserSummary';

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
  startCountry?: CountrySummary;
  endCountry?: CountrySummary;
  startCity?: CitySummary;
  endCity?: CitySummary;
  agency?: AgencySummary;
  agencyBranch?: BranchSummary;
  transportation?: TransportationSummary;
  createdBy?: UserSummary;
  createdAt?: string;
}

export const DEFAULT_TOUR_RESPONSE: Partial<TourResponse> = {
  tourNumber: "",
  title: "",
  description: "",
  basePrice: 0,
  numberOfDays: 0,
  startDate: "",
  endDate: "",
  maxCapacity: 0,
  availableSlots: 0,
  status: "PENDING",
  hasTransportation: false,
};
