import type { Seat } from "@/interface/tour/Seat";
import type { MealPlan } from "@/interface/tour/MealPlan";

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
