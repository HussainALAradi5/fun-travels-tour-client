import type { Ticket } from "@/interfaces/tour/Ticket";
import type { Tour } from "@/interfaces/tour/Tour";

/** A ticket with its full tour, which is null until it loads. */
export interface TicketWithTourProps {
  ticket: Ticket;
  tour: Tour | null;
}
