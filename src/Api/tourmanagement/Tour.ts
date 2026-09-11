import apiClient from "@/config/BaseApi";
import type { ApiResponse } from "@/interface/common/ApiResponse";
import type { Tour } from "@/interface/tour/Tour";
import type { TourCreateRequest } from "@/interface/tour/TourCreateRequest";
import type { GenericStatus } from "@/enums/GenericStatus";
import type { TourFilterParams } from "@/interface/tour/TourFilterParams";
import type { TourCatalogParams } from "@/interface/tour/TourCatalogParams";

export const tourService = {
  getAll: async (): Promise<Tour[]> => {
    const response = await apiClient.get<ApiResponse<Tour[]>>("/tours");
    return response.data.data as unknown as Tour[];
  },

  getById: async (id: number): Promise<Tour> => {
    const response = await apiClient.get<ApiResponse<Tour>>(
      `/tours/${id}`,
    );
    return response.data.data as unknown as Tour;
  },

  create: async (tour: TourCreateRequest): Promise<Tour> => {
    const response = await apiClient.post<ApiResponse<Tour>>(
      "/tours",
      tour,
    );
    return response.data.data as unknown as Tour;
  },

  update: async (
    id: number,
    tour: Partial<TourCreateRequest>,
  ): Promise<Tour> => {
    const response = await apiClient.put<ApiResponse<Tour>>(
      `/tours/${id}`,
      tour,
    );
    return response.data.data as unknown as Tour;
  },

  updateStatus: async (id: number, status: GenericStatus): Promise<Tour> => {
    const response = await apiClient.put<ApiResponse<Tour>>(
      `/tours/${id}/status`,
      null,
      {
        params: { status },
      },
    );
    return response.data.data as unknown as Tour;
  },

  filter: async (params: TourFilterParams): Promise<Tour[]> => {
    const response = await apiClient.get<ApiResponse<Tour[]>>(
      "/tours/filter",
      { params },
    );
    return response.data.data as unknown as Tour[];
  },

  getCatalog: async (params: TourCatalogParams): Promise<Tour[]> => {
    const response = await apiClient.get<ApiResponse<Tour[]>>(
      "/tours/catalog",
      { params },
    );
    return response.data.data as unknown as Tour[];
  },
};
