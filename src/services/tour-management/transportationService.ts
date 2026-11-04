import { ENDPOINTS } from "@/config/endpoints";
import apiClient from "@/config/BaseApi";
import type { ApiResponse } from "@/interfaces/common/ApiResponse";
import type { Transportation } from "@/interfaces/tour/Transportation";
import type { TransportationFilterParams } from "@/interfaces/tour/TransportationFilterParams";
import type { PageResponse } from "@/interfaces/common/PageResponse";
import type { PaginationParams } from "@/interfaces/common/PaginationParams";
import { extractData } from "@/utilities/apiHelper";
import type { ImportResult } from "@/interfaces/common/ImportResult";
import type { TransportationCreateRequest } from "@/interfaces/tour/TransportationCreateRequest";

export const transportationService = {
  getAll: async (params: PaginationParams = {}): Promise<PageResponse<Transportation>> => {
    const response =
      await apiClient.get<ApiResponse<PageResponse<Transportation>>>(
        ENDPOINTS.transportations.root, { params },
      );
    return extractData(response.data);
  },

  getById: async (id: number): Promise<Transportation> => {
    const response = await apiClient.get<ApiResponse<Transportation>>(
      ENDPOINTS.transportations.byId(id),
    );
    return response.data.data as unknown as Transportation;
  },

  create: async (
    data: TransportationCreateRequest,
  ): Promise<Transportation> => {
    const response = await apiClient.post<ApiResponse<Transportation>>(
      ENDPOINTS.transportations.root,
      data,
    );
    return response.data.data as unknown as Transportation;
  },

  importExcel: async (file: File): Promise<ImportResult> => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await apiClient.post<ApiResponse<ImportResult>>(
      ENDPOINTS.transportations.imports,
      formData,
    );
    return extractData(response.data);
  },

  update: async (
    id: number,
    data: Partial<Transportation>,
  ): Promise<Transportation> => {
    const response = await apiClient.put<ApiResponse<Transportation>>(
      ENDPOINTS.transportations.byId(id),
      data,
    );
    return response.data.data as unknown as Transportation;
  },

  updateStatus: async (id: number, status: string): Promise<Transportation> => {
    const response = await apiClient.patch<ApiResponse<Transportation>>(
      ENDPOINTS.transportations.status(id),
      null,
      {
        params: { status },
      },
    );
    return response.data.data as unknown as Transportation;
  },

  search: async (params: TransportationFilterParams = {}): Promise<PageResponse<Transportation>> => {
    const response = await apiClient.get<ApiResponse<PageResponse<Transportation>>>(
      ENDPOINTS.transportations.search,
      { params },
    );
    return extractData(response.data);
  },
};
