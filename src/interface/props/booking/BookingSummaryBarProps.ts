import type { Seat } from "../../tour/Seat";
import type { MealPlan } from "../../tour/MealPlan";

export interface BookingSummaryBarProps {
  selectedSeat: Seat | null;
  selectedMeals: MealPlan[];
  onConfirm: () => void;
  isBooking: boolean;
}
