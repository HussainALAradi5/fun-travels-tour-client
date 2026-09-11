import type { UserType } from '../../enums/UserType';

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
  agency?: { id?: number; agencyName?: string } | null;
  agencyBranch?: { id?: number; branchName?: string } | null;
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
