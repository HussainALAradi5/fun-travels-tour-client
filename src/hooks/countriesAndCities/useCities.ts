import { useState, useEffect, useCallback } from "react";
import { cityService } from "@/Api/City";
import type { City } from "@/interface/CityInterface";

export function useCities(countryId?: string | null) {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCities = useCallback(async (id: number) => {
    setLoading(true);
    try {
      const res = await cityService.getCitiesByCountry(id);
      const data = Array.isArray(res) ? res : res?.data;
      if (data) setCities(data);
    } catch (err) {
      console.error(`Failed to fetch cities for country ${id}`, err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Automatically fetch when the countryId dependency changes
  useEffect(() => {
    if (countryId) {
      fetchCities(Number(countryId));
    } else {
      setCities([]); // Clear cities if no country is selected
    }
  }, [countryId, fetchCities]);

  return { cities, loading, fetchCities };
}