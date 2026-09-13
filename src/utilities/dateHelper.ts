import { format, formatDistanceToNow, parseISO, isValid } from 'date-fns';

export function formatDate(date: string | Date | undefined | null): string {
  if (!date) return '';
  const parsed = typeof date === 'string' ? parseISO(date) : date;
  return isValid(parsed) ? format(parsed, 'MMM dd, yyyy') : '';
}

export function formatDateTime(date: string | Date | undefined | null): string {
  if (!date) return '';
  const parsed = typeof date === 'string' ? parseISO(date) : date;
  return isValid(parsed) ? format(parsed, 'MMM dd, yyyy HH:mm') : '';
}

export function formatRelativeTime(date: string | Date | undefined | null): string {
  if (!date) return '';
  const parsed = typeof date === 'string' ? parseISO(date) : date;
  return isValid(parsed) ? formatDistanceToNow(parsed, { addSuffix: true }) : '';
}

export function isDateInPast(date: string | Date | undefined | null): boolean {
  if (!date) return false;
  const parsed = typeof date === 'string' ? parseISO(date) : date;
  return isValid(parsed) && parsed < new Date();
}

export function daysBetween(start: string | Date, end: string | Date): number {
  const startDate = typeof start === 'string' ? parseISO(start) : start;
  const endDate = typeof end === 'string' ? parseISO(end) : end;
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}
