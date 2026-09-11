import { useState, useEffect, useMemo } from "react";
import { Box, SimpleGrid, useDisclosure, Grid } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { MapPin, Navigation } from "lucide-react";

import type { Tour } from "@/interface/tour/Tour";
import type { Ticket } from "@/interface/tour/Ticket";
import { GenericStatus } from "@/enums/GenericStatus";
import { floatIn } from "@/utilities/Animations";

import { TourHeader } from "./TourDetails/TourHead";
import { TourMetrics } from "./TourDetails/TourMetrics";
import { TourItineraryCard } from "./TourDetails/TourItineraryCard";
import { TourWorkflowSidebar } from "./TourDetails/TourWorkflowSidebar";
import { TourPassengerManifest } from "./TourDetails/TourPassengerManifest";
import { TourDialogs } from "./TourDetails/TourDialogs";
import { TourEventLogDetailView } from "./TourDetails/TourEventLogDetailView";

import { useTourManagement } from "@/hooks/tourManagement/useTourManagement";
import { ticketService } from "@/Api/tourmanagement/Ticket";
import type { TourDetailViewProps } from "@/interface/props/tour/TourDetailViewProps";

export const TourDetailView = ({ tour: initialTour }: TourDetailViewProps) => {
  const navigate = useNavigate();
  const { handleUpdateTourStatus, isMutating } = useTourManagement();

  const [currentTour, setCurrentTour] = useState<Tour>(initialTour);
  const [pendingStatus, setPendingStatus] = useState<GenericStatus | null>(null);

  const [tourTickets, setTourTickets] = useState<Ticket[]>([]);

  const { open: seatOpen, onOpen: onSeatOpen, onClose: onSeatClose } = useDisclosure();
  const { open: confirmOpen, onOpen: onConfirmOpen, onClose: onConfirmClose } = useDisclosure();

  useEffect(() => {
    if (initialTour?.id) {
      ticketService.filter({ tourId: initialTour.id })
        .then((res: Ticket[]) => setTourTickets(res || []))
        .catch((err) => console.error("Failed to load passenger tickets:", err));
    }
  }, [initialTour]);

  const handleStatusUpdate = async () => {
    if (pendingStatus && currentTour.id) {
      const success = await handleUpdateTourStatus(currentTour.id, pendingStatus);
      if (success) {
        setCurrentTour({ ...currentTour, status: pendingStatus });
        onConfirmClose();
      }
    }
  };

  const itinerarySteps = useMemo(() => [
    {
      id: "start",
      title: "Departure",
      description: `${currentTour.startCity?.name || 'N/A'}, ${currentTour.startCity?.country?.officialName || ''}`,
      icon: MapPin,
      color: "blue.500",
      glowColor: "rgba(66, 153, 225, 0.5)",
    },
    ...(currentTour.destinationCountries?.map((country) => ({
      id: country.id!.toString(),
      title: country.officialName,
      description: "",
      icon: Navigation,
      color: "gray.400",
      glowColor: "rgba(160, 174, 192, 0.3)",
    })) || []),
    {
      id: "end",
      title: "Arrival",
      description: `${currentTour.endCity?.name || 'N/A'}, ${currentTour.endCity?.country?.officialName || ''}`,
      icon: Navigation,
      color: "green.500",
      glowColor: "rgba(72, 187, 120, 0.5)",
    }
  ], [currentTour]);

  return (
    <Box animation={`${floatIn} 0.6s ease-out`} p="4" opacity={isMutating ? 0.7 : 1} pointerEvents={isMutating ? "none" : "auto"}>
      <TourHeader tour={currentTour} />

      <Box mt="6" mb="8">
        <TourMetrics tour={currentTour} bookedCount={tourTickets.length} />
      </Box>

      <SimpleGrid columns={{ base: 1, lg: 3 }} gap="8">
        <Box gridColumn={{ lg: "span 2" }}>
            <TourItineraryCard
                tour={currentTour}
                itinerarySteps={itinerarySteps as never}
                onSeatOpen={onSeatOpen}
            />
        </Box>

        <TourWorkflowSidebar
          tour={currentTour}
          onStatusChange={async (status) => {
            setPendingStatus(status);
            onConfirmOpen();
          }}
          onEdit={() => navigate(`/admin/tours/edit/${currentTour.id}`)}
          onCancel={() => {
            setPendingStatus(GenericStatus.CANCELLED);
            onConfirmOpen();
          }}
        />
      </SimpleGrid>
<Grid templateColumns={{ base: "1fr", xl: "2fr 1fr" }} gap={8} mt="8" alignItems="start">
        <Box>
          <TourPassengerManifest tickets={tourTickets} />
        </Box>

        <Box>
{currentTour.id && <TourEventLogDetailView tourId={currentTour.id} />}
        </Box>
      </Grid>

      <TourDialogs
        confirmOpen={confirmOpen}
        onConfirmClose={onConfirmClose}
        seatOpen={seatOpen}
        onSeatClose={onSeatClose}
        pendingStatus={pendingStatus}
        onConfirm={handleStatusUpdate}
        transportId={currentTour.transportation?.id}
      />
    </Box>
  );
};




