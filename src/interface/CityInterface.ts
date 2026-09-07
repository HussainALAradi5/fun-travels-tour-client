import type { Country } from "./CountryInterface";

export interface City {
  id?: number;
  name: string;
  countryId?: string | number;
  country?: Country;
}

export const DEFAULT_CITY: Partial<City> = {
  name: "",
  countryId: "",
};
