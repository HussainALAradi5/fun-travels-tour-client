import apiClient from "@/config/BaseApi";
import type { ApiResponse } from "@/interface/common/ApiResponse";
import type { Agency } from "@/interface/agency/Agency";
import type { AgencyCreateRequest } from "@/interface/agency/AgencyCreateRequest";
import type { User } from "@/interface/user/User";
import { authUtils } from "@/utilities/AuthUtils";
import type { PageResponse } from "@/interface/common/PageResponse";

export const agencyService = {
  searchAgencies: async (query: string, page = 0, size = 20): Promise<PageResponse<Agency>> => {
    const response = await apiClient.get<ApiResponse<PageResponse<Agency>>>("agencies/search", {
      params: { query, page, size },
    });
    return response.data.data;
  },

  getAllAgencies: async (): Promise<Agency[]> => {
    const response = await apiClient.get<ApiResponse<Agency[]>>("agencies");
    return response.data.data as unknown as Agency[];
  },

  getAgencyById: async (id: string | number): Promise<Agency> => {
    const response = await apiClient.get<ApiResponse<Agency>>(
      `agencies/${id}`,
    );
    return response.data.data as unknown as Agency;
  },

  createAgency: async (agencyData: AgencyCreateRequest): Promise<Agency> => {
    const response = await apiClient.post<ApiResponse<Agency>>(
      "agencies",
      agencyData,
    );
    return response.data.data as unknown as Agency;
  },

  getVisibleStaff: async (): Promise<User[]> => {
    const user = authUtils.getUser();
    if (!user || !user.id) throw new Error("User not authenticated");

    const response = await apiClient.get<ApiResponse<User[]>>(
      `agencies/staff-view/${user.id}`,
    );
    return response.data.data as unknown as User[];
  },

  getEmployeesByAgency: async (agencyId: number): Promise<User[]> => {
    const response = await apiClient.get<ApiResponse<User[]>>(
      `agencies/${agencyId}/employees`,
    );
    return response.data.data as unknown as User[];
  },
};

