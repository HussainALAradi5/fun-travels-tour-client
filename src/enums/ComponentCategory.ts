export enum ComponentCategory {
  DATA_DISPLAY = "data-display",
  FEEDBACK = "feedback",
  FORM = "form",
  LAYOUT = "layout",
  NAVIGATION = "navigation",
}

export const ComponentCategoryColor = {
  [ComponentCategory.DATA_DISPLAY]: "blue", [ComponentCategory.FEEDBACK]: "orange",
  [ComponentCategory.FORM]: "green", [ComponentCategory.LAYOUT]: "purple",
  [ComponentCategory.NAVIGATION]: "teal",
} as const;
