export interface LoginRequest extends Record<string, unknown> {
  identifier: string;
  password: string;
}
