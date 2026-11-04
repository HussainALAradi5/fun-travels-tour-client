import type { LucideIcon } from 'lucide-react';
export interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description?: string;
  message?: string;
  icon?: LucideIcon;
  confirmLabel?: string;
  confirmText?: string;
  cancelText?: string;
  colorPalette?: string;
  placement?: "top" | "bottom" | "center";
}


