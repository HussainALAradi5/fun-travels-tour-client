import type { TrackingItem } from '@/components/ui/Custom/GenericTracking';
import type { Tour } from "@/interface/tour/Tour";
export interface TourItineraryCardProps {
  tour: Tour;
  itinerarySteps: TrackingItem[];
  onSeatOpen: () => void;
}




