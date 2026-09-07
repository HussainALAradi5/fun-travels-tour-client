export const ChairType = {
  STANDARD: "STANDARD",
  KIDS_CHAIR: "KIDS_CHAIR",
  WHEELCHAIR_ACCESSIBLE: "WHEELCHAIR_ACCESSIBLE",
  PREMIUM_RECLINER: "PREMIUM_RECLINER",
} as const;

export type ChairType = (typeof ChairType)[keyof typeof ChairType];
