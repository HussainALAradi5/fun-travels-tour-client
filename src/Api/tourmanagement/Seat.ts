import apiClient from "@/config/BaseApi";
import type { Seat } from "@/interface/tourmanagement/SeatInterface";

export const seatService = {
  getAll: async () => {
    const res = await apiClient.get<Seat[]>("/seats");
    return res.data;
  },

  getById: async (id: number) => {
    const res = await apiClient.get<Seat>(`/seats/${id}`);
    return res.data;
  },

filter: async (params: { 
    transportId?: number; 
    status?: string; 
    chairType?: string; 
    keyword?: string;
  }) => {
    const res = await apiClient.get<Seat[]>("/seats/filter", { params });
    return res.data;
  },

update: async (id: number, data: Partial<Seat>) => {
    const res = await apiClient.patch<Seat>(`/seats/${id}`, data);
    return res.data;
  },

  updateStatus: async (id: number, status: string) => {
    const res = await apiClient.patch<Seat>(`/seats/${id}/status`, null, { 
      params: { status } 
    });
    return res.data;
  }
};