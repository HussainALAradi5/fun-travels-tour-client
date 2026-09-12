import { useState, useCallback, useEffect } from "react";
import { transactionService } from "@/Api/Transaction";
import { toaster } from "@/components/ui/toaster";
import type { Transaction } from "@/interface/payment/Transaction";

export function useTransaction(param?: string | number) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const execute = async <R>(promise: Promise<R>, successTitle?: string): Promise<R> => {
    setIsMutating(true);
    try {
      const result = await promise;
      if (successTitle) toaster.create({ title: successTitle, type: "success" });
      return result;
    } finally {
      setIsMutating(false);
    }
  };

  const fetchTransactions = useCallback(async (params = {}) => {
    setIsLoading(true);
    try {
      const res = await transactionService.getAll(params);
      setTransactions(res.content);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleManualCredit = (userId: number, amount: number, description: string) =>
    execute(transactionService.manualCredit(userId, amount, description), "Credit Applied");

  useEffect(() => {
    if (param) {
      setIsLoading(true);
      transactionService.getById(Number(param))
        .then(setTransaction)
        .finally(() => setIsLoading(false));
    } else {
      fetchTransactions();
    }
  }, [param, fetchTransactions]);

  return {
    transactions,
    transaction,
    isLoading,
    isMutating,
    fetchTransactions,
    handleManualCredit,
  };
}



