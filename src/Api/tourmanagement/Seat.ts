import apiClient from "@/config/BaseApi";
import type { ApiResponse } from "@/interface/common/ApiResponse";
import type { Seat } from "@/interface/tour/Seat";
import type { SeatFilterParams } from "@/interface/tour/SeatFilterParams";

export const seatService = {
  getAll: async (): Promise<Seat[]> => {
    const response = await apiClient.get<ApiResponse<Seat[]>>("/seats");
    return response.data.data as unknown as Seat[];
  },

  getById: async (id: number): Promise<Seat> => {
    const response = await apiClient.get<ApiResponse<Seat>>(
      `/seats/${id}`,
    );
    return response.data.data as unknown as Seat;
  },

  filter: async (params: SeatFilterParams): Promise<Seat[]> => {
    const response = await apiClient.get<ApiResponse<Seat[]>>(
      "/seats/filter",
      { params },
    );
    return response.data.data as unknown as Seat[];
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
