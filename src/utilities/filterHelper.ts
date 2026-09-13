import type { Tour } from "@/interface/tour/Tour";
import type { Ticket } from "@/interface/tour/Ticket";
import type { Notification } from "@/interface/notification/Notification";
import { GenericStatus } from "@/enums/GenericStatus";

export function filterToursBySearch(tours: Tour[], searchTerm: string): Tour[] {
  if (!searchTerm) return tours;
  const lower = searchTerm.toLowerCase();
  return tours.filter(t => t.title.toLowerCase().includes(lower) || t.tourNumber?.toLowerCase().includes(lower));
}

export function getTicketStatusFlags(ticket: Ticket) {
  return {
    isCancelled: ticket.ticketStatus === "CANCELLED",
    isCompleted: ticket.ticketStatus === "COMPLETED",
    isPending: ticket.ticketStatus === "PENDING",
    isConfirmed: ticket.ticketStatus === "CONFIRMED",
    canCancel: ticket.ticketStatus === "PENDING" || ticket.ticketStatus === "CONFIRMED",
    canApprove: ticket.approvalStatus === GenericStatus.PENDING,
  };
}

export function countUnreadNotifications(notifications: Notification[]): number {
  return notifications.filter(n => !n.isRead).length;
}

export function getNotificationRoute(referenceType?: string, referenceId?: number): string | null {
  if (!referenceId) return null;
  switch (referenceType) {
    case "TOUR": return `/admin/tours/${referenceId}`;
    case "RESERVATION": return `/my-bookings/${referenceId}`;
    case "TICKET": return `/my-bookings/${referenceId}`;
    case "USER_REQUEST": return `/my-requests/${referenceId}`;
    default: return null;
  }
}

export function getRequestDetailRoute(isAdmin: boolean, requestId: number): string {
  return isAdmin ? `/admin/requests/${requestId}` : `/my-requests/${requestId}`;
}


