import type { ReactNode } from "react";
import type { UserType } from "@/enums/UserType";

export interface RouteGuardProps {
  children: ReactNode;
  admin?: boolean;
  allowedUserTypes?: readonly UserType[];
}
