import type { LucideIcon } from "lucide-react";

export interface PriceLineProps {
  label: string;
  amount: number;
  icon?: LucideIcon;
  iconColor?: string;
  highlight?: boolean;
}
