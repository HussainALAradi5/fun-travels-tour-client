import type { GuestConfig } from "../../common/GuestConfig";
import type { TravelerKind } from "@/types/booking/TravelerKind";

export interface GuestConfigCardProps {
  guest: GuestConfig;
  onOpenSeatPicker: (id: string) => void;
  onOpenMealPicker: (id: string) => void;
  onRemove?: (id: string) => void;
  onKindChange?: (id: string, kind: TravelerKind) => void;
}
