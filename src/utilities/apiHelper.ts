import type { ApiResponse } from '../interface/common/ApiResponse';

export function extractData<T>(response: ApiResponse<T>): T {
  if (!response.success) {
    throw new Error(response.message || 'Request failed');
  }
  return response.data;
}

export function extractDataOrNull<T>(response: ApiResponse<T>): T | null {
  return response.success ? response.data : null;
}

export function isSuccess<T>(response: ApiResponse<T>): boolean {
  return response.success === true;
}

export function getErrorMessage<T>(response: ApiResponse<T>): string {
  return response.message || 'Unknown error occurred';
}
