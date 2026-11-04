import { ENDPOINTS } from "@/config/endpoints";
import apiClient from "@/config/BaseApi";
import type { ApiResponse } from "@/interfaces/common/ApiResponse";
import type { Transaction } from "@/interfaces/payment/Transaction";
import type { TransactionFilterParams } from "@/interfaces/payment/TransactionFilterParams";
import type { PageResponse } from "@/interfaces/common/PageResponse";
import { extractData } from "@/utilities/apiHelper";

export const transactionService = {
  getAll: async (params: TransactionFilterParams = {}): Promise<PageResponse<Transaction>> => {
    const response = await apiClient.get<ApiResponse<PageResponse<Transaction>>>(ENDPOINTS.transactions.root, { params });
    return extractData(response.data);
  },

  getById: async (id: number): Promise<Transaction> => {
    const response = await apiClient.get<ApiResponse<Transaction>>(ENDPOINTS.transactions.byId(id));
    return extractData(response.data);
  },

  manualCredit: async (userId: number, amount: number, description: string): Promise<Transaction> => {
    const response = await apiClient.post<ApiResponse<Transaction>>(
      ENDPOINTS.transactions.manualCredit(userId),
      null,
      {
        params: { amount, description },
      }
    );
    return response.data.data as unknown as Transaction;
  },
};
