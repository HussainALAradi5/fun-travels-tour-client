import type { MealDietaryType } from "@/enums/tour-management/MealDietaryType";
import type { SpiceLevel } from "@/enums/tour-management/SpiceLevel";

export interface MealPlanCreateRequest {
  mealName: string;
  mealPrice: number;
  mealDescription?: string;
  dietaryTypes: MealDietaryType[];
  spiceLevel: SpiceLevel;
}
