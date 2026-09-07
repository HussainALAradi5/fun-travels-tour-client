import { UserType } from "@/enums/UserType";
import type { City } from "../CityInterface";
import type { Country } from "../CountryInterface";
import type { User } from "../UserInterface";
import type { AgencyBranch } from "./AgencyBranchInterface";

/**
 * Unified Agency interface.
 * Includes both IDs (for creation/updates) and Objects (for display).
 */
export interface Agency {
  id?: number;
  agencyName: string;
  address: string;
  contactNumber: string;
  ownerMobileNumber: string;

  // Foreign Key IDs (Used when sending data to backend)
  countryId?: number;
  cityId?: number;
  agencyOwnerId?: number;

  // Full Objects (Populated when receiving data from backend)
  country?: Partial<Country>;
  city?: Partial<City>;
  agencyOwner?: Partial<User>;
branches?: AgencyBranch[];
  userType: UserType;
  active: boolean;
}

/**
 * Default initial state for new Agency forms.
 * Ensures type safety without using 'any'.
 */
export const DEFAULT_AGENCY: Agency = {
  agencyName: "",
  address: "",
  contactNumber: "",
  ownerMobileNumber: "",
  // Required IDs initialized as undefined or 0 depending on your form logic
  countryId: undefined,
  cityId: undefined,
  agencyOwnerId: undefined,
  userType: UserType.OWNER,
  active: true,
};
