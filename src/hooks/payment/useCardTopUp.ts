import type React from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { toaster } from "@/components/ui/toaster";
import { PaymentMethod } from "@/enums/payment/PaymentMethod";
import { useWallet } from "@/hooks/useWallet";

/** Turns the card into a Stripe token and asks the server to charge it and credit the wallet. */
export function useCardTopUp(amount: string, onDone: () => void) {
  const stripe = useStripe();
  const elements = useElements();
  const { handleTopUp, isProcessing } = useWallet();

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    const card = elements?.getElement(CardElement);
    if (!stripe || !card) return;
    const value = parseFloat(amount);
    if (Number.isNaN(value) || value <= 0) {
      toaster.create({ title: "Please enter a valid amount", type: "error" });
      return;
    }
    const { error, token } = await stripe.createToken(card);
    if (error) {
      toaster.create({ title: error.message || "Card validation failed", type: "error" });
      return;
    }
    try {
      await handleTopUp(value, PaymentMethod.CREDIT_CARD, token.id);
      onDone();
    } catch {
      // useWallet already shows the server's message.
    }
  };

  return { submit, busy: isProcessing || !stripe };
}
