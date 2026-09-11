import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import type { GenericTableProps } from '@/interface/props/ui/GenericTableProps';

export interface GenericTableDialogProps<T> {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  icon?: LucideIcon;
  tableProps: GenericTableProps<T>;
  topContent?: ReactNode;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "full";
  colorPalette?: string;
}
