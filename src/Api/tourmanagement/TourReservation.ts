import apiClient from "@/config/BaseApi";
import type { ApiResponse } from "@/interface/common/ApiResponse";
import type { ReservationResponse } from "@/interface/tour/ReservationResponse";
import type { TourReservation } from "@/interface/tour/TourReservation";
import type { GenericStatus } from "@/enums/GenericStatus";

export const reservationService = {
  getAll: async (): Promise<TourReservation[]> => {
    const response =
      await apiClient.get<ApiResponse<ReservationResponse[]>>("/reservations");
    return response.data.data as unknown as TourReservation[];
  },

  getById: async (id: number): Promise<TourReservation> => {
    const response = await apiClient.get<ApiResponse<ReservationResponse>>(
      `/reservations/${id}`,
    );
    return response.data.data as unknown as TourReservation;
  },

  create: async (
    reservation: Partial<ReservationResponse>,
  ): Promise<TourReservation> => {
    const response = await apiClient.post<ApiResponse<ReservationResponse>>(
      "/reservations",
      reservation,
    );
    return response.data.data as unknown as TourReservation;
  },

  updateStatus: async (
    id: number,
    status: GenericStatus,
  ): Promise<TourReservation> => {
    const response = await apiClient.patch<ApiResponse<ReservationResponse>>(
      `/reservations/${id}/status`,
      null,
      { params: { status } },
    );
    return response.data.data as unknown as TourReservation;
  },

  cancel: async (id: number): Promise<TourReservation> => {
    const response = await apiClient.patch<ApiResponse<ReservationResponse>>(
      `/reservations/${id}/cancel`,
    );
    return response.data.data as unknown as TourReservation;
  },

  filter: async (params: {
    status?: GenericStatus;
    customerId?: number;
    agencyId?: number;
  }): Promise<TourReservation[]> => {
    const response = await apiClient.get<ApiResponse<ReservationResponse[]>>(
      "/reservations/filter",
      { params },
    );
    return response.data.data as unknown as TourReservation[];
  },
};
