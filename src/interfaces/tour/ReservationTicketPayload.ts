import type { Seat } from "./Seat";
import type { MealPlan } from "./MealPlan";

export interface ReservationTicketPayload {
  assignedSeat?: Partial<Seat> | null;
  selectedMeals?: Partial<MealPlan>[];
}
