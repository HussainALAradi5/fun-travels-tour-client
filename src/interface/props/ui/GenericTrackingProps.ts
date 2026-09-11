import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

export interface GenericTrackingProps {
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
