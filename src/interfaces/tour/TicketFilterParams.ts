import type { TicketStatus } from "@/enums/tour-management/TicketStatus";
import type { FilterInterface } from "@/interfaces/common/FilterInterface";

export type TicketSortField = "startDate" | "endDate" | "bookingDate" | "totalPrice";

export interface TicketFilterParams extends FilterInterface {
  sortBy?: TicketSortField;
  status?: TicketStatus;
  customerId?: number;
  tourId?: number;
}
