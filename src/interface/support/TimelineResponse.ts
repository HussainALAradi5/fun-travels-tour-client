import type { Comment } from "./Comment";
import type { EventLog } from "./EventLog";

export interface TimelineResponse {
  events: EventLog[];
  comments: Comment[];
}
