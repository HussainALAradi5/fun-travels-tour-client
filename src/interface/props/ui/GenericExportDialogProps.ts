import type { LucideIcon } from 'lucide-react';
export interface GenericExportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  data: Record<string, string | number>[];
  fileName: string;
  icon?: LucideIcon;
}


