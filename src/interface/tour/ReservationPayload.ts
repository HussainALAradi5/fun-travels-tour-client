import type { Tour } from "@/interface/tour/Tour";

export interface ReservationTicket {
  ticketId: number;
  ticketCode: string;
  seatNumber: string;
  passengerName: string;
  passengerEmail: string;
  passengerPhone: string;
  status: string;
}

export interface ReservationPayload {
  tour: { id: number };
  guests: Array<{
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    nationality: string;
    passportNumber: string;
    dateOfBirth: string;
    gender: string;
    mealPlanId?: number;
    seatId?: number;
    specialRequests?: string;
  }>;
  specialRequests?: string;
}
