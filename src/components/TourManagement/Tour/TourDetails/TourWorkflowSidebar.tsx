import { useState, useMemo } from "react";
import { VStack, Box, Text, Heading, Icon, Button, Center } from "@chakra-ui/react";
import { XCircle, Edit3, ShieldCheck, Play, CheckCircle, FileText, RefreshCw, AlertTriangle } from "lucide-react";
import { GenericCard } from "@/components/ui/Custom/GenericCard";
import { GenericStatusWorkflow, type StatusConfig } from "@/components/ui/Custom/GenericStatusWorkflow";
import { GenericStatus } from "@/enums/GenericStatus";
import type { Tour } from "@/interface/tourmanagement/TourInterface";

interface TourWorkflowSidebarProps {
  tour: Tour;
  onStatusChange: (status: GenericStatus) => Promise<void>; 
  onEdit: () => void;
  onCancel: () => Promise<void> | void;
}

const TOUR_STATUS_MAP: Partial<Record<GenericStatus, StatusConfig>> = {
  [GenericStatus.PENDING]: { label: "Pending", colorPalette: "gray", icon: FileText },
  [GenericStatus.APPROVED]: { label: "Approved", colorPalette: "purple", icon: ShieldCheck },
  [GenericStatus.ACTIVE]: { label: "Active", colorPalette: "green", icon: Play },
  [GenericStatus.COMPLETED]: { label: "Completed", colorPalette: "blue", icon: CheckCircle },
};

const STEPS = [
  GenericStatus.PENDING, 
  GenericStatus.APPROVED, 
  GenericStatus.ACTIVE, 
  GenericStatus.COMPLETED
];

export const TourWorkflowSidebar = ({ tour, onStatusChange, onEdit, onCancel }: TourWorkflowSidebarProps) => {
  const [isRestoring, setIsRestoring] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);

  // --- OPTIMIZED BUSINESS LOGIC ---
  const { isCancelAllowed, isEditable, isCancelled } = useMemo(() => {
    const cancelledState = tour.status === GenericStatus.CANCELLED;
    const editableState = tour.status === GenericStatus.PENDING || tour.status === GenericStatus.APPROVED;
    
    let cancelAllowed = false;

    if (tour.startDate && tour.maxCapacity) {
      const today = new Date().getTime();
      const start = new Date(tour.startDate).getTime();
      const daysUntilStart = Math.ceil((start - today) / (1000 * 3600 * 24));
      
      const maxCap = tour.maxCapacity;
      const avail = tour.availableSlots ?? maxCap;
      const bookedSeats = maxCap - avail;
      
      // Rule: Must be >= 14 days away AND booked seats <= 33%
      cancelAllowed = daysUntilStart >= 14 && bookedSeats <= (maxCap / 3);
    }

    return {
      isCancelAllowed: cancelAllowed,
      isEditable: editableState,
      isCancelled: cancelledState
    };
  }, [tour.startDate, tour.maxCapacity, tour.availableSlots, tour.status]);

  const handleRestore = async () => {
    setIsRestoring(true);
    try {
      await onStatusChange(GenericStatus.PENDING);
    } finally {
      setIsRestoring(false);
    }
  };

  const handleCancel = async () => {
    setIsCancelling(true);
    try {
      await onCancel();
    } finally {
      setIsCancelling(false);
    }
  };

  return (
    <VStack gap="6" w="full">
      <GenericCard w="full" header={<Heading size="xs">Tour Process Lifecycle</Heading>}>
        <GenericStatusWorkflow
          currentStatus={tour.status as GenericStatus}
          statusMap={TOUR_STATUS_MAP}
          steps={STEPS}
          onStatusChange={onStatusChange}
        />
      </GenericCard>

      {/* CANCELLED STATE RECOVERY */}
      {isCancelled && (
        <GenericCard 
          w="full" 
          border="2px dashed" 
          borderColor="red.500/40" 
          bg={{ base: "red.50", _dark: "red.900/10" }}
        >
          <VStack gap="4" align="stretch" textAlign="center" py={2}>
            <Center w="48px" h="48px" bg={{ base: "red.100", _dark: "red.900/40" }} borderRadius="full" alignSelf="center" color="red.600">
              <Icon as={AlertTriangle} boxSize="6" />
            </Center>
            <Box>
              <Text fontSize="sm" fontWeight="black" color={{ base: "red.700", _dark: "red.400" }}>TOUR CANCELLED</Text>
              <Text fontSize="xs" color="fg.muted" mt={1} px={2}>
                This tour has been halted. Authorized staff can restore it to draft status to resume planning.
              </Text>
            </Box>
            <Button size="md" colorPalette="orange" onClick={handleRestore} loading={isRestoring} loadingText="Restoring..." borderRadius="xl">
              <Icon as={RefreshCw} mr={2} boxSize="4" /> Restore to Pending
            </Button>
          </VStack>
        </GenericCard>
      )}

      {/* DRAFT & DANGEROUS ACTIONS (Hidden if completely illegal to cancel/edit) */}
      {!isCancelled && (isEditable || isCancelAllowed) && (
        <GenericCard 
          w="full" 
          border="2px dashed" 
          borderColor="blue.500/30" 
          bg={{ base: "blue.50", _dark: "blue.900/10" }}
        >
           <VStack gap="3" align="stretch">
              <Text fontSize="xs" fontWeight="black" color="blue.600" letterSpacing="wider">
                MANAGEMENT ACTIONS
              </Text>
              
              {isEditable && (
                <Button size="sm" colorPalette="blue" onClick={onEdit} borderRadius="lg">
                  <Icon as={Edit3} mr={2} boxSize="4" /> Edit Tour Configuration
                </Button>
              )}
              
              {isCancelAllowed && (
                <Button 
                  size="sm" 
                  variant="outline" 
                  colorPalette="red" 
                  onClick={handleCancel}
                  loading={isCancelling}
                  borderRadius="lg"
                >
                  <Icon as={XCircle} mr={2} boxSize="4" /> Terminate Tour
                </Button>
              )}
           </VStack>
        </GenericCard>
      )}

      <Box w="full" p={5} borderRadius="2xl" border="1px solid" borderColor="border.subtle" bg="bg.panel">
        <Text fontSize="xs" fontWeight="black" color="fg.muted" mb={3} letterSpacing="wider">MISSION DESCRIPTION</Text>
        <Text fontSize="sm" lineHeight="tall" color="fg.default">
          {tour.description || "No description provided."}
        </Text>
      </Box>
    </VStack>
  );
};