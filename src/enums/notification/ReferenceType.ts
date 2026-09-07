export const ReferenceType = {
  TOUR: "TOUR",
  RESERVATION: "RESERVATION",
  TICKET: "TICKET",
  USER: "USER",
  USER_REQUEST: "USER_REQUEST",
} as const;

export type ReferenceType = (typeof ReferenceType)[keyof typeof ReferenceType];