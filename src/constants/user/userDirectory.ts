import { UserType } from "@/enums/UserType";
import { IMAGES } from "@/constants/ui/images";

export const ALL_USER_ROLES = "ALL";
export const USER_ROLE_OPTIONS = [
  { label: "All Roles", value: ALL_USER_ROLES },
  { label: "Admin", value: UserType.ADMIN },
  { label: "Owner", value: UserType.OWNER },
  { label: "Manager", value: UserType.MANAGER },
  { label: "Employee", value: UserType.EMPLOYEE },
  { label: "Customer", value: UserType.CUSTOMER },
  { label: "Support Agent", value: UserType.SUPPORT_AGENT },
  { label: "Developer", value: UserType.DEVELOPER },
];
export const USERS_BANNER = IMAGES.defaultHero;
