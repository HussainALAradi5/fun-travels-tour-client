import apiClient from "@/config/BaseApi";
import type { ApiResponse } from "@/interface/common/ApiResponse";
import type { CountryResponse } from "@/interface/geography/CountryResponse";
import type { Country } from "@/interface/geography/Country";
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
    const response = await apiClient.get<ApiResponse<CountryResponse[]>>("countries");
    return extractCountries(response.data);
  },

  syncFromExternal: async (name: string): Promise<Country> => {
    const userType = authUtils.getUserType();
    const response = await apiClient.post<ApiResponse<CountryResponse>>(`countries/sync/${name}?userType=${userType}`);
    return response.data.data as unknown as Country;
  },

  createCountry: async (country: CountryResponse): Promise<Country> => {
    const userType = authUtils.getUserType();
    const response = await apiClient.post<ApiResponse<CountryResponse>>(`countries?userType=${userType}`, country);
    return response.data.data as unknown as Country;
  },

  syncAllFromExternal: async (): Promise<Country[]> => {
    const userType = authUtils.getUserType();
    const response = await apiClient.post<ApiResponse<CountryResponse[]>>(`countries/sync-all?userType=${userType}`);
    return extractCountries(response.data);
  },

  deleteCountry: async (id: number): Promise<null> => {
    const userType = authUtils.getUserType();
    const response = await apiClient.delete<ApiResponse<null>>(`countries/${id}?userType=${userType}`);
    return response.data.data;
  },
};
