import type { LucideIcon } from 'lucide-react';
export interface SmartLinkProps {
  to: string;
  children: React.ReactNode;
  icon?: LucideIcon;
  badge?: string | number;
  isActive?: boolean;
}


