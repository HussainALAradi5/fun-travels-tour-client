export interface SeatManagerHeaderProps {
  count: number;
  searchValue: string;
  onSearch: (val: string) => void;
  typeFilterValue: string;
  onTypeFilterChange: (val: string) => void;
  statusFilterValue: string;
  onStatusFilterChange: (val: string) => void;
  onReset: () => void;
  totals: Record<string, number>;
  totalSeats: number;
}
