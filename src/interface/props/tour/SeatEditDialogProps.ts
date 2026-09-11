import type { Seat } from "../../tour/Seat";

export interface SeatEditDialogProps {
  isOpen: boolean;
  onClose: () => void;
  seat: Seat;
  transportId: number;
}
