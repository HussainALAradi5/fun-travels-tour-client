import type { PaymentMethod } from "@/enums/payment/PaymentMethod";
import type { PaymentStatus } from "@/enums/payment/PaymentStatus";
import type { TourReservation } from "./tourmanagement/TourReservationInterface";
import type { Transaction } from "./TransactionInterface";

export interface Payment {
  id?: number;
  transactionId?: string; // e.g. "ch_123abc" or "TRX-A8F9"
  method: PaymentMethod;
  status: PaymentStatus;
  amount: number;
  currency?: string;
  paymentDate?: string;
  reservation?: Partial<TourReservation>;
  transactions?: Transaction[];
}

export const DEFAULT_PAYMENT: Partial<Payment> = {
  amount: 0.00,
  currency: "USD",
};