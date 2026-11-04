import { Badge, Box, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { LayoutGrid } from "lucide-react";
import { StatusLegend } from "@/components/ui/custom/StatusLegend";
import { SeatStatusColor } from "@/enums/tour-management/SeatStatus";
import type { TransportationDetailsSectionProps } from "@/interfaces/props/tour/TransportationDetailsSectionProps";
import { SeatManager } from "../../seat/seat-management/SeatManager";

export const TransportationSeatPanel = ({ id, transport, themeColor }: TransportationDetailsSectionProps) => (
  <VStack align="stretch" gap={6}>
    <StatusLegend title="Seat Status Guide" colorMap={SeatStatusColor} />
    <Box bg="bg.panel" p={8} borderRadius="3xl" border="1px solid" borderColor="border.subtle" shadow="xl">
      <HStack mb={6} justify="space-between">
        <HStack><LayoutGrid size={20} /><Heading size="md">Seating Map</Heading></HStack>
        <HStack gap={4}>
          <Text fontSize="xs" fontWeight="bold" color="fg.muted">CAPACITY: {transport?.totalCapacity} SEATS</Text>
          <Badge variant="outline" colorPalette={themeColor}>Live View</Badge>
        </HStack>
      </HStack>
      <SeatManager transportId={Number(id)} />
    </Box>
  </VStack>
);
