import type { GenericStatus } from "@/enums/GenericStatus";
import type { GenericFilterParams } from "@/interface/common/GenericFilterParams";

export interface TourFilterParams extends GenericFilterParams<string, GenericStatus> {
  minSlots?: number;
  agencyId?: number;
  branchId?: number;
  minPrice?: number;
  maxPrice?: number;
  countryId?: number;
  cityId?: number;
  createdById?: number;
}
