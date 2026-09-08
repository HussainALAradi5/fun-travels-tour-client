import type { NotificationType } from '../../enums/notification/NotificationType';
import type { ReferenceType } from '../../enums/notification/ReferenceType';

export interface Notification {
  id: number;
  recipient?: { id?: number; name?: string };
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  referenceId?: number;
  referenceType?: ReferenceType;
  createdAt: string;
  readAt?: string;
}
