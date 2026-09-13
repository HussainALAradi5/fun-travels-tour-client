import type { UserRequest } from "@/interface/support/UserRequest";

export interface UserRequestListProps {
  data: UserRequest[];
  loading: boolean;
  onView: (req: UserRequest) => void;
}
