import apiClient from "@/config/BaseApi";
import type { ApiResponse } from "@/interface/common/ApiResponse";
import type { MealPlanResponse } from "@/interface/tour/MealPlanResponse";
import type { MealPlan } from "@/interface/tour/MealPlan";

export const mealPlanService = {
  getAll: async (): Promise<MealPlan[]> => {
    const response =
      await apiClient.get<ApiResponse<MealPlanResponse[]>>("/meals");
    return response.data.data as unknown as MealPlan[];
  },

  getAgencyCatalog: async (agencyId: number): Promise<MealPlan[]> => {
    const response = await apiClient.get<ApiResponse<MealPlanResponse[]>>(
      `/meals/agency/${agencyId}`,
    );
    return response.data.data as unknown as MealPlan[];
  },

  create: async (mealPlan: Partial<MealPlanResponse>): Promise<MealPlan> => {
    const response = await apiClient.post<ApiResponse<MealPlanResponse>>(
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
    const response = await apiClient.put<ApiResponse<MealPlanResponse>>(
      `/meals/${id}/price`,
      null,
      {
        params: { price },
      },
    );
    return response.data.data as unknown as MealPlan;
  },
};
