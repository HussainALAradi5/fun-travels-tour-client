import { Stack, HStack, Text, Button, Icon } from "@chakra-ui/react";
import { Users, Plus } from "lucide-react";
import { GuestConfigCard } from "./GuestConfigCard";
import type { GuestConfigListProps } from "@/interface/props/booking/GuestConfigListProps";

export const GuestConfigList = ({ guests, maxCapacity, onAddGuest, onRemoveGuest, onOpenSeatPicker, onOpenMealPicker }: GuestConfigListProps) => {
  return (
    <Stack gap={6}>
      <HStack justify="space-between" bg="bg.panel" p={4} borderRadius="xl" borderWidth="1px" shadow="sm">
        <HStack color="fg.muted">
          <Icon as={Users} />
          <Text fontWeight="bold">Group Size: {guests.length} / {maxCapacity || "Unlimited"}</Text>
        </HStack>
        <Button size="sm" colorPalette="blue" variant="surface" onClick={onAddGuest}>
          <Plus size={16} style={{ marginRight: "6px" }} /> Add Guest
        </Button>
      </HStack>

      <Stack gap={6}>
        {guests.map((guest, index) => (
          <GuestConfigCard
            key={guest.id}
            guest={guest}
            onOpenSeatPicker={onOpenSeatPicker}
            onOpenMealPicker={onOpenMealPicker}
            onRemove={index !== 0 ? onRemoveGuest : undefined}
          />
        ))}
      </Stack>
    </Stack>
  );
};
