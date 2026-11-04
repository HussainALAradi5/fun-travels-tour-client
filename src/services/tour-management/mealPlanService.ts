import { ENDPOINTS } from "@/config/endpoints";
import apiClient from "@/config/BaseApi";
import type { ApiResponse } from "@/interfaces/common/ApiResponse";
import type { PaginationParams } from "@/interfaces/common/PaginationParams";
import type { PageResponseDto } from "@/dtos/common/PageResponseDto";
import type { MealPlanResponseDto } from "@/dtos/tour-management/MealPlanResponseDto";
import type { MealPlanCreateRequestDto } from "@/dtos/tour-management/MealPlanCreateRequestDto";
import type { GenericStatus } from "@/enums/GenericStatus";
import { extractData } from "@/utilities/apiHelper";

export const mealPlanService = {
  /** Admins get every meal; agency staff their agency's and shared meals; visitors shared meals. */
  getAll: async (params: PaginationParams = {}): Promise<PageResponseDto<MealPlanResponseDto>> => {
    const response = await apiClient.get<ApiResponse<PageResponseDto<MealPlanResponseDto>>>(ENDPOINTS.meals.root, { params });
    return extractData(response.data);
  },

  getAgencyCatalog: async (agencyId: number, params: PaginationParams = {}): Promise<PageResponseDto<MealPlanResponseDto>> => {
    const response = await apiClient.get<ApiResponse<PageResponseDto<MealPlanResponseDto>>>(
      ENDPOINTS.meals.byAgency(agencyId), { params },
    );
    return extractData(response.data);
  },

  create: async (request: MealPlanCreateRequestDto): Promise<MealPlanResponseDto> => {
    const response = await apiClient.post<ApiResponse<MealPlanResponseDto>>(ENDPOINTS.meals.root, request);
    return extractData(response.data);
  },

  /** Replaces name, price, description, diets, and spice level. */
  update: async (id: number, request: MealPlanCreateRequestDto): Promise<MealPlanResponseDto> => {
    const response = await apiClient.put<ApiResponse<MealPlanResponseDto>>(ENDPOINTS.meals.byId(id), request);
    return extractData(response.data);
  },

  updateStatus: async (id: number, status: GenericStatus): Promise<void> => {
    await apiClient.patch<ApiResponse<null>>(ENDPOINTS.meals.status(id), null, { params: { status } });
  },
};
