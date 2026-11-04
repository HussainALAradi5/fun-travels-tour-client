import type { User } from "../../user/User";

export interface ProfileHeaderProps {
  user: User;
  onEdit: () => void;
}
