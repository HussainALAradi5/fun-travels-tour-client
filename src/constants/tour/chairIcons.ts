import { Accessibility, Baby, Star, type LucideIcon } from "lucide-react";
import { ChairType } from "@/enums/tour-management/ChairType";

export const CHAIR_ICONS: Partial<Record<ChairType, LucideIcon>> = {
  [ChairType.PREMIUM_RECLINER]: Star,
  [ChairType.WHEELCHAIR_ACCESSIBLE]: Accessibility,
  [ChairType.KIDS_CHAIR]: Baby,
};
/** Seats per row before the aisle gap. */
export const SEATS_BEFORE_AISLE = 2;
export const SEATS_PER_ROW = 4;
