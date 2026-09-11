import type { PaymentMethod } from '../../enums/payment/PaymentMethod';
import type { PaymentStatus } from '../../enums/payment/PaymentStatus';
import type { TourReservation } from '../tour/TourReservation';

export interface PaymentResponse {
  id: number;
  amount: number;
  currency?: string;
  method: PaymentMethod;
  status: PaymentStatus;
  transactionId?: string;
  reservation?: Partial<TourReservation>;
  paymentDate?: string;
}
