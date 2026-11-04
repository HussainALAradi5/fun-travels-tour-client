import type { Notification as AppNotification } from "@/interfaces/notification/Notification";

/**
 * Where a notification leads. `/my-bookings/{id}` is a ticket page, so reservation notifications
 * open the bookings list; tours open the admin page for staff and the public catalog for customers.
 */
export function notificationRoute(notif: AppNotification, isStaff: boolean): string | null {
  if (!notif.referenceId) return null;
  switch (notif.referenceType) {
    case "TOUR": return isStaff ? `/admin/tours/${notif.referenceId}` : "/tours";
    case "RESERVATION": return "/my-bookings";
    case "TICKET": return `/my-bookings/${notif.referenceId}`;
    case "USER_REQUEST": return `/my-requests/${notif.referenceId}`;
    default: return null;
  }
}
