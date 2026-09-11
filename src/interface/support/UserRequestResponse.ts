import type { UserRequestStatus } from '../../enums/UserRequest/UserRequestStatus';
import type { UserRequestType } from '../../enums/UserRequest/UserRequestType';
import type { User } from '../user/User';

export interface UserRequestResponse {
  id: number;
  title: string;
  description: string;
  type: UserRequestType;
  status: UserRequestStatus;
  user?: Partial<User>;
  assignedTo?: Partial<User>;
  solvedBy?: Partial<User>;
  solvedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const DEFAULT_USER_REQUEST_RESPONSE: Partial<UserRequestResponse> = {
  title: "",
  description: "",
  status: "PENDING",
};
