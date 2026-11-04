import type { PaginationParams } from "@/interfaces/common/PaginationParams";

/** Shared query contract for server-side filtering, sorting, and pagination. */
export interface FilterInterface extends PaginationParams {
  search?: string;
  startDate?: string;
  endDate?: string;
}
