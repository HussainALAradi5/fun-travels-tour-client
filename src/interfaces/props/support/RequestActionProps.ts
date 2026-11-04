import type { UserRequestAction } from "@/enums/user-request/UserRequestAction";
import type { UserRequest } from "../../support/UserRequest";

export interface RequestActionProps {
  request: UserRequest;
  loading: boolean;
  onAction: (action: UserRequestAction) => void;
  canClose?: boolean;
}
