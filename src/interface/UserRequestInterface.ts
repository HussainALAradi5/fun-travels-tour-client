import { UserRequestStatus } from "@/enums/UserRequest/UserRequestStatus";
import type { UserRequestType } from "@/enums/UserRequest/UserRequestType";
import type { User } from "./UserInterface";

export interface UserRequest {
  id?: number | null;
  title: string;
  description: string;
  type: UserRequestType;
  status: UserRequestStatus;
  user: Partial<User>;
  assignedTo?: Partial<User> | null;
  solvedBy?: Partial<User> | null;
  solvedAt?: string | Date | null;
  createdAt?: string | Date | null;
  updatedAt?: string | Date | null;
}

export const DEFAULT_USER_REQUEST: Partial<UserRequest> = {
  title: "",
  description: "",
  type: undefined, // Or a default like UserRequestType.SUGGESTION
  status: UserRequestStatus.PENDING,
  user: undefined,
  assignedTo: null,
  solvedBy: null,
  solvedAt: null,
};

