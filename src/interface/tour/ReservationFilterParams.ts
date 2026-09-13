import type { GenericStatus } from "@/enums/GenericStatus";
import type { FilterInterface } from "@/interface/common/FilterInterface";

export type ReservationSortField =
  | "id"
  | "reservationNumber"
  | "requestedSlots"
  | "totalPrice"
  | "status"
  | "bookingDate";

export interface ReservationFilterParams extends FilterInterface {
  sortBy?: ReservationSortField;
  status?: GenericStatus;
  customerId?: number;
  agencyId?: number;
}
