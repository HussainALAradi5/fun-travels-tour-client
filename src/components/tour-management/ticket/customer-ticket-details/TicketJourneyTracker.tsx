import { Box, Heading, Text } from "@chakra-ui/react";
import { Flag } from "lucide-react";
import { ActivityTimeline } from "@/components/ui/custom/ActivityTimeline";
import type { TicketWithTourProps } from "@/interfaces/props/tour/TicketWithTourProps";
import { journeySteps } from "@/utilities/booking/journeySteps";

/** Where this ticket is in its journey (booked, paid, tour running, departure, back home) and what happens next. */
export const TicketJourneyTracker = ({ ticket, tour }: TicketWithTourProps) => {
  const { items, next } = journeySteps(ticket, tour);
  return (
    <Box bg="bg.panel" p={{ base: 6, md: 8 }} borderRadius="3xl" shadow="md" borderWidth="1px">
      <Heading size="md" mb={2} display="flex" alignItems="center" gap={3}>
        <Flag size={24} color="blue.500" /> Journey Tracker
      </Heading>
      <Text color="fg.muted" fontSize="sm" mb={6}>{next}</Text>
      <Box px={{ base: 2, md: 6 }}>
        <ActivityTimeline items={items} initialVisibleMiddle={3} animate={ticket.ticketStatus !== "CANCELLED"} />
      </Box>
    </Box>
  );
};
