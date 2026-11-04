export interface NotificationContextType {
  unreadCount: number;
  decrementCount: () => void;
  refreshCount: () => void;
}
