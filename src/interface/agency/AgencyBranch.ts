import type { Agency } from './Agency';

export interface AgencyBranch {
  id?: number;
  branchName: string;
  branchAddress: string;
  contactNumber: string;
  ownerMobileNumber?: string;
  agency?: Agency;
  country?: { id?: number; famousName?: string };
  city?: { id?: number; name?: string };
  branchManager?: { id?: number; name?: string };
  active: boolean;
  employees?: { id?: number; name?: string }[];
}
