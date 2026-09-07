import axios from "axios";
import { toaster } from "@/components/ui/toaster";
import { reflectApiError } from "@/utilities/apiErrorHandler";

// Base URL for the Spring Boot backend
export const BaseApi = "http://localhost:8080/api";

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

// RESPONSE INTERCEPTOR: Global Error Reflection & UI Feedback
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // 1. Handle Auth Errors (401/403)
    if (error.response?.status === 401 || error.response?.status === 403) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      // Optional: window.location.href = "/login";
    }

    // 2. AUTOMATED REFLECTION
    // Extract the clean 'message' defined in your Backend or fallback to standard axios error
    const cleanMessage = reflectApiError(error);

    // 3. GLOBAL UI NOTIFICATION
    // This triggers the toast automatically for EVERY failed API call
    toaster.create({
      title: "Operation Failed",
      description: cleanMessage,
      type: "error",
    });

    // 4. Reject with a clean Error object
    // This allows your hooks/components to still catch the error if they need specific logic
    return Promise.reject(new Error(cleanMessage));
  }
);

export default apiClient;