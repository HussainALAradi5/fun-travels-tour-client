export const TransactionType = {
  PAYMENT: "PAYMENT",
  REFUND: "REFUND",
  PARTIAL_REFUND: "PARTIAL_REFUND",
  CANCELLATION_FEE: "CANCELLATION_FEE",
  WALLET_TOP_UP: "WALLET_TOP_UP",
  MANUAL_ADJUSTMENT: "MANUAL_ADJUSTMENT",
  WITHDRAWAL: "WITHDRAWAL"
} as const;
export type TransactionType = (typeof TransactionType)[keyof typeof TransactionType];

export const TransactionTypeColor = {
  PAYMENT: "orange", REFUND: "green", PARTIAL_REFUND: "teal",
  CANCELLATION_FEE: "red", WALLET_TOP_UP: "blue",
  MANUAL_ADJUSTMENT: "purple", WITHDRAWAL: "pink",
} as const;
