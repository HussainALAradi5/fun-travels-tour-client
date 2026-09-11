import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, VStack, Separator, HStack, Text, Input, Center, Spinner } from "@chakra-ui/react";

import { useUser } from "@/hooks/User/useUser";
import { useNotification } from "@/hooks/useNotification";
import type { Notification as AppNotification } from "@/interface/notification/Notification";

import { UnifiedFilterBar } from "@/components/ui/Custom/UnifiedFilterBar";
import type { FilterGroup } from "@/interface/common/FilterGroup";
import { NotificationHeader } from "./NotificationHeader";
import { NotificationEmptyState } from "./NotificationEmptyState";
import { NotificationItem } from "./NotificationItem";

export const CustomerNotificationsManager = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    search: "",
    status: "",
    type: "",
    refType: "",
    startDate: "",
    endDate: "",
  });

  const isReadParam = filters.status === "READ" ? true : filters.status === "UNREAD" ? false : undefined;

  const { notifications, loading, fetchNotifications, markAsRead } = useNotification(user?.id, {
    search: filters.search || undefined,
    isRead: isReadParam,
    type: filters.type || undefined,
    refType: filters.refType || undefined,
    startDate: filters.startDate || undefined,
    endDate: filters.endDate || undefined,
  } as Record<string, string | number | boolean>);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  useEffect(() => {
    const handleRemoteUpdate = () => fetchNotifications();
    window.addEventListener('newNotificationReceived', handleRemoteUpdate);
    return () => window.removeEventListener('newNotificationReceived', handleRemoteUpdate);
  }, [fetchNotifications]);

  const handleReset = () => {
    setFilters({ search: "", status: "", type: "", refType: "", startDate: "", endDate: "" });
  };

  const handleNavigation = (notif: AppNotification) => {
    if (!notif.isRead) markAsRead(notif.id);
    if (notif.referenceId) {
      switch (notif.referenceType) {
        case "TOUR":
          navigate(`/admin/tours/${notif.referenceId}`);
          break;
        case "RESERVATION":
          navigate(`/my-bookings/${notif.referenceId}`);
          break;
        case "TICKET":
          navigate(`/my-bookings/${notif.referenceId}`);
          break;
        case "USER_REQUEST":
          navigate(`/my-requests/${notif.referenceId}`);
          break;
        default:
          break;
      }
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const filterGroups: FilterGroup[] = [
    {
      label: "Status",
      value: filters.status,
      options: [
        { label: "Read", value: "READ" },
        { label: "Unread", value: "UNREAD" }
      ],
      onChange: (val) => setFilters(prev => ({ ...prev, status: val })),
      variant: "select",
      placeholder: "All Statuses"
    },
    {
      label: "Type",
      value: filters.type,
      options: [
        { label: "Booking Confirmed", value: "BOOKING_CONFIRMED" },
        { label: "Tour Approval Required", value: "TOUR_APPROVAL_REQUIRED" },
        { label: "Cancellation Alert", value: "CANCELLATION_ALERT" },
        { label: "Tour Completed", value: "TOUR_COMPLETED" },
        { label: "Request Assigned", value: "REQUEST_ASSIGNED" }
      ],
      onChange: (val) => setFilters(prev => ({ ...prev, type: val })),
      variant: "select",
      placeholder: "All Types"
    },
    {
      label: "Reference",
      value: filters.refType,
      options: [
        { label: "Tour", value: "TOUR" },
        { label: "Reservation", value: "RESERVATION" },
        { label: "Ticket", value: "TICKET" },
        { label: "User Request", value: "USER_REQUEST" }
      ],
      onChange: (val) => setFilters(prev => ({ ...prev, refType: val })),
      variant: "select",
      placeholder: "All References"
    }
  ];

  return (
    <VStack gap={6} align="stretch" w="full" maxW="4xl" mx="auto" pb={12}>
      <NotificationHeader unreadCount={unreadCount} />

      <Box
        bg="bg.panel" p={5} borderRadius="2xl"
        shadow="sm" borderWidth="1px" borderColor="border.subtle"
      >
        <UnifiedFilterBar
          searchLabel="Search Inbox"
          searchPlaceholder="Search titles or messages..."
          searchValue={filters.search}
          onSearchTrigger={(val) => setFilters(prev => ({ ...prev, search: val }))}
          filters={filterGroups}
          count={notifications.length}
          onReset={handleReset}
        />

        <Separator my={5} />

        <HStack gap={6} flexWrap="wrap">
          <VStack align="start" gap={2}>
            <Text fontSize="xs" fontWeight="bold" color="fg.muted" textTransform="uppercase" letterSpacing="wider">From Date</Text>
            <Input
              type="date" size="sm" borderRadius="xl" h="10" bg="bg.surface" borderColor="border.muted"
              value={filters.startDate}
              onChange={(e) => setFilters(prev => ({ ...prev, startDate: e.target.value }))}
              _hover={{ borderColor: "blue.400" }}
            />
          </VStack>
          <VStack align="start" gap={2}>
            <Text fontSize="xs" fontWeight="bold" color="fg.muted" textTransform="uppercase" letterSpacing="wider">To Date</Text>
            <Input
              type="date" size="sm" borderRadius="xl" h="10" bg="bg.surface" borderColor="border.muted"
              value={filters.endDate}
              onChange={(e) => setFilters(prev => ({ ...prev, endDate: e.target.value }))}
              _hover={{ borderColor: "blue.400" }}
            />
          </VStack>
        </HStack>
      </Box>

      {loading ? (
        <Center p={16} color="fg.muted" flexDirection="column" gap={4}>
          <Spinner size="lg" color="blue.500" />
          <Text fontWeight="medium">Syncing your inbox...</Text>
        </Center>
      ) : notifications.length === 0 ? (
        <NotificationEmptyState />
      ) : (
        <VStack gap={3} align="stretch">
          {notifications.map((notif: AppNotification) => (
            <NotificationItem
              key={notif.id}
              notif={notif}
              onMarkAsRead={markAsRead}
              onNavigate={handleNavigation}
            />
          ))}
        </VStack>
      )}
    </VStack>
  );
};

