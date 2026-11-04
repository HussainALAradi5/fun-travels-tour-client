import { useCallback, useEffect, useState } from "react";
import type { Tour } from "@/interfaces/tour/Tour";
import { tourService } from "@/services/tour-management/tourService";
import { calculateEndDate } from "@/utilities/tourDates";
import { useUser } from "../user/useUser";
import { useTourLists } from "./useTourLists";
import { useTourMutations } from "./useTourMutations";

/**
 * Tour-management facade. With a tour id it loads that tour; with a loader function it loads `data`;
 * otherwise `data` holds the meal catalog.
 */
export function useTourManagement(param?: string | number | (() => Promise<unknown>)) {
  const { user: currentUser } = useUser();
  const lists = useTourLists();
  const [tour, setTour] = useState<Tour | null>(null);
  const [data, setData] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(false);
  const mutations = useTourMutations({
    currentUserId: currentUser?.id, setTour, setTransportation: lists.setTransportation, fetchSeats: lists.fetchSeats,
  });
  const { fetchMeals: loadMeals } = lists;

  // Without a parameter the meal catalog doubles as `data` (meals page).
  const fetchMeals = useCallback(async () => {
    const meals = await loadMeals();
    if (!param) setData(meals as unknown as Tour[]);
    return meals;
  }, [loadMeals, param]);

  const refresh = useCallback(async () => {
    if (typeof param !== "function") {
      await fetchMeals();
      return;
    }
    setLoading(true);
    try {
      const res = await param();
      if (Array.isArray(res)) setData(res as Tour[]);
      else if (res && typeof res === "object" && "content" in res) setData((res as { content: Tour[] }).content);
    } catch {
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [param, fetchMeals]);

  useEffect(() => {
    if (!param) return;
    if (typeof param === "function") {
      void refresh();
      return;
    }
    setLoading(true);
    tourService.getById(Number(param)).then(setTour).catch(console.error).finally(() => setLoading(false));
  }, [param, refresh]);

  return {
    ...lists,
    ...mutations,
    fetchMeals,
    data,
    tour,
    setTour,
    loading,
    isBooking: mutations.isMutating,
    refresh,
    calculateEndDate,
  };
}
