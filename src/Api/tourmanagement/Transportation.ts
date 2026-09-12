import apiClient from "@/config/BaseApi";
import type { ApiResponse } from "@/interface/common/ApiResponse";
import type { Transportation } from "@/interface/tour/Transportation";
import type { TransportationFilterParams } from "@/interface/tour/TransportationFilterParams";
import type { PageResponse } from "@/interface/common/PageResponse";
import type { PaginationParams } from "@/interface/common/PaginationParams";
import { extractData } from "@/utilities/apiHelper";

export const transportationService = {
  getAll: async (params: PaginationParams = {}): Promise<PageResponse<Transportation>> => {
    const response =
      await apiClient.get<ApiResponse<PageResponse<Transportation>>>(
        "/transportations", { params },
      );
    return extractData(response.data);
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

  search: async (params: TransportationFilterParams = {}): Promise<PageResponse<Transportation>> => {
    const response = await apiClient.get<ApiResponse<PageResponse<Transportation>>>(
      "/transportations/search",
      { params },
    );
    return extractData(response.data);
  },
};
