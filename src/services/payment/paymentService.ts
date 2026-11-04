import { ENDPOINTS } from "@/config/endpoints";
import apiClient from "@/config/BaseApi";
import type { ApiResponse } from "@/interfaces/common/ApiResponse";
import type { Payment } from "@/interfaces/payment/Payment";
import type { TourReservation } from "@/interfaces/tour/TourReservation";
import type { PaymentMethod } from "@/enums/payment/PaymentMethod";
import type { PaymentFilterParams } from "@/interfaces/payment/PaymentFilterParams";
import type { PageResponse } from "@/interfaces/common/PageResponse";
import { extractData } from "@/utilities/apiHelper";

export const paymentService = {
  execute: async (reservationId: number, method: PaymentMethod): Promise<TourReservation> => {
    const response = await apiClient.post<ApiResponse<TourReservation>>(
      ENDPOINTS.payments.execute(reservationId),
      null,
      { params: { method } },
    );
    return response.data.data;
  },

  getAll: async (params: PaymentFilterParams = {}): Promise<PageResponse<Payment>> => {
    const response = await apiClient.get<ApiResponse<PageResponse<Payment>>>(ENDPOINTS.payments.root, {
      params,
    });
    return extractData(response.data);
  },

  getById: async (id: number): Promise<Payment> => {
    const response = await apiClient.get<ApiResponse<Payment>>(ENDPOINTS.payments.byId(id));
    return response.data.data;
  },
};
