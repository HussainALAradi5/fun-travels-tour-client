export const UserRequestAction = {
  ASSIGN: "ASSIGN",
  SOLVE: "SOLVE",
  REJECT: "REJECT",
} as const;

export type UserRequestAction =
  (typeof UserRequestAction)[keyof typeof UserRequestAction];
