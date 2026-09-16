export enum ComponentVariant {
  SUBTLE = "subtle",
  OUTLINE = "outline",
  SOLID = "solid",
  ELEVATED = "elevated",
}

export const ComponentVariantColor = {
  [ComponentVariant.SUBTLE]: "gray", [ComponentVariant.OUTLINE]: "blue",
  [ComponentVariant.SOLID]: "green", [ComponentVariant.ELEVATED]: "purple",
} as const;
