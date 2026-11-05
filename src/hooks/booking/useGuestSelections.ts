import { useState } from "react";
import { toaster } from "@/components/ui/toaster";
import type { GuestConfig } from "@/interfaces/common/GuestConfig";
import type { MealPlan } from "@/interfaces/tour/MealPlan";
import type { Seat } from "@/interfaces/tour/Seat";
import type { TravelerKind } from "@/types/booking/TravelerKind";
import { autoPickSeats } from "@/utilities/booking/autoPickSeats";
import { guestLabel, newGuest } from "@/utilities/guestFactory";

const relabel = (list: GuestConfig[]) => list.map((g, idx) => ({ ...g, label: guestLabel(idx) }));
const isSeat = (s: GuestConfig["assignedSeat"]): s is Seat => Boolean(s && typeof s === "object");

/** Travelers (adults and children), their seat and meal choices, and which picker dialog is open. */
export function useGuestSelections(availableSlots: number) {
  const [guests, setGuests] = useState<GuestConfig[]>([newGuest(0)]);
  const [seatGuestId, setSeatGuestId] = useState<string | null>(null);
  const [mealGuestId, setMealGuestId] = useState<string | null>(null);
  const counts = { adults: guests.filter((g) => g.kind !== "CHILD").length, children: guests.filter((g) => g.kind === "CHILD").length };

  const tooMany = (count: number) => {
    if (!availableSlots || count <= availableSlots) return false;
    toaster.create({ title: "Not enough places", description: `Only ${availableSlots} places are left on this tour.`, type: "warning" });
    return true;
  };

  /** Sets the group in one step: keeps existing travelers (and their choices) and adds or removes from the end. */
  const setGroupSize = (adults: number, children: number) => {
    if (adults < 1 || children < 0 || tooMany(adults + children)) return;
    setGuests((prev) => {
      const pick = (kind: TravelerKind, wanted: number) => {
        const current = prev.filter((g) => (g.kind ?? "ADULT") === kind).slice(0, wanted);
        while (current.length < wanted) current.push(newGuest(0, kind));
        return current;
      };
      return relabel([...pick("ADULT", adults), ...pick("CHILD", children)]);
    });
  };

  const addGuest = () => setGroupSize(counts.adults + 1, counts.children);

  const removeGuest = (id: string) => setGuests((prev) => relabel(prev.filter((g) => g.id !== id)));

  /** A child moved out of a kids chair (or an adult into one) keeps the seat; the price follows the seat type. */
  const setKind = (id: string, kind: TravelerKind) => setGuests((prev) => prev.map((g) => (g.id === id ? { ...g, kind } : g)));

  const toggleMeal = (meal: MealPlan) => {
    if (!mealGuestId) return;
    setGuests((prev) => prev.map((g) => {
      if (g.id !== mealGuestId) return g;
      const meals = g.selectedMeals ?? [];
      const has = meals.some((m: MealPlan) => m.id === meal.id);
      return { ...g, selectedMeals: has ? meals.filter((m: MealPlan) => m.id !== meal.id) : [...meals, meal] };
    }));
  };

  /** Copies the open traveler's meals to everyone in the group. */
  const applyMealsToAll = () => {
    const source = guests.find((g) => g.id === mealGuestId);
    if (!source) return;
    setGuests((prev) => prev.map((g) => ({ ...g, selectedMeals: [...(source.selectedMeals ?? [])] })));
    toaster.create({ title: "Meals applied", description: `Same meals for all ${guests.length} travelers.`, type: "success" });
  };

  const selectSeat = (seat: Seat) => {
    if (!seatGuestId) return;
    setGuests((prev) => prev.map((g) => (g.id === seatGuestId ? { ...g, assignedSeat: seat } : g)));
    setSeatGuestId(null);
  };

  /** Seats everyone together in one click; children get kids chairs while any are free. */
  const seatEveryone = (seats: Seat[]) => {
    const next = autoPickSeats(guests, seats);
    const missing = next.filter((g) => !isSeat(g.assignedSeat)).length;
    setGuests(next);
    toaster.create(missing
      ? { title: "Some seats left to choose", description: `${missing} traveler(s) still need a seat; pick them on the seat map.`, type: "warning" }
      : { title: "Seats chosen", description: "Your group sits together. Change any seat from the traveler cards.", type: "success" });
  };

  return {
    guests, counts, seatGuestId, setSeatGuestId, mealGuestId, setMealGuestId, addGuest, removeGuest, setGroupSize, setKind,
    toggleMeal, applyMealsToAll, selectSeat, seatEveryone,
  };
}
