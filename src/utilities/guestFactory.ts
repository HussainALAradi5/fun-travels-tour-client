import type { GuestConfig } from "@/interfaces/common/GuestConfig";

export const guestLabel = (index: number) => (index === 0 ? "Guest 1 (You)" : `Guest ${index + 1}`);

export const newGuest = (index: number): GuestConfig => ({
  id: crypto.randomUUID(), label: guestLabel(index), firstName: "", lastName: "", email: "", phone: "", nationality: "",
  passportNumber: "", dateOfBirth: "", gender: "", assignedSeat: null, selectedMeals: [],
});

export const seatIdOf = (guest?: GuestConfig) =>
  guest?.assignedSeat && typeof guest.assignedSeat === "object" ? guest.assignedSeat.id ?? null : null;
