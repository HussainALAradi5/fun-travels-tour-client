import { TransactionType } from "@/enums/TransactionType";
import type { Account } from "./AccountInterface";
import type { Payment } from "./PaymentInterface";
import type { TourReservation } from "./tourmanagement/TourReservationInterface";

export interface Transaction {
  id?: number;
  type: TransactionType;
  amount: number;
  account?: Partial<Account>;
  payment?: Partial<Payment>; 
  reservation?: Partial<TourReservation>;
  description?: string;
  timestamp?: string;
}

export const DEFAULT_TRANSACTION: Partial<Transaction> = {
  amount: 0.00,
  type: TransactionType.PAYMENT,
};