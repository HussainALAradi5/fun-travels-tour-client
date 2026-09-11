import { useState, useCallback } from "react";
import { notify } from "@/components/ui/Custom/GenericNotification";
import { notificationService } from "@/Api/Notification";
import type { Notification as AppNotification } from "@/interface/notification/Notification";
import { useNotificationContext } from "@/utilities/NotificationContext";

export const useNotification = (userId?: number, filters?: Record<string, string | number | boolean>) => {
  const { decrementCount } = useNotificationContext();
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchNotifications = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const res = await notificationService.getUserNotifications(userId, filters);
      setNotifications(Array.isArray(res) ? res : []);
    } catch (err) {
      notify({ 
        title: "Sync Failed", 
        description: "Could not load your latest notifications.", 
        type: "error" 
      });
    } finally {
      setLoading(false);
    }
  }, [userId, JSON.stringify(filters)]); 

  const markAsRead = async (id: number) => {
    try {
      await notificationService.markAsRead(id);
      
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
      );

      decrementCount();
      
    } catch (err) {
      notify({ 
        title: "Action Failed", 
        description: "We couldn't mark this as read. Please try again.", 
        type: "error" 
      });
    }
  };

  return { notifications, loading, fetchNotifications, markAsRead };
};
