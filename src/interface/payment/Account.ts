export interface Account {
  id?: number;
  accountNumber?: string;
  accountName?: string;
  user?: { id?: number; name?: string };
  balance: number;
  type: string;
  status: string;
  version?: number;
}
