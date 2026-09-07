import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { authUtils } from "@/utilities/AuthUtils";

interface AuthContextType {
  user: any;
  isAdmin: boolean;
  isAuthenticated: boolean;
  loading: boolean;
  refreshAuth: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  /**
   * Syncs the React state with the current data in localStorage.
   * This ensures that even if a user manually edits localStorage, 
   * the app can respond accordingly.
   */
  const refreshAuth = () => {
    const updatedUser = authUtils.getUser();
    const updatedAdmin = authUtils.isAdmin();

    setUser(updatedUser);
    setIsAdmin(updatedAdmin);
    setLoading(false);
  };

  /**
   * Clears the user session from both localStorage and the React state.
   */
  const logout = () => {
    authUtils.logout();
    setUser(null);
    setIsAdmin(false);
    // Note: We don't set loading back to true here as the operation is instant
  };

  /**
   * Runs once when the application boots up.
   * This is the bridge between the browser's storage and your React UI.
   */
  useEffect(() => {
    refreshAuth();
  }, []);

  // Derived state: If a user object exists, the user is authenticated.
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

/**
 * Custom hook to access auth state anywhere in the component tree.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};