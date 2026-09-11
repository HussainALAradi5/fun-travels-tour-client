export interface AuthContextType {
  user: any;
  isAdmin: boolean;
  isAuthenticated: boolean;
  loading: boolean;
  refreshAuth: () => void;
  logout: () => void;
}
