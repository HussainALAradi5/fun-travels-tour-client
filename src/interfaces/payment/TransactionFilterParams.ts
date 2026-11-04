import type { TransactionType } from "@/enums/TransactionType";
import type { FilterInterface } from "@/interfaces/common/FilterInterface";

export type TransactionSortField = "id" | "timestamp" | "amount" | "type";

export interface TransactionFilterParams extends FilterInterface {
  sortBy?: TransactionSortField;
  userId?: number;
  type?: TransactionType;
  agencyId?: number;
  branchId?: number;
}
