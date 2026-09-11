import { Box, Heading } from "@chakra-ui/react";
import { Flag, CheckCircle, Clock, Navigation, MapPin } from "lucide-react";
import { ActivityTimeline } from "@/components/ui/Custom/ActivityTimeline";
import type { TrackingItem } from "@/interface/props/ui/ActivityTimelineProps";
import type { Ticket } from "@/interface/tour/Ticket";

export const TicketJourneyTracker = ({ ticket }: { ticket: Ticket }) => {
  const trackingItems: TrackingItem[] = [
    {
      id: "1",
      title: "Booking Confirmed",
      description: `Received: ${ticket.bookingDate ? new Date(ticket.bookingDate).toLocaleDateString() : 'N/A'}`,
      icon: CheckCircle,
      color: "green.500",
      glowColor: "rgba(34, 197, 94, 0.4)"
    },
    {
      id: "2",
      title: "Departure",
      description: ticket.tour?.startCity?.name || "Departure Point TBD",
      icon: Clock,
      color: ticket.ticketStatus === "CONFIRMED" ? "blue.500" : "gray.300",
      glowColor: ticket.ticketStatus === "CONFIRMED" ? "rgba(59, 130, 246, 0.4)" : "transparent"
    },
    {
      id: "3",
      title: "Route",
      description: `Via ${ticket.tour?.transportation?.providerName || "Carrier"}`,
      icon: Navigation,
      color: ticket.tour?.status === "ACTIVE" ? "blue.500" : "gray.300",
      glowColor: ticket.tour?.status === "ACTIVE" ? "rgba(59, 130, 246, 0.4)" : "transparent"
    },
    {
      id: "4",
      title: "Destination",
      description: ticket.tour?.endCity?.name || "Final Destination TBD",
      icon: MapPin,
      color: ticket.tour?.status === "COMPLETED" ? "green.500" : "gray.300",
      glowColor: ticket.tour?.status === "COMPLETED" ? "rgba(34, 197, 94, 0.4)" : "transparent"
    },
  ];

  return (
    <Box bg="bg.panel" p={{ base: 6, md: 8 }} borderRadius="3xl" shadow="md" borderWidth="1px">
      <Heading size="md" mb={8} display="flex" alignItems="center" gap={3}>
        <Flag size={24} color="blue.500" /> Journey Tracker
      </Heading>
      <Box px={{ base: 2, md: 6 }}>
        <ActivityTimeline
          items={trackingItems}
          initialVisibleMiddle={3}
          animate={ticket.ticketStatus === "CONFIRMED"}
        />
      </Box>
    </Box>
  );
};

