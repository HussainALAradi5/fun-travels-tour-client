import { ENDPOINTS } from "@/config/endpoints";
import apiClient from "@/config/BaseApi";
import type { ApiResponse } from "@/interfaces/common/ApiResponse";
import type { Agency } from "@/interfaces/agency/Agency";
import type { AgencyCreateRequest } from "@/interfaces/agency/AgencyCreateRequest";
import type { User } from "@/interfaces/user/User";
import type { PageResponse } from "@/interfaces/common/PageResponse";

export const agencyService = {
  searchAgencies: async (query: string, page = 0, size = 20): Promise<PageResponse<Agency>> => {
    const response = await apiClient.get<ApiResponse<PageResponse<Agency>>>(ENDPOINTS.agencies.search, {
      params: { query, page, size },
    });
    return response.data.data;
  },

  getAllAgencies: async (): Promise<Agency[]> => {
    const response = await apiClient.get<ApiResponse<Agency[]>>(ENDPOINTS.agencies.root);
    return response.data.data as unknown as Agency[];
  },

  getAgencyById: async (id: string | number): Promise<Agency> => {
    const response = await apiClient.get<ApiResponse<Agency>>(
      ENDPOINTS.agencies.byId(id),
    );
    return response.data.data as unknown as Agency;
  },

  createAgency: async (agencyData: AgencyCreateRequest): Promise<Agency> => {
    const response = await apiClient.post<ApiResponse<Agency>>(
      ENDPOINTS.agencies.root,
      agencyData,
    );
    return response.data.data as unknown as Agency;
  },


  getEmployeesByAgency: async (agencyId: number): Promise<User[]> => {
    const response = await apiClient.get<ApiResponse<User[]>>(
      ENDPOINTS.agencies.employees(agencyId),
    );
    return response.data.data as unknown as User[];
  },
};

