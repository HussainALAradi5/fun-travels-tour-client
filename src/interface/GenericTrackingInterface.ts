import type { User } from "./UserInterface";
import type { ReferenceType } from "@/enums/notification/ReferenceType";

export interface GenericComment {
  id?: number;
  referenceId: number;
  referenceType: ReferenceType;
  content: string;
  author: Partial<User>; 
  updatedBy?: Partial<User> | null;
  createdAt?: string; 
  updatedAt?: string; 
  type: "COMMENT"; 
}

export const DEFAULT_GENERIC_COMMENT: Partial<GenericComment> = {
  content: "",
  type: "COMMENT"
};

export interface GenericEventLog {
  id?: number;
  referenceId: number;
  referenceType: ReferenceType;
  action: string;
  description?: string | null;
  actor: Partial<User>; 
  createdAt?: string;
  type: "EVENT";
}

export const DEFAULT_GENERIC_EVENT_LOG: Partial<GenericEventLog> = {
  action: "",
  description: "",
  type: "EVENT"
};

export type TimelineItem = GenericComment | GenericEventLog;