import { useState, useEffect } from "react";
import { SimpleGrid, Box, Center, Spinner, GridItem } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { useTourManagement } from "@/hooks/tourManagement/useTourManagement";
import { seatService } from "@/Api/tourmanagement/Seat";
import { mealPlanService } from "@/Api/tourmanagement/MealPlan";
import { toaster } from "@/components/ui/toaster";
import { useUser } from "@/hooks/User/useUser";
import type { MealPlan } from "@/interface/tour/MealPlan";
import { PageWrapper } from "@/components/ui/Custom/PageWrapper";
import { floatIn } from "@/utilities/Animations";

// Ensure imports point to your correct folder structure
import { SeatPickerDialog } from "./Seat/CustomerSeat/SeatPickerDialog";
import { MealsSelectionDialog } from "./Meal/MealsSelectionDialog";
import { BookingTourOverview } from "./Booking/BookingTourOverview";
import { GuestConfigList } from "./Booking/GuestConfigList";
import { BookingCheckoutCard } from "./Booking/BookingCheckoutCard";

import type { Seat } from "@/interface/tour/Seat";
import { SeatStatus } from "@/enums/tourmanagement/SeatStatus";
import type { GuestConfig } from "@/interface/common/GuestConfig";
import type { ReservationPayload } from "@/interface/tour/ReservationPayload";

