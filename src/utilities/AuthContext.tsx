import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { authUtils } from "@/utilities/AuthUtils";
import { userService } from "@/Api/User";
import type { AuthContextType } from "@/interface/common/AuthContextType";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthContextType["user"]>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const refreshAuth = useCallback(() => {
    const hasToken = Boolean(authUtils.getToken());
    const updatedUser = hasToken ? authUtils.getUser() : null;

    setUser(updatedUser);
    setIsAdmin(updatedUser?.userType === "ADMIN");
    setLoading(false);
  }, []);

  const refreshUser = useCallback(async () => {
    const storedUser = authUtils.getUser();
    if (!authUtils.getToken() || !storedUser?.id) return;

    try {
      const updatedUser = await userService.getProfile(storedUser.id);
      authUtils.saveSession(authUtils.getToken() ?? "", updatedUser);
      setUser(updatedUser);
      setIsAdmin(updatedUser.userType === "ADMIN");
    } catch {
      if (!authUtils.getToken()) {
        setUser(null);
        setIsAdmin(false);
      }
    }
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      refreshAuth();
      void refreshUser();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [refreshAuth, refreshUser]);

  const logout = useCallback(() => {
    authUtils.logout();
    setUser(null);
    setIsAdmin(false);
  }, []);

  const isAuthenticated = Boolean(user);
  const value = useMemo(
    () => ({
      user,
      isAdmin,
      isAuthenticated,
      loading,
      refreshAuth,
      refreshUser,
      logout,
    }),
    [user, isAdmin, isAuthenticated, loading, refreshAuth, refreshUser, logout],
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
