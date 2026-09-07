export const TicketStatus = {
  PENDING: "PENDING",
  CONFIRMED: "CONFIRMED",
  CANCELLED: "CANCELLED",
  COMPLETED: "COMPLETED",
} as const;

export type TicketStatus = (typeof TicketStatus)[keyof typeof TicketStatus];
