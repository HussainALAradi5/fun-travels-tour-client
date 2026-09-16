import type { TicketStatus } from '../../enums/tourmanagement/TicketStatus';
import type { GenericStatus } from '../../enums/GenericStatus';
import type { Tour } from './Tour';
import type { Seat } from './Seat';
import type { User } from '../user/User';

export interface Ticket {
  id?: number;
  ticketNumber: string;
  tour: Partial<Tour>;
  customer: Partial<User>;
  assignedSeat?: Partial<Seat>;
  seatPriceModifier?: number;
  totalPrice?: number;
  bookingDate: string;
  isPaid: boolean;
  ticketStatus: TicketStatus;
  approvalStatus: GenericStatus;
  hasMealPlan: boolean;
  createdAt?: string;
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
  isPaid: false,
  ticketStatus: "PENDING",
  approvalStatus: "PENDING",
  hasMealPlan: false,
  basePrice: 0,
  discountPrice: 0,
};
