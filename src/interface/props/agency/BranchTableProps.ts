import type { AgencyBranch } from "../../agency/AgencyBranch";

export interface BranchTableProps {
  data?: AgencyBranch[];
  branches?: AgencyBranch[];
  agencyName?: string;
  loading?: boolean;
  isLoading?: boolean;
}
