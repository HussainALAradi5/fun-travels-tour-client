export const PortType = {
  AIRPORT: "AIRPORT",
  SEAPORT: "SEAPORT",
  TRAIN_STATION: "TRAIN_STATION",
  BUS_TERMINAL: "BUS_TERMINAL",
  HELIPORT: "HELIPORT",
  LANDING_ZONE: "LANDING_ZONE",
} as const;

export type PortType = (typeof PortType)[keyof typeof PortType];