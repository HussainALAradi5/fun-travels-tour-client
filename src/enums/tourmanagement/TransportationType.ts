export const TransportationType = {
  BUS: "BUS",
  FLIGHT: "FLIGHT",
  BOAT: "BOAT",
  TRAIN: "TRAIN",
  PRIVATE_CAR: "PRIVATE_CAR",
  FERRY: "FERRY",
} as const;

export type TransportationType =
  (typeof TransportationType)[keyof typeof TransportationType];
