export interface AgencyBranchResponse {
  id: number;
  branchName: string;
  branchAddress?: string;
  contactNumber?: string;
  agency?: { id: number; agencyName: string };
  branchManager?: { id: number; name: string };
  active: boolean;
}
