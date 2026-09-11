import type { FilterGroup } from "@/interface/common/FilterGroup";

export interface UnifiedFilterBarProps {
  searchLabel: string;
  searchPlaceholder?: string;
  searchValue: string;
  onSearchTrigger: (value: string) => void;
  filterLabel?: string;
  filterValue?: string;
  options?: { label: React.ReactNode; value: string; searchText?: string }[];
  onFilterChange?: (val: string) => void;
  filters?: FilterGroup[];
  count?: number;
  onReset: () => void;
}
