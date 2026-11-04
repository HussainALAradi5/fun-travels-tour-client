import type { UserRequestType } from "@/enums/user-request/UserRequestType";

export interface UserRequestCreateRequest extends Record<string, unknown> {
  title: string;
  description: string;
  type: UserRequestType;
}
