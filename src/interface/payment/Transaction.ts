import type { TransactionType } from '../../enums/TransactionType';
import type { Payment } from './Payment';
import type { TourReservation } from '../tour/TourReservation';
import type { AccountSummary } from './AccountSummary';

export interface Transaction {
  id?: number;
  type: TransactionType;
  amount: number;
  account?: AccountSummary;
  payment?: Partial<Payment>;
  reservation?: Partial<TourReservation>;
  description?: string;
  timestamp?: string;
}

export const DEFAULT_TRANSACTION: Partial<Transaction> = {
  type: "PAYMENT" as TransactionType,
  amount: 0,
};
