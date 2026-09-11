import apiClient from "@/config/BaseApi";
import type { ApiResponse } from "@/interface/common/ApiResponse";
import type { Transaction } from "@/interface/payment/Transaction";
import type { TransactionFilterParams } from "@/interface/payment/TransactionFilterParams";

export const transactionService = {
  getAll: async (): Promise<Transaction[]> => {
    const response = await apiClient.get<ApiResponse<Transaction[]>>("/transactions/filter");
    return response.data.data as unknown as Transaction[];
  },

  getById: async (id: number): Promise<Transaction | null> => {
    const response = await apiClient.get<ApiResponse<Transaction[]>>("/transactions/filter");
    return (response.data.data.find(t => t.id === id) as unknown as Transaction) || null;
  },

  filter: async (params: TransactionFilterParams): Promise<Transaction[]> => {
    const response = await apiClient.get<ApiResponse<Transaction[]>>("/transactions/filter", { params });
    return response.data.data as unknown as Transaction[];
  },

  manualCredit: async (userId: number, amount: number, description: string): Promise<Transaction> => {
    const response = await apiClient.post<ApiResponse<Transaction>>(
      `/transactions/manual-credit/${userId}`,
      null,
      {
        params: { amount, description },
      }
    );
    return response.data.data as unknown as Transaction;
  },
};
