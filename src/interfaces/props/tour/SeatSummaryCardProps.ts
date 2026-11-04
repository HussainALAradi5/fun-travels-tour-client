import type { ChairType } from "@/enums/tour-management/ChairType";

export interface SeatSummaryCardProps {
  totalSeats: number;
  totals: Partial<Record<ChairType, number>>;
  onManage: () => void;
}
