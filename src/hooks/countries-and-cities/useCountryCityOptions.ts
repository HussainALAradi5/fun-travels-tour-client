import { useEffect, useState } from "react";
import type { SelectOption } from "@/interfaces/common/SelectOption";
import { cityService } from "@/services/geography/cityService";
import { countryService } from "@/services/geography/countryService";
import { toNamedOptions } from "@/utilities/selectOptions";

/** Country options while `enabled`, and the cities of the selected country. */
export function useCountryCityOptions(enabled: boolean) {
  const [countries, setCountries] = useState<SelectOption[]>([]);
  const [cities, setCities] = useState<SelectOption[]>([]);
  const [countryId, setCountryId] = useState<string | null>(null);

  useEffect(() => {
    if (enabled) countryService.getAllCountries().then((list) => setCountries(toNamedOptions(list))).catch(console.error);
  }, [enabled]);

  useEffect(() => {
    if (!countryId) return;
    cityService.getCitiesByCountry(Number(countryId)).then((list) => setCities(toNamedOptions(list))).catch(console.error);
  }, [countryId]);

  const selectCountry = (value: unknown) => {
    const id = value ? String(value) : null;
    setCountryId(id);
    if (!id) setCities([]);
  };

  return { countries, cities, countryId, selectCountry };
}
