import type { ReferenceType } from '../../enums/notification/ReferenceType';
import type { User } from '../user/User';

export interface GenericComment {
  id?: number;
  referenceId: number;
  referenceType: ReferenceType;
  content: string;
  author: Partial<User>;
  updatedBy?: Partial<User> | null;
  createdAt?: string;
  updatedAt?: string;
  type: 'COMMENT';
}

export const DEFAULT_COMMENT: Partial<GenericComment> = {
  content: "",
  type: "COMMENT",
};

