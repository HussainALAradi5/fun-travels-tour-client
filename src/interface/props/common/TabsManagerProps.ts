import type { LucideIcon } from 'lucide-react';

export interface TabItem {
  value: string;
  label: string;
  icon: LucideIcon;
  path: string;
  isNotification?: boolean;
}
