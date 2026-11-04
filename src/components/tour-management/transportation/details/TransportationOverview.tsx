import { Badge, Box, HStack, Separator, Text, VStack } from "@chakra-ui/react";
import { Activity, LayoutGrid, MapPin, Users } from "lucide-react";
import { MetricBox, TrackingStep } from "@/components/ui/custom/GlowComponents";
import type { TransportationDetailsSectionProps } from "@/interfaces/props/tour/TransportationDetailsSectionProps";
import { TransportationStatusSidebar } from "../TransportationStatusSidebar";

export const TransportationOverview = ({ id, transport, themeColor, onStatusChange }: TransportationDetailsSectionProps) => (
  <VStack align="stretch" gap={6}>
    <MetricBox icon={Activity} color={`${themeColor}.500`} label="Unit Health">
      <VStack align="start" gap={6} mt={4} position="relative">
        <Box position="absolute" left="19px" top="20px" bottom="20px" w="2px" bg="border.subtle" />
        <TrackingStep icon={MapPin} bg={`${themeColor}.500`} glowColor={themeColor} title="Location" location="Processing Terminal" />
        <TrackingStep icon={Users} bg="purple.500" glowColor="purple" title="Manager" location="Admin Overlook" />
      </VStack>
    </MetricBox>
    {transport && onStatusChange && <TransportationStatusSidebar transport={transport} onStatusChange={onStatusChange} />}
    <MetricBox icon={LayoutGrid} color="gray.500" label="Resource Metadata">
      <VStack align="stretch" gap={4} mt={2}>
        <HStack justify="space-between">
          <Text fontSize="sm" color="fg.muted">Registry ID</Text>
          <Text fontWeight="bold" fontFamily="mono">#{id}</Text>
        </HStack>
        <Separator />
        <HStack justify="space-between">
          <Text fontSize="sm" color="fg.muted">System Status</Text>
          <Badge colorPalette={transport?.status === "ACTIVE" ? "green" : "red"} variant="subtle">{transport?.status}</Badge>
        </HStack>
      </VStack>
    </MetricBox>
  </VStack>
);
