import type { ReferenceType } from '../../enums/notification/ReferenceType';
import type { User } from '../user/User';

export interface GenericEventLog {
  id?: number;
  referenceId: number;
  referenceType: ReferenceType;
  action: string;
  description?: string | null;
  actor: Partial<User>;
  createdAt?: string;
  type: 'EVENT';
}

export const DEFAULT_EVENT_LOG: Partial<GenericEventLog> = {
  action: "",
  type: "EVENT",
};

