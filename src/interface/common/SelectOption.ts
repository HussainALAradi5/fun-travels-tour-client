import type { LucideIcon } from "lucide-react";

export interface SelectOption {
  label: string;
  value: string | number | boolean;
  icon?: LucideIcon;
}
