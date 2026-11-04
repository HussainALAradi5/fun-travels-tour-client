import type { Ticket } from "@/interfaces/tour/Ticket";

export interface TicketManagementSidebarProps {
  ticket: Ticket;
  isCancelled: boolean;
  isCompleted: boolean;
  onRefresh: () => void;
}
