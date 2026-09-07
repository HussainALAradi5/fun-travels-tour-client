import apiClient from "@/config/BaseApi";
import type { City } from "@/interface/CityInterface";
import type { ApiResponse } from "@/utilities/ApiUtility";
import { authUtils } from "@/utilities/AuthUtils";

// Define the shape of the data needed to create a city

export const cityService = {
  getAllCities: async () => {
    const userType = authUtils.getUserType();
    const response = await apiClient.get<ApiResponse<City[]>>(
      `/cities?userType=${userType}`,
    );
    return response.data;
  },

  getCitiesByCountry: async (countryId: number) => {
    const response = await apiClient.get<ApiResponse<City[]>>(
      `/cities/country/${countryId}`,
    );
    return response.data;
  },

  createCity: async (cityData: { name: string; country: { id: number } }) => {
    const userType = authUtils.getUserType();
    // Directly return the call; Axios will throw an error if the status is 400
    const response = await apiClient.post<ApiResponse<City>>(
      `/cities?userType=${userType}`,
      cityData,
    );
    return response.data;
  },

  deleteCity: async (id: number) => {
    const userType = authUtils.getUserType();
    const response = await apiClient.delete<ApiResponse<null>>(
      `/cities/${id}?userType=${userType}`,
    );
    return response.data;
  },
};
