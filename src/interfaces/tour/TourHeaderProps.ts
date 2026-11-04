export interface TourHeaderProps {
  statusFilter: string[];
  onFilterChange: (values: string[]) => void;
  onCreateClick: () => void;
}
