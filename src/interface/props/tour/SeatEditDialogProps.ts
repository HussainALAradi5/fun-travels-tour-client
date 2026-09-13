import type { Seat } from "@/interface/tour/Seat";

export interface SeatEditDialogProps {
  open: boolean;
  onClose: () => void;
  seat: Seat | null;
  onSave: (seat: Seat) => Promise<void>;
  loading: boolean;
}
