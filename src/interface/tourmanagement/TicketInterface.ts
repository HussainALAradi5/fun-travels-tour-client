import { GenericStatus } from "@/enums/GenericStatus";
import type { User } from "../UserInterface";
import type { MealPlan } from "./MealPlanInterface";
import type { Tour } from "./TourInterface";
import type { Seat } from "./SeatInterface";
import { TicketStatus } from "@/enums/tourmanagement/TicketStatus";
import type { TourReservation } from "./TourReservationInterface";

export interface Ticket {
  id?: number;
  ticketNumber: string;
  tour: Tour;
  customer: User;
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
  createdBy?: User;
  updatedBy?: User;
  basePrice?: number;
  discountPrice?: number;
  qrCode?: string;
  barcode?: string;
}

export const DEFAULT_TICKET: Partial<Ticket> = {
  paid: false,
  hasMealPlan: false,
  selectedMeals: [],
  ticketStatus: TicketStatus.PENDING,
  approvalStatus: GenericStatus.PENDING,
  basePrice: 0,
  discountPrice: 0,
  totalPrice: 0,
  qrCode: "",
  barcode: "",
};