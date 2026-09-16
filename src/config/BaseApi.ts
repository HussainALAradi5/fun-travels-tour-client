import axios from "axios";
import { toaster } from "@/components/ui/toaster";
import { reflectApiError } from "@/utilities/apiErrorHandler";

export const BaseApi = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api";

const apiClient = axios.create({
  baseURL: BaseApi,
  headers: {
    "Content-Type": "application/json",
  },
});
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
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
    const isAuthEndpoint = error.config?.url?.includes("/auth/");

    if (!isAuthEndpoint) {
      const cleanMessage = reflectApiError(error);
      const requestMethod = error.config?.method?.toUpperCase() ?? "REQUEST";
      const requestUrl = error.config?.url ?? "unknown";
      const status = error.response?.status ?? "network";
      toaster.create({
        id: `api-error:${requestMethod}:${requestUrl}:${status}`,
        title: error.response?.status === 403 ? "Permission Denied" : "Unable to Complete Request",
        description: cleanMessage,
        type: "error",
      });
    }

    return Promise.reject(error);
  }
);

export default apiClient;
