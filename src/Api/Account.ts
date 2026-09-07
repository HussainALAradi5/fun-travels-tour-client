import apiClient from "@/config/BaseApi";
import type { Account } from "@/interface/AccountInterface";
import type { Transaction } from "@/interface/TransactionInterface";

export const accountService = {
  /**
   * Fetch the current wallet balance for a specific user.
   * Path: GET /api/accounts/user/{userId}/balance
   */
  getBalance: async (userId: number) => {
    const response = await apiClient.get<Account>(
      `/accounts/user/${userId}/balance`,
    );
    return response.data;
  },

  getHistory: async (userId: number) => {
    const response = await apiClient.get<Transaction[]>(
      `/accounts/user/${userId}/history`,
    );
    return response.data;
  },
};
