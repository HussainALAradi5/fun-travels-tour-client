import type { GuestConfig } from "../../common/GuestConfig";

export interface GuestConfigCardProps {
  guest: GuestConfig;
  onOpenSeatPicker: (id: string) => void;
  onOpenMealPicker: (id: string) => void;
  onRemove?: (id: string) => void;
}
