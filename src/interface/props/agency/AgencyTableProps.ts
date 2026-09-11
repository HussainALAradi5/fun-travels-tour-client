import type { Agency } from "@/interface/agency/Agency";

export interface AgencyTableProps {
  data: Agency[];
  loading: boolean;
  onAddBranch: (id: number) => void;
  onViewDetail: (id: number) => void;
}
