export const AccountStatus = {
  ACTIVE: "ACTIVE",
  FROZEN: "FROZEN",
  CLOSED: "CLOSED"
} as const;
export type AccountStatus = (typeof AccountStatus)[keyof typeof AccountStatus];

export const AccountStatusColor = {
  ACTIVE: "green", FROZEN: "blue", CLOSED: "red",
} as const;
