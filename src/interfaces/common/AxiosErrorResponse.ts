import type { ApiErrorResponse } from "./ApiErrorResponse";

export interface AxiosErrorResponse {
  data?: Partial<ApiErrorResponse>;
}
