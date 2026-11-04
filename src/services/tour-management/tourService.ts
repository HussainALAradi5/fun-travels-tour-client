import { ENDPOINTS } from "@/config/endpoints";
import apiClient from "@/config/BaseApi";
import type { ApiResponse } from "@/interfaces/common/ApiResponse";
import type { Tour } from "@/interfaces/tour/Tour";
import type { TourCreateRequest } from "@/interfaces/tour/TourCreateRequest";
import type { GenericStatus } from "@/enums/GenericStatus";
import type { TourFilterParams } from "@/interfaces/tour/TourFilterParams";
import type { TourCatalogParams } from "@/interfaces/tour/TourCatalogParams";
import type { PageResponse } from "@/interfaces/common/PageResponse";
import type { PaginationParams } from "@/interfaces/common/PaginationParams";
import { extractData } from "@/utilities/apiHelper";

export const tourService = {
  getAll: async (params: PaginationParams = {}): Promise<PageResponse<Tour>> => {
    const response = await apiClient.get<ApiResponse<PageResponse<Tour>>>(ENDPOINTS.tours.root, { params });
    return extractData(response.data);
  },

  getById: async (id: number): Promise<Tour> => {
    const response = await apiClient.get<ApiResponse<Tour>>(
      ENDPOINTS.tours.byId(id),
    );
    return response.data.data as unknown as Tour;
  },

  create: async (tour: TourCreateRequest): Promise<Tour> => {
    const response = await apiClient.post<ApiResponse<Tour>>(
      ENDPOINTS.tours.root,
      tour,
    );
    return response.data.data as unknown as Tour;
  },

  update: async (
    id: number,
    tour: Partial<TourCreateRequest>,
  ): Promise<Tour> => {
    const response = await apiClient.put<ApiResponse<Tour>>(
      ENDPOINTS.tours.byId(id),
      tour,
    );
    return response.data.data as unknown as Tour;
  },

  updateStatus: async (id: number, status: GenericStatus): Promise<Tour> => {
    const response = await apiClient.put<ApiResponse<Tour>>(
      ENDPOINTS.tours.status(id),
      null,
      {
        params: { status },
      },
    );
    return response.data.data as unknown as Tour;
  },

  search: async (params: TourFilterParams = {}): Promise<PageResponse<Tour>> => {
    const response = await apiClient.get<ApiResponse<PageResponse<Tour>>>(
      ENDPOINTS.tours.search,
      { params },
    );
    return extractData(response.data);
  },

  getCatalog: async (params: TourCatalogParams = {}): Promise<PageResponse<Tour>> => {
    const response = await apiClient.get<ApiResponse<PageResponse<Tour>>>(
      ENDPOINTS.tours.catalog,
      { params },
    );
    return extractData(response.data);
  },
};
