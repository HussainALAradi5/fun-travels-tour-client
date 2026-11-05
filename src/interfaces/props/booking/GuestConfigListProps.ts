import type { GuestConfig } from "../../common/GuestConfig";
import type { TravelerKind } from "@/types/booking/TravelerKind";

export interface GuestConfigListProps {
  guests: GuestConfig[];
  maxCapacity: number;
  onAddGuest: () => void;
  onRemoveGuest: (id: string) => void;
  onOpenSeatPicker: (id: string) => void;
  onOpenMealPicker: (id: string) => void;
  onKindChange: (id: string, kind: TravelerKind) => void;
}
