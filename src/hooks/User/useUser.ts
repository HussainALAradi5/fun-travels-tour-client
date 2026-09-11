import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "@/lib/navigation";
import { userService } from "@/Api/User";
import { authUtils } from "@/utilities/AuthUtils";
import type { User } from "@/interface/user/User";

export function useUser() {
    const [user, setUser] = useState<User | null>(authUtils.getUser());
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const isAdmin = user?.userType?.toUpperCase() === "ADMIN" || authUtils.isAdmin();

    const handleLogout = useCallback(() => {
        authUtils.logout();
        setUser(null);
        navigate("/login");
    }, [navigate]);

    const fetchProfile = useCallback(async () => {
        const localUser = authUtils.getUser();
        const token = authUtils.getToken();

        if (localUser?.id && token) {
            setLoading(true);
            try {
                const response = await userService.getProfile(localUser.id);
                if (response) {
                    setUser(response);
                    localStorage.setItem("user", JSON.stringify(response));
                }
            } catch (error) {
                console.error("Profile sync failed:", error);
                handleLogout();
            } finally {
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    }, [handleLogout]);

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    return {
        user,
        loading,
        isAdmin,
        logout: handleLogout,
        refreshUser: fetchProfile,
    };
}

