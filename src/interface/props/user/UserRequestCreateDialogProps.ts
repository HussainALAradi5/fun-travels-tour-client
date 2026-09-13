import type { UserRequest } from "@/interface/support/UserRequest";

export interface UserRequestCreateDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: UserRequest) => Promise<void>;
  loading: boolean;
  currentUserId: number;
}
