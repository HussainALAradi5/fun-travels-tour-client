import { Box, Container, SimpleGrid, Skeleton } from "@chakra-ui/react";
import { TransportationTypeColor } from "@/enums/tour-management/TransportationType";
import { useTransportationDetails } from "@/hooks/tour-management/useTransportationDetails";
import { useParams } from "@/lib/navigation";
import { TransportationDetailsHeader } from "./details/TransportationDetailsHeader";
import { TransportationOverview } from "./details/TransportationOverview";
import { TransportationSeatPanel } from "./details/TransportationSeatPanel";

export const TransportationDetails = () => {
  const { id } = useParams();
  const { transport, loading, changeStatus } = useTransportationDetails(id);
  const themeColor = transport ? TransportationTypeColor[transport.type] : "blue";
  if (loading) return <Skeleton height="100vh" />;
  const section = { id, transport, themeColor };
  return (
    <Box bg="bg.canvas" minH="100vh" py={10}>
      <Container maxW="7xl">
        <TransportationDetailsHeader {...section} />
        <SimpleGrid columns={{ base: 1, lg: 3 }} gap={8} alignItems="start">
          <TransportationOverview {...section} onStatusChange={changeStatus} />
          <Box gridColumn={{ lg: "span 2" }}><TransportationSeatPanel {...section} /></Box>
        </SimpleGrid>
      </Container>
    </Box>
  );
};
