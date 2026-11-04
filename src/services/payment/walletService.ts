import { ENDPOINTS } from "@/config/endpoints";
import apiClient from "@/config/BaseApi";
import type { ApiResponse } from "@/interfaces/common/ApiResponse";
import type { TransactionResponseDto } from "@/dtos/payment/TransactionResponseDto";
import type { PaymentMethod } from "@/enums/payment/PaymentMethod";

export const walletService = {
  getConfig: async (): Promise<{ publishableKey: string }> => {
    const response = await apiClient.get<ApiResponse<{ publishableKey: string }>>(ENDPOINTS.wallet.config);
    return response.data.data;
  },

  topUp: async (amount: number, method: PaymentMethod, gatewayToken: string): Promise<TransactionResponseDto> => {
    const response = await apiClient.post<ApiResponse<TransactionResponseDto>>(
      ENDPOINTS.wallet.topUp,
      null,
      {
        params: { amount, method, gatewayToken },
      }
    );
    return response.data.data as unknown as TransactionResponseDto;
  },
};
