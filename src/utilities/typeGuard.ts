import type { TimelineItem } from '../interfaces/support/TimelineItem';
import type { GenericComment } from '../interfaces/support/GenericComment';
import type { GenericEventLog } from '../interfaces/support/GenericEventLog';

export function isComment(item: TimelineItem): item is GenericComment {
  return 'content' in item && 'author' in item;
}

export function isEventLog(item: TimelineItem): item is GenericEventLog {
  return 'action' in item && 'actor' in item;
}

export function isNotNull<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

export function isEmpty(value: string | null | undefined): boolean {
  return !value || value.trim().length === 0;
}

export function isNotEmpty(value: string | null | undefined): boolean {
  return !isEmpty(value);
}

