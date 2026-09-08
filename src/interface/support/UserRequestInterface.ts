import type { UserRequestStatus } from '../../enums/UserRequest/UserRequestStatus';
import type { UserRequestType } from '../../enums/UserRequest/UserRequestType';
import type { ReferenceType } from '../../enums/notification/ReferenceType';

export interface UserRequest {
  id?: number | null;
  title: string;
  description: string;
  type: UserRequestType;
  status: UserRequestStatus;
  user: { id?: number; name?: string };
  assignedTo?: { id?: number; name?: string } | null;
  solvedBy?: { id?: number; name?: string } | null;
  solvedAt?: string | Date | null;
  createdAt?: string | Date | null;
  updatedAt?: string | Date | null;
}

export interface UserRequestResponse {
  id: number;
  title: string;
  description: string;
  type: UserRequestType;
  status: UserRequestStatus;
  user?: { id: number; name: string };
  assignedTo?: { id: number; name: string };
  solvedBy?: { id: number; name: string };
  solvedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

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

export interface CommentResponse {
  id: number;
  referenceType: ReferenceType;
  referenceId: number;
  content: string;
  author?: { id: number; name: string };
  createdAt?: string;
}

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

export interface EventLogResponse {
  id: number;
  referenceType: ReferenceType;
  referenceId: number;
  action: string;
  description?: string;
  actor?: { id: number; name: string };
  createdAt?: string;
}

export type TimelineItem = GenericComment | GenericEventLog;
