import type { Country } from '../geography/Country';
import type { City } from '../geography/City';
import type { User } from '../user/User';

export interface AgencyResponse {
  id: number;
  agencyName: string;
  address?: string;
  contactNumber?: string;
  ownerMobileNumber?: string;
  country?: Partial<Country>;
  city?: Partial<City>;
  agencyOwner?: Partial<User>;
  active: boolean;
}

export const DEFAULT_AGENCY_RESPONSE: Partial<AgencyResponse> = {
  agencyName: "",
  address: "",
  contactNumber: "",
  ownerMobileNumber: "",
  active: true,
};
