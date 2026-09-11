import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Client } from '@stomp/stompjs';
import { useAuth } from './AuthContext';
import { notificationService } from '@/Api/Notification';
import type { NotificationContextType } from '@/interface/common/NotificationContextType';

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  const [unreadCount, setUnreadCount] = useState(0);

  // Function to manually refresh count from API
  const refreshCount = useCallback(async () => {
    if (isAuthenticated && user?.id) {
      try {
        const counts = await notificationService.getCounts(user.id);
        setUnreadCount(counts.unreadCount);
      } catch (error) {
        console.error("Failed to fetch notification counts", error);
      }
    }
  }, [isAuthenticated, user?.id]);

  const decrementCount = () => setUnreadCount(prev => Math.max(0, prev - 1));

  useEffect(() => {
    if (!isAuthenticated || !user?.id) {
      setUnreadCount(0);
      return;
    }

    refreshCount();

    const stompClient = new Client({
      brokerURL: 'ws://localhost:8080/ws-notifications', 
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        stompClient.subscribe(`/topic/notifications/${user.id}`, (message) => {
          const data = JSON.parse(message.body);
          // 1. Update global state count
          setUnreadCount(data.unread);
          
          // 2. We still use an event JUST to tell the specific list page to re-fetch its array
          window.dispatchEvent(new CustomEvent('newNotificationReceived'));
        });
      },
    });

    stompClient.activate();

    return () => {
      stompClient.deactivate();
    };
  }, [isAuthenticated, user?.id, refreshCount]);

  return (
    <NotificationContext.Provider value={{ unreadCount, decrementCount, refreshCount }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error("useNotificationContext must be used within NotificationProvider");
  return context;
};