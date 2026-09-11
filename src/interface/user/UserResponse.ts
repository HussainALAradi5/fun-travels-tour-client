import type { UserType } from '../../enums/UserType';
import type { User } from '../user/User';

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
  agency?: Partial<User>;
  agencyBranch?: Partial<User>;
}

export const DEFAULT_USER_RESPONSE: Partial<UserResponse> = {
  userName: "",
  name: "",
  email: "",
  active: true,
};
