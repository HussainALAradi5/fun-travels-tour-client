import type { Country } from "./Country";

export interface City {
  id: number;
  name: string;
  country: Partial<Country>;
}

export const DEFAULT_CITY: Partial<City> = {
  name: "",
};
