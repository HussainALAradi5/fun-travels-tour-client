import type { FilterGroup } from "@/interface/common/FilterGroup";
import type { FilterOption } from "@/interface/common/FilterOption";

export interface UnifiedFilterBarProps {
  searchLabel: string;
  searchPlaceholder?: string;
  searchValue: string;
  onSearchTrigger: (value: string) => void;
  filterLabel?: string;
  filterValue?: string;
  options?: FilterOption[];
  onFilterChange?: (val: string) => void;
  filters?: FilterGroup[];
  count?: number;
  onReset: () => void;
}
