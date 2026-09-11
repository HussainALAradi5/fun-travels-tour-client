import apiClient from "@/config/BaseApi";
import type { ApiResponse } from "@/interface/common/ApiResponse";
import type { Payment } from "@/interface/payment/Payment";
import type { TourReservation } from "@/interface/tour/TourReservation";
import type { PaymentMethod } from "@/enums/payment/PaymentMethod";
import type { PaymentFilterParams } from "@/interface/payment/PaymentFilterParams";

export const paymentService = {
  execute: async (reservationId: number, method: PaymentMethod): Promise<TourReservation> => {
    const response = await apiClient.post<ApiResponse<TourReservation>>(
      `/payments/execute/${reservationId}`,
      null,
      { params: { method } },
    );
    return response.data.data;
  },

  filter: async (params: PaymentFilterParams = {}): Promise<Payment[]> => {
    const response = await apiClient.get<ApiResponse<Payment[]>>("/payments/filter", {
      params,
    });
    return response.data.data;
  },

  getById: async (id: number): Promise<Payment> => {
    const response = await apiClient.get<ApiResponse<Payment>>(`/payments/${id}`);
    return response.data.data;
  },
};
