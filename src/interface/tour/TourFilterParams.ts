import type { GenericStatus } from "@/enums/GenericStatus";
import type { FilterInterface } from "@/interface/common/FilterInterface";

export type TourSortField =
  | "id"
  | "tourNumber"
  | "title"
  | "startDate"
  | "endDate"
  | "totalPrice"
  | "availableSlots"
  | "agency"
  | "branch";

export interface TourFilterParams extends FilterInterface {
  sortBy?: TourSortField;
  status?: GenericStatus;
  minSlots?: number;
  agencyId?: number;
  branchId?: number;
  minPrice?: number;
  maxPrice?: number;
  countryId?: number;
  cityId?: number;
  createdById?: number;
}
