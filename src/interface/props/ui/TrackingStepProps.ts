import type { LucideIcon } from "lucide-react";

export interface TrackingStepProps {
  icon: LucideIcon;
  bg: string;
  title: string;
  location?: string;
  glowColor: string;
  animate?: boolean;
}
