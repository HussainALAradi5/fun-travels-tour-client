import { ENDPOINTS } from "@/config/endpoints";
import apiClient from "@/config/BaseApi";
import type { ApiResponse } from "@/interfaces/common/ApiResponse";
import type { PaymentResponseDto } from "@/dtos/payment/PaymentResponseDto";
import type { ReservationResponseDto } from "@/dtos/tour-management/ReservationResponseDto";
import type { PaymentMethod } from "@/enums/payment/PaymentMethod";
import type { PaymentFilterParams } from "@/interfaces/payment/PaymentFilterParams";
import type { PageResponseDto } from "@/dtos/common/PageResponseDto";
import { extractData } from "@/utilities/apiHelper";

export const paymentService = {
  execute: async (reservationId: number, method: PaymentMethod): Promise<ReservationResponseDto> => {
    const response = await apiClient.post<ApiResponse<ReservationResponseDto>>(
      ENDPOINTS.payments.execute(reservationId),
      null,
      { params: { method } },
    );
    return response.data.data;
  },

  getAll: async (params: PaymentFilterParams = {}): Promise<PageResponseDto<PaymentResponseDto>> => {
    const response = await apiClient.get<ApiResponse<PageResponseDto<PaymentResponseDto>>>(ENDPOINTS.payments.root, {
      params,
    });
    return extractData(response.data);
  },

  getById: async (id: number): Promise<PaymentResponseDto> => {
    const response = await apiClient.get<ApiResponse<PaymentResponseDto>>(ENDPOINTS.payments.byId(id));
    return response.data.data;
  },
};
