import { useEffect, useMemo, useState } from "react";
import { NEW_NOTIFICATION_EVENT, NOTIFICATION_TYPE_OPTIONS, READ_STATUS_OPTIONS, REFERENCE_OPTIONS } from "@/constants/notification/inboxFilters";
import { UserType } from "@/enums/UserType";
import { useNotification } from "@/hooks/useNotification";
import { useUser } from "@/hooks/user/useUser";
import type { FilterGroup } from "@/interfaces/common/FilterGroup";
import type { InboxFilters } from "@/interfaces/notification/InboxFilters";
import type { Notification as AppNotification } from "@/interfaces/notification/Notification";
import { useNavigate } from "@/lib/navigation";
import { notificationRoute } from "@/utilities/notificationRoute";

const EMPTY: InboxFilters = { search: "", status: "", type: "", refType: "", startDate: "", endDate: "" };

/** Server-filtered inbox that refreshes on WebSocket pushes. */
export function useNotificationInbox() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [filters, setFilters] = useState<InboxFilters>(EMPTY);
  const set = (key: keyof InboxFilters) => (value: string) => setFilters((prev) => ({ ...prev, [key]: value }));

  const query = useMemo(() => ({
    search: filters.search || undefined,
    isRead: filters.status === "READ" ? true : filters.status === "UNREAD" ? false : undefined,
    type: filters.type || undefined,
    refType: filters.refType || undefined,
    startDate: filters.startDate || undefined,
    endDate: filters.endDate || undefined,
  }) as Record<string, string | number | boolean>, [filters]);

  const { notifications, loading, fetchNotifications, markAsRead } = useNotification(user?.id, query);

  useEffect(() => {
    void fetchNotifications();
    const refresh = () => void fetchNotifications();
    window.addEventListener(NEW_NOTIFICATION_EVENT, refresh);
    return () => window.removeEventListener(NEW_NOTIFICATION_EVENT, refresh);
  }, [fetchNotifications]);

  const open = (notif: AppNotification) => {
    if (!notif.isRead) markAsRead(notif.id);
    const route = notificationRoute(notif, Boolean(user?.userType && user.userType !== UserType.CUSTOMER));
    if (route) navigate(route);
  };

  const filterGroups: FilterGroup[] = [
    { label: "Status", value: filters.status, options: READ_STATUS_OPTIONS, onChange: set("status"), variant: "select", placeholder: "All Statuses" },
    { label: "Type", value: filters.type, options: NOTIFICATION_TYPE_OPTIONS, onChange: set("type"), variant: "select", placeholder: "All Types" },
    { label: "Reference", value: filters.refType, options: REFERENCE_OPTIONS, onChange: set("refType"), variant: "select", placeholder: "All References" },
  ];

  return {
    filters, set, filterGroups, notifications, loading, markAsRead, open,
    unreadCount: notifications.filter((n) => !n.isRead).length, reset: () => setFilters(EMPTY),
  };
}
