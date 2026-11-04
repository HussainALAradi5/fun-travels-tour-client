import { ENDPOINTS } from "@/config/endpoints";
import apiClient from "@/config/BaseApi";
import type { ApiResponse } from "@/interfaces/common/ApiResponse";
import type { TransactionResponseDto } from "@/dtos/payment/TransactionResponseDto";
import type { TransactionFilterParams } from "@/interfaces/payment/TransactionFilterParams";
import type { PageResponseDto } from "@/dtos/common/PageResponseDto";
import { extractData } from "@/utilities/apiHelper";

export const transactionService = {
  getAll: async (params: TransactionFilterParams = {}): Promise<PageResponseDto<TransactionResponseDto>> => {
    const response = await apiClient.get<ApiResponse<PageResponseDto<TransactionResponseDto>>>(ENDPOINTS.transactions.root, { params });
    return extractData(response.data);
  },

  getById: async (id: number): Promise<TransactionResponseDto> => {
    const response = await apiClient.get<ApiResponse<TransactionResponseDto>>(ENDPOINTS.transactions.byId(id));
    return extractData(response.data);
  },

  manualCredit: async (userId: number, amount: number, description: string): Promise<TransactionResponseDto> => {
    const response = await apiClient.post<ApiResponse<TransactionResponseDto>>(
      ENDPOINTS.transactions.manualCredit(userId),
      null,
      {
        params: { amount, description },
      }
    );
    return response.data.data as unknown as TransactionResponseDto;
  },
};
