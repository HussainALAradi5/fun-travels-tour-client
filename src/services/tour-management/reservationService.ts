import { ENDPOINTS } from "@/config/endpoints";
import apiClient from "@/config/BaseApi";
import type { ApiResponse } from "@/interfaces/common/ApiResponse";
import type { TourReservation } from "@/interfaces/tour/TourReservation";
import type { GenericStatus } from "@/enums/GenericStatus";
import type { ReservationFilterParams } from "@/interfaces/tour/ReservationFilterParams";
import type { PageResponse } from "@/interfaces/common/PageResponse";
import type { PaginationParams } from "@/interfaces/common/PaginationParams";
import { extractData } from "@/utilities/apiHelper";
import type { ReservationPayload } from "@/interfaces/tour/ReservationPayload";

export const reservationService = {
  getAll: async (params: PaginationParams = {}): Promise<PageResponse<TourReservation>> => {
    const response =
      await apiClient.get<ApiResponse<PageResponse<TourReservation>>>(ENDPOINTS.reservations.root, { params });
    return extractData(response.data);
  },

  getById: async (id: number): Promise<TourReservation> => {
    const response = await apiClient.get<ApiResponse<TourReservation>>(
      ENDPOINTS.reservations.byId(id),
    );
    return response.data.data as unknown as TourReservation;
  },

  create: async (
    reservation: ReservationPayload,
  ): Promise<TourReservation> => {
    const response = await apiClient.post<ApiResponse<TourReservation>>(
      ENDPOINTS.reservations.root,
      reservation,
    );
    return response.data.data as unknown as TourReservation;
  },

  updateStatus: async (
    id: number,
    status: GenericStatus,
  ): Promise<TourReservation> => {
    const response = await apiClient.patch<ApiResponse<TourReservation>>(
      ENDPOINTS.reservations.status(id),
      null,
      { params: { status } },
    );
    return response.data.data as unknown as TourReservation;
  },

  cancel: async (id: number): Promise<TourReservation> => {
    const response = await apiClient.patch<ApiResponse<TourReservation>>(
      ENDPOINTS.reservations.cancel(id),
    );
    return response.data.data as unknown as TourReservation;
  },

  search: async (params: ReservationFilterParams = {}): Promise<PageResponse<TourReservation>> => {
    const response = await apiClient.get<ApiResponse<PageResponse<TourReservation>>>(
      ENDPOINTS.reservations.search,
      { params },
    );
    return extractData(response.data);
  },
};
