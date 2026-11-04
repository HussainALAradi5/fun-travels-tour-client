import type { Seat } from "@/interfaces/tour/Seat";

export interface SeatManagerTableProps {
  data: Seat[];
  loading: boolean;
  onEdit: (item: Seat) => void;
}
