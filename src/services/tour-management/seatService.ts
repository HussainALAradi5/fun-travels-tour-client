import { ENDPOINTS } from "@/config/endpoints";
import apiClient from "@/config/BaseApi";
import type { ApiResponse } from "@/interfaces/common/ApiResponse";
import type { Seat } from "@/interfaces/tour/Seat";
import type { SeatFilterParams } from "@/interfaces/tour/SeatFilterParams";
import type { PageResponse } from "@/interfaces/common/PageResponse";
import type { PaginationParams } from "@/interfaces/common/PaginationParams";
import { extractData } from "@/utilities/apiHelper";

export const seatService = {
  getAll: async (params: PaginationParams = {}): Promise<PageResponse<Seat>> => {
    const response = await apiClient.get<ApiResponse<PageResponse<Seat>>>(ENDPOINTS.seats.root, { params });
    return extractData(response.data);
  },

  getById: async (id: number): Promise<Seat> => {
    const response = await apiClient.get<ApiResponse<Seat>>(
      ENDPOINTS.seats.byId(id),
    );
    return response.data.data as unknown as Seat;
  },

  search: async (params: SeatFilterParams): Promise<PageResponse<Seat>> => {
    const response = await apiClient.get<ApiResponse<PageResponse<Seat>>>(
      ENDPOINTS.seats.search,
      { params },
    );
    return extractData(response.data);
  },

  update: async (id: number, data: Partial<Seat>): Promise<Seat> => {
    const response = await apiClient.patch<ApiResponse<Seat>>(
      ENDPOINTS.seats.byId(id),
      data,
    );
    return response.data.data as unknown as Seat;
  },

  updateStatus: async (id: number, status: string): Promise<Seat> => {
    const response = await apiClient.patch<ApiResponse<Seat>>(
      ENDPOINTS.seats.status(id),
      null,
      {
        params: { status },
      },
    );
    return response.data.data as unknown as Seat;
  },
};
