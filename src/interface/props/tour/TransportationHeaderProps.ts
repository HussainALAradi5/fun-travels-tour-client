export interface TransportationHeaderProps {
  count: number;
  searchValue: string;
  onSearch: (val: string) => void;
  typeFilterValue: string;
  statusFilterValue: string;
  onTypeFilterChange: (val: string) => void;
  onStatusFilterChange: (val: string) => void;
  onAdd: () => void;
  onReset: () => void;
}
