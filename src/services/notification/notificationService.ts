import { ENDPOINTS } from "@/config/endpoints";
import apiClient from "@/config/BaseApi";
import type { ApiResponse } from "@/interfaces/common/ApiResponse";
import type { NotificationResponseDto } from "@/dtos/notification/NotificationResponseDto";
import type { NotificationCountsDto } from "@/dtos/notification/NotificationCountsDto";

export const notificationService = {
  getUserNotifications: async (
    userId: number,
    filters?: Record<string, string | number | boolean>,
  ): Promise<NotificationResponseDto[]> => {
    const response = await apiClient.get<ApiResponse<NotificationResponseDto[]>>(
      ENDPOINTS.notifications.forUser(userId),
      { params: filters },
    );
    return response.data.data as unknown as NotificationResponseDto[];
  },

  markAsRead: async (id: number): Promise<null> => {
    const response = await apiClient.put<ApiResponse<null>>(ENDPOINTS.notifications.read(id));
    return response.data.data;
  },

  getCounts: async (userId: number): Promise<NotificationCountsDto> => {
    const response = await apiClient.get<ApiResponse<NotificationCountsDto>>(
      ENDPOINTS.notifications.counts(userId),
    );
    return response.data.data;
  },
};
