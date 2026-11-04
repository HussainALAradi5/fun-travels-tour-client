export const ChairType = {
  STANDARD: "STANDARD",
  KIDS_CHAIR: "KIDS_CHAIR",
  WHEELCHAIR_ACCESSIBLE: "WHEELCHAIR_ACCESSIBLE",
  PREMIUM_RECLINER: "PREMIUM_RECLINER",
} as const;

export type ChairType = (typeof ChairType)[keyof typeof ChairType];

export const ChairTypeColor = {
  STANDARD: "gray",
  KIDS_CHAIR: "teal",
  WHEELCHAIR_ACCESSIBLE: "blue",
  PREMIUM_RECLINER: "purple",
} as const;
