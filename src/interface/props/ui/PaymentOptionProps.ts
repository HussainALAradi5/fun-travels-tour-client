import type { LucideIcon } from 'lucide-react';

export interface PaymentOptionProps {
  icon: LucideIcon;
  label: string;
  active: boolean;
  onClick: () => void;
  colorScheme?: string;
}
