/** Reports the server can generate; mirrors the server's ReportType. */
export const ReportType = {
  TOUR_CATALOG: "TOUR_CATALOG",
  TOURS: "TOURS",
  PASSENGER_MANIFEST: "PASSENGER_MANIFEST",
  TICKETS: "TICKETS",
  TRANSPORTATIONS: "TRANSPORTATIONS",
  MEALS: "MEALS",
  TRANSACTIONS: "TRANSACTIONS",
  USERS: "USERS",
  AGENCY_BRANCHES: "AGENCY_BRANCHES",
  AGENCY_EMPLOYEES: "AGENCY_EMPLOYEES",
} as const;

export type ReportType = (typeof ReportType)[keyof typeof ReportType];
