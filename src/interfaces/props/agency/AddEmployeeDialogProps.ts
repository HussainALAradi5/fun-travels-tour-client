import type { User } from "@/interfaces/user/User";

export interface AddEmployeeDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: User) => Promise<void>;
  loading: boolean;
  agencyName?: string;
}
