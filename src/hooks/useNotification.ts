import { useState, useCallback } from "react";
import { notify } from "@/components/ui/Custom/GenericNotification";
import { notificationService } from "@/Api/Notification";
import type { Notification as AppNotification } from "@/interface/NotificationInterface";
import { useNotificationContext } from "@/utilities/NotificationContext";

export const useNotification = (userId?: number, filters?: Record<string, any>) => {
  const { decrementCount } = useNotificationContext();
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchNotifications = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    try {
      // Passes the backend filters (search, status, type, etc.) directly to the service
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
    // We intentionally stringify the filters object so the hook knows exactly when a deeply nested value changes
  }, [userId, JSON.stringify(filters)]); 

  const markAsRead = async (id: number) => {
    try {
      await notificationService.markAsRead(id);
      
      // Optimistically update the UI to feel instant
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
      );

      // Decrement the global badge count in the Context
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