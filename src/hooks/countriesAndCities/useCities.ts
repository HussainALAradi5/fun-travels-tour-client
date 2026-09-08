import { useState, useEffect, useCallback } from "react";
import { cityService } from "@/Api/City";
import type { City } from "@/interface";

export function useCities(countryId?: string | null) {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCities = useCallback(async (id: number) => {
    setLoading(true);
    try {
      const res = await cityService.getCitiesByCountry(id);
      setCities(res || []);
    } catch (err) {
      console.error(`Failed to fetch cities for country ${id}`, err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (countryId) {
      fetchCities(Number(countryId));
    } else {
      setCities([]);
    }
  }, [countryId, fetchCities]);

  return { cities, loading, fetchCities };
}
