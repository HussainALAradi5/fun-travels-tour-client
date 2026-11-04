import { useCallback, useEffect, useState } from "react";
import { toaster } from "@/components/ui/toaster";
import type { City } from "@/interfaces/geography/City";
import { cityService } from "@/services/geography/cityService";
import { useAuth } from "@/utilities/AuthContext";

/** Cities of one country: list, add, and confirmed delete (admin only). Errors are toasted by the API client. */
export function useCityManager(countryId: number) {
  const { isAdmin } = useAuth();
  const [cities, setCities] = useState<City[]>([]);
  const [newCity, setNewCity] = useState("");
  const [adding, setAdding] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<City | null>(null);

  const load = useCallback(async () => {
    setFetching(true);
    try {
      setCities((await cityService.getCitiesByCountry(countryId)) || []);
    } catch {
      setCities([]);
    } finally {
      setFetching(false);
    }
  }, [countryId]);

  useEffect(() => {
    void load();
  }, [load]);

  const add = async () => {
    if (!newCity.trim() || !isAdmin) return;
    setAdding(true);
    try {
      await cityService.createCity({ name: newCity.trim(), country: { id: countryId } });
      setNewCity("");
      await load();
      toaster.create({ title: "City added successfully", type: "success" });
    } finally {
      setAdding(false);
    }
  };

  const confirmDelete = async () => {
    const city = pendingDelete;
    setPendingDelete(null);
    if (!city?.id) return;
    await cityService.deleteCity(city.id);
    setCities((prev) => prev.filter((c) => c.id !== city.id));
    toaster.create({ title: "City removed", type: "success" });
  };

  return { isAdmin, cities, newCity, setNewCity, adding, fetching, pendingDelete, setPendingDelete, add, confirmDelete };
}
