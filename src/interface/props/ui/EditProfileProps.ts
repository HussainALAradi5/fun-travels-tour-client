import type { User } from "@/interface/user/User";

export interface EditProfileProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Record<string, unknown>) => Promise<void>;
  loading: boolean;
  initialValues: User;
}
