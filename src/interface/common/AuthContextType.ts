import type { User } from "@/interface/user/User";

export interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  isAuthenticated: boolean;
  loading: boolean;
  refreshAuth: () => void;
  refreshUser: () => Promise<void>;
  logout: () => void;
}
