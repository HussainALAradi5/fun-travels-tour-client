import type { Agency } from "@/interfaces/agency/Agency";

export interface AgencyTableProps {
  data: Agency[];
  loading: boolean;
  onAddBranch: (id: number) => void;
  onViewDetail: (id: number) => void;
}
