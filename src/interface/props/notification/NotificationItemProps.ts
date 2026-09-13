import type { Notification } from "@/interface/notification/Notification";

export interface NotificationItemProps {
  notif: Notification;
  onMarkAsRead: (id: number) => void;
  onNavigate: (notif: Notification) => void;
}
