import type { GenericStatus } from '../../enums/GenericStatus';
import type { Tour } from './Tour';
import type { Ticket } from './Ticket';
import type { Transaction } from '../payment/Transaction';
import type { Payment } from '../payment/Payment';

export interface TourReservation {
  id?: number;
  reservationNumber: string;
  tour: Tour;
  user: { id?: number; name?: string };
  requestedSlots: number;
  transactions?: Transaction[];
  payments?: Payment[];
  totalPrice: number;
  status: GenericStatus;
  tickets?: Ticket[];
  bookingDate?: string;
}
