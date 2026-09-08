import apiClient from "@/config/BaseApi";
import type { ApiResponse } from "@/interface/common/ApiResponse";
import type { AgencyBranch } from "@/interface/agency/AgencyBranch";
import type { AgencyBranchResponse } from "@/interface/agency/AgencyBranchResponse";
import type { AgencyBranchCreateRequest } from "@/interface/agency/AgencyBranchCreateRequest";
import type { User } from "@/interface/user/User";
import type { UserResponse } from "@/interface/user/UserResponse";

export const branchService = {
  createBranch: async (agencyId: number, branch: AgencyBranchCreateRequest): Promise<AgencyBranch> => {
    const response = await apiClient.post<ApiResponse<AgencyBranchResponse>>(
      `/branches/agency/${agencyId}`,
      branch,
    );
    return response.data.data as unknown as AgencyBranch;
  },

  getBranchesByAgency: async (agencyId: number): Promise<AgencyBranch[]> => {
    const response = await apiClient.get<ApiResponse<AgencyBranchResponse[]>>(
      `/branches/agency/${agencyId}`,
    );
    return response.data.data as unknown as AgencyBranch[];
  },

  getEmployeesByBranch: async (agencyId: number, branchId: number): Promise<User[]> => {
    const response = await apiClient.get<ApiResponse<UserResponse[]>>(
      `/branches/agency/${agencyId}/branch/${branchId}/employees`,
    );
    return response.data.data as unknown as User[];
  },

  getAllBranches: async (): Promise<AgencyBranch[]> => {
    const response = await apiClient.get<ApiResponse<AgencyBranchResponse[]>>("/api/branches");
    return response.data.data as unknown as AgencyBranch[];
  },
};

