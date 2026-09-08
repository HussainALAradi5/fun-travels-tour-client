import type { PaymentMethod } from '../../enums/payment/PaymentMethod';
import type { PaymentStatus } from '../../enums/payment/PaymentStatus';

export interface Payment {
  id?: number;
  transactionId?: string;
  method: PaymentMethod;
  status: PaymentStatus;
  amount: number;
  currency?: string;
  paymentDate?: string;
  reservation?: { id?: number; reservationNumber?: string };
  transactions?: { id?: number; amount?: number }[];
}
