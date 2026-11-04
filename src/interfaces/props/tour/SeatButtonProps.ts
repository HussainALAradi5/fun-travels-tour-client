import type { Seat } from "../../tour/Seat";

export interface SeatButtonProps {
  seat: Seat;
  selected: boolean;
  disabled: boolean;
  onSelect: (seat: Seat) => void;
}
