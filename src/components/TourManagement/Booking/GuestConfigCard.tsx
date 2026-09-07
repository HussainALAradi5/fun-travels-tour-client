import { Box, HStack, Stack, Text, Circle, Button, IconButton } from "@chakra-ui/react";
import { Armchair, CheckCircle2, Trash2, Utensils } from "lucide-react";
import { glowPulse } from "@/utilities/Animations";
import type { Seat } from "@/interface/tourmanagement/SeatInterface";
import type { MealPlan } from "@/interface/tourmanagement/MealPlanInterface";

export interface GuestConfig {
  id: string;
  label: string;
  assignedSeat: Seat | null;
  selectedMeals: MealPlan[];
}

interface GuestConfigCardProps {
  guest: GuestConfig;
  onOpenSeatPicker: (guestId: string) => void;
  onOpenMealPicker: (guestId: string) => void;
  onRemove?: (guestId: string) => void;
}

export const GuestConfigCard = ({ guest, onOpenSeatPicker, onOpenMealPicker, onRemove }: GuestConfigCardProps) => {
  return (
    <Box p={6} borderRadius="2xl" borderWidth="1.5px" borderColor={guest.assignedSeat ? "blue.500" : "border.subtle"} bg="bg.panel" shadow="sm" transition="all 0.2s">
      <HStack justify="space-between" mb={6}>
        <HStack gap={4}>
          <Circle size="10" bg="blue.100" _dark={{ bg: "blue.900" }} color="blue.600">
            <Text fontWeight="bold" fontSize="sm">{guest.label.split(" ")[1]}</Text>
          </Circle>
          <Text fontWeight="bold" fontSize="lg">{guest.label}</Text>
        </HStack>
        {onRemove && (
          <IconButton variant="ghost" colorPalette="red" size="sm" onClick={() => onRemove(guest.id)} aria-label="Remove guest">
            <Trash2 size={16} />
          </IconButton>
        )}
      </HStack>

      <Stack gap={4}>
        {/* Seat Row */}
        <HStack justify="space-between" p={4} bg="bg.muted" borderRadius="xl">
          <HStack gap={4}>
            <Circle size="10" bg={guest.assignedSeat ? "blue.500" : "bg.panel"} color={guest.assignedSeat ? "white" : "fg.muted"}>
              <CheckCircle2 size={20} />
            </Circle>
            <Stack gap={0}>
              <Text fontWeight="bold" fontSize="sm">Cabin Seating</Text>
              <Text fontSize="xs" color="fg.muted">
                {guest.assignedSeat ? `Assigned to Seat ${guest.assignedSeat.seatCode}` : "No seat selected yet"}
              </Text>
            </Stack>
          </HStack>
          <Button 
            variant="surface" 
            colorPalette="blue" 
            size="sm"
            onClick={() => onOpenSeatPicker(guest.id)}
            animation={!guest.assignedSeat ? `${glowPulse} 2s infinite` : "none"}
          >
            <Armchair size={16} style={{ marginRight: "8px" }} />
            {guest.assignedSeat ? "Change" : "Pick Seat"}
          </Button>
        </HStack>

        {/* Meal Row */}
        <HStack justify="space-between" p={4} bg="bg.muted" borderRadius="xl">
          <HStack gap={4}>
            <Circle size="10" bg={guest.selectedMeals.length > 0 ? "green.500" : "bg.panel"} color={guest.selectedMeals.length > 0 ? "white" : "fg.muted"}>
              <Utensils size={18} />
            </Circle>
            <Stack gap={0}>
              <Text fontWeight="bold" fontSize="sm">Meal Add-ons</Text>
              <Text fontSize="xs" color="fg.muted">
                {guest.selectedMeals.length > 0 ? `${guest.selectedMeals.length} meal(s) selected` : "No meals added"}
              </Text>
            </Stack>
          </HStack>
          <Button 
            variant="surface" 
            colorPalette="green" 
            size="sm"
            onClick={() => onOpenMealPicker(guest.id)}
          >
            {guest.selectedMeals.length > 0 ? "Edit Meals" : "Add Meals"}
          </Button>
        </HStack>

      </Stack>
    </Box>
  );
};