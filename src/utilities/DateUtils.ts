import { format, differenceInDays, parseISO } from "date-fns";
export const calculateTourDuration = (startDate: string, endDate: string): number => {
  if (!startDate || !endDate) return 1;
  try {
    const start = parseISO(startDate);
    const end = parseISO(endDate);
    const days = differenceInDays(end, start) + 1;
    return days > 0 ? days : 1;
  } catch {
    return 1;
  }
};
export const formatTourRange = (startDate: string, endDate: string): string => {
  if (!startDate || !endDate) return "Dates TBD";
  try {
    const start = format(parseISO(startDate), "MMM dd");
    const end = format(parseISO(endDate), "MMM dd, yyyy");
    return `${start} — ${end}`;
  } catch {
    return "Invalid Dates";
  }
};
