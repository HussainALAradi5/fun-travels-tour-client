import type { NotificationType } from '../../enums/notification/NotificationType';
import type { ReferenceType } from '../../enums/notification/ReferenceType';
import type { User } from '../user/User';

export interface Notification {
  id: number;
  recipient?: Partial<User>;
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  referenceId?: number;
  referenceType?: ReferenceType;
  createdAt: string;
  readAt?: string;
}

export const DEFAULT_NOTIFICATION: Partial<Notification> = {
  title: "",
  message: "",
  isRead: false,
};
