import type { ReferenceType } from '../../enums/notification/ReferenceType';

export interface GenericEventLog {
  id?: number;
  referenceId: number;
  referenceType: ReferenceType;
  action: string;
  description?: string | null;
  actor: { id?: number; name?: string };
  createdAt?: string;
  type: 'EVENT';
}
