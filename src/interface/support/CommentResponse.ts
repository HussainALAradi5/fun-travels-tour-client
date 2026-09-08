import type { ReferenceType } from '../../enums/notification/ReferenceType';

export interface CommentResponse {
  id: number;
  referenceType: ReferenceType;
  referenceId: number;
  content: string;
  author?: { id: number; name: string };
  createdAt?: string;
}
