import type { ReferenceType } from '../../enums/notification/ReferenceType';
import type { User } from '../user/User';

export interface EventLogResponse {
  id: number;
  referenceType: ReferenceType;
  referenceId: number;
  action: string;
  description?: string;
  actor?: Partial<User>;
  createdAt?: string;
}
