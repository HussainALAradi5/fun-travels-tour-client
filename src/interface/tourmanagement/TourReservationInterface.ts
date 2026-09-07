import { GenericStatus } from "@/enums/GenericStatus";
import type { Tour } from "./TourInterface";
import type { User } from "../UserInterface";
import type { Ticket } from "./TicketInterface";
import type { Transaction } from "../TransactionInterface";
import type { Payment } from "../PaymentInterface";

export interface TourReservation {
  id?: number;
  reservationNumber: string;
  tour: Tour;
  user: User;
  requestedSlots: number;
  transactions?: Transaction[];
  payments?: Payment[];
  totalPrice: number;
  status: GenericStatus;
  tickets?: Ticket[]; 
  bookingDate?: string; 
}

export const DEFAULT_RESERVATION: Partial<TourReservation> = {
  reservationNumber: "",
  requestedSlots: 1,
  totalPrice: 0,
  status: GenericStatus.PENDING,
  tickets: [],
  bookingDate: new Date().toISOString()
};