import type { Seat } from "../../tour/Seat";

export interface SeatManagerTableProps {
  data: Seat[];
  isLoading: boolean;
  transportId: number;
  onRefresh: () => void;
}
