import type { User } from '../user/User';

export interface AgencyBranchResponse {
  id: number;
  branchName: string;
  branchAddress?: string;
  contactNumber?: string;
  agency?: { id: number; agencyName: string };
  branchManager?: Partial<User>;
  active: boolean;
}

export const DEFAULT_AGENCY_BRANCH_RESPONSE: Partial<AgencyBranchResponse> = {
  branchName: "",
  branchAddress: "",
  contactNumber: "",
  active: true,
};
