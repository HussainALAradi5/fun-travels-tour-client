import { useState } from "react";
import { VStack, HStack, Box, Text, Button, Icon } from "@chakra-ui/react";
import { ShieldAlert, XCircle, AlertTriangle, Ban, FileText, ShieldCheck, CheckCircle } from "lucide-react";

import { ContentCard } from "@/components/ui/custom/ContentCard";
import { StatusWorkflow } from "@/components/ui/custom/StatusWorkflow";
import type { StatusConfig } from "@/interfaces/common/StatusConfig";
import { ConfirmDialog } from "@/components/ui/custom/dialogs/ConfirmDialog";
import { useRefundQuote } from "@/hooks/booking/useRefundQuote";
import { refundMessage } from "@/utilities/booking/refundMessage";
import { useTourManagement } from "@/hooks/tour-management/useTourManagement";
import type { TicketManagementSidebarProps } from "@/interfaces/props/tour/TicketManagementSidebarProps";
import { GuidedStepsDialog } from "@/components/ui/custom/dialogs/GuidedStepsDialog";
import { customerTicketGuide } from "@/constants/ticket/customerTicketGuide";
import { BookOpen } from "lucide-react";

const TICKET_STATUS_MAP: Partial<Record<string, StatusConfig>> = {
  "PENDING": { label: "Pending", colorPalette: "gray", icon: FileText },
  "CONFIRMED": { label: "Confirmed", colorPalette: "blue", icon: ShieldCheck },
  "COMPLETED": { label: "Completed", colorPalette: "green", icon: CheckCircle },
  "CANCELLED": { label: "Cancelled", colorPalette: "red", icon: Ban },
};

const STEPS = ["PENDING", "CONFIRMED", "COMPLETED"] as const;

export const TicketManagementSidebar = ({ ticket, isCancelled, isCompleted, onRefresh }: TicketManagementSidebarProps) => {
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const { handleCancelTicket, isMutating } = useTourManagement();
  const quote = useRefundQuote(ticket?.id, isCancelDialogOpen);

  const onCancelConfirm = async () => {
    if (!ticket?.id) return;
    await handleCancelTicket(ticket.id);
    setIsCancelDialogOpen(false);
    onRefresh();
  };

  return (
    <VStack gap={6} align="stretch" position="sticky" top="24px" hideFrom="print">
      <ContentCard
        w="full"
        header={
          <Text fontSize="xs" fontWeight="bold" color="fg.muted" letterSpacing="widest" textTransform="uppercase">
            Ticket Lifecycle
          </Text>
        }
      >
        <VStack gap={6} align="stretch">

          <StatusWorkflow
            currentStatus={ticket.ticketStatus}
            statusMap={TICKET_STATUS_MAP}
            steps={STEPS as unknown as string[]}
            isReadOnly
          />
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
                    Cancel this ticket. You see the exact refund before confirming.
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
{isCancelled && (
            <Box pt={5} borderTop="1px dashed" borderColor="red.200" color="red.500">
              <HStack>
                <Icon as={Ban} boxSize="5" />
                <Text fontSize="sm" fontWeight="medium">Booking is cancelled.</Text>
              </HStack>
            </Box>
          )}
        </VStack>
      </ContentCard>

      <GuidedStepsDialog
        title="How to use your ticket"
        description="Follow these steps for a smooth check-in and boarding experience."
        triggerLabel="Ticket instructions"
        triggerIcon={BookOpen}
        steps={customerTicketGuide}
        finalMessage="Keep this ticket available until the tour is completed. If anything changes, check your notifications for the latest instructions."
        buttonVariant="solid"
      />

      <ConfirmDialog
        open={isCancelDialogOpen}
        onClose={() => setIsCancelDialogOpen(false)}
        onConfirm={onCancelConfirm}
        title="Cancel Ticket"
        description="This action cannot be undone."
        message={refundMessage(quote)}
        icon={AlertTriangle}
        confirmText="Confirm Cancellation"
        colorPalette="red"
      />
    </VStack>
  );
};
