import { ENDPOINTS } from "@/config/endpoints";
import apiClient from "@/config/BaseApi";
import type { ApiResponse } from "@/interfaces/common/ApiResponse";
import type { CountryResponseDto } from "@/dtos/geography/CountryResponseDto";
import { authUtils } from "@/utilities/AuthUtils";

const extractCountries = (payload: unknown): CountryResponseDto[] => {
  if (Array.isArray(payload)) {
    return payload as CountryResponseDto[];
  }

  if (payload && typeof payload === "object" && "data" in payload) {
    return extractCountries(payload.data);
  }

  if (payload && typeof payload === "object" && "content" in payload) {
    return extractCountries(payload.content);
  }

  return [];
};

export const countryService = {
  getAllCountries: async (): Promise<CountryResponseDto[]> => {
    const response = await apiClient.get<ApiResponse<CountryResponseDto[]>>(ENDPOINTS.countries.root);
    return extractCountries(response.data);
  },

  syncFromExternal: async (name: string): Promise<CountryResponseDto> => {
    const userType = authUtils.getUserType();
    const response = await apiClient.post<ApiResponse<CountryResponseDto>>(`${ENDPOINTS.countries.sync(name)}?userType=${userType}`);
    return response.data.data as unknown as CountryResponseDto;
  },

  createCountry: async (country: CountryResponseDto): Promise<CountryResponseDto> => {
    const userType = authUtils.getUserType();
    const response = await apiClient.post<ApiResponse<CountryResponseDto>>(`${ENDPOINTS.countries.root}?userType=${userType}`, country);
    return response.data.data as unknown as CountryResponseDto;
  },

  syncAllFromExternal: async (): Promise<CountryResponseDto[]> => {
    const userType = authUtils.getUserType();
    const response = await apiClient.post<ApiResponse<CountryResponseDto[]>>(`${ENDPOINTS.countries.syncAll}?userType=${userType}`);
    return extractCountries(response.data);
  },

  deleteCountry: async (id: number): Promise<null> => {
    const userType = authUtils.getUserType();
    const response = await apiClient.delete<ApiResponse<null>>(`${ENDPOINTS.countries.byId(id)}?userType=${userType}`);
    return response.data.data;
  },
};
