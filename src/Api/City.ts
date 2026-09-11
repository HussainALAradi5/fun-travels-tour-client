import apiClient from "@/config/BaseApi";
import type { ApiResponse } from "@/interface/common/ApiResponse";
import type { City } from "@/interface/geography/City";
import { authUtils } from "@/utilities/AuthUtils";
import type { CityCreateRequest } from "@/interface/geography/CityCreateRequest";

export const cityService = {
  getAllCities: async (): Promise<City[]> => {
    const userType = authUtils.getUserType();
    const response = await apiClient.get<ApiResponse<City[]>>(
      `/cities?userType=${userType}`,
    );
    return response.data.data;
  },

  getCitiesByCountry: async (countryId: number): Promise<City[]> => {
    const response = await apiClient.get<ApiResponse<City[]>>(
      `/cities/country/${countryId}`,
    );
    return response.data.data;
  },

  createCity: async (cityData: CityCreateRequest): Promise<City> => {
    const userType = authUtils.getUserType();
    const response = await apiClient.post<ApiResponse<City>>(
      `/cities?userType=${userType}`,
      cityData,
    );
    return response.data.data;
  },

  deleteCity: async (id: number): Promise<null> => {
    const userType = authUtils.getUserType();
    const response = await apiClient.delete<ApiResponse<null>>(
      `/cities/${id}?userType=${userType}`,
    );
    return response.data.data;
  },
};
