import type { PaymentMethod } from "@/enums/payment/PaymentMethod";
import type { PaymentStatus } from "@/enums/payment/PaymentStatus";
import type { PaymentReservationSummary } from "./PaymentReservationSummary";

export interface Payment {
  id: number;
  amount: number;
  currency?: string;
  method: PaymentMethod;
  status: PaymentStatus;
  transactionId?: string;
  reservation?: PaymentReservationSummary | null;
  paymentDate?: string;
}
