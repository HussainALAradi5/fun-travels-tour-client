import type { UserRequestStatus } from '../../enums/UserRequest/UserRequestStatus';
import type { UserRequestType } from '../../enums/UserRequest/UserRequestType';

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

export const DEFAULT_USER_REQUEST: Partial<UserRequest> = {
  title: "",
  description: "",
  type: "SUPPORT" as UserRequestType,
  status: "PENDING" as UserRequestStatus,
};
