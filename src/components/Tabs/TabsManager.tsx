import { Tabs, Text, Icon, Badge, Box, Circle, Float } from "@chakra-ui/react";
import {
  Globe, Building2, Users, Map, Ticket, Bus, UtensilsCrossed, BellRing, Bell,
  MessageSquare, ReceiptText, Wallet, Blocks
} from "lucide-react";
import { useLocation } from "@/lib/navigation";
import { useAuth } from "@/utilities/AuthContext";
import { useNotificationContext } from "@/utilities/NotificationContext";
import { SmartLink } from "../SmartLink";
import type { TabItem } from "@/interface/props/common/TabsManagerProps";

export const TabsManager = () => {
  const { isAdmin, isAuthenticated, loading } = useAuth();
  const { unreadCount } = useNotificationContext();
  const location = useLocation();

  if (loading) return null;

  const pathSegments = location.pathname.split("/");
  const currentTab = pathSegments.includes("admin")
    ? pathSegments[pathSegments.indexOf("admin") + 1]
    : pathSegments.includes("my-bookings") ? "bookings"
    : pathSegments.includes("my-requests") ? "requests"
    : pathSegments.includes("my-notifications") ? "notifications"
    : pathSegments.includes("transactions") ? "transactions"
    : pathSegments.includes("components") ? "components"
    : (pathSegments.includes("tours") || pathSegments.includes("reserve")) ? "tours"
    : "";

  const userTabs: TabItem[] = [
    { value: "tours", label: "Explore Tours", icon: Map, path: "/tours" },
    { value: "bookings", label: "My Bookings", icon: Ticket, path: "/my-bookings" },
    { value: "requests", label: "My Requests", icon: MessageSquare, path: "/my-requests" },
    { value: "transactions", label: "Wallet", icon: Wallet, path: "/transactions" },
    {
      value: "notifications",
      label: "Notifications",
      icon: unreadCount > 0 ? BellRing : Bell,
      path: "/my-notifications",
      isNotification: true
    },
  ];

  const adminOnlyTabs: TabItem[] = [
    { value: "tours", label: "Tours", icon: Map, path: "/admin/tours" },
    { value: "requests", label: "Requests", icon: MessageSquare, path: "/admin/requests" },
    { value: "transactions", label: "Ledger", icon: ReceiptText, path: "/admin/transactions" },
    { value: "transports", label: "Transportation", icon: Bus, path: "/admin/transports" },
    { value: "meals", label: "Meals", icon: UtensilsCrossed, path: "/admin/meals" },
    { value: "countries", label: "Countries", icon: Globe, path: "/admin/countries" },
    { value: "agencies", label: "Agencies", icon: Building2, path: "/admin/agencies" },
    { value: "users", label: "Users", icon: Users, path: "/admin/users" },
  ];

  const componentShowcaseTab: TabItem = {
    value: "components",
    label: "Components",
    icon: Blocks,
    path: "/components",
  };

  const visibleTabs = isAuthenticated
    ? [...(isAdmin ? adminOnlyTabs : userTabs), componentShowcaseTab]
    : [userTabs[0], componentShowcaseTab];

  return (
    <Tabs.Root value={currentTab} variant="line" colorPalette="blue" size="sm" lazyMount>
      <Tabs.List borderBottom="none" gap={1} alignItems="center">
        {visibleTabs.map((tab: TabItem) => {
          const isNotifyTab = tab.isNotification;
          const hasUnread = isNotifyTab && unreadCount > 0;
          return (
            <SmartLink key={tab.value} to={tab.path}>
              <Tabs.Trigger value={tab.value} px={3} py={2}>
                <Box as="span" display="flex" alignItems="center" position="relative">
                  <Box position="relative" display="flex" alignItems="center">
                    <Icon size="sm" color={hasUnread ? "blue.500" : "inherit"}>
                      <tab.icon />
                    </Icon>
                    {hasUnread && (
                      <Float offsetX="1" offsetY="1">
                        <Circle size="8px" bg="blue.500" border="2px solid" borderColor="bg.panel" animation="pulse 2s infinite" />
                      </Float>
                    )}
                  </Box>
                  <Text display={{ base: "none", md: "block" }} fontSize="xs" fontWeight="bold" ml={2} color={hasUnread ? "blue.600" : "inherit"}>
                    {tab.label}
                  </Text>
                  {hasUnread && (
                    <Badge variant="solid" colorPalette="blue" size="xs" borderRadius="full" ml={2} fontSize="10px" minW="18px" h="18px" display="flex" alignItems="center" justifyContent="center">
                      {unreadCount}
                    </Badge>
                  )}
                </Box>
              </Tabs.Trigger>
            </SmartLink>
          );
        })}
      </Tabs.List>
      <style>{`@keyframes pulse { 0% { transform: scale(0.95); opacity: 0.9; } 70% { transform: scale(1.4); opacity: 0; } 100% { transform: scale(0.95); opacity: 0; } }`}</style>
    </Tabs.Root>
  );
};

export default TabsManager;
