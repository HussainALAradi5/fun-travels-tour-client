export interface FilterOption {
  label: string;
  value: string;
}

export interface ModernFilterBarProps {
  filterLabel: string;
  filterPlaceholder?: string;
  filterValue: string;
  onFilterChange: (val: string) => void;
  options: FilterOption[];
  useSearchButton?: boolean;
}
