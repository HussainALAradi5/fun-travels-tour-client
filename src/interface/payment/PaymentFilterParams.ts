import type { PaymentMethod } from "@/enums/payment/PaymentMethod";
import type { PaymentStatus } from "@/enums/payment/PaymentStatus";
import type { GenericFilterParams } from "@/interface/common/GenericFilterParams";

export interface PaymentFilterParams extends GenericFilterParams<string, PaymentStatus> {
  userId?: number;
  method?: PaymentMethod;
  date?: string;
}
