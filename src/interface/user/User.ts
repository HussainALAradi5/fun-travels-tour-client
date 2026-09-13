import type { UserType } from '../../enums/UserType';
import type { Agency } from '../agency/Agency';
import type { AgencyBranch } from '../agency/AgencyBranch';

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
  agency?: Partial<Agency> | null;
  agencyBranch?: Partial<AgencyBranch> | null;
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
