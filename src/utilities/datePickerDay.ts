import { isAfter, isBefore, isSameDay, isSameMonth, startOfDay } from "date-fns";
import type { DayCellState } from "@/interfaces/ui/DayCellState";
import type { DayStateInput } from "@/interfaces/ui/DayStateInput";


export const isDisabledDay = (day: Date, minDate?: Date) =>
  minDate ? isBefore(startOfDay(day), startOfDay(minDate)) : false;

/** Selection, range, and hover-preview state of one calendar cell. */
export function dayCellState({ day, viewDate, from, to, hoveredDay, isRangePicker, minDate }: DayStateInput): DayCellState {
  const selected = Boolean((from && isSameDay(day, from)) || (to && isSameDay(day, to)));
  const inRange = Boolean(from && to && isAfter(day, from) && isBefore(day, to));
  const previewing = isRangePicker && Boolean(from) && !to && Boolean(hoveredDay);
  const reversed = Boolean(from && hoveredDay && isBefore(hoveredDay, from));
  const previewStart = reversed ? hoveredDay : from;
  const previewEnd = reversed ? from : hoveredDay;
  const inPreview = Boolean(previewing && previewStart && previewEnd && isAfter(day, previewStart) && isBefore(day, previewEnd));
  return {
    disabled: isDisabledDay(day, minDate),
    selected,
    highlighted: inRange || inPreview,
    previewEnd: Boolean(previewing && hoveredDay && isSameDay(day, hoveredDay)),
    inCurrentMonth: isSameMonth(day, viewDate),
  };
}
