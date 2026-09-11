import apiClient from "@/config/BaseApi";
import type { ApiResponse } from "@/interface/common/ApiResponse";
import type { Transaction } from "@/interface/payment/Transaction";
import type { PaymentMethod } from "@/enums/payment/PaymentMethod";

export const walletService = {
  getConfig: async (): Promise<{ publishableKey: string }> => {
    const response = await apiClient.get<ApiResponse<{ publishableKey: string }>>("/wallet/config");
    return response.data.data;
  },

  topUp: async (amount: number, method: PaymentMethod, gatewayToken: string): Promise<Transaction> => {
    const response = await apiClient.post<ApiResponse<Transaction>>(
      "/wallet/top-up",
      null,
      {
        params: { amount, method, gatewayToken },
      }
    );
    return response.data.data as unknown as Transaction;
  },
};
