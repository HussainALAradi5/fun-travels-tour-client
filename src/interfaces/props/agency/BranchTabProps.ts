import type { AgencyBranch } from "../../agency/AgencyBranch";

export interface BranchTabProps {
  branches: AgencyBranch[];
  agencyId: number;
  agencyName: string;
  loading: boolean;
}
