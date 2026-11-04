import type { Seat } from "@/interfaces/tour/Seat";
import type { MealPlan } from "@/interfaces/tour/MealPlan";

export interface GuestConfig {
  id: string;
  label?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  nationality?: string;
  passportNumber?: string;
  dateOfBirth?: string;
  gender?: string;
  mealPlanId?: number;
  seatId?: number;
  assignedSeat?: Seat | string | null;
  selectedMeals?: MealPlan[];
  specialRequests?: string;
}
