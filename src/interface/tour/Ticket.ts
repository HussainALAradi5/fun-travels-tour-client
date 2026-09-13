import type { TicketStatus } from '../../enums/tourmanagement/TicketStatus';
import type { GenericStatus } from '../../enums/GenericStatus';
import type { Tour } from './Tour';
import type { Seat } from './Seat';
import type { MealPlan } from './MealPlan';
import type { TourReservation } from './TourReservation';
import type { User } from '../user/User';

export interface Ticket {
  id?: number;
  ticketNumber: string;
  tour: Tour;
  customer: Partial<User>;
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
  createdBy?: Partial<User>;
  updatedBy?: Partial<User>;
  basePrice?: number;
  discountPrice?: number;
  qrCode?: string;
  barcode?: string;
}

export const DEFAULT_TICKET: Partial<Ticket> = {
  ticketNumber: "",
  tour: { tourNumber: "", title: "", startDate: "", endDate: "", maxCapacity: 0, availableSlots: 0, status: "PENDING", hasTransportation: false, basePrice: 0, discountPrice: 0 } as Tour,
  customer: {},
  bookingDate: "",
  paid: false,
  ticketStatus: "PENDING",
  approvalStatus: "PENDING",
  hasMealPlan: false,
  selectedMeals: [],
  basePrice: 0,
  discountPrice: 0,
};
