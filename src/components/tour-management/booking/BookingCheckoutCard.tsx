import { Box, VStack, HStack, Text, Heading, Button, Separator, Circle, Icon, Spinner } from "@chakra-ui/react";
import { ShoppingBag, CheckCircle2, Armchair, Utensils, Users, Baby } from "lucide-react";
import { glowPulse, floatIn } from "@/utilities/Animations";
import type { BookingCheckoutCardProps } from "@/interfaces/props/booking/BookingCheckoutCardProps";
import { estimateBooking } from "@/utilities/booking/estimateBooking";
import { PriceLine } from "./PriceLine";

export const BookingCheckoutCard = ({
  tour,
  guests,
  onConfirm,
  loading,
  actionLabel = "Reserve and Pay with Wallet",
  paymentNotice = "Seats are held for 15 minutes while wallet payment is completed.",
}: BookingCheckoutCardProps) => {
  const estimate = estimateBooking(tour, guests);
  const unseated = guests.filter((g) => !g.assignedSeat).length;
  const childrenWithoutKidsChair = guests.filter((g) => g.kind === "CHILD").length - estimate.kidsChairs;
  const kidsPercent = tour.policy?.kidsDiscountPercent ?? 0;

  return (
    <Box bg="bg.panel" p={8} borderRadius="3xl" shadow="2xl" borderWidth="1px" borderColor="blue.500/20"
      animation={`${glowPulse} 3s infinite`} backdropFilter="blur(20px)">
      <VStack align="stretch" gap={6}>
        <HStack justify="space-between">
          <HStack gap={3}>
            <Circle size="10" bg="blue.600" color="white" shadow="lg"><Icon as={ShoppingBag} size="sm" /></Circle>
            <Heading size="md" letterSpacing="tight">Checkout</Heading>
          </HStack>
          <HStack color="fg.muted" bg="bg.muted" px={3} py={1} borderRadius="full">
            <Icon as={Users} size="xs" />
            <Text fontSize="xs" fontWeight="bold">{estimate.travelers} {estimate.travelers === 1 ? "Traveler" : "Travelers"}</Text>
          </HStack>
        </HStack>

        <VStack align="stretch" gap={4} py={2}>
          <PriceLine label={`Fare (x${estimate.travelers})`} amount={estimate.fare} />
          {estimate.kidsDiscount > 0 && (
            <PriceLine icon={Baby} iconColor="teal.500" label={`Kids chairs ${kidsPercent}% off (${estimate.kidsChairs})`}
              amount={-estimate.kidsDiscount} highlight />
          )}
          {estimate.seatUpgrades > 0 && <PriceLine icon={Armchair} iconColor="blue.500" label="Seat upgrades" amount={estimate.seatUpgrades} />}
          {estimate.mealCount > 0 && (
            <PriceLine icon={Utensils} iconColor="green.500" label={`Meals (${estimate.mealCount})`} amount={estimate.meals} />
          )}
        </VStack>

        <Separator opacity={0.5} />

        <HStack justify="space-between" animation={`${floatIn} 0.3s ease`}>
          <VStack align="start" gap={0}>
            <Text fontSize="2xs" fontWeight="black" color="fg.muted">GRAND TOTAL</Text>
            <Heading size="2xl" color="blue.600" letterSpacing="tighter">${estimate.total.toFixed(2)}</Heading>
          </VStack>
          {loading && <Spinner size="sm" color="blue.500" />}
        </HStack>

        {unseated > 0 && (
          <Text fontSize="xs" color="fg.muted" bg="bg.muted" p={3} borderRadius="lg">
            {unseated} traveler(s) without a chosen seat will get standard seats automatically.
            {childrenWithoutKidsChair > 0 && kidsPercent > 0 ? ` Choose kids chairs for children to get ${kidsPercent}% off.` : ""}
          </Text>
        )}

        <Button size="xl" colorPalette="blue" borderRadius="2xl" disabled={loading} onClick={onConfirm} h="16" shadow="xl"
          _hover={{ transform: "translateY(-2px)", shadow: "2xl" }} transition="all 0.3s">
          {actionLabel}
          <Icon as={CheckCircle2} ml={2} />
        </Button>

        <Text fontSize="xs" textAlign="center" color="fg.muted" fontWeight="medium">{paymentNotice}</Text>
      </VStack>
    </Box>
  );
};
