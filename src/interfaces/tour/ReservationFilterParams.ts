import type { GenericStatus } from "@/enums/GenericStatus";
import type { FilterInterface } from "@/interfaces/common/FilterInterface";

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
