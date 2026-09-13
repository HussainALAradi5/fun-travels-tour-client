import type { Country } from "./Country";

export interface CityCreateRequest {
  name: string;
  country: Partial<Country>;
}
