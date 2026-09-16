import type { MealDietaryType } from "@/enums/tourmanagement/MealDietaryType";
import type { SpiceLevel } from "@/enums/tourmanagement/SpiceLevel";

export interface MealPlanCreateRequest {
  mealName: string;
  mealPrice: number;
  mealDescription?: string;
  dietaryTypes: MealDietaryType[];
  spiceLevel: SpiceLevel;
}
