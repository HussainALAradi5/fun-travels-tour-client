import type { GenericStatus } from '../../enums/GenericStatus';
import type { Agency } from '../agency/Agency';

export interface MealPlan {
  id?: number;
  mealName: string;
  mealPrice: number;
  mealDescription?: string;
  isVegetarian: boolean;
  isVegan: boolean;
  isGlutenFree: boolean;
  status: GenericStatus;
  agency?: Partial<Agency>;
}
