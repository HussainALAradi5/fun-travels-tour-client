import type { ReferenceType } from '../../enums/notification/ReferenceType';

export interface GenericComment {
  id?: number;
  referenceId: number;
  referenceType: ReferenceType;
  content: string;
  author: { id?: number; name?: string };
  updatedBy?: { id?: number; name?: string } | null;
  createdAt?: string;
  updatedAt?: string;
  type: 'COMMENT';
}
