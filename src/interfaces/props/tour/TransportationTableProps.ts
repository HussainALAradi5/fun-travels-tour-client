import type { Transportation } from "@/interfaces/tour/Transportation";

export interface TransportationTableProps {
  data: Transportation[];
  loading: boolean;
  onEdit: (item: Transportation) => void;
  onView: (id: string) => void;
}
