import type { GenericStatus } from '../../enums/GenericStatus';
import type { Agency } from '../agency/Agency';
import type { MealDietaryType } from '@/enums/tourmanagement/MealDietaryType';
import type { SpiceLevel } from '@/enums/tourmanagement/SpiceLevel';

export interface MealPlan {
  id?: number;
  mealName: string;
  mealPrice: number;
  mealDescription?: string;
  dietaryTypes: MealDietaryType[];
  spiceLevel: SpiceLevel;
  status: GenericStatus;
  agency?: Partial<Agency>;
}
