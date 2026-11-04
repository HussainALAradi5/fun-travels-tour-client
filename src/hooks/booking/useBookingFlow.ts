import { useEffect, useMemo, useState } from "react";
import { SEAT_ORDER } from "@/constants/tour/seatOrder";
import { toaster } from "@/components/ui/toaster";
import { MY_BOOKINGS_PATH, REDIRECT_DELAY_MS, SEAT_FETCH_SIZE } from "@/constants/tour/booking";
import { PaymentMethod } from "@/enums/payment/PaymentMethod";
import { SeatStatus } from "@/enums/tour-management/SeatStatus";
import type { GuestConfig } from "@/interfaces/common/GuestConfig";
import type { MealPlan } from "@/interfaces/tour/MealPlan";
import type { Seat } from "@/interfaces/tour/Seat";
import type { Tour } from "@/interfaces/tour/Tour";
import type { TourReservation } from "@/interfaces/tour/TourReservation";
import { useNavigate } from "@/lib/navigation";
import { paymentService } from "@/services/payment/paymentService";
import { seatService } from "@/services/tour-management/seatService";
import { seatIdOf } from "@/utilities/guestFactory";

type CreateReservation = (payload: Partial<TourReservation>) => Promise<TourReservation>;

/** Per-tour seats, the hold-then-pay checkout, and retrying payment on a held reservation. */
export function useBookingFlow(tour: Tour | null, guests: GuestConfig[], createReservation: CreateReservation) {
  const navigate = useNavigate();
  const [seats, setSeats] = useState<Seat[]>([]);
  const [pending, setPending] = useState<TourReservation | null>(null);
  const [seatsLoading, setSeatsLoading] = useState(false);

  useEffect(() => {
    if (!tour?.id || !tour.transportation?.id) return;
    // Availability is per tour: seats held by this tour's tickets come back as BOOKED.
    let active = true;
    seatService.search({ transportId: tour.transportation.id, tourId: tour.id, size: SEAT_FETCH_SIZE, ...SEAT_ORDER })
      .then((res) => active && setSeats(res.content))
      .finally(() => active && setSeatsLoading(false));
    return () => { active = false; };
  }, [tour?.id, tour?.transportation?.id]);

  /** Seats taken on the tour or already chosen by another traveler show as booked. */
  const pickerSeats = useMemo(() => {
    const chosen = new Set(guests.map(seatIdOf).filter(Boolean));
    return seats.map((s) => ({ ...s, status: s.status === SeatStatus.AVAILABLE && !chosen.has(s.id ?? 0) ? SeatStatus.AVAILABLE : SeatStatus.BOOKED }));
  }, [seats, guests]);

  const pay = async (reservationId: number) => {
    await paymentService.execute(reservationId, PaymentMethod.WALLET);
    toaster.create({ title: "Payment Successful", description: "Your reservation and tickets are confirmed.", type: "success" });
    setTimeout(() => navigate(MY_BOOKINGS_PATH), REDIRECT_DELAY_MS);
  };

  const checkout = async () => {
    if (!tour?.id) return;
    try {
      if (pending?.id) {
        await pay(pending.id);
        return;
      }
      // Only selections go to the server; it prices tickets and never needs guest identity data.
      const tickets = guests.map((g) => ({
        assignedSeat: seatIdOf(g) ? { id: seatIdOf(g)! } : null,
        selectedMeals: (g.selectedMeals ?? []).map((m) => ({ id: typeof m === "number" ? m : (m as MealPlan).id ?? 0 })),
      }));
      const reservation = await createReservation({ tour: { id: tour.id }, tickets } as unknown as Partial<TourReservation>);
      setPending(reservation);
      await pay(reservation.id!);
    } catch {
      toaster.create({
        title: pending ? "Payment Not Completed" : "Reservation Held",
        description: "Your seats remain held for up to 15 minutes. Add wallet funds if needed, then retry payment.",
        type: "error",
      });
    }
  };

  return { pickerSeats, seatsLoading, pending, checkout };
}
