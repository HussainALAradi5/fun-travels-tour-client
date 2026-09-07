export const authUtils = {
    // Save session data after login
    saveSession: (token: string, user: any) => {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
    },

    // Retrieve user object from storage
    getUser: () => {
        const user = localStorage.getItem("user");
        try {
            return user ? JSON.parse(user) : null;
        } catch (e) {
            console.error("Failed to parse user from localStorage", e);
            return null;
        }
    },

    getUserType: (): string => {
        const user = authUtils.getUser();
        return (user?.userType || "GUEST").toUpperCase();
    },

    isAdmin: (): boolean => {
        return authUtils.getUserType() === "ADMIN";
    },

    getToken: (): string | null => {
        return localStorage.getItem("token");
    },

    // Just clear data - the component/hook will handle the redirect
    logout: () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    },
};