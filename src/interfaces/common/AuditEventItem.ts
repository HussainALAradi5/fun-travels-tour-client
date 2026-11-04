export interface AuditEventItem {
  id: number;
  actorName: string;
  action: string;
  description?: string;
  createdAt: string;
}
