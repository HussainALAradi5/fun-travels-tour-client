import type { User } from "@/interface/user/User";

const getStorage = () => typeof window === "undefined" ? null : window.localStorage;

export const authUtils = {
    saveSession: (token: string, user: User) => {
        const storage = getStorage();
        storage?.setItem("token", token);
        storage?.setItem("user", JSON.stringify(user));
    },

    getUser: (): User | null => {
        const user = getStorage()?.getItem("user");
        if (!user) return null;
        try {
            return JSON.parse(user) as User;
        } catch {
            return null;
        }
    },

    getToken: (): string | null => {
        return getStorage()?.getItem("token") ?? null;
    },

    isAdmin: (): boolean => {
        const user = getStorage()?.getItem("user");
        if (!user) return false;
        try {
            const parsed = JSON.parse(user) as User;
            return parsed.userType === "ADMIN";
        } catch {
            return false;
        }
    },

    getUserType: (): string => {
        const user = getStorage()?.getItem("user");
        if (!user) return "";
        try {
            const parsed = JSON.parse(user) as User;
            return parsed.userType;
        } catch {
            return "";
        }
    },

    isAuthenticated: (): boolean => {
        return !!getStorage()?.getItem("token");
    },

    logout: () => {
        const storage = getStorage();
        storage?.removeItem("token");
        storage?.removeItem("user");
    }
};
