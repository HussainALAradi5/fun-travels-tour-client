import { ChairTypeColor } from "@/enums/tour-management/ChairType";
import { SeatStatus, SeatStatusTheme } from "@/enums/tour-management/SeatStatus";
import type { Seat } from "@/interfaces/tour/Seat";

/** Visual state of one seat button in the picker. */
export function seatPickerStyles(seat: Seat, selected: boolean) {
  if (selected) return { bg: "blue.500", color: "white", border: "none", _hover: { bg: "blue.600" } };
  if (seat.status !== SeatStatus.AVAILABLE) {
    const theme = SeatStatusTheme[seat.status];
    return { bg: theme.light, _dark: { bg: theme.dark }, color: theme.text, border: "none", opacity: 0.5, cursor: "not-allowed", _hover: {} };
  }
  const palette = ChairTypeColor[seat.chairType];
  return {
    bg: "transparent", color: `${palette}.600`, _dark: { color: `${palette}.300` }, border: "1px solid", borderColor: `${palette}.400`,
    _hover: { transform: "translateY(-4px)", shadow: "md", bg: `${palette}.50`, _dark: { bg: `${palette}.900` } },
  };
}
