import { AccountType } from "@/enums/account/AccountType";
import { AccountStatus } from "@/enums/account/AccountStatus";
import type { User } from "./UserInterface";

export interface Account {
  id?: number;
  accountNumber?: string;
  accountName?: string;
  user?: Partial<User>;
  balance: number;
  type: AccountType;
  status: AccountStatus;
  version?: number;
}

export const DEFAULT_ACCOUNT: Partial<Account> = {
  balance: 0.00,
  type: AccountType.CUSTOMER_WALLET,
  status: AccountStatus.ACTIVE,
};