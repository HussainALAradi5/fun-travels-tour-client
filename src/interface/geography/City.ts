import type { Country } from './Country';

export interface City {
  id?: number;
  name: string;
  countryId?: string | number;
  country?: Country;
}
