import type { Seat } from "../../tour/Seat";

export interface SeatPickerDialogProps {
  isOpen: boolean;
  onClose: () => void;
  transportId: number;
  onSelect: (seat: Seat) => void;
}
