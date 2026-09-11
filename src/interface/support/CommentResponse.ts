import type { ReferenceType } from '../../enums/notification/ReferenceType';
import type { User } from '../user/User';

export interface CommentResponse {
  id: number;
  referenceType: ReferenceType;
  referenceId: number;
  content: string;
  author?: Partial<User>;
  createdAt?: string;
}

export const DEFAULT_COMMENT_RESPONSE: Partial<CommentResponse> = {
  content: "",
};
