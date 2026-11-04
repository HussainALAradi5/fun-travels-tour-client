import { ENDPOINTS } from "@/config/endpoints";
import apiClient from "@/config/BaseApi";
import type { ApiResponse } from "@/interfaces/common/ApiResponse";
import type { AccountResponseDto } from "@/dtos/payment/AccountResponseDto";
import type { TransactionResponseDto } from "@/dtos/payment/TransactionResponseDto";

export const accountService = {
  getBalance: async (userId: number): Promise<AccountResponseDto> => {
    const response = await apiClient.get<ApiResponse<AccountResponseDto>>(
      ENDPOINTS.accounts.balance(userId),
    );
    return response.data.data;
  },

  getHistory: async (userId: number): Promise<TransactionResponseDto[]> => {
    const response = await apiClient.get<ApiResponse<TransactionResponseDto[]>>(
      ENDPOINTS.accounts.history(userId),
    );
    return response.data.data as unknown as TransactionResponseDto[];
  },
};
