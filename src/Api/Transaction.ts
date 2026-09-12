import apiClient from "@/config/BaseApi";
import type { ApiResponse } from "@/interface/common/ApiResponse";
import type { Transaction } from "@/interface/payment/Transaction";
import type { TransactionFilterParams } from "@/interface/payment/TransactionFilterParams";
import type { PageResponse } from "@/interface/common/PageResponse";
import { extractData } from "@/utilities/apiHelper";

export const transactionService = {
  getAll: async (params: TransactionFilterParams = {}): Promise<PageResponse<Transaction>> => {
    const response = await apiClient.get<ApiResponse<PageResponse<Transaction>>>("/transactions", { params });
    return extractData(response.data);
  },

  getById: async (id: number): Promise<Transaction> => {
    const response = await apiClient.get<ApiResponse<Transaction>>(`/transactions/${id}`);
    return extractData(response.data);
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
