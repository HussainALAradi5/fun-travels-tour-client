import { GenericStatus } from "@/enums/GenericStatus";
import type { Agency } from "../Agency/AgencyInterface";

export interface MealPlan {
  id?: number;
  mealName: string;
  mealPrice: number;
  mealDescription?: string;
  isVegetarian: boolean;
  isVegan: boolean;
  isGlutenFree: boolean;
  status: GenericStatus;
  agency?: Agency;
}

export const DEFAULT_MEAL_PLAN: Partial<MealPlan> = {
  mealName: "",
  mealPrice: 0,
  isVegetarian: false,
  isVegan: false,
  isGlutenFree: false,
  status: GenericStatus.PENDING
};