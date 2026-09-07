export const GenericStatus = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
  CONFIRMED: "CONFIRMED",
  CANCELLED: "CANCELLED",
  COMPLETED: "COMPLETED",
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
} as const;

export type GenericStatus = (typeof GenericStatus)[keyof typeof GenericStatus];