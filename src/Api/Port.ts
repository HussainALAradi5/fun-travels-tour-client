import apiClient from "@/config/BaseApi";
import type { ApiResponse } from "@/interface/common/ApiResponse";
import type { PortResponse } from "@/interface/geography/PortResponse";
import type { Port } from "@/interface/geography/Port";

export const portService = {
  getAllActive: async (): Promise<Port[]> => {
    const response = await apiClient.get<ApiResponse<PortResponse[]>>("/ports");
    return response.data.data as unknown as Port[];
  },

  create: async (port: Partial<PortResponse>): Promise<Port> => {
    const response = await apiClient.post<ApiResponse<PortResponse>>("/ports", port);
    return response.data.data as unknown as Port;
  },

  updateStatus: async (id: number, status: string): Promise<Port> => {
    const response = await apiClient.put<ApiResponse<PortResponse>>(`/ports/${id}/status`, null, {
      params: { status }
    });
    return response.data.data as unknown as Port;
  },
};
