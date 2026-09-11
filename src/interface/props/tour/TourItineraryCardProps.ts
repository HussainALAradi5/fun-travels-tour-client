import type { TrackingItem } from "@/interface/props/ui/GenericTrackingProps";
import type { Tour } from "@/interface/tour/Tour";
export interface TourItineraryCardProps {
  tour: Tour;
  itinerarySteps: TrackingItem[];
  onSeatOpen: () => void;
}




