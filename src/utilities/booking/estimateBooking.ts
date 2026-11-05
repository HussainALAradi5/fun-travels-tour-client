import { ChairType } from "@/enums/tour-management/ChairType";
import type { BookingEstimate } from "@/interfaces/booking/BookingEstimate";
import type { GuestConfig } from "@/interfaces/common/GuestConfig";
import type { Seat } from "@/interfaces/tour/Seat";
import type { Tour } from "@/interfaces/tour/Tour";

const DEFAULT_KIDS_DISCOUNT_PERCENT = 50;
const round = (value: number) => Math.round(value * 100) / 100;
const seatOf = (guest: GuestConfig) => (guest.assignedSeat && typeof guest.assignedSeat === "object" ? (guest.assignedSeat as Seat) : null);

/** Same rule as the server: fare minus the agency's kids discount on kids chairs, plus seat upgrades and meals. */
export function estimateBooking(tour: Tour, guests: GuestConfig[]): BookingEstimate {
  const price = tour.totalPrice ?? tour.basePrice ?? 0;
  const kidsPercent = tour.policy?.kidsDiscountPercent ?? DEFAULT_KIDS_DISCOUNT_PERCENT;
  const kidsChairs = guests.filter((g) => seatOf(g)?.chairType === ChairType.KIDS_CHAIR).length;
  const seatUpgrades = guests.reduce((sum, g) => sum + (seatOf(g)?.seatPriceModifier ?? 0), 0);
  const mealCount = guests.reduce((sum, g) => sum + (g.selectedMeals?.length ?? 0), 0);
  const meals = guests.reduce((sum, g) => sum + (g.selectedMeals ?? []).reduce((s, m) => s + (m.mealPrice ?? 0), 0), 0);
  const fare = round(price * guests.length);
  const kidsDiscount = round(kidsChairs * price * (kidsPercent / 100));
  return {
    travelers: guests.length, fare, kidsDiscount, kidsChairs, seatUpgrades: round(seatUpgrades), meals: round(meals), mealCount,
    total: round(fare - kidsDiscount + seatUpgrades + meals),
  };
}
