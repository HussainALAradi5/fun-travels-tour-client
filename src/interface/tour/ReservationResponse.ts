import type { GenericStatus } from '../../enums/GenericStatus';
import type { User } from '../user/User';
import type { TourSummary } from './TourSummary';

export interface ReservationResponse {
  id: number;
  reservationNumber: string;
  tour?: TourSummary;
  user?: Partial<User>;
  requestedSlots: number;
  totalPrice: number;
  status: GenericStatus;
  bookingDate?: string;
}

export const DEFAULT_RESERVATION_RESPONSE: Partial<ReservationResponse> = {
  reservationNumber: "",
  requestedSlots: 0,
  totalPrice: 0,
  status: "PENDING",
};
