import type { LucideIcon } from "lucide-react";

export interface InfoCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  subValue?: string;
}
