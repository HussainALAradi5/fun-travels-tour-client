import apiClient from "@/config/BaseApi";
import type { ApiResponse } from "@/interface/common/ApiResponse";
import type { SeatResponse, Seat } from "@/interface";

export const seatService = {
  getAll: async (): Promise<Seat[]> => {
    const response = await apiClient.get<ApiResponse<SeatResponse[]>>("/seats");
    return response.data.data as unknown as Seat[];
  },

  getById: async (id: number): Promise<Seat> => {
    const response = await apiClient.get<ApiResponse<SeatResponse>>(`/seats/${id}`);
    return response.data.data as unknown as Seat;
  },

  filter: async (params: {
    transportId?: number;
    status?: string;
    chairType?: string;
    keyword?: string;
  }): Promise<Seat[]> => {
    const response = await apiClient.get<ApiResponse<SeatResponse[]>>("/seats/filter", { params });
    return response.data.data as unknown as Seat[];
  },

  update: async (id: number, data: Partial<SeatResponse>): Promise<Seat> => {
    const response = await apiClient.patch<ApiResponse<SeatResponse>>(`/seats/${id}`, data);
    return response.data.data as unknown as Seat;
  },

  updateStatus: async (id: number, status: string): Promise<Seat> => {
    const response = await apiClient.patch<ApiResponse<SeatResponse>>(`/seats/${id}/status`, null, {
      params: { status }
    });
    return response.data.data as unknown as Seat;
  },
};

