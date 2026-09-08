import type { NotificationType } from '../../enums/notification/NotificationType';
import type { ReferenceType } from '../../enums/notification/ReferenceType';

export interface NotificationResponse {
  id: number;
  title: string;
  message: string;
  type: NotificationType;
  referenceType?: ReferenceType;
  referenceId?: number;
  isRead: boolean;
  createdAt: string;
  readAt?: string;
}
