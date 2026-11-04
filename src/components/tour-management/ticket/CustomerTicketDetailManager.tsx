import { useParams } from "@/lib/navigation";
import {
  Stack, Center, Spinner, Heading, Text, VStack, HStack, Button, Box, Grid
} from "@chakra-ui/react";
import { Printer, AlertCircle } from "lucide-react";

import { useTicketDetail } from "@/hooks/tour-management/useTicketDetail";
import { BoardingPassCard } from "./customer-ticket-details/BoardingPassCard";
import { TicketVerification } from "./customer-ticket-details/TicketVerification";
import { TicketJourneyTracker } from "./customer-ticket-details/TicketJourneyTracker";
import { TicketManagementSidebar } from "./customer-ticket-details/TicketManagementSidebar";

export const CustomerTicketDetailManager = () => {
  const { id } = useParams();
  const { ticket, tour, loading, refresh, isCancelled, isCompleted } = useTicketDetail(id);

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
<HStack justify="space-between" align="center" hideFrom="print">
        <Heading size="lg">Expedition Ticket</Heading>
        <Button variant="outline" size="sm" onClick={() => window.print()}>
          <Printer size={16} style={{ marginRight: '8px' }} /> Print
        </Button>
      </HStack>

      <Grid templateColumns={{ base: "1fr", lg: "1.3fr 0.7fr" }} gap={8} alignItems="start">
<VStack gap={8} align="stretch">
          <Box opacity={isCancelled ? 0.6 : 1} filter={isCancelled ? "grayscale(100%)" : "none"} transition="all 0.3s">
            <BoardingPassCard ticket={ticket} tour={tour} />
          </Box>

          {!isCancelled && <TicketVerification ticket={ticket} tour={tour} />}
          <TicketJourneyTracker ticket={ticket} tour={tour} />
        </VStack>
<TicketManagementSidebar
          ticket={ticket}
          isCancelled={isCancelled}
          isCompleted={isCompleted}
          onRefresh={refresh}
        />

      </Grid>
    </Stack>
  );
};

