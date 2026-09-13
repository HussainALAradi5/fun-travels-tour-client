import type { TrackingItem } from "@/interface/common/TrackingItem";

export interface ActivityTimelineProps {
  items: TrackingItem[];
  initialVisibleMiddle?: number;
  animate?: boolean;
}
