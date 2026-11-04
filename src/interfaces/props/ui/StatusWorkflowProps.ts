import type { StatusConfig } from '@/interfaces/common/StatusConfig';

export interface StatusWorkflowProps<T extends string> {
  currentStatus: T;
  statusMap: Partial<Record<T, StatusConfig>>;
  steps: T[];
  onStatusChange?: (status: T) => void;
  isReadOnly?: boolean;
}
