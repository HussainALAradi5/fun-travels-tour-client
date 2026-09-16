export const PortType = {
  AIRPORT: "AIRPORT",
  SEAPORT: "SEAPORT",
  TRAIN_STATION: "TRAIN_STATION",
  BUS_TERMINAL: "BUS_TERMINAL",
  HELIPORT: "HELIPORT",
  LANDING_ZONE: "LANDING_ZONE",
} as const;

export type PortType = (typeof PortType)[keyof typeof PortType];

export const PortTypeColor = {
  AIRPORT: "blue", SEAPORT: "cyan", TRAIN_STATION: "orange",
  BUS_TERMINAL: "yellow", HELIPORT: "purple", LANDING_ZONE: "gray",
} as const;
