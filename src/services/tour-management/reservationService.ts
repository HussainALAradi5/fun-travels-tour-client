import { ENDPOINTS } from "@/config/endpoints";
import apiClient from "@/config/BaseApi";
import type { ApiResponse } from "@/interfaces/common/ApiResponse";
import type { ReservationResponseDto } from "@/dtos/tour-management/ReservationResponseDto";
import type { GenericStatus } from "@/enums/GenericStatus";
import type { ReservationFilterParams } from "@/interfaces/tour/ReservationFilterParams";
import type { PageResponseDto } from "@/dtos/common/PageResponseDto";
import type { PaginationParams } from "@/interfaces/common/PaginationParams";
import { extractData } from "@/utilities/apiHelper";
import type { ReservationCreateRequestDto } from "@/dtos/tour-management/ReservationCreateRequestDto";

export const reservationService = {
  getAll: async (params: PaginationParams = {}): Promise<PageResponseDto<ReservationResponseDto>> => {
    const response =
      await apiClient.get<ApiResponse<PageResponseDto<ReservationResponseDto>>>(ENDPOINTS.reservations.root, { params });
    return extractData(response.data);
  },

  getById: async (id: number): Promise<ReservationResponseDto> => {
    const response = await apiClient.get<ApiResponse<ReservationResponseDto>>(
      ENDPOINTS.reservations.byId(id),
    );
    return response.data.data as unknown as ReservationResponseDto;
  },

  create: async (
    reservation: ReservationCreateRequestDto,
  ): Promise<ReservationResponseDto> => {
    const response = await apiClient.post<ApiResponse<ReservationResponseDto>>(
      ENDPOINTS.reservations.root,
      reservation,
    );
    return response.data.data as unknown as ReservationResponseDto;
  },

  updateStatus: async (
    id: number,
    status: GenericStatus,
  ): Promise<ReservationResponseDto> => {
    const response = await apiClient.patch<ApiResponse<ReservationResponseDto>>(
      ENDPOINTS.reservations.status(id),
      null,
      { params: { status } },
    );
    return response.data.data as unknown as ReservationResponseDto;
  },

  cancel: async (id: number): Promise<ReservationResponseDto> => {
    const response = await apiClient.patch<ApiResponse<ReservationResponseDto>>(
      ENDPOINTS.reservations.cancel(id),
    );
    return response.data.data as unknown as ReservationResponseDto;
  },

  search: async (params: ReservationFilterParams = {}): Promise<PageResponseDto<ReservationResponseDto>> => {
    const response = await apiClient.get<ApiResponse<PageResponseDto<ReservationResponseDto>>>(
      ENDPOINTS.reservations.search,
      { params },
    );
    return extractData(response.data);
  },
};
