import type { GuestConfig } from "../../common/GuestConfig";

export interface GuestConfigListProps {
  guests: GuestConfig[];
  maxCapacity: number;
  onAddGuest: () => void;
  onRemoveGuest: (id: string) => void;
  onOpenSeatPicker: (id: string) => void;
  onOpenMealPicker: (id: string) => void;
}
