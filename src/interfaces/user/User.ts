import type { UserResponseDto } from "@/dtos/user/UserResponseDto";
import type { UserType } from "@/enums/UserType";

/** User as the server sends it; the shape is generated from the server DTO. */
export type User = UserResponseDto;

export const DEFAULT_USER: Partial<User> = {
  userName: "",
  name: "",
  email: "",
  age: 0,
  userType: "CUSTOMER" as UserType,
  mobileNumber: "",
  active: true,
};
