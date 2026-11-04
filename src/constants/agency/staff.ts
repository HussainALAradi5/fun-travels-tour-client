import { UserType } from "@/enums/UserType";

export const ALL_ROLES = "ALL";
export const STAFF_MANAGEMENT_ROLES: ReadonlySet<UserType> = new Set([UserType.ADMIN, UserType.OWNER, UserType.MANAGER]);
export const STAFF_ROLE_OPTIONS = [
  { label: "All", value: ALL_ROLES },
  { label: "Manager", value: UserType.MANAGER },
  { label: "Employee", value: UserType.EMPLOYEE },
];
