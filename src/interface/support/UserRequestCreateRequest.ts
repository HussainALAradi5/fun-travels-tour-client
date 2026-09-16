import type { UserRequestType } from "@/enums/UserRequest/UserRequestType";

export interface UserRequestCreateRequest extends Record<string, unknown> {
  title: string;
  description: string;
  type: UserRequestType;
}
