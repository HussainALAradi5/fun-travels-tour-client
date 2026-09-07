export const PaymentMethod = {
  CREDIT_CARD: "CREDIT_CARD",
  PAYPAL: "PAYPAL",
  BANK_TRANSFER: "BANK_TRANSFER",
  CASH_AT_OFFICE: "CASH_AT_OFFICE",
  WALLET: "WALLET"
} as const;
export type PaymentMethod = (typeof PaymentMethod)[keyof typeof PaymentMethod];