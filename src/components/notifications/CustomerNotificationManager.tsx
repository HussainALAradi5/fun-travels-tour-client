import { Center, Spinner, Text, VStack } from "@chakra-ui/react";
import { useNotificationInbox } from "@/hooks/notification/useNotificationInbox";
import { InboxFilterPanel } from "./InboxFilterPanel";
import { NotificationEmptyState } from "./NotificationEmptyState";
import { NotificationHeader } from "./NotificationHeader";
import { NotificationItem } from "./NotificationItem";

export const CustomerNotificationsManager = () => {
  const inbox = useNotificationInbox();
  return (
    <VStack gap={6} align="stretch" w="full" maxW="4xl" mx="auto" pb={12}>
      <NotificationHeader unreadCount={inbox.unreadCount} />
      <InboxFilterPanel filters={inbox.filters} filterGroups={inbox.filterGroups} count={inbox.notifications.length}
        onChange={inbox.set} onReset={inbox.reset} />
      {inbox.loading ? (
        <Center p={16} color="fg.muted" flexDirection="column" gap={4}>
          <Spinner size="lg" color="blue.500" />
          <Text fontWeight="medium">Syncing your inbox...</Text>
        </Center>
      ) : inbox.notifications.length === 0 ? <NotificationEmptyState /> : (
        <VStack gap={3} align="stretch">
          {inbox.notifications.map((notif) => (
            <NotificationItem key={notif.id} notif={notif} onMarkAsRead={inbox.markAsRead} onNavigate={inbox.open} />
          ))}
        </VStack>
      )}
    </VStack>
  );
};
