import { useState } from "react";
import { walletService } from "@/Api/Wallet";
import { toaster } from "@/components/ui/toaster";
import type { PaymentMethod } from "@/enums/payment/PaymentMethod";

export function useWallet() {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleTopUp = async (amount: number, method: PaymentMethod, gatewayToken: string) => {
    console.group("💳 Hook: useWallet -> handleTopUp");
    console.log("Starting top up process...");
    setIsProcessing(true);
    
    try {
      const tx = await walletService.topUp(amount, method, gatewayToken);
      console.log("✅ Hook: Transaction returned successfully.", tx);
      toaster.create({ title: "Top-up successful!", description: "Funds added to your wallet.", type: "success" });
      
      console.groupEnd();
      return tx;
    } catch (error: any) {
      const errorMsg = error.response?.data || "Payment failed. Please check your card.";
      console.error("❌ Hook: Transaction failed. Error Msg:", errorMsg);
      toaster.create({ title: "Payment Failed", description: errorMsg, type: "error" });
      
      console.groupEnd();
      throw error;
    } finally {
      setIsProcessing(false);
    }
  };

  return { handleTopUp, isProcessing };
}