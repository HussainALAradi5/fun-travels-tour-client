import apiClient from "@/config/BaseApi";
import type { ApiResponse } from "@/interface/common/ApiResponse";
import type { PaymentResponse } from "@/interface/payment/PaymentResponse";
import type { Payment } from "@/interface/payment/Payment";
import type { ReservationResponse } from "@/interface/tour/ReservationResponse";
import type { PaymentMethod } from "@/enums/payment/PaymentMethod";
import type { PaymentStatus } from "@/enums/payment/PaymentStatus";

export const paymentService = {
  execute: async (reservationId: number, method: PaymentMethod): Promise<ReservationResponse> => {
    const response = await apiClient.post<ApiResponse<ReservationResponse>>(
      `/payments/execute/${reservationId}`,
      null,
      { params: { method } },
    );
    return response.data.data;
  },

  filter: async (params: {
    userId?: number;
    status?: PaymentStatus;
    method?: PaymentMethod;
    date?: string;
  }): Promise<Payment[]> => {
    const response = await apiClient.get<ApiResponse<PaymentResponse[]>>("/payments/filter", {
      params,
    });
    return response.data.data as unknown as Payment[];
  },

  getById: async (id: number): Promise<Payment> => {
    const response = await apiClient.get<ApiResponse<PaymentResponse>>(`/payments/${id}`);
    return response.data.data as unknown as Payment;
  },
};

