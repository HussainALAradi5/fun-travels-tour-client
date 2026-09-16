export enum ShowcaseDemoStatus {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  COMPLETED = "completed",
}

export const ShowcaseDemoStatusColor = {
  [ShowcaseDemoStatus.PENDING]: "blue", [ShowcaseDemoStatus.CONFIRMED]: "purple",
  [ShowcaseDemoStatus.COMPLETED]: "green",
} as const;
