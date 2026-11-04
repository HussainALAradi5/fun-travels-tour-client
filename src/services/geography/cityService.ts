import { ENDPOINTS } from "@/config/endpoints";
import apiClient from "@/config/BaseApi";
import type { ApiResponse } from "@/interfaces/common/ApiResponse";
import type { City } from "@/interfaces/geography/City";
import { authUtils } from "@/utilities/AuthUtils";
import type { CityCreateRequest } from "@/interfaces/geography/CityCreateRequest";

export const cityService = {
  getAllCities: async (): Promise<City[]> => {
    const userType = authUtils.getUserType();
    const response = await apiClient.get<ApiResponse<City[]>>(
      `${ENDPOINTS.cities.root}?userType=${userType}`,
    );
    return response.data.data;
  },

  getCitiesByCountry: async (countryId: number): Promise<City[]> => {
    const response = await apiClient.get<ApiResponse<City[]>>(
      ENDPOINTS.cities.byCountry(countryId),
    );
    return response.data.data;
  },

  createCity: async (cityData: CityCreateRequest): Promise<City> => {
    const userType = authUtils.getUserType();
    const response = await apiClient.post<ApiResponse<City>>(
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
