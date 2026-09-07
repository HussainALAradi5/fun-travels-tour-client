// @/interface/Agency/AgencyBranchInterface.ts

import type { User } from "../UserInterface";
import type { Agency } from "./AgencyInterface";
import type { Country } from "../CountryInterface";
import type { City } from "../CityInterface";

export interface AgencyBranch {
  id?: number;
  branchName: string;
  branchAddress: string;
  contactNumber: string; // Matched to private String contactNumber
  ownerMobileNumber: string; // Matched to private String ownerMobileNumber
  agency?: Agency;
  country?: Country;
  city?: City;
  branchManager?: User; // Matched to private User branchManager
  active: boolean; // Matched to @JsonProperty("active") private boolean isActive
  employees?: User[]; // Matched to List<User> employees
}

export const DEFAULT_BRANCH: Partial<AgencyBranch> = {
  branchName: "",
  branchAddress: "",
  contactNumber: "",
  ownerMobileNumber: "",
  active: true,
};
