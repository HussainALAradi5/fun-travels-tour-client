import apiClient from "@/config/BaseApi";
import type { Country } from "@/interface/CountryInterface";
import type { ApiResponse } from "@/utilities/ApiUtility";
import { authUtils } from "@/utilities/AuthUtils";

export const countryService = {
  getAllCountries: async () => {
    const response = await apiClient.get<ApiResponse<Country[]>>("countries");
    return response.data; // Ensure your API utility handles extracting the payload properly
  },
  syncFromExternal: async (name: string) => {
    const userType = authUtils.getUserType();
    const response = await apiClient.post<any>(`countries/sync/${name}?userType=${userType}`);
    return response.data;
  },
  createCountry: async (country: Country) => {
    const userType = authUtils.getUserType();
    const response = await apiClient.post<any>(`countries?userType=${userType}`, country);
    return response.data;
  },
  syncAllFromExternal: async () => {
    const userType = authUtils.getUserType();
    const response = await apiClient.post<any>(`countries/sync-all?userType=${userType}`);
    return response.data;
  },
  deleteCountry: async (id: number) => {
    const userType = authUtils.getUserType();
    const response = await apiClient.delete<any>(`countries/${id}?userType=${userType}`);
    return response.data;
  },
};