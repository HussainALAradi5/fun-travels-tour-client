import { useState, useCallback, useEffect } from "react";
import { paymentService } from "@/Api/Payment";
import type { Payment } from "@/interface/PaymentInterface";

export function usePayment(param?: string | number) {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [payment, setPayment] = useState<Payment | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPayments = useCallback(async (params = {}) => {
    setIsLoading(true);
    try {
      const res = await paymentService.filter(params);
      setPayments(res);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (param) {
      setIsLoading(true);
      paymentService.getById(Number(param))
        .then(setPayment)
        .finally(() => setIsLoading(false));
    } else {
      fetchPayments();
    }
  }, [param, fetchPayments]); // <-- FIXED HERE

  return { payments, payment, isLoading, fetchPayments };
}