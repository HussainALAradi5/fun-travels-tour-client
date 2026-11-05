import { HStack, IconButton, Stack, Text } from "@chakra-ui/react";
import { Minus, Plus } from "lucide-react";
import type { CounterRowProps } from "@/interfaces/props/booking/CounterRowProps";

/** One traveler type with minus and plus buttons. */
export const CounterRow = ({ label, hint, value, min, canAdd, onChange }: CounterRowProps) => (
  <HStack justify="space-between" py={2}>
    <Stack gap={0}>
      <Text fontWeight="bold">{label}</Text>
      <Text fontSize="xs" color="fg.muted">{hint}</Text>
    </Stack>
    <HStack gap={3}>
      <IconButton aria-label={`Fewer ${label.toLowerCase()}`} size="sm" variant="outline" borderRadius="full"
        disabled={value <= min} onClick={() => onChange(value - 1)}><Minus size={14} /></IconButton>
      <Text minW="6" textAlign="center" fontWeight="black" fontSize="lg" aria-live="polite">{value}</Text>
      <IconButton aria-label={`More ${label.toLowerCase()}`} size="sm" variant="outline" borderRadius="full"
        disabled={!canAdd} onClick={() => onChange(value + 1)}><Plus size={14} /></IconButton>
    </HStack>
  </HStack>
);
