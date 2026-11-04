import { useState } from "react";
import { toaster } from "@/components/ui/toaster";
import type { GuestConfig } from "@/interfaces/common/GuestConfig";
import type { MealPlan } from "@/interfaces/tour/MealPlan";
import type { Seat } from "@/interfaces/tour/Seat";
import { guestLabel, newGuest } from "@/utilities/guestFactory";

/** Travelers and their seat and meal choices, plus which picker dialog is open. */
export function useGuestSelections(availableSlots: number) {
  const [guests, setGuests] = useState<GuestConfig[]>([newGuest(0)]);
  const [seatGuestId, setSeatGuestId] = useState<string | null>(null);
  const [mealGuestId, setMealGuestId] = useState<string | null>(null);

  const addGuest = () => {
    if (availableSlots && guests.length >= availableSlots) {
      toaster.create({ title: "Capacity Reached", description: "No more available slots on this tour.", type: "warning" });
      return;
    }
    setGuests((prev) => [...prev, newGuest(prev.length)]);
  };

  const removeGuest = (id: string) =>
    setGuests((prev) => prev.filter((g) => g.id !== id).map((g, idx) => ({ ...g, label: guestLabel(idx) })));

  const toggleMeal = (meal: MealPlan) => {
    if (!mealGuestId) return;
    setGuests((prev) => prev.map((g) => {
      if (g.id !== mealGuestId) return g;
      const meals = g.selectedMeals ?? [];
      const has = meals.some((m: MealPlan) => m.id === meal.id);
      return { ...g, selectedMeals: has ? meals.filter((m: MealPlan) => m.id !== meal.id) : [...meals, meal] };
    }));
  };

  const selectSeat = (seat: Seat) => {
    if (!seatGuestId) return;
    setGuests((prev) => prev.map((g) => (g.id === seatGuestId ? { ...g, assignedSeat: seat } : g)));
    setSeatGuestId(null);
  };

  return { guests, seatGuestId, setSeatGuestId, mealGuestId, setMealGuestId, addGuest, removeGuest, toggleMeal, selectSeat };
}
