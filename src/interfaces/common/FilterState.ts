export interface FilterState<T> {
  searchTerm: string;
  searchKey?: keyof T;
  currentPage: number;
  pageSize: number;
  filters?: Partial<Record<keyof T, string | number | boolean>>;
}
