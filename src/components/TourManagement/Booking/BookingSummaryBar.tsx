import { Box, HStack, VStack, Text, Heading, Button, Icon } from "@chakra-ui/react";
import { CheckCircle2 } from "lucide-react";
import type { Seat } from "@/interface/tourmanagement/SeatInterface";
import type { MealPlan } from "@/interface/tourmanagement/MealPlanInterface";
import { floatIn } from "@/utilities/Animations";

interface BookingSummaryBarProps {
  selectedSeat: Seat | null;
  selectedMeals: MealPlan[];
  onConfirm: () => void;
  isBooking: boolean;
}

export const BookingSummaryBar = ({ selectedSeat, selectedMeals, onConfirm, isBooking }: BookingSummaryBarProps) => {
  if (!selectedSeat) return null;

  return (
    <Box 
      p={6} 
      bg="blue.600" 
      color="white" 
      borderRadius="2xl" 
      shadow="2xl"
      animation={`${floatIn} 0.4s ease-out`}
    >
      <HStack justify="space-between" wrap="wrap" gap={6}>
        <VStack align="start" gap={1}>
          <Text fontSize="xs" fontWeight="black" letterSpacing="wider" opacity={0.8}>
            FINALIZING RESERVATION
          </Text>
          <Heading size="lg">
            Seat {selectedSeat.seatCode} 
            {selectedMeals.length > 0 && ` + ${selectedMeals.length} Meal Plan(s)`}
          </Heading>
        </VStack>
        <Button
          size="xl"
          bg="white"
          color="blue.600"
          _hover={{ bg: "blue.50", transform: "translateY(-2px)", shadow: "lg" }}
          loading={isBooking}
          onClick={onConfirm}
          px={10}
          borderRadius="full"
          transition="all 0.2s"
        >
          <Icon as={CheckCircle2} mr={2} /> Confirm Ticket
        </Button>
      </HStack>
    </Box>
  );
};