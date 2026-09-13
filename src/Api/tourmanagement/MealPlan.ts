import apiClient from "@/config/BaseApi";
import type { ApiResponse } from "@/interface/common/ApiResponse";
import type { MealPlan } from "@/interface/tour/MealPlan";
import type { PageResponse } from "@/interface/common/PageResponse";
import type { PaginationParams } from "@/interface/common/PaginationParams";
import { extractData } from "@/utilities/apiHelper";

export const mealPlanService = {
  getAll: async (params: PaginationParams = {}): Promise<PageResponse<MealPlan>> => {
    const response =
      await apiClient.get<ApiResponse<PageResponse<MealPlan>>>("/meals", { params });
    return extractData(response.data);
  },

  getAgencyCatalog: async (agencyId: number, params: PaginationParams = {}): Promise<PageResponse<MealPlan>> => {
    const response = await apiClient.get<ApiResponse<PageResponse<MealPlan>>>(
      `/meals/agency/${agencyId}`, { params },
    );
    return extractData(response.data);
  },

  create: async (mealPlan: Partial<MealPlan>): Promise<MealPlan> => {
    const response = await apiClient.post<ApiResponse<MealPlan>>(
      "/meals",
      mealPlan,
    );
    return response.data.data as unknown as MealPlan;
  },

  updateStatus: async (id: number, status: string): Promise<null> => {
    const response = await apiClient.patch<ApiResponse<null>>(
      `/meals/${id}/status`,
      null,
      {
        params: { status },
      },
    );
    return response.data.data;
  },

  updatePrice: async (id: number, price: number): Promise<MealPlan> => {
    const response = await apiClient.put<ApiResponse<MealPlan>>(
      `/meals/${id}/price`,
      null,
      {
        params: { price },
      },
    );
    return response.data.data as unknown as MealPlan;
  },
};
