import axios from "axios";
import { toaster } from "@/components/ui/toaster";
import { reflectApiError } from "@/utilities/apiErrorHandler";

export const BaseApi = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

const apiClient = axios.create({
  baseURL: BaseApi,
  headers: {
    "Content-Type": "application/json",
  },
});

// REQUEST INTERCEPTOR: Attach Token automatically
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// RESPONSE INTERCEPTOR: Global Error Handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle Auth Errors (401/403)
    if (error.response?.status === 401 || error.response?.status === 403) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }

    // Skip global toast for auth endpoints (login/register handle their own errors)
    const isAuthEndpoint = error.config?.url?.includes("/auth/");

    if (!isAuthEndpoint) {
      const cleanMessage = reflectApiError(error);
      toaster.create({
        title: "Operation Failed",
        description: cleanMessage,
        type: "error",
      });
    }

    return Promise.reject(error);
  }
);

export default apiClient;
