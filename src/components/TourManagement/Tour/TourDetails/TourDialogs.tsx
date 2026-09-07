import { Box } from "@chakra-ui/react";
import { AlertTriangle, Armchair } from "lucide-react";
import { ConfirmDialog } from "@/components/ui/Custom/Dialogs/ConfirmDialog";
import { GenericStatus } from "@/enums/GenericStatus";
import { SeatManager } from "../../Seat/SeatManagement/SeatManager";
import { GenericDialog } from "@/components/ui/Custom/Dialogs/GenericDialog";

interface TourDialogsProps {
  confirmOpen: boolean;
  onConfirmClose: () => void;
  seatOpen: boolean;
  onSeatClose: () => void;
  pendingStatus: GenericStatus | null;
  // This must match the signature of your handleStatusUpdate
  onConfirm: () => Promise<void>;
  transportId?: number; // Made optional to prevent crashes if undefined
}

export const TourDialogs = ({
  confirmOpen,
  onConfirmClose,
  seatOpen,
  onSeatClose,
  pendingStatus,
  onConfirm,
  transportId,
}: TourDialogsProps) => (
  <>
    <ConfirmDialog
      open={confirmOpen}
      onClose={onConfirmClose}
      onConfirm={onConfirm}
      title="Confirm Status Change"
      message={`Warning: Transitioning this tour to ${pendingStatus} will affect current bookings.`}
      icon={AlertTriangle}
      colorPalette={pendingStatus === GenericStatus.CANCELLED ? "red" : "blue"}
    />
    <GenericDialog
      open={seatOpen}
      onClose={onSeatClose}
      title="Cabin Seating"
      icon={Armchair}
    >
      <Box py={4}>
        {transportId ? (
          <SeatManager transportId={transportId} />
        ) : (
          <Box p={4} textAlign="center">
            No transportation assigned to this tour.
          </Box>
        )}
      </Box>
    </GenericDialog>
  </>
);
