import type { TicketStatus } from '../../enums/tourmanagement/TicketStatus';
import type { GenericStatus } from '../../enums/GenericStatus';
import type { Tour } from './Tour';
import type { Seat } from './Seat';
import type { MealPlan } from './MealPlan';
import type { TourReservation } from './TourReservation';

export interface Ticket {
  id?: number;
  ticketNumber: string;
  tour: Tour;
  customer: { id?: number; name?: string };
  assignedSeat?: Seat;
  seatPriceModifier?: number;
  totalPrice?: number;
  bookingDate: string;
  paid: boolean;
  ticketStatus: TicketStatus;
  approvalStatus: GenericStatus;
  hasMealPlan: boolean;
  selectedMeals: MealPlan[];
  reservation?: TourReservation;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: { id?: number; name?: string };
  updatedBy?: { id?: number; name?: string };
  basePrice?: number;
  discountPrice?: number;
  qrCode?: string;
  barcode?: string;
}
