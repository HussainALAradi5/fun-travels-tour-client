import type { TransactionType } from '../../enums/TransactionType';

export interface TransactionResponse {
  id: number;
  amount: number;
  transactionType: TransactionType;
  description?: string;
  account?: { id: number; accountNumber: string; accountName: string };
  timestamp?: string;
}
