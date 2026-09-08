import type { User } from '../user/User';

export interface LoginRequest {
  identifier: string;
  password: string;
}

export interface RegisterRequest {
  userName: string;
  name: string;
  email: string;
  password: string;
  mobileNumber?: string;
  age?: number;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface PasswordResetRequest {
  email: string;
  baseNumber?: string;
}

export interface PasswordResetConfirm {
  identifier: string;
  baseNumber?: string;
  token: string;
  newPassword: string;
}
