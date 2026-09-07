import { UserType } from "../enums/UserType";
import type { Agency } from "./Agency/AgencyInterface";
import type { AgencyBranch } from "./Agency/AgencyBranchInterface";
import type { Account } from "./AccountInterface";

export interface User {
  id?: number;
  userName: string;
  name: string;
  email: string;
  password?: string;
  age: number;
  userType: UserType;
  mobileNumber: string;
  account?: Partial<Account> | null;
  profileImageUrl: string | null; 
  base64Image?: string;
  agency?: Partial<Agency> | null;
  agencyBranch?: Partial<AgencyBranch> | null;
  active: boolean;
}

export const DEFAULT_USER: User = {
  userName: "",
  name: "",
  email: "",
  userType: UserType.CUSTOMER,
  password: "",
  age: 0,
  mobileNumber: "",
  profileImageUrl: "",
  base64Image: "",
  agency: null,
  agencyBranch: null,
  active: true,
  account: null,

};
export const mapUsersToExportFormat = (users: User[]) => {
  if (users.length === 0) {
    return [{
      "Username": "",
      "Name": "",
      "Email": "",
      "Password": "",
      "Age": 0,
      "Mobile": "",
      
      "Role": "EMPLOYEE",
      "Branch": ""
    }];
  }

  return users.map(user => ({
    "Username": user.userName || "",
    "Name": user.name || "",
    "Email": user.email || "",
    "Password": "", // Keep blank for security
    "Age": user.age || 0,
    "Mobile": user.mobileNumber || "",
    "Role": user.userType || "EMPLOYEE",
    "Branch": user.agencyBranch?.branchName || ""
  }));
};