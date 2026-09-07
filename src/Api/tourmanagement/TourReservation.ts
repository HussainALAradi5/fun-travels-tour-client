import apiClient from "@/config/BaseApi";
import type { GenericStatus } from "@/enums/GenericStatus";
import type { TourReservation } from "@/interface/tourmanagement/TourReservationInterface";

export const reservationService = {
  getAll: async () => {
    const response = await apiClient.get<TourReservation[]>("/reservations");
    return response.data;
  },

  getById: async (id: number) => {
    const response = await apiClient.get<TourReservation>(
      `/reservations/${id}`,
    );
    return response.data;
  },

  create: async (reservation: Partial<TourReservation>) => {
    const response = await apiClient.post<TourReservation>(
      "/reservations",
      reservation,
    );
    return response.data;
  },

  updateStatus: async (id: number, status: GenericStatus) => {
    const response = await apiClient.patch<TourReservation>(
      `/reservations/${id}/status`,
      null,
      { params: { status } },
    );
    return response.data;
  },
  cancel: async (id: number) => {
    const response = await apiClient.patch<TourReservation>(
      `/reservations/${id}/cancel`,
    );
    return response.data;
  },

  filter: async (params: {
    status?: GenericStatus;
    customerId?: number;
    agencyId?: number;
  }) => {
    const response = await apiClient.get<TourReservation[]>(
      "/reservations/filter",
      { params },
    );
    return response.data;
  },
};