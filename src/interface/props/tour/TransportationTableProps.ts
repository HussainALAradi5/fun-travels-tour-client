import type { Transportation } from "@/interface/tour/Transportation";

export interface TransportationTableProps {
  data: Transportation[];
  loading: boolean;
  onEdit: (item: Transportation) => void;
  onView: (id: string) => void;
}
