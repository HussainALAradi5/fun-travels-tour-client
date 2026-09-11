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
  user?: { id: number };
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
  tickets?: Array<{
    assignedSeat?: { id: number } | null;
    selectedMeals?: Array<{ id: number }>;
  }>;
  requestedSlots?: number;
  specialRequests?: string;
}
