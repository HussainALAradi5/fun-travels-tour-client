import { ENDPOINTS } from "@/config/endpoints";
import apiClient from "@/config/BaseApi";
import type { ApiResponse } from "@/interfaces/common/ApiResponse";
import type { PortResponseDto } from "@/dtos/geography/PortResponseDto";

export const portService = {
  getAllActive: async (): Promise<PortResponseDto[]> => {
    const response = await apiClient.get<ApiResponse<PortResponseDto[]>>(ENDPOINTS.ports.root);
    return response.data.data as unknown as PortResponseDto[];
  },

  create: async (port: Partial<PortResponseDto>): Promise<PortResponseDto> => {
    const response = await apiClient.post<ApiResponse<PortResponseDto>>(ENDPOINTS.ports.root, port);
    return response.data.data as unknown as PortResponseDto;
  },

  updateStatus: async (id: number, status: string): Promise<PortResponseDto> => {
    const response = await apiClient.put<ApiResponse<PortResponseDto>>(ENDPOINTS.ports.status(id), null, {
      params: { status }
    });
    return response.data.data as unknown as PortResponseDto;
  },
};
