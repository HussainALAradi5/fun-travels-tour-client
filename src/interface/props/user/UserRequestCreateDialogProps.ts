import type { UserRequestCreateRequest } from "@/interface/support/UserRequestCreateRequest";

export interface UserRequestCreateDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: UserRequestCreateRequest) => Promise<void>;
  loading: boolean;
}
