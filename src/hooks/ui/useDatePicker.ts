import { useMemo, useState } from "react";
import {
  addDays, addMonths, addYears, format, getYear, isBefore, parseISO, startOfMonth, startOfWeek, subMonths, subYears,
} from "date-fns";
import { CALENDAR_CELLS, ISO_DATE, YEARS_PER_PAGE } from "@/constants/ui/datePicker";
import type { DatePickerProps } from "@/interfaces/props/ui/DatePickerProps";
import type { ViewMode } from "@/types/ui/ViewMode";
import { isDisabledDay } from "@/utilities/datePickerDay";

/** Calendar navigation and single/range selection for DatePicker. */
export function useDatePicker({ value, onChange, valueEnd, onChangeEnd, range, onRangeChange, minDate }: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("days");
  // A fixed initial value keeps the server and first browser render identical.
  const [viewDate, setViewDate] = useState(() => new Date(2000, 0, 1));
  const [hoveredDay, setHoveredDay] = useState<Date>();

  const fromValue = range?.from ?? value;
  const toValue = range?.to ?? valueEnd;
  const isRangePicker = Boolean(onRangeChange || onChangeEnd);
  const from = useMemo(() => (fromValue ? parseISO(fromValue) : undefined), [fromValue]);
  const to = useMemo(() => (toValue ? parseISO(toValue) : undefined), [toValue]);

  const days = useMemo(() => {
    const start = startOfWeek(startOfMonth(viewDate));
    return Array.from({ length: CALENDAR_CELLS }, (_, i) => addDays(start, i));
  }, [viewDate]);

  const years = useMemo(() => {
    const startYear = getYear(viewDate) - (getYear(viewDate) % YEARS_PER_PAGE);
    return Array.from({ length: YEARS_PER_PAGE }, (_, i) => startYear + i);
  }, [viewDate]);

  const selectDay = (day: Date) => {
    if (isDisabledDay(day, minDate)) return;
    const dateStr = format(day, ISO_DATE);
    if (!isRangePicker) {
      onChange?.(dateStr);
      setOpen(false);
      return;
    }
    if (!from || to) {
      onChange?.(dateStr);
      onChangeEnd?.("");
      onRangeChange?.({ from: dateStr, to: "" });
      return;
    }
    const start = isBefore(day, from) ? dateStr : format(from, ISO_DATE);
    const end = isBefore(day, from) ? format(from, ISO_DATE) : dateStr;
    if (isBefore(day, from)) onChange?.(start);
    onChangeEnd?.(end);
    onRangeChange?.({ from: start, to: end });
    setOpen(false);
  };

  const navigate = (direction: "prev" | "next") => {
    const step = direction === "prev" ? -1 : 1;
    if (viewMode === "days") setViewDate(step < 0 ? subMonths(viewDate, 1) : addMonths(viewDate, 1));
    else if (viewMode === "months") setViewDate(step < 0 ? subYears(viewDate, 1) : addYears(viewDate, 1));
    else setViewDate(step < 0 ? subYears(viewDate, YEARS_PER_PAGE) : addYears(viewDate, YEARS_PER_PAGE));
  };

  const onOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen) setViewDate(from ?? new Date());
    else {
      setViewMode("days");
      setHoveredDay(undefined);
    }
  };

  const clear = () => {
    onChange?.("");
    onChangeEnd?.("");
    onRangeChange?.({ from: "", to: "" });
  };

  const showDays = (date: Date) => {
    setViewDate(date);
    setViewMode("days");
  };

  return {
    open, onOpenChange, viewMode, setViewMode, viewDate, showDays, hoveredDay, setHoveredDay,
    from, to, hasValue: Boolean(fromValue), isRangePicker, days, years, selectDay, navigate, clear,
  };
}
