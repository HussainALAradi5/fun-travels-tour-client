import type { TicketStatus } from "@/enums/tourmanagement/TicketStatus";
import type { GenericFilterParams } from "@/interface/common/GenericFilterParams";

export type TicketSortField = "startDate" | "endDate" | "bookingDate" | "totalPrice";

export interface TicketFilterParams extends GenericFilterParams<TicketSortField, TicketStatus> {
  customerId?: number;
  tourId?: number;
}
