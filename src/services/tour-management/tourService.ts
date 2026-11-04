import { ENDPOINTS } from "@/config/endpoints";
import apiClient from "@/config/BaseApi";
import type { ApiResponse } from "@/interfaces/common/ApiResponse";
import type { TourResponseDto } from "@/dtos/tour-management/TourResponseDto";
import type { TourCreateRequestDto } from "@/dtos/tour-management/TourCreateRequestDto";
import type { GenericStatus } from "@/enums/GenericStatus";
import type { TourFilterParams } from "@/interfaces/tour/TourFilterParams";
import type { TourCatalogParams } from "@/interfaces/tour/TourCatalogParams";
import type { PageResponseDto } from "@/dtos/common/PageResponseDto";
import type { PaginationParams } from "@/interfaces/common/PaginationParams";
import { extractData } from "@/utilities/apiHelper";

export const tourService = {
  getAll: async (params: PaginationParams = {}): Promise<PageResponseDto<TourResponseDto>> => {
    const response = await apiClient.get<ApiResponse<PageResponseDto<TourResponseDto>>>(ENDPOINTS.tours.root, { params });
    return extractData(response.data);
  },

  getById: async (id: number): Promise<TourResponseDto> => {
    const response = await apiClient.get<ApiResponse<TourResponseDto>>(
      ENDPOINTS.tours.byId(id),
    );
    return response.data.data as unknown as TourResponseDto;
  },

  create: async (tour: TourCreateRequestDto): Promise<TourResponseDto> => {
    const response = await apiClient.post<ApiResponse<TourResponseDto>>(
      ENDPOINTS.tours.root,
      tour,
    );
    return response.data.data as unknown as TourResponseDto;
  },

  update: async (
    id: number,
    tour: Partial<TourCreateRequestDto>,
  ): Promise<TourResponseDto> => {
    const response = await apiClient.put<ApiResponse<TourResponseDto>>(
      ENDPOINTS.tours.byId(id),
      tour,
    );
    return response.data.data as unknown as TourResponseDto;
  },

  updateStatus: async (id: number, status: GenericStatus): Promise<TourResponseDto> => {
    const response = await apiClient.put<ApiResponse<TourResponseDto>>(
      ENDPOINTS.tours.status(id),
      null,
      {
        params: { status },
      },
    );
    return response.data.data as unknown as TourResponseDto;
  },

  search: async (params: TourFilterParams = {}): Promise<PageResponseDto<TourResponseDto>> => {
    const response = await apiClient.get<ApiResponse<PageResponseDto<TourResponseDto>>>(
      ENDPOINTS.tours.search,
      { params },
    );
    return extractData(response.data);
  },

  getCatalog: async (params: TourCatalogParams = {}): Promise<PageResponseDto<TourResponseDto>> => {
    const response = await apiClient.get<ApiResponse<PageResponseDto<TourResponseDto>>>(
      ENDPOINTS.tours.catalog,
      { params },
    );
    return extractData(response.data);
  },
};
