import type { MealPlan } from "../../tour/MealPlan";

export interface MealSelectionListProps {
  availableMeals: MealPlan[];
  selectedMeals: MealPlan[];
  onToggleMeal: (meal: MealPlan) => void;
}
