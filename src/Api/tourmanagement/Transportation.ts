import apiClient from "@/config/BaseApi";
import type { ApiResponse } from "@/interface/common/ApiResponse";
import type { TransportationResponse, Transportation } from "@/interface";

export const transportationService = {
  getAll: async (): Promise<Transportation[]> => {
    const response = await apiClient.get<ApiResponse<TransportationResponse[]>>("/transportations");
    return response.data.data as unknown as Transportation[];
  },

  getById: async (id: number): Promise<Transportation> => {
    const response = await apiClient.get<ApiResponse<TransportationResponse>>(`/transportations/${id}`);
    return response.data.data as unknown as Transportation;
  },

  create: async (data: Partial<TransportationResponse>): Promise<Transportation> => {
    const response = await apiClient.post<ApiResponse<TransportationResponse>>("/transportations", data);
    return response.data.data as unknown as Transportation;
  },

  update: async (id: number, data: Partial<TransportationResponse>): Promise<Transportation> => {
    const response = await apiClient.put<ApiResponse<TransportationResponse>>(`/transportations/${id}`, data);
    return response.data.data as unknown as Transportation;
  },

  updateStatus: async (id: number, status: string): Promise<Transportation> => {
    const response = await apiClient.patch<ApiResponse<TransportationResponse>>(`/transportations/${id}/status`, null, {
      params: { status }
    });
    return response.data.data as unknown as Transportation;
  },

  filter: async (params: {
    type?: string;
    status?: string;
    unitStatus?: string;
    keyword?: string;
  }): Promise<Transportation[]> => {
    const response = await apiClient.get<ApiResponse<TransportationResponse[]>>("/transportations/filter", { params });
    return response.data.data as unknown as Transportation[];
  },
};

