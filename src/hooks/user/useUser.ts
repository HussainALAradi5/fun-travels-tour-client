import { useAuth } from "@/utilities/AuthContext";

export function useUser() {
    const { user, loading, isAdmin, logout, refreshUser } = useAuth();

    return {
        user,
        loading,
        isAdmin,
        logout,
        refreshUser,
    };
}

