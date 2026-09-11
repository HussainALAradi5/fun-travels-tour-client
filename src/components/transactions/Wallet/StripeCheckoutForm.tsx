import React from "react";
import { VStack, Box, Button, Icon, Text } from "@chakra-ui/react";
import { ChevronRight } from "lucide-react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { toaster } from "@/components/ui/toaster";
import { useWallet } from "@/hooks/useWallet";
import type { StripeCheckoutFormProps } from "@/interface/props/booking/StripeCheckoutFormProps";
import type { PaymentMethod } from "@/enums/payment/PaymentMethod";

export const StripeCheckoutForm = ({ amount, method, onSuccess, onClose }: StripeCheckoutFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const { handleTopUp, isProcessing } = useWallet();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.groupCollapsed("🛡️ Stripe Checkout Process Initiated");
    console.info(`Attempting to pay $${amount} via ${method}`);

    if (!stripe || !elements) {
      console.error("❌ Stripe.js has not loaded yet.");
      console.groupEnd();
      return;
    }

    const val = parseFloat(amount);
    if (isNaN(val) || val <= 0) {
      console.warn("⚠️ Invalid amount entered:", amount);
      toaster.create({ title: "Please enter a valid amount", type: "error" });
      console.groupEnd();
      return;
    }

    let gatewayToken = "OFFLINE_PAYMENT";

    if (method === "CREDIT_CARD") {
      console.log("Retrieving CardElement data...");
      const cardElement = elements.getElement(CardElement);

      if (!cardElement) {
        console.error("❌ CardElement not found in DOM");
        console.groupEnd();
        return;
      }

      console.log("Calling stripe.createToken()...");
      const { error, token } = await stripe.createToken(cardElement);

      if (error) {
        console.error("❌ Stripe Tokenization Error:", error);
        toaster.create({ title: error.message || "Card validation failed", type: "error" });
        console.groupEnd();
        return;
      }

      console.log("✅ Stripe Tokenization Success! Token ID:", token.id);
      gatewayToken = token.id;
    } else {
      console.log("Skipping Stripe tokenization (Method is not CREDIT_CARD).");
    }

    try {
      console.log("Calling Backend API via useWallet hook...");
      await handleTopUp(val, method as PaymentMethod, gatewayToken);
      console.log("✅ Full Flow Completed. Closing Modal & Triggering Success Callback.");
      onSuccess();
      onClose();
    } catch {
      console.error("❌ Full Flow Failed at Backend Stage.");
    } finally {
      console.groupEnd();
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      <VStack align="stretch" gap={4}>

        {method === "CREDIT_CARD" ? (
          <Box p={4} bg="bg.panel" borderRadius="xl" border="1px solid" borderColor="border.subtle" shadow="sm">
            <CardElement
              options={{
                style: {
                  base: { fontSize: '16px', color: '#424770', fontFamily: 'Inter, sans-serif', '::placeholder': { color: '#aab7c4' } },
                  invalid: { color: '#e53e3e' },
                },
              }}
            />
          </Box>
        ) : (
          <Box p={4} bg="bg.subtle" borderRadius="xl" textAlign="center">
            <Text fontSize="sm" color="fg.muted">You will receive wire transfer instructions after clicking Pay.</Text>
          </Box>
        )}

        <Button type="submit" colorPalette="blue" size="xl" borderRadius="xl" loading={isProcessing || !stripe} w="full" shadow="md">
          Pay ${amount || "0.00"} securely <Icon as={ChevronRight} />
        </Button>
      </VStack>
    </form>
  );
};
