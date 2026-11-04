export interface FilterResult<T> {
  paginatedData: T[];
  totalItems: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
}
