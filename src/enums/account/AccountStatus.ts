export const AccountStatus = {
  ACTIVE: "ACTIVE",
  FROZEN: "FROZEN",
  CLOSED: "CLOSED"
} as const;
export type AccountStatus = (typeof AccountStatus)[keyof typeof AccountStatus];