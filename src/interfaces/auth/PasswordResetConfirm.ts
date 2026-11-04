export interface PasswordResetConfirm {
  identifier: string;
  token: string;
  newPassword: string;
}
