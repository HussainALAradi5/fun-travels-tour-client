import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { userService } from "@/Api/User";
import { authUtils } from "@/utilities/AuthUtils";
import type { User } from "@/interface/UserInterface";

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
                if (response?.data) {
                    setUser(response.data);
                    localStorage.setItem("user", JSON.stringify(response.data));
                }
            } catch (error) {
                console.error("Profile sync failed:", error);
                // If token expired (401/403), logout
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