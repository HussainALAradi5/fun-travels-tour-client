import type { PaginationParams } from "@/interfaces/common/PaginationParams";

export interface TourCatalogParams extends PaginationParams {
  startCountryId?: number;
  endCountryId?: number;
  startDate?: string;
  endDate?: string;
}
