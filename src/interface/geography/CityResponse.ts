import type { Country } from './Country';

export interface CityResponse {
  id: number;
  name: string;
  country?: Partial<Country>;
}

export const DEFAULT_CITY_RESPONSE: Partial<CityResponse> = {
  name: "",
};
