import type { CityCountrySummary } from "./CityCountrySummary";

export interface City {
  id: number;
  name: string;
  country: CityCountrySummary;
}

export const DEFAULT_CITY: Partial<City> = {
  name: "",
};
