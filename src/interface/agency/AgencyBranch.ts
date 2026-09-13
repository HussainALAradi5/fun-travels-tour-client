import type { Agency } from './Agency';
import type { Country } from '../geography/Country';
import type { City } from '../geography/City';
import type { User } from '../user/User';

export interface AgencyBranch {
  id?: number;
  branchName: string;
  branchAddress: string;
  contactNumber: string;
  ownerMobileNumber?: string;
  agency?: Partial<Agency>;
  country?: Partial<Country>;
  city?: Partial<City>;
  branchManager?: Partial<User>;
  active: boolean;
  employees?: Partial<User>[];
}

export const DEFAULT_BRANCH: Partial<AgencyBranch> = {
  branchName: "",
  branchAddress: "",
  contactNumber: "",
  active: true,
};
