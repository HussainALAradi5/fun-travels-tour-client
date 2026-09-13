export interface ApiErrorResponse {
  success: boolean;
  code?: string;
  message: string;
  status?: number;
  fieldErrors?: Record<string, string>;
  timestamp?: string;
  path?: string;
}
