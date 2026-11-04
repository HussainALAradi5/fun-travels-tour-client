import { ENDPOINTS } from "@/config/endpoints";
import apiClient from "@/config/BaseApi";
import type { ApiResponse } from "@/interfaces/common/ApiResponse";
import type { AgencyResponseDto } from "@/dtos/agency/AgencyResponseDto";
import type { AgencyCreateRequestDto } from "@/dtos/agency/AgencyCreateRequestDto";
import type { UserResponseDto } from "@/dtos/user/UserResponseDto";
import type { PageResponseDto } from "@/dtos/common/PageResponseDto";

export const agencyService = {
  searchAgencies: async (query: string, page = 0, size = 20): Promise<PageResponseDto<AgencyResponseDto>> => {
    const response = await apiClient.get<ApiResponse<PageResponseDto<AgencyResponseDto>>>(ENDPOINTS.agencies.search, {
      params: { query, page, size },
    });
    return response.data.data;
  },

  getAllAgencies: async (): Promise<AgencyResponseDto[]> => {
    const response = await apiClient.get<ApiResponse<AgencyResponseDto[]>>(ENDPOINTS.agencies.root);
    return response.data.data as unknown as AgencyResponseDto[];
  },

  getAgencyById: async (id: string | number): Promise<AgencyResponseDto> => {
    const response = await apiClient.get<ApiResponse<AgencyResponseDto>>(
      ENDPOINTS.agencies.byId(id),
    );
    return response.data.data as unknown as AgencyResponseDto;
  },

  createAgency: async (agencyData: AgencyCreateRequestDto): Promise<AgencyResponseDto> => {
    const response = await apiClient.post<ApiResponse<AgencyResponseDto>>(
      ENDPOINTS.agencies.root,
      agencyData,
    );
    return response.data.data as unknown as AgencyResponseDto;
  },


  getEmployeesByAgency: async (agencyId: number): Promise<UserResponseDto[]> => {
    const response = await apiClient.get<ApiResponse<UserResponseDto[]>>(
      ENDPOINTS.agencies.employees(agencyId),
    );
    return response.data.data as unknown as UserResponseDto[];
  },
};

