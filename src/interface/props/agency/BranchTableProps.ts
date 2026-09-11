import type { AgencyBranch } from "../../agency/AgencyBranch";

export interface BranchTableProps {
  data: AgencyBranch[];
  isLoading: boolean;
}
