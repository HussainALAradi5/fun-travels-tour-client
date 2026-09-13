import type { LucideIcon } from "lucide-react";

export interface GuideStep {
  id: string;
  title: string;
  description: string;
  icon?: LucideIcon;
  note?: string;
}
