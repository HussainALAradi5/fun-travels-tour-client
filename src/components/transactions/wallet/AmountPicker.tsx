import { Button, Input, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { TOP_UP_PRESETS } from "@/constants/payment/topUp";
import type { AmountPickerProps } from "@/interfaces/props/payment/AmountPickerProps";

export const AmountPicker = ({ amount, onChange }: AmountPickerProps) => (
  <VStack align="start" gap={3}>
    <Text fontSize="sm" fontWeight="bold" color="fg.muted" letterSpacing="wider">SELECT AMOUNT (USD)</Text>
    <SimpleGrid columns={TOP_UP_PRESETS.length} gap={3} w="full">
      {TOP_UP_PRESETS.map((preset) => (
        <Button key={preset} variant={amount === preset ? "solid" : "outline"} colorPalette="blue" onClick={() => onChange(preset)} size="lg" borderRadius="xl">
          ${preset}
        </Button>
      ))}
    </SimpleGrid>
    <Input type="number" min={1} step="0.01" aria-label="Custom amount" placeholder="Or enter custom amount..." value={amount}
      onChange={(e) => onChange(e.target.value)} size="xl" borderRadius="xl" mt={2} fontWeight="bold" fontSize="lg" />
  </VStack>
);
