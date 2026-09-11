import type { AxiosErrorResponse } from "./AxiosErrorResponse";

export interface AxiosError {
  response?: AxiosErrorResponse;
  message?: string;
}
