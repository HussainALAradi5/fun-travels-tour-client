import { ENDPOINTS } from "@/config/endpoints";
import apiClient from "@/config/BaseApi";
import type { ApiResponse } from "@/interfaces/common/ApiResponse";
import type { TransportationResponseDto } from "@/dtos/tour-management/TransportationResponseDto";
import type { TransportationFilterParams } from "@/interfaces/tour/TransportationFilterParams";
import type { PageResponseDto } from "@/dtos/common/PageResponseDto";
import type { PaginationParams } from "@/interfaces/common/PaginationParams";
import { extractData } from "@/utilities/apiHelper";
import type { ImportResultDto } from "@/dtos/common/ImportResultDto";
import type { TransportationCreateRequestDto } from "@/dtos/tour-management/TransportationCreateRequestDto";
import type { TransportationUpdateRequestDto } from "@/dtos/tour-management/TransportationUpdateRequestDto";

export const transportationService = {
  getAll: async (params: PaginationParams = {}): Promise<PageResponseDto<TransportationResponseDto>> => {
    const response =
      await apiClient.get<ApiResponse<PageResponseDto<TransportationResponseDto>>>(
        ENDPOINTS.transportations.root, { params },
      );
    return extractData(response.data);
  },

  getById: async (id: number): Promise<TransportationResponseDto> => {
    const response = await apiClient.get<ApiResponse<TransportationResponseDto>>(
      ENDPOINTS.transportations.byId(id),
    );
    return response.data.data as unknown as TransportationResponseDto;
  },

  create: async (
    data: TransportationCreateRequestDto,
  ): Promise<TransportationResponseDto> => {
    const response = await apiClient.post<ApiResponse<TransportationResponseDto>>(
      ENDPOINTS.transportations.root,
      data,
    );
    return response.data.data as unknown as TransportationResponseDto;
  },

  importExcel: async (file: File): Promise<ImportResultDto> => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await apiClient.post<ApiResponse<ImportResultDto>>(
      ENDPOINTS.transportations.imports,
      formData,
    );
    return extractData(response.data);
  },

  update: async (
    id: number,
    data: TransportationUpdateRequestDto,
  ): Promise<TransportationResponseDto> => {
    const response = await apiClient.put<ApiResponse<TransportationResponseDto>>(
      ENDPOINTS.transportations.byId(id),
      data,
    );
    return response.data.data as unknown as TransportationResponseDto;
  },

  updateStatus: async (id: number, status: string): Promise<TransportationResponseDto> => {
    const response = await apiClient.patch<ApiResponse<TransportationResponseDto>>(
      ENDPOINTS.transportations.status(id),
      null,
      {
        params: { status },
      },
    );
    return response.data.data as unknown as TransportationResponseDto;
  },

  search: async (params: TransportationFilterParams = {}): Promise<PageResponseDto<TransportationResponseDto>> => {
    const response = await apiClient.get<ApiResponse<PageResponseDto<TransportationResponseDto>>>(
      ENDPOINTS.transportations.search,
      { params },
    );
    return extractData(response.data);
  },
};
