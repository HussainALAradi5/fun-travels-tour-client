import type { NotificationType } from "@/enums/notification/NotificationType";
import type { ReferenceType } from "@/enums/notification/ReferenceType";
import type { User } from "./UserInterface";

export interface NotificationCounts {
  unread: number;
  read: number;
}

export interface Notification {
  id: number;
  recipient?: User;
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  referenceId?: number;
  referenceType?: ReferenceType;
  createdAt: string; 
  readAt?: string;   
}

/**
 * Modern Helper: Redirects the user to the correct page based on reference type
 */
export const getNotificationLink = (notif: Notification): string => {
  if (!notif.referenceId) return "/my-notifications";

  switch (notif.referenceType) {
    case "USER_REQUEST":
      return `/my-requests/${notif.referenceId}`;
    case "TOUR":
      return `/tours/${notif.referenceId}`;
    default:
      return "/my-notifications";
  }
};