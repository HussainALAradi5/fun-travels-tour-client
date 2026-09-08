import type { TransactionType } from '../../enums/TransactionType';

export interface Transaction {
  id?: number;
  type: TransactionType;
  amount: number;
  account?: { id?: number; accountNumber?: string; accountName?: string };
  payment?: { id?: number };
  reservation?: { id?: number; reservationNumber?: string };
  description?: string;
  timestamp?: string;
}

export interface TransactionResponse {
  id: number;
  amount: number;
  transactionType: TransactionType;
  description?: string;
  account?: { id: number; accountNumber: string; accountName: string };
  timestamp?: string;
}
