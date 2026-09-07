import apiClient from "@/config/BaseApi";
import type { Transportation } from "@/interface/tourmanagement/TransportationInterface";

export const transportationService = {
  getAll: async () => {
    const res = await apiClient.get<Transportation[]>("/transportations");
    return res.data;
  },

  getById: async (id: number) => {
    const res = await apiClient.get<Transportation>(`/transportations/${id}`);
    return res.data;
  },

  create: async (data: Transportation) => {
    const res = await apiClient.post<Transportation>("/transportations", data);
    return res.data;
  },

 update: async (id: number, data: Transportation) => {
  const res = await apiClient.put<Transportation>(`/transportations/${id}`, data);
  return res.data;
},

  updateStatus: async (id: number, status: string) => {
    const res = await apiClient.patch<Transportation>(`/transportations/${id}/status`, null, { 
      params: { status } 
    });
    return res.data;
  },

filter: async (params: {
    type?: string;
    status?: string;
    unitStatus?: string;
    keyword?: string; 
  }) => {
    const res = await apiClient.get<Transportation[]>("/transportations/filter", { params });
    return res.data;
  }
};