import type { UserType } from "@/enums/UserType";

/** Mirrors the server EmployeeCreateRequest. */
export interface EmployeeCreateRequest {
  userName: string;
  name: string;
  email: string;
  password: string;
  mobileNumber: string;
  age?: number;
  userType: UserType;
}
