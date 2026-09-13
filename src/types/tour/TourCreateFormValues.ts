import type { Tour } from "@/interface/tour/Tour";

export type TourCreateFormValues = Omit<Tour, 'startCountry' | 'endCountry' | 'startCity' | 'endCity' | 'destinationCountries' | 'transportation' | 'availableMeals'> & {
  startCountry: string;
  endCountry: string;
  startCity: string;
  endCity: string;
  transportation: string;
  destinationCountries: string[];
  availableMeals: string[];
};
