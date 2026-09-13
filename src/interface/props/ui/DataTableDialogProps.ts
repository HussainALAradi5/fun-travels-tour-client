import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import type { DataTableProps } from '@/interface/props/ui/DataTableProps';

export interface DataTableDialogProps<T> {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  icon?: LucideIcon;
  tableProps: DataTableProps<T>;
  topContent?: ReactNode;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "full";
  colorPalette?: string;
}
