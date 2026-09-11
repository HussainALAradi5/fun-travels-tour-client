import { createContext, useContext, useState, type ReactNode } from "react";
import { authUtils } from "@/utilities/AuthUtils";
import type { AuthContextType } from "@/interface/common/AuthContextType";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthContextType["user"]>(() => authUtils.getUser());
  const [isAdmin, setIsAdmin] = useState<boolean>(() => authUtils.isAdmin());
  const [loading, setLoading] = useState<boolean>(false);
const refreshAuth = () => {
    const updatedUser = authUtils.getUser();
    const updatedAdmin = authUtils.isAdmin();

    setUser(updatedUser);
    setIsAdmin(updatedAdmin);
    setLoading(false);
  };
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
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
