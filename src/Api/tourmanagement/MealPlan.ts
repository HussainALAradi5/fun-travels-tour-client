import apiClient from "@/config/BaseApi";
import type { MealPlan } from "@/interface/tourmanagement/MealPlanInterface";
import type { ApiResponse } from "@/utilities/ApiUtility";

export const mealPlanService = {
  getAll: async () => {
    const response = await apiClient.get<ApiResponse<MealPlan[]>>("/meals");
    return response.data;
  },

  getAgencyCatalog: async (agencyId: number) => {
    const response = await apiClient.get<ApiResponse<MealPlan[]>>(`/meals/agency/${agencyId}`);
    return response.data;
  },

  create: async (mealPlan: MealPlan) => {
    const response = await apiClient.post<ApiResponse<MealPlan>>("/meals", mealPlan);
    return response.data;
  },

  updateStatus: async (id: number, status: string) => {
    const response = await apiClient.patch<ApiResponse<void>>(`/meals/${id}/status`, null, {
      params: { status }
    });
    return response.data;
  },

  updatePrice: async (id: number, price: number) => {
    const response = await apiClient.put<ApiResponse<MealPlan>>(`/meals/${id}/price`, null, {
      params: { price }
    });
    return response.data;
  }
};