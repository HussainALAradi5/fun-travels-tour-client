import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { 
  Stack, Center, Spinner, Heading, Text, VStack, HStack, Button, Box, Grid 
} from "@chakra-ui/react";
import { Printer, AlertCircle } from "lucide-react";

import { ticketService } from "@/Api/tourmanagement/Ticket";
import { BoardingPassCard } from "./CustomerTicketDetails/BoardingPassCard";
import type { Ticket } from "@/interface/tour/Ticket";
import { TicketVerification } from "./CustomerTicketDetails/TicketVerification";
import { TicketJourneyTracker } from "./CustomerTicketDetails/TicketJourneyTracker";

// Import the new Sidebar
import { TicketManagementSidebar } from "./CustomerTicketDetails/TicketManagementSidebar";

export const CustomerTicketDetailManager = () => {
  const { id } = useParams();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchTicket = () => {
    if (!id) return;
    setLoading(true);
    ticketService.getById(Number(id))
      .then(setTicket)
      .catch((err) => console.error("Fetch failed:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchTicket();
  }, [id]);

  const { isCancelled, isCompleted } = useMemo(() => {
    if (!ticket || !ticket.tour) return { isCancelled: false, isCompleted: false };
    return {
      isCancelled: ticket.ticketStatus === "CANCELLED",
      isCompleted: ticket.ticketStatus === "COMPLETED" || ticket.tour.status === "COMPLETED"
    };
  }, [ticket]);

  if (loading) return (
    <Center h="60vh">
      <VStack gap={4}>
        <Spinner color="blue.500" size="xl" borderWidth="4px" />
        <Text color="fg.muted">Retrieving itinerary...</Text>
      </VStack>
    </Center>
  );
  
  if (!ticket || !ticket.tour) return (
    <Center h="60vh">
      <VStack gap={4} p={8} bg="bg.panel" borderRadius="2xl" borderWidth="1px">
        <AlertCircle size={48} color="var(--chakra-colors-red-400)" />
        <Heading size="md">Ticket Not Found</Heading>
      </VStack>
    </Center>
  );

  return (
    <Stack gap={8} maxW="6xl" mx="auto" w="full" pb={12}>
      
      {/* HEADER */}
      <HStack justify="space-between" align="center" hideFrom="print">
        <Heading size="lg">Expedition Ticket</Heading>
        <Button variant="outline" size="sm" onClick={() => window.print()}>
          <Printer size={16} style={{ marginRight: '8px' }} /> Print
        </Button>
      </HStack>

      <Grid templateColumns={{ base: "1fr", lg: "1.3fr 0.7fr" }} gap={8} alignItems="start">
        
        {/* LEFT COLUMN: Main Content */}
        <VStack gap={8} align="stretch">
          <Box opacity={isCancelled ? 0.6 : 1} filter={isCancelled ? "grayscale(100%)" : "none"} transition="all 0.3s">
            <BoardingPassCard ticket={ticket} />
          </Box>

          {!isCancelled && <TicketVerification ticket={ticket} />}
          <TicketJourneyTracker ticket={ticket} />
        </VStack>

        {/* RIGHT COLUMN: The Cleaned Up Sidebar */}
        <TicketManagementSidebar 
          ticket={ticket} 
          isCancelled={isCancelled} 
          isCompleted={isCompleted} 
          onRefresh={fetchTicket} 
        />

      </Grid>
    </Stack>
  );
};

