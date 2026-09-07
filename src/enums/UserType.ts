export const UserType = {
  ADMIN: "ADMIN",
  MANAGER: "MANAGER",
  EMPLOYEE: "EMPLOYEE",
  OWNER: "OWNER",
  CUSTOMER: "CUSTOMER",
  SUPPORT_AGENT: "SUPPORT_AGENT"
};

export type UserType = (typeof UserType)[keyof typeof UserType];
