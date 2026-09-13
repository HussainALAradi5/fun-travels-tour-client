import type { Tour } from "../../tour/Tour";
import type { GuestConfig } from "../../common/GuestConfig";

export interface BookingCheckoutCardProps {
  tour: Tour;
  guests: GuestConfig[];
  onConfirm: () => void;
  loading: boolean;
}
