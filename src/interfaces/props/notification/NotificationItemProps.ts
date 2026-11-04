import type { Notification } from "@/interfaces/notification/Notification";

export interface NotificationItemProps {
  notif: Notification;
  onMarkAsRead: (id: number) => void;
  onNavigate: (notif: Notification) => void;
}
