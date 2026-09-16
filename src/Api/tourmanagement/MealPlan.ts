import apiClient from "@/config/BaseApi";
import type { ApiResponse } from "@/interface/common/ApiResponse";
import type { MealPlan } from "@/interface/tour/MealPlan";
import type { PageResponse } from "@/interface/common/PageResponse";
import type { PaginationParams } from "@/interface/common/PaginationParams";
import { extractData } from "@/utilities/apiHelper";
import type { MealPlanCreateRequest } from "@/interface/tour/MealPlanCreateRequest";
import { MealDietaryType } from "@/enums/tourmanagement/MealDietaryType";
import { SpiceLevel } from "@/enums/tourmanagement/SpiceLevel";

type MealPlanWire = Omit<MealPlan, "dietaryTypes"> & {
  dietaryTypes?: MealPlan["dietaryTypes"];
  vegetarian?: boolean;
  vegan?: boolean;
  glutenFree?: boolean;
  spiceLevel?: MealPlan["spiceLevel"];
};

const normalizeMeal = (meal: MealPlanWire): MealPlan => {
  if (meal.dietaryTypes?.length) {
    return { ...meal, dietaryTypes: meal.dietaryTypes, spiceLevel: meal.spiceLevel ?? SpiceLevel.NONE };
  }
  const dietaryTypes: MealPlan["dietaryTypes"] = [];
  if (meal.vegetarian) dietaryTypes.push(MealDietaryType.VEGETARIAN);
  if (meal.vegan) dietaryTypes.push(MealDietaryType.VEGAN);
  if (meal.glutenFree) dietaryTypes.push(MealDietaryType.GLUTEN_FREE);
  if (dietaryTypes.length === 0) dietaryTypes.push(MealDietaryType.STANDARD);
  return { ...meal, dietaryTypes, spiceLevel: meal.spiceLevel ?? SpiceLevel.NONE };
};

export const mealPlanService = {
  getAll: async (params: PaginationParams = {}): Promise<PageResponse<MealPlan>> => {
    const response =
      await apiClient.get<ApiResponse<PageResponse<MealPlanWire>>>("/meals", { params });
    const page = extractData(response.data);
    return { ...page, content: page.content.map(normalizeMeal) };
  },

  getAgencyCatalog: async (agencyId: number, params: PaginationParams = {}): Promise<PageResponse<MealPlan>> => {
    const response = await apiClient.get<ApiResponse<PageResponse<MealPlanWire>>>(
      `/meals/agency/${agencyId}`, { params },
    );
    const page = extractData(response.data);
    return { ...page, content: page.content.map(normalizeMeal) };
  },

  create: async (mealPlan: MealPlanCreateRequest): Promise<MealPlan> => {
    const types = new Set(mealPlan.dietaryTypes);
    const response = await apiClient.post<ApiResponse<MealPlanWire>>(
      "/meals",
      {
        ...mealPlan,
        vegetarian: types.has(MealDietaryType.VEGETARIAN) || types.has(MealDietaryType.VEGAN),
        vegan: types.has(MealDietaryType.VEGAN),
        glutenFree: types.has(MealDietaryType.GLUTEN_FREE),
      },
    );
    return normalizeMeal(extractData(response.data));
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
