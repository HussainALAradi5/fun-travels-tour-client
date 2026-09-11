import type { GenericStatus } from '../../enums/GenericStatus';
import type { AgencySummary } from './AgencySummary';

export interface MealPlan {
  id?: number;
  mealName: string;
  mealPrice: number;
  mealDescription?: string;
  isVegetarian: boolean;
  isVegan: boolean;
  isGlutenFree: boolean;
  status: GenericStatus;
  agency?: Partial<AgencySummary>;
}
