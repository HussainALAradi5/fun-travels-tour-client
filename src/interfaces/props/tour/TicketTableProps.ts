import type { Ticket } from "../../tour/Ticket";

export interface TicketTableProps {
  tickets: Ticket[];
  isLoading: boolean;
  onView: (id: number) => void;
}
