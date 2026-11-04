import { useEffect, useMemo, useState } from "react";
import { createListCollection } from "@chakra-ui/react";
import { DEFAULT_COUNTRY_CODE } from "@/constants/ui/inputStyles";
import type { Country } from "@/interfaces/geography/Country";
import { countryService } from "@/services/geography/countryService";

/**
 * Country dial codes for the mobile field. Countries load once; the initial country is taken from
 * the starting value (or the default), so typing never triggers another request.
 */
export function useDialCodes(value: string | undefined, onChange: (value: string) => void) {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selected, setSelected] = useState<Country | null>(null);
  const [localNumber, setLocalNumber] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [initialValue] = useState(value);

  useEffect(() => {
    countryService.getAllCountries()
      .then((list) => {
        const withCodes = (Array.isArray(list) ? list : []).filter((c) => c.dialCode);
        setCountries(withCodes);
        const initial = withCodes.find((c) => initialValue?.startsWith(c.dialCode!))
          ?? withCodes.find((c) => c.countryCode === DEFAULT_COUNTRY_CODE) ?? withCodes[0];
        if (initial) {
          setSelected(initial);
          if (initialValue?.startsWith(initial.dialCode!)) setLocalNumber(initialValue.slice(initial.dialCode!.length));
        }
      })
      .catch((err: unknown) => console.error("Failed to load dial codes", err))
      .finally(() => setIsLoading(false));
  }, [initialValue]);

  const collection = useMemo(() => {
    const query = searchQuery.toLowerCase();
    const items = countries.filter((c) => c.famousName?.toLowerCase().includes(query) || c.dialCode?.includes(searchQuery));
    return createListCollection({ items, itemToString: (c) => `${c.dialCode} ${c.famousName}`, itemToValue: (c) => String(c.id) });
  }, [countries, searchQuery]);

  const changeNumber = (raw: string) => {
    const digits = raw.replace(/[^0-9]/g, "");
    setLocalNumber(digits);
    onChange(selected?.dialCode ? `${selected.dialCode}${digits}` : digits);
  };

  const changeCountry = (countryId: string) => {
    const country = countries.find((c) => String(c.id) === countryId);
    if (!country) return;
    setSelected(country);
    onChange(`${country.dialCode}${localNumber}`);
    setSearchQuery("");
  };

  return { countries, selected, localNumber, isLoading, searchQuery, setSearchQuery, collection, changeNumber, changeCountry };
}
