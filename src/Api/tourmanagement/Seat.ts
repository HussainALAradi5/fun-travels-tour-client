import apiClient from "@/config/BaseApi";
import type { ApiResponse } from "@/interface/common/ApiResponse";
import type { Seat } from "@/interface/tour/Seat";
import type { SeatFilterParams } from "@/interface/tour/SeatFilterParams";
import type { PageResponse } from "@/interface/common/PageResponse";
import type { PaginationParams } from "@/interface/common/PaginationParams";
import { extractData } from "@/utilities/apiHelper";

export const seatService = {
  getAll: async (params: PaginationParams = {}): Promise<PageResponse<Seat>> => {
    const response = await apiClient.get<ApiResponse<PageResponse<Seat>>>("/seats", { params });
    return extractData(response.data);
  },

  getById: async (id: number): Promise<Seat> => {
    const response = await apiClient.get<ApiResponse<Seat>>(
      `/seats/${id}`,
    );
    return response.data.data as unknown as Seat;
  },

  search: async (params: SeatFilterParams): Promise<PageResponse<Seat>> => {
    const response = await apiClient.get<ApiResponse<PageResponse<Seat>>>(
      "/seats/search",
      { params },
    );
    return extractData(response.data);
  },

  update: async (id: number, data: Partial<Seat>): Promise<Seat> => {
    const response = await apiClient.patch<ApiResponse<Seat>>(
      `/seats/${id}`,
      data,
    );
    return response.data.data as unknown as Seat;
  },

  updateStatus: async (id: number, status: string): Promise<Seat> => {
    const response = await apiClient.patch<ApiResponse<Seat>>(
      `/seats/${id}/status`,
      null,
      {
        params: { status },
      },
    );
    return response.data.data as unknown as Seat;
  },
};
