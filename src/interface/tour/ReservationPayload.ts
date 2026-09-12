import type { EntityReference } from "../common/EntityReference";
import type { ReservationGuestPayload } from "./ReservationGuestPayload";
import type { ReservationTicketPayload } from "./ReservationTicketPayload";

export interface ReservationPayload {
  user?: EntityReference;
  tour: EntityReference;
  guests?: ReservationGuestPayload[];
  tickets?: ReservationTicketPayload[];
  requestedSlots?: number;
  specialRequests?: string;
}
