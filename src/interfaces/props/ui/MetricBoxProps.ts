import type { LucideIcon } from "lucide-react";

export interface MetricBoxProps {
  icon: LucideIcon;
  color: string;
  label: string;
  children: React.ReactNode;
  bg?: string;
}
