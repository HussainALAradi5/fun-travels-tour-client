import apiClient from "@/config/BaseApi";
import type { ApiResponse } from "@/interface/common/ApiResponse";
import type { Account } from "@/interface/payment/Account";
import type { Transaction } from "@/interface/payment/Transaction";

export const accountService = {
  getBalance: async (userId: number): Promise<Account> => {
    const response = await apiClient.get<ApiResponse<Account>>(
      `/accounts/user/${userId}/balance`,
    );
    return response.data.data;
  },

  getHistory: async (userId: number): Promise<Transaction[]> => {
    const response = await apiClient.get<ApiResponse<Transaction[]>>(
      `/accounts/user/${userId}/history`,
    );
    return response.data.data as unknown as Transaction[];
  },
};
