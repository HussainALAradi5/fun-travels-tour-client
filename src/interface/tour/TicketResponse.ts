import type { User } from '../user/User';
import type { GenericStatus } from '../../enums/GenericStatus';
import type { TicketStatus } from '../../enums/tourmanagement/TicketStatus';
import type { TourSummary } from './TourSummary';

export interface TicketResponse {
  id: number;
  ticketNumber: string;
  customer?: Partial<User>;
  tour?: TourSummary;
  assignedSeat?: { id: number; seatCode: string };
  basePrice?: number;
  discountPrice?: number;
  seatPriceModifier?: number;
  totalPrice?: number;
  bookingDate?: string;
  isPaid: boolean;
  ticketStatus: TicketStatus;
  approvalStatus: GenericStatus;
  hasMealPlan: boolean;
  qrCode?: string;
  barcode?: string;
  createdAt?: string;
}

export const DEFAULT_TICKET_RESPONSE: Partial<TicketResponse> = {
  ticketNumber: "",
  isPaid: false,
  ticketStatus: "PENDING",
  approvalStatus: "PENDING",
  hasMealPlan: false,
};

