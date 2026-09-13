import type { User } from "@/interface/user/User";

export interface AddEmployeeDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: User) => Promise<void>;
  loading: boolean;
  agencyName?: string;
}
