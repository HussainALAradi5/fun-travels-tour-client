export const MealDietaryType = {
  STANDARD: "STANDARD",
  VEGETARIAN: "VEGETARIAN",
  VEGAN: "VEGAN",
  GLUTEN_FREE: "GLUTEN_FREE",
} as const;

export type MealDietaryType =
  (typeof MealDietaryType)[keyof typeof MealDietaryType];

export const MealDietaryTypeColor = {
  STANDARD: "gray",
  VEGETARIAN: "green",
  VEGAN: "purple",
  GLUTEN_FREE: "orange",
} as const;
