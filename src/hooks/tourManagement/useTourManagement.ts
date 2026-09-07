import { useState, useCallback, useEffect } from "react";
import { toaster } from "@/components/ui/toaster";

// Services
import { tourService } from "@/Api/tourmanagement/Tour";
import { seatService } from "@/Api/tourmanagement/Seat";
import { transportationService } from "@/Api/tourmanagement/Transportation";
import { mealPlanService } from "@/Api/tourmanagement/MealPlan";
import { ticketService } from "@/Api/tourmanagement/Ticket";
import { reservationService } from "@/Api/tourmanagement/TourReservation";

// Interfaces
import type { Tour } from "@/interface/tourmanagement/TourInterface";
import type { Seat } from "@/interface/tourmanagement/SeatInterface";
import type { Transportation } from "@/interface/tourmanagement/TransportationInterface";
import type { MealPlan } from "@/interface/tourmanagement/MealPlanInterface";
import type { Ticket } from "@/interface/tourmanagement/TicketInterface";
import type { TourReservation } from "@/interface/tourmanagement/TourReservationInterface";
import type { User } from "@/interface/UserInterface";
import type { GenericStatus } from "@/enums/GenericStatus";
import { useUser } from "../User/useUser";

export function useTourManagement<T = Tour>(
  param?: string | number | (() => Promise<any>)
) {
  const { user: currentUser } = useUser();

  // --- State ---
  const [tour, setTour] = useState<Tour | null>(null);
  const [tours, setTours] = useState<Tour[]>([]);
  const [seats, setSeats] = useState<Seat[]>([]);
  const [meals, setMeals] = useState<MealPlan[]>([]);
  const [transportation, setTransportation] = useState<Transportation[]>([]);
  const [data, setData] = useState<T[]>([]);

  const [isLoading, setIsLoading] = useState(false); // Global fetching state
  const [loading, setLoading] = useState(false);     // Initial mount loading
  const [isMutating, setIsMutating] = useState(false); // POST/PUT/PATCH state

  // --- Utilities ---
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

  // --- Fetchers ---
  const fetchTours = useCallback(async (params: Parameters<typeof tourService.filter>[0] = {}) => {
    setIsLoading(true);
    try {
      const res = await tourService.filter(params);
      setTours(Array.isArray(res) ? res : []);
    } finally { setIsLoading(false); }
  }, []);

  const fetchCatalog = useCallback(async (params: Parameters<typeof tourService.getCatalog>[0] = {}) => {
    setIsLoading(true);
    try {
      const res = await tourService.getCatalog(params);
      setTours(Array.isArray(res) ? res : []);
    } finally { 
      setIsLoading(false); 
    }
  }, []);

  const fetchMeals = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await mealPlanService.getAll();
      const fetchedMeals = res.data || [];
      setMeals(fetchedMeals);
      if (!param) setData(fetchedMeals as unknown as T[]);
    } finally { setIsLoading(false); }
  }, [param]);

  const fetchSeats = useCallback(async (transportId: number) => {
    if (!transportId) return;
    setIsLoading(true);
    try {
      const res = await seatService.filter({ transportId });
      setSeats(Array.isArray(res) ? res : []);
    } finally { setIsLoading(false); }
  }, []);

  const fetchTransportation = useCallback(async (params: Parameters<typeof transportationService.filter>[0] = {}) => {
    setIsLoading(true);
    try {
      const res = await transportationService.filter(params);
      setTransportation(Array.isArray(res) ? res : []);
    } finally { setIsLoading(false); }
  }, []);

  const refresh = useCallback(async () => {
    if (typeof param === 'function') {
      setLoading(true);
      try {
        const res = await (param as () => Promise<any>)();
        const extractedData = res?.data?.data || res?.data || res || [];
        if (Array.isArray(extractedData)) {
          setData(extractedData as T[]);
        }
      } catch (err) {
        console.error("Resource fetch error:", err);
      } finally { setLoading(false); }
    } else {
      fetchMeals();
    }
  }, [param, fetchMeals]);

  // --- Mutations ---

  const handleCreateTour = (tourData: Tour) =>
    execute(tourService.create(tourData), "Expedition Created", "Tour successfully configured.");

  const handleUpdateTour = (id: number, tourData: Partial<Tour>) =>
    execute(tourService.update(id, tourData).then(res => { setTour(res); return res; }), "Tour Updated", "Expedition details saved.");

  const handleUpdateTourStatus = (id: number, status: GenericStatus) =>
    execute(tourService.updateStatus(id, status).then(res => { setTour(res); return res; }), "Status Updated", `Tour is now ${status}.`);

  const handleCreateTransportation = (data: Transportation) =>
    execute(transportationService.create(data), "Unit Registered", "Vehicle added to fleet.");

  const handleUpdateTransportation = (id: number, values: Transportation) =>
    execute(
      transportationService.update(id, values).then(res => {
        setTransportation(prev => prev.map(t => t.id === id ? res : t));
        return res;
      }), 
      "Updated", "Fleet unit saved."
    );

  const handleUpdateTransportStatus = (id: number, status: string) =>
    execute(transportationService.updateStatus(id, status), "Status Updated");

  const handleUpdateSeat = (seatId: number, data: Partial<Seat>, transportId: number) =>
    execute(seatService.update(seatId, data).then(res => { fetchSeats(transportId); return res; }), "Seat Updated", "Layout saved successfully.");

  const handleUpdateTicketStatus = (id: number, status: GenericStatus) =>
    execute(ticketService.updateStatus(id, status), "Ticket Updated", `Status changed to ${status}.`);

  const handleCancelTicket = (id: number) =>
    execute(ticketService.cancel(id), "Booking Cancelled", "Your reservation has been successfully cancelled.");

  const handleApproveTicket = (id: number) =>
    execute(ticketService.approve(id), "Ticket Approved", "The reservation is now approved.");

  const handleConfirmTicket = (id: number) =>
    execute(ticketService.confirm(id), "Ticket Confirmed", "The ticket is now officially confirmed.");

  const handleBookTour = async (ticketData: Partial<Ticket>) => {
    if (!currentUser?.id) throw new Error("No authenticated user found.");
    
    const payload = { ...ticketData, customer: ticketData.customer || ({ id: currentUser.id } as User) };
    
    return execute(
      ticketService.create(payload as Ticket), 
      "Booking Confirmed!", "Ticket issued successfully."
    );
  };

  const handleCreateReservation = async (reservationData: Partial<TourReservation>) => {
    if (!currentUser?.id) throw new Error("No authenticated user found.");
    
    const payload = { ...reservationData, user: reservationData.user || ({ id: currentUser.id } as User) };
    
    return execute(
      reservationService.create(payload), 
      "Reservation Success", "Your dates have been secured."
    );
  };

  // --- Lifecycle ---
  useEffect(() => {
    if (!param) return;
    if (typeof param === 'function') {
      refresh();
    } else {
      setLoading(true);
      tourService.getById(Number(param))
        .then(setTour)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [param, refresh]);

  return {
    // Data
    data,
    tour,
    tours,
    seats,
    meals,
    transportation,
    // Loading States
    isLoading,
    loading,
    isMutating,
    isBooking: isMutating,
    // Fetchers
    refresh,
    fetchTours,
    fetchCatalog,
    fetchSeats,
    fetchMeals,
    fetchTransportation,
    // Setters
    setSeats,
    setTour,
    // Mutation Handlers
    handleCreateTour,
    handleUpdateTour,
    handleUpdateTourStatus,
    handleCreateTransportation,
    handleUpdateTransportStatus,
    handleUpdateTransportation,
    handleUpdateSeat,
    handleBookTour,
    handleCreateReservation,
    calculateEndDate,
    handleUpdateTicketStatus,
    handleCancelTicket,
    handleApproveTicket,
    handleConfirmTicket,
  };
}