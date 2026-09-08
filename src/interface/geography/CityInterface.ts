import type { Country } from './CountryInterface';

export interface City {
  id?: number;
  name: string;
  countryId?: string | number;
  country?: Country;
}

export interface CityResponse {
  id: number;
  name: string;
  country?: { id: number; famousName: string };
}
