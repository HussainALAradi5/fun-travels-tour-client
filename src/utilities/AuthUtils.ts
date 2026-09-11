import type { User } from "@/interface/user/User";

export const authUtils = {
    saveSession: (token: string, user: User) => {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
    },

    getUser: (): User | null => {
        const user = localStorage.getItem("user");
        if (!user) return null;
        try {
            return JSON.parse(user) as User;
        } catch {
            return null;
        }
    },

    getToken: (): string | null => {
        return localStorage.getItem("token");
    },

    isAdmin: (): boolean => {
        const user = localStorage.getItem("user");
        if (!user) return false;
        try {
            const parsed = JSON.parse(user) as User;
            return parsed.userType === "ADMIN";
        } catch {
            return false;
        }
    },

    getUserType: (): string => {
        const user = localStorage.getItem("user");
        if (!user) return "";
        try {
            const parsed = JSON.parse(user) as User;
            return parsed.userType;
        } catch {
            return "";
        }
    },

    isAuthenticated: (): boolean => {
        return !!localStorage.getItem("token");
    },

    logout: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    }
};
