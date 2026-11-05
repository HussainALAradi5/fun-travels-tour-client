import type { MealPlan } from "../../tour/MealPlan";

export interface MealsSelectionDialogProps {
  open: boolean;
  onClose: () => void;
  availableMeals: MealPlan[];
  selectedMeals: MealPlan[];
  onToggleMeal: (meal: MealPlan) => void;
  /** Copies this traveler's meals to the whole group; hidden for a single traveler. */
  onApplyToAll?: () => void;
}
