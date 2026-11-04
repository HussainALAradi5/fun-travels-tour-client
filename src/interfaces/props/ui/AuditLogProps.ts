import type { AuditEventItem } from '@/interfaces/common/AuditEventItem';

export interface AuditLogProps {
  events: AuditEventItem[];
  title?: string;
  emptyMessage?: string;
  initiallyVisibleCount?: number;
}
