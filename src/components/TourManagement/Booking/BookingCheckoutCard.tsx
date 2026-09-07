import { Box, VStack, HStack, Text, Heading, Button, Separator, Circle, Icon, Spinner } from "@chakra-ui/react";
import { ShoppingBag, CheckCircle2, Armchair, Utensils, Users } from "lucide-react";
import { glowPulse, floatIn } from "@/utilities/Animations";
import type { Tour } from "@/interface/tourmanagement/TourInterface";
import type { GuestConfig } from "./GuestConfigCard";

interface BookingCheckoutCardProps {
  tour: Tour | null;
  guests: GuestConfig[];
  onConfirm: () => void;
  loading: boolean;
}

export const BookingCheckoutCard = ({ tour, guests, onConfirm, loading }: BookingCheckoutCardProps) => {
  // --- Group Calculations ---
  const guestCount = guests.length;
  const baseTotal = (tour?.basePrice || 0) * guestCount;
  
  const seatModifierTotal = guests.reduce((acc, g) => acc + (g.assignedSeat?.seatPriceModifier || 0), 0);
  const seatsAssignedCount = guests.filter(g => g.assignedSeat !== null).length;
  const isSeatMissing = (tour?.hasTransportation ?? true) && seatsAssignedCount < guestCount;
  
  const totalMealsCount = guests.reduce((acc, g) => acc + g.selectedMeals.length, 0);
  const mealsTotal = guests.reduce((acc, g) => 
    acc + g.selectedMeals.reduce((mAcc, m) => mAcc + (m.mealPrice || 0), 0), 0
  );

  const grandTotal = baseTotal + seatModifierTotal + mealsTotal;

  return (
    <Box 
      bg="bg.panel" 
      p={8} 
      borderRadius="3xl" 
      shadow="2xl" 
      borderWidth="1px" 
      borderColor="blue.500/20"
      animation={!isSeatMissing ? `${glowPulse} 3s infinite` : "none"}
      backdropFilter="blur(20px)"
    >
      <VStack align="stretch" gap={6}>
        <HStack justify="space-between">
          <HStack gap={3}>
            <Circle size="10" bg="blue.600" color="white" shadow="lg">
              <Icon as={ShoppingBag} size="sm"/>
            </Circle>
            <Heading size="md" letterSpacing="tight">Checkout</Heading>
          </HStack>
          <HStack color="fg.muted" bg="bg.muted" px={3} py={1} borderRadius="full">
             <Icon as={Users} size="xs" />
             <Text fontSize="xs" fontWeight="bold">{guestCount} Guests</Text>
          </HStack>
        </HStack>

        <VStack align="stretch" gap={4} py={2}>
          <HStack justify="space-between">
            <Text color="fg.muted" fontSize="sm">Standard Fare (x{guestCount})</Text>
            <Text fontWeight="black" fontSize="md">${baseTotal.toFixed(2)}</Text>
          </HStack>
          
          {seatModifierTotal > 0 && (
            <HStack justify="space-between" animation={`${floatIn} 0.3s ease`}>
              <HStack gap={2}>
                <Icon as={Armchair} size="xs" color="blue.500"/>
                <Text color="fg.muted" fontSize="sm">Seat Upgrades ({seatsAssignedCount})</Text>
              </HStack>
              <Text fontWeight="black" fontSize="md">+${seatModifierTotal.toFixed(2)}</Text>
            </HStack>
          )}

          {totalMealsCount > 0 && (
             <HStack justify="space-between" animation={`${floatIn} 0.3s ease`}>
               <HStack gap={2}>
                <Icon as={Utensils} size="xs" color="green.500"/>
                <Text color="fg.muted" fontSize="sm">Add-on Meals ({totalMealsCount})</Text>
               </HStack>
               <Text fontWeight="black" fontSize="md">+${mealsTotal.toFixed(2)}</Text>
             </HStack>
          )}
        </VStack>

        <Separator opacity={0.5} />
        
        <HStack justify="space-between">
          <VStack align="start" gap={0}>
            <Text fontSize="2xs" fontWeight="black" color="fg.muted">GRAND TOTAL</Text>
            <Heading size="2xl" color="blue.600" letterSpacing="tighter">${grandTotal.toFixed(2)}</Heading>
          </VStack>
          {loading && <Spinner size="sm" color="blue.500" />}
        </HStack>

        <Button 
          size="xl" 
          colorPalette="blue" 
          borderRadius="2xl" 
          disabled={isSeatMissing || loading} 
          onClick={onConfirm}
          h="16"
          shadow="xl"
          _hover={{ transform: "translateY(-2px)", shadow: "2xl" }}
          transition="all 0.3s"
        >
          {!isSeatMissing ? "Complete Group Booking" : `Assign ${guestCount - seatsAssignedCount} More Seat(s)`}
          <Icon as={CheckCircle2} ml={2} />
        </Button>

        <Text fontSize="xs" textAlign="center" color="fg.muted" fontWeight="medium">
          Secure payment • Instant Group Tickets
        </Text>
      </VStack>
    </Box>
  );
};