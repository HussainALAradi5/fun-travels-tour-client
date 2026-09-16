export interface MealPlanFormValues extends Record<string, unknown> {
  mealName: string;
  mealPrice: number;
  mealDescription: string;
  dietaryTypes: string[];
  spiceLevel: string;
}
