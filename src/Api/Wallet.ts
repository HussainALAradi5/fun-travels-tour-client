import apiClient from "@/config/BaseApi";
import type { Transaction } from "@/interface/TransactionInterface";
import type { PaymentMethod } from "@/enums/payment/PaymentMethod";

export const walletService = {
  
  getConfig: async () => {
    console.group("📡 API: Fetching Stripe Config");
    console.log("Endpoint: GET /wallet/config");
    try {
      const response = await apiClient.get<{ publishableKey: string }>("/wallet/config");
      console.log("✅ Success. Received Key:", response.data.publishableKey ? "****" + response.data.publishableKey.slice(-4) : "NONE");
      console.groupEnd();
      return response.data;
    } catch (error) {
      console.error("❌ Failed to fetch config", error);
      console.groupEnd();
      throw error;
    }
  },

  topUp: async (amount: number, method: PaymentMethod, gatewayToken: string) => {
    console.group("💸 API: Executing Top-Up");
    console.log("Endpoint: POST /wallet/top-up");
    console.log("Params:", { amount, method, gatewayToken });
    try {
      const response = await apiClient.post<Transaction>(
        "/wallet/top-up",
        null, // Body is null
        {
          params: { amount, method, gatewayToken },
        }
      );
      console.log("✅ Top-Up Successful. Response Data:", response.data);
      console.groupEnd();
      return response.data;
    } catch (error) {
      console.error("❌ Top-Up API Call Failed", error);
      console.groupEnd();
      throw error;
    }
  }
};