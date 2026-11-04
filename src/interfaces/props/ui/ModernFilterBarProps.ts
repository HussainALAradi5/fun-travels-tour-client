import type { FilterOption } from "@/interfaces/common/FilterOption";

export interface ModernFilterBarProps {
  filterLabel: string;
  filterPlaceholder?: string;
  filterValue: string;
  onFilterChange: (val: string) => void;
  options: FilterOption[];
  useSearchButton?: boolean;
}
