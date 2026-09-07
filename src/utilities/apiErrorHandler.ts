import { AxiosError } from "axios";

/**
 * Interface matching the JSON response from your GlobalExceptionHandler
 */
export interface ApiErrorResponse {
  success: boolean;
  message: string;
  status?: number;
}

/**
 * Extracts the backend error message for display in Toasts or Alerts.
 */
export const reflectApiError = (error: unknown): string => {
  const axiosError = error as AxiosError<ApiErrorResponse>;

  // 1. Prioritize the custom message from your backend JSON
  if (axiosError.response?.data?.message) {
    return axiosError.response.data.message;
  }

  // 2. Fallback to standard Axios network error messages
  if (axiosError.message) {
    return axiosError.message;
  }

  // 3. Generic fallback
  return "An unexpected system error occurred.";
};