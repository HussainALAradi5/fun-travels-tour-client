import type { UserRequestStatus } from "@/enums/user-request/UserRequestStatus";
import type { UserRequestType } from "@/enums/user-request/UserRequestType";
import type { FilterInterface } from "@/interfaces/common/FilterInterface";

export interface UserRequestFilterParams extends FilterInterface {
  status?: UserRequestStatus;
  currentUserId: number;
  type?: UserRequestType;
  userIdFilter?: number;
}
