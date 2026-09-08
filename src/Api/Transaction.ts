import apiClient from "@/config/BaseApi";
import type { ApiResponse } from "@/interface/common/ApiResponse";
import type { TransactionResponse } from "@/interface/payment/TransactionResponse";
import type { Transaction } from "@/interface/payment/Transaction";

export const transactionService = {
  getAll: async (): Promise<Transaction[]> => {
    const response = await apiClient.get<ApiResponse<TransactionResponse[]>>("/transactions/filter");
    return response.data.data as unknown as Transaction[];
  },

  getById: async (id: number): Promise<Transaction | null> => {
    const response = await apiClient.get<ApiResponse<TransactionResponse[]>>("/transactions/filter");
    return (response.data.data.find(t => t.id === id) as unknown as Transaction) || null;
  },

  filter: async (params: {
    userId?: number;
    type?: string;
    startDate?: string;
    endDate?: string;
    agencyId?: number;
    branchId?: number;
    sortBy?: string;
    sortDir?: string;
  }): Promise<Transaction[]> => {
    const response = await apiClient.get<ApiResponse<TransactionResponse[]>>("/transactions/filter", { params });
    return response.data.data as unknown as Transaction[];
  },

  manualCredit: async (userId: number, amount: number, description: string): Promise<Transaction> => {
    const response = await apiClient.post<ApiResponse<TransactionResponse>>(
      `/transactions/manual-credit/${userId}`,
      null,
      {
        params: { amount, description },
      }
    );
    return response.data.data as unknown as Transaction;
  },
};
