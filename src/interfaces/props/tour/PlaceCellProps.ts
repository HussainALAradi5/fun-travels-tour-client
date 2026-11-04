import type { LucideIcon } from "lucide-react";
import type { CountrySummaryDto } from "@/dtos/geography/CountrySummaryDto";

export interface PlaceCellProps {
  country: CountrySummaryDto | null;
  cityName?: string;
  icon: LucideIcon;
  color: string;
}
