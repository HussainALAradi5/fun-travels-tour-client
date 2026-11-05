import { ChairType } from "@/enums/tour-management/ChairType";
import { SeatStatus } from "@/enums/tour-management/SeatStatus";
import type { GuestConfig } from "@/interfaces/common/GuestConfig";
import type { Seat } from "@/interfaces/tour/Seat";

/**
 * Seats for the whole group in one step, side by side in cabin order: children get kids chairs (and their discount)
 * while any are free, adults get standard seats. Travelers who already chose a seat keep it.
 */
export function autoPickSeats(guests: GuestConfig[], seats: Seat[]): GuestConfig[] {
  const kept = new Set(guests.map((g) => (g.assignedSeat && typeof g.assignedSeat === "object" ? g.assignedSeat.id : null)).filter(Boolean));
  const free = seats.filter((s) => s.status === SeatStatus.AVAILABLE && !kept.has(s.id));
  const take = (type: string) => {
    const index = free.findIndex((s) => s.chairType === type);
    return index < 0 ? null : free.splice(index, 1)[0];
  };
  return guests.map((guest) => {
    if (guest.assignedSeat && typeof guest.assignedSeat === "object") return guest;
    const seat = guest.kind === "CHILD" ? take(ChairType.KIDS_CHAIR) ?? take(ChairType.STANDARD) : take(ChairType.STANDARD);
    return seat ? { ...guest, assignedSeat: seat } : guest;
  });
}
