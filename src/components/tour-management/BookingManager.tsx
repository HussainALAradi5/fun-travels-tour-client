import { Box, Center, GridItem, SimpleGrid, Spinner } from "@chakra-ui/react";
import { PageWrapper } from "@/components/ui/custom/PageWrapper";
import { BOOKING_HERO_IMAGE, HOLD_NOTICE, PENDING_NOTICE } from "@/constants/tour/booking";
import { useBookingFlow } from "@/hooks/booking/useBookingFlow";
import { useGuestSelections } from "@/hooks/booking/useGuestSelections";
import { useTourManagement } from "@/hooks/tour-management/useTourManagement";
import type { BookingManagerProps } from "@/interfaces/props/tour/BookingManagerProps";
import { floatIn } from "@/utilities/Animations";
import { seatIdOf } from "@/utilities/guestFactory";
import { BookingCheckoutCard } from "./booking/BookingCheckoutCard";
import { BookingTourOverview } from "./booking/BookingTourOverview";
import { GuestConfigList } from "./booking/GuestConfigList";
import { MealsSelectionDialog } from "./meal/MealsSelectionDialog";
import { SeatPickerDialog } from "./seat/customer-seat/SeatPickerDialog";

export const BookingManager = ({ tourId }: BookingManagerProps) => {
  const { tour, loading, handleCreateReservation, isBooking } = useTourManagement(tourId);
  const g = useGuestSelections(tour?.availableSlots ?? 0);
  const flow = useBookingFlow(tour, g.guests, handleCreateReservation);
  if (loading || !tour) return <Center h="60vh"><Spinner color="blue.500" /></Center>;
  const mealGuest = g.guests.find((guest) => guest.id === g.mealGuestId);
  return (
    <PageWrapper title={tour.title || "Reservation"} subtitle="Configure your group's details below" imageUrl={BOOKING_HERO_IMAGE}>
      <SimpleGrid columns={{ base: 1, lg: 12 }} gap={8} animation={`${floatIn} 0.5s ease-out`}>
        <GridItem colSpan={{ lg: 3 }}><BookingTourOverview tour={tour} /></GridItem>
        <GridItem colSpan={{ lg: 5 }}>
          <GuestConfigList guests={g.guests} maxCapacity={tour.availableSlots || 0} onAddGuest={g.addGuest}
            onRemoveGuest={g.removeGuest} onOpenSeatPicker={g.setSeatGuestId} onOpenMealPicker={g.setMealGuestId} />
        </GridItem>
        <GridItem colSpan={{ lg: 4 }}>
          <Box position="sticky" top="100px">
            <BookingCheckoutCard tour={tour} guests={g.guests} onConfirm={flow.checkout} loading={isBooking}
              actionLabel={flow.pending ? "Retry Wallet Payment" : "Reserve and Pay with Wallet"}
              paymentNotice={flow.pending ? PENDING_NOTICE : HOLD_NOTICE} />
          </Box>
        </GridItem>
      </SimpleGrid>
      <SeatPickerDialog open={!!g.seatGuestId} onClose={() => g.setSeatGuestId(null)} seats={flow.pickerSeats}
        selectedId={seatIdOf(g.guests.find((guest) => guest.id === g.seatGuestId))} onSelect={g.selectSeat} loading={flow.seatsLoading} />
      <MealsSelectionDialog open={!!g.mealGuestId} onClose={() => g.setMealGuestId(null)} availableMeals={tour.availableMeals ?? []}
        selectedMeals={mealGuest?.selectedMeals ?? []} onToggleMeal={g.toggleMeal} />
    </PageWrapper>
  );
};
