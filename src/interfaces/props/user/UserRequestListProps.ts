import type { UserRequest } from "@/interfaces/support/UserRequest";

export interface UserRequestListProps {
  data: UserRequest[];
  loading: boolean;
  onView: (req: UserRequest) => void;
}
