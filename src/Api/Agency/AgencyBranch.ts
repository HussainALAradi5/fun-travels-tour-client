import apiClient from "@/config/BaseApi";
import type { ApiResponse } from "@/interface/common/ApiResponse";
import type { AgencyBranch } from "@/interface/agency/AgencyBranch";
import type { AgencyBranchCreateRequest } from "@/interface/agency/AgencyBranchCreateRequest";
import type { User } from "@/interface/user/User";
import type { PageResponse } from "@/interface/common/PageResponse";

export const branchService = {
  searchBranches: async (agencyId: number, query: string, page = 0, size = 20): Promise<PageResponse<AgencyBranch>> => {
    const response = await apiClient.get<ApiResponse<PageResponse<AgencyBranch>>>(
      `/branches/agency/${agencyId}/search`,
      { params: { query, page, size } },
    );
    return response.data.data;
  },

  createBranch: async (agencyId: number, branch: AgencyBranchCreateRequest): Promise<AgencyBranch> => {
    const response = await apiClient.post<ApiResponse<AgencyBranch>>(
      `/branches/agency/${agencyId}`,
      branch,
    );
    return response.data.data as unknown as AgencyBranch;
  },

  getBranchesByAgency: async (agencyId: number): Promise<AgencyBranch[]> => {
    const response = await apiClient.get<ApiResponse<AgencyBranch[]>>(
      `/branches/agency/${agencyId}`,
    );
    return response.data.data as unknown as AgencyBranch[];
  },

  getEmployeesByBranch: async (agencyId: number, branchId: number): Promise<User[]> => {
    const response = await apiClient.get<ApiResponse<User[]>>(
      `/branches/agency/${agencyId}/branch/${branchId}/employees`,
    );
    return response.data.data as unknown as User[];
  },

  getAllBranches: async (): Promise<AgencyBranch[]> => {
    const response = await apiClient.get<ApiResponse<AgencyBranch[]>>("/api/branches");
    return response.data.data as unknown as AgencyBranch[];
  },
};

