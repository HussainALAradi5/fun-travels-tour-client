import type { TrackingItem } from "@/interfaces/common/TrackingItem";

export interface ActivityTimelineProps {
  items: TrackingItem[];
  initialVisibleMiddle?: number;
  animate?: boolean;
}
