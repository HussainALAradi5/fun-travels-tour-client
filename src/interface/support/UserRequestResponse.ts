import type { UserRequestStatus } from '../../enums/UserRequest/UserRequestStatus';
import type { UserRequestType } from '../../enums/UserRequest/UserRequestType';

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
