import type { Ticket } from "@/interface/tour/Ticket";

export interface TicketManagementSidebarProps {
  ticket: Ticket;
  isCancelled: boolean;
  isCompleted: boolean;
  onRefresh: () => void;
}
