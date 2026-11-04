import type { TrackingItem } from "@/interfaces/common/TrackingItem";
import type { Tour } from "@/interfaces/tour/Tour";
export interface TourItineraryCardProps {
  tour: Tour;
  itinerarySteps: TrackingItem[];
  onSeatOpen: () => void;
}




