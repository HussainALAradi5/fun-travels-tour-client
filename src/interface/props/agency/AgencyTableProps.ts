import type { Agency } from "../../agency/Agency";

export interface AgencyTableProps {
  data: Agency[];
  isLoading: boolean;
  onViewDetails: (id: number) => void;
}
