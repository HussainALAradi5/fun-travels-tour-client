import type { GuestConfig } from "./GuestConfigCardProps";

export type { GuestConfig };

export interface GuestConfigListProps {
  guests: GuestConfig[];
  maxCapacity: number;
  onAddGuest: () => void;
  onRemoveGuest: (id: number) => void;
  onOpenSeatPicker: (id: string) => void;
  onOpenMealPicker: (id: string) => void;
}
