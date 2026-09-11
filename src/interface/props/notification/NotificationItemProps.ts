import type { Notification } from "../../notification/Notification";

export interface NotificationItemProps {
  notification: Notification;
  onRead: (id: number) => void;
  onNavigate: (notification: Notification) => void;
}
