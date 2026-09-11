import type { TransactionType } from "@/enums/TransactionType";
import type { GenericFilterParams } from "@/interface/common/GenericFilterParams";

export interface TransactionFilterParams extends GenericFilterParams {
  userId?: number;
  type?: TransactionType;
  agencyId?: number;
  branchId?: number;
}
