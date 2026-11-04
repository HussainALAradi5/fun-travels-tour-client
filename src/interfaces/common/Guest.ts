import type { Seat } from '@/interfaces/tour/Seat';
import type { MealPlan } from '@/interfaces/tour/MealPlan';

export interface Guest {
  id: number;
  name: string;
  seat?: Seat;
  meals: MealPlan[];
}
