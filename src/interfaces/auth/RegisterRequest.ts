export interface RegisterRequest extends Record<string, unknown> {
  userName: string;
  name: string;
  email: string;
  password: string;
  mobileNumber?: string;
  age?: number;
}
