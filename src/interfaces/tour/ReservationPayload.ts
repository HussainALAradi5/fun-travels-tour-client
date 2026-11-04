import type { User } from "../user/User";
import type { Tour } from "./Tour";
import type { ReservationGuestPayload } from "./ReservationGuestPayload";
import type { ReservationTicketPayload } from "./ReservationTicketPayload";

export interface ReservationPayload {
  user?: Partial<User>;
  tour: Partial<Tour>;
  guests?: ReservationGuestPayload[];
  tickets?: ReservationTicketPayload[];
  requestedSlots?: number;
  specialRequests?: string;
}
