export const AccountType = {
  CUSTOMER_WALLET: "CUSTOMER_WALLET",
  AGENCY_WALLET: "AGENCY_WALLET",
  SYSTEM_WALLET: "SYSTEM_WALLET"
} as const;
export type AccountType = (typeof AccountType)[keyof typeof AccountType];

export const AccountTypeColor = {
  CUSTOMER_WALLET: "blue", AGENCY_WALLET: "teal", SYSTEM_WALLET: "purple",
} as const;
