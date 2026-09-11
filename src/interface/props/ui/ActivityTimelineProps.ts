import type { LucideIcon } from 'lucide-react';

export interface ActivityTimelineProps {
  items: TrackingItem[];
  initialVisibleMiddle?: number;
  animate?: boolean;
}

export interface TrackingItem {
  id: string;
  title: string;
  description?: string;
  color: string;
  glowColor?: string;
  icon?: LucideIcon;
  timestamp?: string;
  status?: string;
}
