import type { Seat } from "../../tour/Seat";
import type { MealPlan } from "../../tour/MealPlan";

export interface GuestConfig {
  id: string;
  label: string;
  assignedSeat: Seat | null;
  selectedMeals: MealPlan[];
}

export interface GuestConfigCardProps {
  guest: GuestConfig;
  onOpenSeatPicker: (id: string) => void;
  onOpenMealPicker: (id: string) => void;
  onRemove?: (id: string) => void;
}
