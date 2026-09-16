import type { ChairType } from "@/enums/tourmanagement/ChairType";

export interface SeatManagerHeaderProps {
  count: number;
  searchValue: string;
  onSearch: (val: string) => void;
  typeFilterValue: string;
  onTypeFilterChange: (val: string) => void;
  statusFilterValue: string;
  onStatusFilterChange: (val: string) => void;
  onReset: () => void;
  totals: Partial<Record<ChairType, number>>;
  totalSeats: number;
}
