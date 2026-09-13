import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { Client } from '@stomp/stompjs';
import { useAuth } from './AuthContext';
import { notificationService } from '@/Api/Notification';
import type { NotificationContextType } from '@/interface/common/NotificationContextType';

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  const userId = user?.id;
  const [unreadCount, setUnreadCount] = useState(0);
  const refreshCount = useCallback(async () => {
    if (isAuthenticated && userId) {
      try {
        const counts = await notificationService.getCounts(userId);
        setUnreadCount(counts.unreadCount);
      } catch (error) {
        console.error("Failed to fetch notification counts", error);
      }
    }
  }, [isAuthenticated, userId]);

  const decrementCount = useCallback(
    () => setUnreadCount(prev => Math.max(0, prev - 1)),
    [],
  );

  useEffect(() => {
    if (!isAuthenticated || !userId) {
      return;
    }

    const stompClient = new Client({
      brokerURL: 'ws://localhost:8080/ws-notifications',
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        stompClient.subscribe(`/topic/notifications/${userId}`, (message) => {
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
  }, [isAuthenticated, userId]);

  const value = useMemo(
    () => ({ unreadCount, decrementCount, refreshCount }),
    [unreadCount, decrementCount, refreshCount],
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error("useNotificationContext must be used within NotificationProvider");
  return context;
};
