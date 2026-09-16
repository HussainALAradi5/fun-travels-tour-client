import type { TransactionType } from '../../enums/TransactionType';
import type { Account } from './Account';

export interface Transaction {
  id?: number;
  transactionType: TransactionType;
  amount: number;
  account?: Partial<Account>;
  description?: string;
  timestamp?: string;
}

export const DEFAULT_TRANSACTION: Partial<Transaction> = {
  transactionType: "PAYMENT" as TransactionType,
  amount: 0,
};
