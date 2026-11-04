import type { User } from "../user/User";

export interface AuthSession {
  token: string;
  user: User;
}
