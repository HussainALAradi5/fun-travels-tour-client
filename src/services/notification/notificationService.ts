import { ENDPOINTS } from "@/config/endpoints";
import apiClient from "@/config/BaseApi";
import type { ApiResponse } from "@/interfaces/common/ApiResponse";
import type { Notification } from "@/interfaces/notification/Notification";
import type { NotificationCounts } from "@/interfaces/notification/NotificationCounts";

export const notificationService = {
  getUserNotifications: async (
    userId: number,
    filters?: Record<string, string | number | boolean>,
  ): Promise<Notification[]> => {
    const response = await apiClient.get<ApiResponse<Notification[]>>(
      ENDPOINTS.notifications.forUser(userId),
      { params: filters },
    );
    return response.data.data as unknown as Notification[];
  },

  markAsRead: async (id: number): Promise<null> => {
    const response = await apiClient.put<ApiResponse<null>>(ENDPOINTS.notifications.read(id));
    return response.data.data;
  },

  getCounts: async (userId: number): Promise<NotificationCounts> => {
    const response = await apiClient.get<ApiResponse<NotificationCounts>>(
      ENDPOINTS.notifications.counts(userId),
    );
    return response.data.data;
  },
};
