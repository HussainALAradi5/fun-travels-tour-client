import type { Tour } from "../../tour/Tour";
import type { GuestConfig } from "./GuestConfigCardProps";

export interface BookingCheckoutCardProps {
  tour: Tour;
  guests: GuestConfig[];
  onConfirm: () => void;
  loading: boolean;
}
