import { ENDPOINTS } from "@/config/endpoints";
import apiClient from "@/config/BaseApi";
import type { ApiResponse } from "@/interfaces/common/ApiResponse";
import type { Port } from "@/interfaces/geography/Port";

export const portService = {
  getAllActive: async (): Promise<Port[]> => {
    const response = await apiClient.get<ApiResponse<Port[]>>(ENDPOINTS.ports.root);
    return response.data.data as unknown as Port[];
  },

  create: async (port: Partial<Port>): Promise<Port> => {
    const response = await apiClient.post<ApiResponse<Port>>(ENDPOINTS.ports.root, port);
    return response.data.data as unknown as Port;
  },

  updateStatus: async (id: number, status: string): Promise<Port> => {
    const response = await apiClient.put<ApiResponse<Port>>(ENDPOINTS.ports.status(id), null, {
      params: { status }
    });
    return response.data.data as unknown as Port;
  },
};
