export interface TourCreateRequest {
  tourNumber: string;
  title: string;
  description?: string;
  basePrice: number;
  numberOfDays: number;
  startDate: string;
  endDate?: string;
  maxCapacity: number;
  startCountryId?: number;
  endCountryId?: number;
  startCityId?: number;
  endCityId?: number;
  destinationCountryIds?: number[];
  transportationId?: number;
  mealPlanIds?: number[];
}
