import { HStack, Icon, Text } from "@chakra-ui/react";
import type { PriceLineProps } from "@/interfaces/props/booking/PriceLineProps";

/** One row of the price breakdown; negative amounts are discounts. */
export const PriceLine = ({ label, amount, icon, iconColor, highlight }: PriceLineProps) => (
  <HStack justify="space-between">
    <HStack gap={2}>
      {icon && <Icon as={icon} size="xs" color={iconColor} />}
      <Text color="fg.muted" fontSize="sm">{label}</Text>
    </HStack>
    <Text fontWeight="black" fontSize="md" color={highlight ? "teal.600" : undefined}>
      {amount < 0 ? "-" : amount > 0 && icon ? "+" : ""}${Math.abs(amount).toFixed(2)}
    </Text>
  </HStack>
);
