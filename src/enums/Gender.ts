export const Gender = {
  MALE: "MALE",
  FEMALE: "FEMALE",
} as const;

export type Gender = (typeof Gender)[keyof typeof Gender];

export const GenderLabel = {
  MALE: "Male",
  FEMALE: "Female",
} as const satisfies Record<Gender, string>;

/** Chakra color palette of each gender's badge. */
export const GenderColor = {
  MALE: "blue",
  FEMALE: "pink",
} as const satisfies Record<Gender, string>;
