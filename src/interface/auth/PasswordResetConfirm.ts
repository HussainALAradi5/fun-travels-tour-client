export interface PasswordResetConfirm {
  identifier: string;
  baseNumber?: string;
  token: string;
  newPassword: string;
}
