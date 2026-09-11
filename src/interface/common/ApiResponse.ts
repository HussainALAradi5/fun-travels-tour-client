export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface ApiPageData<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}
