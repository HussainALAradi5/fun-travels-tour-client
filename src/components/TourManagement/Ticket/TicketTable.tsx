// src/components/TourManagement/TicketTable.tsx
import { useMemo } from "react";
import { Badge, IconButton, Icon, HStack, Text, VStack } from "@chakra-ui/react";
import { Eye, MapPin, Calendar } from "lucide-react";
import { GenericTable, type Column } from "@/components/ui/Custom/GenericTable";
import type { Ticket } from "@/interface/tour/Ticket";
import { StatusColors } from "@/constants/roles/Colors";
import type { TicketTableProps } from "@/interface/props/tour/TicketTableProps";

export const TicketTable = ({ tickets, isLoading, onView }: TicketTableProps) => {
  const columns = useMemo<Column<Ticket>[]>(() => [
    {
      header: "Ticket Details",
      key: "ticketNumber",
      render: (t) => (
        <VStack align="start" gap={0}>
          <Text fontWeight="bold" fontSize="sm">{t.ticketNumber}</Text>
          <HStack color="fg.muted" fontSize="xs" gap={1}>
            <Icon as={MapPin} size="xs" />
            <Text>{t.tour?.title || "Unknown Expedition"}</Text>
          </HStack>
        </VStack>
      ),
    },
    {
      header: "Travel Date",
      key: "tour.startDate",
      render: (t) => (
        <HStack fontSize="sm" color="fg">
          <Icon as={Calendar} size="xs" color="blue.500" />
          <Text>{t.tour?.startDate ? new Date(t.tour.startDate).toLocaleDateString() : "TBD"}</Text>
        </HStack>
      ),
    },
    {
      header: "Status",
      key: "ticketStatus",
      render: (t) => (
        <Badge 
          colorPalette={StatusColors[t.ticketStatus || "PENDING"] || "gray"} 
          variant="subtle"
          px={3} py={1} borderRadius="full"
        >
          {t.ticketStatus || "PENDING"}
        </Badge>
      ),
    },
    {
      header: "Total Price",
      key: "totalPrice",
      render: (t) => <Text fontWeight="semibold">${t.totalPrice?.toFixed(2) || "0.00"}</Text>,
    },
    {
      header: "Action",
      key: "actions",
      render: (t) => (
        <IconButton 
          size="sm" 
          variant="ghost" 
          colorPalette="blue" 
          onClick={() => t.id && onView(t.id)}
          aria-label="View Ticket Details"
          borderRadius="full"
        >
          <Icon as={Eye} />
        </IconButton>
      ),
    },
  ], [onView]);

  return (
    <GenericTable<Ticket>
      data={tickets}
      exportFileName="My Tickets"
      enableExport
      columns={columns}
      loading={isLoading}
      searchKey="ticketNumber"
      searchPlaceholder="Search by ticket number or tour..."
      colorPalette="blue"
    />
  );
};
