import type { TicketStatus } from "@/enums/tourmanagement/TicketStatus";
import type { FilterInterface } from "@/interface/common/FilterInterface";

export type TicketSortField = "startDate" | "endDate" | "bookingDate" | "totalPrice";

export interface TicketFilterParams extends FilterInterface {
  sortBy?: TicketSortField;
  status?: TicketStatus;
  customerId?: number;
  tourId?: number;
}
