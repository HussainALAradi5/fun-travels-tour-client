import type { LucideIcon } from 'lucide-react';
export interface TrackingStepProps {
  icon: LucideIcon;
  bg: string;
  title: string;
  location?: string;
  glowColor: string;
  animate?: boolean;
}

export interface MetricBoxProps {
  icon: LucideIcon;
  color: string;
  label: string;
  children: React.ReactNode;
  bg?: string;
}


