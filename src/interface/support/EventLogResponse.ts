import type { ReferenceType } from '../../enums/notification/ReferenceType';

export interface EventLogResponse {
  id: number;
  referenceType: ReferenceType;
  referenceId: number;
  action: string;
  description?: string;
  actor?: { id: number; name: string };
  createdAt?: string;
}
