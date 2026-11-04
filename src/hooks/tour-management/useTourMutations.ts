import type { Dispatch, SetStateAction } from "react";
import type { GenericStatus } from "@/enums/GenericStatus";
import type { Seat } from "@/interfaces/tour/Seat";
import type { Tour } from "@/interfaces/tour/Tour";
import type { TourCreateRequest } from "@/interfaces/tour/TourCreateRequest";
import type { TourReservation } from "@/interfaces/tour/TourReservation";
import type { Transportation } from "@/interfaces/tour/Transportation";
import type { TransportationCreateRequest } from "@/interfaces/tour/TransportationCreateRequest";
import type { User } from "@/interfaces/user/User";
import { reservationService } from "@/services/tour-management/reservationService";
import { seatService } from "@/services/tour-management/seatService";
import { ticketService } from "@/services/tour-management/ticketService";
import { tourService } from "@/services/tour-management/tourService";
import { transportationService } from "@/services/tour-management/transportationService";
import { useMutationRunner } from "../common/useMutationRunner";
import type { TourCreateRequestDto } from "@/dtos/tour-management/TourCreateRequestDto";
import type { TransportationEditForm } from "@/interfaces/tour/TransportationEditForm";

interface MutationDeps {
  currentUserId?: number;
  setTour: (tour: Tour) => void;
  setTransportation: Dispatch<SetStateAction<Transportation[]>>;
  fetchSeats: (transportId: number) => Promise<void>;
}

/** Tour, fleet, seat, ticket, and reservation changes with success toasts. */
export function useTourMutations({ currentUserId, setTour, setTransportation, fetchSeats }: MutationDeps) {
  const { isMutating, execute } = useMutationRunner();
  const keepTour = (res: Tour) => { setTour(res); return res; };

  return {
    isMutating,
    // The create form marks countries and cities required, so a submitted form is a complete request.
    handleCreateTour: (data: TourCreateRequest) =>
      execute(tourService.create(data as TourCreateRequestDto), "Expedition Created", "Tour successfully configured."),
    handleUpdateTour: (id: number, data: Partial<Tour>) =>
      execute(tourService.update(id, data as never).then(keepTour), "Tour Updated", "Expedition details saved."),
    handleUpdateTourStatus: (id: number, status: GenericStatus) =>
      execute(tourService.updateStatus(id, status).then(keepTour), "Status Updated", `Tour is now ${status}.`),
    handleCreateTransportation: (data: TransportationCreateRequest) =>
      execute(transportationService.create(data), "Unit Registered", "Vehicle added to fleet."),
    handleUpdateTransportation: (id: number, values: TransportationEditForm) =>
      execute(transportationService.update(id, {
        transportationNumber: values.transportationNumber, providerName: values.providerName,
        type: values.type, seatConfig: values.seatConfig,
      }).then((res) => {
        setTransportation((prev) => prev.map((t) => (t.id === id ? res : t)));
        return res;
      }), "Updated", "Fleet unit saved."),
    handleUpdateTransportStatus: (id: number, status: string) =>
      execute(transportationService.updateStatus(id, status), "Status Updated"),
    handleUpdateSeat: (seatId: number, data: Partial<Seat>, transportId: number) =>
      execute(seatService.update(seatId, data).then(async (res) => { await fetchSeats(transportId); return res; }),
        "Seat Updated", "Layout saved successfully."),
    handleUpdateTicketStatus: (id: number, status: GenericStatus) =>
      execute(ticketService.updateStatus(id, status), "Ticket Updated", `Status changed to ${status}.`),
    handleCancelTicket: (id: number) =>
      execute(ticketService.cancel(id), "Ticket Cancelled", "The ticket was cancelled and its seat was released."),
    handleApproveTicket: (id: number) =>
      execute(ticketService.approve(id), "Ticket Approved", "The reservation is now approved."),
    handleConfirmTicket: (id: number) =>
      execute(ticketService.confirm(id), "Ticket Confirmed", "The ticket is now officially confirmed."),
    handleCreateReservation: async (reservationData: Partial<TourReservation>) => {
      if (!currentUserId) throw new Error("No authenticated user found.");
      const payload = { ...reservationData, user: reservationData.user || ({ id: currentUserId } as User) };
      return execute(reservationService.create(payload as never), "Seats Held",
        "Complete wallet payment within 15 minutes to confirm the reservation.");
    },
  };
}
