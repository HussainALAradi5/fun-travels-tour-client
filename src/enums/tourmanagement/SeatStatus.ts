export const SeatStatus = {
  AVAILABLE: "AVAILABLE",
  BOOKED: "BOOKED",
  RESERVED: "RESERVED",
  MAINTENANCE: "MAINTENANCE",
} as const;

export type SeatStatus = (typeof SeatStatus)[keyof typeof SeatStatus];

export const SeatStatusColor = {
  AVAILABLE: "green",
  BOOKED: "red",
  RESERVED: "orange",
  MAINTENANCE: "yellow",
} as const;

export const SeatStatusTheme = {
  AVAILABLE: { light: "gray.100", dark: "whiteAlpha.200", text: "gray.500" },
  BOOKED: { light: "red.500", dark: "red.400", text: "white" },
  RESERVED: { light: "orange.500", dark: "orange.400", text: "white" },
  MAINTENANCE: { light: "yellow.500", dark: "yellow.400", text: "gray.900" },
} as const satisfies Record<SeatStatus, { light: string; dark: string; text: string }>;
