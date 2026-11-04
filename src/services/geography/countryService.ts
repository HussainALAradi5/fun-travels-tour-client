import { ENDPOINTS } from "@/config/endpoints";
import apiClient from "@/config/BaseApi";
import type { ApiResponse } from "@/interfaces/common/ApiResponse";
import type { Country } from "@/interfaces/geography/Country";
import { authUtils } from "@/utilities/AuthUtils";

const extractCountries = (payload: unknown): Country[] => {
  if (Array.isArray(payload)) {
    return payload as Country[];
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
  getAllCountries: async (): Promise<Country[]> => {
    const response = await apiClient.get<ApiResponse<Country[]>>(ENDPOINTS.countries.root);
    return extractCountries(response.data);
  },

  syncFromExternal: async (name: string): Promise<Country> => {
    const userType = authUtils.getUserType();
    const response = await apiClient.post<ApiResponse<Country>>(`${ENDPOINTS.countries.sync(name)}?userType=${userType}`);
    return response.data.data as unknown as Country;
  },

  createCountry: async (country: Country): Promise<Country> => {
    const userType = authUtils.getUserType();
    const response = await apiClient.post<ApiResponse<Country>>(`${ENDPOINTS.countries.root}?userType=${userType}`, country);
    return response.data.data as unknown as Country;
  },

  syncAllFromExternal: async (): Promise<Country[]> => {
    const userType = authUtils.getUserType();
    const response = await apiClient.post<ApiResponse<Country[]>>(`${ENDPOINTS.countries.syncAll}?userType=${userType}`);
    return extractCountries(response.data);
  },

  deleteCountry: async (id: number): Promise<null> => {
    const userType = authUtils.getUserType();
    const response = await apiClient.delete<ApiResponse<null>>(`${ENDPOINTS.countries.byId(id)}?userType=${userType}`);
    return response.data.data;
  },
};
