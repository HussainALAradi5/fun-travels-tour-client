import { useState, useCallback, useEffect } from "react";
import { paymentService } from "@/Api/Payment";
import type { PaymentFilterParams } from "@/interface/payment/PaymentFilterParams";
import type { Payment } from "@/interface/payment/Payment";

export function usePayment(paymentId?: number) {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [payment, setPayment] = useState<Payment | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchPayments = useCallback(async (params: PaymentFilterParams = {}) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await paymentService.filter(params);
      setPayments(res);
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
    } else {
      fetchPayments();
    }
  }, [paymentId, fetchPayments]);

  return { payments, payment, isLoading, error, fetchPayments };
}

