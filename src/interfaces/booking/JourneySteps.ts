import type { TrackingItem } from "@/interfaces/common/TrackingItem";

/** The ticket's journey as timeline steps, plus one sentence on what happens next. */
export interface JourneySteps {
  items: TrackingItem[];
  next: string;
}
