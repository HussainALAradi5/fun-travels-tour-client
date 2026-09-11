import type { AgencyBranch } from "../../agency/AgencyBranch";

export interface BranchTabProps {
  branches: AgencyBranch[];
  agencyName: string;
  loading: boolean;
}
