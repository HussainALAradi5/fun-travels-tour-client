import { useEffect, useMemo, useState } from "react";
import { CountryOptionLabel } from "@/components/tour-management/customer-tour-catalog/CountryOptionLabel";
import type { FilterGroup } from "@/interfaces/common/FilterGroup";
import type { CatalogFilters } from "@/interfaces/tour/CatalogFilters";
import type { Tour } from "@/interfaces/tour/Tour";
import { countryService } from "@/services/geography/countryService";
import type { CatalogParams } from "@/types/tour/CatalogParams";

const EMPTY: CatalogFilters = { searchTerm: "", startCountryId: "", endCountryId: "", startDate: "", endDate: "" };

/** Server-side catalog filters (countries, dates) plus a local title search. */
export function useCatalogFilters(tours: Tour[], fetchCatalog: (params: CatalogParams) => Promise<unknown>) {
  const [filters, setFilters] = useState<CatalogFilters>(EMPTY);
  const [countryOptions, setCountryOptions] = useState<FilterGroup["options"]>([]);
  const set = (key: keyof CatalogFilters) => (value: string) => setFilters((prev) => ({ ...prev, [key]: value }));

  useEffect(() => {
    countryService.getAllCountries().then((list) => setCountryOptions(list.map((c) => ({
      label: <CountryOptionLabel country={c} />, value: String(c.id), searchText: c.officialName || c.famousName,
    })))).catch(console.error);
  }, []);

  useEffect(() => {
    void fetchCatalog({
      startCountryId: filters.startCountryId ? Number(filters.startCountryId) : undefined,
      endCountryId: filters.endCountryId ? Number(filters.endCountryId) : undefined,
      startDate: filters.startDate || undefined,
      endDate: filters.endDate || undefined,
    } as CatalogParams);
  }, [filters.startCountryId, filters.endCountryId, filters.startDate, filters.endDate, fetchCatalog]);

  const filteredTours = useMemo(() => {
    const term = filters.searchTerm.toLowerCase();
    return term ? tours.filter((t) => t.title.toLowerCase().includes(term)) : tours;
  }, [tours, filters.searchTerm]);

  const filterGroups: FilterGroup[] = [
    { label: "Origin", value: filters.startCountryId, options: countryOptions, onChange: set("startCountryId"), variant: "combobox", placeholder: "Search Origin..." },
    { label: "Destination", value: filters.endCountryId, options: countryOptions, onChange: set("endCountryId"), variant: "combobox", placeholder: "Search Destination..." },
  ];

  return { filters, set, filteredTours, filterGroups, reset: () => setFilters(EMPTY) };
}
