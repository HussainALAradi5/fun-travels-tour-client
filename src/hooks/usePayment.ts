import { useState, useCallback, useEffect } from "react";
import { paymentService } from "@/services/payment/paymentService";
import type { PaymentFilterParams } from "@/interfaces/payment/PaymentFilterParams";
import type { Payment } from "@/interfaces/payment/Payment";

export function usePayment(paymentId?: number) {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [payment, setPayment] = useState<Payment | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchPayments = useCallback(async (params: PaymentFilterParams = {}) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await paymentService.getAll(params);
      setPayments(res.content);
    } catch (cause) {
      setError(cause instanceof Error ? cause : new Error("Unable to load payments"));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (paymentId !== undefined) {
      setIsLoading(true);
      setError(null);
      paymentService
        .getById(paymentId)
        .then(setPayment)
        .catch((cause) => {
          setPayment(null);
          setError(cause instanceof Error ? cause : new Error("Unable to load payment"));
        })
        .finally(() => setIsLoading(false));
    }
  }, [paymentId, fetchPayments]);

  return { payments, payment, isLoading, error, fetchPayments };
}

