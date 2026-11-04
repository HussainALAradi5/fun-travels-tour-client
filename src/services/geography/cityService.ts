import { ENDPOINTS } from "@/config/endpoints";
import apiClient from "@/config/BaseApi";
import type { ApiResponse } from "@/interfaces/common/ApiResponse";
import type { CityResponseDto } from "@/dtos/geography/CityResponseDto";
import { authUtils } from "@/utilities/AuthUtils";
import type { CityCreateRequestDto } from "@/dtos/geography/CityCreateRequestDto";

export const cityService = {
  getAllCities: async (): Promise<CityResponseDto[]> => {
    const userType = authUtils.getUserType();
    const response = await apiClient.get<ApiResponse<CityResponseDto[]>>(
      `${ENDPOINTS.cities.root}?userType=${userType}`,
    );
    return response.data.data;
  },

  getCitiesByCountry: async (countryId: number): Promise<CityResponseDto[]> => {
    const response = await apiClient.get<ApiResponse<CityResponseDto[]>>(
      ENDPOINTS.cities.byCountry(countryId),
    );
    return response.data.data;
  },

  createCity: async (cityData: CityCreateRequestDto): Promise<CityResponseDto> => {
    const userType = authUtils.getUserType();
    const response = await apiClient.post<ApiResponse<CityResponseDto>>(
      `${ENDPOINTS.cities.root}?userType=${userType}`,
      cityData,
    );
    return response.data.data;
  },

  deleteCity: async (id: number): Promise<null> => {
    const userType = authUtils.getUserType();
    const response = await apiClient.delete<ApiResponse<null>>(
      `${ENDPOINTS.cities.byId(id)}?userType=${userType}`,
    );
    return response.data.data;
  },
};
