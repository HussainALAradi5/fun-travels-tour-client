export const SpiceLevel = {
  NONE: "NONE",
  MILD: "MILD",
  MEDIUM: "MEDIUM",
  HOT: "HOT",
  EXTRA_HOT: "EXTRA_HOT",
} as const;

export type SpiceLevel = (typeof SpiceLevel)[keyof typeof SpiceLevel];

export const SpiceLevelColor = {
  NONE: "gray",
  MILD: "yellow",
  MEDIUM: "orange",
  HOT: "red",
  EXTRA_HOT: "purple",
} as const;
