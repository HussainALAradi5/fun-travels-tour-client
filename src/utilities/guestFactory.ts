import type { GuestConfig } from "@/interfaces/common/GuestConfig";
import type { TravelerKind } from "@/types/booking/TravelerKind";

export const guestLabel = (index: number) => (index === 0 ? "Guest 1 (You)" : `Guest ${index + 1}`);

export const newGuest = (index: number, kind: TravelerKind = "ADULT"): GuestConfig => ({
  id: crypto.randomUUID(), label: guestLabel(index), kind, firstName: "", lastName: "", email: "", phone: "", nationality: "",
  passportNumber: "", dateOfBirth: "", gender: "", assignedSeat: null, selectedMeals: [],
});

export const seatIdOf = (guest?: GuestConfig) =>
  guest?.assignedSeat && typeof guest.assignedSeat === "object" ? guest.assignedSeat.id ?? null : null;
