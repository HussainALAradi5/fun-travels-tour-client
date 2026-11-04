import { ENDPOINTS } from "@/config/endpoints";
import apiClient from "@/config/BaseApi";
import type { ApiResponse } from "@/interfaces/common/ApiResponse";
import type { Account } from "@/interfaces/payment/Account";
import type { Transaction } from "@/interfaces/payment/Transaction";

export const accountService = {
  getBalance: async (userId: number): Promise<Account> => {
    const response = await apiClient.get<ApiResponse<Account>>(
      ENDPOINTS.accounts.balance(userId),
    );
    return response.data.data;
  },

  getHistory: async (userId: number): Promise<Transaction[]> => {
    const response = await apiClient.get<ApiResponse<Transaction[]>>(
      ENDPOINTS.accounts.history(userId),
    );
    return response.data.data as unknown as Transaction[];
  },
};
