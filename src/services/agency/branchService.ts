import { ENDPOINTS } from "@/config/endpoints";
import apiClient from "@/config/BaseApi";
import type { ApiResponse } from "@/interfaces/common/ApiResponse";
import type { AgencyBranch } from "@/interfaces/agency/AgencyBranch";
import type { AgencyBranchCreateRequest } from "@/interfaces/agency/AgencyBranchCreateRequest";
import type { User } from "@/interfaces/user/User";
import type { PageResponse } from "@/interfaces/common/PageResponse";

export const branchService = {
  searchBranches: async (agencyId: number, query: string, page = 0, size = 20): Promise<PageResponse<AgencyBranch>> => {
    const response = await apiClient.get<ApiResponse<PageResponse<AgencyBranch>>>(
      ENDPOINTS.branches.searchByAgency(agencyId),
      { params: { query, page, size } },
    );
    return response.data.data;
  },

  createBranch: async (agencyId: number, branch: AgencyBranchCreateRequest): Promise<AgencyBranch> => {
    const response = await apiClient.post<ApiResponse<AgencyBranch>>(
      ENDPOINTS.branches.byAgency(agencyId),
      branch,
    );
    return response.data.data as unknown as AgencyBranch;
  },

  getBranchesByAgency: async (agencyId: number): Promise<AgencyBranch[]> => {
    const response = await apiClient.get<ApiResponse<AgencyBranch[]>>(
      ENDPOINTS.branches.byAgency(agencyId),
    );
    return response.data.data as unknown as AgencyBranch[];
  },

  getEmployeesByBranch: async (agencyId: number, branchId: number): Promise<User[]> => {
    const response = await apiClient.get<ApiResponse<User[]>>(
      ENDPOINTS.branches.employees(agencyId, branchId),
    );
    return response.data.data as unknown as User[];
  },

  getAllBranches: async (): Promise<AgencyBranch[]> => {
    const response = await apiClient.get<ApiResponse<AgencyBranch[]>>(ENDPOINTS.branches.root);
    return response.data.data as unknown as AgencyBranch[];
  },
};

