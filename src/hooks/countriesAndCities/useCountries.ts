import { useState, useEffect, useCallback } from "react";
import { countryService } from "@/Api/Country";
import { useAuth } from "@/utilities/AuthContext";
import { toaster } from "@/components/ui/toaster";
import type { Country } from "@/interface/geography/Country";

export function useCountries() {
  const { isAdmin } = useAuth();

  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [countryToDelete, setCountryToDelete] = useState<Country | null>(null);

  const fetchCountries = useCallback(async () => {
    if (!isAdmin) return;

    setLoading(true);
    try {
      const response = await countryService.getAllCountries();
      setCountries(response || []);
    } catch {
      setCountries([]);
      toaster.create({ title: "Failed to load countries", type: "error" });
    } finally {
      setLoading(false);
    }
  }, [isAdmin]);

  useEffect(() => {
    fetchCountries();
  }, [fetchCountries]);

  const handleBulkSync = async () => {
    if (!isAdmin) return;
    setFetching(true);
    try {
      await countryService.syncAllFromExternal();
      toaster.create({ title: "Global sync completed successfully", type: "success" });
      await fetchCountries();
    } catch {
      toaster.create({ title: "Bulk sync failed", type: "error" });
    } finally {
      setFetching(false);
    }
  };

  const handleSingleSync = async (name: string) => {
    if (!name.trim() || !isAdmin) return;
    setFetching(true);
    try {
      await countryService.syncFromExternal(name);
      toaster.create({ title: `${name} synced successfully`, type: "success" });
      await fetchCountries();
    } catch {
      toaster.create({ title: "Sync failed", type: "error" });
    } finally {
      setFetching(false);
    }
  };

  const confirmDelete = async () => {
    if (!countryToDelete?.id || !isAdmin) return;

    try {
      await countryService.deleteCountry(countryToDelete.id);
      setCountries((prev) => prev.filter((c) => c.id !== countryToDelete.id));
      toaster.create({ title: `${countryToDelete.famousName} deleted permanently`, type: "success" });
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "An error occurred";
      toaster.create({ title: "Deletion failed", description: msg, type: "error" });
    } finally {
      setCountryToDelete(null);
    }
  };

  return {
    countries,
    loading,
    fetching,
    isAdmin,
    countryToDelete,
    setCountryToDelete,
    fetchCountries,
    handleBulkSync,
    handleSingleSync,
    confirmDelete,
  };
}

