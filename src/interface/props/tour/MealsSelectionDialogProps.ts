import type { MealPlan } from "../../tour/MealPlan";

export interface MealsSelectionDialogProps {
  open: boolean;
  onClose: () => void;
  availableMeals: MealPlan[];
  selectedMeals: MealPlan[];
  onToggleMeal: (meal: MealPlan) => void;
}
