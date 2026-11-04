import type { Ticket } from "@/interfaces/tour/Ticket";

export interface TourPassengerManifestProps {
  tickets: Ticket[];
  /** The tour whose manifest the server exports. */
  tourId: number;
}
