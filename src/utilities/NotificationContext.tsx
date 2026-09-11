import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Client } from '@stomp/stompjs';
import { useAuth } from './AuthContext';
import { notificationService } from '@/Api/Notification';
import type { NotificationContextType } from '@/interface/common/NotificationContextType';

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  const [unreadCount, setUnreadCount] = useState(0);
  const refreshCount = useCallback(async () => {
    if (isAuthenticated && user?.id) {
      try {
        const counts = await notificationService.getCounts(user.id as unknown as number);
        setUnreadCount(counts.unreadCount);
      } catch (error) {
        console.error("Failed to fetch notification counts", error);
      }
    }
  }, [isAuthenticated, user]);

  const decrementCount = () => setUnreadCount(prev => Math.max(0, prev - 1));

  useEffect(() => {
    if (!isAuthenticated || !user?.id) {
      return;
    }

    const stompClient = new Client({
      brokerURL: 'ws://localhost:8080/ws-notifications',
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        stompClient.subscribe(`/topic/notifications/${user.id}`, (message) => {
          const data = JSON.parse(message.body);
          setUnreadCount(data.unread);
          window.dispatchEvent(new CustomEvent('newNotificationReceived'));
        });
      },
    });

    stompClient.activate();

    return () => {
      stompClient.deactivate();
    };
  }, [isAuthenticated, user]);

  return (
    <NotificationContext.Provider value={{ unreadCount, decrementCount, refreshCount }}>
      {children}
    </NotificationContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error("useNotificationContext must be used within NotificationProvider");
  return context;
};
