import type { ReferenceType } from "../../enums/notification/ReferenceType";
import type { User } from "../user/User";

export interface Comment {
  id: number;
  referenceType: ReferenceType;
  referenceId: number;
  content: string;
  author?: Partial<User>;
  createdAt?: string;
  updatedAt?: string | null;
}

export const DEFAULT_COMMENT: Partial<Comment> = {
  content: "",
};
