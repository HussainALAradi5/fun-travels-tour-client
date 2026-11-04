import type { UserRequestCreateRequest } from "@/interfaces/support/UserRequestCreateRequest";

export interface UserRequestCreateDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: UserRequestCreateRequest) => Promise<void>;
  loading: boolean;
}
