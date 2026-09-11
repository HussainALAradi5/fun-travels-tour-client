import { useState } from "react";
import { walletService } from "@/Api/Wallet";
import { toaster } from "@/components/ui/toaster";
import type { PaymentMethod } from "@/enums/payment/PaymentMethod";

export function useWallet() {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleTopUp = async (amount: number, method: PaymentMethod, gatewayToken: string) => {
    setIsProcessing(true);
    
    try {
      const tx = await walletService.topUp(amount, method, gatewayToken);
      toaster.create({ title: "Top-up successful!", description: "Funds added to your wallet.", type: "success" });
      return tx;
    } catch (error: unknown) {
      const errorMsg = error instanceof Error ? error.message : "Payment failed. Please check your card.";
      toaster.create({ title: "Payment Failed", description: errorMsg, type: "error" });
      throw error;
    } finally {
      setIsProcessing(false);
    }
  };

  return { handleTopUp, isProcessing };
}
