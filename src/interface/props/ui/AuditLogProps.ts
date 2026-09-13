import type { AuditEventItem } from '@/interface/common/AuditEventItem';

export interface AuditLogProps {
  events: AuditEventItem[];
  title?: string;
  emptyMessage?: string;
  initiallyVisibleCount?: number;
}
