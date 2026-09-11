import type { AuditEventItem } from '@/interface/common/AuditEventItem';

export interface GenericAuditLogProps {
  events: AuditEventItem[];
  title?: string;
  emptyMessage?: string;
  initiallyVisibleCount?: number;
}
