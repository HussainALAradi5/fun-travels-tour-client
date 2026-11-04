import type { LucideIcon } from "lucide-react";
import type { ComponentVariant } from "@/enums/ComponentVariant";

export interface MetricCardProps {
  label: string;
  value: string | number;
  helperText?: string;
  icon?: LucideIcon;
  colorPalette?: string;
  variant?: ComponentVariant;
}
