import type { User } from '../user/User';

export interface Account {
  id?: number;
  accountNumber?: string;
  accountName?: string;
  user?: Partial<User>;
  balance: number;
  type: string;
  status: string;
  version?: number;
}

export const DEFAULT_ACCOUNT: Partial<Account> = {
  accountNumber: "",
  accountName: "",
  balance: 0,
  type: "CUSTOMER_WALLET",
  status: "ACTIVE",
};
