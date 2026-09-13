import { useState, useEffect } from "react";
import {
  VStack, HStack, Text, Box, Button, Input,
  SimpleGrid, Icon, Separator, Center, Spinner
} from "@chakra-ui/react";
import { CreditCard, Wallet, Landmark, ShieldCheck, AlertCircle } from "lucide-react";
import { loadStripe, type Stripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { AppDialog } from "@/components/ui/Custom/Dialogs/AppDialog";
import { PaymentMethodColors } from "@/constants/roles/Colors";
import { walletService } from "@/Api/Wallet";
import { StripeCheckoutForm } from "./Wallet/StripeCheckoutForm";
import type { WalletTopUpModalProps } from "@/interface/props/booking/WalletTopUpModalProps";

export const WalletTopUpModal = ({ open, onClose, onSuccess }: WalletTopUpModalProps) => {
  const [amount, setAmount] = useState<string>("50");
  const [method, setMethod] = useState<string>("CREDIT_CARD");
  const predefinedAmounts = ["50", "100", "250", "500"];
  const [stripePromise, setStripePromise] = useState<Promise<Stripe | null> | null>(null);

  useEffect(() => {
    if (open && !stripePromise) {
      console.log("🟦 Modal Opened: Initiating Stripe Setup...");
      walletService.getConfig()
        .then((data: { publishableKey: string }) => {
          console.log("✅ Modal: Config fetched successfully. Injecting key into loadStripe().");
          setStripePromise(loadStripe(data.publishableKey));
        })
        .catch((err: unknown) => {
          console.error("❌ Modal: Failed to fetch Stripe configuration from backend.", err);
        });
    }
  }, [open, stripePromise]);
  const handleClose = () => {
    console.log("🟨 Modal Closed: Resetting state.");
    setAmount("50");
    setMethod("CREDIT_CARD");
    onClose();
  };

  return (
    <AppDialog
      open={open}
      onClose={handleClose}
      title="Top Up Digital Wallet"
      icon={Wallet}
      size="md"
    >
      <VStack align="stretch" gap={6} py={2}>
<VStack align="start" gap={3}>
          <Text fontSize="sm" fontWeight="bold" color="fg.muted" letterSpacing="wider">
            SELECT AMOUNT (USD)
          </Text>
          <SimpleGrid columns={4} gap={3} w="full">
            {predefinedAmounts.map((amt) => (
              <Button
                key={amt}
                variant={amount === amt ? "solid" : "outline"}
                colorPalette="blue"
                onClick={() => setAmount(amt)}
                size="lg"
                borderRadius="xl"
              >
                ${amt}
              </Button>
            ))}
          </SimpleGrid>
          <Input
            type="number"
            placeholder="Or enter custom amount..."
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            size="xl"
            borderRadius="xl"
            mt={2}
            fontWeight="bold"
            fontSize="lg"
          />
        </VStack>

        <Separator />
<VStack align="start" gap={3}>
          <Text fontSize="sm" fontWeight="bold" color="fg.muted" letterSpacing="wider">
            PAYMENT METHOD
          </Text>
          <HStack w="full" gap={3}>
            <PaymentOption
              icon={CreditCard} label="Credit Card"
              active={method === "CREDIT_CARD"}
              colorScheme={PaymentMethodColors.CREDIT_CARD}
              onClick={() => setMethod("CREDIT_CARD")}
            />
            <PaymentOption
              icon={Landmark} label="Bank Transfer"
              active={method === "BANK_TRANSFER"}
              colorScheme={PaymentMethodColors.BANK_TRANSFER}
              onClick={() => setMethod("BANK_TRANSFER")}
            />
          </HStack>
        </VStack>
<Box
          p={5}
          bg="bg.subtle"
          borderRadius="2xl"
          border="1px solid"
          borderColor="border.subtle"
        >
          <HStack justify="space-between" mb={4}>
            <HStack color="green.500">
              <Icon as={ShieldCheck} size="sm" />
              <Text fontSize="xs" fontWeight="bold">SECURE CHECKOUT</Text>
            </HStack>
          </HStack>
{stripePromise ? (
            <Elements stripe={stripePromise}>
              <StripeCheckoutForm
                amount={amount}
                method={method}
                onSuccess={onSuccess}
                onClose={handleClose}
              />
            </Elements>
          ) : (
            <Center py={6}>
              <Spinner color="blue.500" />
            </Center>
          )}

        </Box>

        <HStack justify="center" opacity={0.6}>
          <Icon as={AlertCircle} size="xs" />
          <Text fontSize="xs">This is a secure, 256-bit encrypted transaction.</Text>
        </HStack>

      </VStack>
    </AppDialog>
  );
};

import type { PaymentOptionProps } from "@/interface/props/ui/PaymentOptionProps";
const PaymentOption = ({ icon: IconComponent, label, active, onClick, colorScheme }: PaymentOptionProps) => (
  <Button
    flex={1}
    h="auto"
    py={5}
    variant={active ? "solid" : "outline"}
    colorPalette={active ? colorScheme || "blue" : "gray"}
    onClick={onClick}
    flexDirection="column"
    gap={3}
    borderRadius="xl"
    borderWidth={active ? "2px" : "1px"}
    transition="all 0.2s"
  >
    <IconComponent size={24} />
    <Text fontSize="sm" fontWeight={active ? "bold" : "medium"}>{label}</Text>
  </Button>
);
