import type { UserType } from '../../enums/UserType';
import type { Country } from '../geography/Country';
import type { City } from '../geography/City';
import type { User } from '../user/User';
import type { AgencyBranch } from './AgencyBranch';

export interface Agency {
  id?: number;
  agencyName: string;
  address: string;
  contactNumber: string;
  ownerMobileNumber: string;
  countryId?: number;
  cityId?: number;
  agencyOwnerId?: number;
  country?: Partial<Country>;
  city?: Partial<City>;
  agencyOwner?: Partial<User>;
  branches?: AgencyBranch[];
  userType: UserType;
  active: boolean;
}

export const DEFAULT_AGENCY: Partial<Agency> = {
  agencyName: "",
  address: "",
  contactNumber: "",
  ownerMobileNumber: "",
  active: true,
};
