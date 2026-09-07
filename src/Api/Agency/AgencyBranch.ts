import apiClient from "@/config/BaseApi";
import type { AgencyBranch } from "@/interface/Agency/AgencyBranchInterface";
import type { User } from "@/interface/UserInterface";
import type { ApiResponse } from "@/utilities/ApiUtility";

export const branchService = {
  createBranch: async (agencyId: number, branch: AgencyBranch) => {
    const response = await apiClient.post<ApiResponse<AgencyBranch>>(
      `/branches/agency/${agencyId}`,
      branch,
    );
    return response.data;
  },

  getBranchesByAgency: async (agencyId: number) => {
    const response = await apiClient.get<ApiResponse<AgencyBranch[]>>(
      `/branches/agency/${agencyId}`,
    );
    return response.data;
  },

  getEmployeesByBranch: async (agencyId: number, branchId: number) => {
    const response = await apiClient.get<ApiResponse<User[]>>(
      `/branches/agency/${agencyId}/branch/${branchId}/employees`,
    );
    return response.data;
  },

  getAllBranches: async () => {
    const response =
      await apiClient.get<ApiResponse<AgencyBranch[]>>("/api/branches");
    return response.data;
  },
};
