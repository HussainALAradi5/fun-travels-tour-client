export interface GuestConfig {
  id: string;
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
}
