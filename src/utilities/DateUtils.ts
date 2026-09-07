import { format, differenceInDays, parseISO } from "date-fns";

/**
 * Calculates the total duration of a tour.
 * Most travel agencies count the total days inclusive (Start to End).
 */
export const calculateTourDuration = (startDate: string, endDate: string): number => {
  if (!startDate || !endDate) return 1;
  try {
    const start = parseISO(startDate);
    const end = parseISO(endDate);
    // differenceInDays returns full 24h periods. We add 1 to include the last day.
    const days = differenceInDays(end, start) + 1;
    return days > 0 ? days : 1;
  } catch (error) {
    return 1;
  }
};

/**
 * Formats a date range into a readable string.
 * Example: "Feb 16 — Feb 22, 2026"
 */
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