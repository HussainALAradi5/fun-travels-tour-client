import { useState, useCallback, useEffect } from "react";
import { accountService } from "@/Api/Account";

export function useAccount(userId?: number) {
  const [balance, setBalance] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchBalance = useCallback(async () => {
    if (!userId) return;
    setIsLoading(true);
    try {
      const res = await accountService.getBalance(userId);
      setBalance(res.balance);
    } catch (error) {
      setBalance(0);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  return { balance, fetchBalance, isLoading };
}
