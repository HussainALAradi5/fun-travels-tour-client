import apiClient from "@/config/BaseApi";
import type { ApiResponse } from "@/interface/common/ApiResponse";
import type { CityResponse } from "@/interface/geography/CityResponse";
import type { City } from "@/interface/geography/City";
import { authUtils } from "@/utilities/AuthUtils";

export const cityService = {
  getAllCities: async (): Promise<City[]> => {
    const userType = authUtils.getUserType();
    const response = await apiClient.get<ApiResponse<CityResponse[]>>(
      `/cities?userType=${userType}`,
    );
    return response.data.data as unknown as City[];
  },

  getCitiesByCountry: async (countryId: number): Promise<City[]> => {
    const response = await apiClient.get<ApiResponse<CityResponse[]>>(
      `/cities/country/${countryId}`,
    );
    return response.data.data as unknown as City[];
  },

  createCity: async (cityData: { name: string; country: { id: number } }): Promise<City> => {
    const userType = authUtils.getUserType();
    const response = await apiClient.post<ApiResponse<CityResponse>>(
      `/cities?userType=${userType}`,
      cityData,
    );
    return response.data.data as unknown as City;
  },

  deleteCity: async (id: number): Promise<null> => {
    const userType = authUtils.getUserType();
    const response = await apiClient.delete<ApiResponse<null>>(
      `/cities/${id}?userType=${userType}`,
    );
    return response.data.data;
  },
};
