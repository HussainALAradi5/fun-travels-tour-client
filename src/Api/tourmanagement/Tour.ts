import apiClient from "@/config/BaseApi";
import type { ApiResponse } from "@/interface/common/ApiResponse";
import type { TourResponse } from "@/interface/tour/TourResponse";
import type { TourCreateRequest } from "@/interface/tour/TourCreateRequest";
import type { Tour } from "@/interface/tour/Tour";
import type { GenericStatus } from "@/enums/GenericStatus";

export const tourService = {
  getAll: async (): Promise<Tour[]> => {
    const response = await apiClient.get<ApiResponse<TourResponse[]>>("/tours");
    return response.data.data as unknown as Tour[];
  },

  getById: async (id: number): Promise<Tour> => {
    const response = await apiClient.get<ApiResponse<TourResponse>>(
      `/tours/${id}`,
    );
    return response.data.data as unknown as Tour;
  },

  create: async (tour: TourCreateRequest): Promise<Tour> => {
    const response = await apiClient.post<ApiResponse<TourResponse>>(
      "/tours",
      tour,
    );
    return response.data.data as unknown as Tour;
  },

  update: async (
    id: number,
    tour: Partial<TourCreateRequest>,
  ): Promise<Tour> => {
    const response = await apiClient.put<ApiResponse<TourResponse>>(
      `/tours/${id}`,
      tour,
    );
    return response.data.data as unknown as Tour;
  },

  updateStatus: async (id: number, status: GenericStatus): Promise<Tour> => {
    const response = await apiClient.put<ApiResponse<TourResponse>>(
      `/tours/${id}/status`,
      null,
      {
        params: { status },
      },
    );
    return response.data.data as unknown as Tour;
  },

  filter: async (params: {
    status?: string;
    minSlots?: number;
    startDate?: string;
    endDate?: string;
    agencyId?: number;
    branchId?: number;
    minPrice?: number;
    maxPrice?: number;
    countryId?: number;
    cityId?: number;
    createdById?: number;
    sortBy?: string;
    sortDir?: "asc" | "desc";
  }): Promise<Tour[]> => {
    const response = await apiClient.get<ApiResponse<TourResponse[]>>(
      "/tours/filter",
      { params },
    );
    return response.data.data as unknown as Tour[];
  },

  getCatalog: async (params: {
    startCountryId?: number;
    endCountryId?: number;
    startDate?: string;
    endDate?: string;
  }): Promise<Tour[]> => {
    const response = await apiClient.get<ApiResponse<TourResponse[]>>(
      "/tours/catalog",
      { params },
    );
    return response.data.data as unknown as Tour[];
  },
};
