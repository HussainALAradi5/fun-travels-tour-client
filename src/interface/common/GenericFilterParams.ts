export type SortDirection = "asc" | "desc";

export interface GenericFilterParams<
  TSortBy extends string = string,
  TStatus extends string = string,
> {
  page?: number;
  size?: number;
  search?: string;
  status?: TStatus;
  startDate?: string;
  endDate?: string;
  sortBy?: TSortBy;
  sortDir?: SortDirection;
}
