/** Last day of a tour that starts on startDate and lasts `days` days (inclusive). */
export function calculateEndDate(startDate: string, days: number): string {
  if (!startDate || !days || days <= 0) return startDate || "";
  const date = new Date(startDate);
  date.setDate(date.getDate() + (Number(days) - 1));
  return date.toISOString().split("T")[0];
}
