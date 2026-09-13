export interface TourCreateRequest {
  title: string;
  description?: string;
  basePrice: number;
  discountPrice?: number;
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
