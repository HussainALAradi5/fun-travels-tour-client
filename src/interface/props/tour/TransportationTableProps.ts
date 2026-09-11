import type { Transportation } from "../../tour/Transportation";

export interface TransportationTableProps {
  data: Transportation[];
  isLoading: boolean;
  onViewDetails: (id: string) => void;
}
