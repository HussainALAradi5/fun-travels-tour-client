export interface FilterParams {
  page?: number;
  size?: number;
  sortBy?: string;
  sortDir?: 'asc' | 'desc';
  search?: string;
  [key: string]: string | number | boolean | undefined;
}
