import type { Tour } from "@/interface/tour/Tour";

export type TourFormValues = Omit<Tour, 'startCountry' | 'endCountry' | 'startCity' | 'endCity' | 'destinationCountries' | 'transportation'> & {
  startCountry: string;
  endCountry: string;
  startCity: string;
  endCity: string;
  transportation: string;
  destinationCountries: string[];
};
