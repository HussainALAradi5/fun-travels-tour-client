import type { Seat } from "@/interface/tour/Seat";

export interface SeatPickerDialogProps {
  open: boolean;
  onClose: () => void;
  seats: Seat[];
  selectedId: number | null;
  onSelect: (seat: Seat) => void;
  loading?: boolean;
}
