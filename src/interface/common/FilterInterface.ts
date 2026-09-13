import type { PaginationParams } from "@/interface/common/PaginationParams";

/** Shared query contract for server-side filtering, sorting, and pagination. */
export interface FilterInterface extends PaginationParams {
  search?: string;
  startDate?: string;
  endDate?: string;
}
