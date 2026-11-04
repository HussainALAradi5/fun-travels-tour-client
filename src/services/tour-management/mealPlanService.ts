import { ENDPOINTS } from "@/config/endpoints";
import apiClient from "@/config/BaseApi";
import type { ApiResponse } from "@/interfaces/common/ApiResponse";
import type { MealPlan } from "@/interfaces/tour/MealPlan";
import type { PageResponse } from "@/interfaces/common/PageResponse";
import type { PaginationParams } from "@/interfaces/common/PaginationParams";
import { extractData } from "@/utilities/apiHelper";
import type { MealPlanCreateRequest } from "@/interfaces/tour/MealPlanCreateRequest";
import { MealDietaryType } from "@/enums/tour-management/MealDietaryType";
import { SpiceLevel } from "@/enums/tour-management/SpiceLevel";

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
      await apiClient.get<ApiResponse<PageResponse<MealPlanWire>>>(ENDPOINTS.meals.root, { params });
    const page = extractData(response.data);
    return { ...page, content: page.content.map(normalizeMeal) };
  },

  getAgencyCatalog: async (agencyId: number, params: PaginationParams = {}): Promise<PageResponse<MealPlan>> => {
    const response = await apiClient.get<ApiResponse<PageResponse<MealPlanWire>>>(
      ENDPOINTS.meals.byAgency(agencyId), { params },
    );
    const page = extractData(response.data);
    return { ...page, content: page.content.map(normalizeMeal) };
  },

  create: async (mealPlan: MealPlanCreateRequest): Promise<MealPlan> => {
    const types = new Set(mealPlan.dietaryTypes);
    const response = await apiClient.post<ApiResponse<MealPlanWire>>(
      ENDPOINTS.meals.root,
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
      ENDPOINTS.meals.status(id),
      null,
      {
        params: { status },
      },
    );
    return response.data.data;
  },

  updatePrice: async (id: number, price: number): Promise<MealPlan> => {
    const response = await apiClient.put<ApiResponse<MealPlan>>(
      ENDPOINTS.meals.price(id),
      null,
      {
        params: { price },
      },
    );
    return response.data.data as unknown as MealPlan;
  },
};
