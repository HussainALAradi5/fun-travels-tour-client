import type { PaymentMethod } from "@/enums/payment/PaymentMethod";
import type { PaymentStatus } from "@/enums/payment/PaymentStatus";
import type { FilterInterface } from "@/interface/common/FilterInterface";

export type PaymentSortField =
  | "id"
  | "amount"
  | "currency"
  | "method"
  | "status"
  | "transactionId"
  | "paymentDate";

export interface PaymentFilterParams extends FilterInterface {
  sortBy?: PaymentSortField;
  status?: PaymentStatus;
  userId?: number;
  method?: PaymentMethod;
  date?: string;
}
