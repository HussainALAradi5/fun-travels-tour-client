import { ENDPOINTS } from "@/config/endpoints";
import apiClient from "@/config/BaseApi";
import type { ApiResponse } from "@/interfaces/common/ApiResponse";
import type { SeatResponseDto } from "@/dtos/tour-management/SeatResponseDto";
import type { SeatFilterParams } from "@/interfaces/tour/SeatFilterParams";
import type { PageResponseDto } from "@/dtos/common/PageResponseDto";
import type { PaginationParams } from "@/interfaces/common/PaginationParams";
import { extractData } from "@/utilities/apiHelper";

export const seatService = {
  getAll: async (params: PaginationParams = {}): Promise<PageResponseDto<SeatResponseDto>> => {
    const response = await apiClient.get<ApiResponse<PageResponseDto<SeatResponseDto>>>(ENDPOINTS.seats.root, { params });
    return extractData(response.data);
  },

  getById: async (id: number): Promise<SeatResponseDto> => {
    const response = await apiClient.get<ApiResponse<SeatResponseDto>>(
      ENDPOINTS.seats.byId(id),
    );
    return response.data.data as unknown as SeatResponseDto;
  },

  search: async (params: SeatFilterParams): Promise<PageResponseDto<SeatResponseDto>> => {
    const response = await apiClient.get<ApiResponse<PageResponseDto<SeatResponseDto>>>(
      ENDPOINTS.seats.search,
      { params },
    );
    return extractData(response.data);
  },

  update: async (id: number, data: Partial<SeatResponseDto>): Promise<SeatResponseDto> => {
    const response = await apiClient.patch<ApiResponse<SeatResponseDto>>(
      ENDPOINTS.seats.byId(id),
      data,
    );
    return response.data.data as unknown as SeatResponseDto;
  },

  updateStatus: async (id: number, status: string): Promise<SeatResponseDto> => {
    const response = await apiClient.patch<ApiResponse<SeatResponseDto>>(
      ENDPOINTS.seats.status(id),
      null,
      {
        params: { status },
      },
    );
    return response.data.data as unknown as SeatResponseDto;
  },
};
