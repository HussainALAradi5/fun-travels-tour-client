import { Box } from "@chakra-ui/react";
import { AlertTriangle, Armchair } from "lucide-react";
import { ConfirmDialog } from "@/components/ui/custom/dialogs/ConfirmDialog";
import { GenericStatus } from "@/enums/GenericStatus";
import { SeatManager } from "../../seat/seat-management/SeatManager";
import { AppDialog } from "@/components/ui/custom/dialogs/AppDialog";
import type { TourDialogsProps } from "@/interfaces/props/tour/TourDialogsProps";

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
    <AppDialog
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
    </AppDialog>
  </>
);
