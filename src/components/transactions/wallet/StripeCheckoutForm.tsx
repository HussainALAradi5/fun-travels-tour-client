import { VStack, Box, Button, Icon } from "@chakra-ui/react";
import { ChevronRight } from "lucide-react";
import { CardElement } from "@stripe/react-stripe-js";
import { CARD_ELEMENT_OPTIONS } from "@/constants/payment/topUp";
import { useCardTopUp } from "@/hooks/payment/useCardTopUp";
import type { StripeCheckoutFormProps } from "@/interfaces/props/booking/StripeCheckoutFormProps";

/** Card top-up form. Wallet top-ups are card only; bookings are then paid from the wallet. */
export const StripeCheckoutForm = ({ amount, onSuccess, onClose }: StripeCheckoutFormProps) => {
  const { submit, busy } = useCardTopUp(amount, () => { onSuccess(); onClose(); });
  return (
    <form onSubmit={submit} style={{ width: "100%" }}>
      <VStack align="stretch" gap={4}>
        <Box p={4} bg="bg.panel" borderRadius="xl" border="1px solid" borderColor="border.subtle" shadow="sm">
          <CardElement options={CARD_ELEMENT_OPTIONS} />
        </Box>
        <Button type="submit" colorPalette="blue" size="xl" borderRadius="xl" loading={busy} w="full" shadow="md">
          Pay ${amount || "0.00"} securely <Icon as={ChevronRight} />
        </Button>
      </VStack>
    </form>
  );
};
