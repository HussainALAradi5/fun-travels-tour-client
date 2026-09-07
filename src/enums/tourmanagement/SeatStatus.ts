export const SeatStatus = {
  AVAILABLE: "AVAILABLE",
  BOOKED: "BOOKED",
  RESERVED: "RESERVED",
  MAINTENANCE: "MAINTENANCE",
} as const;

export type SeatStatus = (typeof SeatStatus)[keyof typeof SeatStatus];
