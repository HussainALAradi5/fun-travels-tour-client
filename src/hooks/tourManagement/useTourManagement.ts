import { useState, useCallback, useEffect } from "react";
import { toaster } from "@/components/ui/toaster";
import { tourService } from "@/Api/tourmanagement/Tour";
import { seatService } from "@/Api/tourmanagement/Seat";
import { transportationService } from "@/Api/tourmanagement/Transportation";
import { mealPlanService } from "@/Api/tourmanagement/MealPlan";
import { ticketService } from "@/Api/tourmanagement/Ticket";
import { reservationService } from "@/Api/tourmanagement/TourReservation";
import type { Tour } from "@/interface/tour/Tour";
import type { TourReservation } from "@/interface/tour/TourReservation";
import type { Transportation } from "@/interface/tour/Transportation";
import type { TransportationCreateRequest } from "@/interface/tour/TransportationCreateRequest";
import type { MealPlan } from "@/interface/tour/MealPlan";
import type { Seat } from "@/interface/tour/Seat";
import type { User } from "@/interface/user/User";
import type { GenericStatus } from "@/enums/GenericStatus";
import { useUser } from "../User/useUser";

export function useTourManagement(param?: string | number | (() => Promise<unknown>)) {
  const { user: currentUser } = useUser();
  const [tour, setTour] = useState<Tour | null>(null);
  const [tours, setTours] = useState<Tour[]>([]);
  const [seats, setSeats] = useState<Seat[]>([]);
  const [meals, setMeals] = useState<MealPlan[]>([]);
  const [transportation, setTransportation] = useState<Transportation[]>([]);
  const [data, setData] = useState<Tour[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isMutating, setIsMutating] = useState(false);
  const calculateEndDate = useCallback((startDate: string, days: number): string => {
    if (!startDate || !days || days <= 0) return startDate || "";
    const date = new Date(startDate);
    date.setDate(date.getDate() + (Number(days) - 1));
    return date.toISOString().split("T")[0];
  }, []);

  const execute = async <R>(promise: Promise<R>, successTitle?: string, successDesc?: string): Promise<R> => {
    setIsMutating(true);
    try {
      const result = await promise;
      if (successTitle) {
        toaster.create({ title: successTitle, description: successDesc, type: "success" });
      }
      return result;
    } finally {
      setIsMutating(false);
    }
  };
  const fetchTours = useCallback(async (params: Record<string, string | number | boolean> = {}) => {
    setIsLoading(true);
    try {
      const res = await tourService.search(params);
      setTours(res.content);
    } catch {
      setTours([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchCatalog = useCallback(async (params: Record<string, string | number | boolean> = {}) => {
    setIsLoading(true);
    try {
      const res = await tourService.getCatalog(params);
      setTours(res.content);
    } catch {
      setTours([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchMeals = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await mealPlanService.getAll({ size: 100 });
      setMeals(res.content);
      if (!param) setData(res.content as unknown as Tour[]);
    } catch {
      setMeals([]);
    } finally {
      setIsLoading(false);
    }
  }, [param]);

  const fetchSeats = useCallback(async (transportId: number) => {
    if (!transportId) return;
    setIsLoading(true);
    try {
      const res = await seatService.search({ transportId, size: 100 });
      setSeats(res.content);
    } catch {
      setSeats([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchTransportation = useCallback(async (params: Record<string, string | number | boolean> = {}) => {
    setIsLoading(true);
    try {
      const res = await transportationService.search(params);
      setTransportation(res.content);
    } catch {
      setTransportation([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refresh = useCallback(async () => {
    if (typeof param === "function") {
      setLoading(true);
      try {
        const res = await param();
        if (Array.isArray(res)) setData(res as Tour[]);
        else if (res && typeof res === "object" && "content" in res) {
          setData((res as { content: Tour[] }).content);
        }
      } catch (err) {
        console.error("Resource fetch error:", err);
      } finally {
        setLoading(false);
      }
    } else {
      fetchMeals();
    }
  }, [param, fetchMeals]);
  const handleCreateTour = (tourData: Tour) =>
    execute(tourService.create(tourData as never), "Expedition Created", "Tour successfully configured.");

  const handleUpdateTour = (id: number, tourData: Partial<Tour>) =>
    execute(
      tourService.update(id, tourData as never).then((res) => {
        setTour(res);
        return res;
      }),
      "Tour Updated",
      "Expedition details saved."
    );

  const handleUpdateTourStatus = (id: number, status: GenericStatus) =>
    execute(
      tourService.updateStatus(id, status).then((res) => {
        setTour(res);
        return res;
      }),
      "Status Updated",
      `Tour is now ${status}.`
    );

  const handleCreateTransportation = (data: TransportationCreateRequest) =>
    execute(transportationService.create(data), "Unit Registered", "Vehicle added to fleet.");

  const handleUpdateTransportation = (id: number, values: Transportation) =>
    execute(
      transportationService.update(id, values as never).then((res) => {
        setTransportation((prev) => prev.map((t) => (t.id === id ? res : t)));
        return res;
      }),
      "Updated",
      "Fleet unit saved."
    );

  const handleUpdateTransportStatus = (id: number, status: string) =>
    execute(transportationService.updateStatus(id, status), "Status Updated");

  const handleUpdateSeat = (seatId: number, data: Partial<Seat>, transportId: number) =>
    execute(
      seatService.update(seatId, data).then((res) => {
        fetchSeats(transportId);
        return res;
      }),
      "Seat Updated",
      "Layout saved successfully."
    );

  const handleUpdateTicketStatus = (id: number, status: GenericStatus) =>
    execute(ticketService.updateStatus(id, status), "Ticket Updated", `Status changed to ${status}.`);

  const handleCancelTicket = (id: number) =>
    execute(ticketService.cancel(id), "Booking Cancelled", "Your reservation has been successfully cancelled.");

  const handleApproveTicket = (id: number) =>
    execute(ticketService.approve(id), "Ticket Approved", "The reservation is now approved.");

  const handleConfirmTicket = (id: number) =>
    execute(ticketService.confirm(id), "Ticket Confirmed", "The ticket is now officially confirmed.");

  const handleCreateReservation = async (reservationData: Partial<TourReservation>) => {
    if (!currentUser?.id) throw new Error("No authenticated user found.");
    const payload = { ...reservationData, user: reservationData.user || ({ id: currentUser.id } as User) };
    return execute(reservationService.create(payload as never), "Reservation Success", "Your dates have been secured.");
  };
  useEffect(() => {
    if (!param) return;
    if (typeof param === "function") {
      refresh();
    } else {
      setLoading(true);
      tourService
        .getById(Number(param))
        .then(setTour)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [param, refresh]);

  return {
    data,
    tour,
    tours,
    seats,
    meals,
    transportation,
    isLoading,
    loading,
    isMutating,
    isBooking: isMutating,
    refresh,
    fetchTours,
    fetchCatalog,
    fetchSeats,
    fetchMeals,
    fetchTransportation,
    setSeats,
    setTour,
    handleCreateTour,
    handleUpdateTour,
    handleUpdateTourStatus,
    handleCreateTransportation,
    handleUpdateTransportStatus,
    handleUpdateTransportation,
    handleUpdateSeat,
    handleCreateReservation,
    calculateEndDate,
    handleUpdateTicketStatus,
    handleCancelTicket,
    handleApproveTicket,
    handleConfirmTicket,
  };
}





