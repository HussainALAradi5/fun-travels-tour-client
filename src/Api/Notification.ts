import apiClient from "@/config/BaseApi";
import type { ApiResponse } from "@/interface/common/ApiResponse";
import type { NotificationResponse } from "@/interface/notification/NotificationResponse";
import type { NotificationCounts } from "@/interface/notification/NotificationCounts";
import type { Notification } from "@/interface/notification/Notification";

export const notificationService = {
  getUserNotifications: async (
    userId: number,
    filters?: Record<string, string | number | boolean>,
  ): Promise<Notification[]> => {
    const response = await apiClient.get<ApiResponse<NotificationResponse[]>>(
      `/notifications/user/${userId}`,
      { params: filters },
    );
    return response.data.data as unknown as Notification[];
  },

  markAsRead: async (id: number): Promise<null> => {
    const response = await apiClient.put<ApiResponse<null>>(`/notifications/${id}/read`);
    return response.data.data;
  },

  getCounts: async (userId: number): Promise<NotificationCounts> => {
    const response = await apiClient.get<ApiResponse<NotificationCounts>>(
      `/notifications/user/${userId}/counts`,
    );
    return response.data.data;
  },
};
