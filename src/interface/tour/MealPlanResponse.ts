import type { GenericStatus } from '../../enums/GenericStatus';

export interface MealPlanResponse {
  id: number;
  mealName: string;
  mealPrice: number;
  mealDescription?: string;
  isVegetarian: boolean;
  isVegan: boolean;
  isGlutenFree: boolean;
  status: GenericStatus;
}
