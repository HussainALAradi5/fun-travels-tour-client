import { ENDPOINTS } from "@/config/endpoints";
import apiClient from "@/config/BaseApi";
import type { ApiResponse } from "@/interfaces/common/ApiResponse";
import type { AgencyBranchResponseDto } from "@/dtos/agency/AgencyBranchResponseDto";
import type { AgencyBranchCreateRequestDto } from "@/dtos/agency/AgencyBranchCreateRequestDto";
import type { UserResponseDto } from "@/dtos/user/UserResponseDto";
import type { PageResponseDto } from "@/dtos/common/PageResponseDto";

export const branchService = {
  searchBranches: async (agencyId: number, query: string, page = 0, size = 20): Promise<PageResponseDto<AgencyBranchResponseDto>> => {
    const response = await apiClient.get<ApiResponse<PageResponseDto<AgencyBranchResponseDto>>>(
      ENDPOINTS.branches.searchByAgency(agencyId),
      { params: { query, page, size } },
    );
    return response.data.data;
  },

  createBranch: async (agencyId: number, branch: AgencyBranchCreateRequestDto): Promise<AgencyBranchResponseDto> => {
    const response = await apiClient.post<ApiResponse<AgencyBranchResponseDto>>(
      ENDPOINTS.branches.byAgency(agencyId),
      branch,
    );
    return response.data.data as unknown as AgencyBranchResponseDto;
  },

  getBranchesByAgency: async (agencyId: number): Promise<AgencyBranchResponseDto[]> => {
    const response = await apiClient.get<ApiResponse<AgencyBranchResponseDto[]>>(
      ENDPOINTS.branches.byAgency(agencyId),
    );
    return response.data.data as unknown as AgencyBranchResponseDto[];
  },

  getEmployeesByBranch: async (agencyId: number, branchId: number): Promise<UserResponseDto[]> => {
    const response = await apiClient.get<ApiResponse<UserResponseDto[]>>(
      ENDPOINTS.branches.employees(agencyId, branchId),
    );
    return response.data.data as unknown as UserResponseDto[];
  },

  getAllBranches: async (): Promise<AgencyBranchResponseDto[]> => {
    const response = await apiClient.get<ApiResponse<AgencyBranchResponseDto[]>>(ENDPOINTS.branches.root);
    return response.data.data as unknown as AgencyBranchResponseDto[];
  },
};

