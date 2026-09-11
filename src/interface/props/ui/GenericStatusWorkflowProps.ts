import type { StatusConfig } from '@/interface/common/StatusConfig';

export interface GenericStatusWorkflowProps<T extends string> {
  currentStatus: T;
  statusMap: Partial<Record<T, StatusConfig>>;
  steps: T[];
  onStatusChange?: (status: T) => void;
  isReadOnly?: boolean;
}
