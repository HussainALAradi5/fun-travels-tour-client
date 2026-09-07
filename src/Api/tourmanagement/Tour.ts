import apiClient from "@/config/BaseApi";
import type { GenericStatus } from "@/enums/GenericStatus";
import type { Tour } from "@/interface/tourmanagement/TourInterface";

export const tourService = {
  getAll: async () => {
    const response = await apiClient.get<Tour[]>("/tours");
    return response.data;
  },

  getById: async (id: number) => {
    const response = await apiClient.get<Tour>(`/tours/${id}`);
    return response.data;
  },

  create: async (tour: Tour) => {
    const response = await apiClient.post<Tour>("/tours", tour);
    return response.data;
  },

  update: async (id: number, tour: Partial<Tour>) => {
    const response = await apiClient.put<Tour>(`/tours/${id}`, tour);
    return response.data;
  },

  updateStatus: async (id: number, status: GenericStatus) => {
    const response = await apiClient.put<Tour>(`/tours/${id}/status`, null, {
      params: { status },
    });
    return response.data;
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
  }) => {
    const response = await apiClient.get<Tour[]>("/tours/filter", { params });
    return response.data;
  },
  getCatalog: async (params: {
    startCountryId?: number;
    endCountryId?: number;
    startDate?: string;
    endDate?: string;
  }) => {
    const response = await apiClient.get<Tour[]>("/tours/catalog", { params });
    return response.data;
  },
};
