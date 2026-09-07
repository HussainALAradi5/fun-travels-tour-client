
export const TransportationStatus = {
    AVAILABLE : "AVAILABLE",
    PARTIAL : "PARTIAL",
    FULL : "FULL",
    MAINTENANCE : "MAINTENANCE",
    INACTIVE : "INACTIVE"
} as const;

export type TransportationStatus = (typeof TransportationStatus)[keyof typeof TransportationStatus];
