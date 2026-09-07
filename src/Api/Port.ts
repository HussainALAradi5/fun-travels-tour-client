import apiClient from "@/config/BaseApi";
import type { Port } from "@/interface/PortInterface";

export const portService = {
  getAllActive: async () => {
    const response = await apiClient.get<Port[]>("/ports");
    return response.data;
  },

  create: async (port: Partial<Port>) => {
    const response = await apiClient.post<Port>("/ports", port);
    return response.data;
  },

  updateStatus: async (id: number, status: string) => {
    const response = await apiClient.put<Port>(`/ports/${id}/status`, null, {
      params: { status }
    });
    return response.data;
  }
};