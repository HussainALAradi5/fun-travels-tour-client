import type { GenericStatus } from "@/enums/GenericStatus";
import type { GenericFilterParams } from "@/interface/common/GenericFilterParams";

export interface ReservationFilterParams extends GenericFilterParams<string, GenericStatus> {
  customerId?: number;
  agencyId?: number;
}
