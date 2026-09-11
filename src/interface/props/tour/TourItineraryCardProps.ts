import type { TrackingItem } from "@/interface/common/TrackingItem";
import type { Tour } from "@/interface/tour/Tour";
export interface TourItineraryCardProps {
  tour: Tour;
  itinerarySteps: TrackingItem[];
  onSeatOpen: () => void;
}




