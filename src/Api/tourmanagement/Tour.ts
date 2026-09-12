import apiClient from "@/config/BaseApi";
import type { ApiResponse } from "@/interface/common/ApiResponse";
import type { Tour } from "@/interface/tour/Tour";
import type { TourCreateRequest } from "@/interface/tour/TourCreateRequest";
import type { GenericStatus } from "@/enums/GenericStatus";
import type { TourFilterParams } from "@/interface/tour/TourFilterParams";
import type { TourCatalogParams } from "@/interface/tour/TourCatalogParams";
import type { PageResponse } from "@/interface/common/PageResponse";
import type { PaginationParams } from "@/interface/common/PaginationParams";
import { extractData } from "@/utilities/apiHelper";

export const tourService = {
  getAll: async (params: PaginationParams = {}): Promise<PageResponse<Tour>> => {
    const response = await apiClient.get<ApiResponse<PageResponse<Tour>>>("/tours", { params });
    return extractData(response.data);
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

  search: async (params: TourFilterParams = {}): Promise<PageResponse<Tour>> => {
    const response = await apiClient.get<ApiResponse<PageResponse<Tour>>>(
      "/tours/search",
      { params },
    );
    return extractData(response.data);
  },

  getCatalog: async (params: TourCatalogParams = {}): Promise<PageResponse<Tour>> => {
    const response = await apiClient.get<ApiResponse<PageResponse<Tour>>>(
      "/tours/catalog",
      { params },
    );
    return extractData(response.data);
  },
};
