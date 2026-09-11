import { AxiosError } from "axios";
import type { ApiErrorResponse } from "@/interface/common/ApiErrorResponse";

export const reflectApiError = (error: unknown): string => {
  const axiosError = error as AxiosError<ApiErrorResponse>;

  if (axiosError.response?.data?.message) {
    return axiosError.response.data.message;
  }

  if (axiosError.message) {
    return axiosError.message;
  }

  return "An unexpected system error occurred.";
};
