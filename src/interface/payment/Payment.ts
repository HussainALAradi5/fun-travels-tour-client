import type { PaymentMethod } from '../../enums/payment/PaymentMethod';
import type { PaymentStatus } from '../../enums/payment/PaymentStatus';
import type { TourReservation } from '../tour/TourReservation';
import type { Transaction } from './Transaction';

export interface Payment {
  id?: number;
  transactionId?: string;
  method: PaymentMethod;
  status: PaymentStatus;
  amount: number;
  currency?: string;
  paymentDate?: string;
  reservation?: Partial<TourReservation>;
  transactions?: Transaction[];
}

export const DEFAULT_PAYMENT: Partial<Payment> = {
  method: "CREDIT_CARD" as PaymentMethod,
  status: "PENDING" as PaymentStatus,
  amount: 0,
};
