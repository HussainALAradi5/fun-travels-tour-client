import apiClient from "@/config/BaseApi";
import type { ApiResponse } from "@/interface/common/ApiResponse";
import type { Payment } from "@/interface/payment/Payment";
import type { TourReservation } from "@/interface/tour/TourReservation";
import type { PaymentMethod } from "@/enums/payment/PaymentMethod";
import type { PaymentFilterParams } from "@/interface/payment/PaymentFilterParams";
import type { PageResponse } from "@/interface/common/PageResponse";
import { extractData } from "@/utilities/apiHelper";

export const paymentService = {
  execute: async (reservationId: number, method: PaymentMethod): Promise<TourReservation> => {
    const response = await apiClient.post<ApiResponse<TourReservation>>(
      `/payments/execute/${reservationId}`,
      null,
      { params: { method } },
    );
    return response.data.data;
  },

  getAll: async (params: PaymentFilterParams = {}): Promise<PageResponse<Payment>> => {
    const response = await apiClient.get<ApiResponse<PageResponse<Payment>>>("/payments", {
      params,
    });
    return extractData(response.data);
  },

  getById: async (id: number): Promise<Payment> => {
    const response = await apiClient.get<ApiResponse<Payment>>(`/payments/${id}`);
    return response.data.data;
  },
};