export const BookingManager = ({ tourId }: { tourId?: string }) => {
  const navigate = useNavigate();
  const { user: currentUser } = useUser();
  
  const { tour, loading: tourLoading, handleCreateReservation, isBooking } = useTourManagement(tourId);
  
  const [seats, setSeats] = useState<Seat[]>([]);
  const [seatsLoading, setSeatsLoading] = useState(false);
  const [availableMeals, setAvailableMeals] = useState<MealPlan[]>([]);
  
  // --- Group State ---
  const [guests, setGuests] = useState<GuestConfig[]>([
    { id: crypto.randomUUID(), label: "Guest 1 (You)", assignedSeat: null, selectedMeals: [] }
  ]);
  
  // --- Dialog Active States ---
  const [activeSeatPickerGuestId, setActiveSeatPickerGuestId] = useState<string | null>(null);
  const [activeMealPickerGuestId, setActiveMealPickerGuestId] = useState<string | null>(null);

  useEffect(() => {
    if (tour?.transportation?.id) {
      setSeatsLoading(true);
      seatService.filter({ transportId: tour.transportation.id })
        .then((res: Seat[] | { data: Seat[] }) => {
           const responseArray = Array.isArray(res) ? res : ((res as { data: Seat[] }).data || []);
           setSeats(responseArray.flat());
        })
        .finally(() => setSeatsLoading(false));
    }
    mealPlanService.getAll().then((res: MealPlan[] | { data: MealPlan[] }) => {
      const meals = Array.isArray(res) ? res : ((res as { data: MealPlan[] }).data || []);
      setAvailableMeals(meals);
    });
  }, [tour?.transportation?.id]);

  // --- Handlers ---
  const handleAddGuest = () => {
    if (tour?.availableSlots && guests.length >= tour.availableSlots) {
      toaster.create({ title: "Capacity Reached", description: "No more available slots on this tour.", type: "warning" });
      return;
    }
    setGuests(prev => [
      ...prev, 
      { id: crypto.randomUUID(), label: `Guest ${prev.length + 1}`, assignedSeat: null, selectedMeals: [] }
    ]);
  };

  const handleRemoveGuest = (id: string) => {
    setGuests(prev => {
      const filtered = prev.filter(g => g.id !== id);
      return filtered.map((g, idx) => ({ ...g, label: idx === 0 ? "Guest 1 (You)" : `Guest ${idx + 1}` }));
    });
  };

  const handleToggleMeal = (meal: MealPlan) => {
    if (!activeMealPickerGuestId) return;
    
    setGuests(prev => prev.map(g => {
      if (g.id !== activeMealPickerGuestId) return g;
      const hasMeal = g.selectedMeals.find((m: MealPlan) => m.id === meal.id);
      return { 
        ...g, 
        selectedMeals: hasMeal ? g.selectedMeals.filter((m: MealPlan) => m.id !== meal.id) : [...g.selectedMeals, meal] 
      };
    }));
  };

  const handleSeatSelected = (seat: Seat) => {
    if (!activeSeatPickerGuestId) return;
    setGuests(prev => prev.map(g => g.id === activeSeatPickerGuestId ? { ...g, assignedSeat: seat } : g));
    setActiveSeatPickerGuestId(null);
  };

  const handleCheckoutClick = async () => {
    if (!currentUser?.id) {
      toaster.create({ title: "Authentication Required", description: "Please log in to continue.", type: "error" });
      return;
    }

    try {
      const reservationPayload: ReservationPayload = {
        tour: { id: Number(tourId) }, 
        user: { id: currentUser.id },
        requestedSlots: guests.length,
        tickets: guests.map(g => ({
          assignedSeat: g.assignedSeat ? { id: g.assignedSeat.id! } : null,
          selectedMeals: g.selectedMeals.map(m => ({ id: m.id! }))
        }))
      };
      
      await handleCreateReservation(reservationPayload);
      
      toaster.create({ title: "Booking Secured!", description: "Your group reservation is complete.", type: "success" });
      setTimeout(() => navigate("/my-bookings"), 1500);
      
    } catch (error: unknown) {
       console.error("Booking failed", error);
       toaster.create({ title: "Error", description: "Failed to process booking.", type: "error" });
    }
  };

  if (tourLoading) return <Center h="60vh"><Spinner color="blue.500" /></Center>;

  const currentlySelectedSeats = guests.map(g => g.assignedSeat?.id).filter(Boolean) as number[];
  const activeMealGuest = guests.find(g => g.id === activeMealPickerGuestId);

  return (
    <PageWrapper 
      title={tour?.title || "Reservation"} 
      subtitle="Configure your group's details below"
      imageUrl="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1600"
    >
      <SimpleGrid columns={{ base: 1, lg: 12 }} gap={8} animation={`${floatIn} 0.5s ease-out`}>
        
        <GridItem colSpan={{ lg: 3 }}>
          <BookingTourOverview tour={tour} />
        </GridItem>

        <GridItem colSpan={{ lg: 5 }}>
          <GuestConfigList 
            guests={guests}
            maxCapacity={tour?.availableSlots || 0}
            onAddGuest={handleAddGuest}
            onRemoveGuest={handleRemoveGuest}
            onOpenSeatPicker={setActiveSeatPickerGuestId}
            onOpenMealPicker={setActiveMealPickerGuestId}
          />
        </GridItem>

        <GridItem colSpan={{ lg: 4 }}>
          <Box position="sticky" top="100px">
            <BookingCheckoutCard 
              tour={tour} 
              guests={guests} 
              onConfirm={handleCheckoutClick} 
              loading={isBooking}
            />
          </Box>
        </GridItem>
      </SimpleGrid>

      {/* Shared Seat Picker Dialog */}
      <SeatPickerDialog 
        open={!!activeSeatPickerGuestId} 
        onClose={() => setActiveSeatPickerGuestId(null)} 
        seats={seats.map(s => {
          const isSeatFree = s.status === SeatStatus.AVAILABLE;
          const isLocallySelected = currentlySelectedSeats.includes(s.id || 0);
          return {
            ...s,
            status: (isSeatFree && !isLocallySelected) ? SeatStatus.AVAILABLE : SeatStatus.BOOKED
          };
        })}
        selectedId={guests.find(g => g.id === activeSeatPickerGuestId)?.assignedSeat?.id || null}
        onSelect={handleSeatSelected}
        loading={seatsLoading}
      />

      {/* Shared Meal Picker Dialog */}
      <MealsSelectionDialog 
        open={!!activeMealPickerGuestId}
        onClose={() => setActiveMealPickerGuestId(null)}
        availableMeals={availableMeals}
        selectedMeals={activeMealGuest?.selectedMeals || []}
        onToggleMeal={handleToggleMeal}
      />

    </PageWrapper>
  );
};
