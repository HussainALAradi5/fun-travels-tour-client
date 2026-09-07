import apiClient from "@/config/BaseApi";
import type { PaymentMethod } from "@/enums/payment/PaymentMethod";
import type { PaymentStatus } from "@/enums/payment/PaymentStatus";
import type { Payment } from "@/interface/PaymentInterface";
import type { TourReservation } from "@/interface/tourmanagement/TourReservationInterface";

export const paymentService = {
  /**
   * Triggers the full payment flow.
   * Path: POST /api/payments/execute/{reservationId}?method=...
   * Returns: The updated TourReservation (Approved/Confirmed)
   */
  execute: async (reservationId: number, method: PaymentMethod) => {
    const response = await apiClient.post<TourReservation>(
      `/payments/execute/${reservationId}`,
      null,
      { params: { method } },
    );
    return response.data;
  },

  filter: async (params: {
    userId?: number;
    status?: PaymentStatus;
    method?: PaymentMethod;
    date?: string;
  }) => {
    const response = await apiClient.get<Payment[]>("/payments/filter", {
      params,
    });
    return response.data;
  },

  getById: async (id: number) => {
    const response = await apiClient.get<Payment>(`/payments/${id}`);
    return response.data;
  },
};
