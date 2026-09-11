import type { Seat } from "@/interface/tour/Seat";

export interface SeatManagerTableProps {
  data: Seat[];
  loading: boolean;
  onEdit: (item: Seat) => void;
}
