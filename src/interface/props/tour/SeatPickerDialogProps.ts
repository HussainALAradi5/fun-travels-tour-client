import type { Seat } from "@/interface/tour/Seat";

export interface SeatPickerDialogProps {
  open: boolean;
  onClose: () => void;
  seats: Seat[];
  selectedId: number | null;
  onSelect: (seat: Seat) => void;
  loading?: boolean;
}

export interface LegendItemProps {
  colorPalette?: string;
  bg?: string;
  color?: string;
  label: string;
  icon?: typeof import("lucide-react").Armchair;
  fill?: boolean;
  opacity?: number;
}
