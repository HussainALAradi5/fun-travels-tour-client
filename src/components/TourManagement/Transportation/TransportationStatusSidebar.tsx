import { VStack, Box, Text, Heading,  Icon, Button } from "@chakra-ui/react";
import { Wrench, CheckCircle2, AlertTriangle, Gauge, Info } from "lucide-react";
import { ContentCard } from "@/components/ui/Custom/ContentCard";
import { StatusWorkflow } from "@/components/ui/Custom/StatusWorkflow";
import type { StatusConfig } from "@/interface/common/StatusConfig";
import { TransportationStatus } from "@/enums/tourmanagement/TransportationStatus";
import type { TransportationStatusSidebarProps } from "@/interface/props/tour/TransportationStatusSidebarProps";

const STATUS_MAP: Partial<Record<TransportationStatus, StatusConfig>> = {
  [TransportationStatus.AVAILABLE]: {
    label: "Available", colorPalette: "green", icon: CheckCircle2
  },
  [TransportationStatus.PARTIAL]: {
    label: "Partial", colorPalette: "yellow", icon: Gauge
  },
  [TransportationStatus.FULL]: {
    label: "Full Capacity", colorPalette: "orange", icon: AlertTriangle
  },
  [TransportationStatus.MAINTENANCE]: {
    label: "Maintenance", colorPalette: "red", icon: Wrench
  },
};

const STEPS = [
  TransportationStatus.AVAILABLE,
  TransportationStatus.PARTIAL,
  TransportationStatus.FULL,
  TransportationStatus.MAINTENANCE
];

export const TransportationStatusSidebar = ({ transport, onStatusChange }: TransportationStatusSidebarProps) => {

  const isAutoManaged =
    transport.unitStatus === TransportationStatus.PARTIAL ||
    transport.unitStatus === TransportationStatus.FULL;

  return (
    <VStack gap="6">
      <ContentCard w="full" header={<Heading size="xs">Unit Operations</Heading>}>
        <StatusWorkflow
          currentStatus={transport.unitStatus as TransportationStatus}
          statusMap={STATUS_MAP}
          steps={STEPS}
          onStatusChange={onStatusChange}
          isReadOnly={isAutoManaged}
        />

        {isAutoManaged && (
          <Box mt={2} p={2} bg="blue.500/10" borderRadius="md" border="1px solid" borderColor="blue.500/30">
            <VStack gap={1} align="start">
               <Text fontSize="10px" fontWeight="bold" color="blue.600" display="flex" alignItems="center">
                 <Icon as={Info} size="sm" mr={1}/> SYSTEM MANAGED
               </Text>
               <Text fontSize="xs" color="blue.700">
                 Status updated automatically based on seat bookings.
               </Text>
            </VStack>
          </Box>
        )}
      </ContentCard>
<ContentCard w="full">
        <VStack gap="3" align="stretch">
          <Text fontSize="xs" fontWeight="black" color="fg.muted">MANUAL OVERRIDE</Text>

          {transport.unitStatus !== TransportationStatus.MAINTENANCE ? (
            <Button
              size="sm"
              colorPalette="red"
              variant="subtle"
              onClick={() => onStatusChange(TransportationStatus.MAINTENANCE)}
            >
              <Icon as={Wrench} mr={2}/> Send to Maintenance
            </Button>
          ) : (
            <Button
              size="sm"
              colorPalette="green"
              onClick={() => onStatusChange(TransportationStatus.AVAILABLE)}
            >
              <Icon as={CheckCircle2} mr={2}/> Return to Service
            </Button>
          )}
        </VStack>
      </ContentCard>
    </VStack>
  );
};
