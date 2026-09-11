import apiClient from "@/config/BaseApi";
import type { ApiResponse } from "@/interface/common/ApiResponse";
import type { Transportation } from "@/interface/tour/Transportation";
import type { TransportationFilterParams } from "@/interface/tour/TransportationFilterParams";

export const transportationService = {
  getAll: async (): Promise<Transportation[]> => {
    const response =
      await apiClient.get<ApiResponse<Transportation[]>>(
        "/transportations",
      );
    return response.data.data as unknown as Transportation[];
  },

  getById: async (id: number): Promise<Transportation> => {
    const response = await apiClient.get<ApiResponse<Transportation>>(
      `/transportations/${id}`,
    );
    return response.data.data as unknown as Transportation;
  },

  create: async (
    data: Partial<Transportation>,
  ): Promise<Transportation> => {
    const response = await apiClient.post<ApiResponse<Transportation>>(
      "/transportations",
      data,
    );
    return response.data.data as unknown as Transportation;
  },

  update: async (
    id: number,
    data: Partial<Transportation>,
  ): Promise<Transportation> => {
    const response = await apiClient.put<ApiResponse<Transportation>>(
      `/transportations/${id}`,
      data,
    );
    return response.data.data as unknown as Transportation;
  },

  updateStatus: async (id: number, status: string): Promise<Transportation> => {
    const response = await apiClient.patch<ApiResponse<Transportation>>(
      `/transportations/${id}/status`,
      null,
      {
        params: { status },
      },
    );
    return response.data.data as unknown as Transportation;
  },

  filter: async (params: TransportationFilterParams): Promise<Transportation[]> => {
    const response = await apiClient.get<ApiResponse<Transportation[]>>(
      "/transportations/filter",
      { params },
    );
    return response.data.data as unknown as Transportation[];
  },
};
