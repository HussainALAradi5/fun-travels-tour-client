import type { User } from "@/interface/user/User";

export interface EditProfileProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
  loading: boolean;
  initialValues: User;
}
