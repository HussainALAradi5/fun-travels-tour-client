import apiClient from "@/config/BaseApi";
import type { ApiResponse } from "@/interface/common/ApiResponse";
import type { Agency } from "@/interface/agency/Agency";
import type { AgencyResponse } from "@/interface/agency/AgencyResponse";
import type { AgencyCreateRequest } from "@/interface/agency/AgencyCreateRequest";
import type { User } from "@/interface/user/User";
import type { UserResponse } from "@/interface/user/UserResponse";
import { authUtils } from "@/utilities/AuthUtils";

export const agencyService = {
  getAllAgencies: async (): Promise<Agency[]> => {
    const response = await apiClient.get<ApiResponse<AgencyResponse[]>>("agencies");
    return response.data.data as unknown as Agency[];
  },

  getAgencyById: async (id: string | number): Promise<Agency> => {
    const response = await apiClient.get<ApiResponse<AgencyResponse>>(
      `agencies/${id}`,
    );
    return response.data.data as unknown as Agency;
  },

  createAgency: async (agencyData: AgencyCreateRequest): Promise<Agency> => {
    const response = await apiClient.post<ApiResponse<AgencyResponse>>(
      "agencies",
      agencyData,
    );
    return response.data.data as unknown as Agency;
  },

  getVisibleStaff: async (): Promise<User[]> => {
    const user = authUtils.getUser();
    if (!user || !user.id) throw new Error("User not authenticated");

    const response = await apiClient.get<ApiResponse<UserResponse[]>>(
      `agencies/staff-view/${user.id}`,
    );
    return response.data.data as unknown as User[];
  },

  getEmployeesByAgency: async (agencyId: number): Promise<User[]> => {
    const response = await apiClient.get<ApiResponse<UserResponse[]>>(
      `agencies/${agencyId}/employees`,
    );
    return response.data.data as unknown as User[];
  },
};

