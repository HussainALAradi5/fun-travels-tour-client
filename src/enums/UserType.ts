export const UserType = {
  ADMIN: "ADMIN",
  MANAGER: "MANAGER",
  EMPLOYEE: "EMPLOYEE",
  OWNER: "OWNER",
  CUSTOMER: "CUSTOMER",
  SUPPORT_AGENT: "SUPPORT_AGENT",
  DEVELOPER: "DEVELOPER",
} as const;

export type UserType = (typeof UserType)[keyof typeof UserType];

export const UserTypeColor = {
  ADMIN: "purple", MANAGER: "green", EMPLOYEE: "cyan", OWNER: "teal",
  CUSTOMER: "blue", SUPPORT_AGENT: "orange", DEVELOPER: "pink",
} as const;
