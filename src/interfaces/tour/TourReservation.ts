import type { GenericStatus } from '../../enums/GenericStatus';
import type { Tour } from './Tour';
import type { Ticket } from './Ticket';
import type { Transaction } from '../payment/Transaction';
import type { Payment } from '../payment/Payment';
import type { User } from '../user/User';

export interface TourReservation {
  id?: number;
  reservationNumber: string;
  tour: Tour;
  user: Partial<User>;
  requestedSlots: number;
  transactions?: Transaction[];
  payments?: Payment[];
  totalPrice: number;
  status: GenericStatus;
  tickets?: Ticket[];
  bookingDate?: string;
  holdExpiresAt?: string | null;
}

export const DEFAULT_RESERVATION: Partial<TourReservation> = {
  reservationNumber: "",
  requestedSlots: 1,
  totalPrice: 0,
  status: "PENDING",
};
