import type { UserType } from '../../enums/UserType';

export interface UserResponse {
  id: number;
  userName: string;
  name: string;
  email: string;
  mobileNumber?: string;
  age?: number;
  userType: UserType;
  profileImageUrl?: string;
  active: boolean;
  agency?: { id: number; agencyName: string };
  agencyBranch?: { id: number; branchName: string };
}
