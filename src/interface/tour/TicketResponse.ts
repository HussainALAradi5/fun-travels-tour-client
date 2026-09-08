import type { TicketStatus } from '../../enums/tourmanagement/TicketStatus';
import type { GenericStatus } from '../../enums/GenericStatus';

export interface TicketResponse {
  id: number;
  ticketNumber: string;
  customer?: { id: number; name: string };
  tour?: { id: number; tourNumber: string; title: string };
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
