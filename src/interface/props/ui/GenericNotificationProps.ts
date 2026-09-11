import type { NotificationVariant } from '@/types/common/NotificationVariant';

export interface NotifyProps {
  title: string;
  description?: string;
  type?: NotificationVariant;
}

export interface GenericNotificationProps {
  title: string;
  description?: string;
  type?: NotificationVariant;
}
