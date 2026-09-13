import { useState, useCallback } from "react";
import type { Seat } from "@/interface/tour/Seat";
import type { MealPlan } from "@/interface/tour/MealPlan";
import type { Guest } from "@/interface/common/Guest";

export function useGuestManager(maxCapacity: number) {
  const [guests, setGuests] = useState<Guest[]>([
    { id: 1, name: "Primary Guest", meals: [] }
  ]);

  const addGuest = useCallback(() => {
    if (guests.length >= maxCapacity) return;
    const newGuest: Guest = {
      id: guests.length + 1,
      name: `Guest ${guests.length + 1}`,
      meals: [],
    };
    setGuests([...guests, newGuest]);
  }, [guests, maxCapacity]);

  const removeGuest = useCallback((guestId: number) => {
    if (guests.length <= 1) return;
    setGuests(guests.filter(g => g.id !== guestId).map((g, i) => ({ ...g, id: i + 1, name: i === 0 ? "Primary Guest" : `Guest ${i + 1}` })));
  }, [guests]);

  const toggleMeal = useCallback((guestId: number, meal: MealPlan) => {
    setGuests(guests.map(g => {
      if (g.id !== guestId) return g;
      const hasMeal = g.meals.some(m => m.id === meal.id);
      return { ...g, meals: hasMeal ? g.meals.filter(m => m.id !== meal.id) : [...g.meals, meal] };
    }));
  }, [guests]);

  const assignSeat = useCallback((guestId: number, seat: Seat) => {
    setGuests(guests.map(g => g.id === guestId ? { ...g, seat } : g));
  }, [guests]);

  const setGuestName = useCallback((guestId: number, name: string) => {
    setGuests(guests.map(g => g.id === guestId ? { ...g, name } : g));
  }, [guests]);

  return { guests, setGuests, addGuest, removeGuest, toggleMeal, assignSeat, setGuestName };
}

