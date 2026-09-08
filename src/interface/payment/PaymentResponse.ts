import type { PaymentMethod } from '../../enums/payment/PaymentMethod';
import type { PaymentStatus } from '../../enums/payment/PaymentStatus';

export interface PaymentResponse {
  id: number;
  amount: number;
  currency?: string;
  method: PaymentMethod;
  status: PaymentStatus;
  transactionId?: string;
  reservation?: { id: number; reservationNumber: string };
  paymentDate?: string;
}
