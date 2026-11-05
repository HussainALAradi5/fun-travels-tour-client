/** The price breakdown shown before booking; the server recalculates and charges the same way. */
export interface BookingEstimate {
  travelers: number;
  fare: number;
  kidsDiscount: number;
  kidsChairs: number;
  seatUpgrades: number;
  meals: number;
  mealCount: number;
  total: number;
}
