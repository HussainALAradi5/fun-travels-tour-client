import { useCallback, useState } from "react";
import { SEAT_ORDER } from "@/constants/tour/seatOrder";
import type { Dispatch, SetStateAction } from "react";
import type { MealPlan } from "@/interfaces/tour/MealPlan";
import type { Seat } from "@/interfaces/tour/Seat";
import type { Tour } from "@/interfaces/tour/Tour";
import type { Transportation } from "@/interfaces/tour/Transportation";
import { mealPlanService } from "@/services/tour-management/mealPlanService";
import { seatService } from "@/services/tour-management/seatService";
import { tourService } from "@/services/tour-management/tourService";
import { transportationService } from "@/services/tour-management/transportationService";

type Params = Record<string, string | number | boolean>;
const FETCH_ALL = 100;

/** Tour, seat, meal, and vehicle lists, each loaded through one shared loader. */
export function useTourLists() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [seats, setSeats] = useState<Seat[]>([]);
  const [meals, setMeals] = useState<MealPlan[]>([]);
  const [transportation, setTransportation] = useState<Transportation[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const load = useCallback(async <T,>(setter: Dispatch<SetStateAction<T[]>>, loader: () => Promise<{ content: T[] }>) => {
    setIsLoading(true);
    try {
      const page = await loader();
      setter(page.content);
      return page.content;
    } catch {
      setter([]);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchTours = useCallback((params: Params = {}) => load(setTours, () => tourService.search(params)), [load]);
  const fetchCatalog = useCallback((params: Params = {}) => load(setTours, () => tourService.getCatalog(params)), [load]);
  const fetchMeals = useCallback(() => load(setMeals, () => mealPlanService.getAll({ size: FETCH_ALL })), [load]);
  const fetchTransportation = useCallback(
    (params: Params = {}) => load(setTransportation, () => transportationService.search(params)), [load]);
  const fetchSeats = useCallback(async (transportId: number) => {
    if (transportId) await load(setSeats, () => seatService.search({ transportId, size: FETCH_ALL, ...SEAT_ORDER }));
  }, [load]);

  return {
    tours, seats, setSeats, meals, transportation, setTransportation, isLoading,
    fetchTours, fetchCatalog, fetchMeals, fetchTransportation, fetchSeats,
  };
}
