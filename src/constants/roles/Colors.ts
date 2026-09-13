import type { SeatStatus } from "@/enums/tourmanagement/SeatStatus";

export const RoleColors: Record<string, string> = {
  ADMIN: "purple",
  MANAGER: "green",
  OWNER: "teal",
  EMPLOYEE: "cyan",
  CUSTOMER: "blue",
};

export const TransportationColors: Record<string, string> = {
  BUS: "orange",
  FLIGHT: "blue",
  BOAT: "cyan",
  TRAIN: "purple",
  PRIVATE_CAR: "gray",
  FERRY: "teal",
};

export const SeatStatusColors: Record<SeatStatus, { light: string, dark: string, text: string }> = {
  AVAILABLE: { light: "gray.100", dark: "whiteAlpha.200", text: "gray.500" },
  BOOKED: { light: "red.500", dark: "red.400", text: "white" },
  RESERVED: { light: "orange.500", dark: "orange.400", text: "white" },
  MAINTENANCE: { light: "yellow.500", dark: "yellow.400", text: "gray.900" },
};

export const StatusColors: Record<string, string> = {
  PENDING: "blue",
  APPROVED: "teal",
  REJECTED: "red",
  CONFIRMED: "purple",
  CANCELLED: "orange",
  COMPLETED: "green",
  ACTIVE: "cyan",
  INACTIVE: "pink",
};

export const TransportationUnitStatusColors: Record<string, string> = {
  AVAILABLE: "green",
  PARTIAL: "blue",
  FULL: "orange",
  MAINTENANCE: "yellow",
  INACTIVE: "red",
};

export const PortTypeColors: Record<string, string> = {
  AIRPORT: "blue",
  SEAPORT: "cyan",
  TRAIN_STATION: "orange",
  BUS_TERMINAL: "yellow",
  HELIPORT: "purple",
  LANDING_ZONE: "gray",
};

export const NotificationTypeColors: Record<string, string> = {
  BOOKING_CONFIRMED: "green",
  TOUR_APPROVAL_REQUIRED: "orange",
  TOUR_APPROVED: "teal",
  CANCELLATION_ALERT: "red",
  ONE_WEEK_TRAVEL_REMINDER: "purple",
  SYSTEM_ALERT: "gray",
  REQUEST_CREATED: "blue",
  REQUEST_ASSIGNED: "yellow",
  REQUEST_SOLVED: "teal",
  REQUEST_REJECTED: "red",
  TOUR_COMPLETED: "green",
};

export const ReferenceTypeColors: Record<string, string> = {
  TOUR: "blue",
  RESERVATION: "cyan",
  TICKET: "teal",
  USER: "purple",
  USER_REQUEST: "orange",
};

export const ChairTypeColors: Record<string, string> = {
  STANDARD: "gray",
  KIDS_CHAIR: "teal",
  WHEELCHAIR_ACCESSIBLE: "blue",
  PREMIUM_RECLINER: "purple",
};

export const RequestTypeColors: Record<string, string> = {
  SUPPORT: "orange",
  SUGGESTION: "purple",
};

export const RequestStatusColors: Record<string, string> = {
  ...StatusColors,
  SOLVED: "teal",
  UNSOLVED: "red",
  ACTIVE: "blue",
};
export const TransactionTypeColors: Record<string, string> = {
  PAYMENT: "orange",
  REFUND: "green",
  PARTIAL_REFUND: "teal",
  CANCELLATION_FEE: "red",
  WALLET_TOP_UP: "blue",
  MANUAL_ADJUSTMENT: "purple",
  WITHDRAWAL: "pink",
};

export const PaymentMethodColors: Record<string, string> = {
  CREDIT_CARD: "blue",
  PAYPAL: "orange",
  BANK_TRANSFER: "purple",
  CASH_AT_OFFICE: "green",
  WALLET: "teal",
};

export const PaymentStatusColors: Record<string, string> = {
  PENDING: "blue",
  COMPLETED: "green",
  FAILED: "red",
  REFUNDED: "purple",
};

export const AccountStatusColors: Record<string, string> = {
  ACTIVE: "green",
  FROZEN: "blue",
  CLOSED: "red",
};

export const AccountTypeColors: Record<string, string> = {
  CUSTOMER_WALLET: "blue",
  AGENCY_WALLET: "teal",
  SYSTEM_WALLET: "purple",
};
