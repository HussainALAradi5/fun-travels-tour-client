import { useState, useEffect, useCallback } from "react";
import { userService } from "@/Api/User";
import { useUser } from "@/hooks/User/useUser";
import type { User } from "@/interface/user/User";
import type { Tour } from "@/interface/tour/Tour";
import type { Guest } from "@/interface/common/Guest";
import { useNavigate } from "react-router-dom";
import { toaster } from "@/components/ui/toaster";

export function useBookingCheckout(tour: Tour | null) {
  const navigate = useNavigate();
  const { user: currentUser } = useUser();
  const [customer, setCustomer] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentUser?.id) {
      userService.getProfile(currentUser.id).then(setCustomer);
    }
  }, [currentUser?.id]);

  const buildReservationPayload = useCallback((guests: Guest[]) => {
    if (!tour || !currentUser) return null;
    return {
      tour: { id: tour.id },
      user: { id: currentUser.id },
      requestedSlots: guests.length,
    };
  }, [tour, currentUser]);

  const handleCheckout = useCallback(async (guests: Guest[]) => {
    if (!tour || !currentUser) return;
    setLoading(true);
    try {
      const payload = buildReservationPayload(guests);
      if (!payload) throw new Error("Invalid booking data");

      const response = await fetch(`http://localhost:8080/api/reservations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Booking failed");

      toaster.create({ title: "Booking Confirmed!", description: "Your reservation has been created.", type: "success" });
      navigate("/my-bookings");
    } catch (error) {
      toaster.create({ title: "Booking Failed", description: error instanceof Error ? error.message : "Unknown error", type: "error" });
    } finally {
      setLoading(false);
    }
  }, [tour, currentUser, buildReservationPayload, navigate]);

  return { customer, loading, handleCheckout, buildReservationPayload };
}



