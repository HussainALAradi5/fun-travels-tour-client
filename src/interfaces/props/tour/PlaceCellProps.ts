import type { LucideIcon } from "lucide-react";
import type { Country } from "../../geography/Country";

export interface PlaceCellProps {
  country?: Partial<Country>;
  cityName?: string;
  icon: LucideIcon;
  color: string;
}
