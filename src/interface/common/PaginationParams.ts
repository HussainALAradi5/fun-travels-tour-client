import type { SortDirection } from "@/types/common/SortDirection";

export interface PaginationParams {
  page?: number;
  size?: number;
  sortBy?: string;
  sortDir?: SortDirection;
}
