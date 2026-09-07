import apiClient from "@/config/BaseApi";
// IMPORT FIX: Alias the interface
import type {
  Notification as AppNotification,
  NotificationCounts,
} from "@/interface/NotificationInterface";

export const notificationService = {
  getUserNotifications: async (
    userId: number,
    filters?: Record<string, any>,
  ) => {
    const response = await apiClient.get<AppNotification[]>(
      `/notifications/user/${userId}`,
      { params: filters }, // Automatically builds ?search=xx&isRead=true
    );
    return response.data;
  },

  markAsRead: async (id: number) => {
    const response = await apiClient.put<void>(`/notifications/${id}/read`);
    return response.data;
  },
  getCounts: async (userId: number) => {
    const response = await apiClient.get<NotificationCounts>(
      `/notifications/user/${userId}/counts`,
    );
    return response.data;
  },
};
