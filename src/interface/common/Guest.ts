import type { Seat } from '@/interface/tour/Seat';
import type { MealPlan } from '@/interface/tour/MealPlan';

export interface Guest {
  id: number;
  name: string;
  seat?: Seat;
  meals: MealPlan[];
}
