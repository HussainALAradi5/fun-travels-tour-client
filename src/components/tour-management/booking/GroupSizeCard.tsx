import { Badge, Box, Button, HStack, Heading, Icon, Separator, Text } from "@chakra-ui/react";
import { Sparkles, Users } from "lucide-react";
import type { GroupSizeCardProps } from "@/interfaces/props/booking/GroupSizeCardProps";
import { CounterRow } from "./CounterRow";

/** The whole family in one place: how many adults and children, then seats for everyone in one click. */
export const GroupSizeCard = ({ adults, children, placesLeft, kidsDiscountPercent, kidsChairsFree, onChange, onSeatEveryone, seatsLoading }: GroupSizeCardProps) => {
  const room = !placesLeft || adults + children < placesLeft;
  return (
    <Box p={6} borderRadius="2xl" borderWidth="1px" bg="bg.panel" shadow="sm">
      <HStack justify="space-between" mb={2}>
        <HStack gap={3}><Icon as={Users} color="blue.500" /><Heading size="md">Who is traveling?</Heading></HStack>
        {placesLeft > 0 && <Badge colorPalette={room ? "green" : "orange"} variant="subtle">{placesLeft} places left</Badge>}
      </HStack>
      <CounterRow label="Adults" hint="Standard fare" value={adults} min={1} canAdd={room} onChange={(n) => onChange(n, children)} />
      <Separator />
      <CounterRow label="Children" value={children} min={0} canAdd={room} onChange={(n) => onChange(adults, n)}
        hint={kidsDiscountPercent > 0 ? `${kidsDiscountPercent}% off on a kids chair (${kidsChairsFree} free)` : "Kids chairs available"} />
      <Button mt={4} w="full" colorPalette="blue" variant="surface" borderRadius="xl" onClick={onSeatEveryone} loading={seatsLoading}>
        <Sparkles size={16} /> Seat my group together
      </Button>
      <Text mt={2} fontSize="xs" color="fg.muted" textAlign="center">
        Or skip it: travelers without a chosen seat get standard seats automatically.
      </Text>
    </Box>
  );
};
