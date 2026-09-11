import { useState } from "react";
import { VStack, HStack, Box, Text, Button, Icon } from "@chakra-ui/react";
import { ShieldAlert, XCircle, AlertTriangle, Ban, FileText, ShieldCheck, CheckCircle } from "lucide-react";

import { GenericCard } from "@/components/ui/Custom/GenericCard";
import { GenericStatusWorkflow, type StatusConfig } from "@/components/ui/Custom/GenericStatusWorkflow";
import type { Ticket } from "@/interface/tour/Ticket";
import { ConfirmDialog } from "@/components/ui/Custom/Dialogs/ConfirmDialog";
import { useTourManagement } from "@/hooks/tourManagement/useTourManagement";
import type { GenericStatus } from "@/enums/GenericStatus";

const TICKET_STATUS_MAP: Partial<Record<string, StatusConfig>> = {
  "PENDING": { label: "Pending", colorPalette: "gray", icon: FileText },
  "APPROVED": { label: "Approved", colorPalette: "yellow", icon: ShieldCheck }, // Added Approved
  "CONFIRMED": { label: "Confirmed", colorPalette: "blue", icon: ShieldCheck },
  "COMPLETED": { label: "Completed", colorPalette: "green", icon: CheckCircle },
  "CANCELLED": { label: "Cancelled", colorPalette: "red", icon: Ban },
};

const STEPS = ["PENDING", "APPROVED", "CONFIRMED", "COMPLETED"] as const;

interface Props {
  ticket: Ticket;
  isCancelled: boolean;
  isCompleted: boolean;
  onRefresh: () => void;
}

export const TicketManagementSidebar = ({ ticket, isCancelled, isCompleted, onRefresh }: Props) => {
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const { handleCancelTicket, handleUpdateTicketStatus, isMutating } = useTourManagement();

  const onCancelConfirm = async () => {
    if (!ticket?.id) return;
    await handleCancelTicket(ticket.id);
    setIsCancelDialogOpen(false);
    onRefresh();
  };

  const onWorkflowStatusChange = async (newStatus: string) => {
    if (!ticket?.id) return;
    await handleUpdateTicketStatus(ticket.id, newStatus as GenericStatus);
    onRefresh();
  };

  return (
    <VStack gap={6} align="stretch" position="sticky" top="24px" hideFrom="print">
      <GenericCard 
        w="full" 
        header={
          <Text fontSize="xs" fontWeight="bold" color="fg.muted" letterSpacing="widest" textTransform="uppercase">
            Ticket Lifecycle
          </Text>
        } 
      >
        <VStack gap={6} align="stretch">
          
          <GenericStatusWorkflow
            currentStatus={ticket.ticketStatus}
            statusMap={TICKET_STATUS_MAP}
            steps={STEPS as unknown as string[]}
            onStatusChange={onWorkflowStatusChange}
          />

          {/* DANGER ZONE - Only show if active */}
          {!isCancelled && !isCompleted && (
            <Box pt={5} borderTop="1px dashed" borderColor="border.subtle">
              <VStack align="stretch" gap={4}>
                <VStack align="start" gap={1}>
                  <HStack color="red.500" _dark={{ color: "red.400" }}>
                    <Icon as={ShieldAlert} boxSize="4" />
                    <Text fontSize="sm" fontWeight="bold" textTransform="uppercase" letterSpacing="widest">
                      Danger Zone
                    </Text>
                  </HStack>
                  <Text fontSize="xs" color="fg.muted" lineHeight="tall">
                    Cancel reservation. Subject to the 7-day policy window.
                  </Text>
                </VStack>

                <Button 
                  w="full"
                  size="sm" 
                  colorPalette="red" 
                  variant="outline" 
                  loading={isMutating}
                  onClick={() => setIsCancelDialogOpen(true)}
                >
                  <Icon as={XCircle} mr={2} boxSize="4" /> Cancel Booking
                </Button>
              </VStack>
            </Box>
          )}

          {/* CANCELLED STATE UI */}
          {isCancelled && (
            <Box pt={5} borderTop="1px dashed" borderColor="red.200" color="red.500">
              <HStack>
                <Icon as={Ban} boxSize="5" />
                <Text fontSize="sm" fontWeight="medium">Booking is cancelled.</Text>
              </HStack>
            </Box>
          )}
        </VStack>
      </GenericCard>

      <ConfirmDialog
        open={isCancelDialogOpen}
        onClose={() => setIsCancelDialogOpen(false)}
        onConfirm={onCancelConfirm}
        title="Cancel Ticket"
        description="This action cannot be undone."
        message="Are you sure you want to cancel? This releases your seat and is only allowed if the tour end date is more than 7 days away."
        icon={AlertTriangle}
        confirmText="Confirm Cancellation"
        colorPalette="red"
      />
    </VStack>
  );
};
