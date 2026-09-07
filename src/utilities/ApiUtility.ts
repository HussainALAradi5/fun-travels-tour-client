/**
 * Core: The basic envelope for every server response.
 */
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

/**
 * Core: Standard Spring Boot Pageable structure.
 */
export interface ApiPageData<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}