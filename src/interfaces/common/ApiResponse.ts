export interface ApiResponse<T> {
  success: boolean;
  code: string;
  message: string;
  data: T;
  fieldErrors?: Record<string, string>;
  timestamp?: string;
  path?: string;
}
