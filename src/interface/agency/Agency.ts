import type { UserType } from '../../enums/UserType';

export interface Agency {
  id?: number;
  agencyName: string;
  address: string;
  contactNumber: string;
  ownerMobileNumber: string;
  countryId?: number;
  cityId?: number;
  agencyOwnerId?: number;
  country?: { id?: number; famousName?: string };
  city?: { id?: number; name?: string };
  agencyOwner?: { id?: number; name?: string; email?: string };
  branches?: AgencyBranch[];
  userType: UserType;
  active: boolean;
}

interface AgencyBranch {
  id?: number;
  branchName: string;
  branchAddress: string;
  contactNumber: string;
  active: boolean;
}
