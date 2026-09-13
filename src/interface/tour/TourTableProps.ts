import type { Tour } from './Tour';

export interface TourTableProps {
  data: Tour[];
  isLoading: boolean;
  onViewDetails: (id: string) => void;
}
