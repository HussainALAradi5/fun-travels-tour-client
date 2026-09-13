import type { UserRequestStatus } from "@/enums/UserRequest/UserRequestStatus";
import type { UserRequestType } from "@/enums/UserRequest/UserRequestType";
import type { FilterInterface } from "@/interface/common/FilterInterface";

export interface UserRequestFilterParams extends FilterInterface {
  status?: UserRequestStatus;
  currentUserId: number;
  type?: UserRequestType;
  userIdFilter?: number;
}
