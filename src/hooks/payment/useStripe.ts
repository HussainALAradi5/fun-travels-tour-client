import { useEffect, useState } from "react";
import { loadStripe, type Stripe } from "@stripe/stripe-js";
import { walletService } from "@/services/payment/walletService";

/** Loads Stripe with the server's publishable key the first time it is needed. */
export function useStripe(enabled: boolean) {
  const [stripePromise, setStripePromise] = useState<Promise<Stripe | null> | null>(null);
  useEffect(() => {
    if (!enabled || stripePromise) return;
    walletService.getConfig()
      .then((config: { publishableKey: string }) => setStripePromise(loadStripe(config.publishableKey)))
      .catch((err: unknown) => console.error("Stripe configuration could not be loaded", err));
  }, [enabled, stripePromise]);
  return stripePromise;
}
