export const UserRequestStatus  = {
  PENDING : 'PENDING',
  APPROVED : 'APPROVED',
  REJECTED : 'REJECTED',
  CONFIRMED : 'CONFIRMED',
  CANCELLED : 'CANCELLED',
  COMPLETED : 'COMPLETED',
  ACTIVE : 'ACTIVE',
  INACTIVE : 'INACTIVE',
  SOLVED : 'SOLVED',
  UNSOLVED : 'UNSOLVED'
} as const;
export type UserRequestStatus = (typeof UserRequestStatus)[keyof typeof UserRequestStatus];

export const UserRequestStatusColor = {
  PENDING: "blue", APPROVED: "teal", REJECTED: "red", CONFIRMED: "purple",
  CANCELLED: "orange", COMPLETED: "green", ACTIVE: "cyan", INACTIVE: "pink",
  SOLVED: "teal", UNSOLVED: "red",
} as const;
