import { useState } from "react";
import { Box, Center, HStack, Icon, Separator, Spinner, Text, VStack } from "@chakra-ui/react";
import { Elements } from "@stripe/react-stripe-js";
import { CreditCard, Lock, ShieldCheck, Wallet } from "lucide-react";
import { AppDialog } from "@/components/ui/custom/dialogs/AppDialog";
import { DEFAULT_TOP_UP } from "@/constants/payment/topUp";
import { useStripe } from "@/hooks/payment/useStripe";
import type { WalletTopUpModalProps } from "@/interfaces/props/booking/WalletTopUpModalProps";
import { AmountPicker } from "./wallet/AmountPicker";
import { StripeCheckoutForm } from "./wallet/StripeCheckoutForm";

export const WalletTopUpModal = ({ open, onClose, onSuccess }: WalletTopUpModalProps) => {
  const [amount, setAmount] = useState(DEFAULT_TOP_UP);
  const stripePromise = useStripe(open);
  const handleClose = () => { setAmount(DEFAULT_TOP_UP); onClose(); };
  return (
    <AppDialog open={open} onClose={handleClose} title="Top Up Digital Wallet" icon={Wallet} size="md">
      <VStack align="stretch" gap={6} py={2}>
        <AmountPicker amount={amount} onChange={setAmount} />
        <Separator />
        <HStack gap={2} color="fg.muted"><Icon as={CreditCard} /><Text fontSize="sm" fontWeight="bold">Pay by card</Text></HStack>
        <Box p={5} bg="bg.subtle" borderRadius="2xl" border="1px solid" borderColor="border.subtle">
          <HStack color="green.500" mb={4}><Icon as={ShieldCheck} size="sm" /><Text fontSize="xs" fontWeight="bold">SECURE CHECKOUT</Text></HStack>
          {stripePromise ? (
            <Elements stripe={stripePromise}>
              <StripeCheckoutForm amount={amount} onSuccess={onSuccess} onClose={handleClose} />
            </Elements>
          ) : <Center py={6}><Spinner color="blue.500" /></Center>}
        </Box>
        <HStack justify="center" opacity={0.7}>
          <Icon as={Lock} size="xs" />
          <Text fontSize="xs">Card details go directly to Stripe and never reach our servers.</Text>
        </HStack>
      </VStack>
    </AppDialog>
  );
};
