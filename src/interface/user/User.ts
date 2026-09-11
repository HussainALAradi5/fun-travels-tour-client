import type { UserType } from '../../enums/UserType';
import type { AgencySummary } from '../tour/AgencySummary';
import type { BranchSummary } from '../tour/BranchSummary';

export interface User extends Record<string, unknown> {
  id?: number;
  userName: string;
  name: string;
  email: string;
  password?: string;
  age: number;
  userType: UserType;
  mobileNumber: string;
  profileImageUrl: string | null;
  base64Image?: string;
  agency?: Partial<AgencySummary> | null;
  agencyBranch?: Partial<BranchSummary> | null;
  active: boolean;
}

export const DEFAULT_USER: User = {
  userName: "",
  name: "",
  email: "",
  age: 0,
  userType: "CUSTOMER" as UserType,
  mobileNumber: "",
  profileImageUrl: null,
  active: true,
};
