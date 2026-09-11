import type { UserRequestStatus } from "@/enums/UserRequest/UserRequestStatus";
import type { UserRequestType } from "@/enums/UserRequest/UserRequestType";
import type { GenericFilterParams } from "@/interface/common/GenericFilterParams";

export interface UserRequestFilterParams extends GenericFilterParams<string, UserRequestStatus> {
  currentUserId: number;
  type?: UserRequestType;
  userIdFilter?: number;
}
