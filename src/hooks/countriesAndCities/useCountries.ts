import { useState, useEffect, useCallback } from "react";
import { countryService } from "@/Api/Country";
import { useAuth } from "@/utilities/AuthContext";
import { toaster } from "@/components/ui/toaster";
import type { Country } from "@/interface/CountryInterface";

export function useCountries() {
  const { isAdmin } = useAuth();

  // State management - initialized to empty array
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [countryToDelete, setCountryToDelete] = useState<Country | null>(null);

  // Fetch all countries from local database
  const fetchCountries = useCallback(async () => {
    if (!isAdmin) return;
    
    setLoading(true);
    try {
      const response = await countryService.getAllCountries();
      
      // Robust check: determine if response is the array or contains the array
      if (response && Array.isArray(response.data)) {
        setCountries(response.data);
      } else if (Array.isArray(response)) {
        setCountries(response);
      } else {
        console.error("API Response structure mismatch. Expected array but got:", response);
        setCountries([]); 
      }
    } catch (error) {
      console.error("Failed to fetch countries:", error);
      setCountries([]); // Ensure state is never undefined
      toaster.create({ title: "Failed to load countries", type: "error" });
    } finally {
      setLoading(false);
    }
  }, [isAdmin]);

  // Initial load
  useEffect(() => {
    fetchCountries();
  }, [fetchCountries]);

  // Handle Global/Bulk Sync
  const handleBulkSync = async () => {
    if (!isAdmin) return;
    setFetching(true);
    try {
      await countryService.syncAllFromExternal();
      toaster.create({
        title: "Global sync completed successfully",
        type: "success",
      });
      await fetchCountries(); // Refresh the list
    } catch (error) {
      console.error("Bulk sync error:", error);
      toaster.create({ title: "Bulk sync failed", type: "error" });
    } finally {
      setFetching(false);
    }
  };

  // Handle Single Country Sync
  const handleSingleSync = async (name: string) => {
    if (!name.trim() || !isAdmin) return;
    setFetching(true);
    try {
      await countryService.syncFromExternal(name);
      toaster.create({ title: `${name} synced successfully`, type: "success" });
      await fetchCountries();
    } catch (error) {
      console.error("Single sync error:", error);
      toaster.create({ title: "Sync failed", type: "error" });
    } finally {
      setFetching(false);
    }
  };

  // Logic for actual API deletion
  const confirmDelete = async () => {
    if (!countryToDelete?.id || !isAdmin) return;

    try {
      // 1. Call the backend API
      await countryService.deleteCountry(countryToDelete.id);

      // 2. Update local state only if API call succeeds
      setCountries((prev) => prev.filter((c) => c.id !== countryToDelete.id));

      toaster.create({
        title: `${countryToDelete.famousName} deleted permanently`,
        type: "success",
      });
    } catch (error: any) {
      console.error("Deletion error:", error);
      toaster.create({
        title: "Deletion failed",
        description: error.response?.data?.message || "An error occurred",
        type: "error",
      });
    } finally {
      // 3. Close the dialog
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
    confirmDelete,
    handleBulkSync,
    handleSingleSync,
    fetchCountries, // FIXED: Now exporting the function!
  };
}