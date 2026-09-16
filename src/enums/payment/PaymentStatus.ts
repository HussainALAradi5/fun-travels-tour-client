export const PaymentStatus = {
  PENDING: "PENDING",
  COMPLETED: "COMPLETED",
  FAILED: "FAILED",
  REFUNDED: "REFUNDED",
} as const;

export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus];

export const PaymentStatusColor = {
  PENDING: "blue", COMPLETED: "green", FAILED: "red", REFUNDED: "purple",
} as const;
