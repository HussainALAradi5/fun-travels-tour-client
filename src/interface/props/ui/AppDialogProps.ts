import type { LucideIcon } from 'lucide-react';
export interface AppDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  icon?: LucideIcon;
  colorPalette?: string;
  size?: "sm" | "md" | "lg" | "xl" | "xs" | "full";
  placement?: "top" | "bottom" | "center";
  scrollBehavior?: "inside" | "outside";
}


