import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { authUtils } from "@/utilities/AuthUtils";
import type { AuthContextType } from "@/interface/common/AuthContextType";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthContextType["user"]>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const refreshAuth = useCallback(() => {
    const updatedUser = authUtils.getUser();
    const updatedAdmin = authUtils.isAdmin();

    setUser(updatedUser);
    setIsAdmin(updatedAdmin);
    setLoading(false);
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(refreshAuth, 0);

    return () => window.clearTimeout(timeoutId);
  }, [refreshAuth]);

  const logout = () => {
    authUtils.logout();
    setUser(null);
    setIsAdmin(false);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin,
        isAuthenticated,
        loading,
        refreshAuth,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
