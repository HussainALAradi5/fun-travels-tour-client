import apiClient from "@/config/BaseApi";
import type { ApiResponse } from "@/interface/common/ApiResponse";
import type { TourReservation } from "@/interface/tour/TourReservation";
import type { GenericStatus } from "@/enums/GenericStatus";
import type { ReservationFilterParams } from "@/interface/tour/ReservationFilterParams";
import type { PageResponse } from "@/interface/common/PageResponse";
import type { PaginationParams } from "@/interface/common/PaginationParams";
import { extractData } from "@/utilities/apiHelper";

export const reservationService = {
  getAll: async (params: PaginationParams = {}): Promise<PageResponse<TourReservation>> => {
    const response =
      await apiClient.get<ApiResponse<PageResponse<TourReservation>>>("/reservations", { params });
    return extractData(response.data);
  },

  getById: async (id: number): Promise<TourReservation> => {
    const response = await apiClient.get<ApiResponse<TourReservation>>(
      `/reservations/${id}`,
    );
    return response.data.data as unknown as TourReservation;
  },

  create: async (
    reservation: Partial<TourReservation>,
  ): Promise<TourReservation> => {
    const response = await apiClient.post<ApiResponse<TourReservation>>(
      "/reservations",
      reservation,
    );
    return response.data.data as unknown as TourReservation;
  },

  updateStatus: async (
    id: number,
    status: GenericStatus,
  ): Promise<TourReservation> => {
    const response = await apiClient.patch<ApiResponse<TourReservation>>(
      `/reservations/${id}/status`,
      null,
      { params: { status } },
    );
    return response.data.data as unknown as TourReservation;
  },

  cancel: async (id: number): Promise<TourReservation> => {
    const response = await apiClient.patch<ApiResponse<TourReservation>>(
      `/reservations/${id}/cancel`,
    );
    return response.data.data as unknown as TourReservation;
  },

  search: async (params: ReservationFilterParams = {}): Promise<PageResponse<TourReservation>> => {
    const response = await apiClient.get<ApiResponse<PageResponse<TourReservation>>>(
      "/reservations/search",
      { params },
    );
    return extractData(response.data);
  },
};
