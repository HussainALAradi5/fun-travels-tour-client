import type { EntityReference } from "../common/EntityReference";

export interface ReservationTicketPayload {
  assignedSeat?: EntityReference | null;
  selectedMeals?: EntityReference[];
}
