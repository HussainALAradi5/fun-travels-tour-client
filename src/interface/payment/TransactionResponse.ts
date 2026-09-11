import type { TransactionType } from '../../enums/TransactionType';
import type { AccountSummary } from './AccountSummary';

export interface TransactionResponse {
  id: number;
  amount: number;
  transactionType: TransactionType;
  description?: string;
  account?: AccountSummary;
  timestamp?: string;
}

export const DEFAULT_TRANSACTION_RESPONSE: Partial<TransactionResponse> = {
  amount: 0,
  description: "",
};
