export interface AuthContextType {
  user: Record<string, unknown> | null;
  isAdmin: boolean;
  isAuthenticated: boolean;
  loading: boolean;
  refreshAuth: () => void;
  logout: () => void;
}
