import apiClient from "@/config/BaseApi";
import type { Transaction } from "@/interface/TransactionInterface";

export const transactionService = {
  // Uses the filter endpoint with no params to get all authorized records
  getAll: async () => {
    const response = await apiClient.get<Transaction[]>("/transactions/filter");
    return response.data;
  },

  // Efficiently reuses the filter logic to find a specific ID
  getById: async (id: number) => {
    const response = await apiClient.get<Transaction[]>("/transactions/filter");
    return response.data.find(t => t.id === id) || null;
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
  }) => {
    const response = await apiClient.get<Transaction[]>("/transactions/filter", { params });
    return response.data;
  },

  manualCredit: async (userId: number, amount: number, description: string) => {
    const response = await apiClient.post<Transaction>(
      `/transactions/manual-credit/${userId}`, 
      null, 
      {
        params: { amount, description },
      }
    );
    return response.data;
  }
};